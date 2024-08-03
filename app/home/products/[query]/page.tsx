import LinkHistory from "../../../../ui/home/nav-links";
import Link from "next/link";
import Image from "next/image";
import { fetchFilteredProducts } from "../../../../lib/data";
export default async function Page({ searchParams }: { searchParams?: { query?: string } }) {
    const query = searchParams?.query || ''
    const products = await fetchFilteredProducts(query)
    return (
        <div className="mx-12 pt-[74px] pb-28">
            <LinkHistory />
            <div className="grid grid-cols-3 gap-3">
                {products.map((product, index) => {
                    return <div className="flex flex-col gap-y-2 gap-x-1 justify-start" key={index}>
                        <Image className="w-[295px] h-[298px] rounded-lg" src={product.image_url} alt="productImage" />
                        <Link href={`/home/${product.category_name}/${product.id}`} className="font-semibold text-black text-base">{product.name}</Link>
                        <p className="opacity-[0.6]">{product.category_name}</p>
                        <p className="font-semibold text-black text-base">{`$${product.price}`}</p>
                        <p className="font-semibold text-black text-lg capitalize opacity-[0.6]">{product.category_name}</p>
                    </div>
                })}
            </div>
        </div>
    )
}
