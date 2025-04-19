"use client";
type Props = {};

import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

const chartConfig: ChartConfig = {
  revenue: {
    label: "Revenue",
    color: "var(--primary)",
  },
  expenses: {
    label: "Expenses",
    color: "var(--chart-2)",
  },
};
const chartData = [
  { month: "January", revenue: 186, expenses: 80 },
  { month: "February", revenue: 305, expenses: 200 },
  { month: "March", revenue: 237, expenses: 120 },
  { month: "April", revenue: 73, expenses: 190 },
  { month: "May", revenue: 209, expenses: 130 },
  { month: "June", revenue: 214, expenses: 140 },
];

export default function RevenueChartBars({}: Props) {
  return (
    <div className="flex flex-col gap-2 max-h-[300px]">
      <div className="flex gap-2 items-center">
        <span className="text-2xl sm:text-3xl font-semibold text-black">
          $2,810.00
        </span>
        <span className="text-[18px] text-green-500">{`(+${50.5}%)`}</span>
      </div>
      <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
        <BarChart accessibilityLayer data={chartData}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="month"
            tickLine={true}
            tickMargin={5}
            axisLine={false}
            tickFormatter={(value) => value.slice(0, 3)}
          />
          <ChartLegend
            content={<ChartLegendContent className="text-[17px]" />}
          />

          <ChartTooltip
            content={<ChartTooltipContent />}
            cursor={{ fill: "black", opacity: 0.05 }}
          />
          <Bar dataKey="revenue" fill="var(--color-revenue)" radius={3} />
          <Bar dataKey="expenses" fill="var(--color-expenses)" radius={3} />
        </BarChart>
      </ChartContainer>
    </div>
  );
}
