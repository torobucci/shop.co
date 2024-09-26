'use client'
import Link from "next/link";
import { useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
export default function ProductItem({
  category,
  name,
  id,
  price,
  imageUrl,
}: {
  category: string;
  name: string;
  id: number;
  price: number;
  imageUrl: string;
}) {
  const [loading, setLoading] = useState(true);
  return (
    <div className="flex items-center flex-col gap-y-2 gap-x-1 justify-start">
      {loading && <Skeleton width={295} height={298} />}
      <img
        className={`${loading ? "hidden" : "w-[295px] h-[298px] rounded-lg"}`}
        src={imageUrl}
        onLoad={() => setLoading(false)}
        alt="productImage"
      />
      <Link
        href={`/home/categories/${category}/${id}`}
        className="font-semibold text-black text-base"
      >
        {name}
      </Link>
      <p className="font-semibold text-black text-base">{`$${price}`}</p>
    </div>
  );
}
