import React, { useState, useEffect } from "react";
import {
  Mic2,
  Webcam,
  Pencil,
  ExternalLink,
  Users,
  Briefcase,
  FlaskConical,
  Award,
  Book,
} from "lucide-react";
import { DotLottieReact } from "@dotlottie/react-dotlottie";
import { useNavigate } from "react-router-dom";
import { useConference } from "../hooks/useConference";

// ---------------------- STRIPE IMPORTS AND SETUP ----------------------
import {
  Elements,
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

// Replace with your actual Stripe publishable key
const stripePromise = loadStripe("pk_test_TYooMQauvdEDq54NiTphI7jx");

// ---------------------- NEW CHECKOUT FORM COMPONENT ----------------------
const CheckoutForm = ({ totalAmount, handleSubmit, contactInfo }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();

    // Trigger form validation from the parent component
    const formIsValid = await handleSubmit(e, true);
    if (!formIsValid) {
      return;
    }

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      return;
    }

    setIsLoading(true);

    try {
      // Call your backend to create the PaymentIntent
      const response = await fetch("http://localhost:4242/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // Send the total amount and a unique ID for idempotency if needed
        body: JSON.stringify({
          totalAmount: Math.round(totalAmount * 100), // Stripe expects the amount in cents
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create PaymentIntent on the server.");
      }

      const { clientSecret } = await response.json();

      const { error } = await stripe.confirmPayment({
        elements,
        clientSecret,
        confirmParams: {
          return_url: `${window.location.origin}/payment-success`,
          shipping: {
            name: contactInfo.fullName,
            address: {
              line1: "510 Townsend St",
              postal_code: "98140",
              city: "San Francisco",
              state: "CA",
              country: "US",
            },
          },
        },
      });

      if (error) {
        setErrorMessage(error.message);
      }
    } catch (e) {
      setErrorMessage(e.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <PaymentElement />
      {errorMessage && <div className="text-red-500 mt-4">{errorMessage}</div>}
      <button
        type="submit"
        className="w-full max-w-sm bg-green-600 text-white px-7 py-3.5 rounded-xl text-lg font-bold
                               hover:bg-green-700 transition duration-300 transform hover:scale-105 shadow-md
                               focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 mt-6"
        disabled={isLoading || !stripe || !elements}
      >
        {isLoading ? "Processing..." : `Pay $${totalAmount.toFixed(2)}`}
      </button>
    </form>
  );
};

// ---------------------- ORIGINAL REGISTRATION PAGE COMPONENT ----------------------
const RegistrationPage = () => {
  const navigate = useNavigate();
  const {
    conferenceDetails,
    registrationCategories,
    addOnCategories,
    getCardColors,
    getCategoryIcon,
    selectedItems,
    handleQuantityChange,
    totalAmount,
    selectedConferenceOption,
    handleProceedWithConference,
    allConferenceLists,
    allConferences,
    setParticipantFullName,
    setParticipantEmail,
    setParticipantCountry,
    setParticipantPhone,
    setParticipantOrganization,
    participantFullName,
    participantEmail,
    participantCountry,
    participantPhone,
    participantOrganization,
  } = useConference();

  // New state to manage loading and potential payment errors
  const [isLoading, setIsLoading] = useState(false);
  const [paymentError, setPaymentError] = useState(null);

  // New handleSubmit function to encapsulate form submission logic
  const handleSubmit = (e) => {
    e.preventDefault();
    if (totalAmount === 0) {
      alert("Please select at least one item to register.");
      return;
    }
    // You can add more client-side validation here if needed
    if (!participantFullName || !participantEmail || !participantCountry) {
      alert("Please fill in all required contact information.");
      return false; // Indicate validation failure
    }
    return true; // Indicate validation success
  };

  // If no conference is selected, show the list of conferences
  if (!selectedConferenceOption) {
    return (
      <div className="bg-white min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
          <div className="flex flex-col md:flex-row items-center justify-between gap-10 md:gap-16 mb-16 md:mb-20">
            <div className="w-full md:w-1/2 text-center md:text-left">
              <h2 className="text-4xl md:text-6xl font-extrabold leading-tight text-gray-800 mb-6">
                Welcome to Our{" "}
                <span className="bg-gradient-to-r from-teal-500 to-green-600 bg-clip-text text-transparent">
                  Events
                </span>
                !
              </h2>
              <p className="text-lg md:text-xl text-gray-600 mb-8">
                Explore our upcoming conferences and webinars. Click to learn more
                and register your spot today!
              </p>
              <div className="flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-3">
                <button
                  type="button"
                  onClick={() =>
                    handleProceedWithConference(selectedConferenceOption)
                  }
                  className="w-full sm:w-auto bg-purple-300 text-purple px-6 py-3 rounded-xl text-base font-semibold
                                        hover:bg-purple-400 transition duration-300 transform hover:scale-105 shadow-md
                                        focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                >
                  Proceed to Registration
                </button>
                <button
                  type="button"
                  onClick={() => navigate("/")}
                  className="w-full sm:w-auto bg-gray-600 text-white px-6 py-3 rounded-xl text-base font-semibold
                                        hover:bg-gray-700 transition duration-300 transform hover:scale-105 shadow-md
                                        focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                >
                  Go to Home
                </button>
              </div>
            </div>

            <div className="w-full md:w-1/2 flex items-center justify-center p-4 bg-gray-100 rounded-2xl shadow-inner border border-gray-200">
              <DotLottieReact
                src="https://lottie.host/4e9e5c30-2446-4e4f-901a-5db0804727f6/j8hlykUr3q.lottie"
                loop
                autoplay
                className="w-full h-full max-w-md object-contain"
                style={{ aspectRatio: "1.618/1" }}
              />
            </div>
          </div>

          <div className="w-full max-w-7xl mx-auto px-6 sm:px-8 py-8 md:py-10 bg-white rounded-2xl shadow-xl border border-gray-200">
            <h3 className="text-3xl md:text-4xl font-extrabold text-center mb-10 text-gray-800">
              Engage with Experts at{" "}
              <span className="bg-gradient-to-r from-teal-500 to-green-600 bg-clip-text text-transparent">
                Our Upcoming Events
              </span>
            </h3>
            <p className="text-lg text-center text-gray-600 mb-8 max-w-xl mx-auto">
              Click on a conference below to proceed with registration.
            </p>

            <div className="flex flex-col lg:flex-row gap-8 lg:gap-10">
              {/* Hybrids Section */}
              <div className="w-full lg:w-1/2 flex flex-col">
                <h4 className="text-2xl font-bold text-amber-800 mb-6 text-center lg:text-center">
                  Hybrids
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-grow">
                  {allConferenceLists.hybridConfsAll.map((conf) => (
                    <div
                      key={conf.code}
                      className="flex flex-col justify-between bg-fuchsia-50 rounded-xl shadow-md border border-fuchsia-200 p-5 min-h-[250px] transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                    >
                      <div className="w-12 h-12 flex items-center justify-center rounded-full bg-fuchsia-200 text-fuchsia-700 mb-3">
                        <Mic2 className="h-6 w-6" />
                      </div>

                      <div className="flex flex-col items-center text-center flex-1">
                        <h5 className="font-extrabold text-lg text-fuchsia-900 mb-1 leading-tight">
                          {conf.title}
                        </h5>
                        {conf.date && (
                          <p className="text-lg font-bold text-gray-600 mb-2">
                            {conf.date}
                          </p>
                        )}
                      </div>

                      <div className="flex gap-3 justify-center mt-2">
                        {/* Register Button */}
                        <button
                          onClick={() =>
                            handleProceedWithConference(
                              allConferences.find(
                                (option) => option.value === conf.code
                              )
                            )
                          }
                          className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-semibold uppercase tracking-wide bg-purple-500 text-white"
                        >
                          <Pencil className="w-4 h-4" />
                          Register
                        </button>

                        {/* Visit Button */}
                        {conf.link && (
                          <a
                            href={conf.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-semibold uppercase tracking-wide bg-purple-500 text-white"
                          >
                            <ExternalLink className="w-4 h-4" />
                            Visit
                          </a>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Webinars Section */}
              <div className="w-full lg:w-1/2 flex flex-col">
                <h4 className="text-2xl font-bold text-teal-800 mb-6 text-center lg:text-center">
                  Webinars
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-grow">
                  {allConferenceLists.webinarConfsAll.map((conf) => (
                    <div
                      key={conf.code}
                      className="flex flex-col justify-between bg-emerald-50 rounded-xl shadow-md border border-emerald-200 p-5 min-h-[250px] transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                    >
                      <div className="w-12 h-12 flex items-center justify-center rounded-full bg-emerald-200 text-emerald-700 mb-3">
                        <Webcam className="h-6 w-6" />
                      </div>
                      <div className="flex flex-col items-center text-center flex-1">
                        <h5 className="font-extrabold text-lg text-emerald-900 mb-1 leading-tight">
                          {conf.title}
                        </h5>
                        {conf.date && (
                          <p className="text-lg font-bold text-gray-600 mb-2">
                            {conf.date}
                          </p>
                        )}
                      </div>

                      <div className="flex gap-3 justify-center mt-2">
                        {/* Register Button */}
                        <button
                          onClick={() =>
                            handleProceedWithConference(
                              allConferences.find(
                                (option) => option.value === conf.code
                              )
                            )
                          }
                          className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-semibold uppercase tracking-wide bg-green-500 text-white"
                        >
                          <Pencil className="w-4 h-4" />
                          Register
                        </button>

                        {/* Visit Button */}
                        {conf.link && (
                          <a
                            href={conf.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-semibold uppercase tracking-wide bg-green-500 text-white"
                          >
                            <ExternalLink className="w-4 h-4" />
                            Visit
                          </a>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // If a conference is selected, show the registration form
  return (
    <div className="min-h-screen bg-gray-50 py-8 md:py-12 font-sans text-gray-800 text-base">
      <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
        <h1 className="text-xl py-6 md:text-4xl lg:text-3xl font-extrabold text-center mb-4 leading-tight text-gray-800">
          Secure Your Spot for{" "}
          <span className="bg-gradient-to-br from-[#FF8C00] to-[#FC6A03] bg-clip-text text-transparent">
            {conferenceDetails.name}
          </span>
        </h1>
        {conferenceDetails.date && (
          <p className="text-lg md:text-xl font-semibold text-center text-gray-700 mb-6">
            {conferenceDetails.date}
          </p>
        )}

        <form className="space-y-12 md:space-y-16" onSubmit={handleSubmit}>
          {registrationCategories.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {registrationCategories.map((category) => {
                const priceInfo = conferenceDetails.pricingPlans[category];
                if (!priceInfo) return null; // Defensive check
                const currentPrice = priceInfo.price; // Access the single 'price'
                const quantity = selectedItems[category]?.quantity || 0;
                const isSelected = quantity > 0;
                const colors = getCardColors(category, isSelected);

                return (
                  <div
                    key={category}
                    className={`relative ${colors.cardBg} ${colors.cardShadow} ${colors.cardBorder} rounded-2xl flex flex-col transition-all duration-300 hover:shadow-lg hover:-translate-y-1`}
                  >
                    {/* Icon positioned slightly above and centered on the overlay */}
                    <div
                      className={`absolute -top-6 left-1/2 transform -translate-x-1/2 ${colors.iconBg} ${colors.iconText} w-16 h-16 flex items-center justify-center rounded-full shadow-lg z-20`}
                    >
                      {getCategoryIcon(category)}
                    </div>

                    {/* Translucent Header Overlay */}
                    <div
                      className={`relative ${colors.overlayBg} rounded-t-2xl pt-10 pb-4 text-center z-10`}
                    >
                      <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mt-6">
                        {category}
                      </h3>
                    </div>

                    {/* Main Card Content */}
                    <div className="flex flex-col flex-grow p-4 pt-0 text-center">
                      <p className="text-4xl font-extrabold text-gray-900 mb-4">
                        {currentPrice !== undefined && currentPrice !== null
                          ? `$${currentPrice.toFixed(2)}`
                          : "N/A"}
                      </p>

                      <ul className="text-base text-gray-700 space-y-2 mb-6 md:mb-8 text-left mx-auto max-w-xs w-full">
                        {priceInfo.features?.map((feature, idx) => (
                          <li key={idx} className="flex items-start">
                            {/* This is the new checkmark SVG */}
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5 text-green-700 mr-2 flex-shrink-0 mt-0.5"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                clipRule="evenodd"
                              />
                            </svg>
                            {feature}
                          </li>
                        ))}
                      </ul>

                      <div className="flex items-center justify-center space-x-3 mt-auto">
                        <button
                          type="button"
                          onClick={() => handleQuantityChange(category, -1)}
                          className={`w-10 h-10 flex items-center justify-center rounded-full ${colors.buttonBg} text-white text-xl font-bold transition-all duration-200 ${colors.buttonHover}`}
                          aria-label={`Decrease quantity for ${category}`}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M20 12H4"
                            />
                          </svg>
                        </button>
                        <span className="text-2xl font-semibold text-gray-900 w-10 text-center">
                          {quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleQuantityChange(category, 1)}
                          className={`w-10 h-10 flex items-center justify-center rounded-full ${colors.buttonBg} text-white text-xl font-bold transition-all duration-200 ${colors.buttonHover}`}
                          aria-label={`Increase quantity for ${category}`}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M12 4v16m8-8H4"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {addOnCategories.length > 0 && (
            <>
              {/* --- */}
              <h2 className="text-2xl md:text-3xl font-extrabold text-center text-gray-800 mt-12 mb-8">
                Enhance Your Experience{" "}
                <span className="text-[#7A3803]">(Add-Ons)</span>
              </h2>
              {/* --- */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {addOnCategories.map((category) => {
                  const priceInfo =
                    conferenceDetails.pricingPlans["Add-Ons"][category];
                  if (!priceInfo) return null; // Defensive check
                  const currentPrice = priceInfo.price; // Access the single 'price'
                  const quantity = selectedItems[category]?.quantity || 0;
                  const isSelected = quantity > 0;
                  const colors = getCardColors(category, isSelected);

                  return (
                    <div
                      key={category}
                      className={`relative ${colors.cardBg} ${colors.cardShadow} ${colors.cardBorder} rounded-2xl flex flex-col transition-all duration-300 hover:shadow-lg hover:-translate-y-1`}
                    >
                      {/* Icon positioned slightly above and centered on the overlay */}
                      <div
                        className={`absolute -top-6 left-1/2 transform -translate-x-1/2 ${colors.iconBg} ${colors.iconText} w-16 h-16 flex items-center justify-center rounded-full shadow-lg z-20`}
                      >
                        {getCategoryIcon(category)}
                      </div>

                      {/* Translucent Header Overlay */}
                      <div
                        className={`relative ${colors.overlayBg} rounded-t-2xl pt-10 pb-4 text-center z-10`}
                      >
                        <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mt-6">
                          {category}
                        </h3>
                      </div>

                      {/* Main Card Content */}
                      <div className="flex flex-col flex-grow p-4 pt-0 text-center">
                        <p className="text-4xl font-extrabold text-gray-900 mb-4">
                          {currentPrice !== undefined && currentPrice !== null
                            ? `$${currentPrice.toFixed(2)}`
                            : "N/A"}
                        </p>

                        <ul className="text-base text-gray-700 space-y-2 mb-6 md:mb-8 text-left mx-auto max-w-xs w-full">
                          {priceInfo.features?.map((feature, idx) => (
                            <li key={idx} className="flex items-start">
                              {/* This is the new checkmark SVG */}
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5 text-green-700 mr-2 flex-shrink-0 mt-0.5"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                  clipRule="evenodd"
                                />
                              </svg>
                              {feature}
                            </li>
                          ))}
                        </ul>

                        <div className="flex items-center justify-center space-x-3 mt-auto">
                          <button
                            type="button"
                            onClick={() => handleQuantityChange(category, -1)}
                            className={`w-10 h-10 flex items-center justify-center rounded-full ${colors.buttonBg} text-white text-xl font-bold transition-all duration-200 ${colors.buttonHover}`}
                            aria-label={`Decrease quantity for ${category}`}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-6 w-6"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth="2"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M20 12H4"
                              />
                            </svg>
                          </button>
                          <span className="text-2xl font-semibold text-gray-900 w-10 text-center">
                            {quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => handleQuantityChange(category, 1)}
                            className={`w-10 h-10 flex items-center justify-center rounded-full ${colors.buttonBg} text-white text-xl font-bold transition-all duration-200 ${colors.buttonHover}`}
                            aria-label={`Increase quantity for ${category}`}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-6 w-6"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth="2"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 4v16m8-8H4"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}

          {/* Contact Information Section */}
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-md border border-gray-200">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-6 text-center">
              Your Contact Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="fullName"
                  className="block text-base font-medium text-gray-700 mb-2"
                >
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="fullName"
                  className="mt-1 block w-full px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-base"
                  value={participantFullName}
                  onChange={(e) => setParticipantFullName(e.target.value)}
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-base font-medium text-gray-700 mb-2"
                >
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  className="mt-1 block w-full px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-base"
                  value={participantEmail}
                  onChange={(e) => setParticipantEmail(e.target.value)}
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="country"
                  className="block text-base font-medium text-gray-700 mb-2"
                >
                  Country <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="country"
                  className="mt-1 block w-full px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-base"
                  value={participantCountry}
                  onChange={(e) => setParticipantCountry(e.target.value)}
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="phone"
                  className="block text-base font-medium text-gray-700 mb-2"
                >
                  Phone Number
                </label>
                <input
                  type="text"
                  id="phone"
                  className="mt-1 block w-full px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-base"
                  value={participantPhone}
                  onChange={(e) => setParticipantPhone(e.target.value)}
                />
              </div>
              <div className="md:col-span-2">
                <label
                  htmlFor="organization"
                  className="block text-base font-medium text-gray-700 mb-2"
                >
                  Organization / University
                </label>
                <input
                  type="text"
                  id="organization"
                  className="mt-1 block w-full px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-base"
                  value={participantOrganization}
                  onChange={(e) => setParticipantOrganization(e.target.value)}
                />
              </div>
            </div>
          </div>
        </form>

        {/* Total Amount and Stripe Payment Form */}
        <div className="bg-green-100 p-6 md:p-8 rounded-2xl shadow-lg text-green-900 flex flex-col items-center justify-center text-center border border-green-300 mt-12">
          <p className="text-lg md:text-xl font-semibold mb-3">
            Total Amount:
          </p>
          <p className="text-4xl md:text-5xl font-extrabold mb-6">
            ${totalAmount.toFixed(2)}
          </p>

          {/* This is the new Stripe payment component wrapped in Elements */}
          <Elements stripe={stripePromise} options={{ clientSecret: "pi_..." }}>
            <CheckoutForm
              totalAmount={totalAmount}
              handleSubmit={handleSubmit}
              contactInfo={{
                fullName: participantFullName,
                email: participantEmail,
                country: participantCountry,
              }}
            />
          </Elements>
        </div>
      </div>
    </div>
  );
};

export default RegistrationPage;