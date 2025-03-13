'use client'
import RangeSlider from "@ui/range-slider";
import { FaAngleDown } from "react-icons/fa6";
import { BiCategory } from "react-icons/bi";
import { SideNavLinks } from './home/sidenav_links'
import { Categories } from "../lib/definitions";
import * as React from "react";

export default function FilterFeature({ categories }: { categories: Categories[] | undefined }) {
    const [category, setCategory] = React.useState<string>('')
    const [price, setPrice] = React.useState<number[]>([5, 1000])
    return (
    <div>
      <div className="flex justify-between items-center pb-3 border-b-[1px] border-gray-300 mb-3">
        <h4 className="font-bold text-base text-black">Filters</h4>
        <BiCategory />
      </div>
      <SideNavLinks categories={categories} setCategory={setCategory} />
      <div className="flex justify-between items-center pb-3 border-b-[1px] border-gray-300 my-3">
        <h4 className="font-bold text-base text-black">Price</h4>
        <FaAngleDown />
      </div>
      <RangeSlider setPrice={setPrice}/>
      <button className="w-full text-white bg-black rounded-3xl py-2 px-4 text-center mt-3">
        Apply filters
      </button>
    </div>
  );
}
