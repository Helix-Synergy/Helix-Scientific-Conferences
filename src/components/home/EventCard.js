// // src/components/home/EventCard.js
// import React, { useRef } from 'react';
// import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

// // Helper function to convert pixel motion to tilt degrees
// const tiltFactor = 0.1; // Reduced tiltFactor for less intense tilt
// const rotateX = (y) => `${y * tiltFactor}deg`;
// const rotateY = (x) => `${x * tiltFactor}deg`;

// const EventCard = ({ event }) => {
//   const cardRef = useRef(null);
//   const x = useMotionValue(0); // Mouse x position relative to card center
//   const y = useMotionValue(0); // Mouse y position relative to card center

//   // Reduced stiffness and increased damping for softer spring animation
//   const springConfig = { stiffness: 70, damping: 10 };
//   const rotateXSpring = useSpring(useTransform(y, rotateX), springConfig);
//   const rotateYSpring = useSpring(useTransform(x, rotateY), springConfig);

//   const handleMouseMove = (e) => {
//     if (!cardRef.current) return;
//     const rect = cardRef.current.getBoundingClientRect();
//     const centerX = rect.left + rect.width / 2;
//     const centerY = rect.top + rect.height / 2;
//     x.set(e.clientX - centerX);
//     y.set(e.clientY - centerY);
//   };

//   const handleMouseLeave = () => {
//     x.set(0);
//     y.set(0);
//   };

//   // Function to handle card click (will navigate to event.link)
//   const handleCardClick = () => {
//     if (event.link) {
//       window.open(event.link, '_blank', 'noopener noreferrer');
//     }
//   };

//   return (
//     // Wrap the motion.div with an anchor tag to make the whole card clickable.
//     // We add a tabindex for keyboard navigation.
//     <a
//       href={event.link || '#'} // Fallback to '#' if no link is provided
//       target="_blank"
//       rel="noopener noreferrer"
//       className="block cursor-pointer" // Make the anchor a block element for the motion.div to fill it
//       // No onClick needed on the anchor itself as href handles it.
//       // But adding onMouseMove/Leave directly to the motion.div for effects.
//     >
//       <motion.div
//         ref={cardRef}
//         className="flex flex-col p-5 rounded-2xl text-white w-64 md:w-72 lg:w-80 flex-shrink-0 relative overflow-hidden group h-full" // Added h-full
//         style={{
//           background: 'linear-gradient(145deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.02) 100%)',
//           border: '1px solid rgba(255, 255, 255, 0.08)',
//           boxShadow: '0 3px 10px rgba(0, 0, 0, 0.15)', // Initial subtle shadow
//           backdropFilter: 'blur(8px)',
//           WebkitBackdropFilter: 'blur(8px)',
//           transformStyle: 'preserve-3d',
//           rotateX: rotateXSpring,
//           rotateY: rotateYSpring,
//           // Transition for the shadow itself
//           transition: 'box-shadow 0.3s ease-in-out',
//         }}
//         whileHover={{
//           scale: 1.01,
//           // Enhanced shadow on hover for depth and a subtle glow
//           boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5), inset 0 0 20px rgba(255, 255, 255, 0.15), inset 0 0 8px rgba(255, 255, 255, 0.05)',
//         }}
//         transition={{ type: "spring", stiffness: 200, damping: 20 }}
//         onMouseMove={handleMouseMove}
//         onMouseLeave={handleMouseLeave}
//       >
//         {/* Glare/Shine Effect on Hover - reduced opacity and slower animation */}
//         <motion.div
//           className="absolute inset-0 rounded-2xl pointer-events-none"
//           style={{
//             background: 'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.02) 50%, rgba(255,255,255,0) 100%)',
//             opacity: 0,
//             x: '-100%',
//           }}
//           whileHover={{
//             opacity: 0.5,
//             x: '100%',
//             transition: { duration: 1.5, ease: "linear", repeat: Infinity, repeatType: "loop", delay: 0.3 },
//           }}
//           transition={{ duration: 0.5 }}
//         />

//         {/* Card Content */}
//         {/* All transformZ are still relevant for the 3D tilt perspective */}
//         <div className="relative z-10 flex flex-col items-center text-center h-full">

//           {event.image && (
//             <div className="w-full h-32 md:h-40 rounded-lg overflow-hidden mb-5 transform translateZ(20px)">
//               <img
//                 src={event.image}
//                 alt={event.title}
//                 className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-102"
//                 onError={(e) => { e.target.onerror = null; e.target.src="/images/placeholder.jpg" }}
//               />
//             </div>
//           )}

//           <h3 className="text-xl md:text-2xl font-bold text-white mb-2 line-clamp-2 transform translateZ(20px)">
//             {event.title}
//           </h3>

//           <p className="text-sm text-gray-200 mb-1 transform translateZ(10px)">
//             <span className="font-medium">Date:</span> {event.date}
//           </p>
//           {event.location && (
//             <p className="text-sm text-gray-300 mb-3 transform translateZ(10px)">
//               <span className="font-medium">Location:</span> {event.location}
//             </p>
//           )}
//           {event.speaker && (
//             <p className="text-sm text-gray-300 mb-3 transform translateZ(10px)">
//               <span className="font-medium">Speaker:</span> {event.speaker}
//             </p>
//           )}

//           {event.description && (
//             <p className="text-xs text-gray-400 mb-auto line-clamp-3 leading-relaxed transform translateZ(5px)"> {/* mb-auto pushes remaining content to top */}
//               {event.description}
//             </p>
//           )}

//           {/* Read More button is removed as per request */}
//           {/* A small indicator that it's clickable, like an arrow or subtle text, could be added here if desired */}
//           {/* For example, a small 'Tap to learn more' text, but keeping it minimal for now. */}
//           <div className="text-sm text-blue-400 mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translateZ(10px)">
//             Learn More <span className="ml-1">&rarr;</span>
//           </div>

//         </div>
//       </motion.div>
//     </a>
//   );
// };

// export default EventCard;








// src/components/home/EventCard.js
import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

// Helper function to convert pixel motion to tilt degrees
const tiltFactor = 0.2;
const rotateX = (y) => `${y * tiltFactor}deg`;
const rotateY = (x) => `${x * tiltFactor}deg`;

// Define variants for the "on enter" animation
const cardVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.95 }, // Start slightly below, faded, and smaller
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 20,
      duration: 0.8, // Duration for the entry animation
      delay: 0.1 // Small delay for staggering effect
    }
  }
};

const EventCard = ({ event }) => {
  const cardRef = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { stiffness: 70, damping: 20 };
  const rotateXSpring = useSpring(useTransform(y, rotateX), springConfig);
  const rotateYSpring = useSpring(useTransform(x, rotateY), springConfig);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set(e.clientX - centerX);
    y.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  // No handleCardClick needed here, as the <a> tag handles navigation directly

  return (
    <a
      href={event.link || '#'}
      target="_blank"
      rel="noopener noreferrer"
      className="block"
    >
      <motion.div
        ref={cardRef}
        className="flex flex-col p-5 rounded-2xl text-white w-64 md:w-72 lg:w-80 flex-shrink-0 relative overflow-hidden group h-full cursor-interactive"
        style={{
          background: 'linear-gradient(145deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.02) 100%)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          boxShadow: '0 3px 10px rgba(0, 0, 0, 0.15)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          transformStyle: 'preserve-3d',
          rotateX: rotateXSpring,
          rotateY: rotateYSpring,
          transition: 'box-shadow 0.3s ease-in-out',
        }}
        whileHover={{
          scale: 1.01,
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5), inset 0 0 20px rgba(255, 255, 255, 0.15), inset 0 0 8px rgba(255, 255, 255, 0.05)',
        }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}

        // --- UPDATED: On Enter Animation Props using whileInView ---
        variants={cardVariants}
        initial="hidden"
        whileInView="visible" // This triggers the animation when the element enters the viewport
        viewport={{ once: true, amount: 0.2 }} // Play animation only once, when 20% of the element is visible
      >
        {/* Glare/Shine Effect on Hover */}
        <motion.div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{
            background: 'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.02) 50%, rgba(255,255,255,0) 100%)',
            opacity: 0,
            x: '-100%',
          }}
          whileHover={{
            opacity: 0.5,
            x: '100%',
            transition: { duration: 1.5, ease: "linear", repeat: Infinity, repeatType: "loop", delay: 0.3 },
          }}
          transition={{ duration: 0.5 }}
        />

        {/* Card Content */}
        <div className="relative z-10 flex flex-col items-center text-center h-full">

          {event.image && (
            <div className="w-full h-32 md:h-40 rounded-lg overflow-hidden mb-5 transform translateZ(20px)">
              <img
                src={event.image}
                alt={event.title}
                className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-102 cursor-interactive"
                onError={(e) => { e.target.onerror = null; e.target.src="/images/placeholder.jpg" }}
              />
            </div>
          )}

          <h3 className="text-xl md:text-2xl font-bold text-white mb-2 line-clamp-2 transform translateZ(20px)">
            {event.title}
          </h3>

          <p className="text-sm text-gray-200 mb-1 transform translateZ(10px)">
            <span className="font-medium">Date:</span> {event.date}
          </p>
          {event.location && (
            <p className="text-sm text-gray-300 mb-3 transform translateZ(10px)">
              <span className="font-medium">Location:</span> {event.location}
            </p>
          )}
          {event.speaker && (
            <p className="text-sm text-gray-300 mb-3 transform translateZ(10px)">
              <span className="font-medium">Speaker:</span> {event.speaker}
            </p>
          )}

          {event.description && (
            <p className="text-xs text-gray-400 mb-auto line-clamp-3 leading-relaxed transform translateZ(5px)">
              {event.description}
            </p>
          )}

          <div className="text-sm text-blue-400 mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translateZ(10px) cursor-interactive">
            Learn More <span className="ml-1">&rarr;</span>
          </div>

        </div>
      </motion.div>
    </a>
  );
};

export default EventCard;