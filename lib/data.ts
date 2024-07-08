'use server'
import { sql } from '@vercel/postgres';
import { unstable_noStore as noStore } from 'next/cache';
import { Categories } from './definitions';
import { Product } from './definitions';

export async function fetchCategories(){
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

export async function fetchProductsByCategoryId(categoryName:string): Promise<Product[]> {
   noStore()
   try{
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
