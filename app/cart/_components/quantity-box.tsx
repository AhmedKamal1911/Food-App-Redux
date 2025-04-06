"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Minus, Plus } from "lucide-react";

export default function QuantityBox() {
  return (
    <div className="py-5 flex justify-center items-center gap-2">
      <Button variant={"ghost"} className="p-2! rounded-none">
        <Minus />
      </Button>
      <Input
        className="size-8 w-13 rounded-none text-center focus-visible:ring-primary/50 focus-visible:border-primary"
        type="text"
        maxLength={3}
        inputMode="numeric"
        pattern="[0-9]*"
        onInput={(e) => {
          const input = e.currentTarget;
          input.value = input.value.replace(/[^0-9]/g, "").slice(0, 3);
        }}
      />
      <Button variant={"ghost"} className="p-2! rounded-none">
        <Plus />
      </Button>
    </div>
  );
}
