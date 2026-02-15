"use client";
import { Categories } from "../lib/definitions";
import Link from "next/link";
import Search from "./search";
import { FiShoppingCart } from "react-icons/fi";
import { FaRegUserCircle } from "react-icons/fa";
import { usePathname } from "next/navigation";
import { IoMenu } from "react-icons/io5";
import { FaAngleRight } from "react-icons/fa6";
import { useState, useEffect } from "react";
import { IoClose } from "react-icons/io5";
import { useContext } from "react";
import { sessionContext } from "./SessionContext";

export function NavBar({
  categories,
  cartCount,
  children,
}: {
  categories: Categories[] | undefined;
  cartCount: number;
  children: React.ReactNode;
}) {
  const session = useContext<{ user: { email: string } }>(sessionContext);
  const [sideBarOpen, setSideBarOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const currentPath = usePathname().split("/");

  // Detect scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Backdrop overlay */}
      {sideBarOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 transition-opacity duration-300"
          onClick={() => setSideBarOpen(false)}
        />
      )}

      {/* Main navbar - only bg and shadow change on scroll */}
      <nav 
        className={`px-4 xsm:px-6 md:px-8 lg:px-12 fixed z-40 w-full backdrop-blur-md py-4 transition-all duration-300 ${
          isScrolled 
            ? "bg-white/95 shadow-md" 
            : "bg-transparent shadow-sm"
        }`}
      >
        {/* Sidebar menu */}
        <div
          className={`px-6 md:px-8 py-6 border-r border-gray-200 rounded-tr-2xl rounded-br-2xl absolute bg-white flex flex-col top-0 h-screen z-50 transition-all duration-300 ease-in-out shadow-2xl ${
            sideBarOpen
              ? "translate-x-0 w-[280px] xsm:w-[320px] left-0"
              : "-translate-x-full w-0 -left-full"
          }`}
        >
          {/* Sidebar header */}
          <div className="flex justify-between items-center pb-4 border-b border-gray-200 mb-4">
            <h4 className="font-bold text-xl text-gray-900">Categories</h4>
            <button
              onClick={() => setSideBarOpen(false)}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
              aria-label="Close menu"
            >
              <IoClose className="text-2xl text-gray-700" />
            </button>
          </div>

          {/* Categories list */}
          <div className="flex-1 overflow-y-auto">
            {categories?.map((category, index) => {
              const isActive = currentPath[currentPath.length - 1] === category.name;
              return (
                <Link
                  onClick={() => setSideBarOpen(false)}
                  href={`/home/categories/${category.name}`}
                  className={`${
                    isActive
                      ? "bg-black text-white"
                      : "text-gray-700 hover:bg-gray-100"
                  } flex items-center px-4 py-3 mb-1 rounded-lg justify-between transition-all duration-200 font-medium`}
                  key={index}
                >
                  <p>{category.name}</p>
                  <FaAngleRight className={isActive ? "text-white" : "text-gray-400"} />
                </Link>
              );
            })}
          </div>

          {/* Sidebar footer content */}
          <div onClick={() => setSideBarOpen(false)} className="mt-auto pt-4 border-t border-gray-200">
            {children}
          </div>
        </div>

        {/* Main navigation content */}
        <div className="flex justify-between xsm:gap-4 xsm:justify-normal items-center">
          {/* Logo and menu button */}
          <div className="flex gap-3 items-center">
            <button
              onClick={() => setSideBarOpen(!sideBarOpen)}
              className="block lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
              aria-label="Open menu"
            >
              <IoMenu className="text-2xl font-bold text-gray-900" />
            </button>
            <Link 
              href="/" 
              className="font-extrabold text-2xl md:text-3xl tracking-tight bg-gradient-to-r from-black to-gray-700 bg-clip-text text-transparent hover:from-gray-700 hover:to-black transition-all duration-300"
            >
              SHOP.CO
            </Link>
          </div>

          {/* Desktop navigation links */}
          <div className="items-center gap-6 hidden lg:flex text-gray-700 font-medium">
            <Link 
              href="/products" 
              className="hover:text-black transition-colors duration-200 relative group"
            >
              On Sale
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-black transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link 
              href="/products" 
              className="hover:text-black transition-colors duration-200 relative group"
            >
              New Arrivals
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-black transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link 
              href="/products" 
              className="hover:text-black transition-colors duration-200 relative group"
            >
              Brands
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-black transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </div>

          {/* Right side actions */}
          <div className="flex xsm:flex-1 gap-3 xsm:gap-4 items-center justify-end">
            {/* Search */}
            <div className="hidden md:block flex-1 max-w-md">
              <Search placeholder="Search for products" />
            </div>

            {/* Mobile search icon */}
            <div className="block md:hidden">
              <Search placeholder="Search" />
            </div>

            {/* Cart */}
            <Link 
              href="/cart"
              className="relative p-2 hover:bg-gray-100 rounded-full transition-all duration-200 group"
            >
              <FiShoppingCart className="text-[22px] text-gray-700 group-hover:text-black transition-colors duration-200" />
              {cartCount > 0 && (
                <div className="bg-red-500 text-white rounded-full min-w-[20px] h-[20px] flex items-center justify-center text-[10px] font-bold absolute -top-1 -right-1 shadow-lg animate-pulse">
                  {cartCount > 99 ? '99+' : cartCount}
                </div>
              )}
            </Link>

            {/* User section */}
            {session ? (
              <div className="flex gap-2 items-center px-3 py-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors duration-200">
                <p className="text-sm font-medium text-gray-900 hidden sm:block">
                  {session?.user?.email?.split("@")[0]}
                </p>
                <FaRegUserCircle className="text-xl text-gray-700" />
              </div>
            ) : (
              <Link
                className="bg-black text-white rounded-full px-5 py-2 text-sm font-semibold hover:bg-gray-800 transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105"
                href="/login"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}