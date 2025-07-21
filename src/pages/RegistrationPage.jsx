import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';

// **************************************************************************************************
// CRITICAL FIX FOR "Could not resolve @paypal/react-paypal-js" ERROR:
// This error means the necessary packages are NOT INSTALLED in your React project.
// You MUST install the required frontend packages in your React project's root directory.
//
// 1. Open your terminal.
// 2. Navigate to the ROOT DIRECTORY of your React frontend project (e.g., D:\Work\Helix React Page\helix).
//    This is the folder where your package.json file for the frontend is located.
// 3. Run the following command:
//
//    npm install react-router-dom axios @paypal/react-paypal-js --legacy-peer-deps
//
// 4. After running this command successfully, ensure your React development server is restarted:
//    - Stop it (Ctrl+C twice) if it's running.
//    - Start it again with: npm start
//
// This step is FUNDAMENTAL. The code itself is correct, but the environment needs the packages.
// **************************************************************************************************

// Also, make sure Tailwind CSS is configured in your React project.

// IMPORTANT: Replace with your actual backend URL
const BACKEND_URL = 'http://localhost:5000'; // Or your deployed backend URL

// --- Pricing Data (Mirroring your Backend's models/Pricing.js) ---
const pricing = {
    hybrid: {
        academic: {
            "e-Poster": 199,
            "Poster Presentation": 349,
            "Video Presentation": 449,
            "Virtual Presentation": 599,
            "Oral Presentation": 899,
            "Delegate": 349,
            "Suit - A (OP + 2N stay)": 1199,
            "Suit - B (OP + 3N stay)": 1399,
            "Accompanying Person": 349,
            "Extra N-Stay": 249,
            "Article Publication": 1099,
            "Exhibitor": 3999,
        },
        business: {
            "e-Poster": 249,
            "Poster Presentation": 399,
            "Video Presentation": 499,
            "Virtual Presentation": 649,
            "Oral Presentation": 999,
            "Delegate": 399,
            "Suit - A (OP + 2N stay)": 1399,
            "Suit - B (OP + 3N stay)": 1599,
            "Accompanying Person": 499,
            "Extra N-Stay": 249,
            "Article Publication": 1299,
            "Exhibitor": 5999,
        }
    },
    webinar: {
        academic: {
            "e-Poster": 149,
            "Video Presentation": 399,
            "Virtual Presentation": 499,
            "Delegate": 349,
            "Article Publication": 1099,
            "Exhibitor": 1999,
        },
        business: {
            "e-Poster": 199,
            "Video Presentation": 499,
            "Virtual Presentation": 599,
            "Delegate": 449,
            "Article Publication": 1299,
            "Exhibitor": 2999,
        }
    }
};

// Helper to get price (mirrors backend logic)
const getPrice = (type, category, plan) => {
    if (pricing[type] && pricing[type][category] && pricing[type][category][plan]) {
        return pricing[type][category][plan];
    }
    return 0; // Default to 0 if not found
};

const RegistrationForm = () => {
    const navigate = useNavigate();
    const location = useLocation();

    // --- Form State ---
    const [formData, setFormData] = useState({
        firstName: '', lastName: '', email: '', mobileNumber: '', address: '',
        state: '', country: '', university: '', affiliation: '', linkedin: '',
        twitter: '', abstractTitle: '', interest: '',
        abstractFile: null, demoFile: null,
        // *** FIX: Ensure these have valid initial values that match your pricing structure ***
        plan: 'Oral Presentation', // Must be a valid plan from your pricing.js
        type: 'hybrid',           // Must be 'hybrid' or 'webinar'
        category: 'academic',     // Must be 'academic' or 'business'
    });

    // --- Application State ---
    const [sourceToken, setSourceToken] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [paypalOrderID, setPaypalOrderID] = useState(null);
    const [message, setMessage] = useState('');
    const [timerSeconds, setTimerSeconds] = useState(300); // 5 minutes = 300 seconds
    const [timerExpired, setTimerExpired] = useState(false);
    const timerRef = useRef(null); // To hold the interval ID

    // --- Timer Logic ---
    useEffect(() => {
        // Clear any existing timer when component mounts or unmounts
        if (timerRef.current) clearInterval(timerRef.current);

        // Start timer only if not expired
        if (!timerExpired) {
            timerRef.current = setInterval(() => {
                setTimerSeconds(prevSeconds => {
                    if (prevSeconds <= 1) {
                        clearInterval(timerRef.current);
                        setTimerExpired(true);
                        setError("Time's up! Please refresh the page to start a new registration session.");
                        return 0;
                    }
                    return prevSeconds - 1;
                });
            }, 1000);
        }

        // Cleanup function for when component unmounts
        return () => {
            if (timerRef.current) {
                clearInterval(timerRef.current);
            }
        };
    }, [timerExpired]); // Re-run effect if timerExpired state changes

    // Format timer display
    const formatTime = (totalSeconds) => {
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };

    // --- Extract sourceToken from URL or set default ---
    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const token = queryParams.get('sourceToken');
        if (token) {
            setSourceToken(token);
            setMessage(`Welcome! Your session is linked to a source.`);
        } else {
            // If no source token, use a default for direct registrations
            setSourceToken("DIRECT_REGISTRATION_SOURCE_ID"); // IMPORTANT: Add this ID to your backend's VALID_SOURCE_IDS
            setMessage('No specific source detected. Proceeding with direct registration.');
        }
    }, [location.search]);

    // --- Handle form input changes ---
    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (files) {
            setFormData({ ...formData, [name]: files[0] });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    // --- Calculate and display current price ---
    const currentPrice = getPrice(formData.type, formData.category, formData.plan);

    // --- Handle form submission (Initiate Payment) ---
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setMessage('');
        setPaypalOrderID(null);

        if (timerExpired) {
            setError("Session expired. Please refresh the page to start a new registration.");
            setLoading(false);
            return;
        }

        if (!sourceToken) {
            setError('Source token is missing or could not be determined. Cannot proceed.');
            setLoading(false);
            return;
        }

        // --- NEW FIX: Force valid defaults if formData values are empty or invalid just before sending ---
        // This is a robust check to counter potential browser autofill issues or unexpected state
        const dataToSend = { ...formData, sourceToken };

        // Ensure type is valid, defaulting to 'hybrid' if not
        if (!dataToSend.type || !pricing[dataToSend.type]) {
            dataToSend.type = 'hybrid';
        }
        // Ensure category is valid for the chosen type, defaulting to 'academic' if not
        if (!dataToSend.category || !pricing[dataToSend.type][dataToSend.category]) {
            dataToSend.category = 'academic';
        }
        // Ensure plan is valid for the chosen type and category, defaulting to 'Oral Presentation' if not
        if (!dataToSend.plan || !pricing[dataToSend.type][dataToSend.category][dataToSend.plan]) {
            dataToSend.plan = 'Oral Presentation';
        }

        // Final client-side validation using the now-ensured values
        if (!pricing[dataToSend.type] || !pricing[dataToSend.type][dataToSend.category] || !pricing[dataToSend.type][dataToSend.category][dataToSend.plan]) {
            setError('Critical: Default pricing options are invalid. Please check frontend pricing data.');
            setLoading(false);
            return;
        }


        // Remove file objects as backend doesn't handle them directly in this flow
        delete dataToSend.abstractFile;
        delete dataToSend.demoFile;

        // Log the data being sent for debugging
        console.log("Sending data to backend:", dataToSend);


        try {
            const response = await axios.post(`${BACKEND_URL}/api/payment/initiate`, dataToSend, {
                headers: {
                    'Authorization': `Bearer ${sourceToken}`,
                    'Content-Type': 'application/json'
                }
            });

            if (response.data.orderID) {
                setPaypalOrderID(response.data.orderID);
                setMessage('Payment initiated. Please complete payment via PayPal button below.');
            } else {
                setError('Failed to get PayPal Order ID from backend.');
            }
        } catch (err) {
            console.error('Frontend: Error initiating payment:', err.response ? err.response.data : err.message);
            setError(err.response?.data?.message || 'Failed to initiate payment. Please check your details and try again.');
        } finally {
            setLoading(false);
        }
    };

    // --- PayPal Button Callbacks ---
    const createOrder = (data, actions) => {
        return paypalOrderID;
    };

    const onApprove = async (data, actions) => {
        setLoading(true);
        setMessage('Payment approved on PayPal. Waiting for final confirmation...');
        setError(null);
        navigate('/paypal-success', { state: { orderID: data.orderID, payerID: data.payerID } });
        setLoading(false);
    };

    const onCancel = (data) => {
        console.log('Payment cancelled:', data);
        setError('PayPal payment cancelled by the user.');
        setPaypalOrderID(null);
        setLoading(false);
        navigate('/paypal-cancel');
    };

    const onError = (err) => {
        console.error('PayPal onError:', err);
        setError('An error occurred with PayPal. Please try again.');
        setPaypalOrderID(null);
        setLoading(false);
    };

    // --- Form UI ---
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-600 to-purple-700 flex items-center justify-center p-4 sm:p-6 lg:p-8 font-inter antialiased">
            <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-2xl w-full max-w-4xl border border-blue-200 transform transition-all duration-300 ease-in-out hover:scale-[1.005]">
                <h2 className="text-4xl font-extrabold text-gray-900 mb-4 text-center tracking-tight">Conference Registration</h2>
                <p className="text-center text-gray-600 mb-8 text-lg">Secure your spot with a quick and easy process!</p>
                
                {/* Timer Display */}
                <div className={`text-center text-2xl font-bold mb-6 p-3 rounded-lg shadow-inner ${
                    timerExpired ? 'bg-red-50 text-red-700 animate-pulse' : 'bg-yellow-50 text-yellow-700'
                }`}>
                    {timerExpired ? "Session Expired!" : `Time Remaining: ${formatTime(timerSeconds)}`}
                </div>

                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md mb-4 text-sm flex items-center" role="alert">
                        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"></path></svg>
                        <span>{error}</span>
                    </div>
                )}
                {message && !error && (
                    <div className="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded-md mb-4 text-sm flex items-center" role="status">
                        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                        <span>{message}</span>
                    </div>
                )}

                {/* Conditional message for source token */}
                {location.search.includes('sourceToken') && !sourceToken && (
                    <div className="text-center text-yellow-600 font-semibold mb-4 text-sm">
                        Attempted to load with source token, but it was invalid or expired. Proceeding with direct registration.
                    </div>
                )}
                {!location.search.includes('sourceToken') && !sourceToken && (
                     <div className="text-center text-gray-600 font-semibold mb-4 text-sm">
                        No specific source detected. This is a direct registration.
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6" disabled={timerExpired || loading}>
                    {/* Personal Details Section */}
                    <div className="bg-gray-50 p-6 rounded-xl shadow-inner border border-gray-100">
                        <h3 className="text-xl font-semibold text-gray-800 mb-4">Personal Details</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First Name <span className="text-red-500">*</span></label>
                                <input type="text" name="firstName" id="firstName" required
                                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-base transition duration-150 ease-in-out"
                                    value={formData.firstName} onChange={handleChange} disabled={timerExpired || loading} />
                            </div>
                            <div>
                                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Last Name <span className="text-red-500">*</span></label>
                                <input type="text" name="lastName" id="lastName" required
                                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-base transition duration-150 ease-in-out"
                                    value={formData.lastName} onChange={handleChange} disabled={timerExpired || loading} />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email <span className="text-red-500">*</span></label>
                                <input type="email" name="email" id="email" required
                                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-base transition duration-150 ease-in-out"
                                    value={formData.email} onChange={handleChange} disabled={timerExpired || loading} />
                            </div>
                            <div>
                                <label htmlFor="mobileNumber" className="block text-sm font-medium text-gray-700">Mobile Number</label>
                                <input type="text" name="mobileNumber" id="mobileNumber"
                                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-base transition duration-150 ease-in-out"
                                    value={formData.mobileNumber} onChange={handleChange} disabled={timerExpired || loading} />
                            </div>
                        </div>
                    </div>

                    {/* Address Details */}
                    <div className="bg-gray-50 p-6 rounded-xl shadow-inner border border-gray-100">
                        <h3 className="text-xl font-semibold text-gray-800 mb-4">Address Details</h3>
                        <div>
                            <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
                            <input type="text" name="address" id="address"
                                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-base transition duration-150 ease-in-out"
                                value={formData.address} onChange={handleChange} disabled={timerExpired || loading} />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                                <div>
                                    <label htmlFor="state" className="block text-sm font-medium text-gray-700">State</label>
                                    <input type="text" name="state" id="state"
                                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-base transition duration-150 ease-in-out"
                                        value={formData.state} onChange={handleChange} disabled={timerExpired || loading} />
                                </div>
                                <div>
                                    <label htmlFor="country" className="block text-sm font-medium text-gray-700">Country</label>
                                    <input type="text" name="country" id="country"
                                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-base transition duration-150 ease-in-out"
                                        value={formData.country} onChange={handleChange} disabled={timerExpired || loading} />
                                </div>
                            </div>
                        </div>

                        {/* Professional Details */}
                        <div className="bg-gray-50 p-6 rounded-xl shadow-inner border border-gray-100">
                            <h3 className="text-xl font-semibold text-gray-800 mb-4">Professional Details</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="university" className="block text-sm font-medium text-gray-700">University</label>
                                    <input type="text" name="university" id="university"
                                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-base transition duration-150 ease-in-out"
                                        value={formData.university} onChange={handleChange} disabled={timerExpired || loading} />
                                </div>
                                <div>
                                    <label htmlFor="affiliation" className="block text-sm font-medium text-gray-700">Affiliation</label>
                                    <input type="text" name="affiliation" id="affiliation"
                                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-base transition duration-150 ease-in-out"
                                        value={formData.affiliation} onChange={handleChange} disabled={timerExpired || loading} />
                                </div>
                                <div>
                                    <label htmlFor="linkedin" className="block text-sm font-medium text-gray-700">LinkedIn Profile URL</label>
                                    <input type="url" name="linkedin" id="linkedin"
                                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-base transition duration-150 ease-in-out"
                                        value={formData.linkedin} onChange={handleChange} disabled={timerExpired || loading} />
                                </div>
                                <div>
                                    <label htmlFor="twitter" className="block text-sm font-medium text-gray-700">Twitter (X) Profile URL</label>
                                    <input type="url" name="twitter" id="twitter"
                                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-base transition duration-150 ease-in-out"
                                        value={formData.twitter} onChange={handleChange} disabled={timerExpired || loading} />
                                </div>
                            </div>
                        </div>

                        {/* Conference Details */}
                        <div className="bg-gray-50 p-6 rounded-xl shadow-inner border border-gray-100">
                            <h3 className="text-xl font-semibold text-gray-800 mb-4">Conference Details</h3>
                            <div>
                                <label htmlFor="abstractTitle" className="block text-sm font-medium text-gray-700">Abstract Title</label>
                                <input type="text" name="abstractTitle" id="abstractTitle"
                                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-base transition duration-150 ease-in-out"
                                    value={formData.abstractTitle} onChange={handleChange} disabled={timerExpired || loading} />
                            </div>
                            <div className="mt-6">
                                <label htmlFor="interest" className="block text-sm font-medium text-gray-700">Area of Interest</label>
                                <input type="text" name="interest" id="interest"
                                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-base transition duration-150 ease-in-out"
                                    value={formData.interest} onChange={handleChange} disabled={timerExpired || loading} />
                            </div>
                            {/* File Uploads (currently commented out as backend doesn't handle them directly) */}
                        </div>

                        {/* Plan Selection */}
                        <div className="bg-blue-50 p-6 rounded-xl shadow-inner border border-blue-100">
                            <h3 className="text-xl font-semibold text-blue-800 mb-4">Select Your Plan</h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div>
                                    <label htmlFor="type" className="block text-sm font-medium text-gray-700">Conference Type <span className="text-red-500">*</span></label>
                                    <select name="type" id="type" required
                                        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-base rounded-lg shadow-sm transition duration-150 ease-in-out"
                                        value={formData.type} onChange={handleChange} disabled={timerExpired || loading}>
                                        <option value="hybrid">Hybrid</option>
                                        <option value="webinar">Webinar</option>
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category <span className="text-red-500">*</span></label>
                                    <select name="category" id="category" required
                                        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-base rounded-lg shadow-sm transition duration-150 ease-in-out"
                                        value={formData.category} onChange={handleChange} disabled={timerExpired || loading}>
                                        <option value="academic">Academic</option>
                                        <option value="business">Business</option>
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="plan" className="block text-sm font-medium text-gray-700">Registration Plan <span className="text-red-500">*</span></label>
                                    <select name="plan" id="plan" required
                                        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-base rounded-lg shadow-sm transition duration-150 ease-in-out"
                                        value={formData.plan} onChange={handleChange} disabled={timerExpired || loading}>
                                        {/* Dynamically render options based on selected type and category */}
                                        {Object.keys(pricing[formData.type]?.[formData.category] || {}).map(p => (
                                            <option key={p} value={p}>{p}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className="text-right text-2xl font-extrabold text-blue-900 mt-6 p-2 bg-blue-100 rounded-lg shadow-md">
                                Total Amount: ${currentPrice.toFixed(2)} USD
                            </div>
                        </div>

                        {/* Submit Button */}
                        {!paypalOrderID && ( // Show submit button only if PayPal order hasn't been created yet
                            <button
                                type="submit"
                                disabled={loading || timerExpired || !sourceToken}
                                className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-lg text-lg font-bold text-white transition duration-300 ease-in-out transform hover:scale-[1.01] ${
                                    loading || timerExpired || !sourceToken ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500'
                                }`}
                            >
                                {loading ? 'Processing...' : (timerExpired ? 'Session Expired' : 'Proceed to Payment')}
                            </button>
                        )}
                    </form>

                    {/* PayPal Buttons (Conditional Rendering) */}
                    {paypalOrderID && (
                        <div className="mt-8 p-6 bg-blue-50 rounded-xl shadow-inner border border-blue-100">
                            <h3 className="text-xl font-semibold text-blue-800 mb-4 text-center">Complete your payment via PayPal</h3>
                            {/* IMPORTANT: Replace "YOUR_PAYPAL_CLIENT_ID_FROM_DOTENV_OR_SANDBOX" with your actual PayPal Sandbox Client ID */}
                            <PayPalScriptProvider options={{ "client-id": "YOUR_PAYPAL_CLIENT_ID_FROM_DOTENV_OR_SANDBOX", currency: "USD" }}>
                                <PayPalButtons
                                    style={{ layout: "vertical", color: "blue", shape: "rect", label: "paypal" }}
                                    createOrder={createOrder}
                                    onApprove={onApprove}
                                    onCancel={onCancel}
                                    onError={onError}
                                />
                            </PayPalScriptProvider>
                        </div>
                    )}
                </div>
            </div>
        );
    };

    export default RegistrationForm;
