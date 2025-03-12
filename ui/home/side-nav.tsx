import { Categories } from "../../lib/definitions";
import { BiCategory } from "react-icons/bi";
import { SideNavLinks } from './sidenav_links'
import { auth } from "../../auth";
import { SignOut } from "../signout";
import { signOut } from "../../auth";
import RangeSlider from "@ui/range-slider";
import { FaAngleDown } from "react-icons/fa6";
export const handleSignOut  =async ()=>{
    'use server'
    await signOut()
    return null
 }
export async function SideNav({ categories }: { categories: Categories[] | undefined }) {
     const session =  await auth()


    return (
        <div className="hidden lg:flex lg:max-w-[400px] flex-col justify-between flex-[0.55] mr-6 p-4 border-[1px] border-gray-300 text-black text-opacity-60 text-base rounded-md min-w-[250px] h-screen overflow-y-auto">
            <div>
                <div className="flex justify-between items-center pb-3 border-b-[1px] border-gray-300 mb-3">
                    <h4 className="font-bold text-base text-black">Filters</h4>
                    <BiCategory />
                </div>
                <SideNavLinks categories={categories} />
                <div className="flex justify-between items-center pb-3 border-b-[1px] border-gray-300 my-3">
                    <h4 className="font-bold text-base text-black">Price</h4>
                    <FaAngleDown />
                </div>
                <RangeSlider />
                <button className="w-full text-white bg-black rounded-3xl py-2 px-4 text-center mt-3">Apply filters</button>
            </div>
            {session && <SignOut handleSignOut={handleSignOut} />}
        </div>
    )

}


