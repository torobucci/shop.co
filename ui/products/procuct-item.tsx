import Link from "next/link"
export default function ProductItem({category,name, id, price,imageUrl}:{category:string, name:string, id:number, price:number,imageUrl:string}){
    return (
      <div className="flex items-center flex-col gap-y-2 gap-x-1 justify-start">
        <img className="w-[295px] h-[298px] rounded-lg" src={imageUrl} alt="productImage"/>
        <Link href={`/home/categories/${category}/${id}`} className="font-semibold text-black text-base">{name}</Link>
        <p className="font-semibold text-black text-base">{`$${price}`}</p>
      </div>
    )
}
