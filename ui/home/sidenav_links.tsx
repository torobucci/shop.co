'use client'
import React from "react";
import { Categories } from "../../lib/definitions";
import { FaAngleRight } from "react-icons/fa6";
import Link from "next/link"
import { usePathname } from "next/navigation";
export function SideNavLinks({ categories }: { categories: Categories[] | undefined }) {
    const currentPath = usePathname().split('/')
    return (
        <div>
            {categories?.map((category, index) => {
                return (
                    <span  className={`flex items-center p-2 mb-[2px] rounded-md justify-between hover:bg-slate-200 text-black text-opacity-60`} key={index}>
                        <p>{category.name}</p>
                        <FaAngleRight />
                    </span>)
            })}
        </div>
    )
}
