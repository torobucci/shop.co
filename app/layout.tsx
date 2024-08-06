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
      <head>
        <title>Shopco</title>
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />

      </head>
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
