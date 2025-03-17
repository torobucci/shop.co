'use client'
import { useEffect, useState } from "react";
import LinkHistory from "@ui/home/nav-links";
import { fetchFilteredProducts } from "@lib/data";
import { SideNav } from "@ui/home/side-nav";
import ProductItem from "./product-item";
import { Categories, FilteredProduct, Product } from "@lib/definitions";
export function ProductList({searchParams,initialProducts, categories}:{searchParams?: { query?: string }, initialProducts:FilteredProduct[]|undefined, categories:Categories[]| undefined}) {
 
    const [products, setProducts] = useState<FilteredProduct[] | undefined>(initialProducts); // Store products here
   
    const query = searchParams?.query || ""; // Get search query from URL
  
    // Fetch categories on mount
    console.log
    // Fetch products based on search query (when query changes)
    useEffect(() => {
      if (query) {
        // Use the server function directly with promises
        fetchFilteredProducts(query)
          .then(searchResults => {
            setProducts(searchResults);
          })
          .catch(error => {
            console.error("Error fetching products:", error);
          });
      }
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