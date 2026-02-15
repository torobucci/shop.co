import { TfiEmail } from "react-icons/tfi";
import { FaXTwitter } from "react-icons/fa6";
import { FaFacebookF } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import Link from "next/link";

export function BottomNav() {
    return (
        <div className="px-4 xsm:px-6 md:px-8 lg:px-12 bg-gradient-to-b from-gray-50 to-gray-100">
            {/* Newsletter Section */}
            <div className="relative w-full">
                <div className="w-full max-w-6xl mx-auto p-6 md:p-8 lg:p-10 absolute -top-16 left-1/2 -translate-x-1/2 bg-gradient-to-br from-black via-gray-900 to-black rounded-2xl shadow-2xl flex flex-col gap-6 sm:flex-row md:justify-between md:items-center border border-gray-800">
                    <p className="text-white font-bold text-2xl md:text-3xl lg:text-4xl max-w-[300px] lg:max-w-[450px] leading-tight">
                        Stay up to date about our latest offers
                    </p>
                    <div className="flex flex-col gap-3">
                        <div className="flex max-w-[350px] lg:max-w-[400px] bg-white px-4 py-3 md:px-5 md:py-3.5 rounded-full items-center gap-3 shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-200">
                            <TfiEmail className="text-lg md:text-xl text-gray-400 flex-shrink-0" />
                            <input 
                                className="w-full focus:outline-none border-none placeholder:text-gray-400 text-black text-sm md:text-base" 
                                type="email" 
                                placeholder="Enter your email address" 
                            />
                        </div>
                        <button className="bg-white hover:bg-gray-900 hover:text-white max-w-[350px] lg:max-w-[400px] rounded-full text-sm md:text-base px-5 py-3 md:py-3.5 text-black font-semibold transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
                            Subscribe to Newsletter
                        </button>
                    </div>
                </div>
            </div>

            {/* Footer Content */}
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 pt-[15rem] md:pt-[13rem] pb-8">
                {/* Brand Section */}
                <div className="flex flex-col gap-4 items-start lg:max-w-[280px]">
                    <h4 className="font-extrabold text-2xl md:text-3xl tracking-tight bg-gradient-to-r from-black to-gray-700 bg-clip-text text-transparent">
                        SHOP.CO
                    </h4>
                    <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                        We have clothes that suit your style and which you're proud to wear. From women to men.
                    </p>
                    <div className="flex gap-3 mt-2">
                        <a 
                            href="#" 
                            className="rounded-full border-2 border-gray-200 p-2.5 text-base bg-white hover:bg-black hover:text-white hover:border-black transition-all duration-300 transform hover:scale-110"
                            aria-label="Twitter"
                        >
                            <FaXTwitter />
                        </a>
                        <a 
                            href="#" 
                            className="rounded-full border-2 border-black p-2.5 text-base text-white bg-black hover:bg-white hover:text-black transition-all duration-300 transform hover:scale-110"
                            aria-label="Facebook"
                        >
                            <FaFacebookF />
                        </a>
                        <a 
                            href="#" 
                            className="rounded-full border-2 border-gray-200 p-2.5 text-base bg-white hover:bg-black hover:text-white hover:border-black transition-all duration-300 transform hover:scale-110"
                            aria-label="Instagram"
                        >
                            <FaInstagram />
                        </a>
                        <a 
                            href="#" 
                            className="rounded-full border-2 border-gray-200 p-2.5 text-base bg-white hover:bg-black hover:text-white hover:border-black transition-all duration-300 transform hover:scale-110"
                            aria-label="GitHub"
                        >
                            <FaGithub />
                        </a>
                    </div>
                </div>

                {/* Links Section */}
                <div className="flex flex-1 justify-between flex-wrap gap-y-8 gap-x-4">
                    <div className="flex flex-col gap-3 items-start min-w-[140px] xsm:min-w-[180px]">
                        <h4 className="mb-1 font-bold text-base md:text-lg uppercase tracking-wide text-gray-900">
                            Company
                        </h4>
                        <Link href="#" className="text-gray-600 hover:text-black hover:translate-x-1 transition-all duration-200 text-sm md:text-base">
                            About
                        </Link>
                        <Link href="#" className="text-gray-600 hover:text-black hover:translate-x-1 transition-all duration-200 text-sm md:text-base">
                            Features
                        </Link>
                        <Link href="#" className="text-gray-600 hover:text-black hover:translate-x-1 transition-all duration-200 text-sm md:text-base">
                            Work
                        </Link>
                        <Link href="#" className="text-gray-600 hover:text-black hover:translate-x-1 transition-all duration-200 text-sm md:text-base">
                            Career
                        </Link>
                    </div>

                    <div className="flex flex-col gap-3 items-start min-w-[140px] xsm:min-w-[180px]">
                        <h4 className="mb-1 font-bold text-base md:text-lg uppercase tracking-wide text-gray-900">
                            Help
                        </h4>
                        <Link href="#" className="text-gray-600 hover:text-black hover:translate-x-1 transition-all duration-200 text-sm md:text-base">
                            Customer Support
                        </Link>
                        <Link href="#" className="text-gray-600 hover:text-black hover:translate-x-1 transition-all duration-200 text-sm md:text-base">
                            Delivery Details
                        </Link>
                        <Link href="#" className="text-gray-600 hover:text-black hover:translate-x-1 transition-all duration-200 text-sm md:text-base">
                            Terms & Conditions
                        </Link>
                        <Link href="#" className="text-gray-600 hover:text-black hover:translate-x-1 transition-all duration-200 text-sm md:text-base">
                            Privacy Policy
                        </Link>
                    </div>

                    <div className="flex flex-col gap-3 items-start min-w-[140px] xsm:min-w-[180px]">
                        <h4 className="mb-1 font-bold text-base md:text-lg uppercase tracking-wide text-gray-900">
                            FAQ
                        </h4>
                        <Link href="#" className="text-gray-600 hover:text-black hover:translate-x-1 transition-all duration-200 text-sm md:text-base">
                            Account
                        </Link>
                        <Link href="#" className="text-gray-600 hover:text-black hover:translate-x-1 transition-all duration-200 text-sm md:text-base">
                            Manage Deliveries
                        </Link>
                        <Link href="#" className="text-gray-600 hover:text-black hover:translate-x-1 transition-all duration-200 text-sm md:text-base">
                            Orders
                        </Link>
                        <Link href="#" className="text-gray-600 hover:text-black hover:translate-x-1 transition-all duration-200 text-sm md:text-base">
                            Payments
                        </Link>
                    </div>

                    <div className="flex flex-col gap-3 items-start min-w-[140px] xsm:min-w-[180px]">
                        <h4 className="mb-1 font-bold text-base md:text-lg uppercase tracking-wide text-gray-900">
                            Resources
                        </h4>
                        <Link href="#" className="text-gray-600 hover:text-black hover:translate-x-1 transition-all duration-200 text-sm md:text-base">
                            Free eBooks
                        </Link>
                        <Link href="#" className="text-gray-600 hover:text-black hover:translate-x-1 transition-all duration-200 text-sm md:text-base">
                            Development Tutorial
                        </Link>
                        <Link href="#" className="text-gray-600 hover:text-black hover:translate-x-1 transition-all duration-200 text-sm md:text-base">
                            How-To Blog
                        </Link>
                        <Link href="#" className="text-gray-600 hover:text-black hover:translate-x-1 transition-all duration-200 text-sm md:text-base">
                            YouTube Playlist
                        </Link>
                    </div>
                </div>
            </div>

            {/* Copyright Section */}
            <div className="border-t border-gray-300 pt-6 pb-8">
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-gray-600">
                    <p>© 2024 SHOP.CO. All rights reserved.</p>
                </div>
            </div>
        </div>
    );
}