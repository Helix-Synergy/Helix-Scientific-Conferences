import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { AdjustmentsHorizontalIcon, CalendarIcon, MapPinIcon } from '@heroicons/react/24/outline'; // Changed PlayCircleIcon to AdjustmentsHorizontalIcon for consistency
import MagneticButton from '../components/MagneticButton';

// Make sure this import path is correct for your project structure
// Assuming your webinars data is in 'src/data/webinarsData1.js'
import webinarsData from '../data/webinarsData1';

// The ParticleTrail component (replicated for self-containment, or you can move to a shared file)
const ParticleTrail = ({ children }) => {
    const [particles, setParticles] = useState([]);
    const containerRef = useRef(null);
    const nextParticleId = useRef(0);

    const handleMouseMove = (e) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        setParticles(prevParticles => [
            ...prevParticles,
            { id: nextParticleId.current++, x, y, createdAt: Date.now() }
        ]);
    };

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        container.addEventListener('mousemove', handleMouseMove);

        const cleanupInterval = setInterval(() => {
            setParticles(prevParticles => {
                const now = Date.now();
                return prevParticles.filter(p => now - p.createdAt < 1500); // Filter out particles older than 1.5 seconds
            });
        }, 100);

        return () => {
            container.removeEventListener('mousemove', handleMouseMove);
            clearInterval(cleanupInterval);
        };
    }, []);

    const particleVariants = {
        initial: {
            scale: 0,
            opacity: 1,
        },
        animate: {
            scale: [0, 1, 0.5],
            opacity: [0.5, 1, 0],
            transition: {
                duration: 1.5,
                ease: "easeOut",
            },
        },
        exit: {
            opacity: 0,
            transition: { duration: 0.5 }
        },
    };

    return (
        <div ref={containerRef} className="relative w-full h-full">
            <AnimatePresence>
                {particles.map(p => (
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
                            width: '12px',
                            height: '12px',
                            transform: 'translate(-50%, -50%)',
                            background: 'linear-gradient(to right, #6EE7B7, #3B82F6, #9333EA)' // Different gradient for Webinars
                        }}
                    />
                ))}
            </AnimatePresence>
            {children}
        </div>
    );
};

// ---- Interactive Card Component for Webinars ----
const InteractiveWebinarCard = ({ webinar }) => {
    const cardRef = useRef(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const handleMouseMove = (e) => {
        if (!cardRef.current) return;
        const { top, left, width, height } = cardRef.current.getBoundingClientRect();
        x.set((e.clientX - left) / width);
        y.set((e.clientY - top) / height);
    };

    const handleMouseLeave = () => {
        x.set(0.5);
        y.set(0.5);
    };

    const rotateX = useTransform(y, [0, 1], [10, -10]);
    const rotateY = useTransform(x, [0, 1], [-10, 10]);

    const uniformSkew = {
        skewX: -1.5,
        skewY: 1.5,
    };

    // --- State for the dynamically generated registration link and loading ---
    const [registrationLink, setRegistrationLink] = useState('');
    const [isLoadingToken, setIsLoadingToken] = useState(true);

    useEffect(() => {
        const fetchToken = async () => {
            setIsLoadingToken(true);
            const sourceId = webinar.code || webinar.id; // Use 'code' or 'id' as sourceId
            const conferenceType = webinar.type || 'webinar'; // Default to 'webinar' for this file

            if (!sourceId) {
                console.error("Missing sourceId for webinar:", webinar);
                setRegistrationLink('/registration?error=missing_event_data');
                setIsLoadingToken(false);
                return;
            }

            try {
                // *** API CALL TO YOUR BACKEND TO GET A REAL TOKEN ***
                const response = await fetch(`https://main-react-backend-code.onrender.com/api/source/generate-token?sourceId=${sourceId}&conferenceType=${conferenceType}`);

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(`Failed to fetch source token from backend: ${errorData.message || response.statusText}`);
                }
                const data = await response.json();
                const token = data.token; // This is the REAL JWT from your backend

                // Encode all parameters for the URL safely
                const encodedConferenceId = encodeURIComponent(sourceId);
                const encodedConferenceName = encodeURIComponent(webinar.title || webinar.name || 'Untitled Webinar');
                const encodedConferenceDate = encodeURIComponent(webinar.date || '');

                setRegistrationLink(
                    `/registration?sourceToken=${encodeURIComponent(token)}&conferenceType=${conferenceType}&conferenceId=${encodedConferenceId}&conferenceName=${encodedConferenceName}&conferenceDate=${encodedConferenceDate}`
                );
            } catch (error) {
                console.error("Error fetching token for webinar:", webinar.title || webinar.name, error);
                setRegistrationLink('/registration?error=token_failed'); // Fallback link with error
            } finally {
                setIsLoadingToken(false);
            }
        };

        fetchToken();
    }, [webinar]); // Re-run effect if the 'webinar' prop changes

    return (
        <motion.div
            ref={cardRef}
            className="group relative h-96 w-full rounded-xl p-px transition-all duration-300"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            whileHover={{ scale: 1.05 }}
            initial={{ ...uniformSkew, perspective: 1000, transformStyle: 'preserve-3d' }}
            style={{ rotateX, rotateY }}
        >
            <motion.div
                className="absolute inset-0 z-0 rounded-[11px] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{
                    background: 'radial-gradient(150px circle at var(--x) var(--y), rgba(100, 149, 237, 0.4), transparent 80%)', // Blue gradient for webinars
                }}
                onMouseMove={e => {
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
                        className="w-full h-full object-cover transition-transform duration-500 transform group-hover:scale-110"
                    />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{webinar.title}</h3>
                <div className="flex items-center text-gray-700 mb-2">
                    <CalendarIcon className="w-5 h-5 mr-2 text-blue-500" />
                    <span>{webinar.date}</span>
                </div>
                <div className="flex items-center text-gray-700 mb-4">
                    <MapPinIcon className="w-5 h-5 mr-2 text-purple-500" />
                    <span>{webinar.location || 'Online'}</span> {/* Assuming webinars are online */}
                </div>

                <div className="flex gap-2 mt-auto">
                    {webinar.link && (
                        <Link
                            to={webinar.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 text-center bg-primary hover:bg-primary-dark text-white font-bold py-2 px-6 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform active:scale-95 text-sm"
                        >
                            Visit Site
                        </Link>
                    )}
                    {isLoadingToken ? (
                        <button disabled className="flex-1 text-center bg-gray-400 text-white font-bold py-2 px-6 rounded-full cursor-not-allowed text-sm">
                            Loading...
                        </button>
                    ) : (
                        <Link
                            to={registrationLink}
                            className="flex-1 text-center bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform active:scale-95 text-sm"
                        >
                            Register Now
                        </Link>
                    )}
                </div>
            </div>
        </motion.div>
    );
};

// ---- Main Page Component ----
const Webinars = () => {
    // No need for useNavigate here directly for navigation, Link handles it.
    // Use for programmatic redirects if needed, but not for Link components.

    const allWebinars = useMemo(() => {
        // Assume webinarsData.js provides the array of webinar events
        return [...webinarsData].sort((a, b) => {
            const dateA = new Date(a.date);
            const dateB = new Date(b.date);
            return dateA - dateB;
        });
    }, []);

    const cardItemVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.7,
                ease: "easeOut",
            },
        },
    };

    const seamlessIntegrationVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                delay: 0.2,
                ease: "easeOut",
            },
        },
    };

    // --- State for the generic "Register for a Webinar Event" button link and loading ---
    const [genericRegistrationLink, setGenericRegistrationLink] = useState('');
    const [isGenericLoading, setIsGenericLoading] = useState(true);

    useEffect(() => {
        const fetchGenericToken = async () => {
            setIsGenericLoading(true);
            const genericSourceId = 'webinars_page'; // A general ID for the Webinars page itself
            const genericConferenceType = 'webinar'; // The type for this generic button

            try {
                const response = await fetch(`https://main-react-backend-code.onrender.com/api/source/generate-token?sourceId=${genericSourceId}&conferenceType=${genericConferenceType}`);
                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(`Failed to fetch generic source token: ${errorData.message || response.statusText}`);
                }
                const data = await response.json();
                const token = data.token;

                setGenericRegistrationLink(
                    `/registration?sourceToken=${encodeURIComponent(token)}&conferenceType=${genericConferenceType}&conferenceId=${encodeURIComponent(genericSourceId)}&conferenceName=${encodeURIComponent("Webinar Collection Page")}`
                );
            } catch (error) {
                console.error("Error fetching generic webinar token:", error);
                setGenericRegistrationLink('/registration?error=generic_token_failed');
            } finally {
                setIsGenericLoading(false);
            }
        };

        fetchGenericToken();
    }, []); // Run once on component mount

    return (
        <div className="min-h-screen relative overflow-hidden text-white py-12 sm:py-20 px-4 sm:px-8 bg-gray-100">
            {/* Bright, Animated Gradient Background Layer */}
            {/* IMPORTANT: Add the @keyframes webinar-blend to your CSS file (e.g., src/index.css or src/App.css) */}
            <style >{`
                @keyframes webinar-blend {
                    0% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                    100% { background-position: 0% 50%; }
                }
            `}</style>
            <div
                className="absolute inset-0 z-0 opacity-40"
                style={{
                    background: 'linear-gradient(45deg, #ADD8E6, #87CEFA, #4682B4, #6A5ACD)', // Adjusted colors for webinars
                    backgroundSize: '400% 400%',
                    animation: 'webinar-blend 20s ease-in-out infinite alternate',
                }}
            ></div>

            <ParticleTrail>
                <div className="container mx-auto relative z-10">
                    <h1 className="text-4xl md:text-5xl font-bold text-center mb-4 text-gray-900 animate-fade-in-up">
                        Webinar Conferences
                    </h1>
                    <p className="text-base sm:text-lg text-center mb-8 sm:mb-10 max-w-3xl mx-auto text-gray-700">
                        Join our expert-led online sessions from anywhere in the world, offering in-depth insights and interactive learning.
                    </p>

                    {allWebinars.length > 0 && (
                        <>
                            <h2 className="text-3xl md:text-4xl font-bold text-center mb-6 mt-8 sm:mt-12 text-gray-900">
                                All Upcoming Webinars
                            </h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-10 mb-12 sm:mb-20">
                                {allWebinars.map((webinar) => ( // Changed 'event' to 'webinar' for clarity
                                    <motion.div
                                        key={webinar.code || webinar.id} // Use 'code' or 'id' for key
                                        variants={cardItemVariants}
                                        initial="hidden"
                                        whileInView="visible"
                                        viewport={{ once: true, amount: 0.2 }}
                                    >
                                        <InteractiveWebinarCard webinar={webinar} />
                                    </motion.div>
                                ))}
                            </div>
                        </>
                    )}

                    <motion.div
                        variants={seamlessIntegrationVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                        className="mt-8 sm:mt-12 bg-white/70 p-6 sm:p-8 rounded-xl shadow-lg backdrop-blur-sm border border-gray-200 text-center group"
                    >
                        <AdjustmentsHorizontalIcon className="w-10 h-10 sm:w-12 sm:h-12 text-primary mx-auto mb-4 sm:mb-6 transform transition-transform duration-300 group-hover:rotate-12" />
                        <h2 className="text-2xl sm:text-3xl font-semibold mb-2 sm:mb-4 text-gray-900">Engage from Anywhere</h2>
                        <p className="text-sm sm:text-lg text-gray-700 max-w-2xl mx-auto">
                            Our webinars are designed for maximum accessibility, allowing you to participate in live Q&A sessions and network with peers globally.
                        </p>
                        <Link to={genericRegistrationLink} className="inline-block mt-6 sm:mt-8">
                            <MagneticButton className="bg-primary hover:bg-primary-dark text-white font-bold py-3 px-8 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform active:scale-95">
                                {isGenericLoading ? 'Loading...' : 'Register for a Webinar Event'}
                            </MagneticButton>
                        </Link>
                    </motion.div>
                </div>
            </ParticleTrail>
        </div>
    );
};

export default Webinars;








// // src/components/Webinars.js

// import React, { useState, useEffect, useRef } from 'react';
// import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
// import { PlayCircleIcon, CalendarDaysIcon, ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline';

// // Import the webinar data
// import webinarsData from '../data/webinarsData1.js'; // Assumes you have a file with this name

// // ---- Particle Trail Component (Copied from Hybrids.js) ----
// const ParticleTrail = ({ children }) => {
//     const [particles, setParticles] = useState([]);
//     const containerRef = useRef(null);

//     const handleMouseMove = (e) => {
//         const rect = containerRef.current.getBoundingClientRect();
//         const x = e.clientX - rect.left;
//         const y = e.clientY - rect.top;

//         setParticles(prevParticles => [
//             ...prevParticles,
//             { id: Date.now(), x, y }
//         ]);
//     };

//     useEffect(() => {
//         const container = containerRef.current;
//         if (!container) return;

//         container.addEventListener('mousemove', handleMouseMove);

//         const cleanupInterval = setInterval(() => {
//             setParticles(prevParticles => {
//                 const now = Date.now();
//                 return prevParticles.filter(p => now - p.id < 1500);
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

// // ---- Interactive Card Component inspired by Hybrids.js ----
// const InteractiveWebinarCard = ({ webinar }) => {
//     const cardRef = useRef(null);
//     const x = useMotionValue(0);
//     const y = useMotionValue(0);

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

//     return (
//         <motion.div
//             ref={cardRef}
//             // Reverted to h-full to allow dynamic height based on content
//             className="group relative h-full w-full rounded-xl p-px transition-all duration-300"
//             onMouseMove={handleMouseMove}
//             onMouseLeave={handleMouseLeave}
//             whileHover={{ scale: 1.05 }}
//             initial={{ perspective: 1000, transformStyle: 'preserve-3d' }}
//             style={{ rotateX, rotateY }}
//         >
//             <motion.div
//                 className="absolute inset-0 z-0 rounded-[11px] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
//                 style={{
//                     background: 'radial-gradient(150px circle at calc(var(--x) * 1px) calc(var(--y) * 1px), rgba(125, 250, 255, 0.4), transparent 80%)',
//                 }}
//                 onMouseMove={e => {
//                     const { clientX, clientY } = e;
//                     const { left, top } = e.currentTarget.getBoundingClientRect();
//                     e.currentTarget.style.setProperty("--x", clientX - left);
//                     e.currentTarget.style.setProperty("--y", clientY - top);
//                 }}
//             />
//             {/* The main content container with dynamic height */}
//             <div className="relative z-10 flex h-full flex-col overflow-hidden rounded-xl bg-gray-800/70 p-4 backdrop-blur-lg">
//                 <div className="relative overflow-hidden rounded-lg mb-4 h-48">
//                     <img
//                         src={webinar.image}
//                         alt={webinar.title}
//                         className="w-full h-auto object-cover transition-transform duration-500 transform group-hover:scale-110"
//                     />
//                     <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 cursor-interactive">
//                         {/* PlayCircleIcon restored */}
//                         {/* <PlayCircleIcon className="w-16 h-16 text-white opacity-80 group-hover:opacity-100 transform transition-transform duration-300 group-hover:scale-110" /> */}
//                     </div>
//                 </div>
//                 {/* flex-1 ensures the button is pushed to the bottom regardless of text content */}
//                 <div className="flex-1 flex flex-col justify-between">
//                     <div>
//                         <h3 className="text-xl font-semibold mb-2 text-white group-hover:text-blue-300 transition-colors duration-300">
//                             {webinar.title}
//                         </h3>
//                         <p className="flex items-center text-gray-300 text-sm mb-2">
//                             <CalendarDaysIcon className="w-4 h-4 mr-2 text-blue-300" />
//                             {webinar.date}
//                         </p>
//                     </div>
//                     {webinar.link ? (
//                         <a
//                             href={webinar.link}
//                             target="_blank"
//                             rel="noopener noreferrer"
//                             className="inline-flex items-center justify-center mt-4 bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-md text-sm font-medium transition-colors duration-300 transform hover:scale-105"
//                         >
//                             Visit Page <ArrowTopRightOnSquareIcon className="w-4 h-4 ml-2" />
//                         </a>
//                     ) : (
//                         <button
//                             disabled
//                             className="inline-flex items-center justify-center mt-4 bg-gray-600 text-gray-300 py-2 px-4 rounded-md text-sm font-medium cursor-not-allowed"
//                         >
//                             Details Coming Soon
//                         </button>
//                     )}
//                 </div>
//             </div>
//         </motion.div>
//     );
// };

// // ---- Main Page Component ----
// const Webinars = () => {
//     const sortedWebinars = [...webinarsData].sort((a, b) => {
//         const dateA = new Date(a.date);
//         const dateB = new Date(b.date);
//         return dateA - dateB;
//     });

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

//     return (
//         <div className="min-h-screen relative overflow-hidden text-white py-12 sm:py-20 px-4 sm:px-8">
//             {/* Animated Gradient Background Layer */}
//             <div
//                 className="absolute inset-0 z-0 opacity-40"
//                 style={{
//                     background: 'linear-gradient(45deg, #1A237E, #121212, #311B92, #121212)',
//                     backgroundSize: '400% 400%',
//                     animation: 'hybrid-blend 20s ease-in-out infinite alternate',
//                 }}
//             ></div>

//             <ParticleTrail>
//                 <div className="container mx-auto relative z-10">
//                     <h1 className="text-4xl md:text-5xl font-bold text-center mb-4 text-white animate-fade-in-up">
//                         Our Upcoming Webinars
//                     </h1>
//                     <p className="text-base sm:text-lg text-center mb-8 sm:mb-10 max-w-3xl mx-auto text-gray-300">
//                         Join our expert-led webinars to gain valuable insights and stay updated
//                         on the latest trends and research in your field.
//                     </p>

//                     <h2 className="text-3xl md:text-4xl font-bold text-center mb-6 mt-8 sm:mt-12 text-white">
//                         All Upcoming Events
//                     </h2>
//                     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-10 mb-12 sm:mb-20">
//                         {sortedWebinars.map((webinar, index) => (
//                             <motion.div
//                                 key={index}
//                                 variants={cardItemVariants}
//                                 initial="hidden"
//                                 whileInView="visible"
//                                 viewport={{ once: true, amount: 0.2 }}
//                             >
//                                 <InteractiveWebinarCard webinar={webinar} />
//                             </motion.div>
//                         ))}
//                     </div>
//                 </div>
//             </ParticleTrail>
//         </div>
//     );
// };

// export default Webinars;