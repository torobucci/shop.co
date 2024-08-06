import LinkHistory from "../../../ui/home/nav-links";
import Link from "next/link";
import { fetchCategories, fetchFilteredProducts } from "../../../lib/data";
import { SideNav } from "../../../ui/home/side-nav";
export default async function Page({ searchParams }: { searchParams?: { query?: string } }) {
    const query = searchParams?.query || ''
    const products = await fetchFilteredProducts(query)
    const categories = await fetchCategories()
    return (
        <div className="mx-4 xsm:mx-6 md:mx-8 lg:mx-12 pt-[74px] pb-28">
            <LinkHistory />
            <div className="flex gap-2">
                <SideNav categories={categories}/>
                <div className="grid flex-grow grid-cols-auto-fit-minmax gap-x-4 gap-y-6">
                    {products.map((product, index) => {
                        return <div className="flex items-center flex-col gap-y-2 gap-x-1 justify-start" key={index}>
                            <img className="w-[295px] h-[298px] rounded-lg" src={product.image_url} alt="productImage" />
                            <Link href={`/home/categories/${product.category_name}/${product.id}`} className="font-semibold text-black text-base">{product.name}</Link>
                            <p className="font-semibold text-black text-base">{`$${product.price}`}</p>
                            <p className="font-semibold text-black text-lg capitalize opacity-[0.6]">{`$${product.category_name}`}</p>
                        </div>
                    })}
                </div>
            </div>
        </div>
    )
}
