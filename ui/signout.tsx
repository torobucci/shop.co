import { PowerIcon } from "@heroicons/react/24/outline";
import { signOut } from "../auth";
export function SignOut() {
    return (
        <form action={async () => {
            'use server';
            await signOut();
        }}>
            <button className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-slate-300 p-3 text-sm font-medium hover:text-red-600 hover:bg-red-200 md:flex-none md:p-2 md:px-3">
                <div className="flex gap-2">
                    <PowerIcon className="w-6" />
                    <div>Sign Out</div>
                </div>
            </button>
        </form>
    )
}
