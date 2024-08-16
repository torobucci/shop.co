import { fetchShoppingCartItems } from "../../../lib/data"
import ShoppingCartItems from "../../../ui/cart/shopping_cart_items"
import LinkHistory from "../../../ui/home/nav-links"
import { auth } from "../../../auth"
import { ShoppingCartItem } from "../../../lib/definitions"
export default async function Page(){
  const session  = await auth()
    const userId = session?.user?.id
  let shoppingCartItems: ShoppingCartItem[] = [];
  if (typeof userId === 'string') {
    shoppingCartItems = await fetchShoppingCartItems(parseInt(userId));
  }

  return(
    <div className="mx-4 xsm:mx-6 md:mx-8 lg:mx-12 pt-[74px] pb-28">
    <LinkHistory/>
    <ShoppingCartItems shoppingCartItems={shoppingCartItems}/>
    </div>
  )
}
