import ProductForm from "../../../../ui/products/create-form";
import { fetchCategories } from "../../../../lib/data";

async function Page(){
    const categories = await fetchCategories()
   return(
    <ProductForm categories={categories} />
   )
}
export default Page
