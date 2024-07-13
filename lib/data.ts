'use server'
import { sql } from '@vercel/postgres';
import { unstable_noStore as noStore } from 'next/cache';
import { Categories, SpecificProduct, cartId } from './definitions';
import { Product, ShoppingCartItem } from './definitions';

export async function fetchCategories() {
    noStore()
    try {

        const data = await sql<Categories>`SELECT * FROM shopco_categories`;

        console.log('Data fetch completed after 3 seconds.');

        return data.rows;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch categories.');
    }
}

export async function fetchProductsByCategoryId(categoryName: string): Promise<Product[]> {
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
        console.log('Data fetch completed after 3 seconds.');
        return data.rows
    }
    catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch products by category name.');
    }

}
export async function fetchProductByName(productId: number): Promise<SpecificProduct> {

    noStore()
    try {
        const data = await sql<SpecificProduct> `SELECT p.id, p.name, p.description, p.price, array_agg(i.image_url) AS productimages
        FROM shopco_products p INNER JOIN shopco_productimages i ON p.id = i.product_id
        WHERE p.id = ${productId}
        GROUP BY p.id;`;

        console.log('Data fetch completed after 3 seconds.');

        return data.rows[0]
    }
    catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch specific product by name.');
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

        console.log('Product added to cart successfully');
    } catch (err) {
        console.error('Error adding product to cart:', err);
    }
    return Promise.resolve();
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
        console.error('Error failed fetching shopping cart items:', error);
        return Promise.resolve([]);
    }

}
