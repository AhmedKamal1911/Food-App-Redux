import SettingsTabs from "./components/settings-tabs";

import { redirect, RedirectType } from "next/navigation";

import IntroBanner from "@/components/common/intro-banner";
import { getUserById } from "@/lib/server/queries/user";
import { getCurrentUserTransactions } from "@/lib/server/queries/transaction/get-user-transactions";
import { getCurrentSession } from "@/lib/dal/user";

export default async function AccountPage() {
  const sessionResponse = await getCurrentSession();

  if (!sessionResponse.success) redirect("/", RedirectType.replace);

  const user = await getUserById(sessionResponse.session.user.id);
  if (!user) redirect("/", RedirectType.replace);
  const userTransactions = await getCurrentUserTransactions();
  console.log({ userTransactions });
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
