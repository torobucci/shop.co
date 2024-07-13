
import { fetchShoppingCartItems } from "../../../lib/data"
import ShoppingCartItems from "../../../ui/cart/shopping_cart_items"
import LinkHistory from "../../../ui/home/nav-links"
export default async function Page(){
  const shoppingCartItems = await fetchShoppingCartItems(1)

  return(
    <>
    <LinkHistory/>
    <ShoppingCartItems shoppingCartItems={shoppingCartItems}/>
    </>
  )
}
