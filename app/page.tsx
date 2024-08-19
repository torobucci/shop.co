import Link from "next/link"
import { fetchCategories } from "../lib/data"


export default async function Page() {
  const categories = await fetchCategories()

  return (
    <div className="flex justify-start items-center bg-imageBg" >

      <div className="mx-12 w-full flex flex-col gap-4 pt-28 pb-32">
        <h2 className="font-extrabold text-[60px] max-w-[560px] uppercase leading-[64px]">find clothes that matches your style</h2>
        <p className="opacity-[0.6] text-lg max-w-[615px]">Browse through our diverse range of meticulously crafted garments, designed to bring out your individuality and cater to your sense of style.</p>
        <Link
          href={`/home/${categories?categories[0].name:''}`}
          className="max-w-[200px] text-center rounded-full px-6 py-3 uppercase bg-black text-white"
        >
          shop now
        </Link>
        <div className="flex gap-2 my-4">
          <div className="p-3 border-r border-r-slate-300">
            <h5 className="text-2xl font-extrabold">200+</h5>
            <p className="opacity-[0.6] text-base">International brands</p>
          </div>
          <div className="p-3 border-r border-r-slate-300">
            <h5 className="text-2xl font-extrabold">2,000+</h5>
            <p className="opacity-[0.6] text-base">Quality Products</p>
          </div>
          <div className="p-3 border-r border-r-slate-300">
            <h5 className="text-2xl font-extrabold">30,000+</h5>
            <p className="opacity-[0.6] text-base">Happy Customers</p>
          </div>
        </div>
      </div>

    </div>)
}
