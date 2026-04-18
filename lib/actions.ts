"use server";
import { z } from "zod";
import { sql } from "@vercel/postgres";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../firebaseConfig";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { AuthError } from "next-auth";
import { signIn } from "../auth";
import bcrypt from "bcrypt";
import { ProductFormSchema } from "./clientActions";

const BASE_URL = process.env.PESAPAL_BASE_URL!;
const IPN_URL = process.env.PESAPAL_IPN_URL!;

export type State = {
  errors?: {
    product?: string[];
    price?: string[];
    category?: string[];
    description?: string[];
    imageFiles?: string[];
  };
  message?: string | undefined;
};

async function uploadFile(file: File): Promise<string> {
  const storageRef = ref(storage, `${file.name}`);
  const snapshot = await uploadBytes(storageRef, file);
  return await getDownloadURL(snapshot.ref);
}

async function createProduct(prevState: State, formData: FormData) {
  const validatedFields = ProductFormSchema.safeParse({
    product: formData.get("product"),
    price: formData.get("price"),
    category: formData.get("category"),
    description: formData.get("description"),
    stockQuantity: formData.get("stockQuantity"),
    imageFiles: formData.getAll("imageFiles"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create Product.",
    };
  }

  const { product, price, category, description, stockQuantity, imageFiles } =
    validatedFields.data;
  const fetchedCategoryResult = await sql`SELECT name FROM shopco_categories
   WHERE id = ${category}
 `;
  const categoryName = fetchedCategoryResult.rows[0].name;

  try {
    // Upload files to Firebase and get their URLs
    const fileUploadPromises = imageFiles.map(uploadFile);
    const fileUrls = await Promise.all(fileUploadPromises);

    // Insert the product into the database
    const productResult = await sql`
      INSERT INTO shopco_products (name, price, description, stock_quantity, category_id)
      VALUES (${product}, ${price}, ${description}, ${stockQuantity},${category})
      RETURNING id
    `;

    const productId = productResult.rows[0].id;

    // Insert the product images into the database
    const imageInsertPromises = fileUrls.map((url, index) => {
      const isPrimary = index === 0; // Assume the first image is the primary one
      return sql`
            INSERT INTO shopco_productimages (product_id, image_url, is_primary)
            VALUES (${productId}, ${url}, ${isPrimary})
        `;
    });

    await Promise.all(imageInsertPromises);
  } catch (error) {
    console.log(error);
    return {
      message: "Database Error: Failed to Create Product.",
    };
  }
  revalidatePath("/products");
  redirect(`/products`);
}

export default createProduct;

export async function increaseQuantity(cart_item_id: number) {
  try {
    await sql`
  UPDATE shopco_shopping_cart_items
  SET quantity = quantity + 1
  WHERE cart_item_id = ${cart_item_id}`;

    revalidatePath("/cart");
  } catch (error) {
    console.log("failed to increase quantity of product", error);
  }
}

export async function decreaseQuantity(cart_item_id: number) {
  try {
    await sql`
   UPDATE shopco_shopping_cart_items
   SET quantity = quantity - 1
   WHERE cart_item_id = ${cart_item_id} AND cart_item_id > 0`;
    revalidatePath("/cart");
  } catch (error) {
    console.log("failed to increase quantity of product", error);
  }
}

export async function deleteCartItem(cart_item_id: number) {
  try {
    await sql`
   DELETE FROM shopco_shopping_cart_items
   WHERE cart_item_id = ${cart_item_id}`;
    revalidatePath("/cart");
  } catch (error) {
    console.log("failed to increase quantity of product", error);
  }
}

export async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirectTo: "/products",
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials." };
        default:
          return { error: "Something went wrong." };
      }
    }
    throw error;
  }
}

export async function createUser(formData: FormData) {
  const email: string = formData.get("email")?.toString() ?? "";
  const password: string = formData.get("password")?.toString() ?? "";
  const username = email.split("@")[0];
  console.log(username);
  const password_hash = await bcrypt.hash(password, 10);
  try {
    await sql`INSERT INTO shopco_users(username,email,password_hash)
        VALUES(${username},${email}, ${password_hash})`;
  } catch (error) {
    console.log(error);
  }
  await signIn("credentials", {
    email,
    password,
    redirectTo: "/products",
  });

  //  catch(error){
  //   console.log(error)
  //  }
}

export async function getPesaPalToken() {
  try {
    const res = await fetch(`${BASE_URL}/api/Auth/RequestToken`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        consumer_key: process.env.PESAPAL_CONSUMER_KEY,
        consumer_secret: process.env.PESAPAL_CONSUMER_SECRET,
      }),
    });

    // ✅ Check if response is OK
    if (!res.ok) {
      const text = await res.text();
      console.error("Auth Error Status:", res.status);
      console.error("Auth Error Response:", text);
      throw new Error(`Auth failed: ${res.status}`);
    }

    const data = await res.json();

    // ✅ Check if token exists
    if (!data.token) {
      console.error("No token in response:", data);
      throw new Error("No token received from PesaPal");
    }

    return data.token;
  } catch (err) {
    console.error("getPesaPalToken Error:", err);
    throw err;
  }
}

export async function getIPNId() {
  try {
    const token = await getPesaPalToken();

    console.log("Token received:", token.substring(0, 20) + "..."); // ✅ Log token

    const res = await fetch(`${BASE_URL}/api/URLSetup/RegisterIPN`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        url: IPN_URL,
        ipn_notification_type: "POST",
      }),
    });

    // ✅ Check if response is OK
    if (!res.ok) {
      const text = await res.text();
      console.error("IPN Register Error Status:", res.status);
      console.error("IPN Register Error Response:", text);
      throw new Error(`IPN registration failed: ${res.status}`);
    }

    const data = await res.json();

    // ✅ Check if IPN ID exists
    if (!data.ipn_id) {
      console.error("No IPN ID in response:", data);
      throw new Error("No IPN ID received from PesaPal");
    }

    return data.ipn_id;
  } catch (err) {
    console.error("getIPNId Error:", err);
    throw err;
  }
}

export const handlePayment = async ({
  amount,
  email,
}: {
  amount: number;
  email: string | null | undefined;
}) => {
  const res = await fetch("../app/api/pesapal/initiate", {
    method: "POST",
    body: JSON.stringify({
      amount: amount,
      email: email,
    }),
  });

  const data = await res.json();

  window.location.href = data.redirect_url;
};

export async function submitOrderRequest({
  amount,
  email
}: {
  amount: number,
  email: string | null | undefined;
}){
  try {
    
      const order = {
        id: `ORDER-${Date.now()}`,
        currency: "KES",
        amount: amount,
        description: "E-commerce Order",
        callback_url: 'http://localhost:3000/pesapal/callback',
        notification_id: `${process.env.PESAPAL_IPN_ID}`,
        billing_address: {
          email_address: email,
          country_code: "KE"
        }
      }
    // Get token
    const token = await getPesaPalToken();

    // Submit order
    const res = await fetch(`${BASE_URL}/api/Transactions/SubmitOrderRequest`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(order),
    });

    if (!res.ok) {
      const text = await res.text();
      console.error("Order Error:", res.status, text);
      throw new Error(`Failed to submit order: ${res.status}`);
    }

    const data = await res.json();

    if (!data.redirect_url) {
      throw new Error("No redirect_url in response");
    }

    return data;
  } catch (err) {
    console.error("submitOrderRequest Error:", err);
    throw err;
  }
}