import LinkHistory from "../../../../ui/home/nav-links"
import { fetchProductByName } from "../../../../lib/data"
import ProductDetails from "../../../../ui/home/product-details"
export default async function page({ params }: { params:{productname: number} }) {
   const productId = params.productname
    const product = await fetchProductByName(productId)

    return <div className="mx-12 pt-[74px] pb-28">
        <LinkHistory />
        <ProductDetails product={product} />
    </div>
}
