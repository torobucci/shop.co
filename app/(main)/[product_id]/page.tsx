import LinkHistory from "@ui/home/nav-links"
import { fetchProductByName } from "@lib/data"
import ProductDetails from "@ui/home/product-details"
import { auth } from "../../../auth"
export default async function page({ params }: { params:{product_id: string} }) {
   
   const productId = parseInt(params.product_id)
    const product = await fetchProductByName(productId)
    const session  = await auth()

    return <div className="mx-4 xsm:mx-6 md:mx-8 lg:mx-12 pt-[74px] pb-28">
        <LinkHistory />
        <ProductDetails product={product} session={session}/>
    </div>
}