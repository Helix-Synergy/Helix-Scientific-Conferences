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
//             <div className="relative z-10 flex h-full flex-col overflow-hidden rounded-xl bg-gray-800/70 p-4 backdrop-blur-lg">
//                 <div className="relative overflow-hidden rounded-lg mb-4 h-48">
//                     <img
//                         src={webinar.image}
//                         alt={webinar.title}
//                         className="w-full h-full object-cover transition-transform duration-500 transform group-hover:scale-110"
//                     />
//                     <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 cursor-interactive">
//                         <PlayCircleIcon className="w-16 h-16 text-white opacity-80 group-hover:opacity-100 transform transition-transform duration-300 group-hover:scale-110" />
//                     </div>
//                 </div>
//                 <div className="flex-1 flex flex-col justify-between">
//                     <div>
//                         <h3 className="text-xl font-semibold mb-2 text-white group-hover:text-blue-300 transition-colors duration-300">{webinar.title}</h3>
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
//             // Set a fixed height for the card to ensure uniformity
//             className="group relative h-[480px] w-full rounded-xl p-px transition-all duration-300"
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
//             {/* The main content container is now a flex column with a fixed height */}
//             <div className="relative z-10 flex h-full flex-col overflow-hidden rounded-xl bg-gray-800/70 p-4 backdrop-blur-lg">
//                 <div className="relative overflow-hidden rounded-lg mb-4 h-48">
//                     <img
//                         src={webinar.image}
//                         alt={webinar.title}
//                         className="w-full h-auto object-cover transition-transform duration-500 transform group-hover:scale-110"
//                     />
//                     <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 cursor-interactive">
//                         {/* <PlayCircleIcon className="w-16 h-16 text-white opacity-80 group-hover:opacity-100 transform transition-transform duration-300 group-hover:scale-110" /> */}
//                     </div>
//                 </div>
//                 {/* This flex-grow div will take up remaining space, pushing the button down */}
//                 <div className="flex-grow flex flex-col justify-between">
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



// src/components/Webinars.js

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import { PlayCircleIcon, CalendarDaysIcon, ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline';

// Import the webinar data
import webinarsData from '../data/webinarsData1.js'; // Assumes you have a file with this name

// ---- Particle Trail Component (Copied from Hybrids.js) ----
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

// ---- Interactive Card Component inspired by Hybrids.js ----
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

    return (
        <motion.div
            ref={cardRef}
            // Reverted to h-full to allow dynamic height based on content
            className="group relative h-full w-full rounded-xl p-px transition-all duration-300"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            whileHover={{ scale: 1.05 }}
            initial={{ perspective: 1000, transformStyle: 'preserve-3d' }}
            style={{ rotateX, rotateY }}
        >
            <motion.div
                className="absolute inset-0 z-0 rounded-[11px] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{
                    background: 'radial-gradient(150px circle at calc(var(--x) * 1px) calc(var(--y) * 1px), rgba(125, 250, 255, 0.4), transparent 80%)',
                }}
                onMouseMove={e => {
                    const { clientX, clientY } = e;
                    const { left, top } = e.currentTarget.getBoundingClientRect();
                    e.currentTarget.style.setProperty("--x", clientX - left);
                    e.currentTarget.style.setProperty("--y", clientY - top);
                }}
            />
            {/* The main content container with dynamic height */}
            <div className="relative z-10 flex h-full flex-col overflow-hidden rounded-xl bg-gray-800/70 p-4 backdrop-blur-lg">
                <div className="relative overflow-hidden rounded-lg mb-4 h-48">
                    <img
                        src={webinar.image}
                        alt={webinar.title}
                        className="w-full h-auto object-cover transition-transform duration-500 transform group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 cursor-interactive">
                        {/* PlayCircleIcon restored */}
                        {/* <PlayCircleIcon className="w-16 h-16 text-white opacity-80 group-hover:opacity-100 transform transition-transform duration-300 group-hover:scale-110" /> */}
                    </div>
                </div>
                {/* flex-1 ensures the button is pushed to the bottom regardless of text content */}
                <div className="flex-1 flex flex-col justify-between">
                    <div>
                        <h3 className="text-xl font-semibold mb-2 text-white group-hover:text-blue-300 transition-colors duration-300">
                            {webinar.title}
                        </h3>
                        <p className="flex items-center text-gray-300 text-sm mb-2">
                            <CalendarDaysIcon className="w-4 h-4 mr-2 text-blue-300" />
                            {webinar.date}
                        </p>
                    </div>
                    {webinar.link ? (
                        <a
                            href={webinar.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center mt-4 bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-md text-sm font-medium transition-colors duration-300 transform hover:scale-105"
                        >
                            Visit Page <ArrowTopRightOnSquareIcon className="w-4 h-4 ml-2" />
                        </a>
                    ) : (
                        <button
                            disabled
                            className="inline-flex items-center justify-center mt-4 bg-gray-600 text-gray-300 py-2 px-4 rounded-md text-sm font-medium cursor-not-allowed"
                        >
                            Details Coming Soon
                        </button>
                    )}
                </div>
            </div>
        </motion.div>
    );
};

// ---- Main Page Component ----
const Webinars = () => {
    const sortedWebinars = [...webinarsData].sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return dateA - dateB;
    });

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

    return (
        <div className="min-h-screen relative overflow-hidden text-white py-12 sm:py-20 px-4 sm:px-8">
            {/* Animated Gradient Background Layer */}
            <div
                className="absolute inset-0 z-0 opacity-40"
                style={{
                    background: 'linear-gradient(45deg, #1A237E, #121212, #311B92, #121212)',
                    backgroundSize: '400% 400%',
                    animation: 'hybrid-blend 20s ease-in-out infinite alternate',
                }}
            ></div>

            <ParticleTrail>
                <div className="container mx-auto relative z-10">
                    <h1 className="text-4xl md:text-5xl font-bold text-center mb-4 text-white animate-fade-in-up">
                        Our Upcoming Webinars
                    </h1>
                    <p className="text-base sm:text-lg text-center mb-8 sm:mb-10 max-w-3xl mx-auto text-gray-300">
                        Join our expert-led webinars to gain valuable insights and stay updated
                        on the latest trends and research in your field.
                    </p>

                    <h2 className="text-3xl md:text-4xl font-bold text-center mb-6 mt-8 sm:mt-12 text-white">
                        All Upcoming Events
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-10 mb-12 sm:mb-20">
                        {sortedWebinars.map((webinar, index) => (
                            <motion.div
                                key={index}
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
            </ParticleTrail>
        </div>
    );
};

export default Webinars;