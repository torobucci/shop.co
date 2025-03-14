import { Categories, FilteredProduct} from "../../lib/definitions";
import { auth } from "../../auth";
import { SignOut } from "../signout";
import { signOut } from "../../auth";
import FilterFeature from "@ui/filter-feature";
// export const handleSignOut  =async ()=>{
//     'use server'
//     await signOut()
//     return null
//  }
export async function SideNav({ categories, setProducts }: { categories: Categories[] | undefined, setProducts: React.Dispatch<React.SetStateAction<FilteredProduct[]| undefined>> }) {
    //  const session =  await auth()


    return (
        <div className="hidden lg:flex lg:max-w-[400px] flex-col justify-between flex-[0.55] mr-6 p-4 border-[1px] border-gray-300 text-black text-opacity-60 text-base rounded-md min-w-[250px] h-max">
            <FilterFeature categories={categories} setProducts={setProducts}/>
            {/* {session && <SignOut handleSignOut={handleSignOut} />} */}
        </div>
    )

}


