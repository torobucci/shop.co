'use client'
import { Categories } from "../../lib/definitions";
import { BiCategory } from "react-icons/bi";
import { FaAngleRight } from "react-icons/fa6";
import Link from "next/link"
import { usePathname } from "next/navigation";

export function SideNav({ categories }: { categories: Categories[] }) {
    const currentPath = usePathname().split('/')
    return (
        <div className="flex-[0.55] mr-6 p-4 border-[1px] border-gray-300 text-black text-opacity-60 text-base rounded-md">
            <div className="flex justify-between items-center pb-3 border-b-[1px] border-gray-300 mb-3">
                <h4 className="font-bold text-base text-black">Categories</h4>
                <BiCategory />
            </div>
            <div>
                {categories.map((category, index) => {
                    return (
                        <Link href={`/home/categories/${category.name}`} className={`${currentPath[currentPath.length-1]== category.name ?'bg-slate-200':''} flex items-center p-2 mb-[2px] rounded-md justify-between hover:bg-slate-200 text-black text-opacity-60`} key={index}>
                            <p>{category.name}</p>
                            <FaAngleRight />
                        </Link>)
                })}
            </div>
        </div>
    )

}
