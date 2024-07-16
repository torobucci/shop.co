
import { fetchShoppingCartItems } from "../../../lib/data"
import ShoppingCartItems from "../../../ui/cart/shopping_cart_items"
import LinkHistory from "../../../ui/home/nav-links"
export default async function Page(){
  const shoppingCartItems = await fetchShoppingCartItems(1)

  return(
    <div className="mx-12 pt-[74px] pb-28">
    <LinkHistory/>
    <ShoppingCartItems shoppingCartItems={shoppingCartItems}/>
    </div>
  )
}
