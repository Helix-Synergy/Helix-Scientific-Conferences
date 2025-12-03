// import React, { useEffect } from 'react';
// import { motion, useAnimation } from 'framer-motion';
// import { useInView } from 'react-intersection-observer';
// import { CalendarDaysIcon, MapPinIcon } from '@heroicons/react/24/outline'; // Example icons

// const Conferences = () => {
//   const conferenceEvents = [
//     {
//       id: 1,
//       name: 'Global AI Summit 2025',
//       date: 'October 10-12, 2025',
//       location: 'New York, USA',
//       imageUrl: 'https://placehold.co/600x400/2E659A/FFFFFF?text=AI+Summit',
//       description: 'A premier event focusing on the latest advancements in artificial intelligence.',
//       link: '#',
//     },
//     {
//       id: 2,
//       name: 'Sustainable Tech Forum',
//       date: 'November 5-7, 2025',
//       location: 'Berlin, Germany',
//       imageUrl: 'https://placehold.co/600x400/4A2868/FFFFFF?text=Sustainable+Tech',
//       description: 'Exploring innovative technologies for a greener and more sustainable future.',
//       link: '#',
//     },
//     {
//       id: 3,
//       name: 'Biomedical Innovations Conference',
//       date: 'December 1-3, 2025',
//       location: 'Tokyo, Japan',
//       imageUrl: 'https://placehold.co/600x400/9A2E65/FFFFFF?text=Biomedical+Innovations',
//       description: 'Showcasing breakthroughs in medical research and biotechnology.',
//       link: '#',
//     },
//     {
//       id: 4,
//       name: 'Future of Robotics Expo',
//       date: 'January 15-17, 2026',
//       location: 'London, UK',
//       imageUrl: 'https://placehold.co/600x400/6A3F9B/FFFFFF?text=Robotics+Expo',
//       description: 'Discovering the next generation of robotics and automation.',
//       link: '#',
//     },
//   ];

//   const controls = useAnimation();
//   const [ref, inView] = useInView({
//     triggerOnce: true,
//     threshold: 0.1,
//   });

//   useEffect(() => {
//     if (inView) {
//       controls.start("visible");
//     }
//   }, [controls, inView]);

//   const cardVariants = {
//     hidden: { opacity: 0, y: 50 },
//     visible: {
//       opacity: 1,
//       y: 0,
//       transition: {
//         duration: 0.6,
//         ease: "easeOut",
//       },
//     },
//   };

//   return (
//     <div className="min-h-screen relative overflow-hidden text-white py-20 px-4 bg-gray-900">
//       {/* Background: Dynamic, Shimmering Effect */}
//       <div
//         className="absolute inset-0 z-0"
//         style={{
//           background: 'linear-gradient(90deg, #4A2868, #2E659A, #4A2868)',
//           backgroundSize: '200% 100%',
//           animation: 'shimmer 4s infinite linear',
//           opacity: 0.3,
//         }}
//       >
//         <div className="absolute inset-0 bg-black opacity-40"></div> {/* Dark overlay */}
//       </div>

//       <div className="container mx-auto relative z-10">
//         <h1 className="text-4xl md:text-5xl font-bold text-center mb-12 animate-fade-in-up">
//           Upcoming Conferences
//         </h1>

//         <p className="text-lg text-center mb-10 max-w-3xl mx-auto">
//           Explore our diverse range of upcoming conferences, designed to bring together
//           experts and enthusiasts from various scientific and technological fields.
//         </p>

//         <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//           {conferenceEvents.map((event, index) => (
//             <motion.div
//               key={event.id}
//               className="bg-gray-800 rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-[1.02] group"
//               variants={cardVariants}
//               initial="hidden"
//               animate={controls}
//               custom={index}
//             >
//               <div className="relative overflow-hidden h-56">
//                 <img
//                   src={event.imageUrl}
//                   alt={event.name}
//                   loading="lazy"
//                   className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
//                 />
//                 <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-4">
//                   <h3 className="text-xl font-semibold text-white">{event.name}</h3>
//                 </div>
//               </div>
//               <div className="p-6">
//                 <p className="flex items-center text-gray-300 mb-2">
//                   <CalendarDaysIcon className="w-5 h-5 mr-2 text-blue-300" />
//                   {event.date}
//                 </p>
//                 <p className="flex items-center text-gray-300 mb-4">
//                   <MapPinIcon className="w-5 h-5 mr-2 text-green-300" />
//                   {event.location}
//                 </p>
//                 <p className="text-gray-400 text-sm mb-4">
//                   {event.description}
//                 </p>
//                 <a
//                   href={event.link}
//                   className="inline-block bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-md text-sm font-medium transition-colors duration-300"
//                 >
//                   Learn More
//                 </a>
//               </div>
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Conferences;