import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';

// --- Local Storage Key for Multi-Step Form Data ---
const LOCAL_STORAGE_MULTI_STEP_FORM_KEY = 'multiStepFormData';

// --- Pricing Data (copied for client-side validation/display) ---
const pricing = {
    hybrid: {
        academic: {
            "e-Poster": 199.00, "Poster Presentation": 349.00, "Video Presentation": 449.00,
            "Virtual Presentation": 599.00, "Oral Presentation": 899.00, "Delegate": 349.00,
            "Suit - A (OP + 2N stay)": 1199.00, "Suit - B (OP + 3N stay)": 1399.00,
        },
        business: {
            "e-Poster": 249.00, "Poster Presentation": 399.00, "Video Presentation": 499.00,
            "Virtual Presentation": 649.00, "Oral Presentation": 999.00, "Delegate": 399.00,
            "Suit - A (OP + 2N stay)": 1399.00, "Suit - B (OP + 3N stay)": 1599.00,
        }
    },
    webinar: {
        academic: {
            "e-Poster": 149.00, "Video Presentation": 399.00, "Virtual Presentation": 499.00,
            "Delegate": 349.00,
        },
        business: {
            "e-Poster": 199.00, "Video Presentation": 499.00, "Virtual Presentation": 599.00,
            "Delegate": 449.00,
        }
    }
};

// --- Plan Details (copied for display) ---
const planDetails = {
    "e-Poster": ["Digital poster display", "Abstract publication", "Online networking opportunities"],
    "Poster Presentation": ["Physical poster display", "Abstract publication", "Access to all sessions", "Networking opportunities"],
    "Video Presentation": ["Pre-recorded video presentation slot", "Abstract publication", "Access to all sessions", "Certificate of presentation"],
    "Virtual Presentation": ["Live virtual presentation slot", "Abstract publication", "Full virtual access", "Digital certificate"],
    "Oral Presentation": ["Live oral presentation slot", "Abstract publication", "Full conference access", "Certificate of presentation", "Conference dinner"],
    "Delegate": ["Full conference access", "Networking sessions", "Conference kit", "Lunch & refreshments"],
    "Suit - A (OP + 2N stay)": ["Oral Presentation benefits", "2 nights hotel accommodation", "Airport transfers (optional)"],
    "Suit - B (OP + 3N stay)": ["Oral Presentation benefits", "3 nights hotel accommodation", "Airport transfers (optional)", "City tour (optional)"],
};

// --- Step Labels for Progress Bar ---
const stepLabels = [
    "Personal Info",
    "Address & Pro",
    "Plan & Conf",
    "Review & Submit"
];

// Custom Modal Component for Errors
const ErrorModal = ({ message, onClose }) => {
    const modalRef = useRef(null);

    useEffect(() => {
        if (message && modalRef.current) {
            gsap.fromTo(modalRef.current,
                { scale: 0.8, opacity: 0, y: -50 },
                { scale: 1, opacity: 1, y: 0, duration: 0.5, ease: "back.out(1.7)" }
            );
        }
    }, [message]);

    if (!message) return null;

    return (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50 p-4">
            <div ref={modalRef} className="bg-white rounded-xl shadow-2xl p-6 sm:p-8 w-full max-w-md">
                <div className="text-center">
                    <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100 animate-bounce-once">
                        <svg className="h-10 w-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
                        </svg>
                    </div>
                    <h3 className="mt-5 text-2xl leading-6 font-bold text-gray-900">Oops! Something went wrong.</h3>
                    <div className="mt-2">
                        <p className="text-lg text-gray-700">
                            {message}
                        </p>
                    </div>
                </div>
                <div className="mt-6 flex justify-center">
                    <button
                        type="button"
                        className="inline-flex justify-center rounded-md border border-transparent bg-red-600 px-6 py-3 text-lg font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition duration-150 ease-in-out"
                        onClick={onClose}
                    >
                        Got it!
                    </button>
                </div>
            </div>
        </div>
    );
};

// Animation variants for Framer Motion - MOVED OUTSIDE COMPONENT
const stepVariants = {
    hidden: { opacity: 0, x: 100 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } },
    exit: { opacity: 0, x: -100, transition: { duration: 0.5, ease: "easeIn" } },
};


const MultiStepForm = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        mobileNumber: '',
        address: '',
        state: '',
        country: '',
        university: '',
        affiliation: '',
        linkedin: '',
        twitter: '',
        abstractTitle: '',
        interest: '',
        // Fields for plan selection
        eventType: 'hybrid', // Default
        category: 'academic', // Default
        plan: '', // User selected plan
    });
    const [errors, setErrors] = useState({});
    const [generalError, setGeneralError] = useState(null);
    const [loading, setLoading] = useState(false);

    const formRef = useRef(null); // Ref for the current step's content area
    const progressBarRef = useRef(null); // Ref for the animated progress line (vertical)
    const trackRef = useRef(null); // Ref for the overall progress bar container (vertical)
    const nextButtonRef = useRef(null); // Ref for the Next/Complete Registration button

    const totalSteps = 4;
    const circleWidth = 32; // w-8 = 32px, adjusted to match reference image's smaller circles
    const circleRadius = circleWidth / 2; // 16px

    // GSAP animation for the vertical progress bar line
    useEffect(() => {
        if (progressBarRef.current && trackRef.current) {
            // Ensure trackRef.current has a height before calculating
            const containerHeight = trackRef.current.offsetHeight > 0 ? trackRef.current.offsetHeight : 300; // Fallback height
            const effectiveTrackHeight = containerHeight - (2 * circleRadius);
            const segmentCount = totalSteps - 1;
            const progressSegmentIndex = step - 1;

            const targetHeight = (progressSegmentIndex / segmentCount) * effectiveTrackHeight;

            gsap.to(progressBarRef.current, { height: `${targetHeight}px`, duration: 0.5, ease: "power2.out" });
        }
    }, [step, totalSteps, circleRadius]);

    // --- Load data from localStorage on component mount ---
    useEffect(() => {
        const savedData = localStorage.getItem(LOCAL_STORAGE_MULTI_STEP_FORM_KEY);
        if (savedData) {
            try {
                const parsedData = JSON.parse(savedData);
                setFormData(prevData => ({
                    ...prevData,
                    ...parsedData,
                    // Ensure plan is valid for loaded type/category, or reset
                    plan: (parsedData.eventType && parsedData.category && pricing[parsedData.eventType]?.[parsedData.category]?.[parsedData.plan])
                          ? parsedData.plan
                          : (pricing[parsedData.eventType]?.[parsedData.category] ? Object.keys(pricing[parsedData.eventType][parsedData.category])[0] : '')
                }));
            } catch (e) {
                console.error("Failed to parse multi-step form data from localStorage", e);
                localStorage.removeItem(LOCAL_STORAGE_MULTI_STEP_FORM_KEY);
            }
        }
    }, []);

    // --- Save data to localStorage whenever formData changes ---
    useEffect(() => {
        localStorage.setItem(LOCAL_STORAGE_MULTI_STEP_FORM_KEY, JSON.stringify(formData));
    }, [formData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => {
            const updatedData = { ...prevData, [name]: value };

            if (name === 'eventType' || name === 'category') {
                const newEventType = name === 'eventType' ? value : updatedData.eventType;
                const newCategory = name === 'category' ? value : updatedData.category;

                const availablePlans = pricing[newEventType]?.[newCategory];
                if (availablePlans && Object.keys(availablePlans).length > 0) {
                    if (!Object.keys(availablePlans).includes(updatedData.plan)) {
                        updatedData.plan = Object.keys(availablePlans)[0];
                    }
                } else {
                    updatedData.plan = '';
                }
            }
            return updatedData;
        });
        // Only clear error for the specific field being changed
        setErrors(prev => {
            const newErrors = { ...prev };
            if (newErrors[name]) {
                delete newErrors[name];
            }
            return newErrors;
        });
        if (generalError) {
            setGeneralError(null);
        }
    };

    const handlePlanSelect = (planName) => {
        setFormData(prevData => ({
            ...prevData,
            plan: planName
        }));
        if (errors.plan) {
            setErrors(prev => ({ ...prev, plan: undefined }));
        }
    };

    const validateStep = () => {
        const newErrors = {};
        let isValid = true;

        if (step === 1) {
            if (!formData.firstName.trim()) { newErrors.firstName = 'First Name is required'; isValid = false; }
            if (!formData.lastName.trim()) { newErrors.lastName = 'Last Name is required'; isValid = false; }
            if (!formData.email.trim()) { newErrors.email = 'Email is required'; isValid = false; }
            else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) { newErrors.email = 'Invalid email format'; isValid = false; }
            if (!formData.mobileNumber.trim()) { newErrors.mobileNumber = 'Mobile Number is required'; isValid = false; }
        } else if (step === 2) {
            if (!formData.country.trim()) { newErrors.country = 'Country is required'; isValid = false; }
        } else if (step === 3) {
            if (!formData.eventType) { newErrors.eventType = 'Conference Type is required'; isValid = false; }
            if (!formData.category) { newErrors.category = 'Category is required'; isValid = false; }
            if (!formData.plan) { newErrors.plan = 'Registration Plan is required'; isValid = false; }
        }
        setErrors(newErrors);
        return isValid;
    };

    const saveStepData = (currentStep, data) => {
        return new Promise(resolve => {
            console.log(`Simulating data submission for Step ${currentStep}:`, data);
            setTimeout(() => {
                resolve();
            }, 300);
        });
    };

    const nextStep = async () => {
        if (validateStep()) {
            setLoading(true);
            setGeneralError(null);
            await saveStepData(step, formData);
            setLoading(false);
            setStep(prevStep => prevStep + 1);
            setErrors({}); // Clear errors for the next step
            if (formRef.current) {
                formRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        } else {
            gsap.to(formRef.current, { x: -10, duration: 0.1, repeat: 5, yoyo: true, ease: "power1.inOut" });
            setGeneralError("Please fill in all required fields and correct any errors before proceeding.");
            if (nextButtonRef.current) {
                gsap.to(nextButtonRef.current, {
                    x: -5, // Small horizontal shake
                    duration: 0.05,
                    repeat: 3,
                    yoyo: true,
                    ease: "power1.inOut",
                    onComplete: () => gsap.set(nextButtonRef.current, { x: 0 }) // Reset position
                });
                gsap.fromTo(nextButtonRef.current,
                    { backgroundColor: '#EF4444' }, // accent-red
                    { backgroundColor: 'initial', duration: 0.4, ease: "power1.out" }
                );
            }
        }
    };

    const prevStep = () => {
        setStep(prevStep => prevStep - 1);
        setGeneralError(null);
        setErrors({});
        if (formRef.current) {
            formRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateStep()) {
            setLoading(true);
            setGeneralError(null);
            await saveStepData(step, formData);
            setLoading(false);

            // Corrected navigation path to /registration
            navigate('/registration', {
                state: {
                    prefillData: {
                        firstName: formData.firstName,
                        lastName: formData.lastName,
                        email: formData.email,
                        mobileNumber: formData.mobileNumber,
                        address: formData.address,
                        state: formData.state,
                        country: formData.country,
                        university: formData.university,
                        affiliation: formData.affiliation,
                        linkedin: formData.linkedin,
                        twitter: formData.twitter,
                        abstractTitle: formData.abstractTitle,
                        interest: formData.interest,
                        type: formData.eventType, // Pass eventType
                        category: formData.category, // Pass category
                        plan: formData.plan, // Pass selected plan
                    }
                }
            });
            localStorage.removeItem(LOCAL_STORAGE_MULTI_STEP_FORM_KEY);
        } else {
            gsap.to(formRef.current, { x: -10, duration: 0.1, repeat: 5, yoyo: true, ease: "power1.inOut" });
            setGeneralError('Please fill in all required fields and correct any errors before completing registration.');
            if (nextButtonRef.current) {
                gsap.to(nextButtonRef.current, {
                    x: -5, // Small horizontal shake
                    duration: 0.05,
                    repeat: 3,
                    yoyo: true,
                    ease: "power1.inOut",
                    onComplete: () => gsap.set(nextButtonRef.current, { x: 0 }) // Reset position
                });
                gsap.fromTo(nextButtonRef.current,
                    { backgroundColor: '#EF4444' }, // accent-red
                    { backgroundColor: 'initial', duration: 0.4, ease: "power1.out" }
                );
            }
        }
    };

    const renderStepContent = () => {
        switch (step) {
            case 1:
                return (
                    <div className="space-y-6">
                        <h3 className="text-2xl font-semibold text-text mb-4">Personal Details</h3>
                        <InputField label="First Name" name="firstName" value={formData.firstName} onChange={handleChange} error={errors.firstName} required disabled={loading} />
                        <InputField label="Last Name" name="lastName" value={formData.lastName} onChange={handleChange} error={errors.lastName} required disabled={loading} />
                        <InputField label="Email" name="email" value={formData.email} onChange={handleChange} error={errors.email} type="email" required disabled={loading} />
                        <InputField label="Mobile Number" name="mobileNumber" value={formData.mobileNumber} onChange={handleChange} error={errors.mobileNumber} required disabled={loading} />
                    </div>
                );
            case 2:
                return (
                    <div className="space-y-6">
                        <h3 className="text-2xl font-semibold text-text mt-16 mb-4">Address Details</h3>
                        <InputField label="Address" name="address" value={formData.address} onChange={handleChange} disabled={loading} />
                        <InputField label="State" name="state" value={formData.state} onChange={handleChange} disabled={loading} />
                        <InputField label="Country" name="country" value={formData.country} onChange={handleChange} error={errors.country} required disabled={loading} />
                        <h3 className="text-2xl font-semibold text-text mb-4 mt-8">Professional Details (Optional)</h3>
                        <InputField label="University" name="university" value={formData.university} onChange={handleChange} disabled={loading} />
                        <InputField label="Affiliation" name="affiliation" value={formData.affiliation} onChange={handleChange} disabled={loading} />
                        <InputField label="LinkedIn Profile URL" name="linkedin" value={formData.linkedin} onChange={handleChange} type="url" disabled={loading} />
                        <InputField label="Twitter (X) Profile URL" name="twitter" value={formData.twitter} onChange={handleChange} type="url" disabled={loading} />
                    </div>
                );
            case 3:
                return (
                    <div className="space-y-6">
                        <h3 className="text-2xl font-semibold text-text mb-4">Conference Details (Optional)</h3>
                        <InputField label="Abstract Title" name="abstractTitle" value={formData.abstractTitle} onChange={handleChange} disabled={loading} />
                        <InputField label="Area of Interest" name="interest" value={formData.interest} onChange={handleChange} disabled={loading} />

                        {/* Plan Selection */}
                        <div className="mt-8 p-6 bg-lightGray rounded-xl shadow-inner border border-gray-200">
                            <h3 className="text-xl font-semibold text-text mb-4">Select Your Plan <span className="text-accent-red">*</span></h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                <div>
                                    <label htmlFor="eventType" className="block text-sm font-medium text-text">Conference Type <span className="text-accent-red">*</span></label>
                                    <select name="eventType" id="eventType"
                                        className={`mt-1 block w-full pl-3 pr-10 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-primary-DEFAULT focus:border-primary-DEFAULT transition duration-150 ease-in-out bg-white text-text ${errors.eventType ? 'border-accent-red' : 'border-gray-300'}`}
                                        value={formData.eventType} onChange={handleChange} disabled={loading}>
                                        {Object.keys(pricing).map(typeKey => (
                                            <option key={typeKey} value={typeKey}>{typeKey.charAt(0).toUpperCase() + typeKey.slice(1)}</option>
                                        ))}
                                    </select>
                                    {errors.eventType && <p className="text-accent-red text-sm mt-1">{errors.eventType}</p>}
                                </div>
                                <div>
                                    <label htmlFor="category" className="block text-sm font-medium text-text">Category <span className="text-accent-red">*</span></label>
                                    <select name="category" id="category"
                                        className={`mt-1 block w-full pl-3 pr-10 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-primary-DEFAULT focus:border-primary-DEFAULT transition duration-150 ease-in-out bg-white text-text ${errors.category ? 'border-accent-red' : 'border-gray-300'}`}
                                        value={formData.category} onChange={handleChange} disabled={loading}>
                                        {Object.keys(pricing[formData.eventType] || {}).map(cat => (
                                            <option key={cat} value={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</option>
                                        ))}
                                    </select>
                                    {errors.category && <p className="text-accent-red text-sm mt-1">{errors.category}</p>}
                                </div>
                            </div>

                            <div className="mt-6">
                                <label className="block text-sm font-medium text-text mb-3">Choose your Registration Plan <span className="text-accent-red">*</span></label>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {Object.keys(pricing[formData.eventType]?.[formData.category] || {}).map(planName => (
                                        <motion.button
                                            key={planName}
                                            type="button"
                                            onClick={() => handlePlanSelect(planName)}
                                            disabled={loading}
                                            whileHover={{ scale: 1.03, boxShadow: "0 8px 20px rgba(0,0,0,0.15)" }}
                                            whileTap={{ scale: 0.98 }}
                                            className={`
                                                flex flex-col items-center justify-center p-4 rounded-xl border-2
                                                shadow-md transition-all duration-200 ease-in-out
                                                ${formData.plan === planName
                                                    ? 'bg-gradient-to-br from-primary-DEFAULT to-primary-light text-white border-primary-DEFAULT transform scale-105 shadow-lg'
                                                    : 'bg-white text-text border-gray-300 hover:bg-lightGray hover:border-primary-light'
                                                }
                                                ${loading ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'}
                                            `}
                                        >
                                            <span className="font-semibold text-lg text-center">{planName}</span>
                                            <span className={`text-2xl font-bold mt-1 ${formData.plan === planName ? 'text-accent-yellow' : 'text-primary-DEFAULT'}`}>
                                                ${pricing[formData.eventType][formData.category][planName].toFixed(2)}
                                            </span>
                                            {planDetails[planName] && (
                                                <ul className="text-sm mt-2 space-y-1 list-disc list-inside px-2 text-left w-full">
                                                    {planDetails[planName].map((detail, index) => (
                                                        <li key={index} className={formData.plan === planName ? 'text-white/90' : 'text-lightText'}>
                                                            {detail}
                                                        </li>
                                                    ))}
                                                </ul>
                                            )}
                                        </motion.button>
                                    ))}
                                    {Object.keys(pricing[formData.eventType]?.[formData.category] || {}).length === 0 && (
                                        <p className="col-span-full text-center text-gray-500">No plans available for this selection.</p>
                                    )}
                                </div>
                                {errors.plan && <p className="text-accent-red text-sm mt-1">{errors.plan}</p>}
                            </div>
                        </div>
                    </div>
                );
            case 4:
                return (
                    <div className="space-y-6">
                        <h3 className="text-2xl font-semibold text-text mb-4">Review Your Information</h3>
                        <div className="bg-lightGray p-6 rounded-xl shadow-inner border border-gray-200 space-y-3">
                            <ReviewField label="Name" value={`${formData.firstName} ${formData.lastName}`} />
                            <ReviewField label="Email" value={formData.email} />
                            <ReviewField label="Mobile" value={formData.mobileNumber} />
                            <ReviewField label="Address" value={`${formData.address}, ${formData.state}, ${formData.country}`} />
                            {formData.university && <ReviewField label="University" value={formData.university} />}
                            {formData.affiliation && <ReviewField label="Affiliation" value={formData.affiliation} />}
                            {formData.linkedin && <ReviewField label="LinkedIn" value={formData.linkedin} />}
                            {formData.twitter && <ReviewField label="Twitter" value={formData.twitter} />}
                            {formData.abstractTitle && <ReviewField label="Abstract Title" value={formData.abstractTitle} />}
                            {formData.interest && <ReviewField label="Area of Interest" value={formData.interest} />}
                            <hr className="border-gray-300 my-4" />
                            <p className="text-lg font-bold mt-4"><span className="font-semibold text-text">Conference Type:</span> {formData.eventType.charAt(0).toUpperCase() + formData.eventType.slice(1)}</p>
                            <p className="text-lg font-bold"><span className="font-semibold text-text">Category:</span> {formData.category.charAt(0).toUpperCase() + formData.category.slice(1)}</p>
                            <p className="text-xl font-extrabold text-primary-DEFAULT"><span className="font-semibold">Selected Plan:</span> {formData.plan} (<span className="text-accent-yellow">${pricing[formData.eventType]?.[formData.category]?.[formData.plan]?.toFixed(2) || '0.00'}</span>)</p>
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-primary-light to-secondary-DEFAULT flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8 font-inter antialiased overflow-hidden relative">
            

            {/* Main Form Container */}
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="relative z-10 bg-white rounded-3xl shadow-xl w-full max-w-6xl h-auto lg:h-[700px] flex flex-col lg:flex-row border border-gray-200"
            >
                {/* Left Sidebar for Progress Indicator */}
                <div className="w-full lg:w-1/3 xl:w-1/4 bg-lightGray p-6 rounded-t-3xl lg:rounded-l-3xl lg:rounded-tr-none lg:border-r border-gray-200 flex flex-col items-center justify-start shadow-inner lg:shadow-none">
                    <div className="flex flex-col items-center w-full">
                        {/* Title "Get a project quote" */}
                        <h2 className="text-2xl font-extrabold text-text text-center mb-2 tracking-tight">Secure Your Spot at Our Conference.</h2>
                        <p className="text-lightText text-sm text-center mb-8">
                            Provide your details to register and access all event benefits.<br/>
                            Feel free to add as much detail as needed.
                        </p>
                        
                        {/* Vertical Progress Indicator */}
                        <div ref={trackRef} className="relative flex flex-col items-start justify-between h-full min-h-[300px] py-4 w-full pl-6">
                            {/* Vertical Line Track - Adjusted for triple lines (visual effect) */}
                            <div className="absolute left-[36px] top-0 bottom-0 w-1 bg-gray-300 rounded-full"></div>
                            <div className="absolute left-[38px] top-0 bottom-0 w-1 bg-gray-300 rounded-full"></div>
                            <div className="absolute left-[40px] top-0 bottom-0 w-1 bg-gray-300 rounded-full"></div>
                            
                            {/* Animated Progress Line - Adjusted for triple lines */}
                            <div ref={progressBarRef} className="absolute left-[36px] bottom-0 w-1 bg-primary-DEFAULT rounded-full" style={{ height: '0%' }}></div>
                            <div className="absolute left-[38px] bottom-0 w-1 bg-primary-DEFAULT rounded-full" style={{ height: '0%' }} ref={el => el && gsap.set(el, { height: progressBarRef.current.style.height })}></div>
                            <div className="absolute left-[40px] bottom-0 w-1 bg-primary-DEFAULT rounded-full" style={{ height: '0%' }} ref={el => el && gsap.set(el, { height: progressBarRef.current.style.height })}></div>


                            {/* Circles and Labels */}
                            {[1, 2, 3, 4].map((s, index) => (
                                <div key={s} className="relative z-10 flex items-center mb-8 last:mb-0 group"> {/* Removed onClick */}
                                    <motion.div
                                        initial={{ scale: 1 }}
                                        animate={{ scale: s === step ? 1.2 : 1 }}
                                        transition={{ duration: 0.3, ease: "easeOut" }}
                                        className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-white transition-colors duration-300 shadow-md flex-shrink-0 ${
                                            s <= step ? 'bg-primary-DEFAULT' : 'bg-gray-300 group-hover:bg-gray-400'
                                        }`}
                                    >
                                        {s}
                                    </motion.div>
                                    <span className={`ml-4 text-lg font-medium transition-colors duration-300 ${s <= step ? 'text-text font-semibold' : 'text-lightText group-hover:text-text'}`}>
                                        {stepLabels[index]}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Content Area for Form Fields */}
                <div className="flex-grow p-6 sm:p-8 flex flex-col justify-between bg-white rounded-b-3xl lg:rounded-r-3xl lg:rounded-bl-none">
                    {/* General Error Message Displayed via Modal */}
                    {generalError && (
                        <ErrorModal message={generalError} onClose={() => setGeneralError(null)} />
                    )}

                    {/* Form Content Area - Now uses a ref for shake animation and scroll */}
                    <div ref={formRef} className="flex-grow bg-white p-6 rounded-xl min-h-[400px] flex items-center justify-center overflow-y-auto">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={step}
                                variants={stepVariants}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                className="w-full"
                            >
                                {renderStepContent()}
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Navigation Buttons */}
                    <div className="mt-8 flex justify-between items-center">
                        {step > 1 && (
                            <motion.button
                                type="button"
                                onClick={prevStep}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className={`bg-gray-300 text-text px-6 py-3 rounded-lg font-semibold shadow-md border border-gray-400 transition duration-150 ease-in-out ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                                disabled={loading}
                            >
                                Previous step
                            </motion.button>
                        )}

                        {step < totalSteps ? (
                            <motion.button
                                type="button"
                                onClick={nextStep}
                                disabled={loading}
                                ref={nextButtonRef}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className={`px-8 py-3 rounded-lg font-bold text-white shadow-lg border border-primary-dark transition duration-150 ease-in-out transform ${
                                    loading ? 'bg-gray-400 text-gray-600 cursor-not-allowed' : 'bg-gradient-to-r from-primary-DEFAULT to-primary-light hover:from-primary-dark hover:to-primary-DEFAULT'
                                }`}
                            >
                                {loading ? (
                                    <svg className="animate-spin h-5 w-5 text-white inline-block mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                ) : null}
                                {loading ? 'Processing...' : 'Next step'}
                            </motion.button>
                        ) : (
                            <motion.button
                                type="button"
                                onClick={handleSubmit}
                                disabled={loading}
                                ref={nextButtonRef}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className={`px-8 py-3 rounded-lg font-bold text-white shadow-lg border border-primary-dark transition duration-300 ease-in-out transform ${
                                    loading ? 'bg-gray-400 text-gray-600 cursor-not-allowed' : 'bg-gradient-to-r from-primary-DEFAULT to-primary-light hover:from-primary-dark hover:to-primary-DEFAULT'
                                }`}
                            >
                                {loading ? (
                                    <svg className="animate-spin h-5 w-5 text-white inline-block mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                ) : null}
                                {loading ? 'Submitting...' : 'Complete Registration'}
                            </motion.button>
                        )}
                    </div>
                </div>
            </motion.div>
            {/* Custom CSS for blob animation and animation delay */}
            <style jsx>{`
                @keyframes blob {
                    0% {
                        transform: translate(0, 0) scale(1);
                    }
                    33% {
                        transform: translate(30px, -50px) scale(1.1);
                    }
                    66% {
                        transform: translate(-20px, 20px) scale(0.9);
                    }
                    100% {
                        transform: translate(0, 0) scale(1);
                    }
                }

                .animate-blob {
                    animation: blob 7s infinite cubic-bezier(0.6, 0.01, 0.3, 0.9);
                }

                .animation-delay-2000 {
                    animation-delay: 2s;
                }

                .animation-delay-4000 {
                    animation-delay: 4s;
                }
            `}</style>
        </div>
    );
};

// Reusable InputField Component for cleaner JSX
const InputField = ({ label, name, value, onChange, error, type = "text", required = false, disabled = false }) => (
    <div>
        <label htmlFor={name} className="block text-sm font-medium text-text"> {/* Changed to text-text (black) */}
            {label} {required && <span className="text-accent-red">*</span>}
        </label>
        <input
            type={type}
            name={name}
            id={name}
            className={`mt-1 block w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-primary-DEFAULT focus:border-primary-DEFAULT transition duration-150 ease-in-out bg-white text-text ${error ? 'border-accent-red' : 'border-gray-300'}`} 
            value={value}
            onChange={onChange}
            disabled={disabled}
        />
        {error && <p className="text-accent-red text-sm mt-1">{error}</p>}
    </div>
);

// Reusable ReviewField Component for cleaner JSX
const ReviewField = ({ label, value }) => (
    <p><span className="font-semibold text-text">{label}:</span> {value}</p>
);

export default MultiStepForm;
