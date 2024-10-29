import Link from "next/link";

export default async function Page() {
  return (
    <div className="relative flex justify-start items-center bg-imageBg bg-cover bg-center">
      <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent"></div>
      <div className="px-2 md:px-12 w-full flex flex-col gap-4 pt-28 pb-32 z-10">
        {/* <h2 className="font-extrabold text-[60px] max-w-[560px] uppercase leading-[64px]">
          find clothes that matches your style
        </h2> */}
        <h2 className="font-extrabold text-[45px] md:text-[50px] lg:text-[60px] uppercase leading-none tracking-tight max-w-[560px]">
          Find Clothes That Match Your Style
        </h2>

        <p className="text-lg md:text-xl opacity-70 max-w-[615px] mt-3 mb-8">
          Browse through our diverse range of meticulously crafted garments,
          designed to bring out your individuality and cater to your sense of
          style.
        </p>
        <Link
          href={`/products`}
          className="max-w-[200px] text-center rounded-full px-6 py-3 uppercase bg-black text-white"
        >
          shop now
        </Link>
        <div className="flex flex-wrap justify-center xsm:justify-start gap-2 my-4">
          <div className="p-3 border-r border-r-slate-300">
            <h5 className="text-2xl font-extrabold">200+</h5>
            <p className="opacity-[0.6] text-base">International brands</p>
          </div>
          <div className="p-3 border-r border-r-slate-300">
            <h5 className="text-2xl font-extrabold">2,000+</h5>
            <p className="opacity-[0.6] text-base">Quality Products</p>
          </div>
          <div className="p-3 border-r border-r-slate-300">
            <h5 className="text-2xl font-extrabold">30,000+</h5>
            <p className="opacity-[0.6] text-base">Happy Customers</p>
          </div>
        </div>
      </div>
    </div>
  );
}
