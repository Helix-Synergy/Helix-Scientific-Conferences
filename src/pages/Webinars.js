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
            <div className="relative z-10 flex h-full flex-col overflow-hidden rounded-xl bg-gray-800/70 p-4 backdrop-blur-lg">
                <div className="relative overflow-hidden rounded-lg mb-4 h-48">
                    <img
                        src={webinar.image}
                        alt={webinar.title}
                        className="w-full h-full object-cover transition-transform duration-500 transform group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 cursor-interactive">
                        <PlayCircleIcon className="w-16 h-16 text-white opacity-80 group-hover:opacity-100 transform transition-transform duration-300 group-hover:scale-110" />
                    </div>
                </div>
                <div className="flex-1 flex flex-col justify-between">
                    <div>
                        <h3 className="text-xl font-semibold mb-2 text-white group-hover:text-blue-300 transition-colors duration-300">{webinar.title}</h3>
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
















// import React from 'react'; // Removed useEffect and useAnimation as they are not needed for this approach
// import { motion } from 'framer-motion'; // Only motion is needed now
// // useInView is no longer imported here because `whileInView` uses its own internal observer
// import { PlayCircleIcon, CalendarDaysIcon } from '@heroicons/react/24/outline'; // Example icons

// const Webinars = () => {
//   const webinars = [
//     {
//       id: 1,
//       title: 'Mastering Machine Learning Algorithms',
//       date: 'August 10, 2025',
//       speaker: 'Dr. Anya Sharma',
//       thumbnail: 'https://placehold.co/600x350/2E659A/FFFFFF?text=ML+Webinar',
//       link: '#',
//     },
//     {
//       id: 2,
//       title: 'Sustainable Energy Solutions for Cities',
//       date: 'September 5, 2025',
//       speaker: 'Dr. Chloe Dubois',
//       thumbnail: 'https://placehold.co/600x350/4A2868/FFFFFF?text=Energy+Webinar',
//       link: '#',
//     },
//     {
//       id: 3,
//       title: 'Introduction to Quantum Cryptography',
//       date: 'October 2, 2025',
//       speaker: 'Prof. Liam Chen',
//       thumbnail: 'https://placehold.co/600x350/9A2E65/FFFFFF?text=Quantum+Webinar',
//       link: '#',
//     },
//     {
//       id: 4,
//       title: 'Biomedical Imaging Techniques',
//       date: 'November 15, 2025',
//       speaker: 'Dr. Sofia Rodriguez',
//       thumbnail: 'https://placehold.co/600x350/6A3F9B/FFFFFF?text=Imaging+Webinar',
//       link: '#',
//     },
//   ];

//   // Define variants for each individual card item
//   // The 'custom' prop (which will be 'index') allows for staggered animation
//   const itemVariants = {
//     hidden: { opacity: 0, y: 50 },
//     visible: (i) => ({ // 'i' is the custom prop (index from the map function)
//       opacity: 1,
//       y: 0,
//       transition: {
//         delay: i * 0.1, // Stagger delay: 0.1s for first, 0.2s for second, etc.
//         duration: 0.6,
//         ease: "easeOut",
//       },
//     }),
//   };

//   return (
//     <div className="min-h-screen relative overflow-hidden text-white py-20 px-4 bg-gray-900">
//       {/* Background: Digital Circuit Board Animation (unchanged) */}
//       <div
//         className="absolute inset-0 z-0"
//         style={{
//           background: 'linear-gradient(45deg, #1a0033 0%, #000000 100%)',
//           backgroundImage: `url(https://www.transparenttextures.com/patterns/digital-circuit.png)`,
//           backgroundSize: '200% 200%',
//           animation: 'digital-flow 30s linear infinite',
//           opacity: 0.4,
//         }}
//       >
//         <div className="absolute inset-0 bg-black opacity-40"></div> {/* Dark overlay */}
//       </div>

//       <div className="container mx-auto relative z-10">
//         <h1 className="text-4xl md:text-5xl font-bold text-center mb-12 animate-fade-in-up">
//           Our Upcoming Webinars
//         </h1>

//         <p className="text-lg text-center mb-10 max-w-3xl mx-auto">
//           Join our expert-led webinars to gain valuable insights and stay updated
//           on the latest trends and research in your field.
//         </p>

//         {/* Removed 'ref' from this div, as each card will manage its own view state */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//           {webinars.map((webinar, index) => (
//             <motion.div
//               key={webinar.id}
//               className="bg-gray-800 rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-[1.02] group cursor-interactive"
//               variants={itemVariants} // Use the new itemVariants
//               initial="hidden" // Start hidden
//               whileInView="visible" // <--- Animation triggers when this card enters viewport
//               viewport={{ once: true, amount: 0.2 }} // <--- NEW: Options for the Intersection Observer for this specific card
//               custom={index} // Pass the index to use for staggered delay
//             >
//               <div className="relative h-56 overflow-hidden">
//                 <img
//                   src={webinar.thumbnail}
//                   alt={webinar.title}
//                   className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110 cursor-interactive"
//                 />
//                 <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 cursor-interactive">
//                   <PlayCircleIcon className="w-16 h-16 text-white opacity-80 group-hover:opacity-100 transform transition-transform duration-300 group-hover:scale-110" />
//                 </div>
//               </div>
//               <div className="p-6">
//                 <h3 className="text-xl font-semibold mb-2 text-white group-hover:text-blue-300 transition-colors duration-300 cursor-interactive">
//                   {webinar.title}
//                 </h3>
//                 <p className="flex items-center text-gray-300 text-sm mb-2">
//                   <CalendarDaysIcon className="w-4 h-4 mr-2 text-blue-300" />
//                   {webinar.date}
//                 </p>
//                 <p className="text-gray-400 text-sm mb-4">Speaker: {webinar.speaker}</p>
//                 <a
//                   href={webinar.link}
//                   className="inline-block bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-md text-sm font-medium transition-colors duration-300 cursor-interactive"
//                 >
//                   Register Now
//                 </a>
//               </div>
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Webinars;