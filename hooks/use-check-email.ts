import { EmailCheckResponse } from "@/app/api/check-email/route";
import { EmailStatus } from "@/components/common/custom-email-input";
import { getBaseUrl } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";

export function useCheckEmail({
  setIsEmailStatusOk,
}: {
  setIsEmailStatusOk?: (status: boolean) => void;
}) {
  const latestStatusRef = useRef<EmailStatus>("idle");
  const [status, setStatus] = useState<EmailStatus>("idle");
  const [error, setError] = useState<null | string>(null);
  async function checkEmail(email: string) {
    setStatus("pending");
    setError(null);
    try {
      const response = await fetch(
        `${getBaseUrl()}/api/check-email?email=${email}`,
        { method: "POST" }
      );

      const data = (await response.json()) as EmailCheckResponse;
      console.log({ data });

      if (data.status === "inavaliable" || data.status === "available") {
        setStatus(data.status);
        latestStatusRef.current = data.status;
      }
    } catch (error) {
      console.log({ error });
      setStatus("error");
      setError("failed to check email");
    }
  }
  useEffect(() => {
    setIsEmailStatusOk?.(status === "idle" || status === "available");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);
  return { error, status, setStatus, checkEmail, latestStatusRef };
}
