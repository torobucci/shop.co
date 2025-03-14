'use client'
import { useEffect, useState } from "react";
import LinkHistory from "@ui/home/nav-links";
import { fetchCategories, fetchFilteredProducts } from "@lib/data";
import { SideNav } from "@ui/home/side-nav";
import ProductItem from "./product-item";
import { Categories, FilteredProduct } from "@lib/definitions";
export function ProductList({searchParams}:{searchParams?: { query?: string }}){
 
    const [products, setProducts] = useState<FilteredProduct[] | undefined>([]); // Store products here
    const [categories, setCategories] = useState<Categories[] | undefined>([]);
    const query = searchParams?.query || ""; // Get search query from URL
  
    // Fetch categories on mount
    useEffect(() => {
      const loadCategories = async () => {
        const allCategories = await fetchCategories();
        setCategories(allCategories);
      };
      loadCategories();
    }, []);
  
    // Fetch products based on search query (when query changes)
    useEffect(() => {
      const fetchProducts = async () => {
        if (query) {
          const searchResults = await fetchFilteredProducts(query);
          setProducts(searchResults);
        }
      };
      fetchProducts();
    }, [query]); // Runs only when search query changes
  
    // Function to apply filters (separate from search)
    
    return (
      <div className="mx-4 xsm:mx-6 md:mx-8 lg:mx-12 pt-[74px] pb-28">
        <LinkHistory />
        <div className="flex gap-2">
          <SideNav categories={categories} setProducts={setProducts} />
          <div className="grid flex-grow grid-cols-auto-fit-minmax gap-x-4 gap-y-6">
            {products?.map((product, index) => {
              return (
                <div key={index}>
                  <ProductItem
                    category={product.category_name}
                    name={product.name}
                    id={product.id}
                    imageUrl={product.image_url}
                    price={product.price}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
}