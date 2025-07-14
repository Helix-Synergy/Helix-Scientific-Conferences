// src/components/Hybrids.js

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { AdjustmentsHorizontalIcon, CalendarIcon, MapPinIcon } from '@heroicons/react/24/outline';

// Make sure this import path is correct for your project structure
import hybridsData from '../data/hybridsData1.js';
import MagneticButton from '../components/MagneticButton';

// The ParticleTrail component is now defined within this file
const ParticleTrail = ({ children }) => {
    const [particles, setParticles] = useState([]);
    const containerRef = useRef(null);

    const handleMouseMove = (e) => {
        const rect = containerRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        setParticles(prevParticles => [
            ...prevParticles,
            { id: Date.now(), x, y }
        ]);
    };

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        container.addEventListener('mousemove', handleMouseMove);

        const cleanupInterval = setInterval(() => {
            setParticles(prevParticles => {
                const now = Date.now();
                return prevParticles.filter(p => now - p.id < 1500);
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
                            background: 'linear-gradient(to right, #FF70A6, #8D6EFB, #4FC4F6)'
                        }}
                    />
                ))}
            </AnimatePresence>
            {children}
        </div>
    );
};

// ---- Interactive Card Component with Persistent Skew and Brighter Theme ----
const InteractiveCard = ({ event }) => {
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
                    background: 'radial-gradient(150px circle at calc(var(--x) * 1px) calc(var(--y) * 1px), rgba(255, 105, 180, 0.4), transparent 80%)',
                }}
                onMouseMove={e => {
                    const { clientX, clientY } = e;
                    const { left, top } = e.currentTarget.getBoundingClientRect();
                    e.currentTarget.style.setProperty("--x", clientX - left);
                    e.currentTarget.style.setProperty("--y", clientY - top);
                }}
            />
            <div className="relative z-10 flex h-full flex-col overflow-hidden rounded-xl bg-white/70 p-4 backdrop-blur-lg">
                <div className="relative overflow-hidden rounded-lg mb-4 h-48">
                    <img
                        src={event.image}
                        alt={event.title}
                        className="w-full h-full object-cover transition-transform duration-500 transform group-hover:scale-110"
                    />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{event.title}</h3>
                <p className="text-sm font-semibold text-gray-600 mb-4">{event.code}</p>
                <div className="flex items-center text-gray-700 mb-2">
                    <CalendarIcon className="w-5 h-5 mr-2 text-blue-500" />
                    <span>{event.date}</span>
                </div>
                <div className="flex items-center text-gray-700 mb-4">
                    <MapPinIcon className="w-5 h-5 mr-2 text-purple-500" />
                    <span>{event.location}</span>
                </div>
                {event.link && (
                    <Link
                        to={event.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block bg-primary hover:bg-primary-dark text-white font-bold py-2 px-6 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform active:scale-95 text-sm"
                    >
                        Learn More
                    </Link>
                )}
            </div>
        </motion.div>
    );
};

// ---- Main Page Component ----
const Hybrids = () => {
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

    const allConferences = hybridsData;

    return (
        <div className="min-h-screen relative overflow-hidden text-white py-12 sm:py-20 px-4 sm:px-8 bg-gray-100">
            {/* Bright, Animated Gradient Background Layer */}
            <div
                className="absolute inset-0 z-0 opacity-40"
                style={{
                    background: 'linear-gradient(45deg, #FF69B4, #87CEEB, #9370DB, #FFD700)',
                    backgroundSize: '400% 400%',
                    animation: 'hybrid-blend 20s ease-in-out infinite alternate',
                }}
            ></div>

            <ParticleTrail>
                <div className="container mx-auto relative z-10">
                    <h1 className="text-4xl md:text-5xl font-bold text-center mb-4 text-gray-900 animate-fade-in-up">
                        Hybrid Conferences
                    </h1>
                    <p className="text-base sm:text-lg text-center mb-8 sm:mb-10 max-w-3xl mx-auto text-gray-700">
                        Explore our collection of upcoming hybrid conferences, blending the best of in-person
                        and virtual experiences for unparalleled engagement and networking.
                    </p>

                    {allConferences.length > 0 && (
                        <>
                            <h2 className="text-3xl md:text-4xl font-bold text-center mb-6 mt-8 sm:mt-12 text-gray-900">
                                All Upcoming Events
                            </h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-10 mb-12 sm:mb-20">
                                {allConferences.map((event, index) => (
                                    <motion.div
                                        key={index}
                                        variants={cardItemVariants}
                                        initial="hidden"
                                        whileInView="visible"
                                        viewport={{ once: true, amount: 0.2 }}
                                    >
                                        <InteractiveCard event={event} />
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
                        <h2 className="text-2xl sm:text-3xl font-semibold mb-2 sm:mb-4 text-gray-900">Seamless Integration</h2>
                        <p className="text-sm sm:text-lg text-gray-700 max-w-2xl mx-auto">
                            Our hybrid model ensures a cohesive experience for all Eminent Speakers, regardless of their mode of participation.
                            Cutting-edge technology facilitates smooth interactions between in-person and virtual audiences.
                        </p>
                        {/* The MagneticButton is now wrapped in a Link for navigation */}
                        <Link to="/buy-a-ticket" className="inline-block mt-6 sm:mt-8">
                            <MagneticButton className="bg-primary hover:bg-primary-dark text-white font-bold py-3 px-8 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform active:scale-95">
                                Register for a Hybrid Event
                            </MagneticButton>
                        </Link>
                    </motion.div>
                </div>
            </ParticleTrail>
        </div>
    );
};

export default Hybrids;




// import React, { useRef } from 'react';
// import { motion, useMotionValue, useTransform } from 'framer-motion';
// import { Link } from 'react-router-dom';
// import { AdjustmentsHorizontalIcon, CalendarIcon, MapPinIcon } from '@heroicons/react/24/outline';
// import MagneticButton from '../components/MagneticButton';

// // Make sure this import path is correct for your project structure
// import hybridsData from '../data/hybridsData1.js';

// // ---- Final, Responsive, and Uniform Interactive Card Component ----
// const InteractiveCard = ({ event }) => {
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

//     // Uniform, persistent skew effect applied to all cards
//     const uniformSkew = {
//         skewX: -1.5,
//         skewY: 1.5,
//     };

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
//             {/* Animated Glow Layer */}
//             <motion.div
//                 className="absolute inset-0 z-0 rounded-[11px] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
//                 style={{
//                     background: 'radial-gradient(150px circle at calc(var(--x) * 1px) calc(var(--y) * 1px), rgba(0, 255, 255, 0.4), transparent 80%)',
//                 }}
//                 onMouseMove={e => {
//                     const { clientX, clientY } = e;
//                     const { left, top } = e.currentTarget.getBoundingClientRect();
//                     e.currentTarget.style.setProperty("--x", clientX - left);
//                     e.currentTarget.style.setProperty("--y", clientY - top);
//                 }}
//             />
//             {/* The main card content container */}
//             <div className="relative z-10 flex h-full flex-col overflow-hidden rounded-xl bg-gray-800/80 p-4 backdrop-blur-lg">
//                 <div className="relative overflow-hidden rounded-lg mb-4 h-48">
//                     <img
//                         src={event.image}
//                         alt={event.title}
//                         className="w-full h-full object-cover transition-transform duration-500 transform group-hover:scale-110"
//                     />
//                 </div>
//                 <h3 className="text-xl font-bold text-white mb-2">{event.title}</h3>
//                 <p className="text-sm font-semibold text-gray-400 mb-4">{event.code}</p>
//                 <div className="flex items-center text-gray-300 mb-2">
//                     <CalendarIcon className="w-5 h-5 mr-2 text-primary" />
//                     <span>{event.date}</span>
//                 </div>
//                 <div className="flex items-center text-gray-300 mb-4">
//                     <MapPinIcon className="w-5 h-5 mr-2 text-accent-purple" />
//                     <span>{event.location}</span>
//                 </div>
//                 {event.link && (
//                     <Link
//                         to={event.link}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         className="inline-block bg-secondary hover:bg-secondary-dark text-white font-bold py-2 px-6 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform active:scale-95 text-sm"
//                     >
//                         Learn More
//                     </Link>
//                 )}
//             </div>
//         </motion.div>
//     );
// };
// // ---- END OF Interactive Card Component ----

// const Hybrids = () => {
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

//     const allConferences = hybridsData;

//     return (
//         <div className="min-h-screen relative overflow-hidden text-white py-12 sm:py-20 px-4 sm:px-8 bg-gray-900">
//             {/* Background: Blending of two animated patterns */}
//             <div
//                 className="absolute inset-0 z-0"
//                 style={{
//                     background: 'linear-gradient(45deg, #4A2868, #2E659A, #4A2868, #2E659A)',
//                     backgroundSize: '400% 400%',
//                     animation: 'hybrid-blend 20s ease-in-out infinite alternate',
//                 }}
//             >
//                 <div className="absolute inset-0 bg-black opacity-40"></div>
//             </div>

//             <div className="container mx-auto relative z-10">
//                 <h1 className="text-4xl md:text-5xl font-bold text-center mb-4 animate-fade-in-up">
//                     Hybrid Conferences
//                 </h1>
//                 <p className="text-base sm:text-lg text-center mb-8 sm:mb-10 max-w-3xl mx-auto">
//                     Explore our collection of upcoming hybrid conferences, blending the best of in-person
//                     and virtual experiences for unparalleled engagement and networking.
//                 </p>

//                 {/* Section for all Conferences */}
//                 {allConferences.length > 0 && (
//                     <>
//                         <h2 className="text-3xl md:text-4xl font-bold text-center mb-6 mt-8 sm:mt-12">
//                             All Upcoming Events
//                         </h2>
//                         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-10 mb-12 sm:mb-20">
//                             {allConferences.map((event, index) => (
//                                 <motion.div
//                                     key={index}
//                                     variants={cardItemVariants}
//                                     initial="hidden"
//                                     whileInView="visible"
//                                     viewport={{ once: true, amount: 0.2 }}
//                                 >
//                                     <InteractiveCard event={event} />
//                                 </motion.div>
//                             ))}
//                         </div>
//                     </>
//                 )}
                
//                 {/* The original "Seamless Integration" section, kept for consistency */}
//                 <motion.div
//                     variants={seamlessIntegrationVariants}
//                     initial="hidden"
//                     whileInView="visible"
//                     viewport={{ once: true, amount: 0.2 }}
//                     className="mt-8 sm:mt-12 bg-gray-800/70 p-6 sm:p-8 rounded-xl shadow-lg backdrop-blur-sm border border-white/10 text-center group liquid-effect"
//                 >
//                     <AdjustmentsHorizontalIcon className="w-10 h-10 sm:w-12 sm:h-12 text-accent-purple mx-auto mb-4 sm:mb-6 transform transition-transform duration-300 group-hover:rotate-12" />
//                     <h2 className="text-2xl sm:text-3xl font-semibold mb-2 sm:mb-4">Seamless Integration</h2>
//                     <p className="text-sm sm:text-lg text-gray-300 max-w-2xl mx-auto">
//                         Our hybrid model ensures a cohesive experience for all Eminent Speakers, regardless of their mode of participation.
//                         Cutting-edge technology facilitates smooth interactions between in-person and virtual audiences.
//                     </p>
//                     <MagneticButton className="inline-block bg-secondary hover:bg-secondary-dark text-white font-bold py-3 px-8 rounded-full mt-6 sm:mt-8 transition-all duration-300 shadow-lg hover:shadow-xl transform active:scale-95">
//                         Register for a Hybrid Event
//                     </MagneticButton>
//                 </motion.div>
//             </div>
//         </div>
//     );
// };

// export default Hybrids;