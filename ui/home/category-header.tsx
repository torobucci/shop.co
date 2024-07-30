'use client'
import { usePathname } from "next/navigation"
import { IoMdOptions } from "react-icons/io";
export default function CategoryHeader() {
    const pathname = usePathname()
    let pathArr = pathname.split('/')
    pathArr.shift()
    const currentPath = pathArr[pathArr.length - 1]

    return (
        <div className="flex items-center justify-between mb-3">
            <h4 className="font-bold text-lg">{currentPath}</h4>
            <div className="flex gap-4 items-center text-sm">
                <p>showing 1-10 of 100 products <span className="ml-2 hidden md:inline-block">Sort by: </span></p>
                <select className="border-none focus:border-none hidden md:block">
                    <option className="">Most Popular</option>
                    <option className="">Most Liked</option>
                    <option className="">Most Recent</option>
                </select>
                <div className="bg-gray-100 p-2 rounded-full md:hidden">
                <IoMdOptions className="text-lg transform rotate-90"/>
                </div>
            </div>

        </div>
    )
}
