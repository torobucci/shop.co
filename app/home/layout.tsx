
import { NavBar } from "../../ui/navigation";
import { fetchCategories, getCartItemsCount } from "../../lib/data";
import { BottomNav } from "../../ui/bottom_nav";

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const categories = await fetchCategories()
    const cartCount = await getCartItemsCount(1)
    return (
        <>
            <NavBar categories={categories} cartCount={cartCount} />
            <div>{children}</div>
            <BottomNav />
        </>
    );
}
