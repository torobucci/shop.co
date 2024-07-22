export type Categories = {
    id: number,
    name: string,
    description: string
}

export type Product = {
    id: number,
    name: string,
    description: string,
    price: number,
    stock_quantity: number,
    image_url: string,
}

export type FilteredProduct = {
    id: number,
    name: string,
    description: string,
    price: number,
    stock_quantity: number,
    category_name:string,
    image_url: string,
}

export type SpecificProduct={
    id:number,
    name:string,
    price:number,
    description:string,
    productimages:[]
}
export type ShoppingCartItem={
    id:number,
    name:string,
    price:number,
    description:string,
    productimages:string[],
    cart_item_id:number,
    quantity:number
}

export type cartId = {
    cart_id:number,
}

export type User = {
    id: string;
    name: string;
    email: string;
    password_hash: string;
  };
