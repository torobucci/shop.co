import { ProductList } from "@ui/products/products";
import { fetchCategories, fetchFilteredProducts } from "@lib/data";
import { Categories, FilteredProduct } from "@lib/definitions";

export default async function Page({
  searchParams,
}: {
  searchParams?: { query?: string };
}) {
  // Fetch initial data server-side
  const query = searchParams?.query || "";
  const categories = await fetchCategories();
  
  // Only fetch products if there's a query
  let initialProducts: FilteredProduct[] | undefined = [];
  if (query) {
    initialProducts = await fetchFilteredProducts(query);
  }
 
  return <ProductList 
    searchParams={searchParams}
    categories={categories}
    initialProducts={initialProducts}
  />;
}