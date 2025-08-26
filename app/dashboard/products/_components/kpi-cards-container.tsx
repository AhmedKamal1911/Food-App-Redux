import { DollarSign, Receipt, Store, Users } from "lucide-react";
import StatBox from "./stat-box";
import {
  getCurrentAndLastMonthTotalEarning,
  getOrdersCountForCurrentAndPreviousMonth,
  getTodaySalesAmount,
  getTotalOrders,
  getTotalOrdersEarning,
} from "@/lib/server/queries/order";
import { calculateGrowthPercentage, formatAmount } from "@/lib/utils";
import { getAllUsersCount } from "@/lib/server/queries";

export default async function KPICardsContainer() {
  const [
    totalOrders,
    todaySalesAmount,
    totalUsers,
    totalOrdersEarning,
    { currentMonthEarning, prevMonthEarning },
    { currentOrdersMonthCount, prevOrdersMonthCount },
  ] = await Promise.all([
    getTotalOrders(),
    getTodaySalesAmount(),
    getAllUsersCount(),
    getTotalOrdersEarning(),
    getCurrentAndLastMonthTotalEarning(),
    getOrdersCountForCurrentAndPreviousMonth(),
  ]);

  const earningGrowthPercentage = calculateGrowthPercentage(
    currentMonthEarning,
    prevMonthEarning
  );

  const ordersGrowthPercentage = calculateGrowthPercentage(
    currentOrdersMonthCount,
    prevOrdersMonthCount
  );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-2 gap-2">
      <StatBox
        className="bg-cyan-700 text-white"
        title="sales today"
        stat={`$${formatAmount(todaySalesAmount)}`}
        icon={
          <div className="p-2 bg-white/30 rounded-sm">
            <Store className="text-white" />
          </div>
        }
        details={
          <p className="text-sm text-white">* Updated every order success</p>
        }
      />

      <StatBox
        title="total earning"
        stat={`$${formatAmount(totalOrdersEarning)}`}
        icon={
          <div className="p-2 bg-green-400/30 rounded-sm">
            <DollarSign className="text-green-700" />
          </div>
        }
        details={
          <div className="space-x-1 text-[16px] capitalize">
            <GrowthPercentage value={earningGrowthPercentage} />

            <span className="font-semibold">
              more earning than usual in last month
            </span>
          </div>
        }
      />

      <StatBox
        title="total orders"
        stat={totalOrders}
        icon={
          <div className="p-2 bg-gray-300/30 rounded-sm">
            <Receipt className="text-black" />
          </div>
        }
        details={
          <div className="space-x-1 text-[16px] capitalize">
            <GrowthPercentage value={ordersGrowthPercentage} />
            <span className="font-semibold">
              more orders than usual in last month
            </span>
          </div>
        }
      />
      <StatBox
        className="bg-secondary text-white"
        title="total users"
        stat={totalUsers}
        icon={
          <div className="p-2 bg-white/30  rounded-sm">
            <Users className="text-white" />
          </div>
        }
        details={<p className="text-sm capitalize">* total system users</p>}
      />
    </div>
  );
}

type GrowthPercentageProps = {
  value: string | number;
  className?: string;
};

function GrowthPercentage({ value, className = "" }: GrowthPercentageProps) {
  const num = Number(value);
  const color = num > 0 ? "text-green-500" : "text-red-500";
  const sign = num > 0 ? "+" : "-";
  return (
    <span className={`${color} ${className}`}>
      {sign}
      {Math.abs(num)}%
    </span>
  );
}
