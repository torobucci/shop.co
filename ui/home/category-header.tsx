'use client'
import { usePathname } from "next/navigation"
export default function CategoryHeader() {
    const pathname = usePathname()
    let pathArr = pathname.split('/')
    pathArr.shift()
    const currentPath = pathArr[pathArr.length - 1]

    return (
        <div className="flex items-center justify-between mb-3">
            <h4 className="font-bold text-lg">{currentPath}</h4>
            <div className="flex gap-1 items-center text-sm">
                <p>showing 1-10 of 100 products <span className="ml-2">Sort by</span>:</p>
                <select className="border-none focus:border-none">
                <option className="">Most Popular</option>
                <option className="">Most Liked</option>
                <option className="">Most Recent</option>
            </select>
            </div>

        </div>
    )
}
