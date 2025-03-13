'use client'
import React, { useState } from "react";
import { Categories } from "../../lib/definitions";
import { FaAngleRight } from "react-icons/fa6";


export function SideNavLinks({ categories, setCategory }: { 
  categories: Categories[] | undefined, 
  setCategory: React.Dispatch<React.SetStateAction<string>> 
}) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  

  const handleCategoryClick = (categoryName: string) => {
    setActiveCategory(categoryName);
    setCategory(categoryName);
  };

  return (
    <div>
      {categories?.map((category, index) => {
        const isActive = activeCategory === category.name;
        return (
          <span 
            className={`flex items-center p-2 mb-[2px] rounded-md justify-between cursor-pointer ${
              isActive ? 'bg-slate-200' : 'hover:bg-slate-200'
            } text-black text-opacity-60`}
            key={index}
            onClick={() => handleCategoryClick(category.name)}
          >
            <p>{category.name}</p>
            <FaAngleRight />
          </span>
        );
      })}
    </div>
  );
}
