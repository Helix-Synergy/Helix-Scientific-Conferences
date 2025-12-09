// // src/pages/RegistrationPage.jsx - FULL UPDATED CODE for single rate
// import React, { useState, useEffect, useMemo } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import axios from "axios";
// import Select from "react-select";
// import { DotLottieReact } from "@lottiefiles/dotlottie-react";
// import { Mic2, Webcam, Pencil, ExternalLink } from "lucide-react";

// // Import your conference data - ensure these files exist and have the 'date' field
// import webinarsData from "../data/webinarsData1";
// import hybridsData from "../data/hybridsData1";
// import SEO from "../components/SEO";

// // Define your backend URL from environment variables or direct string
// // const API_BASE_URL = "https://backend-code-6vqy.onrender.com";
// const API_BASE_URL = "http://localhost:5000"; // Change this to your backend URL

// // Helper function to get category icons (retained as is)
// const getCategoryIcon = (category) => {
//   switch (category) {
//     case "e-Poster Presentation":
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
//     case "Poster Presentation":
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
//           <circle cx="12" cy="9.5" r="2.5"></circle>
//           <path d="M15.4 13.5a4 4 0 0 0-6.8 0"></path>
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
//     case "Delegate Access":
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
//     case "Extra N-Stay":
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
//     case "Article Publication (Additional)":
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
//     case "Virtual Exhibitor Booth":
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
//   const [conferenceDetails, setConferenceDetails] = useState(null); // selectedItems now just stores { quantity }

//   const [selectedItems, setSelectedItems] = useState({}); // Removed participantType state as it's no longer needed
//   const [totalAmount, setTotalAmount] = useState(0);

//   const [selectedConferenceOption, setSelectedConferenceOption] =
//     useState(null); // State for participant info (always visible now)

// //   const [participantFullName, setParticipantFullName] = useState("");
//   const [participantEmail, setParticipantEmail] = useState("");
//   const [participantCountry, setParticipantCountry] = useState("");
//   const [participantPhone, setParticipantPhone] = useState("");
//   const [participantOrganization, setParticipantOrganization] = useState("");

//   // ADDED: State for new participant info fields to resolve the 'no-undef' errors
//   const [participantSalutation, setParticipantSalutation] = useState("");
//   const [participantFirstName, setParticipantFirstName] = useState("");
//   const [participantLastName, setParticipantLastName] = useState("");
//   const [participantAddress, setParticipantAddress] = useState(""); // Show all conferences for display lists (no year filtering)

//   const allConferenceLists = useMemo(() => {
//     const webinarConfsAll = webinarsData || [];
//     const hybridConfsAll = hybridsData || [];

//     return { webinarConfsAll, hybridConfsAll };
//   }, []); // Combine all conferences for the dropdown and the upcoming events list

//   const allConferences = useMemo(() => {
//     const webinarConfs = webinarsData.map((conf) => ({
//       id: conf.code,
//       name: conf.title,
//       type: conf.type.toLowerCase(),
//       description:
//         conf.description ||
//         "Explore groundbreaking research and connect with leading experts in this dynamic event.",
//       year: conf.year,
//       date: conf.date,
//     }));

//     const hybridConfs = hybridsData.map((conf) => ({
//       id: conf.code,
//       name: conf.title,
//       type: "hybrid",
//       description:
//         conf.description ||
//         "Discover the latest innovations and network with professionals in this unique hybrid conference.",
//       year: conf.year,
//       date: conf.date,
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
//       case "e-Poster Presentation":
//         return [
//           "Digital e-poster Display",
//           "Abstract in Conference Proceedings",
//           "Certificate of Presentation",
//         ];
//       case "Poster Presentation":
//         return [
//           "Boost your Profile",
//           "Networking",
//           "Certificate of Presentation",
//         ];
//       case "Video Presentation":
//         return [
//           "10-15 minutes Video Slot",
//           "Online Access for 1 hour",
//           "Certificate of Presentation",
//         ];
//       case "Virtual Presentation":
//         return [
//           "Online Slot for 20 minutes",
//           "Global Networking",
//           "Promotions",
//           "Certificate of Presentation",
//         ];
//       case "Oral Presentation":
//         return [
//           "Keynote Slot Eligibility",
//           "Promotions",
//           "Conference Kit",
//           "Networking Access",
//         ];
//       case "Delegate Access":
//         return [
//           "Access to all sessions",
//           "Conference Handbook",
//           "Coffee Break & Lunch",
//           "Networking Opportunities",
//         ];
//       case "Suit - A (OP + 2N stay)":
//         return [
//           "Oral Presentation",
//           "2 Night’s Accommodation",
//           "Shuttle Service",
//           "Certificate & Promotions",
//           "Queen Size Room",
//         ];
//       case "Suit - B (OP + 3N stay)":
//         return [
//           "Oral Presentation",
//           "3 Night’s Accommodation",
//           "Shuttle Service",
//           "Certificate & Promotions",
//           "Queen Size Room",
//         ];
//       case "Accompanying Person":
//         return ["Access to social events", "Meals & Coffee Breaks"];
//       case "Extra N-Stay":
//         return [
//           "Additional Night(s) at Conference Hotel",
//           "Breakfast Included",
//         ];
//       case "Article Publication (Additional)":
//         return [
//           "Full Paper Publication in Journal",
//           "Peer Review Process",
//           "DOI Assignment",
//         ];
//       case "Virtual Exhibitor Booth":
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

//   // New helper function for dynamic card colors based on category and selection
//   const getCardColors = (category, isSelected) => {
//     let colors = {
//       cardBg: "bg-white",
//       cardShadow: "shadow-md",
//       cardBorder: "border border-gray-200",
//       overlayBg: "bg-gray-100/70",
//       iconBg: "bg-gray-500",
//       iconText: "text-white",
//       buttonBg: "bg-gray-600",
//       buttonHover: "hover:bg-gray-700",
//     };

//     switch (category) {
//       case "e-Poster Presentation":
//       case "Video Presentation":
//       case "Virtual Presentation":
//       case "Oral Presentation":
//       case "Poster Presentation":
//         colors.iconBg = "bg-[#FF8C00]"; // Orange
//         colors.iconText = "text-white";
//         colors.overlayBg = "bg-orange-100/70";
//         colors.buttonBg = "bg-[#FF8C00]";
//         colors.buttonHover = "hover:bg-[#FC6A03]";
//         break;
//       case "Delegate Access":
//       case "Standard Pass":
//       case "VIP Pass":
//         colors.iconBg = "bg-[#4CAF50]"; // Green
//         colors.iconText = "text-white";
//         colors.overlayBg = "bg-green-100/70";
//         colors.buttonBg = "bg-[#4CAF50]";
//         colors.buttonHover = "hover:bg-[#45a049]";
//         break;
//       case "Suit - A (OP + 2N stay)":
//       case "Suit - B (OP + 3N stay)":
//       case "Accompanying Person":
//       case "Extra N-Stay":
//         colors.iconBg = "bg-[#2196F3]"; // Blue
//         colors.iconText = "text-white";
//         colors.overlayBg = "bg-blue-100/70";
//         colors.buttonBg = "bg-[#2196F3]";
//         colors.buttonHover = "hover:bg-[#1976d2]";
//         break;
//       case "Article Publication (Additional)":
//         colors.iconBg = "bg-[#9C27B0]"; // Purple
//         colors.iconText = "text-white";
//         colors.overlayBg = "bg-purple-100/70";
//         colors.buttonBg = "bg-[#9C27B0]";
//         colors.buttonHover = "hover:bg-[#7b1fa2]";
//         break;
//       case "Virtual Exhibitor Booth":
//         colors.iconBg = "bg-[#FFC107]"; // Amber
//         colors.iconText = "text-gray-800";
//         colors.overlayBg = "bg-amber-100/70";
//         colors.buttonBg = "bg-[#FFC107]";
//         colors.buttonHover = "hover:bg-[#ffa000]";
//         break;
//       default:
//         // Default colors already set
//         break;
//     }

//     if (isSelected) {
//       colors.cardBg = "bg-white"; // Keep white background for selected state
//       colors.cardShadow = "shadow-xl ring-2 ring-offset-2 ring-lime-500"; // Green ring for selected
//       colors.cardBorder = "border-lime-500"; // Green border for selected
//     } else {
//       colors.cardShadow = "shadow-lg"; // Less shadow when not selected
//       colors.cardBorder = "border-gray-200"; // Default border when not selected
//     }

//     return colors;
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
//             const rawPricingPlans = response.data.pricingPlans || [];
//             const transformedPricingPlans = {};
//             const transformedAddOns = {};
//             console.log("Debugging 't':", rawPricingPlans);
//             console.log("Type of 't':", typeof rawPricingPlans);
//             console.log("Is 't' an Array?", Array.isArray(rawPricingPlans));
//             rawPricingPlans.forEach((plan) => {
//               // Now, we just use basePrice as the single price

//               const singlePrice = plan.basePrice;

//               const planData = {
//                 price: singlePrice, // Store the single price directly
//                 features: plan.features || getPlaceholderFeatures(plan.name),
//               };

//               // Assign main plans
//               transformedPricingPlans[plan.name] = planData;

//               // Process nested add-ons
//               if (plan.addOns && Array.isArray(plan.addOns)) {
//                 plan.addOns.forEach((addOn) => {
//                   transformedAddOns[addOn.name] = {
//                     price: addOn.price, // Use add-on's price directly
//                     features: getPlaceholderFeatures(addOn.name),
//                   };
//                 });
//               }
//             });

//             // If there are collected add-ons, add them under an "Add-Ons" key
//             if (Object.keys(transformedAddOns).length > 0) {
//               transformedPricingPlans["Add-Ons"] = transformedAddOns;
//             }

//             setConferenceDetails({
//               name: response.data.conferenceName,
//               type: response.data.conferenceType,
//               pricingPlans: transformedPricingPlans, // Use the transformed data
//               sourceId: response.data.sourceId,
//               date: response.data.date,
//               year: response.data.year,
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

//   // Effect to recalculate total amount when selectedItems changes
//   useEffect(() => {
//     if (!conferenceDetails?.pricingPlans) {
//       setTotalAmount(0);
//       return;
//     }

//     let currentTotal = 0;
//     const mainPricing = conferenceDetails.pricingPlans;
//     const addOnPricing = conferenceDetails.pricingPlans["Add-Ons"] || {};

//     for (const category in selectedItems) {
//       const quantity = selectedItems[category].quantity;

//       let price = 0;
//       if (mainPricing[category]) {
//         price = mainPricing[category].price; // Access the single 'price' property
//       } else if (addOnPricing[category]) {
//         price = addOnPricing[category].price; // Access the single 'price' property for add-ons
//       }

//       if (price !== undefined && price !== null && quantity) {
//         currentTotal += price * quantity;
//       }
//     }
//     setTotalAmount(currentTotal);
//   }, [selectedItems, conferenceDetails]); // Removed participantType from dependencies

//   const handleQuantityChange = (category, change) => {
//     setSelectedItems((prev) => {
//       const isMainCategory = registrationCategories.includes(category);
//       const priceSource = isMainCategory
//         ? conferenceDetails.pricingPlans
//         : conferenceDetails.pricingPlans["Add-Ons"];

//       const currentItem = prev[category] || { quantity: 0 }; // Removed 'type'
//       const newQuantity = Math.max(0, currentItem.quantity + change);

//       const price = priceSource?.[category]?.price; // Access the single 'price' property

//       if ((price === undefined || price === null) && newQuantity > 0) {
//         alert(`Pricing for '${category}' is not available.`);
//         return prev;
//       }

//       if (newQuantity === 0) {
//         const newState = { ...prev };
//         delete newState[category];
//         return newState;
//       }
//       return {
//         ...prev,
//         [category]: { ...currentItem, quantity: newQuantity }, // Removed 'type'
//       };
//     });
//   };

//   const handleReactSelectChange = (selectedOption) => {
//     setSelectedConferenceOption(selectedOption);
//     // Clear selected items and reset total amount when conference changes
//     setSelectedItems({});
//     setTotalAmount(0);
//     // Reset conference details as well, to trigger re-fetch/re-render logic
//     setConferenceDetails(null);
//   };

//   const handleProceedWithConference = async (confOption) => {
//     if (!confOption) {
//       alert("Please select a conference.");
//       return;
//     }

//     setIsLoading(true);
//     setError(null);

//     const selectedConf = confOption.originalConf;

//     try {
//       const response = await axios.get(
//         `${API_BASE_URL}/api/source/generate-token`,
//         {
//           params: {
//             sourceId: selectedConf.id,
//             conferenceType: selectedConf.type,
//             date: selectedConf.date,
//             conferenceYear: selectedConf.year,
//           },
//         }
//       );

//       if (response.data.token) {
//         localStorage.setItem("sourceToken", response.data.token); // ✅ Save token locally
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

//   const handleSubmit = async (event) => {
//     // Prevent the default form submission behavior, but allow the calling function to handle it
//     if (event) {
//       event.preventDefault();
//     }

//     // --- 1. Client-Side Validation ---
//     if (
//       !participantFirstName ||
//       !participantLastName ||
//       !participantEmail ||
//       !participantCountry
//     ) {
//       alert("Please fill in all required participant information.");
//       return false; // Stop here and signal failure
//     }

//     if (totalAmount <= 0 && Object.keys(selectedItems).length === 0) {
//       alert("Please select at least one registration item.");
//       return false; // Stop here and signal failure
//     }

//     // --- 2. Prepare Data ---
//     const finalSelectedItems = {};
//     for (const category in selectedItems) {
//       const price =
//         conferenceDetails.pricingPlans[category]?.price ||
//         conferenceDetails.pricingPlans["Add-Ons"]?.[category]?.price;

//       finalSelectedItems[category] = {
//         quantity: selectedItems[category].quantity,
//         price: price,
//       };
//     }

//     const registrationData = {
//       conferenceId: conferenceDetails.sourceId,
//       conferenceName: conferenceDetails.name,
//       selectedItems: finalSelectedItems,
//       totalAmount: totalAmount,
//       participantInfo: {
//         fullName: `${participantFirstName} ${participantLastName}`,
//         email: participantEmail,
//         address: participantAddress,
//         country: participantCountry,
//         phone: participantPhone,
//         organization: participantOrganization,
//       },
//     };

//     // It's a good practice to update the state with the final items before proceeding
//     setSelectedItems(finalSelectedItems);

//     console.log("Sending registration details to backend:", registrationData);

//     // --- 3. API Call and Error Handling ---
//     try {
//       const response = await axios.post(
//         `${API_BASE_URL}/api/send-registration-email`,
//         registrationData
//       );

//       if (response.status === 200) {
//         console.log("Registration submitted successfully.");
//         return registrationData;
//         // return true; // Signal success
//       } else {
//         // Handle non-200 responses
//         alert("There was an issue submitting your registration.");
//         return false; // Signal failure
//       }
//     } catch (error) {
//       // Handle network or server errors
//       console.error("Error submitting registration:", error);
//       alert(
//         `Failed to submit registration: ${
//           error.response?.data?.message || error.message
//         }. Please try again.`
//       );
//       return false; // Signal failure
//     }
//   };

//   const handleProceedToPayment = async () => {
//     try {
//       setIsLoading(true);

//       const token = localStorage.getItem("sourceToken");
//       if (!token) {
//         alert(
//           "Conference token missing. Please go back and select a conference again."
//         );
//         setIsLoading(false);
//         return;
//       }

//       // Build clean orderDetails with validated pricing
//       const orderDetails = Object.entries(selectedItems)
//         .map(([category, { quantity }]) => {
//           // Try to resolve price from both main and add-on plans
//           let price = conferenceDetails.pricingPlans?.[category]?.price;
//           if (
//             !price &&
//             conferenceDetails.pricingPlans?.["Add-Ons"]?.[category]?.price
//           ) {
//             price = conferenceDetails.pricingPlans["Add-Ons"][category].price;
//           }

//           const validPrice = Number(price);
//           if (!validPrice || isNaN(validPrice)) {
//             console.warn(`⚠️ Invalid price for '${category}' — skipping.`);
//             return null;
//           }

//           return {
//             name: category,
//             price: validPrice,
//             quantity: quantity,
//           };
//         })
//         .filter(Boolean); // remove any nulls

//       if (orderDetails.length === 0) {
//         alert(
//           "Your selected items have missing prices. Please reselect valid options."
//         );
//         setIsLoading(false);
//         return;
//       }

//       console.log("✅ Final orderDetails for Stripe:", orderDetails);

//       const response = await axios.post(
//         `${API_BASE_URL}/api/payment/initiate`,
//         { orderDetails },
//         {
//           headers: {
//             "x-access-token": token,
//           },
//         }
//       );

//       const { sessionId } = response.data;
//     } catch (error) {
//       console.error("Error initiating payment:", error);
//       alert("Failed to initiate payment.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleFullRegistrationAndPayment = async (event) => {
//     event.preventDefault();

//     const registrationData = await handleSubmit(event);

//     if (registrationData) {
//       navigate("/success", {
//         state: {
//           message:
//             "Signup successful and our team will contact you within 48hrs.",
//           contactEmail: "hello@helixconferences.com", // change as needed
//           registrationData,
//         },
//       });
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
//           <SEO
//             title="Register for Helix Conferences | Secure Your Place at Global Scientific, Medical & Industry Events"
//             description="Join the forefront of innovation with Helix Conferences. Register now for high-impact scientific, medical, and technological conferences, hybrid summits, webinars, and workshops. Network with global experts, present your work, and access unparalleled collaboration opportunities."
//             keywords="conference registration, scientific conference sign up, Helix Conferences register, global event registration, webinar sign up, hybrid summit booking, industry event registration, workshop sign up, academic conference participation, present at conference"
//             url="https://helixconferences.com/register"
//             image="https://helixconferences.com/images/register-banner.jpg"
//             canonical="https://helixconferences.com/register"
//             schema={{
//               "@context": "https://schema.org",
//               "@graph": [
//                 {
//                   "@type": "Organization",
//                   "@id": "https://helixconferences.com/#organization",
//                   name: "Helix Conferences",
//                   url: "https://helixconferences.com/",
//                   logo: "https://helixconferences.com/images/logo.png",
//                   sameAs: [
//                     "https://www.facebook.com/HelixConferences",
//                     "https://www.linkedin.com/company/helixconferences",
//                     "https://x.com/HelixConfe69272",
//                     "https://www.instagram.com/helix_conferences/",
//                     "https://www.youtube.com/@Helixconferences",
//                   ],
//                   description:
//                     "Helix Conferences brings together scientists, researchers, and industry pioneers at global events, fostering collaboration, innovation, and knowledge sharing.",
//                   foundingDate: "2010",
//                   founders: [{ "@type": "Person", name: "Dr Surya Sarva" }],
//                   contactPoint: [
//                     {
//                       "@type": "ContactPoint",
//                       telephone: "+1-757-656-7778",
//                       contactType: "Customer Service",
//                       areaServed: "Worldwide",
//                       availableLanguage: "English",
//                     },
//                     {
//                       "@type": "ContactPoint",
//                       telephone: "+91-9000146000",
//                       contactType: "Customer Service",
//                       areaServed: "Worldwide",
//                       availableLanguage: "English",
//                     },
//                   ],
//                 },
//                 {
//                   "@type": "WebPage",
//                   "@id": "https://helixconferences.com/register/#webpage",
//                   url: "https://helixconferences.com/register",
//                   name: "Register for Helix Conferences – Secure Your Place at Global Scientific & Industry Events",
//                   description:
//                     "Sign up to participate in Helix Conferences' global scientific summits, industry workshops, hybrid conferences, and online webinars. Present your research, connect with peers, and explore opportunities.",
//                   inLanguage: "en",
//                 },
//               ],
//             }}
//           />

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
//                                 hover:bg-purple-400 transition duration-300 transform hover:scale-105 shadow-md
//                                 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
//               >
//                 Proceed to Registration
//               </button>
//               <button
//                 type="button"
//                 onClick={() => navigate("/")}
//                 className="w-full sm:w-auto bg-gray-600 text-white px-6 py-3 rounded-xl text-base font-semibold
//                                 hover:bg-gray-700 transition duration-300 transform hover:scale-105 shadow-md
//                                 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
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
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-grow items-stretch">
//                 {allConferenceLists.hybridConfsAll.map((conf) => (
//                   <div
//                     key={conf.code}
//                     className="flex flex-col justify-between bg-amber-50 rounded-xl shadow-md border border-amber-200 p-5 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 max-h-[300px]"
//                   >
//                     <div className="w-12 h-12 flex items-center justify-center rounded-full bg-amber-200 text-amber-700 mb-3">
//                       <Mic2 className="h-6 w-6" />
//                     </div>
//                     <div className="flex flex-col items-center text-center flex-1 overflow-hidden">
//                       <h5 className="font-extrabold text-lg text-amber-900 mb-1 leading-tight line-clamp-2">
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
//                         className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-semibold uppercase tracking-wide bg-purple-500 text-white"
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
//                           className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-semibold uppercase tracking-wide bg-purple-500 text-white"
//                         >
//                           <ExternalLink className="w-4 h-4" />
//                           Visit
//                         </a>
//                       )}
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Webinars Section */}
//             <div className="w-full lg:w-1/2 flex flex-col">
//               <h4 className="text-2xl font-bold text-teal-800 mb-6 text-center lg:text-center">
//                 Webinars
//               </h4>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-grow items-stretch">
//                 {allConferenceLists.webinarConfsAll.map((conf) => (
//                   <div
//                     key={conf.code}
//                     className="flex flex-col justify-between bg-emerald-50 rounded-xl shadow-md border border-emerald-200 p-5 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 max-h-[300px]"
//                   >
//                     <div className="w-12 h-12 flex items-center justify-center rounded-full bg-emerald-200 text-emerald-700 mb-3">
//                       <Webcam className="h-6 w-6" />
//                     </div>
//                     <div className="flex flex-col items-center text-center flex-1 overflow-hidden">
//                       <h5 className="font-extrabold text-lg text-emerald-900 mb-1 leading-tight line-clamp-2">
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
//                         className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-semibold uppercase tracking-wide bg-green-500 text-white"
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
//                           className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-semibold uppercase tracking-wide bg-green-500 text-white"
//                         >
//                           <ExternalLink className="w-4 h-4" />
//                           Visit
//                         </a>
//                       )}
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }
//   return (
//     <div className="min-h-screen bg-gray-50 py-8 md:py-12 font-sans text-gray-800 text-base">
//       <div className="container mx-auto  px-4 sm:px-6 max-w-6xl">
//         <h1 className="text-xl py-6 md:text-4xl lg:text-3xl font-extrabold text-center mb-4 leading-tight text-gray-800">
//           Secure Your Slot for{" "}
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
//           {/* Contact Information Section - Moved to the top */}
//           <div className="bg-white p-6 md:p-8 rounded-2xl shadow-md border border-gray-200">
//             <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-6 text-center">
//               Your Contact Information
//             </h2>
//             <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
//               {/* First Row: Salutation, First Name, Last Name */}
//               <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-4">
//                 <div>
//                   <label
//                     htmlFor="salutation"
//                     className="block text-base font-medium text-gray-700 mb-2"
//                   >
//                     Salutation
//                   </label>
//                   <select
//                     id="salutation"
//                     className="mt-1 block w-full px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-base"
//                     value={participantSalutation}
//                     onChange={(e) => setParticipantSalutation(e.target.value)}
//                   >
//                     <option value="">Select...</option>
//                     <option value="Mr">Mr.</option>
//                     <option value="Mrs">Mrs.</option>
//                     <option value="Miss">Miss</option>
//                     <option value="Ms">Ms.</option>
//                     <option value="Dr">Dr.</option>
//                     <option value="Prof">Prof.</option>
//                   </select>
//                 </div>
//                 <div>
//                   <label
//                     htmlFor="firstName"
//                     className="block text-base font-medium text-gray-700 mb-2"
//                   >
//                     First Name <span className="text-red-500">*</span>
//                   </label>
//                   <input
//                     type="text"
//                     id="firstName"
//                     className="mt-1 block w-full px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-base"
//                     value={participantFirstName}
//                     onChange={(e) => setParticipantFirstName(e.target.value)}
//                     required
//                   />
//                 </div>
//                 <div>
//                   <label
//                     htmlFor="lastName"
//                     className="block text-base font-medium text-gray-700 mb-2"
//                   >
//                     Last Name <span className="text-red-500">*</span>
//                   </label>
//                   <input
//                     type="text"
//                     id="lastName"
//                     className="mt-1 block w-full px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-base"
//                     value={participantLastName}
//                     onChange={(e) => setParticipantLastName(e.target.value)}
//                     required
//                   />
//                 </div>
//               </div>

//               {/* Second Row: Address */}
//               <div className="md:col-span-2">
//                 <label
//                   htmlFor="address"
//                   className="block text-base font-medium text-gray-700 mb-2"
//                 >
//                   Address
//                 </label>
//                 <textarea
//                   id="address"
//                   className="mt-1 block w-full px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-base"
//                   rows="3"
//                   value={participantAddress}
//                   onChange={(e) => setParticipantAddress(e.target.value)}
//                 ></textarea>
//               </div>

//               {/* Third Row: Organization and Country */}
//               <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <div>
//                   <label
//                     htmlFor="organization"
//                     className="block text-base font-medium text-gray-700 mb-2"
//                   >
//                     Organization / University
//                   </label>
//                   <input
//                     type="text"
//                     id="organization"
//                     className="mt-1 block w-full px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-base"
//                     value={participantOrganization}
//                     onChange={(e) => setParticipantOrganization(e.target.value)}
//                   />
//                 </div>
//                 <div>
//                   <label
//                     htmlFor="country"
//                     className="block text-base font-medium text-gray-700 mb-2"
//                   >
//                     Country <span className="text-red-500">*</span>
//                   </label>
//                   <input
//                     type="text"
//                     id="country"
//                     className="mt-1 block w-full px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-base"
//                     value={participantCountry}
//                     onChange={(e) => setParticipantCountry(e.target.value)}
//                     required
//                   />
//                 </div>
//               </div>

//               {/* Fourth Row: Phone Number and Email */}
//               <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <div>
//                   <label
//                     htmlFor="phone"
//                     className="block text-base font-medium text-gray-700 mb-2"
//                   >
//                     Phone Number
//                   </label>
//                   <input
//                     type="text"
//                     id="phone"
//                     className="mt-1 block w-full px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-base"
//                     value={participantPhone}
//                     onChange={(e) => setParticipantPhone(e.target.value)}
//                   />
//                 </div>
//                 <div>
//                   <label
//                     htmlFor="email"
//                     className="block text-base font-medium text-gray-700 mb-2"
//                   >
//                     Email Address <span className="text-red-500">*</span>
//                   </label>
//                   <input
//                     type="email"
//                     id="email"
//                     className="mt-1 block w-full px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-base"
//                     value={participantEmail}
//                     onChange={(e) => setParticipantEmail(e.target.value)}
//                     required
//                   />
//                 </div>
//               </div>
//             </div>
//           </div>

//           {registrationCategories.length > 0 && (
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
//               {registrationCategories.map((category) => {
//                 const priceInfo = conferenceDetails.pricingPlans[category];
//                 if (!priceInfo) return null; // Defensive check
//                 const currentPrice = priceInfo.price; // Access the single 'price'
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
//                         {currentPrice !== undefined && currentPrice !== null
//                           ? `$${currentPrice.toFixed(2)}`
//                           : "N/A"}
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
//                         <span className="text-2xl font-semibold text-gray-900 w-10 text-center">
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
//               <hr className="my-12 border-t-2 border-gray-200" />
//               <h2 className="text-2xl md:text-3xl font-extrabold text-center text-gray-800 mt-12 mb-8">
//                 Enhance Your Experience{" "}
//                 <span className="text-[#7A3803]">(Add-Ons)</span>
//               </h2>
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
//                 {addOnCategories.map((category) => {
//                   const priceInfo =
//                     conferenceDetails.pricingPlans["Add-Ons"][category];
//                   if (!priceInfo) return null; // Defensive check
//                   const currentPrice = priceInfo.price; // Access the single 'price'
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
//                           {currentPrice !== undefined && currentPrice !== null
//                             ? `$${currentPrice.toFixed(2)}`
//                             : "N/A"}
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
//                           <span className="text-2xl font-semibold text-gray-900 w-10 text-center">
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

//           {/* Total Amount and Payment Button */}
//           <div className="bg-green-100 p-6 md:p-8 rounded-2xl shadow-lg text-green-900 flex flex-col items-center justify-center text-center border border-green-300">
//             <p className="text-lg md:text-xl font-semibold mb-3">
//               Selected Package:
//             </p>
//             <p className="text-4xl md:text-5xl font-extrabold mb-6">
//               ${totalAmount.toFixed(2)}
//             </p>
//             <button
//               onClick={handleFullRegistrationAndPayment}
//               className="w-full max-w-sm bg-green-600 text-white px-7 py-3.5 rounded-xl text-lg font-bold
//                            hover:bg-green-700 transition duration-300 transform hover:scale-105 shadow-md
//                            focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
//               disabled={isLoading}
//             >
//               {isLoading ? "Submitting..." : "Submit your Application"}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default RegistrationPage;

// RegistrationPageUpdated.jsx
import React, { useState, useEffect, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Select from "react-select";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import {
  Mic2,
  Webcam,
  Pencil,
  ExternalLink,
  Tag,
  Box,
  ArrowRightCircle,
} from "lucide-react";

// Import conference data (make sure these exist and include date field)
import webinarsData from "../data/webinarsData1";
import hybridsData from "../data/hybridsData1";
import SEO from "../components/SEO";

// Backend base (change to your production backend)
const API_BASE_URL =
  "https://backend-code-6vqy.onrender.com" || "http://localhost:5000";

// small Modal component (in-file)
const Modal = ({ open, title, message, onClose, actions }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-slate-900/40 transition-opacity"
        onClick={onClose}
      />
      <div className="relative bg-white max-w-xl w-full rounded-2xl shadow-2xl p-6 z-20 border border-slate-200">
        <h3 className="text-lg font-bold text-slate-900 mb-3">{title}</h3>
        <p className="text-slate-700 mb-6">{message}</p>
        <div className="flex justify-end gap-3">
          {actions?.map((act, idx) => (
            <button
              key={idx}
              onClick={act.onClick}
              className={`px-4 py-2 rounded-lg font-semibold transition transform hover:scale-105 shadow-sm ${
                act.variant === "primary"
                  ? "bg-amber-600 text-white"
                  : "bg-slate-100 text-slate-800"
              }`}
            >
              {act.label}
            </button>
          )) ?? (
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-slate-100 text-slate-800 font-semibold"
            >
              Close
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

// Keep your existing getCategoryIcon helper (unchanged)
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
          <circle cx="12" cy="4.5" r="0.5" fill="currentColor" stroke="none"></circle>
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


const RegistrationPageUpdated = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Loading / error
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // conference + pricing
  const [conferenceDetails, setConferenceDetails] = useState(null); // { name, type, pricingPlans, sourceId, date, year }
  const [selectedConferenceOption, setSelectedConferenceOption] =
    useState(null);

  // selection & totals
  const [selectedItems, setSelectedItems] = useState({}); // { category: { quantity } }
  const [totalAmount, setTotalAmount] = useState(0);

  // form fields
  const [participantSalutation, setParticipantSalutation] = useState("");
  const [participantFirstName, setParticipantFirstName] = useState("");
  const [participantLastName, setParticipantLastName] = useState("");
  const [participantEmail, setParticipantEmail] = useState("");
  const [participantCountry, setParticipantCountry] = useState("");
  const [participantPhone, setParticipantPhone] = useState("");
  const [participantOrganization, setParticipantOrganization] = useState("");
  const [participantAddress, setParticipantAddress] = useState("");

  // two-step state
  const [isSubmitted, setIsSubmitted] = useState(false); // true after Submit Application
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  // modal
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalMessage, setModalMessage] = useState("");
  const [modalActions, setModalActions] = useState(null);

  // conferences lists
  const allConferenceLists = useMemo(() => {
    const webinarConfsAll = webinarsData || [];
    const hybridConfsAll = hybridsData || [];
    return {...hybridConfsAll, ...webinarConfsAll };
  }, [webinarsData]);


  // const allConferences = useMemo(() => {
  //   const webinarConfs = (webinarsData || []).map((conf) => ({
  //     value: conf.code,
  //     label: `${conf.title} (${
  //       (conf.type || "webinar").charAt(0).toUpperCase() +
  //       (conf.type || "webinar").slice(1)
  //     })${conf.date ? ` - ${conf.date}` : ""}`,
  //     originalConf: conf,
  //   }));
  //   const hybridConfs = (hybridsData || []).map((conf) => ({
  //     value: conf.code,
  //     label: `${conf.title} (${
  //       (conf.type || "hybrid").charAt(0).toUpperCase() +
  //       (conf.type || "hybrid").slice(1)
  //     })${conf.date ? ` - ${conf.date}` : ""}`,
  //     originalConf: conf,
  //   }));
  //   return [...hybridConfs, ...webinarConfs];
  // }, []);

  // helper placeholder features
  // const allConferences = useMemo(() => {
  // const webinarConfs = (webinarsData || []).map((conf) => ({
  //   value: conf.code,
  //   label: `${conf.title}`, // Just the title, no type or date
  //   originalConf: conf,
  // }));
  // const hybridConfs = (hybridsData || []).map((conf) => ({
  //   value: conf.code,
  //   label: `${conf.title}`, // Just the title, no type or date
  //   originalConf: conf,
  // }));
  // return webinarConfs;
// }, [ webinarsData]);

// code 1 is here-------------------------------------
const allConferences = useMemo(() => {
  const webinarConfs = (webinarsData || []).map((conf) => ({
    value: conf.code,
    label: conf.title,       // show only title
    originalConf: conf,
  }));

  return webinarConfs; // only webinars returned
}, [webinarsData]);







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
      case "Standard Pass":
      case "VIP Pass":
        return [
          "Access to sessions",
          "Conference Handbook",
          "Coffee Break & Lunch",
        ];
      default:
        return ["Conference Access", "Networking", "Certificate"];
    }
  };

  // card colors: use slate and amber instead of green/blue
  const getCardColors = (category, isSelected) => {
    const base = {
      cardBg: "bg-white",
      cardShadow: "shadow-md",
      cardBorder: "border border-slate-200",
      overlayBg: "bg-slate-50/70",
      iconBg: "bg-slate-300",
      iconText: "text-slate-900",
      buttonBg: "bg-slate-700",
      buttonHover: "hover:bg-slate-800",
    };

    // small category-specific tints but not green/blue — use amber/amber/slate
    if (/poster|e-Poster|video|virtual|oral/i.test(category)) {
      base.iconBg = "bg-amber-100";
      base.iconText = "text-amber-700";
      base.overlayBg = "bg-amber-50/70";
      base.buttonBg = "bg-amber-600";
      base.buttonHover = "hover:bg-amber-700";
    } else if (/delegate|pass|vip/i.test(category)) {
      base.iconBg = "bg-slate-200";
      base.iconText = "text-slate-900";
      base.overlayBg = "bg-slate-50/70";
      base.buttonBg = "bg-amber-600";
      base.buttonHover = "hover:bg-amber-700";
    } else if (/suit|accompanying|stay/i.test(category)) {
      base.iconBg = "bg-slate-200";
      base.iconText = "text-slate-900";
      base.overlayBg = "bg-slate-50/70";
      base.buttonBg = "bg-amber-600";
      base.buttonHover = "hover:bg-amber-700";
    } else {
      base.iconBg = "bg-slate-200";
      base.iconText = "text-slate-900";
      base.overlayBg = "bg-slate-50/70";
      base.buttonBg = "bg-amber-600";
      base.buttonHover = "hover:bg-amber-700";
    }

    if (isSelected) {
      base.cardShadow = "shadow-xl ring-2 ring-offset-2 ring-amber-300";
      base.cardBorder = "border-amber-300";
    } else {
      base.cardShadow = "shadow-lg";
      base.cardBorder = "border-slate-200";
    }

    return base;
  };

  // parse query params: look for sourceToken or sourceId & conferenceType
  useEffect(() => {
    const q = new URLSearchParams(location.search);
    const sourceToken = q.get("sourceToken");
    const sourceId = q.get("sourceId");
    const conferenceType = q.get("conferenceType");

    // If sourceId provided, pre-select conference
    if (sourceId) {
      const found = allConferences.find((c) => c.value === sourceId);
      if (found) {
        setSelectedConferenceOption(found);
      }
    }

    // If you have a token path similar to earlier -> verify token
    if (sourceToken) {
      const verify = async () => {
        setIsLoading(true);
        try {
          const resp = await axios.get(
            `${API_BASE_URL}/api/source/verify-token`,
            { params: { token: sourceToken } }
          );
          if (resp.data && resp.data.isValid) {
            // transform pricing plans similar to existing logic
            const rawPricingPlans = resp.data.pricingPlans || [];
            const transformedPricingPlans = {};
            const transformedAddOns = {};
            rawPricingPlans.forEach((plan) => {
              const singlePrice = plan.basePrice;
              transformedPricingPlans[plan.name] = {
                price: singlePrice,
                features: plan.features || getPlaceholderFeatures(plan.name),
              };
              if (plan.addOns && Array.isArray(plan.addOns)) {
                plan.addOns.forEach((addOn) => {
                  transformedAddOns[addOn.name] = {
                    price: addOn.price,
                    features: getPlaceholderFeatures(addOn.name),
                  };
                });
              }
            });
            if (Object.keys(transformedAddOns).length > 0) {
              transformedPricingPlans["Add-Ons"] = transformedAddOns;
            }
            setConferenceDetails({
              name: resp.data.conferenceName,
              type: resp.data.conferenceType,
              pricingPlans: transformedPricingPlans,
              sourceId: resp.data.sourceId,
              date: resp.data.date,
              year: resp.data.year,
            });

            const preselected = allConferences.find(
              (o) => o.value === resp.data.sourceId
            );
            setSelectedConferenceOption(preselected || null);
            setError(null);
          } else {
            setError(
              "Invalid or expired registration token. Please select a conference."
            );
            setConferenceDetails(null);
          }
        } catch (err) {
          setError(err.response?.data?.message || "Failed to verify token.");
          setConferenceDetails(null);
        } finally {
          setIsLoading(false);
        }
      };
      verify();
    } else {
      // no token — ask user to pick a conference
      setIsLoading(false);
    }
  }, [location.search, allConferences]);

  const registrationCategories = useMemo(() => {
    if (!conferenceDetails?.pricingPlans) return [];
    return Object.keys(conferenceDetails.pricingPlans).filter(
      (k) => k !== "Add-Ons"
    );
  }, [conferenceDetails]);

  const addOnCategories = useMemo(() => {
    if (!conferenceDetails?.pricingPlans?.["Add-Ons"]) return [];
    return Object.keys(conferenceDetails.pricingPlans["Add-Ons"]);
  }, [conferenceDetails]);

  // recalc total
  useEffect(() => {
    if (!conferenceDetails?.pricingPlans) {
      setTotalAmount(0);
      return;
    }
    let sum = 0;
    const main = conferenceDetails.pricingPlans;
    const addOn = conferenceDetails.pricingPlans["Add-Ons"] || {};
    for (const cat in selectedItems) {
      const qty = selectedItems[cat].quantity || 0;
      let price = main[cat]?.price ?? addOn[cat]?.price;
      price = Number(price) || 0;
      sum += price * qty;
    }
    setTotalAmount(sum);
  }, [selectedItems, conferenceDetails]);

  // quantity change: disabled until after Submit Application (isSubmitted)
  const handleQuantityChange = (category, change) => {
    if (!isSubmitted) {
      setModalTitle("Submit Application First");
      setModalMessage(
        "Please complete and submit your application details first. Only then you can select package quantities."
      );
      setModalActions([
        {
          label: "Okay",
          onClick: () => setModalOpen(false),
          variant: "primary",
        },
      ]);
      setModalOpen(true);
      return;
    }

    setSelectedItems((prev) => {
      const current = prev[category] || { quantity: 0 };
      const newQ = Math.max(0, (current.quantity || 0) + change);
      if (newQ === 0) {
        const copy = { ...prev };
        delete copy[category];
        return copy;
      }
      return { ...prev, [category]: { ...current, quantity: newQ } };
    });
  };

  // conference selection via React-Select (select a conference -> generate token and navigate to same page with token)
  const handleReactSelectChange = (selectedOption) => {
    setSelectedConferenceOption(selectedOption);
    setSelectedItems({});
    setTotalAmount(0);
    setConferenceDetails(null);
  };

  const handleProceedWithConference = async (confOption) => {
    if (!confOption) {
      setModalTitle("Please select a conference");
      setModalMessage(
        "Choose a conference from the dropdown to continue registration."
      );
      setModalActions([{ label: "OK", onClick: () => setModalOpen(false) }]);
      setModalOpen(true);
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
        // ✅ Save token + expiry (10 mins)
        const expiryTime = Date.now() + 10 * 60 * 1000;
        localStorage.setItem("sourceToken", response.data.token);
        localStorage.setItem("sourceTokenExpiry", expiryTime.toString());

        navigate(`/registration?sourceToken=${response.data.token}`);
      } else {
        setError("Failed to generate token. Please try again.");
      }
    } catch (err) {
      console.error("Error generating token:", err); // ✅ keep console logging for debugging
      setError(
        err.response?.data?.message ||
          "Failed to generate token. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Submit Application (validate form fields). Shows confirmation modal and enables Get Registered when success.
  const handleSubmitApplication = async (e) => {
    if (e) e.preventDefault();

    // minimal client-side validation (required fields)
    if (
      !participantFirstName ||
      !participantLastName ||
      !participantEmail ||
      !participantCountry ||
      !participantPhone
    ) {
      setModalTitle("Missing required details");
      setModalMessage(
        "Please complete all required fields: First Name, Last Name, Email, Country and Phone."
      );
      setModalActions([{ label: "OK", onClick: () => setModalOpen(false) }]);
      setModalOpen(true);
      return;
    }

    // build participantInfo
    const participantInfo = {
      salutation: participantSalutation,
      fullName: `${participantFirstName} ${participantLastName}`,
      email: participantEmail,
      country: participantCountry,
      phone: participantPhone,
      organization: participantOrganization,
      address: participantAddress,
    };

    // build selectedItems structure expected by backend
    const formattedItems = {};
    Object.keys(selectedItems).forEach((key) => {
      if (selectedItems[key]?.quantity > 0) {
        formattedItems[key] = { quantity: selectedItems[key].quantity };
      }
    });

    // final payload matching backend contract
    const registrationData = {
      conferenceId: conferenceDetails?.sourceId || "UNKNOWN",
      conferenceName: conferenceDetails?.name || "General Conference",
      selectedItems: formattedItems,
      totalAmount,
      participantInfo,
    };

    try {
      setIsLoading(true);
      await axios.post(
        `${API_BASE_URL}/api/send-registration-email`,
        registrationData
      );

      // ✅ Always show the same success message once request completes successfully
    //   setIsSubmitted(true);
      // Clear the form fields
  setParticipantSalutation("");
  setParticipantFirstName("");
  setParticipantLastName("");
  setParticipantEmail("");
  setParticipantCountry("");
  setParticipantPhone("");
  setParticipantOrganization("");
  setParticipantAddress("");

      setModalTitle("Application Submitted");
      setModalMessage(
        "Your application has been successfully submitted. Please note that we are in the process of updating our payment system. A representative will contact you directly within 24 to 48 hours to complete your registration."
      );
      setModalActions([
        {
          label: "Continue",
          onClick: () => setModalOpen(false),
          variant: "primary",
        },
      ]);
      setModalOpen(true);
    } catch (err) {
      setModalTitle("Submission error");
      setModalMessage(
        err.response?.data?.message ||
          "Failed to submit application. Please try again later."
      );
      setModalActions([{ label: "Close", onClick: () => setModalOpen(false) }]);
      setModalOpen(true);
    } finally {
      setIsLoading(false);
    }
  };

  // Get Registered: triggers payment initiation (Stripe). Requires isSubmitted true
  const handleGetRegistered = async () => {
    if (!isSubmitted) {
      setModalTitle("Submit Application First");
      setModalMessage(
        "Please submit your application first. After submission you'll be able to register and pay."
      );
      setModalActions([{ label: "OK", onClick: () => setModalOpen(false) }]);
      setModalOpen(true);
      return;
    }

    // Ensure something is selected
    if (Object.keys(selectedItems).length === 0 || totalAmount <= 0) {
      setModalTitle("No Packages Selected");
      setModalMessage(
        "Please select at least one package or add-on and set quantities before proceeding to payment."
      );
      setModalActions([{ label: "OK", onClick: () => setModalOpen(false) }]);
      setModalOpen(true);
      return;
    }

    // Build order details as before
    const orderDetails = Object.entries(selectedItems)
      .map(([name, { quantity }]) => {
        const price =
          conferenceDetails.pricingPlans?.[name]?.price ??
          conferenceDetails.pricingPlans?.["Add-Ons"]?.[name]?.price;
        return { name, price: Number(price) || 0, quantity };
      })
      .filter(Boolean);

    setIsProcessingPayment(true);
    try {
      const token = localStorage.getItem("sourceToken");
      const response = await axios.post(
        `${API_BASE_URL}/api/payment/initiate`,
        { orderDetails },
        { headers: { "x-access-token": token || "" } }
      );
      // expected response.data to have checkoutUrl or sessionId (depends on backend)
      if (response.data.checkoutUrl) {
        window.location.href = response.data.checkoutUrl;
      } else if (response.data.sessionId) {
        // if you want to use stripe.js on client:
        // const stripe = await loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);
        // await stripe.redirectToCheckout({ sessionId: response.data.sessionId });
        // But to keep this self-contained, redirect if backend returns url
        setModalTitle("Redirecting to Payment");
        setModalMessage("You are being redirected to the secure payment page.");
        setModalActions([]);
        setModalOpen(true);
      } else {
        setModalTitle("Payment initiation failed");
        setModalMessage(
          "Could not start payment. Please try again or contact support."
        );
        setModalActions([{ label: "OK", onClick: () => setModalOpen(false) }]);
        setModalOpen(true);
      }
    } catch (err) {
      setModalTitle("Payment error");
      setModalMessage(
        err.response?.data?.message ||
          "Failed to initiate payment. Please try again."
      );
      setModalActions([{ label: "Close", onClick: () => setModalOpen(false) }]);
      setModalOpen(true);
    } finally {
      setIsProcessingPayment(false);
    }
  };

  // UI while loading
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center font-sans bg-slate-50 text-slate-800">
        <div className="w-full max-w-xl p-6 bg-white rounded-2xl shadow-lg border border-slate-200 text-center">
          <DotLottieReact
            src="https://lottie.host/4e9e5c30-2446-4e4f-901a-5db0804727f6/j8hlykUr3q.lottie"
            loop
            autoplay
            className="w-48 h-48 mx-auto"
            style={{ aspectRatio: "1" }}
          />
          <p className="mt-4 text-lg font-semibold">
            Submitting your Application...
          </p>
        </div>
      </div>
    );
  }

  // error / no conference details state (conserve your earlier flow)
  if (error || !conferenceDetails) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center font-sans bg-slate-50 text-slate-800 p-6">
        {error && (
          <div className="w-full max-w-xl mb-8 px-4">
            <p className="text-lg text-red-600 font-medium bg-red-50 p-4 rounded-xl shadow border border-red-100">
              {error}
            </p>
          </div>
        )}

        <div className="w-full max-w-7xl mx-auto flex flex-col md:flex-row items-center md:items-stretch justify-center gap-8 mb-12 px-4">
          <SEO
            title="Register for Helix Conferences | Secure Your Place at Global Scientific, Medical & Industry Events"
            description="Join the forefront of innovation with Helix Conferences. Register now for high-impact scientific, medical, and technological conferences, hybrid summits, webinars, and workshops."
            keywords="conference registration, Helix Conferences"
            url="https://helixconferences.com/register"
          />

          <div className="w-full md:w-1/2 bg-white p-7 md:p-9 rounded-2xl shadow-2xl text-center border border-slate-200 flex flex-col justify-between">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6 leading-tight">
              Select a Conference
            </h2>
            <p className="text-base text-slate-600 mb-6">
              Choose an event to proceed with your registration.
            </p>

            <Select
              value={selectedConferenceOption}
              onChange={handleReactSelectChange}
              options={allConferences}
              placeholder="Type to search or select a conference..."
              isClearable
              isSearchable
              className="mb-6 text-slate-800 text-base"
              classNamePrefix="react-select"
              styles={{
                control: (base) => ({
                  ...base,
                  backgroundColor: "#f8fafc",
                  borderColor: "#e2e8f0",
                  boxShadow: "0 1px 2px rgba(0,0,0,0.03)",
                  minHeight: "48px",
                }),
                option: (base, state) => ({
                  ...base,
                  backgroundColor: state.isFocused ? "#f5f3ff" : "white",
                  color: "#0f172a",
                  padding: "12px 20px",
                  fontSize: "1rem",
                }),
                singleValue: (base) => ({
                  ...base,
                  color: "#0f172a",
                  fontSize: "1rem",
                }),
                menu: (base) => ({
                  ...base,
                  backgroundColor: "white",
                  borderRadius: "0.75rem",
                  boxShadow: "0 10px 15px -3px rgba(0,0,0,0.08)",
                }),
              }}
            />


            <div className="flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-3">
              <button
                type="button"
                onClick={() =>
                  handleProceedWithConference(selectedConferenceOption)
                }
                className="w-full sm:w-auto bg-amber-600 text-white px-6 py-3 rounded-xl text-base font-semibold hover:bg-amber-700 transition duration-300 transform hover:scale-105 shadow-md focus:outline-none focus:ring-2 focus:ring-amber-500"
              >
                Proceed to Registration
              </button>

              <button
                type="button"
                onClick={() => navigate("/")}
                className="w-full sm:w-auto bg-slate-700 text-white px-6 py-3 rounded-xl text-base font-semibold hover:bg-slate-800 transition duration-300 transform hover:scale-105 shadow-md"
              >
                Go to Home
              </button>
            </div>
          </div>
        </div>

        {/* upcoming events list — simplified */}
        <div className="w-full max-w-7xl mx-auto px-6 sm:px-8 py-8 md:py-10 bg-white rounded-2xl shadow-xl border border-slate-200">
          <h3 className="text-3xl md:text-4xl font-extrabold text-center mb-10 text-slate-800">
            Upcoming Events
          </h3>
          <p className="text-lg text-center text-slate-600 mb-8 max-w-xl mx-auto">
            Click on a conference below to proceed with registration.
          </p>

          <div className="flex flex-col lg:flex-row gap-8 lg:gap-10">
            <div className="w-full lg:w-1/2 flex flex-col">
              <h4 className="text-2xl font-bold text-slate-800 mb-6 text-center">
                Hybrids
              </h4>
              {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {allConferenceLists.hybridConfsAll.map((conf) => (
                  <div
                    key={conf.code}
                    className="flex flex-col justify-between bg-slate-50 rounded-xl shadow-md border border-slate-200 p-5 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                  >
                    <div className="w-12 h-12 flex items-center justify-center rounded-full bg-amber-100 text-amber-700 mb-3">
                      <Mic2 className="h-6 w-6" />
                    </div>
                    <div className="flex flex-col items-center text-center flex-1 overflow-hidden">
                      <h5 className="font-extrabold text-lg text-slate-900 mb-1 leading-tight line-clamp-2">
                        {conf.title}
                      </h5>
                      {conf.date && (
                        <p className="text-lg font-bold text-slate-600 mb-2">
                          {conf.date}
                        </p>
                      )}
                    </div>
                    <div className="flex gap-3 justify-center mt-2">
                      <button
                        onClick={() =>
                          handleProceedWithConference(
                            allConferences.find((o) => o.value === conf.code)
                          )
                        }
                        className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-semibold uppercase tracking-wide bg-amber-600 text-white"
                      >
                        <Pencil className="w-4 h-4" /> Register
                      </button>
                      {conf.link && (
                        <a
                          href={conf.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-semibold uppercase tracking-wide bg-slate-200 text-slate-800"
                        >
                          <ExternalLink className="w-4 h-4" /> Visit
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div> */}
            </div>

            <div className="w-full lg:w-1/2 flex flex-col">
              <h4 className="text-2xl font-bold text-slate-800 mb-6 text-center">
                Webinars
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {allConferenceLists.webinarConfsAll.map((conf) => (
                  <div
                    key={conf.code}
                    className="flex flex-col justify-between bg-slate-50 rounded-xl shadow-md border border-slate-200 p-5 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                  >
                    <div className="w-12 h-12 flex items-center justify-center rounded-full bg-amber-100 text-amber-700 mb-3">
                      <Webcam className="h-6 w-6" />
                    </div>
                    <div className="flex flex-col items-center text-center flex-1 overflow-hidden">
                      <h5 className="font-extrabold text-lg text-slate-900 mb-1 leading-tight line-clamp-2">
                        {conf.title}
                      </h5>
                      {conf.date && (
                        <p className="text-lg font-bold text-slate-600 mb-2">
                          {conf.date}
                        </p>
                      )}
                    </div>
                    <div className="flex gap-3 justify-center mt-2">
                      <button
                        onClick={() =>
                          handleProceedWithConference(
                            allConferences.find((w) => w.value === conf.code)
                          )
                          
                        }
                        className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-semibold uppercase tracking-wide bg-amber-600 text-white"
                      >
                        <Pencil className="w-4 h-4" /> Register
                      </button>
                      {conf.link && (
                        <a
                          href={conf.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-semibold uppercase tracking-wide bg-slate-200 text-slate-800"
                        >
                          <ExternalLink className="w-4 h-4" /> Visit
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

  // Main page when conferenceDetails exists
  return (
    <div className="min-h-screen bg-slate-50 py-8 md:py-12 font-sans text-slate-800 text-base">
      <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
        <h1 className="text-xl py-6 md:text-4xl lg:text-3xl font-extrabold text-center mb-4 leading-tight text-slate-900">
          Secure Your Slot for{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-br from-amber-600 to-amber-400">
            {conferenceDetails.name}
          </span>
        </h1>
        {conferenceDetails.date && (
          <p className="text-lg md:text-xl font-semibold text-center text-slate-700 mb-6">
            {conferenceDetails.date}
          </p>
        )}

        <form
          onSubmit={handleSubmitApplication}
          className="space-y-8 md:space-y-10"
        >
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-md border border-slate-200">
            <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-6 text-center">
              Your Contact Information
            </h2>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                {/* Salutation + First Name combined */}
                <div>
                  <label
                    htmlFor="firstName"
                    className="block text-base font-medium text-slate-700 mb-2"
                  >
                    Salutation & First Name{" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <div className="flex">
                    <select
                      id="salutation"
                      value={participantSalutation}
                      onChange={(e) => setParticipantSalutation(e.target.value)}
                      className="block w-24 px-2 py-2.5 border border-slate-300 rounded-l-lg shadow-sm focus:ring-amber-500 focus:border-amber-500 text-base bg-white"
                    >
                      <option value="">--</option>
                      <option value="Mr">Mr.</option>
                      <option value="Mrs">Mrs.</option>
                      <option value="Miss">Miss</option>
                      <option value="Ms">Ms.</option>
                      <option value="Dr">Dr.</option>
                      <option value="Prof">Prof.</option>
                    </select>

                    <input
                      id="firstName"
                      type="text"
                      required
                      value={participantFirstName}
                      onChange={(e) => setParticipantFirstName(e.target.value)}
                      placeholder="First Name"
                      className="flex-1 block px-4 py-2.5 border border-l-0 border-slate-300 rounded-r-lg shadow-sm focus:ring-amber-500 focus:border-amber-500 text-base"
                    />
                  </div>
                </div>

                {/* Last Name unchanged */}
                <div>
                  <label
                    htmlFor="lastName"
                    className="block text-base font-medium text-slate-700 mb-2"
                  >
                    Last Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="lastName"
                    type="text"
                    required
                    value={participantLastName}
                    onChange={(e) => setParticipantLastName(e.target.value)}
                    className="mt-1 block w-full px-4 py-2.5 border border-slate-300 rounded-lg shadow-sm focus:ring-amber-500 focus:border-amber-500 text-base"
                  />
                </div>
              </div>

              <div className="md:col-span-2">
                <label
                  htmlFor="address"
                  className="block text-base font-medium text-slate-700 mb-2"
                >
                  Address
                </label>
                <textarea
                  id="address"
                  rows="3"
                  value={participantAddress}
                  onChange={(e) => setParticipantAddress(e.target.value)}
                  className="mt-1 block w-full px-4 py-2.5 border border-slate-300 rounded-lg shadow-sm focus:ring-amber-500 focus:border-amber-500 text-base"
                />
              </div>

              <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="organization"
                    className="block text-base font-medium text-slate-700 mb-2"
                  >
                    Organization / University
                  </label>
                  <input
                    id="organization"
                    type="text"
                    value={participantOrganization}
                    onChange={(e) => setParticipantOrganization(e.target.value)}
                    className="mt-1 block w-full px-4 py-2.5 border border-slate-300 rounded-lg shadow-sm focus:ring-amber-500 focus:border-amber-500 text-base"
                  />
                </div>

                <div>
                  <label
                    htmlFor="country"
                    className="block text-base font-medium text-slate-700 mb-2"
                  >
                    Country <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="country"
                    type="text"
                    required
                    value={participantCountry}
                    onChange={(e) => setParticipantCountry(e.target.value)}
                    className="mt-1 block w-full px-4 py-2.5 border border-slate-300 rounded-lg shadow-sm focus:ring-amber-500 focus:border-amber-500 text-base"
                  />
                </div>
              </div>

              <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-base font-medium text-slate-700 mb-2"
                  >
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="phone"
                    type="text"
                    required
                    value={participantPhone}
                    onChange={(e) => setParticipantPhone(e.target.value)}
                    className="mt-1 block w-full px-4 py-2.5 border border-slate-300 rounded-lg shadow-sm focus:ring-amber-500 focus:border-amber-500 text-base"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-base font-medium text-slate-700 mb-2"
                  >
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={participantEmail}
                    onChange={(e) => setParticipantEmail(e.target.value)}
                    className="mt-1 block w-full px-4 py-2.5 border border-slate-300 rounded-lg shadow-sm focus:ring-amber-500 focus:border-amber-500 text-base"
                  />
                </div>
              </div>
            </div>

            {/* Two-button flow: Submit Application -> Arrow -> Get Registered */}
            <div className="mt-6 flex items-center justify-center gap-4">
              <button
                type="submit"
                onClick={handleSubmitApplication}
                className="inline-flex items-center gap-3 bg-amber-600 text-white px-6 py-3 rounded-xl text-base font-semibold hover:bg-amber-700 transition transform hover:scale-105 shadow-md"
              >
                Submit Application
              </button>

              <div className="text-slate-400">
                <ArrowRightCircle className="w-8 h-8" />
              </div>

              <button
                type="button"
                onClick={handleGetRegistered}
                disabled={!isSubmitted || isProcessingPayment}
                className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl text-base font-semibold transition transform hover:scale-105 shadow-md ${
                  isSubmitted
                    ? "bg-amber-600 text-white hover:bg-amber-700"
                    : "bg-slate-100 text-slate-400 cursor-not-allowed"
                }`}
              >
                {isProcessingPayment ? "Processing..." : "Get Registered"}
              </button>
            </div>
          </div>

          {/* Packages grid */}
          {registrationCategories.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 items-start">
              {registrationCategories.map((category) => {
                const priceInfo = conferenceDetails.pricingPlans[category];
                if (!priceInfo) return null;
                const price = Number(priceInfo.price) || 0;
                const qty = selectedItems[category]?.quantity || 0;
                const isSelected = qty > 0;
                const colors = getCardColors(category, isSelected);

                return (
                  <div
                    key={category}
                    className={`relative ${colors.cardBg} ${colors.cardShadow} ${colors.cardBorder} rounded-2xl flex flex-col transition-all duration-300 hover:shadow-lg hover:-translate-y-1`}
                  >
                    <div
                      className={`absolute -top-6 left-1/2 transform -translate-x-1/2 ${colors.iconBg} ${colors.iconText} w-16 h-16 flex items-center justify-center rounded-full shadow-lg z-20`}
                    >
                      {/* Icon from helper */}
                      {getCategoryIcon(category)}
                    </div>

                    <div
                      className={`relative ${colors.overlayBg} rounded-t-2xl pt-10 pb-4 text-center z-10`}
                    >
                      <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mt-6 flex items-center justify-center gap-2">
                        <Tag className="w-5 h-5 text-slate-600" /> {category}
                      </h3>
                    </div>

                    <div className="flex flex-col flex-grow p-4 pt-0 text-center">
                      <p className="text-4xl font-extrabold text-slate-900 mb-4">
                        ${price.toFixed(2)}
                      </p>

                      <ul className="text-base text-slate-700 space-y-2 mb-6 md:mb-8 text-left mx-auto max-w-xs w-full">
                        {priceInfo.features?.map((f, i) => (
                          <li key={i} className="flex items-start">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5 text-amber-600 mr-2 flex-shrink-0 mt-0.5"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                clipRule="evenodd"
                              />
                            </svg>
                            {f}
                          </li>
                        ))}
                      </ul>

                      <div className="flex items-center justify-center space-x-3 mt-auto">
                        <button
                          type="button"
                          onClick={() => handleQuantityChange(category, -1)}
                          disabled={!isSubmitted}
                          aria-label={`Decrease quantity for ${category}`}
                          className={`w-10 h-10 flex items-center justify-center rounded-full ${
                            colors.buttonBg
                          } text-white text-xl font-bold transition-all duration-200 ${
                            colors.buttonHover
                          } ${
                            !isSubmitted ? "opacity-40 cursor-not-allowed" : ""
                          }`}
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

                        <span className="text-2xl font-semibold text-slate-900 w-10 text-center">
                          {qty}
                        </span>

                        <button
                          type="button"
                          onClick={() => handleQuantityChange(category, 1)}
                          disabled={!isSubmitted}
                          aria-label={`Increase quantity for ${category}`}
                          className={`w-10 h-10 flex items-center justify-center rounded-full ${
                            colors.buttonBg
                          } text-white text-xl font-bold transition-all duration-200 ${
                            colors.buttonHover
                          } ${
                            !isSubmitted ? "opacity-40 cursor-not-allowed" : ""
                          }`}
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

          {/* Add-ons */}
          {addOnCategories.length > 0 && (
            <>
              <hr className="my-8 border-t border-slate-200" />
              <h2 className="text-2xl md:text-3xl font-extrabold text-center text-slate-800 mt-6 mb-6">
                Enhance Your Experience{" "}
                <span className="text-slate-500">(Add-Ons)</span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 items-start">
                {addOnCategories.map((category) => {
                  const priceInfo =
                    conferenceDetails.pricingPlans["Add-Ons"][category];
                  if (!priceInfo) return null;
                  const price = Number(priceInfo.price) || 0;
                  const qty = selectedItems[category]?.quantity || 0;
                  const isSelected = qty > 0;
                  const colors = getCardColors(category, isSelected);

                  return (
                    <div
                      key={category}
                      className={`relative ${colors.cardBg} ${colors.cardShadow} ${colors.cardBorder} rounded-2xl flex flex-col transition-all duration-300 hover:shadow-lg hover:-translate-y-1`}
                    >
                      <div
                        className={`absolute -top-6 left-1/2 transform -translate-x-1/2 ${colors.iconBg} ${colors.iconText} w-16 h-16 flex items-center justify-center rounded-full shadow-lg z-20`}
                      >
                        {getCategoryIcon(category)}
                      </div>

                      <div
                        className={`relative ${colors.overlayBg} rounded-t-2xl pt-10 pb-4 text-center z-10`}
                      >
                        <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mt-6 flex items-center justify-center gap-2">
                          <Box className="w-5 h-5 text-slate-600" /> {category}
                        </h3>
                      </div>

                      <div className="flex flex-col flex-grow p-4 pt-0 text-center">
                        <p className="text-4xl font-extrabold text-slate-900 mb-4">
                          ${price.toFixed(2)}
                        </p>
                        <ul className="text-base text-slate-700 space-y-2 mb-6 md:mb-8 text-left mx-auto max-w-xs w-full">
                          {priceInfo.features?.map((f, i) => (
                            <li key={i} className="flex items-start">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5 text-amber-600 mr-2 flex-shrink-0 mt-0.5"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                  clipRule="evenodd"
                                />
                              </svg>
                              {f}
                            </li>
                          ))}
                        </ul>

                        <div className="flex items-center justify-center space-x-3 mt-auto">
                          <button
                            type="button"
                            onClick={() => handleQuantityChange(category, -1)}
                            disabled={!isSubmitted}
                            aria-label={`Decrease quantity for ${category}`}
                            className={`w-10 h-10 flex items-center justify-center rounded-full ${
                              colors.buttonBg
                            } text-white text-xl font-bold transition-all duration-200 ${
                              colors.buttonHover
                            } ${
                              !isSubmitted
                                ? "opacity-40 cursor-not-allowed"
                                : ""
                            }`}
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
                          <span className="text-2xl font-semibold text-slate-900 w-10 text-center">
                            {qty}
                          </span>
                          <button
                            type="button"
                            onClick={() => handleQuantityChange(category, 1)}
                            disabled={!isSubmitted}
                            aria-label={`Increase quantity for ${category}`}
                            className={`w-10 h-10 flex items-center justify-center rounded-full ${
                              colors.buttonBg
                            } text-white text-xl font-bold transition-all duration-200 ${
                              colors.buttonHover
                            } ${
                              !isSubmitted
                                ? "opacity-40 cursor-not-allowed"
                                : ""
                            }`}
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

          {/* Total Amount / Payment area */}
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg border border-slate-200 flex flex-col items-center justify-center text-center">
            <p className="text-lg md:text-xl font-semibold mb-3 text-slate-700">
              Selected Package Total
            </p>
            <p className="text-4xl md:text-5xl font-extrabold mb-4 text-slate-900">
              ${totalAmount.toFixed(2)}
            </p>

            {/* If you want an explicit 'Proceed to Payment' button separate from Get Registered (we used Get Registered above).
                Keep this button for extra UX to submit & go payment — here it calls handleGetRegistered too */}
            <div className="w-full max-w-sm">
              <button
                onClick={handleGetRegistered}
                disabled={!isSubmitted || isProcessingPayment}
                className={`w-full px-7 py-3.5 rounded-xl text-lg font-bold transition transform hover:scale-105 shadow-md ${
                  isSubmitted
                    ? "bg-amber-600 text-white hover:bg-amber-700"
                    : "bg-slate-100 text-slate-400 cursor-not-allowed"
                }`}
              >
                {isProcessingPayment
                  ? "Processing..."
                  : "Pay & Complete Registration"}
              </button>
            </div>
          </div>
        </form>
      </div>

      <Modal
        open={modalOpen}
        title={modalTitle}
        message={modalMessage}
        onClose={() => setModalOpen(false)}
        actions={modalActions}
      />
    </div>
  );
};

export default RegistrationPageUpdated;
