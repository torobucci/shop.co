export default function ProductItem({index,name,price,imageUrl}:{index:number, name:string, price:number,imageUrl:string}){
    return (
      <div className="flex flex-col gap-y-2 gap-x-1 justify-start" key={index}>
        <img className="w-[295px] h-[298px] rounded-lg" src={imageUrl} alt="productImage"/>
        <h4 className="font-semibold text-black text-base">{name}</h4>
        <p className="font-semibold text-black text-base">{`$${price}`}</p>
      </div>
    )
}
