'use client';
import { HiMagnifyingGlass } from "react-icons/hi2";
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';


export default function Search({ placeholder }: { placeholder: string }) {
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
    router.push(`/home/products/?${params?params.toString():''}`)
  },300)
  return (
    <div className="xsm:w-full block xsm:flex items-center lg:flex-1 xsm:bg-gray-100 xsm:rounded-2xl xsm:py-[9px] xsm:px-4">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <HiMagnifyingGlass className="text-lg text-gray-500 peer-focus:text-gray-900" />
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
