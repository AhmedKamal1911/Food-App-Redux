"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { Minus, Plus } from "lucide-react";
import { useEffect, useState } from "react";

export default function QuantityBox({
  value,
  onIncrease,
  onDecrease,
  onQtyChange,
}: {
  value: number;
  onIncrease: () => void;
  onDecrease: () => void;
  onQtyChange: (qty: number) => void;
}) {
  const [qtyValue, setQtyValue] = useState(value);

  useEffect(() => {
    setQtyValue(value);
  }, [value]);

  return (
    <div className="py-1 flex justify-center items-center gap-2">
      <Button
        variant={"ghost"}
        className="p-2! rounded-none"
        onClick={onDecrease}
      >
        <Minus />
      </Button>
      <Input
        value={qtyValue}
        className="size-8 w-13 rounded-none text-center focus-visible:ring-primary/50 focus-visible:border-primary"
        type="text"
        maxLength={3}
        inputMode="numeric"
        pattern="[0-9]*"
        onChange={(e) => {
          const input = e.currentTarget;
          onQtyChange(+e.target.value === 0 ? 1 : +e.target.value);
          setQtyValue(
            +input.value.replace(/[^0-9]/g, "").slice(0, 3) === 0
              ? 1
              : +input.value.replace(/[^0-9]/g, "").slice(0, 3)
          );
        }}
      />
      <Button
        variant={"ghost"}
        className="p-2! rounded-none"
        onClick={onIncrease}
      >
        <Plus />
      </Button>
    </div>
  );
}
