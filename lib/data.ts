'use server'
import { sql } from '@vercel/postgres';
import { unstable_noStore as noStore, revalidatePath } from 'next/cache';
import { Categories, FilteredProduct, SpecificProduct, cartId } from './definitions';
import { Product, ShoppingCartItem } from './definitions';
import { redirect } from 'next/navigation';

export async function fetchCategories() {
    noStore()
    try {

        const data = await sql<Categories>`SELECT * FROM shopco_categories`;

        return data.rows;
    } catch (error) {
        console.log('Failed to fetch categories',error)

    }
}

export async function fetchProductsByCategoryId(categoryName: string) {
    noStore()
    try {
        const data = await sql<Product> `
     SELECT p.id, p.name, p.price, p.description, p.stock_quantity, i.image_url
     FROM shopco_products p
     JOIN shopco_categories c ON p.category_id = c.id
     JOIN shopco_productimages i ON p.id = i.product_id
     WHERE c.name = ${categoryName}
     AND i.is_primary = true;
     `

        return data.rows
    }
    catch (error) {

      console.log('Failed to fetch products by category name',error)


    }

}
export async function fetchProductByName(productName: string) {
    
    noStore()
    try {
        const data = await sql<SpecificProduct> `SELECT p.id, p.name, p.description, p.price, array_agg(i.image_url) AS productimages
        FROM shopco_products p INNER JOIN shopco_productimages i ON p.id = i.product_id
        WHERE p.name = ${productName}
        GROUP BY p.id;`;



        return data.rows[0]
    }
    catch (error) {
         console.log('Failed to fetch specific product by name',error)



    }
}

export async function addToCart(userId: number, productId: number, quantity: number): Promise<void> {
    try {
        let cartResult = await sql<cartId>`
            SELECT cart_id FROM shopco_shopping_cart WHERE user_id = ${userId}
          `;

        let cartId;
        if (cartResult.rowCount === 0) {
            const newCartResult = await sql<{ cart_id: number }>`
              INSERT INTO shopco_shopping_cart (user_id)
              VALUES (${userId})
              RETURNING cart_id
            `;
            cartId = newCartResult.rows[0].cart_id;
        } else {
            cartId = cartResult.rows[0].cart_id;
        }

        await sql`
            INSERT INTO shopco_shopping_cart_items (cart_id, product_id, quantity)
            VALUES (${cartId}, ${productId}, ${quantity})
            ON CONFLICT ON CONSTRAINT shopco_shopping_cart_items_pkey
            DO UPDATE SET quantity = shopco_shopping_cart_items.quantity + 1
        `;


    } catch (error) {
            console.log('Failed to add product to cart',error)



    }
    revalidatePath('/cart')
    redirect('/cart')

}
export async function fetchShoppingCartItems(userId: number): Promise<ShoppingCartItem[]> {
    try {
        const fetchedCart = await sql<cartId>`SELECT cart_id FROM shopco_shopping_cart
    WHERE user_id=${userId}`
        const cart_id = fetchedCart.rows[0].cart_id

        const fetchedCartItems = await sql <ShoppingCartItem>`SELECT p.id, p.name, p.description, p.price, array_agg(i.image_url) AS productimages,ci.cart_item_id, ci.quantity
    FROM shopco_shopping_cart_items ci
    JOIN shopco_products p ON p.id = ci.product_id
    JOIN shopco_productimages i ON p.id = i.product_id
    WHERE ci.cart_id =${cart_id}
    GROUP BY p.id, p.name, p.description, p.price, ci.cart_item_id, ci.quantity`

        return fetchedCartItems.rows

    } catch (error) {
           console.log('Failed to fetch shopping cart items',error)



        return Promise.resolve([]);
    }

}

export async function fetchFilteredProducts(query: string) {
    try {
        const products = await sql<FilteredProduct>`
          SELECT
            p.id,
            p.name,
            p.description,
            p.price,
            p.stock_quantity,
            c.name as category_name,
            i.image_url
          FROM shopco_products p
          JOIN shopco_categories c ON p.category_id = c.id
          JOIN shopco_productimages i ON p.id = i.product_id AND i.is_primary = true
          WHERE
            p.name ILIKE ${`%${query}%`} OR
            p.description ILIKE ${`%${query}%`} OR
            p.price::text ILIKE ${`%${query}%`} OR
            c.name ILIKE ${`%${query}%`}
        `;
        return products.rows;
    } catch (error) {

        console.log(error)


    }
}
export async function getCartItemsCount(user_id:number){
    const fetchedCount = await sql `SELECT COUNT(*)
    FROM shopco_shopping_cart_items
    WHERE cart_id = (
        SELECT cart_id
        FROM shopco_shopping_cart
        WHERE user_id = ${user_id}
    );
    `
    return fetchedCount.rows[0].count
}


export async function applyFilters(priceRange?: number[], category?: string) {
  try {
    let queryConditions = [];
    let queryParams: any[] = [];

    // Add price range condition if provided
    if (priceRange && priceRange.length === 2) {
      queryConditions.push(`p.price BETWEEN $${queryParams.length + 1} AND $${queryParams.length + 2}`);
      queryParams.push(priceRange[0], priceRange[1]);
    }

    // Add category condition if provided
    if (category && category !== "All") {
      queryConditions.push(`c.name = $${queryParams.length + 1}`);
      queryParams.push(category);
    }

    // Build the WHERE clause
    const whereClause = queryConditions.length > 0 ? `WHERE ${queryConditions.join(" AND ")}` : "";

    // Construct the query safely
    const query = `
      SELECT
        p.id,
        p.name,
        p.description,
        p.price,
        p.stock_quantity,
        c.name as category_name,
        i.image_url
      FROM shopco_products p
      JOIN shopco_categories c ON p.category_id = c.id
      JOIN shopco_productimages i ON p.id = i.product_id AND i.is_primary = true
      ${whereClause}
    `;

    // Execute query with parameters
    const products = await sql<FilteredProduct>(query, queryParams);

    // Revalidate cache
    revalidatePath("/products");

    return products.rows;
  } catch (error) {
    console.error("Error filtering products:", error);
    throw new Error("Failed to filter products");
  }
}
