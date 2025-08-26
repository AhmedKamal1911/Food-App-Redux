"use client";

import { useSession } from "next-auth/react";
import { useEffect, useMemo, useRef } from "react";

export function useRefreshClientSession() {
  const { update } = useSession();
  const updateSession = useRef(update);
  useEffect(() => {
    updateSession.current = update;
  }, [update]);
  const memoizedSessionObj = useMemo(() => {
    return { updateSession: updateSession.current };
  }, []);
  return memoizedSessionObj;
}
