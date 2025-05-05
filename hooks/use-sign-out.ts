"use client";
import { signOut } from "next-auth/react";
import { useState } from "react";

export function useSignOut() {
  const [loading, setLoading] = useState(false);
  async function onLogout() {
    setLoading(true);
    await signOut().finally(() => setLoading(false));
  }
  return { onLogout, loading };
}
