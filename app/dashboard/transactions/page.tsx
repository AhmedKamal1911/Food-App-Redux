import TransactionTableSection from "./components/transactions-table-section";
import { getUserTransactions } from "@/lib/server/queries/transaction";
import { getCurrentSession } from "@/lib/dal/user";
import { redirect, RedirectType } from "next/navigation";
import { TransactionOrder } from "@/lib/types/product";

type Props = {};

// const transactions: TransactionOrder[] = [
//   {
//     id: "order-1",
//     userId: "user-1",
//     user: { name: "ahmed", email: "ahmed@gmail.com" },
//     status: "delivered",
//     total: 150,
//     createdAt: new Date("2024-06-25T10:00:00Z"),
//     updatedAt: new Date("2024-06-25T10:00:00Z"),
//     items: [
//       {
//         id: "product-1",
//         qty: 2,
//         createdAt: new Date(),
//         updatedAt: new Date(),
//         orderId: "order-1",
//         productId: "product-1",
//         selectedSizeId: "size-1",
//         product: {
//           id: "product-1",
//           name: "Pizza",
//           price: 30,
//           image: "/images/categories-section/burger.jpg",
//           updatedAt: new Date(),
//           createdAt: new Date(),
//           slug: "pizza",
//           description: "Delicious pizza",
//           categoryId: null,
//         },
//         selectedSize: {
//           name: "Medium",
//           id: "size-1",
//           price: 5,
//           createdAt: new Date(),
//           updatedAt: new Date(),
//           productId: "product-1",
//         },
//         selectedExtras: [
//           {
//             createdAt: new Date(),
//             updatedAt: new Date(),
//             id: "extra-1",
//             name: "Extra Cheese",
//             price: 2,
//             productId: "product-1",
//             productOrderId: "order-1",
//           },
//         ],
//       },
//     ],
//   },
//   {
//     id: "order-2",
//     userId: "user-2",
//     user: { name: "sara", email: "sara@gmail.com" },
//     status: "pending",
//     total: 90,
//     createdAt: new Date("2024-06-24T15:30:00Z"),
//     updatedAt: new Date("2024-06-24T15:30:00Z"),
//     items: [
//       {
//         id: "product-2",
//         qty: 1,
//         createdAt: new Date(),
//         updatedAt: new Date(),
//         orderId: "order-2",
//         productId: "product-2",
//         selectedSizeId: "size-2",
//         product: {
//           id: "product-2",
//           name: "Chicken Burger",
//           price: 40,
//           image: "/images/categories-section/burger.jpg",
//           updatedAt: new Date(),
//           createdAt: new Date(),
//           slug: "chicken-burger",
//           description: "Juicy chicken burger",
//           categoryId: null,
//         },
//         selectedSize: {
//           name: "Large",
//           id: "size-2",
//           price: 10,
//           createdAt: new Date(),
//           updatedAt: new Date(),
//           productId: "product-2",
//         },
//         selectedExtras: [
//           {
//             createdAt: new Date(),
//             updatedAt: new Date(),
//             id: "extra-2",
//             name: "Fries",
//             price: 5,
//             productId: "product-2",
//             productOrderId: "order-2",
//           },
//         ],
//       },
//     ],
//   },
//   {
//     id: "order-3",
//     userId: "user-3",
//     user: { name: "mohamed", email: "mohamed@gmail.com" },
//     status: "canceled",
//     total: 60,
//     createdAt: new Date("2024-06-23T12:45:00Z"),
//     updatedAt: new Date("2024-06-23T12:45:00Z"),
//     items: [
//       {
//         id: "product-3",
//         qty: 3,
//         createdAt: new Date(),
//         updatedAt: new Date(),
//         orderId: "order-3",
//         productId: "product-3",
//         selectedSizeId: "size-3",
//         product: {
//           id: "product-3",
//           name: "Veggie Pizza",
//           price: 20,
//           image: "/images/categories-section/burger.jpg",
//           updatedAt: new Date(),
//           createdAt: new Date(),
//           slug: "veggie-pizza",
//           description: "Fresh veggie pizza",
//           categoryId: null,
//         },
//         selectedSize: {
//           name: "Small",
//           id: "size-3",
//           price: 0,
//           createdAt: new Date(),
//           updatedAt: new Date(),
//           productId: "product-3",
//         },
//         selectedExtras: [],
//       },
//     ],
//   },
// ];
export default async function TransactionsPage({}: Props) {
  const session = await getCurrentSession();
  if (!session.success) redirect("/login", RedirectType.replace);
  const transactions = await getUserTransactions();
  console.log("Transactions:", transactions);
  return (
    <div className="bg-white rounded-sm min-h-full p-4">
      <TransactionTableSection data={transactions} />
    </div>
  );
}
