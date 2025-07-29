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
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (e) {
      toast.error("Failed to logout due to network error");
      setIsLoading(false);
    }
  }
  return { onLogout, isLoading };
}
