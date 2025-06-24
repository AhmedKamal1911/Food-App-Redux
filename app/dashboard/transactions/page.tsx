import TransactionTableSection from "./components/transactions-table-section";

type Props = {};
const transactions = [
  {
    id: "1",
    name: "Ahmed Ali",
    createdAt: "2024-06-24",
    status: "paid",
    amount: 250,
  },
  {
    id: "2",
    name: "Sara Mohamed",
    createdAt: "2024-06-22",
    status: "unpaid",
    amount: 120,
  },
  {
    id: "3",
    name: "Mohamed Samir",
    createdAt: "2024-06-20",
    status: "paid",
    amount: 400,
  },
  // ... أضف المزيد حسب الحاجة
];
export default function TransactionsPage({}: Props) {
  return (
    <div className="bg-white rounded-sm min-h-full p-4">
      <TransactionTableSection data={transactions} />
    </div>
  );
}
