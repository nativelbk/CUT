"use client";
import { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (error) {
      console.error(error);
      setLoading(false);
      return;
    }

    const response = await fetch("/api/create-subscription", {
      method: "POST",
      body: JSON.stringify({
        paymentMethodId: paymentMethod.id,
        priceId: "price_1QgM3OIAMQk1Je1FGucPGmdD",
        email: "nativel@gmail.com",
      }),
    });

    const subscription = await response.json();

    console.log(subscription);

    if (subscription.error) {
      setIsError(true);
      console.error(subscription.error);
      setLoading(false);
      return;
    }

    const { clientSecret } = subscription;

    const { error: confirmError } = await stripe.confirmCardPayment(
      clientSecret
    );

    if (confirmError) {
      console.error(confirmError);
      setIsError(true);

      setLoading(false);
      return;
    }

    setLoading(false);
  };

  const cardElementStyle = {
    base: {
      color: "#424770", // Couleur principale du texte
      fontFamily: '"Roboto", "Helvetica Neue", sans-serif', // Police moderne
      fontSize: "16px",
      fontSmoothing: "antialiased",
      "::placeholder": {
        color: "#aab7c4", // Couleur des placeholders
      },
      padding: "10px 12px",
      backgroundColor: "white",
      border: "1px solid #d1d3db",
      borderRadius: "6px",
    },
    invalid: {
      color: "#e45858",
      iconColor: "#e45858",
    },
    complete: {
      color: "#4caf50",
    },
  };

  return (
    <div>
      {/* <form onSubmit={handleSubmit}> */}
      <CardElement options={{ hidePostalCode: true }} />
      {isError && (
        <p
          style={{
            color: "red",
          }}
        >
          Une erreur s&apos;est produite
        </p>
      )}
      <div
        className="flex justify-end"
        style={{ marginTop: "10px", display: "flex", gap: "10px" }}
      >
        <button
          type="button"
          //   onClick={handleCancel}
          style={{
            padding: "5px 20px",
            backgroundColor: "#f44336",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            height: "40px",
          }}
        >
          Annuler
        </button>
        <button
          style={{
            padding: "5px 20px",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            height: "40px",
          }}
          className="bg-blue"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
      {/* </form> */}
    </div>
  );
};

export default CheckoutForm;
