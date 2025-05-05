"use client";
import { Session } from "next-auth";
import { SessionProvider as NextAuthSessionProvider } from "next-auth/react";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  session?: Session;
};

export const AuthSessionProvider = ({ children, session }: Props) => {
  return <NextAuthSessionProvider>{children}</NextAuthSessionProvider>;
};
