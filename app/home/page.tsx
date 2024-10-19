import Link from "next/link"


export default async function Page() {
  
  return (
    <div className="flex justify-start items-center bg-imageBg" >

      <div className="mx-4 xsm:mx-6 md:mx-8 lg:mx-12 w-full flex flex-col gap-4 pt-28 pb-32">
        <h2 className="font-extrabold text-[36px] leading-8 md:text-[45px] md:leading-10 lg:text-[60px] max-w-[560px] uppercase lg:leading-[64px]">find clothes that matches your style</h2>
        <p className="opacity-[0.6] text-lg max-w-[615px]">Browse through our diverse range of meticulously crafted garments, designed to bring out your individuality and cater to your sense of style.</p>
        <Link
          href={`/home/products`}
          className="w-full xsm:max-w-[200px] text-center rounded-full px-6 py-3 uppercase bg-black text-white"
        >
          shop now
        </Link>
        <div className="flex flex-wrap justify-center xsm:justify-start gap-2 my-4">
          <div className="p-3 border-r-0 xxsm:border-r border-r-slate-300">
            <h5 className="text-xl  md:text-2xl font-extrabold">200+</h5>
            <p className="opacity-[0.6]  text-sm md:text-base">International brands</p>
          </div>
          <div className="p-3 border-r-0 xsm:border-r border-r-slate-300">
            <h5 className="text-xl  md:text-2xl font-extrabold">2,000+</h5>
            <p className="opacity-[0.6]  text-sm md:text-base">Quality Products</p>
          </div>
          <div className="p-3 border-r-0 xsm:border-r border-r-slate-300">
            <h5 className="text-xl  md:text-2xl font-extrabold">30,000+</h5>
            <p className="opacity-[0.6]  text-sm md:text-base">Happy Customers</p>
          </div>
        </div>
        <div className="mx-auto w-[80vw] h-[390px] xsm:hidden bg-smallImage">

        </div>
      </div>

    </div>)
}
