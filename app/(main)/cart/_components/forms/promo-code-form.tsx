"use client";
import { Button } from "@/components/ui/button";
import CustomInputField from "@/components/common/custom-input-field";
import { Form } from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Dispatch, SetStateAction, useState } from "react";
import { CheckCircle } from "lucide-react";
const formSchema = z.object({
  promoCode: z.string().optional(),
});
export function PromoCodeForm() {
  const [isPromoCodeApplied, setIsPromoCodeApplied] = useState(true);
  const [promoCodeData, setPromoCodeData] = useState(() => ({
    name: "",
    discount: "",
  }));
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      promoCode: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    setPromoCodeData({ name: values.promoCode ?? "", discount: "20" });

    setIsPromoCodeApplied(true);
    // ✅ This will be type-safe and validated.
    console.log(values);
  }
  return isPromoCodeApplied ? (
    <PromoCodeAppliedBox
      setIsPromoCodeApplied={setIsPromoCodeApplied}
      name={promoCodeData.name}
      discount={promoCodeData.discount}
    />
  ) : (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex flex-col  gap-5">
          <CustomInputField
            control={form.control}
            className="uppercase max-w-[300px] lg:w-full"
            name="promoCode"
            placeholder="enter your code"
          />
          <Button className="bg-primary self-start text-white font-semibold text-[19px] px-5 py-5 rounded-sm">
            Apply
          </Button>
        </div>
      </form>
    </Form>
  );
}

function PromoCodeAppliedBox({
  name,
  discount,
  setIsPromoCodeApplied,
}: {
  name: string;
  discount: string;
  setIsPromoCodeApplied: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <div className="flex items-center justify-between px-3 p-1 border-2 border-green-500 rounded-sm max-w-[350px] lg:w-full">
      <div className="flex items-center gap-3">
        <CheckCircle className="size-7 text-green-500" />
        <div className="flex flex-col">
          <span className="font-semibold text-nowrap">
            {name.toUpperCase()} applied
          </span>
          <span className="text-gray-500">{`(${discount}% off)`}</span>
        </div>
      </div>
      <Button
        onClick={() => setIsPromoCodeApplied(false)}
        variant={"ghost"}
        className="text-rose-700 hover:bg-rose-500/60 hover:text-white rounded-none font-semibold"
      >
        Remove
      </Button>
    </div>
  );
}
