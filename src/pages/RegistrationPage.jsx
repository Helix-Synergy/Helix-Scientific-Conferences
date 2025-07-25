// // src/pages/RegistrationPage.jsx
// import React, { useState, useEffect, useMemo } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import Select from 'react-select';
// import { DotLottieReact } from '@lottiefiles/dotlottie-react';

// // Import your conference data
// import webinarsData from '../data/webinarsData1';
// import hybridsData from '../data/hybridsData1';

// // Define your backend URL from environment variables or direct string
// const API_BASE_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000';

// // Icons for pricing categories (you might want to put these in a separate component or utility file)
// const getCategoryIcon = (category) => {
//     switch (category) {
//         case "e-Poster": return (
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                 <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
//                 <path d="M14 2v6h6"></path>
//                 <line x1="16" y1="13" x2="8" y2="13"></line>
//                 <line x1="16" y1="17" x2="8" y2="17"></line>
//                 <line x1="10" y1="9" x2="8" y2="9"></line>
//             </svg>
//         );
//         case "Video Presentation": return (
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                 <rect x="2" y="3" width="20" height="18" rx="2" ry="2"></rect>
//                 <line x1="17" y1="10" x2="22" y2="10"></line>
//                 <line x1="17" y1="14" x2="22" y2="14"></line>
//                 <line x1="2" y1="10" x2="7" y2="10"></line>
//                 <line x1="2" y1="14" x2="7" y2="14"></line>
//                 <line x1="12" y1="2" x2="12" y2="22"></line>
//             </svg>
//         );
//         case "Virtual Presentation": return (
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                 <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
//                 <line x1="8" y1="21" x2="16" y2="21"></line>
//                 <line x1="12" y1="17" x2="12" y2="21"></line>
//             </svg>
//         );
//         case "Oral Presentation": return (
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                 <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
//                 <path d="M14 2v6h6"></path>
//                 <path d="M10 13l2 2l4-4"></path>
//             </svg>
//         );
//         case "Delegate": return (
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                 <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
//                 <circle cx="9" cy="7" r="4"></circle>
//                 <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
//                 <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
//             </svg>
//         );
//         case "Suit - A (OP + 2N stay)":
//         case "Suit - B (OP + 3N stay)":
//         case "Accompanying Person":
//         case "Extra N-Stay":
//             return (
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                     <path d="M2 19V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2z"></path>
//                     <path d="M14.5 9.5a2.5 2.5 0 0 0-5 0v5a2.5 2.5 0 0 0 5 0"></path>
//                 </svg>
//             );
//         case "Article Publication": return (
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                 <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20V5c0-1.1-.9-2-2-2H6.5A2.5 2.5 0 0 0 4 5.5v14z"></path>
//             </svg>
//         );
//         case "Exhibitor": return (
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                 <path d="M18 8h1a4 4 0 0 1 0 8h-1"></path>
//                 <path d="M2 8h16v9a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8z"></path>
//                 <line x1="6" y1="1" x2="6" y2="4"></line>
//                 <line x1="10" y1="1" x2="10" y2="4"></line>
//                 <line x1="14" y1="1" x2="14" y2="4"></line>
//             </svg>
//         );
//         case "Standard Pass": return (
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                 <circle cx="12" cy="12" r="10"></circle>
//                 <polyline points="12 6 12 12 16 14"></polyline>
//             </svg>
//         );
//         case "VIP Pass": return (
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                 <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
//             </svg>
//         );
//         default: return (
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                 <circle cx="12" cy="12" r="10"></circle>
//                 <line x1="12" y1="16" x2="12" y2="12"></line>
//                 <line x1="12" y1="8" x2="12.01" y2="8"></line>
//             </svg>
//         );
//     }
// };

// const RegistrationPage = () => {
//     const location = useLocation();
//     const navigate = useNavigate();

//     const [isLoading, setIsLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [conferenceDetails, setConferenceDetails] = useState(null);

//     const [selectedItems, setSelectedItems] = useState({});
//     const [participantType, setParticipantType] = useState('academic'); // Global participant type toggle
//     const [totalAmount, setTotalAmount] = useState(0);

//     const [selectedConferenceOption, setSelectedConferenceOption] = useState(null);

//     // State for participant info (always visible now)
//     const [participantFullName, setParticipantFullName] = useState('');
//     const [participantEmail, setParticipantEmail] = useState('');
//     const [participantCountry, setParticipantCountry] = useState('');
//     const [participantPhone, setParticipantPhone] = useState('');
//     const [participantOrganization, setParticipantOrganization] = useState('');

//     // Filter conferences for 2025 specifically for the display lists
//     const conferences2025 = useMemo(() => {
//         const currentYear = 2025; // As per explicit request
//         const hybridConfs2025 = hybridsData.filter(conf => conf.year === currentYear); // Assuming a 'year' property in your data
//         const webinarConfs2025 = webinarsData.filter(conf => conf.year === currentYear); // Assuming a 'year' property in your data
//         return { hybridConfs2025, webinarConfs2025 };
//     }, []); // Removed `hybridsData`, `webinarsData` from dependency array as they are imported constants.

//     // Combine all conferences for the dropdown and the upcoming events list
//     const allConferences = useMemo(() => {
//         const webinarConfs = webinarsData.map(conf => ({
//             id: conf.code,
//             name: conf.title,
//             type: conf.type.toLowerCase(),
//             description: conf.description || "Explore groundbreaking research and connect with leading experts in this dynamic event.",
//             year: conf.year // Ensure 'year' is passed to originalConf
//         }));

//         const hybridConfs = hybridsData.map(conf => ({
//             id: conf.code,
//             name: conf.title,
//             type: 'hybrid',
//             description: conf.description || "Discover the latest innovations and network with professionals in this unique hybrid conference.",
//             year: conf.year // Ensure 'year' is passed to originalConf
//         }));

//         return [...webinarConfs, ...hybridConfs].map(conf => ({
//             value: conf.id,
//             label: `${conf.name} (${conf.type.charAt(0).toUpperCase() + conf.type.slice(1)})`,
//             originalConf: conf
//         }));
//     }, []); // Removed `webinarsData`, `hybridsData` from dependency array as they are imported constants.

//     // Helper to provide placeholder features (should come from backend)
//     const getPlaceholderFeatures = (category) => {
//         switch (category) {
//             case "e-Poster": return ["Digital E-Poster Display", "Abstract in Conference Proceedings", "Certificate of Presentation"];
//             case "Poster Presentation": return ["Physical Poster Display", "Abstract in Conference Proceedings", "Certificate of Presentation", "Networking Lunches"];
//             case "Video Presentation": return ["10-15 Min Video Slot", "Online Access for 30 days", "Q&A Session", "Digital Certificate"];
//             case "Virtual Presentation": return ["Live Online Presentation Slot", "Interactive Q&A", "Virtual Networking Lounge", "Digital Conference Kit"];
//             case "Oral Presentation": return ["20 Min Oral Slot", "Publication Opportunity", "Conference Kit", "Networking Access", "Priority Seating"];
//             case "Delegate": return ["Access to all sessions", "Conference Handbook", "Coffee Breaks & Lunches", "Networking Opportunities"];
//             case "Suit - A (OP + 2N stay)": return ["Oral Presentation Benefits", "2 Nights Accommodation", "Airport Transfers (optional)", "Exclusive Delegate Lounge Access"];
//             case "Suit - B (OP + 3N stay)": return ["Oral Presentation Benefits", "3 Nights Accommodation", "Airport Transfers (optional)", "Exclusive Delegate Lounge Access", "City Tour"];
//             case "Accompanying Person": return ["Access to social events", "Meals & Coffee Breaks", "City Tour (optional)"];
//             case "Extra N-Stay": return ["Additional Night(s) at Conference Hotel", "Breakfast Included"];
//             case "Article Publication": return ["Full Paper Publication in Journal", "Peer Review Process", "DOI Assignment"];
//             case "Exhibitor": return ["Dedicated Exhibition Booth", "Company Logo on Website", "Networking with Attendees", "Lead Generation Opportunities"];
//             case "Standard Pass": return ["Access to all main sessions", "Digital conference proceedings", "Networking events", "Coffee breaks & lunch"];
//             case "VIP Pass": return ["All Standard Pass features", "Exclusive VIP lounge access", "Priority seating", "Meet & Greet with keynote speakers", "Premium gift bag"];
//             default: return ["Conference Access", "Networking", "Certificate"];
//         }
//     };

//     useEffect(() => {
//         const queryParams = new URLSearchParams(location.search);
//         const sourceToken = queryParams.get('sourceToken');

//         if (sourceToken) {
//             const verifyToken = async () => {
//                 try {
//                     const response = await axios.get(`${API_BASE_URL}/api/source/verify-token`, {
//                         params: { token: sourceToken }
//                     });

//                     if (response.data.isValid) {
//                         const enhancedPricingPlans = { ...response.data.pricingPlans };
//                         for (const category in enhancedPricingPlans) {
//                             if (category !== "Add-Ons") {
//                                 enhancedPricingPlans[category] = {
//                                     ...enhancedPricingPlans[category],
//                                     features: getPlaceholderFeatures(category)
//                                 };
//                             }
//                         }
//                         if (enhancedPricingPlans["Add-Ons"]) {
//                             for (const addOnCategory in enhancedPricingPlans["Add-Ons"]) {
//                                 enhancedPricingPlans["Add-Ons"][addOnCategory] = {
//                                     ...enhancedPricingPlans["Add-Ons"][addOnCategory],
//                                     features: getPlaceholderFeatures(addOnCategory)
//                                 };
//                             }
//                         }
//                         setConferenceDetails({
//                             name: response.data.conferenceName,
//                             type: response.data.conferenceType,
//                             pricingPlans: enhancedPricingPlans,
//                             sourceId: response.data.sourceId
//                         });
//                         setError(null);
//                         const preselectedOption = allConferences.find(
//                             option => option.value === response.data.sourceId
//                         );
//                         setSelectedConferenceOption(preselectedOption || null);
//                     } else {
//                         setError('Invalid or expired registration token. Please select a conference.');
//                         setConferenceDetails(null);
//                         setSelectedConferenceOption(null);
//                     }
//                 } catch (err) {
//                     console.error('Error verifying token:', err);
//                     setError(err.response?.data?.message || 'Failed to verify token. Please select a conference.');
//                     setConferenceDetails(null);
//                     setSelectedConferenceOption(null);
//                 } finally {
//                     setIsLoading(false);
//                 }
//             };
//             verifyToken();
//         } else {
//             setError('Please select a conference to proceed with registration.');
//             setIsLoading(false);
//             setConferenceDetails(null);
//             setSelectedConferenceOption(null);
//         }
//     }, [location.search, allConferences]); // Added allConferences to dependency array

//     const registrationCategories = useMemo(() => {
//         if (!conferenceDetails?.pricingPlans) return [];
//         return Object.keys(conferenceDetails.pricingPlans).filter(key => key !== "Add-Ons");
//     }, [conferenceDetails]);

//     const addOnCategories = useMemo(() => {
//         if (!conferenceDetails?.pricingPlans?.["Add-Ons"]) return [];
//         return Object.keys(conferenceDetails.pricingPlans["Add-Ons"]);
//     }, [conferenceDetails]);

//     useEffect(() => {
//         if (!conferenceDetails?.pricingPlans) {
//             setTotalAmount(0);
//             return;
//         }

//         let currentTotal = 0;
//         const mainPricing = conferenceDetails.pricingPlans;
//         const addOnPricing = conferenceDetails.pricingPlans["Add-Ons"] || {};

//         for (const category in selectedItems) {
//             const item = selectedItems[category];
//             const quantity = item.quantity;
//             const type = item.type;

//             let price = 0;
//             if (mainPricing[category]) {
//                 price = mainPricing[category][type];
//             } else if (addOnPricing[category]) {
//                 price = addOnPricing[category][type];
//             }

//             if (price && quantity) {
//                 currentTotal += price * quantity;
//             }
//         }
//         setTotalAmount(currentTotal);
//     }, [selectedItems, conferenceDetails]);

//     const handleQuantityChange = (category, change) => {
//         setSelectedItems(prev => {
//             const currentItem = prev[category] || { quantity: 0, type: participantType };
//             const newQuantity = Math.max(0, currentItem.quantity + change);

//             if (newQuantity === 0) {
//                 const newState = { ...prev };
//                 delete newState[category];
//                 return newState;
//             }
//             return {
//                 ...prev,
//                 [category]: { ...currentItem, quantity: newQuantity }
//             };
//         });
//     };

//     const handleReactSelectChange = (selectedOption) => {
//         setSelectedConferenceOption(selectedOption);
//     };

//     // Consolidated function to proceed with a selected conference (from dropdown or list)
//     const handleProceedWithConference = async (confOption) => {
//         if (!confOption) {
//             alert('Please select a conference.');
//             return;
//         }

//         setIsLoading(true);
//         setError(null);

//         const selectedConf = confOption.originalConf;

//         try {
//             const response = await axios.post(`${API_BASE_URL}/api/source/get-source-token`, {
//                 sourceId: selectedConf.id,
//                 conferenceType: selectedConf.type
//             });

//             if (response.data.token) {
//                 navigate(`/registration?sourceToken=${response.data.token}`);
//             } else {
//                 setError('Failed to generate token. Please try again.');
//             }
//         } catch (err) {
//             console.error('Error generating token:', err);
//             setError(err.response?.data?.message || 'Failed to generate token. Please try again.');
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         if (!participantFullName || !participantEmail || !participantCountry) {
//             alert('Please fill in all required participant information.');
//             return;
//         }

//         if (totalAmount <= 0 && Object.keys(selectedItems).length === 0) {
//             alert('Please select at least one registration item.');
//             return;
//         }

//         const registrationData = {
//             conferenceId: conferenceDetails.sourceId,
//             conferenceName: conferenceDetails.name,
//             selectedItems: selectedItems,
//             totalAmount: totalAmount,
//             participantInfo: {
//                 fullName: participantFullName,
//                 email: participantEmail,
//                 country: participantCountry,
//                 phone: participantPhone,
//                 organization: participantOrganization
//             }
//         };

//         console.log('Sending registration details to backend:', registrationData);

//         try {
//             const response = await axios.post(`${API_BASE_URL}/api/send-registration-email`, registrationData);

//             if (response.status === 200) {
//                 alert('Registration submitted successfully! You will receive a confirmation email shortly.');
//                 // navigate('/thank-you'); // Uncomment if you have a thank you page
//             } else {
//                 alert('There was an issue submitting your registration. Please try again.');
//             }
//         } catch (error) {
//             console.error('Error submitting registration:', error);
//             alert(`Failed to submit registration: ${error.response?.data?.message || error.message}. Please try again.`);
//         }
//     };

//     if (isLoading) {
//         return (
//             <div className="min-h-screen flex items-center justify-center font-sans bg-gray-50 text-gray-800">
//                 <p className="text-lg md:text-xl">Loading conference details...</p>
//             </div>
//         );
//     }

//     if (error || !conferenceDetails) {
//         return (
//             <div className="min-h-screen flex flex-col items-center justify-center font-sans bg-gray-50 text-gray-800 p-6 pt-12">
//                 {error && (
//                     <div className="w-full max-w-xl text-center mb-8 px-4">
//                         <p className="text-lg text-red-600 font-medium bg-red-100 p-4 rounded-xl shadow-lg border border-red-200">
//                             {error}
//                         </p>
//                     </div>
//                 )}

//                 <div className="w-full max-w-7xl mx-auto flex flex-col md:flex-row items-center md:items-stretch justify-center gap-8 mb-12 px-4">
//                     <div className="w-full md:w-1/2 bg-white p-7 md:p-9 rounded-2xl shadow-2xl text-center border border-gray-200 flex flex-col justify-between">
//                         <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 leading-tight">
//                             Select a Conference
//                         </h2>
//                         <p className="text-base text-gray-600 mb-6">
//                             Choose an event to proceed with your registration.
//                         </p>
//                         <Select
//                             value={selectedConferenceOption}
//                             onChange={handleReactSelectChange}
//                             options={allConferences}
//                             placeholder="Type to search or select a conference..."
//                             isClearable
//                             isSearchable
//                             className="mb-6 text-gray-800 text-base"
//                             classNamePrefix="react-select"
//                             styles={{
//                                 control: (base) => ({
//                                     ...base,
//                                     backgroundColor: '#f9fafb',
//                                     borderColor: '#d1d5db',
//                                     boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
//                                     minHeight: '48px',
//                                     '&:hover': {
//                                         borderColor: '#9ca3af',
//                                     },
//                                 }),
//                                 option: (base, state) => ({
//                                     ...base,
//                                     backgroundColor: state.isFocused ? '#e0e7ff' : 'white',
//                                     color: '#1f2937',
//                                     padding: '12px 20px',
//                                     fontSize: '1rem'
//                                 }),
//                                 singleValue: (base) => ({
//                                     ...base,
//                                     color: '#1f2937',
//                                     fontSize: '1rem',
//                                 }),
//                                 menu: (base) => ({
//                                     ...base,
//                                     backgroundColor: 'white',
//                                     borderRadius: '0.75rem',
//                                     boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
//                                     marginTop: '8px',
//                                 }),
//                             }}
//                         />
//                         <div className="flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-3">
//                             <button
//                                 type="button"
//                                 onClick={() => handleProceedWithConference(selectedConferenceOption)}
//                                 className="w-full sm:w-auto bg-indigo-600 text-white px-6 py-3 rounded-xl text-base font-semibold
//                                     hover:bg-indigo-700 transition duration-300 transform hover:scale-105 shadow-md
//                                     focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
//                             >
//                                 Proceed to Registration
//                             </button>
//                             <button
//                                 type="button"
//                                 onClick={() => navigate('/')}
//                                 className="w-full sm:w-auto bg-gray-600 text-white px-6 py-3 rounded-xl text-base font-semibold
//                                     hover:bg-gray-700 transition duration-300 transform hover:scale-105 shadow-md
//                                     focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
//                             >
//                                 Go to Home
//                             </button>
//                         </div>
//                     </div>

//                     <div className="w-full md:w-1/2 flex items-center justify-center p-4 bg-gray-100 rounded-2xl shadow-inner border border-gray-200">
//                         <DotLottieReact
//                             src="https://lottie.host/4e9e5c30-2446-4e4f-901a-5db0804727f6/j8hlykUr3q.lottie"
//                             loop
//                             autoplay
//                             className="w-full h-full max-w-md object-contain"
//                             style={{ aspectRatio: '1.618/1' }}
//                         />
//                     </div>
//                 </div>

//                 <div className="w-full max-w-7xl mx-auto px-6 sm:px-8 py-8 md:py-10 bg-white rounded-2xl shadow-xl border border-gray-200">
//                     <h3 className="text-3xl md:text-4xl font-extrabold text-center mb-10 text-gray-800">
//                         Browse Our <span className="bg-gradient-to-r from-teal-500 to-green-600 bg-clip-text text-transparent">2025 Conference Series</span>
//                     </h3>
//                     <p className="text-lg text-center text-gray-600 mb-8 max-w-xl mx-auto">
//                         Click on a conference below to proceed with registration.
//                     </p>

//                     <div className="flex flex-col lg:flex-row gap-8 lg:gap-10">
//                         <div className="w-full lg:w-1/2 flex flex-col">
//                             <h4 className="text-2xl font-bold text-purple-800 mb-6 text-center lg:text-left">
//                                 Hybrid Conferences
//                             </h4>
//                             <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-grow">
//                                 {conferences2025.hybridConfs2025.map(conf => (
//                                     <div
//                                         key={conf.code}
//                                         onClick={() => handleProceedWithConference(allConferences.find(option => option.value === conf.code))}
//                                         className="flex flex-col items-center justify-center bg-purple-50 rounded-xl shadow-md border border-purple-200 p-5 cursor-pointer
//                                             hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
//                                     >
//                                         <div className="w-12 h-12 flex items-center justify-center rounded-full bg-purple-200 text-purple-700 mb-3">
//                                             <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                                                 <path d="M12 2L2 7l10 5 10-5-10-5z" />
//                                                 <path d="M2 17l10 5 10-5" />
//                                                 <path d="M2 12l10 5 10-5" />
//                                             </svg>
//                                         </div>
//                                         <h5 className="font-extrabold text-lg text-purple-900 mb-2 text-center leading-tight">
//                                             {conf.title}
//                                         </h5>
//                                         <div className="inline-flex items-center rounded-full px-3 py-1 text-sm font-semibold uppercase tracking-wide
//                                             bg-purple-100 text-purple-800">
//                                             {conf.type}
//                                         </div>
//                                     </div>
//                                 ))}
//                                 {conferences2025.hybridConfs2025.length === 0 && (
//                                     <p className="text-gray-500 text-center col-span-full text-base">No Hybrid Conferences for 2025 available yet.</p>
//                                 )}
//                             </div>
//                         </div>

//                         <div className="w-full lg:w-1/2 flex flex-col">
//                             <h4 className="text-2xl font-bold text-blue-800 mb-6 text-center lg:text-left">
//                                 Webinar Conferences
//                             </h4>
//                             <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-grow">
//                                 {conferences2025.webinarConfs2025.map(conf => (
//                                     <div
//                                         key={conf.code}
//                                         onClick={() => handleProceedWithConference(allConferences.find(option => option.value === conf.code))}
//                                         className="flex flex-col items-center justify-center bg-blue-50 rounded-xl shadow-md border border-blue-200 p-5 cursor-pointer
//                                             hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
//                                     >
//                                         <div className="w-12 h-12 flex items-center justify-center rounded-full bg-blue-200 text-blue-700 mb-3">
//                                             <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                                                 <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
//                                                 <line x1="8" y1="21" x2="16" y2="21"></line>
//                                                 <line x1="12" y1="17" x2="12" y2="21"></line>
//                                             </svg>
//                                         </div>
//                                         <h5 className="font-extrabold text-lg text-blue-900 mb-2 text-center leading-tight">
//                                             {conf.title}
//                                         </h5>
//                                         <div className="inline-flex items-center rounded-full px-3 py-1 text-sm font-semibold uppercase tracking-wide
//                                             bg-blue-100 text-blue-800">
//                                             {conf.type}
//                                         </div>
//                                     </div>
//                                 ))}
//                                 {conferences2025.webinarConfs2025.length === 0 && (
//                                     <p className="text-gray-500 text-center col-span-full text-base">No Webinar Conferences for 2025 available yet.</p>
//                                 )}
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         );
//     }

//     const getCardColors = (category, isSelected) => {
//         let iconBg = '';
//         let iconText = 'text-white'; // Icons themselves will be white for contrast
//         let overlayBg = ''; // Translucent top overlay
//         let buttonBg = '';
//         let buttonHover = '';
//         let borderAccent = '';
//         let shadow = 'shadow-md';
//         let overlayOpacity = isSelected ? 'bg-opacity-80' : 'bg-opacity-60';

//         switch (category) {
//             case "e-Poster":
//             case "Video Presentation":
//             case "Virtual Presentation":
//             case "Oral Presentation":
//             case "Delegate":
//                 // Primary categories - purple tones
//                 iconBg = 'bg-purple-600';
//                 overlayBg = 'bg-purple-100';
//                 buttonBg = 'bg-purple-600';
//                 buttonHover = 'hover:bg-purple-700';
//                 borderAccent = 'border-purple-600';
//                 break;
//             case "Article Publication":
//             case "Exhibitor":
//             case "Standard Pass":
//             case "VIP Pass":
//                 // Secondary categories / Add-ons - green tones
//                 iconBg = 'bg-green-600';
//                 overlayBg = 'bg-green-100';
//                 buttonBg = 'bg-green-600';
//                 buttonHover = 'hover:bg-green-700';
//                 borderAccent = 'border-green-600';
//                 break;
//             case "Suit - A (OP + 2N stay)":
//             case "Suit - B (OP + 3N stay)":
//             case "Accompanying Person":
//             case "Extra N-Stay":
//                 // Tertiary categories / Accommodation - indigo tones
//                 iconBg = 'bg-indigo-600';
//                 overlayBg = 'bg-indigo-100';
//                 buttonBg = 'bg-indigo-600';
//                 buttonHover = 'hover:bg-indigo-700';
//                 borderAccent = 'border-indigo-600';
//                 break;
//             default:
//                 // Fallback
//                 iconBg = 'bg-gray-600';
//                 overlayBg = 'bg-gray-100';
//                 buttonBg = 'bg-gray-600';
//                 buttonHover = 'hover:bg-gray-700';
//                 borderAccent = 'border-gray-600';
//                 break;
//         }

//         return {
//             cardBg: 'bg-white',
//             cardBorder: isSelected ? `border-2 ${borderAccent}` : 'border-gray-200',
//             cardShadow: shadow,
//             iconBg: iconBg,
//             iconText: iconText,
//             overlayBg: `${overlayBg} ${overlayOpacity}`,
//             buttonBg: buttonBg,
//             buttonHover: buttonHover,
//         };
//     };

//     return (
//         <div className="min-h-screen bg-gray-50 py-8 md:py-12 font-sans text-gray-800 text-base"> {/* Base font size increased */}
//             <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
//                 <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-center mb-4 leading-tight text-gray-800"> {/* Larger H1 */}
//                     Secure Your Spot for <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">{conferenceDetails.name}</span>
//                 </h1>
//                 <p className="text-base md:text-lg text-center text-gray-600 mb-10 md:mb-14 max-w-xl mx-auto"> {/* Larger P */}
//                     Choose the ticket option that best suits your needs and join us for an unforgettable experience.
//                 </p>

//                 <form onSubmit={handleSubmit} className="space-y-12 md:space-y-16"> {/* Increased vertical spacing */}

//                     <div className="flex justify-center mb-8 md:mb-12">
//                         <div className="bg-white rounded-full p-2 md:p-2.5 flex items-center space-x-3 md:space-x-4 shadow-md border border-gray-200">
//                             <button
//                                 type="button"
//                                 className={`px-4 py-2.5 md:px-6 md:py-3 rounded-full text-base font-semibold transition-colors duration-300 ${ // Larger button text
//                                     participantType === 'academic' ? 'bg-indigo-600 text-white shadow-sm' : 'text-gray-600 hover:bg-gray-100'
//                                 }`}
//                                 onClick={() => setParticipantType('academic')}
//                             >
//                                 Academic
//                             </button>
//                             <button
//                                 type="button"
//                                 className={`px-4 py-2.5 md:px-6 md:py-3 rounded-full text-base font-semibold transition-colors duration-300 ${ // Larger button text
//                                     participantType === 'business' ? 'bg-indigo-600 text-white shadow-sm' : 'text-gray-600 hover:bg-gray-100'
//                                 }`}
//                                 onClick={() => setParticipantType('business')}
//                             >
//                                 Business
//                             </button>
//                         </div>
//                     </div>

//                     {registrationCategories.length > 0 && (
//                         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"> {/* Increased gap */}
//                             {registrationCategories.map(category => {
//                                 const priceInfo = conferenceDetails.pricingPlans[category];
//                                 if (!priceInfo) return null;
//                                 const currentPrice = priceInfo[participantType];
//                                 const quantity = selectedItems[category]?.quantity || 0;
//                                 const isSelected = quantity > 0;
//                                 const colors = getCardColors(category, isSelected);

//                                 return (
//                                     <div key={category} className={`relative ${colors.cardBg} ${colors.cardShadow} ${colors.cardBorder} rounded-2xl flex flex-col transition-all duration-300 hover:shadow-lg hover:-translate-y-1`}>
//                                         {/* Icon positioned slightly above and centered on the overlay */}
//                                         <div className={`absolute -top-6 left-1/2 transform -translate-x-1/2 ${colors.iconBg} ${colors.iconText} w-16 h-16 flex items-center justify-center rounded-full shadow-lg z-20`}>
//                                             {getCategoryIcon(category)}
//                                         </div>

//                                         {/* Translucent Header Overlay */}
//                                         <div className={`relative ${colors.overlayBg} rounded-t-2xl pt-10 pb-4 text-center z-10`}>
//                                             <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mt-6">{category}</h3> {/* Larger category title */}
//                                         </div>

//                                         {/* Main Card Content */}
//                                         <div className="flex flex-col flex-grow p-4 pt-0 text-center">
//                                             <p className="text-4xl font-extrabold text-gray-900 mb-4">${currentPrice.toFixed(2)}</p> {/* Larger price */}

//                                             <ul className="text-base text-gray-700 space-y-2 mb-6 md:mb-8 text-left mx-auto max-w-xs w-full"> {/* Larger features text and spacing */}
//                                                 {priceInfo.features?.map((feature, idx) => (
//                                                     <li key={idx} className="flex items-start">
//                                                         <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-700 mr-2 flex-shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
//   <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
// </svg>
//                                                         {feature}
//                                                     </li>
//                                                 ))}
//                                             </ul>

//                                             <div className="flex items-center justify-center space-x-3 mt-auto"> {/* Increased spacing */}
//                                                 <button
//                                                     type="button"
//                                                     onClick={() => handleQuantityChange(category, -1)}
//                                                     className={`w-10 h-10 flex items-center justify-center rounded-full ${colors.buttonBg} text-white text-xl font-bold transition-all duration-200 ${colors.buttonHover}`}
//                                                     aria-label={`Decrease quantity for ${category}`}
//                                                 >
//                                                     <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
//                                                         <path strokeLinecap="round" strokeLinejoin="round" d="M20 12H4" />
//                                                     </svg>
//                                                 </button>
//                                                 <span className="text-2xl font-semibold text-gray-900 w-10 text-center">{quantity}</span> {/* Larger quantity text */}
//                                                 <button
//                                                     type="button"
//                                                     onClick={() => handleQuantityChange(category, 1)}
//                                                     className={`w-10 h-10 flex items-center justify-center rounded-full ${colors.buttonBg} text-white text-xl font-bold transition-all duration-200 ${colors.buttonHover}`}
//                                                     aria-label={`Increase quantity for ${category}`}
//                                                 >
//                                                     <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
//                                                         <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
//                                                     </svg>
//                                                 </button>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 );
//                             })}
//                         </div>
//                     )}

//                     {addOnCategories.length > 0 && (
//                         <>
//                             <h2 className="text-2xl md:text-3xl font-extrabold text-center text-gray-800 mt-12 mb-8"> {/* Larger Add-Ons heading */}
//                                 Enhance Your Experience <span className="text-indigo-600">(Add-Ons)</span>
//                             </h2>
//                             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"> {/* Increased gap */}
//                                 {addOnCategories.map(category => {
//                                     const priceInfo = conferenceDetails.pricingPlans["Add-Ons"][category];
//                                     if (!priceInfo) return null;
//                                     const currentPrice = priceInfo[participantType];
//                                     const quantity = selectedItems[category]?.quantity || 0;
//                                     const isSelected = quantity > 0;
//                                     const colors = getCardColors(category, isSelected);

//                                     return (
//                                         <div key={category} className={`relative ${colors.cardBg} ${colors.cardShadow} ${colors.cardBorder} rounded-2xl flex flex-col transition-all duration-300 hover:shadow-lg hover:-translate-y-1`}>
//                                             {/* Icon positioned slightly above and centered on the overlay */}
//                                             <div className={`absolute -top-6 left-1/2 transform -translate-x-1/2 ${colors.iconBg} ${colors.iconText} w-16 h-16 flex items-center justify-center rounded-full shadow-lg z-20`}>
//                                                 {getCategoryIcon(category)}
//                                             </div>

//                                             {/* Translucent Header Overlay */}
//                                             <div className={`relative ${colors.overlayBg} rounded-t-2xl pt-10 pb-4 text-center z-10`}>
//                                                 <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mt-6">{category}</h3> {/* Larger category title */}
//                                             </div>

//                                             {/* Main Card Content */}
//                                             <div className="flex flex-col flex-grow p-4 pt-0 text-center">
//                                                 <p className="text-4xl font-extrabold text-gray-900 mb-4">${currentPrice.toFixed(2)}</p> {/* Larger price */}

//                                                 <ul className="text-base text-gray-700 space-y-2 mb-6 md:mb-8 text-left mx-auto max-w-xs w-full"> {/* Larger features text and spacing */}
//                                                     {priceInfo.features?.map((feature, idx) => (
//                                                         <li key={idx} className="flex items-start">
//                                                             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-700 mr-2 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
//   <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
// </svg>
//                                                             {feature}
//                                                         </li>
//                                                     ))}
//                                                 </ul>

//                                                 <div className="flex items-center justify-center space-x-3 mt-auto"> {/* Increased spacing */}
//                                                     <button
//                                                         type="button"
//                                                         onClick={() => handleQuantityChange(category, -1)}
//                                                         className={`w-10 h-10 flex items-center justify-center rounded-full ${colors.buttonBg} text-white text-xl font-bold transition-all duration-200 ${colors.buttonHover}`}
//                                                         aria-label={`Decrease quantity for ${category}`}
//                                                     >
//                                                         <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
//                                                             <path strokeLinecap="round" strokeLinejoin="round" d="M20 12H4" />
//                                                         </svg>
//                                                     </button>
//                                                     <span className="text-2xl font-semibold text-gray-900 w-10 text-center">{quantity}</span> {/* Larger quantity text */}
//                                                     <button
//                                                         type="button"
//                                                         onClick={() => handleQuantityChange(category, 1)}
//                                                         className={`w-10 h-10 flex items-center justify-center rounded-full ${colors.buttonBg} text-white text-xl font-bold transition-all duration-200 ${colors.buttonHover}`}
//                                                         aria-label={`Increase quantity for ${category}`}
//                                                     >
//                                                         <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
//                                                             <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
//                                                         </svg>
//                                                     </button>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     );
//                                 })}
//                             </div>
//                         </>
//                     )}

//                     {/* Contact Information Section */}
//                     <div className="bg-white p-6 md:p-8 rounded-2xl shadow-md border border-gray-200"> {/* Larger padding, rounded corners */}
//                         <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-6 text-center">Your Contact Information</h2> {/* Larger heading */}
//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-6"> {/* Increased gap */}
//                             <div>
//                                 <label htmlFor="fullName" className="block text-base font-medium text-gray-700 mb-2">Full Name <span className="text-red-500">*</span></label> {/* Larger label */}
//                                 <input
//                                     type="text"
//                                     id="fullName"
//                                     className="mt-1 block w-full px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-base"
//                                     value={participantFullName}
//                                     onChange={(e) => setParticipantFullName(e.target.value)}
//                                     required
//                                 />
//                             </div>
//                             <div>
//                                 <label htmlFor="email" className="block text-base font-medium text-gray-700 mb-2">Email Address <span className="text-red-500">*</span></label> {/* Larger label */}
//                                 <input
//                                     type="email"
//                                     id="email"
//                                     className="mt-1 block w-full px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-base"
//                                     value={participantEmail}
//                                     onChange={(e) => setParticipantEmail(e.target.value)}
//                                     required
//                                 />
//                             </div>
//                             <div>
//                                 <label htmlFor="country" className="block text-base font-medium text-gray-700 mb-2">Country <span className="text-red-500">*</span></label> {/* Larger label */}
//                                 <input
//                                     type="text"
//                                     id="country"
//                                     className="mt-1 block w-full px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-base"
//                                     value={participantCountry}
//                                     onChange={(e) => setParticipantCountry(e.target.value)}
//                                     required
//                                 />
//                             </div>
//                             <div>
//                                 <label htmlFor="phone" className="block text-base font-medium text-gray-700 mb-2">Phone Number</label> {/* Larger label */}
//                                 <input
//                                     type="text"
//                                     id="phone"
//                                     className="mt-1 block w-full px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-base"
//                                     value={participantPhone}
//                                     onChange={(e) => setParticipantPhone(e.target.value)}
//                                 />
//                             </div>
//                             <div className="md:col-span-2">
//                                 <label htmlFor="organization" className="block text-base font-medium text-gray-700 mb-2">Organization / University</label> {/* Larger label */}
//                                 <input
//                                     type="text"
//                                     id="organization"
//                                     className="mt-1 block w-full px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-base"
//                                     value={participantOrganization}
//                                     onChange={(e) => setParticipantOrganization(e.target.value)}
//                                 />
//                             </div>
//                         </div>
//                     </div>

//                     {/* Total Amount and Payment Button */}
//                     <div className="bg-green-100 p-6 md:p-8 rounded-2xl shadow-lg text-green-900 flex flex-col items-center justify-center text-center border border-green-300"> {/* Larger padding, rounded corners */}
//                         <p className="text-lg md:text-xl font-semibold mb-3">Total Amount:</p> {/* Larger text */}
//                         <p className="text-4xl md:text-5xl font-extrabold mb-6">${totalAmount.toFixed(2)}</p> {/* Even larger total amount */}
//                         <button
//                             type="submit"
//                             className="w-full max-w-sm bg-green-600 text-white px-7 py-3.5 rounded-xl text-lg font-bold
//                                 hover:bg-green-700 transition duration-300 transform hover:scale-105 shadow-md
//                                 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
//                         >
//                             Proceed to Secure Payment
//                         </button>
//                     </div>
//                 </form>
//             </div>
//         </div>
//     );
// };

// export default RegistrationPage;

// src/pages/RegistrationPage.jsx
import React, { useState, useEffect, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Select from "react-select";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

// Import your conference data
import webinarsData from "../data/webinarsData1"; // Ensure these files exist and have the 'date' field
import hybridsData from "../data/hybridsData1"; // Ensure these files exist and have the 'date' field

// Define your backend URL from environment variables or direct string
const API_BASE_URL =
  "https://main-react-backend-code.onrender.com" || "http://localhost:5000";

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
          <rect x="2" y="3" width="20" height="18" rx="2" ry="2"></rect>
          <line x1="17" y1="10" x2="22" y2="10"></line>
          <line x1="17" y1="14" x2="22" y2="14"></line>
          <line x1="2" y1="10" x2="7" y2="10"></line>
          <line x1="2" y1="14" x2="7" y2="14"></line>
          <line x1="12" y1="2" x2="12" y2="22"></line>
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
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
          <path d="M14 2v6h6"></path>
          <path d="M10 13l2 2l4-4"></path>
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
    case "Suit - B (OP + 3N stay)":
    case "Accompanying Person":
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
          <path d="M2 19V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2z"></path>
          <path d="M14.5 9.5a2.5 2.5 0 0 0-5 0v5a2.5 2.5 0 0 0 5 0"></path>
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
          <path d="M18 8h1a4 4 0 0 1 0 8h-1"></path>
          <path d="M2 8h16v9a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8z"></path>
          <line x1="6" y1="1" x2="6" y2="4"></line>
          <line x1="10" y1="1" x2="10" y2="4"></line>
          <line x1="14" y1="1" x2="14" y2="4"></line>
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
  const [participantType, setParticipantType] = useState("academic"); // Global participant type toggle
  const [totalAmount, setTotalAmount] = useState(0);

  const [selectedConferenceOption, setSelectedConferenceOption] =
    useState(null);

  // State for participant info (always visible now)
  const [participantFullName, setParticipantFullName] = useState("");
  const [participantEmail, setParticipantEmail] = useState("");
  const [participantCountry, setParticipantCountry] = useState("");
  const [participantPhone, setParticipantPhone] = useState("");
  const [participantOrganization, setParticipantOrganization] = useState("");

  // Filter conferences for 2025 specifically for the display lists
  const conferences2025 = useMemo(() => {
    const currentYear = 2025; // As per explicit request
    const hybridConfs2025 = hybridsData.filter(
      (conf) => conf.year === currentYear
    );
    const webinarConfs2025 = webinarsData.filter(
      (conf) => conf.year === currentYear
    );
    return { hybridConfs2025, webinarConfs2025 };
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
      date: conf.date, // Use the 'date' field directly
    }));

    const hybridConfs = hybridsData.map((conf) => ({
      id: conf.code,
      name: conf.title,
      type: "hybrid",
      description:
        conf.description ||
        "Discover the latest innovations and network with professionals in this unique hybrid conference.",
      year: conf.year,
      date: conf.date, // Use the 'date' field directly
    }));

    return [...webinarConfs, ...hybridConfs].map((conf) => ({
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
            setConferenceDetails({
              name: response.data.conferenceName,
              type: response.data.conferenceType,
              pricingPlans: enhancedPricingPlans,
              sourceId: response.data.sourceId,
              date: response.data.date, // Use the 'date' field from backend
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
      const type = item.type;

      let price = 0;
      if (mainPricing[category]) {
        price = mainPricing[category][type];
      } else if (addOnPricing[category]) {
        price = addOnPricing[category][type];
      }

      if (price && quantity) {
        currentTotal += price * quantity;
      }
    }
    setTotalAmount(currentTotal);
  }, [selectedItems, conferenceDetails]);

  const handleQuantityChange = (category, change) => {
    setSelectedItems((prev) => {
      const currentItem = prev[category] || {
        quantity: 0,
        type: participantType,
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

  const handleReactSelectChange = (selectedOption) => {
    setSelectedConferenceOption(selectedOption);
  };

//   // Consolidated function to proceed with a selected conference (from dropdown or list)
//   const handleProceedWithConference = async (confOption) => {
//     if (!confOption) {
//       alert("Please select a conference.");
//       return;
//     }

//     setIsLoading(true);
//     setError(null);

//     const selectedConf = confOption.originalConf;

//     try {
//       const response = await axios.post(
//         `${API_BASE_URL}/api/source/get-source-token`,
//         {
//           sourceId: selectedConf.id,
//           conferenceType: selectedConf.type,
//           date: selectedConf.date, // Pass the 'date' field
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

const handleProceedWithConference = async (confOption) => {
    if (!confOption) {
      alert("Please select a conference.");
      return;
    }

    setIsLoading(true);
    setError(null);

    const selectedConf = confOption.originalConf;

    try {
      // CHANGED: From axios.post to axios.get
      // CHANGED: From '/get-source-token' to '/generate-token'
      // CHANGED: Data moved from request body to 'params' object for GET request
      const response = await axios.get(
        `${API_BASE_URL}/api/source/generate-token`, // Updated endpoint path
        {
          params: { // Use 'params' for GET requests
            sourceId: selectedConf.id,
            conferenceType: selectedConf.type,
            date: selectedConf.date, // Pass the 'date' field
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
                className="w-full sm:w-auto bg-indigo-600 text-white px-6 py-3 rounded-xl text-base font-semibold
                                    hover:bg-indigo-700 transition duration-300 transform hover:scale-105 shadow-md
                                    focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
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
            Browse Our{" "}
            <span className="bg-gradient-to-r from-teal-500 to-green-600 bg-clip-text text-transparent">
              2025 Conference Series
            </span>
          </h3>
          <p className="text-lg text-center text-gray-600 mb-8 max-w-xl mx-auto">
            Click on a conference below to proceed with registration.
          </p>

          <div className="flex flex-col lg:flex-row gap-8 lg:gap-10">
            <div className="w-full lg:w-1/2 flex flex-col">
              <h4 className="text-2xl font-bold text-purple-800 mb-6 text-center lg:text-left">
                Hybrid Conferences
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-grow">
                {conferences2025.hybridConfs2025.map((conf) => (
                  <div
                    key={conf.code}
                    onClick={() =>
                      handleProceedWithConference(
                        allConferences.find(
                          (option) => option.value === conf.code
                        )
                      )
                    }
                    className="flex flex-col items-center justify-center bg-purple-50 rounded-xl shadow-md border border-purple-200 p-5 cursor-pointer
                                            hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                  >
                    <div className="w-12 h-12 flex items-center justify-center rounded-full bg-purple-200 text-purple-700 mb-3">
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
                        <path d="M12 2L2 7l10 5 10-5-10-5z" />
                        <path d="M2 17l10 5 10-5" />
                        <path d="M2 12l10 5 10-5" />
                      </svg>
                    </div>
                    <h5 className="font-extrabold text-lg text-purple-900 mb-2 text-center leading-tight">
                      {conf.title}
                    </h5>
                    {conf.date && (
                      <p className="text-sm text-gray-600 mb-2">{conf.date}</p>
                    )}
                    <div
                      className="inline-flex items-center rounded-full px-3 py-1 text-sm font-semibold uppercase tracking-wide
                                            bg-purple-100 text-purple-800"
                    >
                      {conf.type}
                    </div>
                  </div>
                ))}
                {conferences2025.hybridConfs2025.length === 0 && (
                  <p className="text-gray-500 text-center col-span-full text-base">
                    No Hybrid Conferences for 2025 available yet.
                  </p>
                )}
              </div>
            </div>

            <div className="w-full lg:w-1/2 flex flex-col">
              <h4 className="text-2xl font-bold text-blue-800 mb-6 text-center lg:text-left">
                Webinar Conferences
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-grow">
                {conferences2025.webinarConfs2025.map((conf) => (
                  <div
                    key={conf.code}
                    onClick={() =>
                      handleProceedWithConference(
                        allConferences.find(
                          (option) => option.value === conf.code
                        )
                      )
                    }
                    className="flex flex-col items-center justify-center bg-blue-50 rounded-xl shadow-md border border-blue-200 p-5 cursor-pointer
                                            hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                  >
                    <div className="w-12 h-12 flex items-center justify-center rounded-full bg-blue-200 text-blue-700 mb-3">
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
                        <rect
                          x="2"
                          y="3"
                          width="20"
                          height="14"
                          rx="2"
                          ry="2"
                        ></rect>
                        <line x1="8" y1="21" x2="16" y2="21"></line>
                        <line x1="12" y1="17" x2="12" y2="21"></line>
                      </svg>
                    </div>
                    <h5 className="font-extrabold text-lg text-blue-900 mb-2 text-center leading-tight">
                      {conf.title}
                    </h5>
                    {conf.date && (
                      <p className="text-sm text-gray-600 mb-2">{conf.date}</p>
                    )}
                    <div
                      className="inline-flex items-center rounded-full px-3 py-1 text-sm font-semibold uppercase tracking-wide
                                            bg-blue-100 text-blue-800"
                    >
                      {conf.type}
                    </div>
                  </div>
                ))}
                {conferences2025.webinarConfs2025.length === 0 && (
                  <p className="text-gray-500 text-center col-span-full text-base">
                    No Webinar Conferences for 2025 available yet.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const getCardColors = (category, isSelected) => {
    let iconBg = "";
    let iconText = "text-white"; // Icons themselves will be white for contrast
    let overlayBg = ""; // Translucent top overlay
    let buttonBg = "";
    let buttonHover = "";
    let borderAccent = "";
    let shadow = "shadow-md";
    let overlayOpacity = isSelected ? "bg-opacity-80" : "bg-opacity-60";

    switch (category) {
      case "e-Poster":
      case "Video Presentation":
      case "Virtual Presentation":
      case "Oral Presentation":
      case "Delegate":
        // Primary categories - purple tones
        iconBg = "bg-purple-600";
        overlayBg = "bg-purple-100";
        buttonBg = "bg-purple-600";
        buttonHover = "hover:bg-purple-700";
        borderAccent = "border-purple-600";
        break;
      case "Article Publication":
      case "Exhibitor":
      case "Standard Pass":
      case "VIP Pass":
        // Secondary categories / Add-ons - green tones
        iconBg = "bg-green-600";
        overlayBg = "bg-green-100";
        buttonBg = "bg-green-600";
        buttonHover = "hover:bg-green-700";
        borderAccent = "border-green-600";
        break;
      case "Suit - A (OP + 2N stay)":
      case "Suit - B (OP + 3N stay)":
      case "Accompanying Person":
      case "Extra N-Stay":
        // Tertiary categories / Accommodation - indigo tones
        iconBg = "bg-indigo-600";
        overlayBg = "bg-indigo-100";
        buttonBg = "bg-indigo-600";
        buttonHover = "hover:bg-indigo-700";
        borderAccent = "border-indigo-600";
        break;
      default:
        // Fallback
        iconBg = "bg-gray-600";
        overlayBg = "bg-gray-100";
        buttonBg = "bg-gray-600";
        buttonHover = "hover:bg-gray-700";
        borderAccent = "border-gray-600";
        break;
    }

    return {
      cardBg: "bg-white",
      cardBorder: isSelected ? `border-2 ${borderAccent}` : "border-gray-200",
      cardShadow: shadow,
      iconBg: iconBg,
      iconText: iconText,
      overlayBg: `${overlayBg} ${overlayOpacity}`,
      buttonBg: buttonBg,
      buttonHover: buttonHover,
    };
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 md:py-12 font-sans text-gray-800 text-base">
      <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-center mb-4 leading-tight text-gray-800">
          Secure Your Spot for{" "}
          <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            {conferenceDetails.name}
          </span>
        </h1>
        {conferenceDetails.date && (
          <p className="text-lg md:text-xl font-semibold text-center text-gray-700 mb-6">
            {conferenceDetails.date}
          </p>
        )}
        <p className="text-base md:text-lg text-center text-gray-600 mb-10 md:mb-14 max-w-xl mx-auto">
          Choose the ticket option that best suits your needs and join us for an
          unforgettable experience.
        </p>

        <form onSubmit={handleSubmit} className="space-y-12 md:space-y-16">
          <div className="flex justify-center mb-8 md:mb-12">
            <div className="bg-white rounded-full p-2 md:p-2.5 flex items-center space-x-3 md:space-x-4 shadow-md border border-gray-200">
              <button
                type="button"
                className={`px-4 py-2.5 md:px-6 md:py-3 rounded-full text-base font-semibold transition-colors duration-300 ${
                  participantType === "academic"
                    ? "bg-indigo-600 text-white shadow-sm"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
                onClick={() => setParticipantType("academic")}
              >
                Academic Rate
              </button>
              <button
                type="button"
                className={`px-4 py-2.5 md:px-6 md:py-3 rounded-full text-base font-semibold transition-colors duration-300 ${
                  participantType === "business"
                    ? "bg-indigo-600 text-white shadow-sm"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
                onClick={() => setParticipantType("business")}
              >
                Business Rate
              </button>
            </div>
          </div>

          {registrationCategories.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {registrationCategories.map((category) => {
                const priceInfo = conferenceDetails.pricingPlans[category];
                if (!priceInfo) return null;
                const currentPrice = priceInfo[participantType];
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
              <h2 className="text-2xl md:text-3xl font-extrabold text-center text-gray-800 mt-12 mb-8">
                Enhance Your Experience{" "}
                <span className="text-indigo-600">(Add-Ons)</span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {addOnCategories.map((category) => {
                  const priceInfo =
                    conferenceDetails.pricingPlans["Add-Ons"][category];
                  if (!priceInfo) return null;
                  const currentPrice = priceInfo[participantType];
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
              type="submit"
              className="w-full max-w-sm bg-green-600 text-white px-7 py-3.5 rounded-xl text-lg font-bold
                                hover:bg-green-700 transition duration-300 transform hover:scale-105 shadow-md
                                focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            >
              Proceed to Secure Payment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegistrationPage;

// // src/pages/RegistrationPage.jsx
// import React, { useState, useEffect, useMemo } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import Select from 'react-select'; // Import react-select

// // Import your conference data
// import  webinarsData  from '../data/webinarsData1';
// import  hybridsData  from '../data/hybridsData1';

// // Define your backend URL from environment variables or direct string
// const API_BASE_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000';

// const RegistrationPage = () => {
//     const location = useLocation();
//     const navigate = useNavigate();

//     // State for loading, errors, and fetched conference data
//     const [isLoading, setIsLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [conferenceDetails, setConferenceDetails] = useState(null);

//     // State for selected registration items and quantities
//     const [selectedItems, setSelectedItems] = useState({});
//     const [participantType, setParticipantType] = useState('academic');

//     // State for overall total amount
//     const [totalAmount, setTotalAmount] = useState(0);

//     // State for react-select's selected option object
//     const [selectedConferenceOption, setSelectedConferenceOption] = useState(null);

//     // Combine all conferences for the dropdown
//     const allConferences = useMemo(() => {
//         const webinarConfs = webinarsData.map(conf => ({
//             id: conf.code,
//             name: conf.title,
//             type: conf.type.toLowerCase()
//         }));

//         const hybridConfs = hybridsData.map(conf => ({
//             id: conf.code,
//             name: conf.title,
//             type: 'hybrid'
//         }));

//         // Format for react-select: { value: id, label: name (type) }
//         return [...webinarConfs, ...hybridConfs].map(conf => ({
//             value: conf.id,
//             label: `${conf.name} (${conf.type.charAt(0).toUpperCase() + conf.type.slice(1)})`,
//             originalConf: conf // Store the original conference object for easy access
//         }));
//     }, []);

//     // Effect to handle token verification or initial dropdown display
//     useEffect(() => {
//         const queryParams = new URLSearchParams(location.search);
//         const sourceToken = queryParams.get('sourceToken');

//         if (sourceToken) {
//             const verifyToken = async () => {
//                 try {
//                     const response = await axios.get(`${API_BASE_URL}/api/source/verify-token`, {
//                         params: { token: sourceToken }
//                     });

//                     if (response.data.isValid) {
//                         setConferenceDetails({
//                             name: response.data.conferenceName,
//                             type: response.data.conferenceType,
//                             pricingPlans: response.data.pricingPlans,
//                             sourceId: response.data.sourceId
//                         });
//                         setError(null);
//                         // If coming from a token, pre-select the conference in the dropdown
//                         const preselectedOption = allConferences.find(
//                             option => option.value === response.data.sourceId
//                         );
//                         setSelectedConferenceOption(preselectedOption || null);
//                     } else {
//                         setError('Invalid or expired registration token. Please select a conference.');
//                         setConferenceDetails(null);
//                         setSelectedConferenceOption(null); // Clear selection
//                     }
//                 } catch (err) {
//                     console.error('Error verifying token:', err);
//                     setError(err.response?.data?.message || 'Failed to verify token. Please select a conference.');
//                     setConferenceDetails(null);
//                     setSelectedConferenceOption(null); // Clear selection
//                 } finally {
//                     setIsLoading(false);
//                 }
//             };
//             verifyToken();
//         } else {
//             setError('Please select a conference to proceed with registration.');
//             setIsLoading(false);
//             setConferenceDetails(null);
//             setSelectedConferenceOption(null); // Clear selection
//         }
//     }, [location.search, API_BASE_URL, allConferences]); // Add allConferences to dependencies

//     const registrationCategories = useMemo(() => {
//         if (!conferenceDetails?.pricingPlans) return [];
//         const mainCategories = Object.keys(conferenceDetails.pricingPlans).filter(
//             key => key !== "Add-Ons"
//         );
//         return mainCategories;
//     }, [conferenceDetails]);

//     const addOnCategories = useMemo(() => {
//         if (!conferenceDetails?.pricingPlans?.["Add-Ons"]) return [];
//         return Object.keys(conferenceDetails.pricingPlans["Add-Ons"]);
//     }, [conferenceDetails]);

//     useEffect(() => {
//         if (!conferenceDetails?.pricingPlans) {
//             setTotalAmount(0);
//             return;
//         }

//         let currentTotal = 0;
//         const mainPricing = conferenceDetails.pricingPlans;
//         const addOnPricing = conferenceDetails.pricingPlans["Add-Ons"] || {};

//         for (const category in selectedItems) {
//             const item = selectedItems[category];
//             const quantity = item.quantity;
//             const type = item.type || participantType;

//             let price = 0;
//             if (mainPricing[category]) {
//                 price = mainPricing[category][type];
//             } else if (addOnPricing[category]) {
//                 price = addOnPricing[category][type];
//             }

//             if (price && quantity) {
//                 currentTotal += price * quantity;
//             }
//         }
//         setTotalAmount(currentTotal);
//     }, [selectedItems, participantType, conferenceDetails]);

//     const handleQuantityChange = (category, value) => {
//         const quantity = parseInt(value, 10);
//         setSelectedItems(prev => {
//             const currentType = prev[category]?.type || participantType;

//             const newItem = {
//                 quantity: quantity > 0 ? quantity : 0,
//                 type: currentType
//             };

//             if (newItem.quantity === 0) {
//                 const newState = { ...prev };
//                 delete newState[category];
//                 return newState;
//             }
//             return { ...prev, [category]: newItem };
//         });
//     };

//     const handleParticipantTypeChange = (category, type) => {
//         setSelectedItems(prev => ({
//             ...prev,
//             [category]: {
//                 quantity: prev[category]?.quantity || 1,
//                 type: type
//             }
//         }));
//     };

//     // Handler for when a conference is selected from the react-select dropdown
//     const handleReactSelectChange = (selectedOption) => {
//         setSelectedConferenceOption(selectedOption);
//     };

//     // Handler to generate token and navigate when "Proceed" is clicked from dropdown
//     const handleProceedWithSelectedConference = async () => {
//         if (!selectedConferenceOption) {
//             alert('Please select a conference.');
//             return;
//         }

//         setIsLoading(true);
//         setError(null);

//         // Access the original conference data from the selected option
//         const selectedConf = selectedConferenceOption.originalConf;

//         try {
//             const response = await axios.post(`${API_BASE_URL}/api/source/get-source-token`, {
//                 sourceId: selectedConf.id,
//                 conferenceType: selectedConf.type
//             });

//             if (response.data.token) {
//                 navigate(`/registration?sourceToken=${response.data.token}`);
//             } else {
//                 setError('Failed to generate token. Please try again.');
//             }
//         } catch (err) {
//             console.error('Error generating token from dropdown:', err);
//             setError(err.response?.data?.message || 'Failed to generate token. Please try again.');
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     // Placeholder for actual form submission
//     const handleSubmit = (e) => {
//         e.preventDefault();
//         console.log('Registration details:', {
//             conferenceId: conferenceDetails?.sourceId,
//             conferenceName: conferenceDetails?.name,
//             selectedItems,
//             totalAmount
//         });

//         alert(`Total Amount to pay: $${totalAmount.toFixed(2)}. Proceeding to payment gateway... (This is a placeholder)`);
//     };

//     // --- Conditional Rendering for Loading, Error, and Dropdown vs. Form ---
//     if (isLoading) {
//         return (
//             <div className="min-h-screen flex items-center justify-center font-sans">
//                 <p className="text-xl text-gray-700">Loading conference details...</p>
//             </div>
//         );
//     }

//     // Display dropdown if there's an error OR no conference details (meaning no valid token was found initially)
//     if (error || !conferenceDetails) {
//         return (
//             <div className="min-h-screen flex flex-col items-center justify-center font-sans bg-gray-100 p-4">
//                 <div className="bg-white p-8 rounded-lg shadow-md text-center border border-gray-200 w-full max-w-md">
//                     <p className="text-xl text-red-600 mb-4">{error}</p>
//                     <h2 className="text-2xl font-semibold text-gray-700 mb-6">Select a Conference</h2>
//                     {/* Replaced <select> with <Select> from react-select */}
//                     <Select
//                         value={selectedConferenceOption}
//                         onChange={handleReactSelectChange}
//                         options={allConferences}
//                         placeholder="Type to search or select a conference..."
//                         isClearable
//                         isSearchable
//                         className="mb-4"
//                         classNamePrefix="react-select" // For custom styling if needed
//                     />
//                     <button
//                         onClick={handleProceedWithSelectedConference}
//                         className="bg-indigo-600 text-white px-6 py-3 rounded-md hover:bg-indigo-700 transition duration-300 transform hover:scale-105"
//                     >
//                         Proceed to Registration
//                     </button>
//                     <button
//                         onClick={() => navigate('/')}
//                         className="mt-4 bg-gray-300 text-gray-800 px-6 py-3 rounded-md hover:bg-gray-400 transition duration-300 transform hover:scale-105 ml-2"
//                     >
//                         Go to Home
//                     </button>
//                 </div>
//             </div>
//         );
//     }

//     // Main registration form if conferenceDetails are successfully loaded
//     return (
//         <div className="min-h-screen bg-gray-100 py-12 font-sans">
//             <div className="container mx-auto p-6 bg-white rounded-lg shadow-xl">
//                 <h1 className="text-4xl font-bold text-center text-indigo-800 mb-8">
//                     Register for {conferenceDetails.name}
//                     <span className="block text-xl font-normal text-gray-600 mt-2">({conferenceDetails.type.charAt(0).toUpperCase() + conferenceDetails.type.slice(1)} Event)</span>
//                 </h1>

//                 <form onSubmit={handleSubmit} className="space-y-8">
//                     {/* Participant Details Section (Basic fields) */}
//                     <section className="p-6 border border-gray-200 rounded-lg shadow-sm bg-gray-50">
//                         <h2 className="text-2xl font-semibold text-gray-700 mb-4">Participant Information</h2>
//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                             <div>
//                                 <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">Full Name</label>
//                                 <input type="text" id="fullName" name="fullName" required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500" />
//                             </div>
//                             <div>
//                                 <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
//                                 <input type="email" id="email" name="email" required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500" />
//                             </div>
//                             <div>
//                                 <label htmlFor="country" className="block text-sm font-medium text-gray-700">Country</label>
//                                 <input type="text" id="country" name="country" required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500" />
//                             </div>
//                             <div>
//                                 <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number</label>
//                                 <input type="tel" id="phone" name="phone" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500" />
//                             </div>
//                              <div>
//                                 <label htmlFor="organization" className="block text-sm font-medium text-gray-700">Organization / University</label>
//                                 <input type="text" id="organization" name="organization" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500" />
//                             </div>
//                         </div>
//                     </section>

//                     {/* Registration Options Section */}
//                     <section className="p-6 border border-gray-200 rounded-lg shadow-sm bg-gray-50">
//                         <h2 className="text-2xl font-semibold text-gray-700 mb-4">Registration Options</h2>
//                         <p className="text-gray-600 mb-6">Select your desired registration categories and quantities.</p>

//                         <div className="overflow-x-auto">
//                             <table className="min-w-full divide-y divide-gray-200">
//                                 <thead className="bg-gray-100">
//                                     <tr>
//                                         <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
//                                         <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Academic Price (USD)</th>
//                                         <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Business Price (USD)</th>
//                                         <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Your Type</th>
//                                         <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
//                                         <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Subtotal</th>
//                                     </tr>
//                                 </thead>
//                                 <tbody className="bg-white divide-y divide-gray-200">
//                                     {registrationCategories.map(category => (
//                                         <React.Fragment key={category}>
//                                             <tr>
//                                                 <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
//                                                     {category}
//                                                 </td>
//                                                 <td className="px-4 py-4 whitespace-nowrap text-center text-sm text-gray-500">
//                                                     ${conferenceDetails.pricingPlans[category].academic.toFixed(2)}
//                                                 </td>
//                                                 <td className="px-4 py-4 whitespace-nowrap text-center text-sm text-gray-500">
//                                                     ${conferenceDetails.pricingPlans[category].business.toFixed(2)}
//                                                 </td>
//                                                 <td className="px-4 py-4 whitespace-nowrap text-center text-sm">
//                                                     <div className="flex justify-center space-x-2">
//                                                         <label className="inline-flex items-center">
//                                                             <input
//                                                                 type="radio"
//                                                                 name={`type-${category}`}
//                                                                 value="academic"
//                                                                 checked={(selectedItems[category]?.type || participantType) === 'academic'}
//                                                                 onChange={() => handleParticipantTypeChange(category, 'academic')}
//                                                                 className="form-radio text-indigo-600"
//                                                             />
//                                                             <span className="ml-1 text-gray-700">Academic</span>
//                                                         </label>
//                                                         <label className="inline-flex items-center">
//                                                             <input
//                                                                 type="radio"
//                                                                 name={`type-${category}`}
//                                                                 value="business"
//                                                                 checked={(selectedItems[category]?.type || participantType) === 'business'}
//                                                                 onChange={() => handleParticipantTypeChange(category, 'business')}
//                                                                 className="form-radio text-indigo-600"
//                                                             />
//                                                             <span className="ml-1 text-gray-700">Business</span>
//                                                         </label>
//                                                     </div>
//                                                 </td>
//                                                 <td className="px-4 py-4 whitespace-nowrap text-center text-sm">
//                                                     <input
//                                                         type="number"
//                                                         min="0"
//                                                         value={selectedItems[category]?.quantity || ''}
//                                                         onChange={(e) => handleQuantityChange(category, e.target.value)}
//                                                         className="w-20 text-center border border-gray-300 rounded-md shadow-sm p-1 focus:ring-indigo-500 focus:border-indigo-500"
//                                                     />
//                                                 </td>
//                                                 <td className="px-4 py-4 whitespace-nowrap text-right text-sm text-gray-900">
//                                                     ${(
//                                                         (selectedItems[category]?.quantity || 0) *
//                                                         (conferenceDetails.pricingPlans[category]?.[selectedItems[category]?.type || participantType] || 0)
//                                                     ).toFixed(2)}
//                                                 </td>
//                                             </tr>
//                                         </React.Fragment>
//                                     ))}

//                                     {/* Add-Ons Section */}
//                                     {addOnCategories.length > 0 && (
//                                         <tr>
//                                             <td colSpan="6" className="px-4 py-4 text-left text-lg font-semibold text-gray-700 bg-gray-100">
//                                                 Add-Ons
//                                             </td>
//                                         </tr>
//                                     )}
//                                     {addOnCategories.map(category => (
//                                         <tr key={category}>
//                                             <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
//                                                 {category}
//                                             </td>
//                                             <td className="px-4 py-4 whitespace-nowrap text-center text-sm text-gray-500">
//                                                 ${conferenceDetails.pricingPlans["Add-Ons"][category].academic.toFixed(2)}
//                                             </td>
//                                             <td className="px-4 py-4 whitespace-nowrap text-center text-sm text-gray-500">
//                                                 ${conferenceDetails.pricingPlans["Add-Ons"][category].business.toFixed(2)}
//                                             </td>
//                                             <td className="px-4 py-4 whitespace-nowrap text-center text-sm">
//                                                 <div className="flex justify-center space-x-2">
//                                                         <label className="inline-flex items-center">
//                                                             <input
//                                                                 type="radio"
//                                                                 name={`type-${category}`}
//                                                                 value="academic"
//                                                                 checked={(selectedItems[category]?.type || participantType) === 'academic'}
//                                                                 onChange={() => handleParticipantTypeChange(category, 'academic')}
//                                                                 className="form-radio text-indigo-600"
//                                                             />
//                                                             <span className="ml-1 text-gray-700">Academic</span>
//                                                         </label>
//                                                         <label className="inline-flex items-center">
//                                                             <input
//                                                                 type="radio"
//                                                                 name={`type-${category}`}
//                                                                 value="business"
//                                                                 checked={(selectedItems[category]?.type || participantType) === 'business'}
//                                                                 onChange={() => handleParticipantTypeChange(category, 'business')}
//                                                                 className="form-radio text-indigo-600"
//                                                             />
//                                                             <span className="ml-1 text-gray-700">Business</span>
//                                                         </label>
//                                                     </div>
//                                             </td>
//                                             <td className="px-4 py-4 whitespace-nowrap text-center text-sm">
//                                                 <input
//                                                     type="number"
//                                                     min="0"
//                                                     value={selectedItems[category]?.quantity || ''}
//                                                     onChange={(e) => handleQuantityChange(category, e.target.value)}
//                                                     className="w-20 text-center border border-gray-300 rounded-md shadow-sm p-1 focus:ring-indigo-500 focus:border-indigo-500"
//                                                 />
//                                             </td>
//                                             <td className="px-4 py-4 whitespace-nowrap text-right text-sm text-gray-900">
//                                                 ${(
//                                                     (selectedItems[category]?.quantity || 0) *
//                                                     (conferenceDetails.pricingPlans["Add-Ons"][category]?.[selectedItems[category]?.type || participantType] || 0)
//                                                 ).toFixed(2)}
//                                             </td>
//                                         </tr>
//                                     ))}

//                                     {/* Total Amount Row */}
//                                     <tr>
//                                         <td colSpan="5" className="px-4 py-4 text-right text-base font-bold text-gray-900">
//                                             Total Amount:
//                                         </td>
//                                         <td className="px-4 py-4 whitespace-nowrap text-right text-lg font-extrabold text-indigo-800">
//                                             ${totalAmount.toFixed(2)}
//                                         </td>
//                                     </tr>
//                                 </tbody>
//                             </table>
//                         </div>
//                     </section>

//                     {/* Submit Button */}
//                     <div className="flex justify-center mt-8">
//                         <button
//                             type="submit"
//                             className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-lg shadow-lg transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
//                         >
//                             Proceed to Payment
//                         </button>
//                     </div>
//                 </form>
//             </div>
//         </div>
//     );
// };

// export default RegistrationPage;
