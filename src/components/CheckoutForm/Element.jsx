"use client";

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "@/components/CheckoutForm/CheckoutForm";

export default function Element() {
  const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
    { locale: "fr" }
  );
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm priceId="your-price-id-here" />
    </Elements>
  );
}
