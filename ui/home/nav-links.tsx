'use client'
import { usePathname } from "next/navigation"
import { FaAngleRight } from "react-icons/fa6"
import Link from "next/link"

export default function LinkHistory() {
    const pathname = usePathname()
    let pathArr = pathname.split('/')
    pathArr.shift()
    return (
        <div className="flex items-center mb-2.5">
            {pathArr.map((path, index) => {
                return <div key={index} className="flex justify-between items-center text-black text-opacity-60 text-base" >
                    <Link className={`${pathArr[pathArr.length-1] == path ? 'text-black':''}`} href={`${path == 'home' ?`/${path}`:`/home/${path}`}`}>{path.toLowerCase()}</Link>
                    {index !=pathArr.length-1 && <FaAngleRight className="text-[12px] mx-1" />}

                </div>
            })}
        </div>
    )
}
