'use client'
import { PowerIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
export function SignOut({ handleSignOut }: { handleSignOut: () => Promise<null> }) {
    const [loading, setLoading] = useState(false)

    const handleFormSubmit = async () => {
        setLoading(true);
        await handleSignOut()
        setLoading(false);
    };
    return (

        <button onClick={handleFormSubmit} className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-slate-300 p-3 text-sm font-medium hover:text-red-600 hover:bg-red-200 md:flex-none md:p-2 md:px-3">
            <div className="flex gap-2">
                <PowerIcon className="w-6" />
                <div>Sign Out</div>
                {loading && <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                </svg>}
            </div>
        </button>

    )
}
