// side nav with list of categories
// fetch all products of a category
// begin with the first catory set as active
import { SideNav } from "../../ui/home/side-nav"
import { fetchCategories } from "../../lib/data"
export default async function Page() {
    const categories = await fetchCategories()
    return (
        <>
            <div className="flex">
                <SideNav categories={categories}/>
                <div className="product container">
                    {/* fetch and render products with Product component*/}
                </div>
            </div>
            {/* <Pagination/> */}
        </>
    )
}
