"use client";
import { signOut } from "next-auth/react";
import { useState } from "react";
import { toast } from "react-toastify";

export function useLogOut() {
  const [isLoading, setIsLoading] = useState(false);
  async function onLogout() {
    setIsLoading(true);
    try {
      await signOut();
    } catch (e) {
      console.error({ error: e });
      toast.error("Failed to logout due to network error");
      setIsLoading(false);
    }
  }
  return { onLogout, isLoading };
}
