
import { ProductList } from "@ui/products/products";
export default async function Page({
  searchParams,
}: {
  searchParams?: { query?: string };
}) {
 
  return <ProductList searchParams={searchParams} />;
}
