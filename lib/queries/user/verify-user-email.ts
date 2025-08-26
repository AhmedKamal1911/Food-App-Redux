import "server-only";
import { getBaseUrl } from "@/lib/utils";

import { getSessionCookieString } from "@/lib/server-utils";

export async function verifyUserEmail(token: string) {
  const res = await fetch(`${getBaseUrl()}/api/verify-email?token=${token}`, {
    method: "POST",
    credentials: "include",
    headers: {
      Cookie: await getSessionCookieString(), // Include your cookie(s) here
      "Content-Type": "application/json",
    },
  });
  const response = await res.json();
  console.log("Response from verifyUserEmail:", response);
  return res.ok;
}
