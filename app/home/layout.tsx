
import { NavBar } from "../../ui/navigation";
import { fetchCategories } from "../../lib/data";
import { BottomNav } from "../../ui/bottom_nav";

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const categories = await fetchCategories()
    return (
        <>
            <NavBar categories={categories} />
            <div>{children}</div>
            <BottomNav />
        </>
    );
}
