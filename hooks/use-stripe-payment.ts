import { useState } from "react";
import { useStripe, useElements } from "@stripe/react-stripe-js";

export function useStripePayment() {
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  const confirmPayment = async (clientSecret: string, returnUrl: string) => {
    if (!stripe || !elements || !clientSecret) return false;

    const { error: validationErrors } = await elements.submit();
    if (validationErrors) return false;

    setIsLoading(true);
    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: { return_url: returnUrl },
      clientSecret,
    });

    if (error) setMessage(error.message || "An unexpected error occurred.");
    setIsLoading(false);
    return !error;
  };

  return { confirmPayment, isLoading, message, setMessage };
}
