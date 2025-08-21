import TransactionTableSection from "./_components/transactions-table-section";

import { getCurrentSession } from "@/lib/dal/user";

import { redirect, RedirectType } from "next/navigation";
import type { Metadata } from "next";
import { getAllTransactions } from "@/lib/server/queries";

export const metadata: Metadata = {
  title: "Transactions",
  description:
    "Review and manage all payment transactions in the Pizzon Dashboard. Monitor order payments, refunds, and financial activity with ease.",
  openGraph: {
    title: "Transactions | Dashboard | Pizzon Food Delivery",
    description:
      "Track and oversee all payment transactions, refunds, and order payments within the Pizzon Dashboard for accurate financial management.",
  },
};
export default async function TransactionsPage() {
  const session = await getCurrentSession();
  if (!session) redirect("/login", RedirectType.replace);
  const transactions = await getAllTransactions();
  return (
    <div className="bg-white rounded-sm min-h-full p-4">
      <TransactionTableSection data={transactions} />
    </div>
  );
}
