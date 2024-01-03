"use client";

import type { Session } from "next-auth";
import { SessionProvider, signIn } from "next-auth/react";
import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export function Providers(props: {
  children: React.ReactNode;
  serverSession: Session | null;
}) {
  const queryClient = new QueryClient();
  return (
    <>
      <pre className=" text-red-500">
        {JSON.stringify(props.serverSession, null, 2)}
      </pre>

      <QueryClientProvider client={queryClient}>
        <SessionProvider session={props.serverSession}>
          <button onClick={() => signIn('discord')}>Sign123123123 in</button>
          {props.children}
        </SessionProvider>
      </QueryClientProvider>
    </>
  );
}
