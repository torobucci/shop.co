import { NavBar } from "@ui/navigation";
import { fetchCategories, getCartItemsCount } from "@lib/data";
import { BottomNav } from "@ui/bottom_nav";
import { auth } from "../../auth";
import { SignOut } from "@ui/signout";
import { handleSignOut } from "@ui/home/side-nav";
import { SessionContext } from "@ui/SessionContext";


export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  const userId = session?.user?.id;
  const categories = await fetchCategories();
  let cartCount = 0;
  if (typeof userId === "string") {
    cartCount = await getCartItemsCount(parseInt(userId));
  }

  return (
    <SessionContext session={session}>
      <NavBar categories={categories} cartCount={cartCount}>
        <SignOut handleSignOut={handleSignOut} />
      </NavBar>
      <div>{children}</div>
      <BottomNav />
    </SessionContext>
  );
}
