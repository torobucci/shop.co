'use client';
import { HiMagnifyingGlass } from "react-icons/hi2";
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
import { useState } from "react";
import { IoClose } from "react-icons/io5";


export default function Search({ placeholder }: { placeholder: string }) {
  const [displaySearch, setDisplaySearch] = useState(false)
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter()
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((term) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set('query', term);

    } else {
      params.delete('query');
    }
    replace(`${pathname}?${params.toString()}`);
    router.push(`/home/products/?${params ? params.toString() : ''}`)
  }, 300)
  return (
    <div className="xsm:w-full block xsm:flex items-center lg:flex-1 xsm:bg-gray-100 xsm:rounded-2xl xsm:py-[9px] xsm:px-4">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <HiMagnifyingGlass onClick={() => setDisplaySearch(!displaySearch)} className="cursor-pointer text-lg text-gray-500 peer-focus:text-gray-900" />
      <div className={`${displaySearch ? 'flex': 'hidden'} md:hidden absolute top-0 right-0 items-center justify-center h-screen w-screen`}>
        <div className="absolute top-0 right-0 bottom-0 left-0 bg-slate-900 opacity-50"></div>
        <div className="relative -top-[12rem] w-[80%] flex items-center bg-white rounded-2xl py-[9px] px-4">
          <label htmlFor="search" className="sr-only">Search</label>
          <HiMagnifyingGlass
            className="cursor-pointer text-lg text-gray-500 peer-focus:text-gray-900"
          />
          <input
            id="search"
            className="w-full focus:outline-none pl-2 bg-transparent text-sm outline-2 placeholder:text-gray-500 border-none active:border-none"
            placeholder={placeholder}
            onChange={(e) => handleSearch(e.target.value)}
            onSubmit={()=>setDisplaySearch(!displaySearch)}
            defaultValue={searchParams.get('query')?.toString()}
          />
          <IoClose onClick={() => setDisplaySearch(!displaySearch)} className="text-xl cursor-pointer"/>
        </div>
      </div>

      <input
        className="hidden xsm:block w-full focus:outline-none pl-2 bg-transparent text-sm outline-2 placeholder:text-gray-500 border-none active:border-none"
        placeholder={placeholder}
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
        defaultValue={searchParams.get('query')?.toString()}
      />

    </div>
  );
}
