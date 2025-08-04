// src/pages/RegistrationPage.jsx
import React, { useState, useEffect, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Select from "react-select";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { Mic2, Webcam, Pencil, ExternalLink, Calendar, Users, Package, Book, Award, FileText } from "lucide-react"; // Added Calendar, Users, Package, Book, Award, FileText

// Import your conference data
import webinarsData from "../data/webinarsData1"; // Ensure these files exist and have the 'date' field
import hybridsData from "../data/hybridsData1"; // Ensure these files exist and have the 'date' field

// Define your backend URL from environment variables or direct string
const API_BASE_URL = "http://localhost:5000";

// Helper function to get category icons (retained as is)
const getCategoryIcon = (category) => {
  switch (category) {
    case "e-Poster":
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
    case "Poster Presentation": // New case for Poster Presentation
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
    case "Delegate":
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
    case "Extra N-Stay": // New case for Extra Night Stay
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
    case "Article Publication":
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
    case "Exhibitor":
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

  const [selectedItems, setSelectedItems] = useState({});
  // Removed participantType state as it's no longer needed for pricing selection
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
      year: conf.year, // Ensure your webinarsData includes a 'year' field
      date: conf.date, // Use the 'date' field directly
    }));

    const hybridConfs = hybridsData.map((conf) => ({
      id: conf.code,
      name: conf.title,
      type: "hybrid",
      description:
        conf.description ||
        "Discover the latest innovations and network with professionals in this unique hybrid conference.",
      year: conf.year, // Ensure your hybridsData includes a 'year' field
      date: conf.date, // Use the 'date' field directly
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
      case "e-Poster":
        return [
          "Digital E-Poster Display",
          "Abstract in Conference Proceedings",
          "Certificate of Presentation",
        ];
      case "Video Presentation":
        return [
          "10-15 Min Video Slot",
          "Online Access for 30 days",
          "Q&A Session",
          "Digital Certificate",
        ];
      case "Virtual Presentation":
        return [
          "Live Online Presentation Slot",
          "Interactive Q&A",
          "Virtual Networking Lounge",
          "Digital Conference Kit",
        ];
      case "Oral Presentation":
        return [
          "20 Min Oral Slot",
          "Publication Opportunity",
          "Conference Kit",
          "Networking Access",
          "Priority Seating",
        ];
      case "Delegate":
        return [
          "Access to all sessions",
          "Conference Handbook",
          "Coffee Breaks & Lunches",
          "Networking Opportunities",
        ];
      case "Suit - A (OP + 2N stay)":
        return [
          "Oral Presentation Benefits",
          "2 Nights Accommodation",
          "Airport Transfers (optional)",
          "Exclusive Delegate Lounge Access",
        ];
      case "Suit - B (OP + 3N stay)":
        return [
          "Oral Presentation Benefits",
          "3 Nights Accommodation",
          "Airport Transfers (optional)",
          "Exclusive Delegate Lounge Access",
          "City Tour",
        ];
      case "Accompanying Person":
        return [
          "Access to social events",
          "Meals & Coffee Breaks",
          "City Tour (optional)",
        ];
      case "Extra N-Stay":
        return [
          "Additional Night(s) at Conference Hotel",
          "Breakfast Included",
        ];
      case "Article Publication":
        return [
          "Full Paper Publication in Journal",
          "Peer Review Process",
          "DOI Assignment",
        ];
      case "Exhibitor":
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
            const enhancedPricingPlans = { ...response.data.pricingPlans };
            for (const category in enhancedPricingPlans) {
              if (category !== "Add-Ons") {
                enhancedPricingPlans[category] = {
                  ...enhancedPricingPlans[category],
                  features: getPlaceholderFeatures(category),
                };
              }
            }
            if (enhancedPricingPlans["Add-Ons"]) {
              for (const addOnCategory in enhancedPricingPlans["Add-Ons"]) {
                enhancedPricingPlans["Add-Ons"][addOnCategory] = {
                  ...enhancedPricingPlans["Add-Ons"][addOnCategory],
                  features: getPlaceholderFeatures(addOnCategory),
                };
              }
            }

            // Ensure pricingPlans have year2025 and year2026 if they came from the backend
            // For now, we'll assume the backend provides 'academic'/'business' and we'll convert,
            // or directly provide year-based prices. For this solution, the FE will hold year-based prices.
            // THIS PART WILL BE OVERWRITTEN BY THE NEW FIXED CONFERENCE DETAILS
            // This useEffect will now primarily set conference details based on token,
            // but the pricing logic will reference the new `staticConferenceDetails` structure
            // derived from selected conference year.
            setConferenceDetails({
              name: response.data.conferenceName,
              type: response.data.conferenceType,
              pricingPlans: enhancedPricingPlans, // Backend token provides these
              sourceId: response.data.sourceId,
              date: response.data.date, // Use the 'date' field from backend
              year: response.data.year, // Assume backend also sends year
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
  }, [location.search, allConferences]); // Dependency on allConferences is important here

  // NEW: Derive the conference year from the selectedConferenceOption
  const conferenceYear = useMemo(() => {
    if (selectedConferenceOption && selectedConferenceOption.originalConf && selectedConferenceOption.originalConf.year) {
      return selectedConferenceOption.originalConf.year;
    }
    // Default year if no conference is selected or year isn't found
    return '2025';
  }, [selectedConferenceOption]);

  // NEW: Static Conference Pricing Details based on the images provided
  // This replaces the dynamic pricing from the backend for the "academic" / "business" types
  const staticConferencePricingDetails = useMemo(() => {
    return {
      name: "Global Biology Summit", // Placeholder name, will be overridden by selectedConferenceOption.name
      pricingPlans: {
        "e-Poster": {
          year2025: 139, // From image_efc65f.png
          year2026: 149, // From image_efc63d.png
          features: getPlaceholderFeatures("e-Poster"),
        },
        "Poster Presentation": {
          year2025: 239, // From image_efc65f.png
          year2026: 349, // From image_efc63d.png (Assuming this is the equivalent for a poster in 2026)
          features: getPlaceholderFeatures("Poster Presentation"),
        },
        "Video Presentation": {
          year2025: 289, // From image_efc65f.png
          year2026: 399, // From image_efc63d.png
          features: getPlaceholderFeatures("Video Presentation"),
        },
        "Virtual Presentation": {
          year2025: 389, // From image_efc65f.png
          year2026: 499, // From image_efc63d.png
          features: getPlaceholderFeatures("Virtual Presentation"),
        },
        "Oral Presentation": {
          year2025: 889, // From image_efc65f.png
          year2026: 899, // From image_efc65f.png (Same for both years in provided image)
          features: getPlaceholderFeatures("Oral Presentation"),
        },
        "Delegate": {
          year2025: 329, // From image_efc65f.png
          year2026: 349, // From image_efc65f.png (Different for 2026 in provided image)
          features: getPlaceholderFeatures("Delegate"),
        },
        "Article Publication": {
          year2025: 1089, // From image_efc65f.png
          year2026: 1099, // From image_efc65f.png (Different for 2026 in provided image)
          features: getPlaceholderFeatures("Article Publication"),
        },
        "Exhibitor": {
          year2025: 2089, // From image_efc65f.png
          year2026: 1999, // From image_efc63d.png - Using this value for consistency
          features: getPlaceholderFeatures("Exhibitor"),
        },
        "Add-Ons": {
          "Suit - A (OP + 2N stay)": {
            year2025: 1189, // From image_efc65f.png
            year2026: 1199, // From image_efc65f.png (Different for 2026 in provided image)
            features: getPlaceholderFeatures("Suit - A (OP + 2N stay)"),
          },
          "Suit - B (OP + 3N stay)": {
            year2025: 1389, // From image_efc65f.png
            year2026: 1399, // From image_efc65f.png (Different for 2026 in provided image)
            features: getPlaceholderFeatures("Suit - B (OP + 3N stay)"),
          },
          "Accompanying Person": {
            year2025: 199, // From image_efc65f.png
            year2026: 349, // From image_efc65f.png (Different for 2026 in provided image)
            features: getPlaceholderFeatures("Accompanying Person"),
          },
          "Extra N-Stay": {
            year2025: 189, // From image_efc65f.png
            year2026: 249, // From image_efc65f.png (Different for 2026 in provided image)
            features: getPlaceholderFeatures("Extra N-Stay"),
          },
        },
      },
    };
  }, []);

  // Update conferenceDetails based on selectedConferenceOption (from dropdown or list click)
  // and merge with static pricing data
  useEffect(() => {
    if (selectedConferenceOption) {
      setConferenceDetails(prevDetails => ({
        ...prevDetails, // Keep existing details like sourceId from token if present
        name: selectedConferenceOption.originalConf.name,
        type: selectedConferenceOption.originalConf.type,
        date: selectedConferenceOption.originalConf.date,
        year: selectedConferenceOption.originalConf.year,
        // Override pricingPlans with the static, year-based data
        pricingPlans: staticConferencePricingDetails.pricingPlans,
        sourceId: selectedConferenceOption.originalConf.id, // Ensure sourceId is always correct
      }));
      setError(null); // Clear error once a conference is selected
      setIsLoading(false); // Stop loading once conference details are set
    } else if (!location.search.includes("sourceToken")) {
      // Only set error if no token and no conference selected manually
      setError("Please select a conference to proceed with registration.");
      setConferenceDetails(null);
      setIsLoading(false);
    }
    setSelectedItems({}); // Clear selected items when conference changes
  }, [selectedConferenceOption, staticConferencePricingDetails, location.search]);

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

  // Recalculate total amount when selected items or conference details (especially year) change
  useEffect(() => {
    if (!conferenceDetails?.pricingPlans) {
      setTotalAmount(0);
      return;
    }

    let currentTotal = 0;
    const mainPricing = conferenceDetails.pricingPlans;
    const addOnPricing = conferenceDetails.pricingPlans["Add-Ons"] || {};

    for (const category in selectedItems) {
      const item = selectedItems[category];
      const quantity = item.quantity;

      let price = 0;
      if (mainPricing[category]) {
        // Use the derived conferenceYear for pricing
        price = mainPricing[category][`year${conferenceYear}`];
      } else if (addOnPricing[category]) {
        // Use the derived conferenceYear for pricing
        price = addOnPricing[category][`year${conferenceYear}`];
      }

      if (price && quantity) {
        currentTotal += price * quantity;
      }
    }
    setTotalAmount(currentTotal);
  }, [selectedItems, conferenceDetails, conferenceYear]); // Add conferenceYear as a dependency

  const handleQuantityChange = (category, change) => {
    setSelectedItems((prev) => {
      const currentItem = prev[category] || {
        quantity: 0,
        // participantType is removed, price will be derived dynamically when calculating total
      };
      const newQuantity = Math.max(0, currentItem.quantity + change);

      if (newQuantity === 0) {
        const newState = { ...prev };
        delete newState[category];
        return newState;
      }
      return {
        ...prev,
        [category]: { ...currentItem, quantity: newQuantity },
      };
    });
  };

  const handleReactSelectChange = (option) => {
    setSelectedConferenceOption(option);
  };

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
        `${API_BASE_URL}/api/source/generate-token`, // Updated endpoint path for GET
        {
          params: { // Use 'params' for GET requests
            sourceId: selectedConf.id,
            conferenceType: selectedConf.type,
            date: selectedConf.date,
            year: selectedConf.year, // Pass the year from the selected conference
          },
        }
      );

      if (response.data.token) {
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!participantFullName || !participantEmail || !participantCountry) {
      alert("Please fill in all required participant information.");
      return;
    }

    if (totalAmount <= 0 && Object.keys(selectedItems).length === 0) {
      alert("Please select at least one registration item.");
      return;
    }

    const registrationData = {
      conferenceId: conferenceDetails.sourceId,
      conferenceName: conferenceDetails.name,
      conferenceYear: conferenceYear, // Include the determined conference year
      selectedItems: selectedItems,
      totalAmount: totalAmount,
      participantInfo: {
        fullName: participantFullName,
        email: participantEmail,
        country: participantCountry,
        phone: participantPhone,
        organization: participantOrganization,
      },
    };

    console.log("Sending registration details to backend:", registrationData);

    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/send-registration-email`,
        registrationData
      );

      if (response.status === 200) {
        alert(
          "Registration submitted successfully! You will receive a confirmation email shortly."
        );
        // navigate('/thank-you'); // Uncomment if you have a thank you page
      } else {
        alert(
          "There was an issue submitting your registration. Please try again."
        );
      }
    } catch (error) {
      console.error("Error submitting registration:", error);
      alert(
        `Failed to submit registration: ${
          error.response?.data?.message || error.message
        }. Please try again.`
      );
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center font-sans bg-gray-50 text-gray-800">
        <p className="text-lg md:text-xl">Loading conference details...</p>
      </div>
    );
  }

  // --- Start of Error / Conference Selection UI ---
  // This section is displayed if no conference details are loaded (e.g., no token or invalid token)
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
                        className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-semibold uppercase tracking-wide bg-purple-100 text-purple-800"
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
                          className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-semibold uppercase tracking-wide bg-purple-100 text-purple-800"
                        >
                          <ExternalLink className="w-4 h-4" />
                          Visit
                        </a>
                      )}
                    </div>
                  </div>
                ))}

                {allConferenceLists.hybridConfsAll.length === 0 && (
                  <p className="text-gray-500 text-center col-span-full text-base">
                    No Hybrid Conferences available yet.
                  </p>
                )}
              </div>
            </div>

            {/* Webinars Section */}
            <div className="w-full lg:w-1/2 flex flex-col">
              <h4 className="text-2xl font-bold text-yellow-500 mb-6 text-center lg:text-center">
                Webinars
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-grow">
                {allConferenceLists.webinarConfsAll.map((conf) => (
                  <div
                    key={conf.code}
                    className="flex flex-col justify-between bg-yellow-50 rounded-xl shadow-md border border-yellow-200 p-5 min-h-[250px] transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                  >
                    <div className="w-12 h-12 flex items-center justify-center rounded-full bg-yellow-200 text-yellow-700 mb-3">
                      <Webcam className="h-6 w-6" />
                    </div>

                    <div className="flex flex-col items-center text-center flex-1">
                      <h5 className="font-extrabold text-lg text-yellow-900 mb-1 leading-tight">
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
                        className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-semibold uppercase tracking-wide bg-yellow-100 text-yellow-800"
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
                          className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-semibold uppercase tracking-wide bg-yellow-100 text-yellow-800"
                        >
                          <ExternalLink className="w-4 h-4" />
                          Visit
                        </a>
                      )}
                    </div>
                  </div>
                ))}

                {allConferenceLists.webinarConfsAll.length === 0 && (
                  <p className="text-gray-500 text-center col-span-full text-base">
                    No Webinar Conferences available yet.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // --- Start of Main Registration Form UI (when conferenceDetails are loaded) ---

  const getCardColors = (category, isSelected) => {
    let iconBg = "";
    let iconText = "";
    let overlayBaseBgClass = ""; // Base color for the glass overlay (e.g., white or black)
    let buttonBg = "";
    let buttonHover = "";
    let borderAccent = "";
    let shadow = "shadow-lg";

    // Dynamic glass effect properties: more opaque/blurred when selected
    const overlayOpacityClass = isSelected ? "bg-opacity-30" : "bg-opacity-10";
    const backdropBlurClass = isSelected
      ? "backdrop-blur-lg"
      : "backdrop-blur-md";

    switch (category) {
      case "e-Poster":
      case "Video Presentation":
      case "Virtual Presentation":
      case "Oral Presentation":
      case "Delegate":
        // Vibrant orange with a subtle glass effect
        iconBg = "bg-gradient-to-br from-[#FF8C00] to-[#FC6A03]"; // Orange shades
        overlayBaseBgClass = "bg-white"; // Light base for the transparent overlay
        buttonBg = "bg-gradient-to-r from-[#FF8C00] to-[#E55F00]"; // Stronger orange button
        buttonHover = "hover:from-[#FFB04C] hover:to-[#FF8C00]"; // Lighter orange on hover
        borderAccent = "border-2 border-[#FC6A03]/70"; // Orange border accent
        iconText = "text-black"; // Ensures text visibility on light icon backgrounds
        break;

      case "Article Publication":
      case "Exhibitor":
        // Slightly warmer orange tones with a distinct glass look
        iconBg = "bg-gradient-to-br from-[#FCD34D] to-[#FC6A03]"; // Yellow-orange to orange
        overlayBaseBgClass = "bg-white"; // Light base for the transparent overlay
        buttonBg = "bg-gradient-to-r from-[#FC6A03] to-[#FF8C00]"; // Reverse gradient for button
        buttonHover = "hover:from-[#E55F00] hover:to-[#FC6A03]"; // Darker orange on hover
        borderAccent = "border-2 border-[#FC6A03]/80"; // Slightly more opaque orange border
        iconText = "text-black";
        break;

      case "Suit - A (OP + 2N stay)":
      case "Suit - B (OP + 3N stay)":
      case "Accompanying Person":
      case "Extra N-Stay":
        // Deeper orange tones with a more pronounced, darker glass effect
        iconBg = "bg-gradient-to-br from-[#E55F00] to-[#FC6A03]"; // Darker orange to main orange
        overlayBaseBgClass = "bg-black"; // Dark base for the transparent overlay
        buttonBg = "bg-gradient-to-r from-[#FC6A03] to-[#A34300]"; // Orange to deep brown-orange
        buttonHover = "hover:from-[#FF8C00] hover:to-[#FC6A03]"; // Brighter orange on hover
        borderAccent = "border-2 border-[#A34300]/90"; // Darker, more opaque border
        iconText = "text-white"; // Ensures text visibility on darker backgrounds
        break;
      case "Standard Pass": // Added for completeness, if used
      case "VIP Pass": // Added for completeness, if used
        iconBg = "bg-gradient-to-br from-[#00BCD4] to-[#00838F]"; // Cyan shades
        overlayBaseBgClass = "bg-white";
        buttonBg = "bg-gradient-to-r from-[#00BCD4] to-[#00ACC1]";
        buttonHover = "hover:from-[#26C6DA] hover:to-[#00BCD4]";
        borderAccent = "border-2 border-[#00ACC1]/70";
        iconText = "text-black";
        break;

      default:
        // Fallback colors for any unlisted category, similar to the first case
        iconBg = "bg-gradient-to-br from-[#FF8C00] to-[#FC6A03]";
        overlayBaseBgClass = "bg-white";
        buttonBg = "bg-gradient-to-r from-[#FF8C00] to-[#E55F00]";
        buttonHover = "hover:from-[#FFB04C] hover:to-[#FF8C00]";
        borderAccent = "border-2 border-[#FC6A03]/70";
        iconText = "text-black";
        break;
    }

    return {
      cardBg: "bg-white", // The main card background remains solid white
      cardBorder: isSelected ? `${borderAccent}` : "border border-gray-200", // Accent border only when selected
      cardShadow: shadow,
      iconBg,
      iconText,
      // Combined classes for the fluid glass overlay effect
      overlayBg: `${overlayBaseBgClass} ${overlayOpacityClass} ${backdropBlurClass}`,
      buttonBg,
      buttonHover,
    };
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 md:py-12 font-sans text-gray-800 text-base">
      <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-center mt-4 leading-tight text-gray-800 py-4">
          Secure Your Spot for{" "}
          <span className="bg-gradient-to-br from-[#FF8C00] to-[#FC6A03] bg-clip-text text-transparent">
            {conferenceDetails?.name || "The Conference"}
          </span>
        </h1>
        {conferenceDetails?.date && (
          <p className="text-lg md:text-xl py-4 font-semibold text-center text-gray-700 mb-6">
            {conferenceDetails.date}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-12 md:space-y-16">
          {/* Main Registration Categories */}
          {registrationCategories.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {registrationCategories.map((category) => {
                const priceInfo = staticConferencePricingDetails.pricingPlans[category]; // Use static pricing
                if (!priceInfo) return null;
                // Use the derived conferenceYear to get the current price
                const currentPrice = priceInfo[`year${conferenceYear}`];
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
                        ${currentPrice.toFixed(2)}
                      </p>

                      <ul className="text-base text-gray-700 space-y-2 mb-6 md:mb-8 text-left mx-auto max-w-xs w-full">
                        {priceInfo.features?.map((feature, idx) => (
                          <li key={idx} className="flex items-start">
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
                        <span className="text-2xl font-semibold text-black-900 w-10 text-center">
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

          {/* Add-Ons Section */}
          {addOnCategories.length > 0 && (
            <>
              <h2 className="text-2xl md:text-3xl font-extrabold text-center text-gray-800 mt-12 mb-8">
                Enhance Your Experience{" "}
                <span className="text-[#7A3803]">(Add-Ons)</span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {addOnCategories.map((category) => {
                  const priceInfo = staticConferencePricingDetails.pricingPlans["Add-Ons"][category]; // Use static pricing
                  if (!priceInfo) return null;
                  // Use the derived conferenceYear for pricing
                  const currentPrice = priceInfo[`year${conferenceYear}`];
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
                          ${currentPrice.toFixed(2)}
                        </p>

                        <ul className="text-base text-gray-700 space-y-2 mb-6 md:mb-8 text-left mx-auto max-w-xs w-full">
                          {priceInfo.features?.map((feature, idx) => (
                            <li key={idx} className="flex items-start">
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
                          <span className="text-2xl font-semibold text-black-900 w-10 text-center">
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

          {/* Participant Information Section */}
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-xl border border-gray-200">
            <h2 className="text-2xl md:text-3xl font-extrabold text-gray-800 mb-6 text-center">
              Participant Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="fullName"
                  className="block text-gray-700 text-sm font-semibold mb-2"
                >
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="fullName"
                  value={participantFullName}
                  onChange={(e) => setParticipantFullName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-transparent transition duration-200 text-gray-900"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-gray-700 text-sm font-semibold mb-2"
                >
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  value={participantEmail}
                  onChange={(e) => setParticipantEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-transparent transition duration-200 text-gray-900"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="country"
                  className="block text-gray-700 text-sm font-semibold mb-2"
                >
                  Country <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="country"
                  value={participantCountry}
                  onChange={(e) => setParticipantCountry(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-transparent transition duration-200 text-gray-900"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="phone"
                  className="block text-gray-700 text-sm font-semibold mb-2"
                >
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  value={participantPhone}
                  onChange={(e) => setParticipantPhone(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-transparent transition duration-200 text-gray-900"
                />
              </div>
              <div className="md:col-span-2">
                <label
                  htmlFor="organization"
                  className="block text-gray-700 text-sm font-semibold mb-2"
                >
                  Organization/Affiliation
                </label>
                <input
                  type="text"
                  id="organization"
                  value={participantOrganization}
                  onChange={(e) => setParticipantOrganization(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-transparent transition duration-200 text-gray-900"
                />
              </div>
            </div>
          </div>

          {/* Summary and Submit */}
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-xl border border-gray-200 text-center">
            <h2 className="text-2xl md:text-3xl font-extrabold text-gray-800 mb-4">
              Total Amount:{" "}
              <span className="text-4xl font-extrabold text-green-600">
                ${totalAmount.toFixed(2)}
              </span>
            </h2>
            <p className="text-gray-600 mb-8">
              Review your selection and complete the registration.
            </p>
            <button
              type="submit"
              className="w-full sm:w-auto px-8 py-4 bg-orange-500 text-white font-extrabold rounded-xl shadow-lg
                         hover:bg-orange-600 transition duration-300 transform hover:scale-105
                         focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 text-lg"
            >
              Proceed to Payment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegistrationPage;



// // src/pages/RegistrationPage.jsx
// import React, { useState, useEffect, useMemo } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import axios from "axios";
// import Select from "react-select";
// import { DotLottieReact } from "@lottiefiles/dotlottie-react";
// import { Mic2, Webcam, Pencil, ExternalLink } from "lucide-react";

// // Import your conference data
// import webinarsData from "../data/webinarsData1"; // Ensure these files exist and have the 'date' field
// import hybridsData from "../data/hybridsData1"; // Ensure these files exist and have the 'date' field

// // Define your backend URL from environment variables or direct string
// const API_BASE_URL = "http://localhost:5000";

// // Helper function to get category icons (retained as is)
// const getCategoryIcon = (category) => {
//   switch (category) {
//     case "e-Poster":
//       return (
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           className="h-6 w-6"
//           viewBox="0 0 24 24"
//           fill="none"
//           stroke="currentColor"
//           strokeWidth="2"
//           strokeLinecap="round"
//           strokeLinejoin="round"
//         >
//           <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
//           <path d="M14 2v6h6"></path>
//           <line x1="16" y1="13" x2="8" y2="13"></line>
//           <line x1="16" y1="17" x2="8" y2="17"></line>
//           <line x1="10" y1="9" x2="8" y2="9"></line>
//         </svg>
//       );
//     case "Poster Presentation": // New case for Poster Presentation
//       return (
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           className="h-6 w-6"
//           viewBox="0 0 24 24"
//           fill="none"
//           stroke="currentColor"
//           strokeWidth="2"
//           strokeLinecap="round"
//           strokeLinejoin="round"
//         >
//           <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
//           <path d="M14 2v6h6"></path>
//           <line x1="12" y1="17" x2="12" y2="10"></line>
//           <polyline points="9 13 12 10 15 13"></polyline>
//         </svg>
//       );
//     case "Video Presentation":
//       return (
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           className="h-6 w-6"
//           viewBox="0 0 24 24"
//           fill="none"
//           stroke="currentColor"
//           strokeWidth="2"
//           strokeLinecap="round"
//           strokeLinejoin="round"
//         >
//           <path d="M23 7l-7 5 7 5V7z"></path>
//           <rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect>
//         </svg>
//       );
//     case "Virtual Presentation":
//       return (
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           className="h-6 w-6"
//           viewBox="0 0 24 24"
//           fill="none"
//           stroke="currentColor"
//           strokeWidth="2"
//           strokeLinecap="round"
//           strokeLinejoin="round"
//         >
//           <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
//           <line x1="8" y1="21" x2="16" y2="21"></line>
//           <line x1="12" y1="17" x2="12" y2="21"></line>
//           <circle
//             cx="12"
//             cy="4.5"
//             r="0.5"
//             fill="currentColor"
//             stroke="none"
//           ></circle>
//           <circle cx="12" cy="9.5" r="2.5"></circle>{" "}
//           <path d="M15.4 13.5a4 4 0 0 0-6.8 0"></path>{" "}
//         </svg>
//       );
//     case "Oral Presentation":
//       return (
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           className="h-6 w-6"
//           viewBox="0 0 24 24"
//           fill="none"
//           stroke="currentColor"
//           strokeWidth="2"
//           strokeLinecap="round"
//           strokeLinejoin="round"
//         >
//           <path d="M12 2a3 3 0 0 0-3 3v7c0 1.66 1.34 3 3 3s3-1.34 3-3V5a3 3 0 0 0-3-3z"></path>
//           <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
//           <line x1="12" y1="19" x2="12" y2="22"></line>
//           <line x1="8" y1="22" x2="16" y2="22"></line>
//         </svg>
//       );
//     case "Delegate":
//       return (
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           className="h-6 w-6"
//           viewBox="0 0 24 24"
//           fill="none"
//           stroke="currentColor"
//           strokeWidth="2"
//           strokeLinecap="round"
//           strokeLinejoin="round"
//         >
//           <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
//           <circle cx="9" cy="7" r="4"></circle>
//           <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
//           <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
//         </svg>
//       );
//     case "Suit - A (OP + 2N stay)":
//       return (
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           className="h-6 w-6"
//           viewBox="0 0 24 24"
//           fill="none"
//           stroke="currentColor"
//           strokeWidth="2"
//           strokeLinecap="round"
//           strokeLinejoin="round"
//         >
//           <rect x="2" y="12" width="20" height="8" rx="1" ry="1"></rect>

//           <path d="M4 12V7a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v5"></path>

//           <rect x="5" y="8" width="5" height="3" rx="0.5" ry="0.5"></rect>

//           <line x1="2" y1="16" x2="22" y2="16"></line>
//         </svg>
//       );
//     case "Suit - B (OP + 3N stay)":
//       return (
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           className="h-6 w-6"
//           viewBox="0 0 24 24"
//           fill="none"
//           stroke="currentColor"
//           strokeWidth="2"
//           strokeLinecap="round"
//           strokeLinejoin="round"
//         >
//           <rect x="3" y="2" width="18" height="20" rx="2" ry="2"></rect>
//           <path d="M9 22v-8h6v8"></path>
//           <line x1="7" y1="6" x2="7.01" y2="6"></line>
//           <line x1="7" y1="10" x2="7.01" y2="10"></line>
//           <line x1="17" y1="6" x2="17.01" y2="6"></line>
//           <line x1="17" y1="10" x2="17.01" y2="10"></line>
//           <line x1="12" y1="6" x2="12.01" y2="6"></line>
//           <line x1="12" y1="10" x2="12.01" y2="10"></line>
//         </svg>
//       );
//     case "Accompanying Person":
//       return (
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           className="h-6 w-6"
//           viewBox="0 0 24 24"
//           fill="none"
//           stroke="currentColor"
//           strokeWidth="2"
//           strokeLinecap="round"
//           strokeLinejoin="round"
//         >
//           <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
//           <circle cx="9" cy="7" r="4"></circle>
//           <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
//           <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
//         </svg>
//       );
//     case "Extra N-Stay": // New case for Extra Night Stay
//       return (
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           className="h-6 w-6"
//           viewBox="0 0 24 24"
//           fill="none"
//           stroke="currentColor"
//           strokeWidth="2"
//           strokeLinecap="round"
//           strokeLinejoin="round"
//         >
//           <rect x="2" y="10" width="18" height="10" rx="1" ry="1"></rect>

//           <line x1="2" y1="12" x2="18" y2="12"></line>

//           <path d="M3 10V6a1.5 1.5 0 0 1 1.5-1.5h11A1.5 1.5 0 0 1 17 6v4"></path>

//           <rect x="4" y="6" width="4" height="3" rx="0.5" ry="0.5"></rect>

//           <line x1="2" y1="15" x2="18" y2="15"></line>

//           <line x1="4" y1="20" x2="4" y2="22"></line>
//           <line x1="16" y1="20" x2="16" y2="22"></line>

//           <line x1="20" y1="2.5" x2="20" y2="6.5"></line>
//           <line x1="18" y1="4.5" x2="22" y2="4.5"></line>
//         </svg>
//       );
//     case "Article Publication":
//       return (
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           className="h-6 w-6"
//           viewBox="0 0 24 24"
//           fill="none"
//           stroke="currentColor"
//           strokeWidth="2"
//           strokeLinecap="round"
//           strokeLinejoin="round"
//         >
//           <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20V5c0-1.1-.9-2-2-2H6.5A2.5 2.5 0 0 0 4 5.5v14z"></path>
//         </svg>
//       );
//     case "Exhibitor":
//       return (
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           className="h-6 w-6"
//           viewBox="0 0 24 24"
//           fill="none"
//           stroke="currentColor"
//           strokeWidth="2"
//           strokeLinecap="round"
//           strokeLinejoin="round"
//         >
//           <rect x="2" y="4" width="20" height="4"></rect>

//           <rect x="2" y="8" width="20" height="16"></rect>

//           <rect x="4" y="14" width="16" height="6"></rect>
//           <line x1="4" y1="14" x2="20" y2="14"></line>

//           <rect x="6" y="10" width="4" height="4"></rect>
//         </svg>
//       );
//     case "Standard Pass":
//       return (
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           className="h-6 w-6"
//           viewBox="0 0 24 24"
//           fill="none"
//           stroke="currentColor"
//           strokeWidth="2"
//           strokeLinecap="round"
//           strokeLinejoin="round"
//         >
//           <circle cx="12" cy="12" r="10"></circle>
//           <polyline points="12 6 12 12 16 14"></polyline>
//         </svg>
//       );
//     case "VIP Pass":
//       return (
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           className="h-6 w-6"
//           viewBox="0 0 24 24"
//           fill="none"
//           stroke="currentColor"
//           strokeWidth="2"
//           strokeLinecap="round"
//           strokeLinejoin="round"
//         >
//           <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
//         </svg>
//       );
//     default:
//       return (
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           className="h-6 w-6"
//           viewBox="0 0 24 24"
//           fill="none"
//           stroke="currentColor"
//           strokeWidth="2"
//           strokeLinecap="round"
//           strokeLinejoin="round"
//         >
//           <circle cx="12" cy="12" r="10"></circle>
//           <line x1="12" y1="16" x2="12" y2="12"></line>
//           <line x1="12" y1="8" x2="12.01" y2="8"></line>
//         </svg>
//       );
//   }
// };

// const RegistrationPage = () => {
//   const location = useLocation();
//   const navigate = useNavigate();

//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [conferenceDetails, setConferenceDetails] = useState(null);

//   const [selectedItems, setSelectedItems] = useState({});
//   const [participantType, setParticipantType] = useState("academic"); // Global participant type toggle
//   const [totalAmount, setTotalAmount] = useState(0);

//   const [selectedConferenceOption, setSelectedConferenceOption] =
//     useState(null);

//   // State for participant info (always visible now)
//   const [participantFullName, setParticipantFullName] = useState("");
//   const [participantEmail, setParticipantEmail] = useState("");
//   const [participantCountry, setParticipantCountry] = useState("");
//   const [participantPhone, setParticipantPhone] = useState("");
//   const [participantOrganization, setParticipantOrganization] = useState("");

//   // Show all conferences for display lists (no year filtering)
//   const allConferenceLists = useMemo(() => {
//     const webinarConfsAll = webinarsData || [];
//     const hybridConfsAll = hybridsData || [];

//     return { webinarConfsAll, hybridConfsAll };
//   }, []);

//   // Combine all conferences for the dropdown and the upcoming events list
//   const allConferences = useMemo(() => {
//     const webinarConfs = webinarsData.map((conf) => ({
//       id: conf.code,
//       name: conf.title,
//       type: conf.type.toLowerCase(),
//       description:
//         conf.description ||
//         "Explore groundbreaking research and connect with leading experts in this dynamic event.",
//       year: conf.year,
//       date: conf.date, // Use the 'date' field directly
//     }));

//     const hybridConfs = hybridsData.map((conf) => ({
//       id: conf.code,
//       name: conf.title,
//       type: "hybrid",
//       description:
//         conf.description ||
//         "Discover the latest innovations and network with professionals in this unique hybrid conference.",
//       year: conf.year,
//       date: conf.date, // Use the 'date' field directly
//     }));

//     return [...hybridConfs, ...webinarConfs].map((conf) => ({
//       value: conf.id,
//       label: `${conf.name} (${
//         conf.type.charAt(0).toUpperCase() + conf.type.slice(1)
//       })${conf.date ? ` - ${conf.date}` : ""}`,
//       originalConf: conf,
//     }));
//   }, []);

//   // Helper to provide placeholder features (should come from backend)
//   const getPlaceholderFeatures = (category) => {
//     switch (category) {
//       case "e-Poster":
//         return [
//           "Digital E-Poster Display",
//           "Abstract in Conference Proceedings",
//           "Certificate of Presentation",
//         ];
//       case "Video Presentation":
//         return [
//           "10-15 Min Video Slot",
//           "Online Access for 30 days",
//           "Q&A Session",
//           "Digital Certificate",
//         ];
//       case "Virtual Presentation":
//         return [
//           "Live Online Presentation Slot",
//           "Interactive Q&A",
//           "Virtual Networking Lounge",
//           "Digital Conference Kit",
//         ];
//       case "Oral Presentation":
//         return [
//           "20 Min Oral Slot",
//           "Publication Opportunity",
//           "Conference Kit",
//           "Networking Access",
//           "Priority Seating",
//         ];
//       case "Delegate":
//         return [
//           "Access to all sessions",
//           "Conference Handbook",
//           "Coffee Breaks & Lunches",
//           "Networking Opportunities",
//         ];
//       case "Suit - A (OP + 2N stay)":
//         return [
//           "Oral Presentation Benefits",
//           "2 Nights Accommodation",
//           "Airport Transfers (optional)",
//           "Exclusive Delegate Lounge Access",
//         ];
//       case "Suit - B (OP + 3N stay)":
//         return [
//           "Oral Presentation Benefits",
//           "3 Nights Accommodation",
//           "Airport Transfers (optional)",
//           "Exclusive Delegate Lounge Access",
//           "City Tour",
//         ];
//       case "Accompanying Person":
//         return [
//           "Access to social events",
//           "Meals & Coffee Breaks",
//           "City Tour (optional)",
//         ];
//       case "Extra N-Stay":
//         return [
//           "Additional Night(s) at Conference Hotel",
//           "Breakfast Included",
//         ];
//       case "Article Publication":
//         return [
//           "Full Paper Publication in Journal",
//           "Peer Review Process",
//           "DOI Assignment",
//         ];
//       case "Exhibitor":
//         return [
//           "Dedicated Exhibition Booth",
//           "Company Logo on Website",
//           "Networking with Attendees",
//           "Lead Generation Opportunities",
//         ];
//       case "Standard Pass":
//         return [
//           "Access to all main sessions",
//           "Digital conference proceedings",
//           "Networking events",
//           "Coffee breaks & lunch",
//         ];
//       case "VIP Pass":
//         return [
//           "All Standard Pass features",
//           "Exclusive VIP lounge access",
//           "Priority seating",
//           "Meet & Greet with keynote speakers",
//           "Premium gift bag",
//         ];
//       default:
//         return ["Conference Access", "Networking", "Certificate"];
//     }
//   };

//   useEffect(() => {
//     const queryParams = new URLSearchParams(location.search);
//     const sourceToken = queryParams.get("sourceToken");

//     if (sourceToken) {
//       const verifyToken = async () => {
//         try {
//           const response = await axios.get(
//             `${API_BASE_URL}/api/source/verify-token`,
//             {
//               params: { token: sourceToken },
//             }
//           );

//           if (response.data.isValid) {
//             const enhancedPricingPlans = { ...response.data.pricingPlans };
//             for (const category in enhancedPricingPlans) {
//               if (category !== "Add-Ons") {
//                 enhancedPricingPlans[category] = {
//                   ...enhancedPricingPlans[category],
//                   features: getPlaceholderFeatures(category),
//                 };
//               }
//             }
//             if (enhancedPricingPlans["Add-Ons"]) {
//               for (const addOnCategory in enhancedPricingPlans["Add-Ons"]) {
//                 enhancedPricingPlans["Add-Ons"][addOnCategory] = {
//                   ...enhancedPricingPlans["Add-Ons"][addOnCategory],
//                   features: getPlaceholderFeatures(addOnCategory),
//                 };
//               }
//             }
//             setConferenceDetails({
//               name: response.data.conferenceName,
//               type: response.data.conferenceType,
//               pricingPlans: enhancedPricingPlans,
//               sourceId: response.data.sourceId,
//               date: response.data.date, // Use the 'date' field from backend
//             });
//             setError(null);
//             const preselectedOption = allConferences.find(
//               (option) => option.value === response.data.sourceId
//             );
//             setSelectedConferenceOption(preselectedOption || null);
//           } else {
//             setError(
//               "Invalid or expired registration token. Please select a conference."
//             );
//             setConferenceDetails(null);
//             setSelectedConferenceOption(null);
//           }
//         } catch (err) {
//           console.error("Error verifying token:", err);
//           setError(
//             err.response?.data?.message ||
//               "Failed to verify token. Please select a conference."
//           );
//           setConferenceDetails(null);
//           setSelectedConferenceOption(null);
//         } finally {
//           setIsLoading(false);
//         }
//       };
//       verifyToken();
//     } else {
//       setError("Please select a conference to proceed with registration.");
//       setIsLoading(false);
//       setConferenceDetails(null);
//       setSelectedConferenceOption(null);
//     }
//   }, [location.search, allConferences]);

//   const registrationCategories = useMemo(() => {
//     if (!conferenceDetails?.pricingPlans) return [];
//     return Object.keys(conferenceDetails.pricingPlans).filter(
//       (key) => key !== "Add-Ons"
//     );
//   }, [conferenceDetails]);

//   const addOnCategories = useMemo(() => {
//     if (!conferenceDetails?.pricingPlans?.["Add-Ons"]) return [];
//     return Object.keys(conferenceDetails.pricingPlans["Add-Ons"]);
//   }, [conferenceDetails]);

//   useEffect(() => {
//     if (!conferenceDetails?.pricingPlans) {
//       setTotalAmount(0);
//       return;
//     }

//     let currentTotal = 0;
//     const mainPricing = conferenceDetails.pricingPlans;
//     const addOnPricing = conferenceDetails.pricingPlans["Add-Ons"] || {};

//     for (const category in selectedItems) {
//       const item = selectedItems[category];
//       const quantity = item.quantity;
//       const type = item.type;

//       let price = 0;
//       if (mainPricing[category]) {
//         price = mainPricing[category][type];
//       } else if (addOnPricing[category]) {
//         price = addOnPricing[category][type];
//       }

//       if (price && quantity) {
//         currentTotal += price * quantity;
//       }
//     }
//     setTotalAmount(currentTotal);
//   }, [selectedItems, conferenceDetails]);

//   const handleQuantityChange = (category, change) => {
//     setSelectedItems((prev) => {
//       const currentItem = prev[category] || {
//         quantity: 0,
//         type: participantType,
//       };
//       const newQuantity = Math.max(0, currentItem.quantity + change);

//       if (newQuantity === 0) {
//         const newState = { ...prev };
//         delete newState[category];
//         return newState;
//       }
//       return {
//         ...prev,
//         [category]: { ...currentItem, quantity: newQuantity },
//       };
//     });
//   };

//   const handleReactSelectChange = (selectedOption) => {
//     setSelectedConferenceOption(selectedOption);
//   };

//   //   // Consolidated function to proceed with a selected conference (from dropdown or list)
//   //   const handleProceedWithConference = async (confOption) => {
//   //     if (!confOption) {
//   //       alert("Please select a conference.");
//   //       return;
//   //     }

//   //     setIsLoading(true);
//   //     setError(null);

//   //     const selectedConf = confOption.originalConf;

//   //     try {
//   //       const response = await axios.post(
//   //         `${API_BASE_URL}/api/source/get-source-token`,
//   //         {
//   //           sourceId: selectedConf.id,
//   //           conferenceType: selectedConf.type,
//   //           date: selectedConf.date, // Pass the 'date' field
//   //         }
//   //       );

//   //       if (response.data.token) {
//   //         navigate(`/registration?sourceToken=${response.data.token}`);
//   //       } else {
//   //         setError("Failed to generate token. Please try again.");
//   //       }
//   //     } catch (err) {
//   //       console.error("Error generating token:", err);
//   //       setError(
//   //         err.response?.data?.message ||
//   //           "Failed to generate token. Please try again."
//   //       );
//   //     } finally {
//   //       setIsLoading(false);
//   //     }
//   //   };

//   const handleProceedWithConference = async (confOption) => {
//     if (!confOption) {
//       alert("Please select a conference.");
//       return;
//     }

//     setIsLoading(true);
//     setError(null);

//     const selectedConf = confOption.originalConf;

//     try {
//       // CHANGED: From axios.post to axios.get
//       // CHANGED: From '/get-source-token' to '/generate-token'
//       // CHANGED: Data moved from request body to 'params' object for GET request
//       const response = await axios.get(
//         `${API_BASE_URL}/api/source/generate-token`, // Updated endpoint path
//         {
//           params: {
//             // Use 'params' for GET requests
//             sourceId: selectedConf.id,
//             conferenceType: selectedConf.type,
//             date: selectedConf.date, // Pass the 'date' field
//           },
//         }
//       );

//       if (response.data.token) {
//         navigate(`/registration?sourceToken=${response.data.token}`);
//       } else {
//         setError("Failed to generate token. Please try again.");
//       }
//     } catch (err) {
//       console.error("Error generating token:", err);
//       setError(
//         err.response?.data?.message ||
//           "Failed to generate token. Please try again."
//       );
//     } finally {
//       setIsLoading(false);
//     }
//   };

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

//     const registrationData = {
//       conferenceId: conferenceDetails.sourceId,
//       conferenceName: conferenceDetails.name,
//       selectedItems: selectedItems,
//       totalAmount: totalAmount,
//       participantInfo: {
//         fullName: participantFullName,
//         email: participantEmail,
//         country: participantCountry,
//         phone: participantPhone,
//         organization: participantOrganization,
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

//   if (isLoading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center font-sans bg-gray-50 text-gray-800">
//         <p className="text-lg md:text-xl">Loading conference details...</p>
//       </div>
//     );
//   }

//   if (error || !conferenceDetails) {
//     return (
//       <div className="min-h-screen flex flex-col items-center justify-center font-sans bg-gray-50 text-gray-800 p-6 pt-12">
//         {error && (
//           <div className="w-full max-w-xl text-center mb-8 px-4">
//             <p className="text-lg text-red-600 font-medium bg-red-100 p-4 rounded-xl shadow-lg border border-red-200">
//               {error}
//             </p>
//           </div>
//         )}

//         <div className="w-full max-w-7xl mx-auto flex flex-col md:flex-row items-center md:items-stretch justify-center gap-8 mb-12 px-4">
//           <div className="w-full md:w-1/2 bg-white p-7 md:p-9 rounded-2xl shadow-2xl text-center border border-gray-200 flex flex-col justify-between">
//             <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 leading-tight">
//               Select a Conference
//             </h2>
//             <p className="text-base text-gray-600 mb-6">
//               Choose an event to proceed with your registration.
//             </p>
//             <Select
//               value={selectedConferenceOption}
//               onChange={handleReactSelectChange}
//               options={allConferences}
//               placeholder="Type to search or select a conference..."
//               isClearable
//               isSearchable
//               className="mb-6 text-gray-800 text-base"
//               classNamePrefix="react-select"
//               styles={{
//                 control: (base) => ({
//                   ...base,
//                   backgroundColor: "#f9fafb",
//                   borderColor: "#d1d5db",
//                   boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
//                   minHeight: "48px",
//                   "&:hover": {
//                     borderColor: "#9ca3af",
//                   },
//                 }),
//                 option: (base, state) => ({
//                   ...base,
//                   backgroundColor: state.isFocused ? "#e0e7ff" : "white",
//                   color: "#1f2937",
//                   padding: "12px 20px",
//                   fontSize: "1rem",
//                 }),
//                 singleValue: (base) => ({
//                   ...base,
//                   color: "#1f2937",
//                   fontSize: "1rem",
//                 }),
//                 menu: (base) => ({
//                   ...base,
//                   backgroundColor: "white",
//                   borderRadius: "0.75rem",
//                   boxShadow:
//                     "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
//                   marginTop: "8px",
//                 }),
//               }}
//             />
//             <div className="flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-3">
//               <button
//                 type="button"
//                 onClick={() =>
//                   handleProceedWithConference(selectedConferenceOption)
//                 }
//                 className="w-full sm:w-auto bg-purple-300 text-purple px-6 py-3 rounded-xl text-base font-semibold
//                                     hover:bg-purple-400 transition duration-300 transform hover:scale-105 shadow-md
//                                     focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
//               >
//                 Proceed to Registration
//               </button>
//               <button
//                 type="button"
//                 onClick={() => navigate("/")}
//                 className="w-full sm:w-auto bg-gray-600 text-white px-6 py-3 rounded-xl text-base font-semibold
//                                     hover:bg-gray-700 transition duration-300 transform hover:scale-105 shadow-md
//                                     focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
//               >
//                 Go to Home
//               </button>
//             </div>
//           </div>

//           <div className="w-full md:w-1/2 flex items-center justify-center p-4 bg-gray-100 rounded-2xl shadow-inner border border-gray-200">
//             <DotLottieReact
//               src="https://lottie.host/4e9e5c30-2446-4e4f-901a-5db0804727f6/j8hlykUr3q.lottie"
//               loop
//               autoplay
//               className="w-full h-full max-w-md object-contain"
//               style={{ aspectRatio: "1.618/1" }}
//             />
//           </div>
//         </div>

//         <div className="w-full max-w-7xl mx-auto px-6 sm:px-8 py-8 md:py-10 bg-white rounded-2xl shadow-xl border border-gray-200">
//           <h3 className="text-3xl md:text-4xl font-extrabold text-center mb-10 text-gray-800">
//             Engage with Experts at{" "}
//             <span className="bg-gradient-to-r from-teal-500 to-green-600 bg-clip-text text-transparent">
//               Our Upcoming Events
//             </span>
//           </h3>
//           <p className="text-lg text-center text-gray-600 mb-8 max-w-xl mx-auto">
//             Click on a conference below to proceed with registration.
//           </p>

//           <div className="flex flex-col lg:flex-row gap-8 lg:gap-10">
//             {/* Hybrids Section */}
//             <div className="w-full lg:w-1/2 flex flex-col">
//               <h4 className="text-2xl font-bold text-amber-800 mb-6 text-center lg:text-center">
//                 Hybrids
//               </h4>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-grow">
//                 {allConferenceLists.hybridConfsAll.map((conf) => (
//                   <div
//                     key={conf.code}
//                     className="flex flex-col justify-between bg-fuchsia-50 rounded-xl shadow-md border border-fuchsia-200 p-5 min-h-[250px] transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
//                   >
//                     <div className="w-12 h-12 flex items-center justify-center rounded-full bg-fuchsia-200 text-fuchsia-700 mb-3">
//                       <Mic2 className="h-6 w-6" />
//                     </div>

//                     <div className="flex flex-col items-center text-center flex-1">
//                       <h5 className="font-extrabold text-lg text-fuchsia-900 mb-1 leading-tight">
//                         {conf.title}
//                       </h5>
//                       {conf.date && (
//                         <p className="text-lg font-bold text-gray-600 mb-2">
//                           {conf.date}
//                         </p>
//                       )}
//                     </div>

//                     <div className="flex gap-3 justify-center mt-2">
//                       {/* Register Button */}
//                       <button
//                         onClick={() =>
//                           handleProceedWithConference(
//                             allConferences.find(
//                               (option) => option.value === conf.code
//                             )
//                           )
//                         }
//                         className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-semibold uppercase tracking-wide bg-purple-100 text-purple-800"
//                       >
//                         <Pencil className="w-4 h-4" />
//                         Register
//                       </button>

//                       {/* Visit Button */}
//                       {conf.link && (
//                         <a
//                           href={conf.link}
//                           target="_blank"
//                           rel="noopener noreferrer"
//                           className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-semibold uppercase tracking-wide bg-purple-100 text-purple-800"
//                         >
//                           <ExternalLink className="w-4 h-4" />
//                           Visit
//                         </a>
//                       )}
//                     </div>
//                   </div>
//                 ))}

//                 {allConferenceLists.hybridConfsAll.length === 0 && (
//                   <p className="text-gray-500 text-center col-span-full text-base">
//                     No Hybrid Conferences available yet.
//                   </p>
//                 )}
//               </div>
//             </div>

//             {/* Webinars Section */}
//             <div className="w-full lg:w-1/2 flex flex-col">
//               <h4 className="text-2xl font-bold text-yellow-500 mb-6 text-center lg:text-center">
//                 Webinars
//               </h4>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-grow">
//                 {allConferenceLists.webinarConfsAll.map((conf) => (
//                   <div
//                     key={conf.code}
//                     className="flex flex-col justify-between bg-yellow-50 rounded-xl shadow-md border border-yellow-200 p-5 min-h-[250px] transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
//                   >
//                     <div className="w-12 h-12 flex items-center justify-center rounded-full bg-yellow-200 text-yellow-700 mb-3">
//                       <Webcam className="h-6 w-6" />
//                     </div>

//                     <div className="flex flex-col items-center text-center flex-1">
//                       <h5 className="font-extrabold text-lg text-yellow-900 mb-1 leading-tight">
//                         {conf.title}
//                       </h5>
//                       {conf.date && (
//                         <p className="text-lg font-bold text-gray-600 mb-2">
//                           {conf.date}
//                         </p>
//                       )}
//                     </div>

//                     <div className="flex gap-3 justify-center mt-2">
//                       {/* Register Button */}
//                       <button
//                         onClick={() =>
//                           handleProceedWithConference(
//                             allConferences.find(
//                               (option) => option.value === conf.code
//                             )
//                           )
//                         }
//                         className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-semibold uppercase tracking-wide bg-yellow-100 text-yellow-800"
//                       >
//                         <Pencil className="w-4 h-4" />
//                         Register
//                       </button>

//                       {/* Visit Button */}
//                       {conf.link && (
//                         <a
//                           href={conf.link}
//                           target="_blank"
//                           rel="noopener noreferrer"
//                           className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-semibold uppercase tracking-wide bg-yellow-100 text-yellow-800"
//                         >
//                           <ExternalLink className="w-4 h-4" />
//                           Visit
//                         </a>
//                       )}
//                     </div>
//                   </div>
//                 ))}

//                 {allConferenceLists.webinarConfsAll.length === 0 && (
//                   <p className="text-gray-500 text-center col-span-full text-base">
//                     No Webinar Conferences available yet.
//                   </p>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   const getCardColors = (category, isSelected) => {
//     let iconBg = "";
//     let iconText = "";
//     let overlayBaseBgClass = ""; // Base color for the glass overlay (e.g., white or black)
//     let buttonBg = "";
//     let buttonHover = "";
//     let borderAccent = "";
//     let shadow = "shadow-lg";

//     // Dynamic glass effect properties: more opaque/blurred when selected
//     const overlayOpacityClass = isSelected ? "bg-opacity-30" : "bg-opacity-10";
//     const backdropBlurClass = isSelected
//       ? "backdrop-blur-lg"
//       : "backdrop-blur-md";

//     switch (category) {
//       case "e-Poster":
//       case "Video Presentation":
//       case "Virtual Presentation":
//       case "Oral Presentation":
//       case "Delegate":
//         // Vibrant orange with a subtle glass effect
//         iconBg = "bg-gradient-to-br from-[#FF8C00] to-[#FC6A03]"; // Orange shades
//         overlayBaseBgClass = "bg-white"; // Light base for the transparent overlay
//         buttonBg = "bg-gradient-to-r from-[#FF8C00] to-[#E55F00]"; // Stronger orange button
//         buttonHover = "hover:from-[#FFB04C] hover:to-[#FF8C00]"; // Lighter orange on hover
//         borderAccent = "border-2 border-[#FC6A03]/70"; // Orange border accent
//         iconText = "text-black"; // Ensures text visibility on light icon backgrounds
//         break;

//       case "Article Publication":
//       case "Exhibitor":
//       case "Standard Pass":
//       case "VIP Pass":
//         // Slightly warmer orange tones with a distinct glass look
//         iconBg = "bg-gradient-to-br from-[#FCD34D] to-[#FC6A03]"; // Yellow-orange to orange
//         overlayBaseBgClass = "bg-white"; // Light base for the transparent overlay
//         buttonBg = "bg-gradient-to-r from-[#FC6A03] to-[#FF8C00]"; // Reverse gradient for button
//         buttonHover = "hover:from-[#E55F00] hover:to-[#FC6A03]"; // Darker orange on hover
//         borderAccent = "border-2 border-[#FC6A03]/80"; // Slightly more opaque orange border
//         iconText = "text-black";
//         break;

//       case "Suit - A (OP + 2N stay)":
//       case "Suit - B (OP + 3N stay)":
//       case "Accompanying Person":
//       case "Extra N-Stay":
//         // Deeper orange tones with a more pronounced, darker glass effect
//         iconBg = "bg-gradient-to-br from-[#E55F00] to-[#FC6A03]"; // Darker orange to main orange
//         overlayBaseBgClass = "bg-black"; // Dark base for the transparent overlay
//         buttonBg = "bg-gradient-to-r from-[#FC6A03] to-[#A34300]"; // Orange to deep brown-orange
//         buttonHover = "hover:from-[#FF8C00] hover:to-[#FC6A03]"; // Brighter orange on hover
//         borderAccent = "border-2 border-[#A34300]/90"; // Darker, more opaque border
//         iconText = "text-white"; // Ensures text visibility on darker backgrounds
//         break;

//       default:
//         // Fallback colors for any unlisted category, similar to the first case
//         iconBg = "bg-gradient-to-br from-[#FF8C00] to-[#FC6A03]";
//         overlayBaseBgClass = "bg-white";
//         buttonBg = "bg-gradient-to-r from-[#FF8C00] to-[#E55F00]";
//         buttonHover = "hover:from-[#FFB04C] hover:to-[#FF8C00]";
//         borderAccent = "border-2 border-[#FC6A03]/70";
//         iconText = "text-black";
//         break;
//     }

//     return {
//       cardBg: "bg-white", // The main card background remains solid white
//       cardBorder: isSelected ? `${borderAccent}` : "border border-gray-200", // Accent border only when selected
//       cardShadow: shadow,
//       iconBg,
//       iconText,
//       // Combined classes for the fluid glass overlay effect
//       overlayBg: `${overlayBaseBgClass} ${overlayOpacityClass} ${backdropBlurClass}`,
//       buttonBg,
//       buttonHover,
//     };
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 py-8 md:py-12 font-sans text-gray-800 text-base">
//       <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
//         <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-center mb-4 leading-tight text-gray-800">
//           Secure Your Spot for{" "}
//           <span className="bg-gradient-to-br from-[#FF8C00] to-[#FC6A03] bg-clip-text text-transparent">
//             {conferenceDetails.name}
//           </span>
//         </h1>
//         {conferenceDetails.date && (
//           <p className="text-lg md:text-xl font-semibold text-center text-gray-700 mb-6">
//             {conferenceDetails.date}
//           </p>
//         )}

//         <form onSubmit={handleSubmit} className="space-y-12 md:space-y-16">
//           <div className="flex justify-center mb-8 md:mb-12">
//             {/* <div className="bg-white rounded-full p-2 md:p-2.5 flex items-center space-x-3 md:space-x-4 shadow-md border border-gray-200">
//               <button
//                 type="button"
//                 className={`px-4 py-2.5 md:px-6 md:py-3 rounded-full text-base font-semibold transition-colors duration-300 ${
//                   participantType === "academic"
//                     ? "bg-lime-600 text-white shadow-sm"
//                     : "text-gray-600 hover:bg-gray-100"
//                 }`}
//                 onClick={() => setParticipantType("academic")}
//               >
//                 Academic
//               </button>
//               <button
//                 type="button"
//                 className={`px-4 py-2.5 md:px-6 md:py-3 rounded-full text-base font-semibold transition-colors duration-300 ${
//                   participantType === "business"
//                     ? "bg-lime-600 text-white shadow-sm"
//                     : "text-gray-600 hover:bg-gray-100"
//                 }`}
//                 onClick={() => setParticipantType("business")}
//               >
//                 Business
//               </button>
//             </div> */}
//           </div>

//           {registrationCategories.length > 0 && (
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
//               {registrationCategories.map((category) => {
//                 const priceInfo = conferenceDetails.pricingPlans[category];
//                 if (!priceInfo) return null;
//                 const currentPrice = priceInfo[participantType];
//                 const quantity = selectedItems[category]?.quantity || 0;
//                 const isSelected = quantity > 0;
//                 const colors = getCardColors(category, isSelected);

//                 return (
//                   <div
//                     key={category}
//                     className={`relative ${colors.cardBg} ${colors.cardShadow} ${colors.cardBorder} rounded-2xl flex flex-col transition-all duration-300 hover:shadow-lg hover:-translate-y-1`}
//                   >
//                     {/* Icon positioned slightly above and centered on the overlay */}
//                     <div
//                       className={`absolute -top-6 left-1/2 transform -translate-x-1/2 ${colors.iconBg} ${colors.iconText} w-16 h-16 flex items-center justify-center rounded-full shadow-lg z-20`}
//                     >
//                       {getCategoryIcon(category)}
//                     </div>

//                     {/* Translucent Header Overlay */}
//                     <div
//                       className={`relative ${colors.overlayBg} rounded-t-2xl pt-10 pb-4 text-center z-10`}
//                     >
//                       <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mt-6">
//                         {category}
//                       </h3>
//                     </div>

//                     {/* Main Card Content */}
//                     <div className="flex flex-col flex-grow p-4 pt-0 text-center">
//                       <p className="text-4xl font-extrabold text-gray-900 mb-4">
//                         ${currentPrice.toFixed(2)}
//                       </p>

//                       <ul className="text-base text-gray-700 space-y-2 mb-6 md:mb-8 text-left mx-auto max-w-xs w-full">
//                         {priceInfo.features?.map((feature, idx) => (
//                           <li key={idx} className="flex items-start">
//                             {/* This is the new checkmark SVG */}
//                             <svg
//                               xmlns="http://www.w3.org/2000/svg"
//                               className="h-5 w-5 text-green-700 mr-2 flex-shrink-0 mt-0.5"
//                               viewBox="0 0 20 20"
//                               fill="currentColor"
//                             >
//                               <path
//                                 fillRule="evenodd"
//                                 d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
//                                 clipRule="evenodd"
//                               />
//                             </svg>
//                             {feature}
//                           </li>
//                         ))}
//                       </ul>

//                       <div className="flex items-center justify-center space-x-3 mt-auto">
//                         <button
//                           type="button"
//                           onClick={() => handleQuantityChange(category, -1)}
//                           className={`w-10 h-10 flex items-center justify-center rounded-full ${colors.buttonBg} text-white text-xl font-bold transition-all duration-200 ${colors.buttonHover}`}
//                           aria-label={`Decrease quantity for ${category}`}
//                         >
//                           <svg
//                             xmlns="http://www.w3.org/2000/svg"
//                             className="h-6 w-6"
//                             fill="none"
//                             viewBox="0 0 24 24"
//                             stroke="currentColor"
//                             strokeWidth="2"
//                           >
//                             <path
//                               strokeLinecap="round"
//                               strokeLinejoin="round"
//                               d="M20 12H4"
//                             />
//                           </svg>
//                         </button>
//                         <span className="text-2xl font-semibold text-black-900 w-10 text-center">
//                           {quantity}
//                         </span>
//                         <button
//                           type="button"
//                           onClick={() => handleQuantityChange(category, 1)}
//                           className={`w-10 h-10 flex items-center justify-center rounded-full ${colors.buttonBg} text-white text-xl font-bold transition-all duration-200 ${colors.buttonHover}`}
//                           aria-label={`Increase quantity for ${category}`}
//                         >
//                           <svg
//                             xmlns="http://www.w3.org/2000/svg"
//                             className="h-6 w-6"
//                             fill="none"
//                             viewBox="0 0 24 24"
//                             stroke="currentColor"
//                             strokeWidth="2"
//                           >
//                             <path
//                               strokeLinecap="round"
//                               strokeLinejoin="round"
//                               d="M12 4v16m8-8H4"
//                             />
//                           </svg>
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>
//           )}

//           {addOnCategories.length > 0 && (
//             <>
//               <h2 className="text-2xl md:text-3xl font-extrabold text-center text-gray-800 mt-12 mb-8">
//                 Enhance Your Experience{" "}
//                 <span className="text-[#7A3803]">(Add-Ons)</span>
//               </h2>
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
//                 {addOnCategories.map((category) => {
//                   const priceInfo =
//                     conferenceDetails.pricingPlans["Add-Ons"][category];
//                   if (!priceInfo) return null;
//                   const currentPrice = priceInfo[participantType];
//                   const quantity = selectedItems[category]?.quantity || 0;
//                   const isSelected = quantity > 0;
//                   const colors = getCardColors(category, isSelected);

//                   return (
//                     <div
//                       key={category}
//                       className={`relative ${colors.cardBg} ${colors.cardShadow} ${colors.cardBorder} rounded-2xl flex flex-col transition-all duration-300 hover:shadow-lg hover:-translate-y-1`}
//                     >
//                       {/* Icon positioned slightly above and centered on the overlay */}
//                       <div
//                         className={`absolute -top-6 left-1/2 transform -translate-x-1/2 ${colors.iconBg} ${colors.iconText} w-16 h-16 flex items-center justify-center rounded-full shadow-lg z-20`}
//                       >
//                         {getCategoryIcon(category)}
//                       </div>

//                       {/* Translucent Header Overlay */}
//                       <div
//                         className={`relative ${colors.overlayBg} rounded-t-2xl pt-10 pb-4 text-center z-10`}
//                       >
//                         <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mt-6">
//                           {category}
//                         </h3>
//                       </div>

//                       {/* Main Card Content */}
//                       <div className="flex flex-col flex-grow p-4 pt-0 text-center">
//                         <p className="text-4xl font-extrabold text-gray-900 mb-4">
//                           ${currentPrice.toFixed(2)}
//                         </p>

//                         <ul className="text-base text-gray-700 space-y-2 mb-6 md:mb-8 text-left mx-auto max-w-xs w-full">
//                           {priceInfo.features?.map((feature, idx) => (
//                             <li key={idx} className="flex items-start">
//                               {/* This is the new checkmark SVG */}
//                               <svg
//                                 xmlns="http://www.w3.org/2000/svg"
//                                 className="h-5 w-5 text-green-700 mr-2 flex-shrink-0 mt-0.5"
//                                 viewBox="0 0 20 20"
//                                 fill="currentColor"
//                               >
//                                 <path
//                                   fillRule="evenodd"
//                                   d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
//                                   clipRule="evenodd"
//                                 />
//                               </svg>
//                               {feature}
//                             </li>
//                           ))}
//                         </ul>

//                         <div className="flex items-center justify-center space-x-3 mt-auto">
//                           <button
//                             type="button"
//                             onClick={() => handleQuantityChange(category, -1)}
//                             className={`w-10 h-10 flex items-center justify-center rounded-full ${colors.buttonBg} text-white text-xl font-bold transition-all duration-200 ${colors.buttonHover}`}
//                             aria-label={`Decrease quantity for ${category}`}
//                           >
//                             <svg
//                               xmlns="http://www.w3.org/2000/svg"
//                               className="h-6 w-6"
//                               fill="none"
//                               viewBox="0 0 24 24"
//                               stroke="currentColor"
//                               strokeWidth="2"
//                             >
//                               <path
//                                 strokeLinecap="round"
//                                 strokeLinejoin="round"
//                                 d="M20 12H4"
//                               />
//                             </svg>
//                           </button>
//                           <span className="text-2xl font-semibold text-black-900 w-10 text-center">
//                             {quantity}
//                           </span>
//                           <button
//                             type="button"
//                             onClick={() => handleQuantityChange(category, 1)}
//                             className={`w-10 h-10 flex items-center justify-center rounded-full ${colors.buttonBg} text-white text-xl font-bold transition-all duration-200 ${colors.buttonHover}`}
//                             aria-label={`Increase quantity for ${category}`}
//                           >
//                             <svg
//                               xmlns="http://www.w3.org/2000/svg"
//                               className="h-6 w-6"
//                               fill="none"
//                               viewBox="0 0 24 24"
//                               stroke="currentColor"
//                               strokeWidth="2"
//                             >
//                               <path
//                                 strokeLinecap="round"
//                                 strokeLinejoin="round"
//                                 d="M12 4v16m8-8H4"
//                               />
//                             </svg>
//                           </button>
//                         </div>
//                       </div>
//                     </div>
//                   );
//                 })}
//               </div>
//             </>
//           )}

//           {/* Contact Information Section */}
//           <div className="bg-white p-6 md:p-8 rounded-2xl shadow-md border border-gray-200">
//             <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-6 text-center">
//               Your Contact Information
//             </h2>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <div>
//                 <label
//                   htmlFor="fullName"
//                   className="block text-base font-medium text-gray-700 mb-2"
//                 >
//                   Full Name <span className="text-red-500">*</span>
//                 </label>
//                 <input
//                   type="text"
//                   id="fullName"
//                   className="mt-1 block w-full px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-base"
//                   value={participantFullName}
//                   onChange={(e) => setParticipantFullName(e.target.value)}
//                   required
//                 />
//               </div>
//               <div>
//                 <label
//                   htmlFor="email"
//                   className="block text-base font-medium text-gray-700 mb-2"
//                 >
//                   Email Address <span className="text-red-500">*</span>
//                 </label>
//                 <input
//                   type="email"
//                   id="email"
//                   className="mt-1 block w-full px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-base"
//                   value={participantEmail}
//                   onChange={(e) => setParticipantEmail(e.target.value)}
//                   required
//                 />
//               </div>
//               <div>
//                 <label
//                   htmlFor="country"
//                   className="block text-base font-medium text-gray-700 mb-2"
//                 >
//                   Country <span className="text-red-500">*</span>
//                 </label>
//                 <input
//                   type="text"
//                   id="country"
//                   className="mt-1 block w-full px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-base"
//                   value={participantCountry}
//                   onChange={(e) => setParticipantCountry(e.target.value)}
//                   required
//                 />
//               </div>
//               <div>
//                 <label
//                   htmlFor="phone"
//                   className="block text-base font-medium text-gray-700 mb-2"
//                 >
//                   Phone Number
//                 </label>
//                 <input
//                   type="text"
//                   id="phone"
//                   className="mt-1 block w-full px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-base"
//                   value={participantPhone}
//                   onChange={(e) => setParticipantPhone(e.target.value)}
//                 />
//               </div>
//               <div className="md:col-span-2">
//                 <label
//                   htmlFor="organization"
//                   className="block text-base font-medium text-gray-700 mb-2"
//                 >
//                   Organization / University
//                 </label>
//                 <input
//                   type="text"
//                   id="organization"
//                   className="mt-1 block w-full px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-base"
//                   value={participantOrganization}
//                   onChange={(e) => setParticipantOrganization(e.target.value)}
//                 />
//               </div>
//             </div>
//           </div>

//           {/* Total Amount and Payment Button */}
//           <div className="bg-green-100 p-6 md:p-8 rounded-2xl shadow-lg text-green-900 flex flex-col items-center justify-center text-center border border-green-300">
//             <p className="text-lg md:text-xl font-semibold mb-3">
//               Total Amount:
//             </p>
//             <p className="text-4xl md:text-5xl font-extrabold mb-6">
//               ${totalAmount.toFixed(2)}
//             </p>
//             <button
//               type="submit"
//               className="w-full max-w-sm bg-green-600 text-white px-7 py-3.5 rounded-xl text-lg font-bold
//                                 hover:bg-green-700 transition duration-300 transform hover:scale-105 shadow-md
//                                 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
//             >
//               Proceed to Secure Payment
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default RegistrationPage;
