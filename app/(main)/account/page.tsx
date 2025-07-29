import SettingsTabs from "./components/settings-tabs";

import { redirect, RedirectType } from "next/navigation";

import IntroBanner from "@/components/common/intro-banner";
import { getUserById } from "@/lib/server/queries/user";
import { getCurrentSession } from "@/lib/dal/user";
import { getCurrentUserTransactions } from "@/lib/server/queries/transaction";

export default async function AccountPage() {
  const session = await getCurrentSession();

  if (!session) redirect("/", RedirectType.replace);

  const user = await getUserById(session.user.id);
  if (!user) redirect("/", RedirectType.replace);
  const userTransactions = await getCurrentUserTransactions();

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
        <SettingsTabs
          user={userInfoWithFlag}
          userTransactions={userTransactions}
        />
      </div>
    </main>
  );
}
