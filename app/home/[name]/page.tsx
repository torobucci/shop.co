import { SideNav } from "../../../ui/home/side-nav"
import { fetchCategories, fetchProductsByCategoryId } from "../../../lib/data"
import ProductItem from "../../../ui/products/procuct-item"
import LinkHistory from "../../../ui/home/nav-links"
import CategoryHeader from "../../../ui/home/category-header"

export default async function Page({ params }: { params: { name: string } }) {
    const categories = await fetchCategories()
    const products = await fetchProductsByCategoryId(params.name)


    return (
        <div className="mx-12 pt-[74px] pb-28">
            <LinkHistory />
            <div className="flex">
                <SideNav categories={categories} />
                <div className="flex-[3] flex-col">
                    <CategoryHeader />
                    <div className="grid grid-cols-3 gap-3">
                        {products.map((product, index) => {
                            return <ProductItem index={index} category={params.name} name={product.name} id={product.id} price={product.price} imageUrl={product.image_url} /> // Corrected component name
                        })}
                    </div>
                </div>
            </div>
            {/* <Pagination/> */}
        </div>
    )
}
