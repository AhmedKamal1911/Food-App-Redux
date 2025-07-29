import TransactionTableSection from "./components/transactions-table-section";

import { getCurrentSession } from "@/lib/dal/user";
import { getUsersTransactions } from "@/lib/server/queries/transaction";
import { redirect, RedirectType } from "next/navigation";

export default async function TransactionsPage() {
  const session = await getCurrentSession();
  if (!session) redirect("/login", RedirectType.replace);
  const transactions = await getUsersTransactions();
  return (
    <div className="bg-white rounded-sm min-h-full p-4">
      <TransactionTableSection data={transactions} />
    </div>
  );
}
