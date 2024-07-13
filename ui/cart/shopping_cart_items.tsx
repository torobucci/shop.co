'use client'
import { ShoppingCartItem } from "../../lib/definitions";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { increaseQuantity, decreaseQuantity } from "../../lib/actions";

export default function ShoppingCartItems({ shoppingCartItems }: { shoppingCartItems: ShoppingCartItem[] }) {
  return (
    <div>
      <h4 className="font-bold text-3xl my-2"></h4>
      <div className="flex gap-x-10">
        <div className="flex-3 p-3 border-slate-300 border-[1px] rounded-xl">
          {shoppingCartItems.map((cartItem, index) => {
            return <div key={index} className={`${shoppingCartItems.length > 1?'pb-4 border-b-[1px]':''} border-gray-300 flex justify-between`}>

              <div className="flex gap-x-4">
                <img src={cartItem.productimages[0]} alt="product image" className="w-[134px]" />
                <div className="flex flex-col gap-1 text-xl uppercase font-semibold">
                  <h3>{cartItem.name}</h3>
                  <p>{cartItem.price}</p>
                </div>
              </div>
              <div className="flex flex-col justify-between items-end">
                <RiDeleteBin6Fill className="text-red-600 text-lg" />
                <div className="px-4 py-2.5 flex justify-around bg-slate-300 rounded-3xl">
                  <button onClick={() => decreaseQuantity(cartItem.cart_item_id)}>-</button>
                  <p>{cartItem.quantity}</p>
                  <button onClick={() => increaseQuantity(cartItem.cart_item_id)}>+</button>
                </div>
              </div>


            </div>
          })}
        </div>
        <div className="flex-1 p-3 border-slate-300 border-[1px] rounded-xl">
          <h4 className="font-bold text-2xl">Order Summary</h4>
          <div className="flex justify-between text-base py-1">
            <p className="text-gray-500">Subtotal</p>
            <p className="font-bold">{`$500`}</p>
          </div>
          <div className="flex justify-between text-base py-1">
            <p className="text-gray-500">Delivery Fee</p>
            <p className="font-bold">{`$25`}</p>
          </div>
          <div className="flex justify-between text-base py-1 border-t-[1px] border-gray-300 font-bold">
            <p className="text-gray-500">Total</p>
            <p className="font-bold">{`$525`}</p>
          </div>
          <button className="bg-black px-6 py-2.5 flex-[3] rounded-3xl  text-white" >Go to Checkout</button>
        </div>
      </div>
    </div>
  )
}
