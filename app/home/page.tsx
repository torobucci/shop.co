// build the browse by categories component
// on click of a category,
// navigate to categories
import Link from "next/link"
import { fetchCategories } from "../../lib/data"

export default async function Page(){
    const categories = await fetchCategories()
    const defaultCategory = categories[0]
    return (
    <>
     <Link
      href={`/home/${defaultCategory.name}`}
      className="rounded-md border p-2 hover:bg-gray-100"
    >
      SHOP NOW
    </Link>

    </>)
}
