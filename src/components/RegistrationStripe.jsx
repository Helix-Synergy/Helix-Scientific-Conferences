import React, { useState, useEffect } from "react";
import {
  Elements,
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

// Stripe public key from your Stripe Dashboard
// IMPORTANT: Replace 'YOUR_STRIPE_PUBLIC_KEY' with your actual key
const stripePromise = loadStripe(
  "pk_test_51R1tMEPsMBn7O9MOD4n1IAk73xq9eoXqdux5vXA1db86TELFWKYyUGGcwMGr2wtDjj8Su7gNKmm2GkyosfyqwHlM00U9TfpHUm"
);

const CheckoutForm = ({ totalAmount, participantDetails, selectedItems }) => {
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent.status) {
        case "succeeded":
          setMessage("Payment succeeded!");
          break;
        case "processing":
          setMessage("Your payment is processing.");
          break;
        case "requires_payment_method":
          setMessage("Your payment was not successful, please try again.");
          break;
        default:
          setMessage("Something went wrong.");
          break;
      }
    });
  }, [stripe]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: "http://localhost:3000/completion",
      },
    });

    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message);
    } else {
      setMessage("An unexpected error occurred.");
    }

    setIsLoading(false);
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <PaymentElement id="payment-element" />
      <button
        disabled={isLoading || !stripe || !elements}
        id="submit"
        className="w-full max-w-sm bg-green-600 text-white px-7 py-3.5 rounded-xl text-lg font-bold
                   hover:bg-green-700 transition duration-300 transform hover:scale-105 shadow-md
                   focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 mt-6"
      >
        <span id="button-text">
          {isLoading ? "Submitting..." : "Pay Now"}
        </span>
      </button>
      {/* Show any error or success messages */}
      {message && <div id="payment-message" className="mt-4 text-red-500">{message}</div>}
    </form>
  );
};

export const RegistrationStripe = ({ totalAmount, participantDetails, selectedItems }) => {
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    // IMPORTANT: You need to set up a server to handle this
    const createPaymentIntent = async () => {
      try {
        const response = await fetch(
          "http://localhost:4242/create-payment-intent",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              items: selectedItems,
              amount: Math.round(totalAmount * 100), // Stripe requires amount in cents
              participantDetails: participantDetails, // Pass participant data to the backend
            }),
          }
        );
        const { clientSecret: newClientSecret } = await response.json();
        setClientSecret(newClientSecret);
      } catch (error) {
        console.error("Error creating PaymentIntent:", error);
      }
    };
    createPaymentIntent();
  }, [totalAmount, selectedItems, participantDetails]);

  const options = {
    clientSecret,
    appearance: {
      theme: "stripe",
    },
  };

  return (
    <div>
      {clientSecret ? (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm
            totalAmount={totalAmount}
            participantDetails={participantDetails}
            selectedItems={selectedItems}
          />
        </Elements>
      ) : (
        <div className="flex justify-center items-center h-40">
          <p>Loading payment form...</p>
        </div>
      )}
    </div>
  );
};

export default RegistrationStripe;