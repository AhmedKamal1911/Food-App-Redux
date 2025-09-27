import { convertToSubcurrency } from "@/lib/utils";
import { createPaymentIntentResponseSchema } from "@/lib/validation/payment-schema";
import { useQuery } from "@tanstack/react-query";

async function fetchPaymentIntent({
  subtotal,
  metadata,
}: {
  subtotal: number;
  metadata: Record<string, unknown>;
}) {
  const res = await fetch(`/api/create-payment-intent`, {
    method: "POST",
    body: JSON.stringify({
      amount: convertToSubcurrency(subtotal),
      headers: {
        "Content-Type": "application/json",
      },
      metadata,
    }),
  });
  const data = await res.json();
  const parsedData = createPaymentIntentResponseSchema.parse(data);

  return parsedData;
}

export function useGetPaymentIntent(
  {
    subtotal,
    metadata,
  }: {
    subtotal: number;
    metadata: Record<string, unknown>;
  },
  enableFetch: boolean
) {
  const {
    data,
    error: paymentIntentError,
    isLoading: paymentIntentSecretLoading,
    refetch,
  } = useQuery({
    queryFn: async () => fetchPaymentIntent({ subtotal, metadata }),
    queryKey: ["paymentIntent", subtotal],
    enabled: enableFetch,
    refetchOnWindowFocus: false,
  });
  return { data, paymentIntentError, paymentIntentSecretLoading, refetch };
}
