import { Categories } from "../../lib/definitions";
import { BiCategory } from "react-icons/bi";
import { SignOut } from "../signout";
import { SideNavLinks } from './sidenav_links'

export function SideNav({ categories }: { categories: Categories[] | undefined }) {

    return (
        <div className="hidden lg:flex lg:max-w-[250px] flex-col justify-between flex-[0.55] mr-6 p-4 border-[1px] border-gray-300 text-black text-opacity-60 text-base rounded-md min-w-[250px] h-screen overflow-y-auto">
            <div>
                <div className="flex justify-between items-center pb-3 border-b-[1px] border-gray-300 mb-3">
                    <h4 className="font-bold text-base text-black">Categories</h4>
                    <BiCategory />
                </div>
                <SideNavLinks categories={categories} />
            </div>
            <SignOut/>
        </div>
    )

}
