'use client'
import { Categories } from "../lib/definitions";
import Link from "next/link";
import Search from "./search";
import { FiShoppingCart } from "react-icons/fi";
import { FaRegUserCircle } from "react-icons/fa"
import { usePathname } from "next/navigation";
import { useAppSelector } from "../lib/redux/hooks";
import { IoMenu } from "react-icons/io5";
import { BiCategory } from "react-icons/bi";
import { FaAngleRight } from "react-icons/fa6";
import { useState } from "react";
import { IoClose } from "react-icons/io5";


export function NavBar({ categories, cartCount }: { categories: Categories[], cartCount: number }) {
    const user = useAppSelector((state) => state.user)
    const [sideBarOpen, setSideBarOpen] = useState(false)
    const pathname = usePathname()
    const notAtHome = pathname.length > 5
    const currentPath = usePathname().split('/')
    return (
        <div className={`px-4 xsm:px-6 md:px-8 lg:px-12 fixed z-10 w-full bg-white py-4 ${notAtHome ? 'pb-0' : ''}`}>
            <div className={`px-4 xsm:px-6 md:px-8 lg:px-12 py-7 border-r border-slate-300 rounded-tr-lg rounded-br-lg absolute bg-white flex flex-col top-0 h-screen z-20 transition-all duration-300 ease-in-out ${sideBarOpen?'translate-x-0 w-2/3 left-0':'translate-x-full w-0 -left-full'}`}>
                <div className="flex justify-between items-center pb-3 border-b-[1px] border-gray-300 mb-3">
                    <h4 className="font-bold text-xl text-black">Categories</h4>
                    <IoClose onClick={()=> setSideBarOpen(!sideBarOpen)} className="text-xl cursor-pointer" />
                </div>
                <div>
                    {categories.map((category, index) => {
                        return (
                            <Link onClick={()=> setSideBarOpen(!sideBarOpen)} href={`/home/categories/${category.name}`} className={`${currentPath[currentPath.length - 1] == category.name ? 'bg-slate-200' : ''} flex items-center p-2 mb-[2px] rounded-md justify-between hover:bg-slate-200 text-black text-opacity-60`} key={index}>
                                <p>{category.name}</p>
                                <FaAngleRight />
                            </Link>)
                    })}
                </div>
            </div>
            <div className={`flex justify-between xsm:gap-3 xsm:justify-normal items-center `}>
                <div className="flex gap-2 items-center">
                    <IoMenu onClick={()=> setSideBarOpen(!sideBarOpen)} className="cursor-pointer block lg:hidden text-3xl font-bold" />
                    <Link href='/' className="font-bold text-2xl">SHOP.C0</Link>
                </div>
                <select className="text-base font-normal hidden lg:block max-w-24">
                    {categories.map((category, index) => {
                        return <option key={index}>{category.name}</option>
                    })}
                </select>
                <div className="items-center gap-1 hidden lg:flex">
                    <Link href="">OnSale</Link>
                    <Link href="">New Arrivals</Link>
                    <Link href="">Brands</Link>
                </div>
                <div className="flex xsm:flex-1 gap-3 items-center">
                    <Search placeholder="Search for products" />
                    <Link href="/home/cart">
                        <div className="relative">
                            <FiShoppingCart className="text-[21px]" />
                            <div className="bg-red-600 text-white rounded-full px-[5px] py-[1px]  text-[11px] absolute -top-[9px] -right-[9px]">{cartCount}</div>
                        </div></Link>
                    {user.name ? <>
                        <FaRegUserCircle />
                        <p>{user.name}</p></> : <Link className="bg-black text-white rounded-full px-2 py-1" href='/login'>Login</Link>}
                </div>
            </div>
            {notAtHome && <div className="mt-4 border-b border-slate-300"></div>}
        </div>
    )
}
