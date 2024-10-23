import LinkHistory from "../../ui/home/nav-links";
import Link from "next/link";
import { fetchCategories, fetchFilteredProducts } from "../../lib/data";
import { SideNav } from "../../ui/home/side-nav";
import ProductItem from "../../ui/products/product-item";
export default async function Page({
  searchParams,
}: {
  searchParams?: { query?: string };
}) {
  const query = searchParams?.query || "";
  const products = await fetchFilteredProducts(query);
  const categories = await fetchCategories();
  return (
    <div className="mx-4 xsm:mx-6 md:mx-8 lg:mx-12 pt-[74px] pb-28">
      <LinkHistory />
      <div className="flex gap-2">
        <SideNav categories={categories} />
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
