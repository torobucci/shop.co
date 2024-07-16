import { TfiEmail } from "react-icons/tfi";
import { FaXTwitter } from "react-icons/fa6";
import { FaFacebookF } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaGithub } from "react-icons/fa"
import Link from "next/link";
export function BottomNav() {
    return (
        <div className="px-12 bg-custom_grey">
            <div className="relative w-full">
                <div className="w-full mx-auto p-10 absolute -top-14 bg-black rounded-xl flex justify-between">
                    <p className="text-white uppercase font-extrabold text-4xl w-1/2">Stay up to data about our latest offers</p>
                    <div className="flex flex-col gap-2">
                        <div className="flex bg-white px-5 py-2.5 rounded-full items-center gap-3">
                            <TfiEmail className="text-lg text-slate-400" />
                            <input className="focus:border-none  focus:outline-none border-none placeholder:text-slate-400 text-black" type="email" name="" id="" placeholder="enter your email" />
                        </div>
                        <button className="bg-white rounded-full px-5 py-2.5 text-black font-semibold">Subscribe to NewsLetter</button>
                    </div>
                </div>
            </div>
            <div className="flex justify-between pt-[11rem]">
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
                <div className="flex flex-col gap-2 items-start">
                    <h4 className="mb-2 font-medium text-lg">COMPANY</h4>
                    <Link href={'#'}>About</Link>
                    <Link href={'#'}>Features</Link>
                    <Link href={'#'}>Work</Link>
                    <Link href={'#'}>Career</Link>
                </div>
                <div className="flex flex-col gap-2 items-start">
                    <h4 className="mb-2 font-medium text-lg">HELP</h4>
                    <Link href={'#'}>Customer support</Link>
                    <Link href={'#'}>Deliverly details</Link>
                    <Link href={'#'}>Terms and condition</Link>
                    <Link href={'#'}>Privacy Policy</Link>
                </div>
                <div className="flex flex-col gap-2 items-start">
                    <h4 className="mb-2 font-medium text-lg">FAQ</h4>
                    <Link href={'#'}>Account</Link>
                    <Link href={'#'}>Manage Deliveries</Link>
                    <Link href={'#'}>Orders</Link>
                    <Link href={'#'}>Payments</Link>
                </div>
                <div className="flex flex-col gap-2 items-start">
                    <h4 className="mb-2 font-medium text-lg">Resources</h4>
                    <Link href={'#'}>Free e-books</Link>
                    <Link href={'#'}>Development Tutortial</Link>
                    <Link href={'#'}>How To- Blog</Link>
                    <Link href={'#'}>YouTube Playlist</Link>
                </div>
            </div>
        </div>

    )
}
