// import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
// import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
// import { Link, useNavigate } from 'react-router-dom';
// import { AdjustmentsHorizontalIcon, CalendarIcon, MapPinIcon } from '@heroicons/react/24/outline';
// import MagneticButton from '../components/MagneticButton';
// import hybridsData from '../data/hybridsData1';
// import SEO from "../components/SEO";

// const ParticleTrail = ({ children }) => {
//     const [particles, setParticles] = useState([]);
//     const containerRef = useRef(null);
//     const nextParticleId = useRef(0);

//     const handleMouseMove = (e) => {
//         if (!containerRef.current) return;
//         const rect = containerRef.current.getBoundingClientRect();
//         const x = e.clientX - rect.left;
//         const y = e.clientY - rect.top;

//         setParticles(prevParticles => [
//             ...prevParticles,
//             { id: nextParticleId.current++, x, y, createdAt: Date.now() }
//         ]);
//     };

//     useEffect(() => {
//         const container = containerRef.current;
//         if (!container) return;

//         container.addEventListener('mousemove', handleMouseMove);

//         const cleanupInterval = setInterval(() => {
//             setParticles(prevParticles => {
//                 const now = Date.now();
//                 return prevParticles.filter(p => now - p.createdAt < 1500);
//             });
//         }, 100);

//         return () => {
//             container.removeEventListener('mousemove', handleMouseMove);
//             clearInterval(cleanupInterval);
//         };
//     }, []);

//     const particleVariants = {
//         initial: {
//             scale: 0,
//             opacity: 1,
//         },
//         animate: {
//             scale: [0, 1, 0.5],
//             opacity: [0.5, 1, 0],
//             transition: {
//                 duration: 1.5,
//                 ease: "easeOut",
//             },
//         },
//         exit: {
//             opacity: 0,
//             transition: { duration: 0.5 }
//         },
//     };

//     return (
//         <div ref={containerRef} className="relative w-full h-full">
//             <AnimatePresence>
//                 {particles.map(p => (
//                     <motion.div
//                         key={p.id}
//                         initial="initial"
//                         animate="animate"
//                         exit="exit"
//                         variants={particleVariants}
//                         className="absolute rounded-full pointer-events-none z-50"
//                         style={{
//                             left: p.x,
//                             top: p.y,
//                             width: '12px',
//                             height: '12px',
//                             transform: 'translate(-50%, -50%)',
//                             background: 'linear-gradient(to right, #FF70A6, #8D6EFB, #4FC4F6)'
//                         }}
//                     />
//                 ))}
//             </AnimatePresence>
//             {children}
//         </div>
//     );
// };

// // ---- Interactive Card Component (Refactored) ----
// const InteractiveCard = ({ event }) => {
//     const cardRef = useRef(null);
//     const x = useMotionValue(0);
//     const y = useMotionValue(0);
//     const [isLoadingToken, setIsLoadingToken] = useState(false);
//     const navigate = useNavigate();

//     const handleMouseMove = (e) => {
//         if (!cardRef.current) return;
//         const { top, left, width, height } = cardRef.current.getBoundingClientRect();
//         x.set((e.clientX - left) / width);
//         y.set((e.clientY - top) / height);
//     };

//     const handleMouseLeave = () => {
//         x.set(0.5);
//         y.set(0.5);
//     };

//     const rotateX = useTransform(y, [0, 1], [10, -10]);
//     const rotateY = useTransform(x, [0, 1], [-10, 10]);

//     const uniformSkew = {
//         skewX: -1.5,
//         skewY: 1.5,
//     };

//     const handleRegisterClick = useCallback(async () => {
//         setIsLoadingToken(true);
//         const sourceId = event.code || event.id;
//         const conferenceType = (event.type || 'hybrid').toLowerCase();

//         // --- FIX IS HERE: Use the event.year property directly instead of parsing the date string ---
//         const conferenceYear = event.year;

//         if (!sourceId) {
//             console.error("Missing sourceId for event:", event);
//             navigate('/registration?error=missing_event_data');
//             setIsLoadingToken(false);
//             return;
//         }

//         if (!conferenceYear) {
//             console.error("Missing conferenceYear for event:", event);
//             navigate('/registration?error=missing_year_data');
//             setIsLoadingToken(false);
//             return;
//         }

//         try {
//             const response = await fetch(`https://backend-code-6vqy.onrender.com/api/source/generate-token?sourceId=${sourceId}&conferenceType=${conferenceType}&conferenceYear=${conferenceYear}`);
//             // const response = await fetch(`http://localhost:5000/api/source/generate-token?sourceId=${sourceId}&conferenceType=${conferenceType}&conferenceYear=${conferenceYear}`);

//             if (!response.ok) {
//                 const errorData = await response.json();
//                 throw new Error(`Failed to fetch source token from backend: ${errorData.message || response.statusText}`);
//             }
//             const data = await response.json();
//             const token = data.token;

//             const encodedConferenceId = encodeURIComponent(sourceId);
//             const encodedConferenceName = encodeURIComponent(event.title || event.name || 'Untitled Conference');
//             const encodedConferenceDate = encodeURIComponent(event.date || '');

//             const registrationLink = `/registration?sourceToken=${encodeURIComponent(token)}&conferenceType=${conferenceType}&conferenceId=${encodedConferenceId}&conferenceName=${encodedConferenceName}&conferenceDate=${encodedConferenceDate}`;

//             navigate(registrationLink);
//         } catch (error) {
//             console.error("Error fetching token for event:", event.title || event.name, error);
//             navigate('/registration?error=token_failed');
//         } finally {
//             setIsLoadingToken(false);
//         }
//     }, [event, navigate]);

//     return (
//         <motion.div
//             ref={cardRef}
//             className="group relative h-96 w-full rounded-xl p-px transition-all duration-300"
//             onMouseMove={handleMouseMove}
//             onMouseLeave={handleMouseLeave}
//             whileHover={{ scale: 1.05 }}
//             initial={{ ...uniformSkew, perspective: 1000, transformStyle: 'preserve-3d' }}
//             style={{ rotateX, rotateY }}
//         >
//             <motion.div
//                 className="absolute inset-0 z-0 rounded-[11px] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
//                 style={{
//                     background: 'radial-gradient(150px circle at var(--x) var(--y), rgba(255, 105, 180, 0.4), transparent 80%)',
//                 }}
//                 onMouseMove={e => {
//                     const { clientX, clientY } = e;
//                     const { left, top } = e.currentTarget.getBoundingClientRect();
//                     e.currentTarget.style.setProperty("--x", `${clientX - left}px`);
//                     e.currentTarget.style.setProperty("--y", `${clientY - top}px`);
//                 }}
//             />
//             <div className="relative z-10 flex h-full flex-col overflow-hidden rounded-xl bg-white/70 p-4 backdrop-blur-lg">
//                 <div className="relative overflow-hidden rounded-lg mb-4 h-48">
//                     <img
//                         src={event.image}
//                         alt={event.title}
//                         loading="lazy"
//                         className="w-full h-full object-cover transition-transform duration-500 transform group-hover:scale-110"
//                     />
//                 </div>
//                 <h3 className="text-xl font-bold text-gray-800 mb-2">{event.title}</h3>
//                 <div className="flex items-center text-gray-700 mb-2">
//                     <CalendarIcon className="w-5 h-5 mr-2 text-blue-500" />
//                     <span>{event.date}</span>
//                 </div>
//                 <div className="flex items-center text-gray-700 mb-2">
//                     <MapPinIcon className="w-5 h-5 mr-2 text-purple-500" />
//                     <span>{event.location}</span>
//                 </div>
//                 {event.price && (
//                     <div className="flex items-center text-gray-700 font-semibold mb-4">
//                         <span className="text-lg text-green-600">${event.price}</span>
//                     </div>
//                 )}
//                 <div className="flex gap-2 mt-auto">
//                     {event.link && (
//                         <Link
//                             to={event.link}
//                             target="_blank"
//                             rel="noopener noreferrer"
//                             className="flex-1 text-center bg-primary hover:bg-primary-dark text-white font-bold py-2 px-6 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform active:scale-95 text-sm"
//                         >
//                             Visit Site
//                         </Link>
//                     )}
//                     <button
//                         onClick={handleRegisterClick}
//                         disabled={isLoadingToken}
//                         className={`flex-1 text-center font-bold py-2 px-6 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform active:scale-95 text-sm
//                             ${isLoadingToken ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-500 hover:bg-green-600 text-white'}
//                         `}
//                     >
//                         {isLoadingToken ? 'Loading...' : 'Register Now'}
//                     </button>
//                 </div>
//             </div>
//         </motion.div>
//     );
// };

// // ---- Main Page Component (Refactored) ----
// const Hybrids = () => {
//     const createSortableDate = (dateString) => {
//         if (!dateString) return new Date(0);
//         const cleanedDateString = dateString.replace(/-\d+/g, '').trim();
//         return new Date(cleanedDateString);
//     };

//     const allConferences = useMemo(() => {
//         const sortedData = [...hybridsData].sort((a, b) => {
//             const dateA = createSortableDate(a.date);
//             const dateB = createSortableDate(b.date);
//             return dateA - dateB;
//         });
//         return sortedData;
//     }, []);

//     const cardItemVariants = {
//         hidden: { opacity: 0, y: 50 },
//         visible: {
//             opacity: 1,
//             y: 0,
//             transition: {
//                 duration: 0.7,
//                 ease: "easeOut",
//             },
//         },
//     };

//     const seamlessIntegrationVariants = {
//         hidden: { opacity: 0, y: 50 },
//         visible: {
//             opacity: 1,
//             y: 0,
//             transition: {
//                 duration: 0.8,
//                 delay: 0.2,
//                 ease: "easeOut",
//             },
//         },
//     };

//     const [genericRegistrationLink, setGenericRegistrationLink] = useState('');
//     const [isGenericLoading, setIsGenericLoading] = useState(true);

//     useEffect(() => {
//         const fetchGenericToken = async () => {
//             setIsGenericLoading(true);
//             const genericSourceId = 'hybrids_page';
//             const genericConferenceType = 'hybrid';
//             const conferenceYear = new Date().getFullYear();

//             try {
//                 const response = await fetch(`https://backend-code-6vqy.onrender.com/api/source/generate-token?sourceId=${encodeURIComponent(genericSourceId)}&conferenceType=${genericConferenceType}&conferenceYear=${conferenceYear}`);
//                 // const response = await fetch(`http://localhost:5000/api/source/generate-token?sourceId=${encodeURIComponent(genericSourceId)}&conferenceType=${genericConferenceType}&conferenceYear=${conferenceYear}`);
//                 if (!response.ok) {
//                     const errorData = await response.json();
//                     throw new Error(`Failed to fetch generic source token: ${errorData.message || response.statusText}`);
//                 }
//                 const data = await response.json();
//                 const token = data.token;

//                 const registrationLink = `/registration?sourceToken=${encodeURIComponent(token)}&conferenceType=${genericConferenceType}&conferenceId=${encodeURIComponent(genericSourceId)}&conferenceName=${encodeURIComponent("Hybrid Conferences Page")}`;

//                 setGenericRegistrationLink(registrationLink);
//             } catch (error) {
//                 console.error("Error fetching generic hybrid token:", error);
//                 setGenericRegistrationLink('/registration?error=generic_token_failed');
//             } finally {
//                 setIsGenericLoading(false);
//             }
//         };

//         fetchGenericToken();
//     }, []);

//     return (
//         <div className="min-h-screen relative overflow-hidden text-white py-12 sm:py-20 px-4 sm:px-8 bg-gray-100">
//             <SEO
//   title="Hybrid Conferences & Events | Helix Conferences – Global Hybrid Summits, Webinars & Workshops"
//   description="Explore Helix Conferences' global hybrid events, including international conferences, webinars, workshops, expos, and exhibitions. Join top experts and innovators in agriculture, food sciences, technology, pharmaceuticals, biotechnology, medicine, healthcare, infectious diseases, cardiology, and cancer research."
//   keywords="hybrid conferences, global hybrid events, international hybrid summits, agriculture conferences, food sciences conferences, technology summits, pharmaceutical conclaves, biotechnology summits, medical conferences, healthcare summits, infectious disease conferences, cardiology events, cancer research summits, webinars, hybrid workshops, expos, exhibitions"
//   url="https://helixconferences.com/hybrids"
//   image="https://helixconferences.com/images/hybrid-events-banner.jpg"
//   canonical="https://helixconferences.com/hybrids"
//   schema={{
//     "@context": "https://schema.org",
//     "@graph": [
//       {
//         "@type": "Organization",
//         "@id": "https://helixconferences.com/#organization",
//         "name": "Helix Conferences",
//         "url": "https://helixconferences.com/",
//         "logo": "https://helixconferences.com/images/logo.png",
//         "sameAs": [
//           "https://www.facebook.com/HelixConferences",
//           "https://www.linkedin.com/company/helixconferences",
//           "https://x.com/HelixConfe69272",
//           "https://www.instagram.com/helix_conferences/",
//           "https://www.youtube.com/@Helixconferences"
//         ],
//         "description": "Helix Conferences organizes high-impact hybrid events, combining in-person and virtual experiences for international conferences, webinars, workshops, expos, and exhibitions.",
//         "foundingDate": "2010",
//         "founders": [{ "@type": "Person", "name": "Dr Surya Sarva" }],
//         "contactPoint": [{
//           "@type": "ContactPoint",
//           "telephone": "+1-757-656-7778",
//           "contactType": "Customer Service",
//           "areaServed": "Worldwide",
//           "availableLanguage": "English"
//         }]
//       },
//       {
//         "@type": "WebPage",
//         "@id": "https://helixconferences.com/hybrids/#webpage",
//         "url": "https://helixconferences.com/hybrids",
//         "name": "Hybrid Conferences & Events – Helix Conferences",
//         "description": "Discover Helix Conferences' global hybrid events across agriculture, food sciences, technology, pharmaceuticals, biotechnology, medicine, healthcare, infectious diseases, cardiology, and cancer research.",
//         "inLanguage": "en"
//       }
//     ]
//   }}
// />

//             <style>
//                 {`
//                 @keyframes hybrid-blend {
//                     0% { background-position: 0% 50%; }
//                     50% { background-position: 100% 50%; }
//                     100% { background-position: 0% 50%; }
//                 }
//                 `}
//             </style>
//             <div
//                 className="absolute inset-0 z-0 opacity-40"
//                 style={{
//                     background: 'linear-gradient(45deg, #FF69B4, #87CEEB, #9370DB, #FFD700)',
//                     backgroundSize: '400% 400%',
//                     animation: 'hybrid-blend 20s ease-in-out infinite alternate',
//                 }}
//             ></div>

//             <ParticleTrail>
//                 <div className="container mx-auto relative z-10">
//                     <h1 className="text-4xl md:text-5xl font-bold text-center mb-4 text-gray-900 animate-fade-in-up">
//                         Hybrid Conferences
//                     </h1>
//                     <p className="text-base sm:text-lg text-center mb-8 sm:mb-10 max-w-3xl mx-auto text-gray-700">
//                         Explore our collection of upcoming hybrid conferences, blending the best of in-person
//                         and virtual experiences for unparalleled engagement and networking.
//                     </p>

//                     {allConferences.length > 0 && (
//                         <>
//                             <h2 className="text-3xl md:text-4xl font-bold text-center mb-6 mt-8 sm:mt-12 text-gray-900">
//                                 All Upcoming Events
//                             </h2>
//                             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-10 mb-12 sm:mb-20">
//                                 {allConferences.map((event) => (
//                                     <motion.div
//                                         key={event.code || event.id}
//                                         variants={cardItemVariants}
//                                         initial="hidden"
//                                         whileInView="visible"
//                                         viewport={{ once: true, amount: 0.2 }}
//                                     >
//                                         <InteractiveCard event={event} />
//                                     </motion.div>
//                                 ))}
//                             </div>
//                         </>
//                     )}

//                     <motion.div
//                         variants={seamlessIntegrationVariants}
//                         initial="hidden"
//                         whileInView="visible"
//                         viewport={{ once: true, amount: 0.2 }}
//                         className="mt-8 sm:mt-12 bg-white/70 p-6 sm:p-8 rounded-xl shadow-lg backdrop-blur-sm border border-gray-200 text-center group"
//                     >
//                         <AdjustmentsHorizontalIcon className="w-10 h-10 sm:w-12 sm:h-12 text-primary mx-auto mb-4 sm:mb-6 transform transition-transform duration-300 group-hover:rotate-12" />
//                         <h2 className="text-2xl sm:text-3xl font-semibold mb-2 sm:mb-4 text-gray-900">Seamless Integration</h2>
//                         <p className="text-sm sm:text-lg text-gray-700 max-w-2xl mx-auto">
//                             Our hybrid model ensures a cohesive experience for all Eminent Speakers, regardless of their mode of participation.
//                             Cutting-edge technology facilitates smooth interactions between in-person and virtual audiences.
//                         </p>
//                         <Link to={genericRegistrationLink} className="inline-block mt-6 sm:mt-8">
//                             <MagneticButton className="bg-primary hover:bg-primary-dark text-white font-bold py-3 px-8 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform active:scale-95">
//                                 {isGenericLoading ? 'Loading...' : 'Register for a Hybrid Event'}
//                             </MagneticButton>
//                         </Link>
//                     </motion.div>
//                 </div>
//             </ParticleTrail>
//         </div>
//     );
// };

// export default Hybrids;

import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
} from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
} from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import {
  AdjustmentsHorizontalIcon,
  CalendarIcon,
  MapPinIcon,
} from "@heroicons/react/24/outline";
import MagneticButton from "../components/MagneticButton";
import hybridsData from "../data/hybridsData1";
import SEO from "../components/SEO";

const ParticleTrail = ({ children }) => {
  const [particles, setParticles] = useState([]);
  const containerRef = useRef(null);
  const nextParticleId = useRef(0);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setParticles((prevParticles) => [
      ...prevParticles,
      { id: nextParticleId.current++, x, y, createdAt: Date.now() },
    ]);
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.addEventListener("mousemove", handleMouseMove);

    const cleanupInterval = setInterval(() => {
      setParticles((prevParticles) => {
        const now = Date.now();
        return prevParticles.filter((p) => now - p.createdAt < 1500);
      });
    }, 100);

    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
      clearInterval(cleanupInterval);
    };
  }, []);

  const particleVariants = {
    initial: { scale: 0, opacity: 1 },
    animate: {
      scale: [0, 1, 0.5],
      opacity: [0.5, 1, 0],
      transition: { duration: 1.5, ease: "easeOut" },
    },
    exit: { opacity: 0, transition: { duration: 0.5 } },
  };

  return (
    <div ref={containerRef} className="relative w-full h-full">
      <AnimatePresence>
        {particles.map((p) => (
          <motion.div
            key={p.id}
            initial="initial"
            animate="animate"
            exit="exit"
            variants={particleVariants}
            className="absolute rounded-full pointer-events-none z-50"
            style={{
              left: p.x,
              top: p.y,
              width: "12px",
              height: "12px",
              transform: "translate(-50%, -50%)",
              background:
                "linear-gradient(to right, #FF70A6, #8D6EFB, #4FC4F6)",
            }}
          />
        ))}
      </AnimatePresence>
      {children}
    </div>
  );
};

const InteractiveCard = ({ event }) => {
  const cardRef = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const [isLoadingToken, setIsLoadingToken] = useState(false);
  const navigate = useNavigate();

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const { top, left, width, height } =
      cardRef.current.getBoundingClientRect();
    x.set((e.clientX - left) / width);
    y.set((e.clientY - top) / height);
  };

  const handleMouseLeave = () => {
    x.set(0.5);
    y.set(0.5);
  };

  const rotateX = useTransform(y, [0, 1], [10, -10]);
  const rotateY = useTransform(x, [0, 1], [-10, 10]);

  const uniformSkew = { skewX: -1.5, skewY: 1.5 };

  const handleRegisterClick = useCallback(async () => {
    setIsLoadingToken(true);
    const sourceId = event.code || event.id;
    const conferenceType = (event.type || "hybrid").toLowerCase();
    const conferenceYear = event.year;

    if (!sourceId) {
      console.error("Missing sourceId for event:", event);
      navigate("/registration?error=missing_event_data");
      setIsLoadingToken(false);
      return;
    }
    if (!conferenceYear) {
      console.error("Missing conferenceYear for event:", event);
      navigate("/registration?error=missing_year_data");
      setIsLoadingToken(false);
      return;
    }

    try {
      const response = await fetch(
        `https://backend-code-6vqy.onrender.com/api/source/generate-token?sourceId=${sourceId}&conferenceType=${conferenceType}&conferenceYear=${conferenceYear}`
      );
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          `Failed to fetch source token from backend: ${
            errorData.message || response.statusText
          }`
        );
      }
      const data = await response.json();
      const token = data.token;

      const encodedConferenceId = encodeURIComponent(sourceId);
      const encodedConferenceName = encodeURIComponent(
        event.title || event.name || "Untitled Conference"
      );
      const encodedConferenceDate = encodeURIComponent(event.date || "");

      const registrationLink = `/registration?sourceToken=${encodeURIComponent(
        token
      )}&conferenceType=${conferenceType}&conferenceId=${encodedConferenceId}&conferenceName=${encodedConferenceName}&conferenceDate=${encodedConferenceDate}`;

      navigate(registrationLink);
    } catch (error) {
      console.error(
        "Error fetching token for event:",
        event.title || event.name,
        error
      );
      navigate("/registration?error=token_failed");
    } finally {
      setIsLoadingToken(false);
    }
  }, [event, navigate]);

  return (
    <motion.div
      ref={cardRef}
      className="group relative h-96 w-full rounded-xl p-px transition-all duration-300"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.05 }}
      initial={{
        ...uniformSkew,
        perspective: 1000,
        transformStyle: "preserve-3d",
      }}
      style={{ rotateX, rotateY }}
    >
      <motion.div
        className="absolute inset-0 z-0 rounded-[11px] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(150px circle at var(--x) var(--y), rgba(255, 105, 180, 0.4), transparent 80%)",
        }}
        onMouseMove={(e) => {
          const { clientX, clientY } = e;
          const { left, top } = e.currentTarget.getBoundingClientRect();
          e.currentTarget.style.setProperty("--x", `${clientX - left}px`);
          e.currentTarget.style.setProperty("--y", `${clientY - top}px`);
        }}
      />
      <div className="relative z-10 flex h-full flex-col overflow-hidden rounded-xl bg-white/70 p-4 backdrop-blur-lg">
        <div className="relative overflow-hidden rounded-lg mb-4 h-48">
          <img
            src={event.image}
            alt={event.title}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-500 transform group-hover:scale-110"
          />
        </div>
        <h3 className="text-xl font-bold text-gray-800 mb-2">{event.title}</h3>
        <div className="flex items-center text-gray-700 mb-2">
          <CalendarIcon className="w-5 h-5 mr-2 text-blue-500" />
          <span>{event.date}</span>
        </div>
        <div className="flex items-center text-gray-700 mb-2">
          <MapPinIcon className="w-5 h-5 mr-2 text-purple-500" />
          <span>{event.location}</span>
        </div>
        {event.price && (
          <div className="flex items-center text-gray-700 font-semibold mb-4">
            <span className="text-lg text-green-600">${event.price}</span>
          </div>
        )}
        <div className="flex gap-2 mt-auto">
          {event.link && (
            <Link
              to={event.link}
              target="_blank"
              rel="noopener noreferrer"
              //   className="flex-1 text-center bg-primary hover:bg-primary-dark text-white font-bold py-2 px-6 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform active:scale-95 text-sm"
              className="text-gray-800 font-bold py-2 px-6 rounded-full border-2 border-transparent transition-all duration-300 transform hover:border-gray-800"
            >
              Visit Site
            </Link>
          )}
          <button
            onClick={handleRegisterClick}
            disabled={isLoadingToken}
            className={`flex-1 text-center font-bold py-2 px-6 rounded-full transition-all duration-300 transform active:scale-95 
    ${
      isLoadingToken
        ? "text-gray-400 border-2 border-gray-400 cursor-not-allowed"
        : "text-gray-800 border-2 border-transparent hover:border-gray-800"
    }
  `}
          >
            {isLoadingToken ? "Loading..." : "Register Now"}
          </button>
        </div>
      </div>
    </motion.div>
  );
};

const Hybrids = () => {
  const createSortableDate = (dateString) => {
    if (!dateString) return new Date(0);
    const cleanedDateString = dateString.replace(/-\d+/g, "").trim();
    return new Date(cleanedDateString);
  };

  // ✅ Group conferences by year
  const groupedConferences = useMemo(() => {
    const sortedData = [...hybridsData].sort((a, b) => {
      const dateA = createSortableDate(a.date);
      const dateB = createSortableDate(b.date);
      return dateA - dateB;
    });
    return sortedData.reduce((acc, event) => {
      const year =
        event.year || new Date(event.date).getFullYear() || "Unknown Year";
      if (!acc[year]) acc[year] = [];
      acc[year].push(event);
      return acc;
    }, {});
  }, []);

  const cardItemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: "easeOut" },
    },
  };

  const seamlessIntegrationVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, delay: 0.2, ease: "easeOut" },
    },
  };

  const [genericRegistrationLink, setGenericRegistrationLink] = useState("");
  const [isGenericLoading, setIsGenericLoading] = useState(true);

  useEffect(() => {
    const fetchGenericToken = async () => {
      setIsGenericLoading(true);
      const genericSourceId = "hybrids_page";
      const genericConferenceType = "hybrid";
      const conferenceYear = new Date().getFullYear();

      try {
        const response = await fetch(
          `https://backend-code-6vqy.onrender.com/api/source/generate-token?sourceId=${encodeURIComponent(
            genericSourceId
          )}&conferenceType=${genericConferenceType}&conferenceYear=${conferenceYear}`
        );
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(
            `Failed to fetch generic source token: ${
              errorData.message || response.statusText
            }`
          );
        }
        const data = await response.json();
        const token = data.token;
        const registrationLink = `/registration?sourceToken=${encodeURIComponent(
          token
        )}&conferenceType=${genericConferenceType}&conferenceId=${encodeURIComponent(
          genericSourceId
        )}&conferenceName=${encodeURIComponent("Hybrid Conferences Page")}`;
        setGenericRegistrationLink(registrationLink);
      } catch (error) {
        console.error("Error fetching generic hybrid token:", error);
        setGenericRegistrationLink("/registration?error=generic_token_failed");
      } finally {
        setIsGenericLoading(false);
      }
    };
    fetchGenericToken();
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden text-white py-12 sm:py-20 px-4 sm:px-8 bg-gray-100">
      <SEO
        title="Hybrid Conferences & Events | Helix Conferences – Global Hybrid Summits, Webinars & Workshops"
        description="Explore Helix Conferences' global hybrid events, including international conferences, webinars, workshops, expos, and exhibitions. Join top experts and innovators in agriculture, food sciences, technology, pharmaceuticals, biotechnology, medicine, healthcare, infectious diseases, cardiology, and cancer research."
        keywords="hybrid conferences, global hybrid events, international hybrid summits, agriculture conferences, food sciences conferences, technology summits, pharmaceutical conclaves, biotechnology summits, medical conferences, healthcare summits, infectious disease conferences, cardiology events, cancer research summits, webinars, hybrid workshops, expos, exhibitions"
        url="https://helixconferences.com/hybrids"
        image="https://helixconferences.com/images/hybrid-events-banner.jpg"
        canonical="https://helixconferences.com/hybrids"
        schema={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "Organization",
              "@id": "https://helixconferences.com/#organization",
              name: "Helix Conferences",
              url: "https://helixconferences.com/",
              logo: "https://helixconferences.com/images/logo.png",
              sameAs: [
                "https://www.facebook.com/HelixConferences",
                "https://www.linkedin.com/company/helixconferences",
                "https://x.com/HelixConfe69272",
                "https://www.instagram.com/helix_conferences/",
                "https://www.youtube.com/@Helixconferences",
              ],
              description:
                "Helix Conferences organizes high-impact hybrid events, combining in-person and virtual experiences for international conferences, webinars, workshops, expos, and exhibitions.",
              foundingDate: "2010",
              founders: [{ "@type": "Person", name: "Dr Surya Sarva" }],
              contactPoint: [
                {
                  "@type": "ContactPoint",
                  telephone: "+1-757-656-7778",
                  contactType: "Customer Service",
                  areaServed: "Worldwide",
                  availableLanguage: "English",
                },
              ],
            },
            {
              "@type": "WebPage",
              "@id": "https://helixconferences.com/hybrids/#webpage",
              url: "https://helixconferences.com/hybrids",
              name: "Hybrid Conferences & Events – Helix Conferences",
              description:
                "Discover Helix Conferences' global hybrid events across agriculture, food sciences, technology, pharmaceuticals, biotechnology, medicine, healthcare, infectious diseases, cardiology, and cancer research.",
              inLanguage: "en",
            },
          ],
        }}
      />

      <style>{`
                @keyframes hybrid-blend {
                    0% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                    100% { background-position: 0% 50%; }
                }
            `}</style>
      <div
        className="absolute inset-0 z-0 opacity-40"
        style={{
          background:
            "linear-gradient(45deg, #FF69B4, #87CEEB, #9370DB, #FFD700)",
          backgroundSize: "400% 400%",
          animation: "hybrid-blend 20s ease-in-out infinite alternate",
        }}
      ></div>

      <ParticleTrail>
        <div className="container mx-auto relative z-10">
          {/* ✅ Render by year */}
          {Object.keys(groupedConferences)
            .sort()
            .map((year) => (
              <div key={year} className="mb-12 sm:mb-20">
                <h1 className="text-5xl md:text-5xl font-bold text-center mb-12 text-gray-900">
                  Our <span className="text-amber-500">{year}</span> Hybrids
                </h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-10">
                  {groupedConferences[year].map((event) => (
                    <motion.div
                      key={event.code || event.id}
                      variants={cardItemVariants}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, amount: 0.2 }}
                    >
                      <InteractiveCard event={event} />
                    </motion.div>
                  ))}
                </div>
              </div>
            ))}

          <motion.div
            variants={seamlessIntegrationVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="mt-8 sm:mt-12 bg-white/70 p-6 sm:p-8 rounded-xl shadow-lg backdrop-blur-sm border border-gray-200 text-center group"
          >
            <AdjustmentsHorizontalIcon className="w-10 h-10 sm:w-12 sm:h-12 text-primary mx-auto mb-4 sm:mb-6 transform transition-transform duration-300 group-hover:rotate-12" />
            <h2 className="text-2xl sm:text-3xl font-semibold mb-2 sm:mb-4 text-gray-900">
              Seamless Integration
            </h2>
            <p className="text-sm sm:text-lg text-gray-700 max-w-2xl mx-auto">
              Our hybrid model ensures a cohesive experience for all Eminent
              Speakers.
            </p>
            <Link
              to={genericRegistrationLink}
              className="inline-block mt-6 sm:mt-8"
            >
              <MagneticButton className="bg-primary hover:bg-primary-dark text-white font-bold py-3 px-8 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform active:scale-95">
                {isGenericLoading
                  ? "Loading..."
                  : "Register for a Hybrid Event"}
              </MagneticButton>
            </Link>
          </motion.div>
        </div>
      </ParticleTrail>
    </div>
  );
};

export default Hybrids;
