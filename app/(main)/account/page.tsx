import { getServerSession } from "next-auth";
import SettingsTabs from "./components/settings-tabs";
import { authOptions } from "@/lib/auth";
import { redirect, RedirectType } from "next/navigation";

import IntroBanner from "@/components/common/intro-banner";
import { getUserById } from "@/lib/server/queries/user";

export default async function AccountPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/", RedirectType.replace);

  const user = await getUserById(session.user.id);

  if (!user) redirect("/", RedirectType.replace);

  const { password, ...userInfo } = user;
  const userInfoWithFlag = {
    ...userInfo,
    hasPassword: !!password,
  };

  return (
    <main className="bg-white min-h-screen ">
      <IntroBanner
        title="account"
        breadcrumbPaths={[{ name: "account", href: "/account" }]}
      />
      <div className="container py-4">
        <SettingsTabs user={userInfoWithFlag} />
      </div>
    </main>
  );
}
