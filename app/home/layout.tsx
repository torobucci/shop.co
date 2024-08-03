
import { NavBar } from "../../ui/navigation";
import { fetchCategories, getCartItemsCount } from "../../lib/data";
import { BottomNav } from "../../ui/bottom_nav";
import { auth } from "../../auth";
import { string } from "zod";

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const session  = await auth()
    const userId = session?.user?.id
    const categories = await fetchCategories()
    let cartCount = 0
    if(typeof userId === 'string'){
       cartCount = await getCartItemsCount(parseInt(userId))
    }

    return (
        <>
            <NavBar session={session} categories={categories} cartCount={cartCount} />
            <div>{children}</div>
            <BottomNav />
        </>
    );
}
