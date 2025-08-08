// src/pages/RegistrationPage.jsx - FULL UPDATED CODE for single rate
import React, { useState, useEffect, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Select from "react-select";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { Mic2, Webcam, Pencil, ExternalLink } from "lucide-react";
import { loadStripe } from '@stripe/stripe-js';

// Import your conference data - ensure these files exist and have the 'date' field
import webinarsData from "../data/webinarsData1";
import hybridsData from "../data/hybridsData1";

// Define your backend URL from environment variables or direct string
const API_BASE_URL = "https://backend-code-6vqy.onrender.com";
// const API_BASE_URL = "http://localhost:5000"; // Change this to your backend URL
const stripePromise = loadStripe('pk_test_51R1tM1Li7mWRrUj3uuKpRmRiibLed5pn6994X5z0IYkezj9r6eANZPvB0R3H1E6xyoFmkoiexBuUKQtnq4xIkhNV00MWhaySio');

// Helper function to get category icons (retained as is)
const getCategoryIcon = (category) => {
  switch (category) {
    case "e-Poster Presentation":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
          <path d="M14 2v6h6"></path>
          <line x1="16" y1="13" x2="8" y2="13"></line>
          <line x1="16" y1="17" x2="8" y2="17"></line>
          <line x1="10" y1="9" x2="8" y2="9"></line>
        </svg>
      );
    case "Poster Presentation":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
          <path d="M14 2v6h6"></path>
          <line x1="12" y1="17" x2="12" y2="10"></line>
          <polyline points="9 13 12 10 15 13"></polyline>
        </svg>
      );
    case "Video Presentation":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M23 7l-7 5 7 5V7z"></path>
          <rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect>
        </svg>
      );
    case "Virtual Presentation":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
          <line x1="8" y1="21" x2="16" y2="21"></line>
          <line x1="12" y1="17" x2="12" y2="21"></line>
          <circle
            cx="12"
            cy="4.5"
            r="0.5"
            fill="currentColor"
            stroke="none"
          ></circle>
          <circle cx="12" cy="9.5" r="2.5"></circle>
          <path d="M15.4 13.5a4 4 0 0 0-6.8 0"></path>
        </svg>
      );
    case "Oral Presentation":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 2a3 3 0 0 0-3 3v7c0 1.66 1.34 3 3 3s3-1.34 3-3V5a3 3 0 0 0-3-3z"></path>
          <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
          <line x1="12" y1="19" x2="12" y2="22"></line>
          <line x1="8" y1="22" x2="16" y2="22"></line>
        </svg>
      );
    case "Delegate Access":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
          <circle cx="9" cy="7" r="4"></circle>
          <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
        </svg>
      );
    case "Suit - A (OP + 2N stay)":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="2" y="12" width="20" height="8" rx="1" ry="1"></rect>

          <path d="M4 12V7a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v5"></path>

          <rect x="5" y="8" width="5" height="3" rx="0.5" ry="0.5"></rect>

          <line x1="2" y1="16" x2="22" y2="16"></line>
        </svg>
      );
    case "Suit - B (OP + 3N stay)":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="3" y="2" width="18" height="20" rx="2" ry="2"></rect>
          <path d="M9 22v-8h6v8"></path>
          <line x1="7" y1="6" x2="7.01" y2="6"></line>
          <line x1="7" y1="10" x2="7.01" y2="10"></line>
          <line x1="17" y1="6" x2="17.01" y2="6"></line>
          <line x1="17" y1="10" x2="17.01" y2="10"></line>
          <line x1="12" y1="6" x2="12.01" y2="6"></line>
          <line x1="12" y1="10" x2="12.01" y2="10"></line>
        </svg>
      );
    case "Accompanying Person":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
          <circle cx="9" cy="7" r="4"></circle>
          <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
        </svg>
      );
    case "Extra N-Stay":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="2" y="10" width="18" height="10" rx="1" ry="1"></rect>

          <line x1="2" y1="12" x2="18" y2="12"></line>

          <path d="M3 10V6a1.5 1.5 0 0 1 1.5-1.5h11A1.5 1.5 0 0 1 17 6v4"></path>

          <rect x="4" y="6" width="4" height="3" rx="0.5" ry="0.5"></rect>

          <line x1="2" y1="15" x2="18" y2="15"></line>

          <line x1="4" y1="20" x2="4" y2="22"></line>
          <line x1="16" y1="20" x2="16" y2="22"></line>

          <line x1="20" y1="2.5" x2="20" y2="6.5"></line>
          <line x1="18" y1="4.5" x2="22" y2="4.5"></line>
        </svg>
      );
    case "Article Publication (Additional)":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20V5c0-1.1-.9-2-2-2H6.5A2.5 2.5 0 0 0 4 5.5v14z"></path>
        </svg>
      );
    case "Virtual Exhibitor Booth":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="2" y="4" width="20" height="4"></rect>

          <rect x="2" y="8" width="20" height="16"></rect>

          <rect x="4" y="14" width="16" height="6"></rect>
          <line x1="4" y1="14" x2="20" y2="14"></line>

          <rect x="6" y="10" width="4" height="4"></rect>
        </svg>
      );
    case "Standard Pass":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10"></circle>
          <polyline points="12 6 12 12 16 14"></polyline>
        </svg>
      );
    case "VIP Pass":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
        </svg>
      );
    default:
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="12" y1="16" x2="12" y2="12"></line>
          <line x1="12" y1="8" x2="12.01" y2="8"></line>
        </svg>
      );
  }
};

const RegistrationPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [conferenceDetails, setConferenceDetails] = useState(null);

  // selectedItems now just stores { quantity }
  const [selectedItems, setSelectedItems] = useState({});
  // Removed participantType state as it's no longer needed
  const [totalAmount, setTotalAmount] = useState(0);

  const [selectedConferenceOption, setSelectedConferenceOption] =
    useState(null);

  // State for participant info (always visible now)
  const [participantFullName, setParticipantFullName] = useState("");
  const [participantEmail, setParticipantEmail] = useState("");
  const [participantCountry, setParticipantCountry] = useState("");
  const [participantPhone, setParticipantPhone] = useState("");
  const [participantOrganization, setParticipantOrganization] = useState("");

  // Show all conferences for display lists (no year filtering)
  const allConferenceLists = useMemo(() => {
    const webinarConfsAll = webinarsData || [];
    const hybridConfsAll = hybridsData || [];

    return { webinarConfsAll, hybridConfsAll };
  }, []);

  // Combine all conferences for the dropdown and the upcoming events list
  const allConferences = useMemo(() => {
    const webinarConfs = webinarsData.map((conf) => ({
      id: conf.code,
      name: conf.title,
      type: conf.type.toLowerCase(),
      description:
        conf.description ||
        "Explore groundbreaking research and connect with leading experts in this dynamic event.",
      year: conf.year,
      date: conf.date,
    }));

    const hybridConfs = hybridsData.map((conf) => ({
      id: conf.code,
      name: conf.title,
      type: "hybrid",
      description:
        conf.description ||
        "Discover the latest innovations and network with professionals in this unique hybrid conference.",
      year: conf.year,
      date: conf.date,
    }));

    return [...hybridConfs, ...webinarConfs].map((conf) => ({
      value: conf.id,
      label: `${conf.name} (${
        conf.type.charAt(0).toUpperCase() + conf.type.slice(1)
      })${conf.date ? ` - ${conf.date}` : ""}`,
      originalConf: conf,
    }));
  }, []);

  // Helper to provide placeholder features (should come from backend)
  const getPlaceholderFeatures = (category) => {
  switch (category) {
    case "e-Poster Presentation":
      return [
        "Digital e-poster Display",
        "Abstract in Conference Proceedings",
        "Certificate of Presentation",
      ];
    case "Poster Presentation":
      return [
        "Boost your Profile",
        "Networking",
        "Certificate of Presentation",
      ];
    case "Video Presentation":
      return [
        "10-15 minutes Video Slot",
        "Online Access for 1 hour",
        "Certificate of Presentation",
      ];
    case "Virtual Presentation":
      return [
        "Online Slot for 20 minutes",
        "Global Networking",
        "Promotions",
        "Certificate of Presentation",
      ];
    case "Oral Presentation":
      return [
        "Keynote Slot Eligibility",
        "Promotions",
        "Conference Kit",
        "Networking Access",
      ];
    case "Delegate Access":
      return [
        "Access to all sessions",
        "Conference Handbook",
        "Coffee Break & Lunch",
        "Networking Opportunities",
      ];
    case "Suit - A (OP + 2N stay)":
      return [
        "Oral Presentation",
        "2 Night’s Accommodation",
        "Shuttle Service",
        "Certificate & Promotions",
        "Queen Size Room",
      ];
    case "Suit - B (OP + 3N stay)":
      return [
        "Oral Presentation",
        "3 Night’s Accommodation",
        "Shuttle Service",
        "Certificate & Promotions",
        "Queen Size Room",
      ];
    case "Accompanying Person":
      return [
        "Access to social events",
        "Meals & Coffee Breaks",
      ];
    case "Extra N-Stay":
      return [
        "Additional Night(s) at Conference Hotel",
        "Breakfast Included",
      ];
    case "Article Publication (Additional)":
      return [
        "Full Paper Publication in Journal",
        "Peer Review Process",
        "DOI Assignment",
      ];
    case "Virtual Exhibitor Booth":
      return [
        "Dedicated Exhibition Booth",
        "Company Logo on Website",
        "Networking with Attendees",
        "Lead Generation Opportunities",
      ];
    case "Standard Pass":
      return [
        "Access to all main sessions",
        "Digital conference proceedings",
        "Networking events",
        "Coffee breaks & lunch",
      ];
    case "VIP Pass":
      return [
        "All Standard Pass features",
        "Exclusive VIP lounge access",
        "Priority seating",
        "Meet & Greet with keynote speakers",
        "Premium gift bag",
      ];
    default:
      return ["Conference Access", "Networking", "Certificate"];
  }
};

  // New helper function for dynamic card colors based on category and selection
  const getCardColors = (category, isSelected) => {
    let colors = {
      cardBg: "bg-white",
      cardShadow: "shadow-md",
      cardBorder: "border border-gray-200",
      overlayBg: "bg-gray-100/70",
      iconBg: "bg-gray-500",
      iconText: "text-white",
      buttonBg: "bg-gray-600",
      buttonHover: "hover:bg-gray-700",
    };

    switch (category) {
      case "e-Poster Presentation":
      case "Video Presentation":
      case "Virtual Presentation":
      case "Oral Presentation":
      case "Poster Presentation":
        colors.iconBg = "bg-[#FF8C00]"; // Orange
        colors.iconText = "text-white";
        colors.overlayBg = "bg-orange-100/70";
        colors.buttonBg = "bg-[#FF8C00]";
        colors.buttonHover = "hover:bg-[#FC6A03]";
        break;
      case "Delegate Access":
      case "Standard Pass":
      case "VIP Pass":
        colors.iconBg = "bg-[#4CAF50]"; // Green
        colors.iconText = "text-white";
        colors.overlayBg = "bg-green-100/70";
        colors.buttonBg = "bg-[#4CAF50]";
        colors.buttonHover = "hover:bg-[#45a049]";
        break;
      case "Suit - A (OP + 2N stay)":
      case "Suit - B (OP + 3N stay)":
      case "Accompanying Person":
      case "Extra N-Stay":
        colors.iconBg = "bg-[#2196F3]"; // Blue
        colors.iconText = "text-white";
        colors.overlayBg = "bg-blue-100/70";
        colors.buttonBg = "bg-[#2196F3]";
        colors.buttonHover = "hover:bg-[#1976d2]";
        break;
      case "Article Publication (Additional)":
        colors.iconBg = "bg-[#9C27B0]"; // Purple
        colors.iconText = "text-white";
        colors.overlayBg = "bg-purple-100/70";
        colors.buttonBg = "bg-[#9C27B0]";
        colors.buttonHover = "hover:bg-[#7b1fa2]";
        break;
      case "Virtual Exhibitor Booth":
        colors.iconBg = "bg-[#FFC107]"; // Amber
        colors.iconText = "text-gray-800";
        colors.overlayBg = "bg-amber-100/70";
        colors.buttonBg = "bg-[#FFC107]";
        colors.buttonHover = "hover:bg-[#ffa000]";
        break;
      default:
        // Default colors already set
        break;
    }

    if (isSelected) {
      colors.cardBg = "bg-white"; // Keep white background for selected state
      colors.cardShadow = "shadow-xl ring-2 ring-offset-2 ring-lime-500"; // Green ring for selected
      colors.cardBorder = "border-lime-500"; // Green border for selected
    } else {
      colors.cardShadow = "shadow-lg"; // Less shadow when not selected
      colors.cardBorder = "border-gray-200"; // Default border when not selected
    }

    return colors;
  };

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const sourceToken = queryParams.get("sourceToken");

    if (sourceToken) {
      const verifyToken = async () => {
        try {
          const response = await axios.get(
            `${API_BASE_URL}/api/source/verify-token`,
            {
              params: { token: sourceToken },
            }
          );

          if (response.data.isValid) {
            const rawPricingPlans = response.data.pricingPlans || [];
            const transformedPricingPlans = {};
            const transformedAddOns = {};
console.log("Debugging 't':", rawPricingPlans);
console.log("Type of 't':", typeof rawPricingPlans);
console.log("Is 't' an Array?", Array.isArray(rawPricingPlans));
            rawPricingPlans.forEach((plan) => {
              // Now, we just use basePrice as the single price
              
              const singlePrice = plan.basePrice;

              const planData = {
                price: singlePrice, // Store the single price directly
                features: plan.features || getPlaceholderFeatures(plan.name),
              };

              // Assign main plans
              transformedPricingPlans[plan.name] = planData;

              // Process nested add-ons
              if (plan.addOns && Array.isArray(plan.addOns)) {
                plan.addOns.forEach((addOn) => {
                  transformedAddOns[addOn.name] = {
                    price: addOn.price, // Use add-on's price directly
                    features: getPlaceholderFeatures(addOn.name),
                  };
                });
              }
            });

            // If there are collected add-ons, add them under an "Add-Ons" key
            if (Object.keys(transformedAddOns).length > 0) {
              transformedPricingPlans["Add-Ons"] = transformedAddOns;
            }

            setConferenceDetails({
              name: response.data.conferenceName,
              type: response.data.conferenceType,
              pricingPlans: transformedPricingPlans, // Use the transformed data
              sourceId: response.data.sourceId,
              date: response.data.date,
              year: response.data.year,
            });
            setError(null);
            const preselectedOption = allConferences.find(
              (option) => option.value === response.data.sourceId
            );
            setSelectedConferenceOption(preselectedOption || null);
          } else {
            setError(
              "Invalid or expired registration token. Please select a conference."
            );
            setConferenceDetails(null);
            setSelectedConferenceOption(null);
          }
        } catch (err) {
          console.error("Error verifying token:", err);
          setError(
            err.response?.data?.message ||
              "Failed to verify token. Please select a conference."
          );
          setConferenceDetails(null);
          setSelectedConferenceOption(null);
        } finally {
          setIsLoading(false);
        }
      };
      verifyToken();
    } else {
      setError("Please select a conference to proceed with registration.");
      setIsLoading(false);
      setConferenceDetails(null);
      setSelectedConferenceOption(null);
    }
  }, [location.search, allConferences]);

  const registrationCategories = useMemo(() => {
    if (!conferenceDetails?.pricingPlans) return [];
    return Object.keys(conferenceDetails.pricingPlans).filter(
      (key) => key !== "Add-Ons"
    );
  }, [conferenceDetails]);

  const addOnCategories = useMemo(() => {
    if (!conferenceDetails?.pricingPlans?.["Add-Ons"]) return [];
    return Object.keys(conferenceDetails.pricingPlans["Add-Ons"]);
  }, [conferenceDetails]);

  // Effect to recalculate total amount when selectedItems changes
  useEffect(() => {
    if (!conferenceDetails?.pricingPlans) {
      setTotalAmount(0);
      return;
    }

    let currentTotal = 0;
    const mainPricing = conferenceDetails.pricingPlans;
    const addOnPricing = conferenceDetails.pricingPlans["Add-Ons"] || {};

    for (const category in selectedItems) {
      const quantity = selectedItems[category].quantity;

      let price = 0;
      if (mainPricing[category]) {
        price = mainPricing[category].price; // Access the single 'price' property
      } else if (addOnPricing[category]) {
        price = addOnPricing[category].price; // Access the single 'price' property for add-ons
      }

      if (price !== undefined && price !== null && quantity) {
        currentTotal += price * quantity;
      }
    }
    setTotalAmount(currentTotal);
  }, [selectedItems, conferenceDetails]); // Removed participantType from dependencies

  const handleQuantityChange = (category, change) => {
    setSelectedItems((prev) => {
      const isMainCategory = registrationCategories.includes(category);
      const priceSource = isMainCategory
        ? conferenceDetails.pricingPlans
        : conferenceDetails.pricingPlans["Add-Ons"];

      const currentItem = prev[category] || { quantity: 0 }; // Removed 'type'
      const newQuantity = Math.max(0, currentItem.quantity + change);

      const price = priceSource?.[category]?.price; // Access the single 'price' property

      if ((price === undefined || price === null) && newQuantity > 0) {
        alert(`Pricing for '${category}' is not available.`);
        return prev;
      }

      if (newQuantity === 0) {
        const newState = { ...prev };
        delete newState[category];
        return newState;
      }
      return {
        ...prev,
        [category]: { ...currentItem, quantity: newQuantity }, // Removed 'type'
      };
    });
  };

  const handleReactSelectChange = (selectedOption) => {
    setSelectedConferenceOption(selectedOption);
    // Clear selected items and reset total amount when conference changes
    setSelectedItems({});
    setTotalAmount(0);
    // Reset conference details as well, to trigger re-fetch/re-render logic
    setConferenceDetails(null);
  };

  // const handleProceedWithConference = async (confOption) => {
  //   if (!confOption) {
  //     alert("Please select a conference.");
  //     return;
  //   }

  //   setIsLoading(true);
  //   setError(null);

  //   const selectedConf = confOption.originalConf;

  //   try {
  //     const response = await axios.get(
  //       `${API_BASE_URL}/api/source/generate-token`,
  //       {
  //         params: {
  //           sourceId: selectedConf.id,
  //           conferenceType: selectedConf.type,
  //           date: selectedConf.date,
  //           conferenceYear: selectedConf.year,
  //         },
  //       }
  //     );

  //     if (response.data.token) {
  //       navigate(`/registration?sourceToken=${response.data.token}`);
  //     } else {
  //       setError("Failed to generate token. Please try again.");
  //     }
  //   } catch (err) {
  //     console.error("Error generating token:", err);
  //     setError(
  //       err.response?.data?.message ||
  //         "Failed to generate token. Please try again."
  //     );
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!participantFullName || !participantEmail || !participantCountry) {
//       alert("Please fill in all required participant information.");
//       return;
//     }

//     if (totalAmount <= 0 && Object.keys(selectedItems).length === 0) {
//       alert("Please select at least one registration item.");
//       return;
//     }

//     // Ensure selectedItems reflects the correct price at the time of submission
//     const finalSelectedItems = {};
//     for (const category in selectedItems) {
//       const price =
//         conferenceDetails.pricingPlans[category]?.price ||
//         conferenceDetails.pricingPlans["Add-Ons"]?.[category]?.price;

//       finalSelectedItems[category] = {
//         quantity: selectedItems[category].quantity,
//         price: price, // Now directly referencing the single 'price'
//       };
//     }

//     const registrationData = {
//       conferenceId: conferenceDetails.sourceId,
//       conferenceName: conferenceDetails.name,
//       selectedItems: finalSelectedItems,
//       totalAmount: totalAmount,
//       participantInfo: {
//         fullName: participantFullName,
//         email: participantEmail,
//         country: participantCountry,
//         phone: participantPhone,
//         organization: participantOrganization,
//         // Removed participantType as it's no longer relevant for pricing
//       },
//     };

//     console.log("Sending registration details to backend:", registrationData);

//     try {
//       const response = await axios.post(
//         `${API_BASE_URL}/api/send-registration-email`,
//         registrationData
//       );

//       if (response.status === 200) {
//         alert(
//           "Registration submitted successfully! You will receive a confirmation email shortly."
//         );
//         // navigate('/thank-you'); // Uncomment if you have a thank you page
//         // Optional: Reset form after successful submission
//         setSelectedItems({});
//         setParticipantFullName("");
//         setParticipantEmail("");
//         setParticipantCountry("");
//         setParticipantPhone("");
//         setParticipantOrganization("");
//         setTotalAmount(0);
//       } else {
//         alert(
//           "There was an issue submitting your registration. Please try again."
//         );
//       }
//     } catch (error) {
//       console.error("Error submitting registration:", error);
//       alert(
//         `Failed to submit registration: ${
//           error.response?.data?.message || error.message
//         }. Please try again.`
//       );
//     }
//   };

// const handleProceedToPayment = async () => {
//   try {
//     setIsLoading(true);

//     const response = await axios.post(
//       `${API_BASE_URL}/api/payment/initiate`,
//       {
//         orderDetails: [
//           {
//             name: 'e-Poster Presentation',
//             price: 139,
//             quantity: 1,
//           },
//         ],
//       },
//       {
//         headers: {
//           'x-access-token': localStorage.getItem('sourceToken'),
//         },
//       }
//     );

//     const { sessionId } = response.data;

//     const stripe = await stripePromise;
//     const result = await stripe.redirectToCheckout({ sessionId });

//     if (result.error) {
//       console.error("Stripe redirect error:", result.error.message);
//       alert("Stripe payment redirect failed.");
//     }
//   } catch (error) {
//     console.error("Error initiating payment:", error);
//     alert("Failed to initiate payment.");
//   } finally {
//     setIsLoading(false);
//   }
// };


// const handleFullRegistrationAndPayment = async (event) => {
//     event.preventDefault();
//   await handleSubmit(); // optional: save to DB
//   await handleProceedToPayment(); // redirect to Stripe
// };

const handleProceedWithConference = async (confOption) => {
  if (!confOption) {
    alert("Please select a conference.");
    return;
  }

  setIsLoading(true);
  setError(null);

  const selectedConf = confOption.originalConf;

  try {
    const response = await axios.get(
      `${API_BASE_URL}/api/source/generate-token`,
      {
        params: {
          sourceId: selectedConf.id,
          conferenceType: selectedConf.type,
          date: selectedConf.date,
          conferenceYear: selectedConf.year,
        },
      }
    );

    if (response.data.token) {
      localStorage.setItem("sourceToken", response.data.token); // ✅ Save token locally
      navigate(`/registration?sourceToken=${response.data.token}`);
    } else {
      setError("Failed to generate token. Please try again.");
    }
  } catch (err) {
    console.error("Error generating token:", err);
    setError(
      err.response?.data?.message ||
        "Failed to generate token. Please try again."
    );
  } finally {
    setIsLoading(false);
  }
};

const handleSubmit = async (event) => {
  // Prevent the default form submission behavior, but allow the calling function to handle it
  if (event) {
    event.preventDefault();
  }

  // --- 1. Client-Side Validation ---
  if (!participantFullName || !participantEmail || !participantCountry) {
    alert("Please fill in all required participant information.");
    return false; // Stop here and signal failure
  }

  if (totalAmount <= 0 && Object.keys(selectedItems).length === 0) {
    alert("Please select at least one registration item.");
    return false; // Stop here and signal failure
  }

  // --- 2. Prepare Data ---
  const finalSelectedItems = {};
  for (const category in selectedItems) {
    const price =
      conferenceDetails.pricingPlans[category]?.price ||
      conferenceDetails.pricingPlans["Add-Ons"]?.[category]?.price;

    finalSelectedItems[category] = {
      quantity: selectedItems[category].quantity,
      price: price,
    };
  }

  const registrationData = {
    conferenceId: conferenceDetails.sourceId,
    conferenceName: conferenceDetails.name,
    selectedItems: finalSelectedItems,
    totalAmount: totalAmount,
    participantInfo: {
      fullName: participantFullName,
      email: participantEmail,
      country: participantCountry,
      phone: participantPhone,
      organization: participantOrganization,
    },
  };

  // It's a good practice to update the state with the final items before proceeding
  setSelectedItems(finalSelectedItems);

  console.log("Sending registration details to backend:", registrationData);

  // --- 3. API Call and Error Handling ---
  try {
    const response = await axios.post(
      `${API_BASE_URL}/api/send-registration-email`,
      registrationData
    );

    if (response.status === 200) {
      console.log("Registration submitted successfully.");
      return true; // Signal success
    } else {
      // Handle non-200 responses
      alert("There was an issue submitting your registration.");
      return false; // Signal failure
    }
  } catch (error) {
    // Handle network or server errors
    console.error("Error submitting registration:", error);
    alert(
      `Failed to submit registration: ${
        error.response?.data?.message || error.message
      }. Please try again.`
    );
    return false; // Signal failure
  }
};

const handleProceedToPayment = async () => {
  try {
    setIsLoading(true);

    const token = localStorage.getItem('sourceToken');
    if (!token) {
      alert("Conference token missing. Please go back and select a conference again.");
      setIsLoading(false);
      return;
    }

    // Build clean orderDetails with validated pricing
    const orderDetails = Object.entries(selectedItems)
      .map(([category, { quantity }]) => {
        // Try to resolve price from both main and add-on plans
        let price = conferenceDetails.pricingPlans?.[category]?.price;
        if (!price && conferenceDetails.pricingPlans?.["Add-Ons"]?.[category]?.price) {
          price = conferenceDetails.pricingPlans["Add-Ons"][category].price;
        }

        const validPrice = Number(price);
        if (!validPrice || isNaN(validPrice)) {
          console.warn(`⚠️ Invalid price for '${category}' — skipping.`);
          return null;
        }

        return {
          name: category,
          price: validPrice,
          quantity: quantity,
        };
      })
      .filter(Boolean); // remove any nulls

    if (orderDetails.length === 0) {
      alert("Your selected items have missing prices. Please reselect valid options.");
      setIsLoading(false);
      return;
    }

    console.log("✅ Final orderDetails for Stripe:", orderDetails);

    const response = await axios.post(
      `${API_BASE_URL}/api/payment/initiate`,
      { orderDetails },
      {
        headers: {
          'x-access-token': token,
        },
      }
    );

    const { sessionId } = response.data;

    const stripe = await stripePromise;
    const result = await stripe.redirectToCheckout({ sessionId });

    if (result.error) {
      console.error("Stripe redirect error:", result.error.message);
      alert("Stripe payment redirect failed.");
    }
  } catch (error) {
    console.error("Error initiating payment:", error);
    alert("Failed to initiate payment.");
  } finally {
    setIsLoading(false);
  }
};



const handleFullRegistrationAndPayment = async (event) => {
  event.preventDefault();
  
  // Call handleSubmit and check its return value
  const isFormValid = await handleSubmit(event);
  
  // Only proceed to payment if the form submission was successful
  if (isFormValid) {
    await handleProceedToPayment();
  }
};



  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center font-sans bg-gray-50 text-gray-800">
        <p className="text-lg md:text-xl">Loading conference details...</p>
      </div>
    );
  }

  if (error || !conferenceDetails) {
    return (
  <div className="min-h-screen flex flex-col items-center justify-center font-sans bg-gray-50 text-gray-800 p-6 pt-12">
    {error && (
      <div className="w-full max-w-xl text-center mb-8 px-4">
        <p className="text-lg text-red-600 font-medium bg-red-100 p-4 rounded-xl shadow-lg border border-red-200">
          {error}
        </p>
      </div>
    )}

    <div className="w-full max-w-7xl mx-auto flex flex-col md:flex-row items-center md:items-stretch justify-center gap-8 mb-12 px-4">
      <div className="w-full md:w-1/2 bg-white p-7 md:p-9 rounded-2xl shadow-2xl text-center border border-gray-200 flex flex-col justify-between">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 leading-tight">
          Select a Conference
        </h2>
        <p className="text-base text-gray-600 mb-6">
          Choose an event to proceed with your registration.
        </p>
        <Select
          value={selectedConferenceOption}
          onChange={handleReactSelectChange}
          options={allConferences}
          placeholder="Type to search or select a conference..."
          isClearable
          isSearchable
          className="mb-6 text-gray-800 text-base"
          classNamePrefix="react-select"
          styles={{
            control: (base) => ({
              ...base,
              backgroundColor: "#f9fafb",
              borderColor: "#d1d5db",
              boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
              minHeight: "48px",
              "&:hover": {
                borderColor: "#9ca3af",
              },
            }),
            option: (base, state) => ({
              ...base,
              backgroundColor: state.isFocused ? "#e0e7ff" : "white",
              color: "#1f2937",
              padding: "12px 20px",
              fontSize: "1rem",
            }),
            singleValue: (base) => ({
              ...base,
              color: "#1f2937",
              fontSize: "1rem",
            }),
            menu: (base) => ({
              ...base,
              backgroundColor: "white",
              borderRadius: "0.75rem",
              boxShadow:
                "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
              marginTop: "8px",
            }),
          }}
        />
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-grow items-stretch">
            {allConferenceLists.hybridConfsAll.map((conf) => (
              <div
                key={conf.code}
                className="flex flex-col justify-between bg-fuchsia-50 rounded-xl shadow-md border border-fuchsia-200 p-5 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 max-h-[300px]"
              >
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-fuchsia-200 text-fuchsia-700 mb-3">
                  <Mic2 className="h-6 w-6" />
                </div>
                <div className="flex flex-col items-center text-center flex-1 overflow-hidden">
                  <h5 className="font-extrabold text-lg text-fuchsia-900 mb-1 leading-tight line-clamp-2">
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-grow items-stretch">
            {allConferenceLists.webinarConfsAll.map((conf) => (
              <div
                key={conf.code}
                className="flex flex-col justify-between bg-emerald-50 rounded-xl shadow-md border border-emerald-200 p-5 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 max-h-[300px]"
              >
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-emerald-200 text-emerald-700 mb-3">
                  <Webcam className="h-6 w-6" />
                </div>
                <div className="flex flex-col items-center text-center flex-1 overflow-hidden">
                  <h5 className="font-extrabold text-lg text-emerald-900 mb-1 leading-tight line-clamp-2">
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
);
  }
  return (
    <div className="min-h-screen bg-gray-50 py-8 md:py-12 font-sans text-gray-800 text-base">
      <div className="container mx-auto  px-4 sm:px-6 max-w-6xl">
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


        <form onSubmit={handleSubmit} className="space-y-12 md:space-y-16">
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

          {/* Total Amount and Payment Button */}
          <div className="bg-green-100 p-6 md:p-8 rounded-2xl shadow-lg text-green-900 flex flex-col items-center justify-center text-center border border-green-300">
            <p className="text-lg md:text-xl font-semibold mb-3">
              Total Amount:
            </p>
            <p className="text-4xl md:text-5xl font-extrabold mb-6">
              ${totalAmount.toFixed(2)}
            </p>
            <button
              onClick={handleFullRegistrationAndPayment}
              className="w-full max-w-sm bg-green-600 text-white px-7 py-3.5 rounded-xl text-lg font-bold
                                hover:bg-green-700 transition duration-300 transform hover:scale-105 shadow-md
                                focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
              disabled={isLoading}
            >
              {isLoading ? "Submitting..." : "Proceed to Secure Payment"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegistrationPage;
