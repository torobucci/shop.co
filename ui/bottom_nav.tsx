import { TfiEmail } from "react-icons/tfi";
import { FaXTwitter } from "react-icons/fa6";
import { FaFacebookF } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaGithub } from "react-icons/fa"
import Link from "next/link";
export function BottomNav() {
    return (
        <div className="px-4 xsm:px-6 md:px-8 lg:px-12 bg-custom_grey">
            <div className="relative w-full">
                <div className="w-full mx-auto p-6 md:p-7 lg:p-10 absolute -top-14 bg-black rounded-xl flex flex-col gap-4 sm:flex-row md:justify-between">
                    <p className="text-white uppercase font-extrabold text-2xl md:text-3xl lg:text-4xl max-w-[300px] lg:max-w-[400px]">Stay up to data about our latest offers</p>
                    <div className="flex flex-col gap-2">
                        <div className="flex max-w-[300px] lg:max-w-[400px] justify-center bg-white px-4 py-1.5 md:px-5 md:py-2.5 rounded-full items-center gap-3">
                            <TfiEmail className="text-sm xsm:text-base  md:text-lg text-slate-400" />
                            <input className="w-3/4 focus:border-none  focus:outline-none border-none placeholder:text-slate-400 text-black" type="email" name="" id="" placeholder="enter your email" />
                        </div>
                        <button className="bg-white max-w-[300px] rounded-full text-sm  px-3 py-1.5 md:text-base md:px-5 md:py-2.5 text-black font-semibold">Subscribe to NewsLetter</button>
                    </div>
                </div>
            </div>
            <div className="flex flex-col lg:flex-row gap-6 pt-[13rem] md:pt-[11rem]">
                <div className="flex flex-col gap-2 items-start">
                    <h4 className="mb-2 font-bold text-xl">SHOP.C0</h4>
                    <p className="max-w-[300px]">We have clothes that suits your style and which you’re proud to wear. From women to men.</p>
                    <div className="flex gap-2">
                        <div className="rounded-full border border-slate-300 p-2 text-sm bg-white"><FaXTwitter /></div>
                        <div className="rounded-full border border-slate-300 p-2 text-sm text-white bg-black"><FaFacebookF /></div>
                        <div className="rounded-full border border-slate-300 p-2 text-sm bg-white"><FaInstagram /></div>
                        <div className="rounded-full border border-slate-300 p-2 text-sm bg-white"><FaGithub /></div>
                    </div>
                </div>
                <div className="flex flex-1 justify-between flex-wrap gap-y-5">
                    <div className="flex flex-col gap-2 items-start w-[150px] xsm:w-[200px]">
                        <h4 className="mb-2 font-medium text-lg">COMPANY</h4>
                        <Link href={'#'}>About</Link>
                        <Link href={'#'}>Features</Link>
                        <Link href={'#'}>Work</Link>
                        <Link href={'#'}>Career</Link>
                    </div>
                    <div className="flex flex-col gap-2 items-start w-[150px] xsm:w-[200px]">
                        <h4 className="mb-2 font-medium text-lg">HELP</h4>
                        <Link href={'#'}>Customer support</Link>
                        <Link href={'#'}>Deliverly details</Link>
                        <Link href={'#'}>Terms and condition</Link>
                        <Link href={'#'}>Privacy Policy</Link>
                    </div>
                    <div className="flex flex-col gap-2 items-start w-[150px] xsm:w-[200px]">
                        <h4 className="mb-2 font-medium text-lg">FAQ</h4>
                        <Link href={'#'}>Account</Link>
                        <Link href={'#'}>Manage Deliveries</Link>
                        <Link href={'#'}>Orders</Link>
                        <Link href={'#'}>Payments</Link>
                    </div>
                    <div className="flex flex-col gap-2 items-start w-[150px] xsm:w-[200px]">
                        <h4 className="mb-2 font-medium text-lg">Resources</h4>
                        <Link href={'#'}>Free e-books</Link>
                        <Link href={'#'}>Development Tutortial</Link>
                        <Link href={'#'}>How To- Blog</Link>
                        <Link href={'#'}>YouTube Playlist</Link>
                    </div>
                </div>
            </div>
        </div>

    )
}
