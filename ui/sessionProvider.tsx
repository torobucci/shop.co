"use client";

import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

export default function SessionProviderClientComponent({
  children,
  session
}: {
  children: React.ReactNode;
  session:any
}) {
  return <SessionProvider session={session}>{children}</SessionProvider>;
}


