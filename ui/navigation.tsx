'use client'
import { Categories } from "../lib/definitions";
import Link from "next/link";
import Search from "./search";
import { FiShoppingCart } from "react-icons/fi";
import { FaRegUserCircle } from "react-icons/fa"
import { usePathname } from "next/navigation";

export function NavBar({ categories,cartCount }: { categories: Categories[],cartCount:number }) {
    const pathname = usePathname()
    const notAtHome = pathname.length > 5
    return (
        <div className={`px-12 fixed z-10 w-full bg-white py-4 ${notAtHome ? 'pb-0' : ''}`}>
            <div className={`flex gap-3 items-center`}>
                <Link href='/' className="font-bold text-2xl">SHOP.C0</Link>
                <select className="text-base font-normal">
                    <option disabled>Shop</option>
                    {categories.map((category, index) => {
                        return <option key={index}>{category.name}</option>
                    })}
                </select>
                <Link href="">OnSale</Link>
                <Link href="">New Arrivals</Link>
                <Link href="">Brands</Link>
                <Search placeholder="Search for products" />
                <Link href="/home/cart">
                    <div className="relative">
                        <FiShoppingCart className="text-[21px]" />
                        <div className="bg-red-600 text-white rounded-full px-[5px] py-[1px]  text-[11px] absolute -top-[9px] -right-[9px]">{cartCount}</div>
                    </div></Link>
                <FaRegUserCircle />
                <p>kevin toro</p>
            </div>
            {notAtHome && <div className="mt-4 border-b border-slate-300"></div>}
        </div>
    )
}
