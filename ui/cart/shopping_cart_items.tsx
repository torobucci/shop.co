'use client'
import { ShoppingCartItem } from "../../lib/definitions";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { increaseQuantity, decreaseQuantity, deleteCartItem } from "../../lib/actions";
import { useEffect, useState } from "react";

export default function ShoppingCartItems({ shoppingCartItems }: { shoppingCartItems: ShoppingCartItem[] }) {
  const [totalCost, setTotalCost] = useState(0)
  useEffect(() => {
    let cost = 0
    shoppingCartItems.forEach(el => {
      cost += el.price * el.quantity
    })
    setTotalCost(cost)
  },[shoppingCartItems])
  return (

    <div className="flex flex-col md:flex-row gap-10 mb-4">
      <div className="flex-3 w-full p-3 border-slate-300 border-[1px] rounded-xl">
        {shoppingCartItems.map((cartItem, index) => {
          return <div key={index} className={`${shoppingCartItems.length > 1 && index != shoppingCartItems.length - 1 ? 'border-b-[1px] pb-6' : 'mb-2'} relative mb-6 border-gray-300 flex flex-col gap-2 xsm:flex-row xsm:justify-between`}>

            <div className="flex flex-col items-center xsm:flex-row xsm:items-start gap-4">
              <img src={cartItem.productimages[0]} alt="product image" className="max-w-[170px]" />
              <div className="flex flex-col gap-1 text-base text-center xsm:text-start xsm:text-lg lg:text-xl uppercase font-semibold">
                <h3>{cartItem.name}</h3>
                <p>{`$${cartItem.price}`}</p>
              </div>
            </div>
            <div className="flex justify-center xsm:flex-col xsm:justify-between xsm:items-end">
              <RiDeleteBin6Fill className="text-red-600 text-lg cursor-pointer absolute top-2 right-2 xsm:relative xsm:top-0 xsm:right-0" onClick={() => deleteCartItem(cartItem.cart_item_id)} />
              <div className="text-xl px-4 py-1.5 flex justify-around bg-slate-300 rounded-3xl">
                <button className="" onClick={() => decreaseQuantity(cartItem.cart_item_id)}>-</button>
                <p className="mx-3">{cartItem.quantity}</p>
                <button onClick={() => increaseQuantity(cartItem.cart_item_id)}>+</button>
              </div>
            </div>


          </div>
        })}
      </div>
      <div className="self-start w-full p-3 border-slate-300 border-[1px] rounded-xl">
        <h4 className="font-bold text-2xl">Order Summary</h4>
        <div className="flex justify-between text-base py-1">
          <p className="text-gray-500">Subtotal</p>
          <p className="font-bold">{`$${totalCost.toFixed(2)}`}</p>
        </div>
        <div className="flex justify-between text-base py-1">
          <p className="text-gray-500">Delivery Fee</p>
          <p className="font-bold">{`$${(0.08 * totalCost).toFixed(2)}`}</p>
        </div>
        <div className="flex justify-between text-base my-4 py-2 border-t-[1px] border-gray-300 font-bold">
          <p className="font-bold">Total</p>
          <p className="font-bold">{`$${(totalCost + 0.08 * totalCost).toFixed(2)}`}</p>
        </div>
        <button className="bg-black w-full px-6 py-2.5 flex-[3] rounded-3xl  text-white" >Go to Checkout</button>
      </div>
    </div>

  )
}
