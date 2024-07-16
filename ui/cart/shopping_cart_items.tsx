'use client'
import { ShoppingCartItem } from "../../lib/definitions";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { increaseQuantity, decreaseQuantity, deleteCartItem } from "../../lib/actions";

export default function ShoppingCartItems({ shoppingCartItems }: { shoppingCartItems: ShoppingCartItem[] }) {
  return (
    <div>
      <h4 className="font-bold text-3xl my-2"></h4>
      <div className="flex gap-x-10 mb-4">
        <div className="flex-3 w-full p-3 border-slate-300 border-[1px] rounded-xl">
          {shoppingCartItems.map((cartItem, index) => {
            return <div key={index} className={`${shoppingCartItems.length > 1 && index != shoppingCartItems.length-1?'border-b-[1px] pb-6':'mb-2'}  mb-6 border-gray-300 flex justify-between`}>

              <div className="flex gap-x-4">
                <img src={cartItem.productimages[0]} alt="product image" className="w-[134px]" />
                <div className="flex flex-col gap-1 text-xl uppercase font-semibold">
                  <h3>{cartItem.name}</h3>
                  <p>{cartItem.price}</p>
                </div>
              </div>
              <div className="flex flex-col justify-between items-end">
                <RiDeleteBin6Fill className="text-red-600 text-lg cursor-pointer" onClick={()=>deleteCartItem(cartItem.cart_item_id)} />
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
            <p className="font-bold">{`$500`}</p>
          </div>
          <div className="flex justify-between text-base py-1">
            <p className="text-gray-500">Delivery Fee</p>
            <p className="font-bold">{`$25`}</p>
          </div>
          <div className="flex justify-between text-base my-4 py-2 border-t-[1px] border-gray-300 font-bold">
            <p className="font-bold">Total</p>
            <p className="font-bold">{`$525`}</p>
          </div>
          <button className="bg-black w-full px-6 py-2.5 flex-[3] rounded-3xl  text-white" >Go to Checkout</button>
        </div>
      </div>
    </div>
  )
}
