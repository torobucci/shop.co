'use server'
import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import {storage} from '../firebaseConfig'
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { AuthError } from 'next-auth';
import { signIn } from '../auth';
import bcrypt from 'bcrypt'
import { ProductFormSchema } from './clientActions';



export type State = {
  errors?: {
    product?: string[];
    price?: string[];
    category?:string[];
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
    product: formData.get('product'),
    price: formData.get('price'),
    category: formData.get('category'),
    description: formData.get('description'),
    stockQuantity: formData.get('stockQuantity'),
    imageFiles: formData.getAll('imageFiles')
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Product.',
    };
  }

  const { product, price, category, description, stockQuantity, imageFiles } = validatedFields.data;
  const fetchedCategoryResult = await sql
  `SELECT name FROM shopco_categories
   WHERE id = ${category}
 `
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
    console.log(error)
    return {
      message: 'Database Error: Failed to Create Product.',
    };
  }
  revalidatePath('/products')
  redirect(`/products`)

}

export default createProduct;

export async function increaseQuantity(cart_item_id:number){
 try{
  await sql `
  UPDATE shopco_shopping_cart_items
  SET quantity = quantity + 1
  WHERE cart_item_id = ${cart_item_id}`

    revalidatePath('/cart')
 }
 catch(error){
  console.log('failed to increase quantity of product',error)
 }
}

export async function decreaseQuantity(cart_item_id:number){
  try{
   await sql `
   UPDATE shopco_shopping_cart_items
   SET quantity = quantity - 1
   WHERE cart_item_id = ${cart_item_id} AND cart_item_id > 0`
   revalidatePath('/cart')
  }
  catch(error){
   console.log('failed to increase quantity of product',error)
  }
 }

 export async function deleteCartItem(cart_item_id:number){
  try{
   await sql `
   DELETE FROM shopco_shopping_cart_items
   WHERE cart_item_id = ${cart_item_id}`
   revalidatePath('/cart')
  }
  catch(error){
   console.log('failed to increase quantity of product',error)
  }
 }

 export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
     await signIn('credentials', {
      email: formData.get('email'),
      password: formData.get('password'),
      redirectTo: '/products',
    });

  }
  catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return { error: 'Invalid credentials.' };
        default:
          return { error: 'Something went wrong.' };
      }
    }
    throw error;
  }
}

export async function createUser(formData:FormData){

    const email:string =  formData.get('email')?.toString() ?? '';
    const password:string = formData.get('password')?.toString() ?? ''
    const username = email.split('@')[0]
    console.log(username)
    const password_hash = await bcrypt.hash(password, 10);
   try{
    await
    sql`INSERT INTO shopco_users(username,email,password_hash)
        VALUES(${username},${email}, ${password_hash})`
   }
   catch(error){
     console.log(error)
   }
    await signIn('credentials', {
      email,
      password,
      redirectTo: '/products',
    });

  //  catch(error){
  //   console.log(error)
  //  }
}
