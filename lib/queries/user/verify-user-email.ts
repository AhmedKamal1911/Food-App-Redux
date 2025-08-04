import "server-only";
import { getBaseUrl } from "@/lib/utils";
import { cookies } from "next/headers";
async function getSessionCookieString() {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("next-auth.session-token")?.value;
  console.log("Cookie value:", sessionCookie);
  // TODO: __Secure-next-auth.session-token FOR PRODUCTION
  return `next-auth.session-token=${sessionCookie}`;
}
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
