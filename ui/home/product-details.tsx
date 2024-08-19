'use client'
import { SpecificProduct } from "../../lib/definitions";
import { useState, useEffect } from "react";
import { addToCart } from "../../lib/data";
import { Session } from "next-auth";




export default function ProductDetails({ product, session }: { product: SpecificProduct|undefined, session:Session | null }) {
    const productImages = product?.productimages
    const sizes = ['small', 'medium', 'large', 'x large']
    const [count, setCount] = useState(1)

    const handleAddToCart = (productId: number | undefined, count: number) => {
        const userId = session?.user?.id
        if(typeof userId == 'string' && typeof productId == 'number'){
            addToCart(parseInt(userId),productId,count)
          }
         else{
            alert('Kindly Sign In to add a product to cart')
         }
    }
    return (
        <div className="flex flex-col md:flex-row gap-9">
        <div className="flex flex-col-reverse md:flex-row gap-x-6 gap-y-5">
            <div className="">
                <div className="flex md:flex-col justify-center  gap-4 md:justify-start">
                    {productImages?.map((image, index) => {
                        return index > 0 ? <img key={image} className="w-[100px]" src={image} alt="product image" /> : null;
                    })}
                </div>
            </div>
            <div className="">
                {productImages?.map((image, index) => {
                    return index == 0 ? <img key={image} className="" src={image} alt="product image" /> : null;
                })}

            </div>
        </div>
        <div className="flex flex-col gap-4 text-lg">
            <div className="flex flex-col gap-2 border-b-[1px] border-gray-300 pb-6">
                <h4 className="font-bold text-xl xsm:text-2xl md:text-3xl uppercase">{product?.name}</h4>
                <p className="font-bold text-lg md:text-2xl">{`$${product?.price}`}</p>
                <p className="text-base text-gray-500 w-3/4">{product?.description}</p>
            </div>
            <div className="flex gap-2  border-b-[1px] border-gray-300 py-6">
                {sizes.map((size, index) => {
                    return <button className="px-4 py-2 text-sm md:text-base md:px-6 md:py-2  rounded-3xl bg-slate-300 hover:bg-black hover:text-white" key={index}>{size}</button>
                })}
            </div>
            <div className="flex py-6">
                <div className="flex-1 mr-6 text-black text-xl">
                    <div className="px-6 md:px-4 py-2.5 flex gap-2 xsm:justify-around bg-slate-300 rounded-3xl">
                        <button onClick={() => count > 0 ? setCount(count - 1) : ''}>-</button>
                        <p>{count}</p>
                        <button onClick={() => setCount(count + 1)}>+</button>
                    </div>
                </div>
                <button className="bg-black px-6 py-2.5 flex-[3] rounded-3xl  text-gray-400" onClick={() => handleAddToCart(product?.id, count)}>Add to Cart</button>
            </div>
        </div>
    </div>

    )
}
