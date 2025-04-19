import { DollarSign, Receipt, Store, Users } from "lucide-react";
import StatBox from "./stat-box";

type Props = {};
export default function KPICardsContainer({}: Props) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-2 gap-4">
      <StatBox
        className="bg-cyan-700 text-white"
        title="sales today"
        stat="$120"
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
        stat="$81.215"
        icon={
          <div className="p-2 bg-green-400/30 rounded-sm">
            <DollarSign className="text-green-700" />
          </div>
        }
        details={
          <div className="space-x-1 text-[16px] capitalize">
            <span className="text-green-500">+8.26%</span>
            <span className="font-semibold">more earning than usual</span>
          </div>
        }
      />

      <StatBox
        title="total orders"
        stat="102"
        icon={
          <div className="p-2 bg-gray-300/30 rounded-sm">
            <Receipt className="text-black" />
          </div>
        }
        details={
          <div className="space-x-1 text-[16px] capitalize">
            <span className="text-green-500">+2.18%</span>
            <span className="font-semibold">more orders than usual</span>
          </div>
        }
      />
      <StatBox
        title="total earning"
        stat="$81.215"
        icon={
          <div className="p-2 bg-orange-400/30 rounded-sm">
            <Users className="text-orange-700" />
          </div>
        }
        details={
          <div className="space-x-1 text-[16px] capitalize">
            <span className="text-green-500">+3.06%</span>
            <span className="font-semibold">more visitors than usual</span>
          </div>
        }
      />
    </div>
  );
}
