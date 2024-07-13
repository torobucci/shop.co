import Link from "next/link"
export default function ProductItem({index,category,name, id, price,imageUrl}:{index:number,category:string, name:string, id:number, price:number,imageUrl:string}){
    return (
      <div className="flex flex-col gap-y-2 gap-x-1 justify-start" key={index}>
        <img className="w-[295px] h-[298px] rounded-lg" src={imageUrl} alt="productImage"/>
        <Link href={`/home/${category}/${id}`} className="font-semibold text-black text-base">{name}</Link>
        <p className="font-semibold text-black text-base">{`$${price}`}</p>
      </div>
    )
}
