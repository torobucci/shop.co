import { Inter } from "next/font/google";
import "./globals.css";
import StoreProvider from "./StoreProvider";
import SessionProviderClientComponent from "../ui/sessionProvider"
import { auth } from "../auth";

const inter = Inter({ subsets: ["latin"] });




export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth()
  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        <StoreProvider>
          <SessionProviderClientComponent session={session}>
            {children}
          </SessionProviderClientComponent>

        </StoreProvider>

      </body>
    </html>
  );
}
