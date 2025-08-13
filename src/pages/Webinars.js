// import React, {
//   useState,
//   useEffect,
//   useRef,
//   useMemo,
//   useCallback,
// } from "react";
// import {
//   motion,
//   AnimatePresence,
//   useMotionValue,
//   useTransform,
// } from "framer-motion";
// import { useNavigate } from "react-router-dom";
// import {
//   AdjustmentsHorizontalIcon,
//   CalendarIcon,
//   MapPinIcon,
// } from "@heroicons/react/24/outline";
// import MagneticButton from "../components/MagneticButton";
// import webinarsData from "../data/webinarsData1";
// import SEO from "../components/SEO";

// const ParticleTrail = ({ children }) => {
//   const [particles, setParticles] = useState([]);
//   const containerRef = useRef(null);
//   const nextParticleId = useRef(0);

//   const handleMouseMove = (e) => {
//     if (!containerRef.current) return;
//     const rect = containerRef.current.getBoundingClientRect();
//     const x = e.clientX - rect.left;
//     const y = e.clientY - rect.top;

//     setParticles((prevParticles) => [
//       ...prevParticles,
//       { id: nextParticleId.current++, x, y, createdAt: Date.now() },
//     ]);
//   };

//   useEffect(() => {
//     const container = containerRef.current;
//     if (!container) return;

//     container.addEventListener("mousemove", handleMouseMove);

//     const cleanupInterval = setInterval(() => {
//       setParticles((prevParticles) => {
//         const now = Date.now();
//         return prevParticles.filter((p) => now - p.createdAt < 1500);
//       });
//     }, 100);

//     return () => {
//       container.removeEventListener("mousemove", handleMouseMove);
//       clearInterval(cleanupInterval);
//     };
//   }, []);

//   const particleVariants = {
//     initial: {
//       scale: 0,
//       opacity: 1,
//     },
//     animate: {
//       scale: [0, 1, 0.5],
//       opacity: [0.5, 1, 0],
//       transition: {
//         duration: 1.5,
//         ease: "easeOut",
//       },
//     },
//     exit: {
//       opacity: 0,
//       transition: { duration: 0.5 },
//     },
//   };

//   return (
//     <div ref={containerRef} className="relative w-full h-full">
//       <AnimatePresence>
//         {particles.map((p) => (
//           <motion.div
//             key={p.id}
//             initial="initial"
//             animate="animate"
//             exit="exit"
//             variants={particleVariants}
//             className="absolute rounded-full pointer-events-none z-50"
//             style={{
//               left: p.x,
//               top: p.y,
//               width: "12px",
//               height: "12px",
//               transform: "translate(-50%, -50%)",
//               background:
//                 "linear-gradient(to right, #6EE7B7, #3B82F6, #9333EA)",
//             }}
//           />
//         ))}
//       </AnimatePresence>
//       {children}
//     </div>
//   );
// };

// const InteractiveWebinarCard = ({ webinar }) => {
//   const cardRef = useRef(null);
//   const x = useMotionValue(0);
//   const y = useMotionValue(0);
//   const [isLoadingToken, setIsLoadingToken] = useState(false);
//   const navigate = useNavigate();

//   const handleMouseMove = (e) => {
//     if (!cardRef.current) return;
//     const { top, left, width, height } =
//       cardRef.current.getBoundingClientRect();
//     x.set((e.clientX - left) / width);
//     y.set((e.clientY - top) / height);
//   };

//   const handleMouseLeave = () => {
//     x.set(0.5);
//     y.set(0.5);
//   };

//   const rotateX = useTransform(y, [0, 1], [10, -10]);
//   const rotateY = useTransform(x, [0, 1], [-10, 10]);

//   const uniformSkew = {
//     skewX: -1.5,
//     skewY: 1.5,
//   };

//   const handleRegisterClick = useCallback(async () => {
//     setIsLoadingToken(true);
//     const sourceId = webinar.code || webinar.id;
//     const conferenceType = webinar.type || "webinar";

//     // --- FIX IS HERE: Use the webinar.year property directly instead of parsing the date string ---
//     const conferenceYear = webinar.year;

//     if (!sourceId) {
//       console.error("Missing sourceId for webinar:", webinar);
//       navigate("/registration?error=missing_event_data");
//       setIsLoadingToken(false);
//       return;
//     }

//     if (!conferenceYear) {
//       console.error("Missing conferenceYear for webinar:", webinar);
//       navigate("/registration?error=missing_year_data");
//       setIsLoadingToken(false);
//       return;
//     }

//     try {
//       const response = await fetch(
//         `https://backend-code-6vqy.onrender.com/api/source/generate-token?sourceId=${sourceId}&conferenceType=${conferenceType}&conferenceYear=${conferenceYear}`
//       );
//       // const response = await fetch(`http://localhost:5000/api/source/generate-token?sourceId=${sourceId}&conferenceType=${conferenceType}&conferenceYear=${conferenceYear}`);
//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(
//           `Failed to fetch source token from backend: ${
//             errorData.message || response.statusText
//           }`
//         );
//       }
//       const data = await response.json();
//       const token = data.token;

//       const encodedConferenceId = encodeURIComponent(sourceId);
//       const encodedConferenceName = encodeURIComponent(
//         webinar.title || webinar.name || "Untitled Webinar"
//       );
//       const encodedConferenceDate = encodeURIComponent(webinar.date || "");

//       const registrationLink = `/registration?sourceToken=${encodeURIComponent(
//         token
//       )}&conferenceType=${conferenceType}&conferenceId=${encodedConferenceId}&conferenceName=${encodedConferenceName}&conferenceDate=${encodedConferenceDate}`;

//       navigate(registrationLink);
//     } catch (error) {
//       console.error(
//         "Error fetching token for webinar:",
//         webinar.title || webinar.name,
//         error
//       );
//       navigate("/registration?error=token_failed");
//     } finally {
//       setIsLoadingToken(false);
//     }
//   }, [webinar, navigate]);

//   return (
//     <motion.div
//       ref={cardRef}
//       className="group relative h-96 w-full rounded-xl p-px transition-all duration-300"
//       onMouseMove={handleMouseMove}
//       onMouseLeave={handleMouseLeave}
//       whileHover={{ scale: 1.05 }}
//       initial={{
//         ...uniformSkew,
//         perspective: 1000,
//         transformStyle: "preserve-3d",
//       }}
//       style={{ rotateX, rotateY }}
//     >
//       <motion.div
//         className="absolute inset-0 z-0 rounded-[11px] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
//         style={{
//           background:
//             "radial-gradient(150px circle at var(--x) var(--y), rgba(100, 149, 237, 0.4), transparent 80%)",
//         }}
//         onMouseMove={(e) => {
//           const { clientX, clientY } = e;
//           const { left, top } = e.currentTarget.getBoundingClientRect();
//           e.currentTarget.style.setProperty("--x", `${clientX - left}px`);
//           e.currentTarget.style.setProperty("--y", `${clientY - top}px`);
//         }}
//       />
//       <div className="relative z-10 flex h-full flex-col overflow-hidden rounded-xl bg-white/70 p-4 backdrop-blur-lg">
//         <div className="relative overflow-hidden rounded-lg mb-4 h-48">
//           <img
//             src={webinar.image}
//             alt={webinar.title}
//             loading="lazy"
//             className="w-full h-full object-cover transition-transform duration-500 transform group-hover:scale-110"
//           />
//         </div>
//         <h3 className="text-xl font-bold text-gray-800 mb-2">
//           {webinar.title}
//         </h3>
//         <div className="flex items-center text-gray-700 mb-2">
//           <CalendarIcon className="w-5 h-5 mr-2 text-blue-500" />
//           <span>{webinar.date}</span>
//         </div>
//         <div className="flex items-center text-gray-700 mb-4">
//           <MapPinIcon className="w-5 h-5 mr-2 text-purple-500" />
//           <span>{webinar.location || "Online"}</span>
//         </div>
//         <div className="flex gap-2 mt-auto">
//           {webinar.link && (
//             <a
//               href={webinar.link}
//               target="_blank"
//               rel="noopener noreferrer"
//               className="flex-1 text-center bg-primary hover:bg-primary-dark text-white font-bold py-2 px-6 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform active:scale-95 text-sm"
//             >
//               Visit Site
//             </a>
//           )}
//           <button
//             onClick={handleRegisterClick}
//             disabled={isLoadingToken}
//             className={`flex-1 text-center font-bold py-2 px-6 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform active:scale-95 text-sm
//                             ${
//                               isLoadingToken
//                                 ? "bg-gray-400 cursor-not-allowed"
//                                 : "bg-green-500 hover:bg-green-600 text-white"
//                             }
//                         `}
//           >
//             {isLoadingToken ? "Loading..." : "Register Now"}
//           </button>
//         </div>
//       </div>
//     </motion.div>
//   );
// };

// const Webinars = () => {
//   // Helper function to create a sortable date from the date string
//   const createSortableDate = (dateString) => {
//     if (!dateString) return new Date(0); // Return a very old date for items with no date
//     // Remove the hyphenated day range and parse the rest of the string
//     const cleanedDateString = dateString.replace(/-\d+/g, "").trim();
//     return new Date(cleanedDateString);
//   };

//   const allWebinars = useMemo(() => {
//     const sortedData = [...webinarsData].sort((a, b) => {
//       const dateA = createSortableDate(a.date);
//       const dateB = createSortableDate(b.date);
//       return dateA - dateB;
//     });
//     return sortedData;
//   }, []);

//   const cardItemVariants = {
//     hidden: { opacity: 0, y: 50 },
//     visible: {
//       opacity: 1,
//       y: 0,
//       transition: {
//         duration: 0.7,
//         ease: "easeOut",
//       },
//     },
//   };

//   const seamlessIntegrationVariants = {
//     hidden: { opacity: 0, y: 50 },
//     visible: {
//       opacity: 1,
//       y: 0,
//       transition: {
//         duration: 0.8,
//         delay: 0.2,
//         ease: "easeOut",
//       },
//     },
//   };

//   const [isGenericLoading, setIsGenericLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleGenericRegisterClick = useCallback(async () => {
//     setIsGenericLoading(true);
//     const genericSourceId = "webinars_page";
//     const genericConferenceType = "webinar";
//     const conferenceYear = new Date().getFullYear();

//     try {
//       const response = await fetch(
//         `https://backend-code-6vqy.onrender.com/api/source/generate-token?sourceId=${genericSourceId}&conferenceType=${genericConferenceType}&conferenceYear=${conferenceYear}`
//       );
//       // const response = await fetch(`http://localhost:5000/api/source/generate-token?sourceId=${genericSourceId}&conferenceType=${genericConferenceType}&conferenceYear=${conferenceYear}`);
//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(
//           `Failed to fetch generic source token: ${
//             errorData.message || response.statusText
//           }`
//         );
//       }
//       const data = await response.json();
//       const token = data.token;

//       const registrationLink = `/registration?sourceToken=${encodeURIComponent(
//         token
//       )}&conferenceType=${genericConferenceType}&conferenceId=${encodeURIComponent(
//         genericSourceId
//       )}&conferenceName=${encodeURIComponent("Webinar Collection Page")}`;

//       navigate(registrationLink);
//     } catch (error) {
//       console.error("Error fetching generic webinar token:", error);
//       navigate("/registration?error=generic_token_failed");
//     } finally {
//       setIsGenericLoading(false);
//     }
//   }, [navigate]);

//   return (
//     <div className="min-h-screen relative overflow-hidden text-white py-12 sm:py-20 px-4 sm:px-8 bg-gray-100">
//       <SEO
//         title="Webinars & Virtual Conferences | Helix Conferences – Global Online Summits, Workshops & Scientific Events"
//         description="Join Helix Conferences' global webinars and virtual events, including international scientific conferences, workshops, and summits across dentistry, oral medicine, graphene, nanotechnology, autism, neuropsychiatry, AI, robotics, metaverse, women empowerment, sustainability, nano engineering, smart technology, healthcare, emergency medicine, stroke care, agriculture, environmental sciences, plant biology, biotechnology, genomics, molecular biology, science, engineering, materials science, artificial intelligence, machine learning, drug design, pharmacology, and clinical trials."
//         keywords="webinars, virtual conferences, online summits, international webinars, dentistry webinars, oral medicine conferences, graphene technology webinars, nanotechnology events, autism conferences, neuropsychiatry summits, AI webinars, robotics webinars, metaverse events, women empowerment conferences, sustainability summits, nano engineering webinars, smart technology events, healthcare webinars, emergency medicine conferences, stroke congress, agriculture webinars, environmental science conferences, plant biology summits, biotechnology webinars, genomics webinars, molecular biology conferences, science and engineering webinars, materials science webinars, AI and machine learning events, drug design webinars, pharmacology conferences, clinical trials webinars"
//         url="https://helixconferences.com/webinars"
//         image="https://helixconferences.com/images/webinars-banner.jpg"
//         canonical="https://helixconferences.com/webinars"
//         schema={{
//           "@context": "https://schema.org",
//           "@graph": [
//             {
//               "@type": "Organization",
//               "@id": "https://helixconferences.com/#organization",
//               name: "Helix Conferences",
//               url: "https://helixconferences.com/",
//               logo: "https://helixconferences.com/images/logo.png",
//               sameAs: [
//                 "https://www.facebook.com/HelixConferences",
//                 "https://www.linkedin.com/company/helixconferences",
//                 "https://x.com/HelixConfe69272",
//                 "https://www.instagram.com/helix_conferences/",
//                 "https://www.youtube.com/@Helixconferences",
//               ],
//               description:
//                 "Helix Conferences organizes high-impact webinars and virtual events across diverse scientific, medical, and technological fields, connecting global experts and innovators.",
//               foundingDate: "2010",
//               founders: [{ "@type": "Person", name: "Dr Surya Sarva" }],
//               contactPoint: [
//                 {
//                   "@type": "ContactPoint",
//                   telephone: "+1-757-656-7778",
//                   contactType: "Customer Service",
//                   areaServed: "Worldwide",
//                   availableLanguage: "English",
//                 },
//               ],
//             },
//             {
//               "@type": "WebPage",
//               "@id": "https://helixconferences.com/webinars/#webpage",
//               url: "https://helixconferences.com/webinars",
//               name: "Webinars & Virtual Conferences – Helix Conferences",
//               description:
//                 "Discover Helix Conferences' global webinars and online events across dentistry, nanotechnology, AI, healthcare, agriculture, biotechnology, pharmacology, and more.",
//               inLanguage: "en",
//             },
//           ],
//         }}
//       />

//       <style>{`
//                 @keyframes webinar-blend {
//                     0% { background-position: 0% 50%; }
//                     50% { background-position: 100% 50%; }
//                     100% { background-position: 0% 50%; }
//                 }
//             `}</style>
//       <div
//         className="absolute inset-0 z-0 opacity-40"
//         style={{
//           background:
//             "linear-gradient(45deg, #ADD8E6, #87CEFA, #4682B4, #6A5ACD)",
//           backgroundSize: "400% 400%",
//           animation: "webinar-blend 20s ease-in-out infinite alternate",
//         }}
//       ></div>
//       <ParticleTrail>
//         <div className="container mx-auto relative z-10">
//           <h1 className="text-4xl md:text-5xl font-bold text-center mb-4 text-gray-900 animate-fade-in-up">
//             Webinar Conferences
//           </h1>
//           <p className="text-base sm:text-lg text-center mb-8 sm:mb-10 max-w-3xl mx-auto text-gray-700">
//             Join our expert-led online sessions from anywhere in the world,
//             offering in-depth insights and interactive learning.
//           </p>
//           {allWebinars.length > 0 && (
//             <>
//               <h2 className="text-3xl md:text-4xl font-bold text-center mb-6 mt-8 sm:mt-12 text-gray-900">
//                 All Upcoming Webinars
//               </h2>
//               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-10 mb-12 sm:mb-20">
//                 {allWebinars.map((webinar) => (
//                   <motion.div
//                     key={webinar.code || webinar.id}
//                     variants={cardItemVariants}
//                     initial="hidden"
//                     whileInView="visible"
//                     viewport={{ once: true, amount: 0.2 }}
//                   >
//                     <InteractiveWebinarCard webinar={webinar} />
//                   </motion.div>
//                 ))}
//               </div>
//             </>
//           )}
//           <motion.div
//             variants={seamlessIntegrationVariants}
//             initial="hidden"
//             whileInView="visible"
//             viewport={{ once: true, amount: 0.2 }}
//             className="mt-8 sm:mt-12 bg-white/70 p-6 sm:p-8 rounded-xl shadow-lg backdrop-blur-sm border border-gray-200 text-center group"
//           >
//             <AdjustmentsHorizontalIcon className="w-10 h-10 sm:w-12 sm:h-12 text-primary mx-auto mb-4 sm:mb-6 transform transition-transform duration-300 group-hover:rotate-12" />
//             <h2 className="text-2xl sm:text-3xl font-semibold mb-2 sm:mb-4 text-gray-900">
//               Engage from Anywhere
//             </h2>
//             <p className="text-sm sm:text-lg text-gray-700 max-w-2xl mx-auto">
//               Our webinars are designed for maximum accessibility, allowing you
//               to participate in live Q&A sessions and network with peers
//               globally.
//             </p>
//             <button
//               onClick={handleGenericRegisterClick}
//               disabled={isGenericLoading}
//               className="inline-block mt-6 sm:mt-8"
//             >
//               <MagneticButton className="bg-primary hover:bg-primary-dark text-white font-bold py-3 px-8 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform active:scale-95">
//                 {isGenericLoading
//                   ? "Loading..."
//                   : "Register for a Webinar Event"}
//               </MagneticButton>
//             </button>
//           </motion.div>
//         </div>
//       </ParticleTrail>
//     </div>
//   );
// };

// export default Webinars;


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
import webinarsData from "../data/webinarsData1";
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
                "linear-gradient(to right, #6EE7B7, #3B82F6, #9333EA)",
            }}
          />
        ))}
      </AnimatePresence>
      {children}
    </div>
  );
};

const InteractiveWebinarCard = ({ webinar }) => {
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
    const sourceId = webinar.code || webinar.id;
    const conferenceType = (webinar.type || "webinar").toLowerCase();
    const conferenceYear = webinar.year;

    if (!sourceId) {
      console.error("Missing sourceId for webinar:", webinar);
      navigate("/registration?error=missing_event_data");
      setIsLoadingToken(false);
      return;
    }
    if (!conferenceYear) {
      console.error("Missing conferenceYear for webinar:", webinar);
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
        webinar.title || webinar.name || "Untitled Webinar"
      );
      const encodedConferenceDate = encodeURIComponent(webinar.date || "");

      const registrationLink = `/registration?sourceToken=${encodeURIComponent(
        token
      )}&conferenceType=${conferenceType}&conferenceId=${encodedConferenceId}&conferenceName=${encodedConferenceName}&conferenceDate=${encodedConferenceDate}`;

      navigate(registrationLink);
    } catch (error) {
      console.error(
        "Error fetching token for webinar:",
        webinar.title || webinar.name,
        error
      );
      navigate("/registration?error=token_failed");
    } finally {
      setIsLoadingToken(false);
    }
  }, [webinar, navigate]);

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
            "radial-gradient(150px circle at var(--x) var(--y), rgba(100, 149, 237, 0.4), transparent 80%)",
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
            src={webinar.image}
            alt={webinar.title}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-500 transform group-hover:scale-110"
          />
        </div>
        <h3 className="text-xl font-bold text-gray-800 mb-2">{webinar.title}</h3>
        <div className="flex items-center text-gray-700 mb-2">
          <CalendarIcon className="w-5 h-5 mr-2 text-blue-500" />
          <span>{webinar.date}</span>
        </div>
        <div className="flex items-center text-gray-700 mb-2">
          <MapPinIcon className="w-5 h-5 mr-2 text-purple-500" />
          <span>{webinar.location || "Webinar"}</span>
        </div>
        {webinar.price && (
          <div className="flex items-center text-gray-700 font-semibold mb-4">
            <span className="text-lg text-green-600">${webinar.price}</span>
          </div>
        )}
        <div className="flex gap-2 mt-auto">
          {webinar.link && (
            <Link
              to={webinar.link}
              target="_blank"
              rel="noopener noreferrer"
              // className="flex-1 text-center bg-primary hover:bg-primary-dark text-white font-bold py-2 px-6 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform active:scale-95 text-sm"
            // className="text-gray-800 font-bold py-2 px-6 rounded-full border-2 border-gray-800 transition-colors duration-300 hover:text-blue-500 hover:border-blue-500"
            className="text-gray-800 font-bold py-2 px-6 rounded-full border-2 border-transparent transition-all duration-300 transform hover:border-gray-800"
            >
              Visit Site
            </Link>
          )}
          <button
  onClick={handleRegisterClick}
  disabled={isLoadingToken}
  className={`flex-1 text-center font-bold py-2 px-6 rounded-full transition-all duration-300 transform active:scale-95 text-sm
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

const Webinars = () => {
  const createSortableDate = (dateString) => {
    if (!dateString) return new Date(0);
    const cleanedDateString = dateString.replace(/-\d+/g, "").trim();
    return new Date(cleanedDateString);
  };

  const groupedWebinars = useMemo(() => {
    const sortedData = [...webinarsData].sort((a, b) => {
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
      const genericSourceId = "webinars_page";
      const genericConferenceType = "webinar";
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
        )}&conferenceName=${encodeURIComponent("Webinar Collection Page")}`;
        setGenericRegistrationLink(registrationLink);
      } catch (error) {
        console.error("Error fetching generic webinar token:", error);
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
        title="Webinars & Virtual Conferences | Helix Conferences – Global Online Summits, Workshops & Scientific Events"
        description="Join Helix Conferences' global webinars and virtual events, including international scientific conferences, workshops, and summits across dentistry, oral medicine, graphene, nanotechnology, autism, neuropsychiatry, AI, robotics, metaverse, women empowerment, sustainability, nano engineering, smart technology, healthcare, emergency medicine, stroke care, agriculture, environmental sciences, plant biology, biotechnology, genomics, molecular biology, science, engineering, materials science, artificial intelligence, machine learning, drug design, pharmacology, and clinical trials."
        keywords="webinars, virtual conferences, online summits, international webinars, dentistry webinars, oral medicine conferences, graphene technology webinars, nanotechnology events, autism conferences, neuropsychiatry summits, AI webinars, robotics webinars, metaverse events, women empowerment conferences, sustainability summits, nano engineering webinars, smart technology events, healthcare webinars, emergency medicine conferences, stroke congress, agriculture webinars, environmental science conferences, plant biology summits, biotechnology webinars, genomics webinars, molecular biology conferences, science and engineering webinars, materials science webinars, AI and machine learning events, drug design webinars, pharmacology conferences, clinical trials webinars"
        url="https://helixconferences.com/webinars"
        image="https://helixconferences.com/images/webinars-banner.jpg"
        canonical="https://helixconferences.com/webinars"
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
                "Helix Conferences organizes high-impact webinars and virtual events across diverse scientific, medical, and technological fields, connecting global experts and innovators.",
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
              "@id": "https://helixconferences.com/webinars/#webpage",
              url: "https://helixconferences.com/webinars",
              name: "Webinars & Virtual Conferences – Helix Conferences",
              description:
                "Discover Helix Conferences' global webinars and online events across dentistry, nanotechnology, AI, healthcare, agriculture, biotechnology, pharmacology, and more.",
              inLanguage: "en",
            },
          ],
        }}
      />

      <style>{`
				@keyframes webinar-blend {
					0% { background-position: 0% 50%; }
					50% { background-position: 100% 50%; }
					100% { background-position: 0% 50%; }
				}
			`}</style>
      <div
        className="absolute inset-0 z-0 opacity-40"
        style={{
          background:
            "linear-gradient(45deg, #ADD8E6, #87CEFA, #4682B4, #6A5ACD)",
          backgroundSize: "400% 400%",
          animation: "webinar-blend 20s ease-in-out infinite alternate",
        }}
      ></div>

      <ParticleTrail>
        <div className="container mx-auto relative z-10">
          

          {Object.keys(groupedWebinars)
            .sort((a, b) => a- b) // Sort years in descending order (e.g., 2025, 2024, ...)
            .map((year) => (
              <div key={year} className="mb-12 sm:mb-20">
                <h1 className="text-5xl md:text-5xl font-bold text-center mb-12 text-gray-900">
                  Our <span className="text-blue-600">{year}</span> Webinars
                </h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-10">
                  {groupedWebinars[year].map((webinar) => (
                    <motion.div
                      key={webinar.code || webinar.id}
                      variants={cardItemVariants}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, amount: 0.2 }}
                    >
                      <InteractiveWebinarCard webinar={webinar} />
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
              Engage from Anywhere
            </h2>
            <p className="text-sm sm:text-lg text-gray-700 max-w-2xl mx-auto">
              Our webinars are designed for maximum accessibility, allowing you
              to participate in live Q&A sessions and network with peers
              globally.
            </p>
            <Link
              to={genericRegistrationLink}
              className="inline-block mt-6 sm:mt-8"
            >
              <MagneticButton className="bg-primary hover:bg-primary-dark text-white font-bold py-3 px-8 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform active:scale-95">
                {isGenericLoading
                  ? "Loading..."
                  : "Register for a Webinar Event"}
              </MagneticButton>
            </Link>
          </motion.div>
        </div>
      </ParticleTrail>
    </div>
  );
};

export default Webinars;