"use client";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

export function useLogout(redirectPath: string) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  async function onLogout() {
    setIsLoading(true);
    try {
      await signOut({ redirect: false });
      toast.success("You Logged Out Successfully.");
      router.replace(redirectPath);
    } catch (e) {
      console.error(e);
      toast.error("Failed to logout due to network error");
      setIsLoading(false);
    }
  }
  return { onLogout, isLoading };
}
