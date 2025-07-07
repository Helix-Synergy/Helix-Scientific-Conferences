// // src/components/SatisfiedClientCounter.js
// import React, { useState, useEffect } from 'react';
// import { motion, useSpring, animate } from 'framer-motion';

// function SatisfiedClientCounter({ data, isInView }) {
//   const [displayCount, setDisplayCount] = useState(0);

//   const count = useSpring(0, {
//     stiffness: 100,
//     damping: 15,
//     restDelta: 0.001
//   });

//   useEffect(() => {
//     if (isInView && data?.count) {
//       // Start from 0 and animate to the full count
//       const controls = animate(count, data.count, {
//         type: 'spring',
//         stiffness: 80, // Slightly less stiff for a smoother count
//         damping: 15,
//         restDelta: 0.001,
//         delay: 0.8 // Delay to start after image appears
//       });
//       return () => controls.stop();
//     } else if (!isInView) {
//       count.set(0); // Reset when out of view
//     }
//   }, [isInView, data?.count, count]);

//   useEffect(() => {
//     const unsubscribe = count.onChange((latest) => {
//       // Format number with K if over 1000
//       const formatted = latest >= 1000 ? `${Math.round(latest / 1000)}K` : Math.round(latest);
//       setDisplayCount(formatted);
//     });
//     return () => unsubscribe();
//   }, [count]);

//   return (
//     <motion.div
//       className="absolute bottom-6 left-6 p-3 pr-6 bg-gradient-to-r from-purple-800 to-blue-900 rounded-full flex items-center shadow-lg"
//       style={{
//         background: 'rgba(255, 255, 255, 0.15)', // Light transparent background
//         borderRadius: '9999px', // Fully rounded
//         border: '1px solid rgba(255, 255, 255, 0.2)', // Subtle white border
//         backdropFilter: 'blur(10px)', // Glassmorphism blur
//         WebkitBackdropFilter: 'blur(10px)', // Safari support
//       }}
//       initial={{ opacity: 0, y: 50, scale: 0.8 }}
//       animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
//       transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }} // Appears after images
//     >
//       <div className="flex -space-x-2 mr-3"> {/* Overlapping avatars */}
//         {data?.avatars.map((avatar, index) => (
//           <img
//             key={index}
//             src={avatar}
//             alt={`Client ${index + 1}`}
//             className="w-10 h-10 rounded-full border-2 border-white object-cover"
//             style={{ zIndex: data.avatars.length - index }} // Ensure correct overlap order
//           />
//         ))}
//         {/* Plus icon for more clients */}
//         <div className="w-10 h-10 rounded-full bg-white text-blue-800 flex items-center justify-center text-xl font-bold border-2 border-white">
//           +
//         </div>
//       </div>
//       <div className="text-white text-lg font-bold">
//         {displayCount}{data?.label}
//       </div>
//     </motion.div>
//   );
// }

// export default SatisfiedClientCounter;













// // src/components/SatisfiedClientCounter.js
// import React, { useState, useEffect } from 'react';
// import { motion, useSpring, animate } from 'framer-motion';

// // The component now expects a single 'data' prop which is an object
// function SatisfiedClientCounter({ data, isInView }) {
//   const [displayValue, setDisplayValue] = useState(0);

//   // Destructure count, label, and avatars from the 'data' prop
//   const { count: totalCount, label, avatars } = data;

//   const countSpring = useSpring(0, { // Renamed to avoid conflict with 'count' variable
//     stiffness: 100,
//     damping: 15,
//     restDelta: 0.001
//   });

//   useEffect(() => {
//     // Ensure totalCount is a valid number before animating
//     if (isInView && typeof totalCount === 'number' && !isNaN(totalCount)) {
//       countSpring.set(totalCount / 2); // Start counting from half

//       const controls = animate(countSpring, totalCount, { // Animate to the full 'totalCount'
//         type: 'spring',
//         stiffness: 100,
//         damping: 15,
//         restDelta: 0.001,
//         delay: 0.2
//       });

//       return () => controls.stop();
//     } else {
//       countSpring.set(0); // Reset if not in view or value is invalid
//     }
//   }, [isInView, totalCount, countSpring]); // Dependency on totalCount

//   useEffect(() => {
//     const unsubscribe = countSpring.onChange((latest) => {
//       // Divide by 1000 and round to get 'K' value, then round the final display for integers
//       setDisplayValue(Math.round(latest / 1000));
//     });
//     return () => unsubscribe();
//   }, [countSpring]);

//   return (
//     <motion.div
//       className="flex flex-col items-start p-3 rounded-lg text-left w-full"
//       style={{
//         background: 'rgba(255, 255, 255, 0.08)',
//         borderRadius: '16px',
//         border: '1px solid rgba(255, 255, 255, 0.18)',
//         boxShadow: '0 4px 16px 0 rgba(31, 38, 135, 0.2)',
//         backdropFilter: 'blur(4px)',
//         WebkitBackdropFilter: 'blur(4px)',
//       }}
//       initial={{ opacity: 0, y: 20 }}
//       animate={isInView ? { opacity: 1, y: 0 } : {}}
//       transition={{ duration: 0.5, delay: 0.2 }}
//     >
//       {/* Avatar Group - now using 'avatars' from the data prop */}
//       <div className="flex items-center mb-2">
//         {avatars && avatars.map((src, index) => ( // Check if avatars exist before mapping
//           <motion.img
//             key={index}
//             src={src}
//             alt={`Client ${index + 1}`}
//             className="w-10 h-10 rounded-full border-2 border-white object-cover"
//             style={{ marginLeft: index > 0 ? '-0.5rem' : '0' }}
//             initial={{ opacity: 0, x: -20 }}
//             animate={isInView ? { opacity: 1, x: 0 } : {}}
//             transition={{ delay: 0.5 + index * 0.1, duration: 0.3 }}
//           />
//         ))}
//         {/* Plus circle */}
//         <motion.div
//           className="w-10 h-10 rounded-full bg-yellow-500 flex items-center justify-center text-white font-bold text-xl border-2 border-white"
//           style={{ marginLeft: '-0.5rem' }}
//           initial={{ opacity: 0, x: -20 }}
//           animate={isInView ? { opacity: 1, x: 0 } : {}}
//           transition={{ delay: 0.5 + (avatars ? avatars.length : 0) * 0.1, duration: 0.3 }}
//         >
//           +
//         </motion.div>
//       </div>

//       {/* Counter Value and Label */}
//       <div className="text-xl md:text-xl font-bold text-white drop-shadow-md whitespace-nowrap">
//         <span className="inline-block">{displayValue}K</span>
//       </div>
//       <p className="text-sm md:text-sm text-white/90 font-medium tracking-wide whitespace-nowrap">
//         {label} {/* Use the label from the data prop */}
//       </p>
//     </motion.div>
//   );
// }

// export default SatisfiedClientCounter;



// src/components/SatisfiedClientCounter.js
import React, { useState, useEffect } from 'react';
import { motion, useSpring, animate } from 'framer-motion';

function SatisfiedClientCounter({ data, isInView }) {
  const [displayValue, setDisplayValue] = useState(0);

  const { count: totalCount, label, avatars } = data;

  const countSpring = useSpring(0, {
    stiffness: 100,
    damping: 15,
    restDelta: 0.001
  });

  useEffect(() => {
    if (isInView && typeof totalCount === 'number' && !isNaN(totalCount)) {
      countSpring.set(totalCount / 2);

      const controls = animate(countSpring, totalCount, {
        type: 'spring',
        stiffness: 100,
        damping: 15,
        restDelta: 0.001,
        delay: 0.2
      });

      return () => controls.stop();
    } else {
      countSpring.set(0);
    }
  }, [isInView, totalCount, countSpring]);

  useEffect(() => {
    const unsubscribe = countSpring.onChange((latest) => {
      setDisplayValue(Math.round(latest / 1000));
    });
    return () => unsubscribe();
  }, [countSpring]);

  return (
    <motion.div
      // MODIFIED: Reduced vertical padding from py-3 to py-2
      className="flex flex-row items-center py-2 px-6 text-left w-full justify-center md:justify-start"
      style={{
        background: 'rgba(255, 255, 255, 0.08)',
        borderRadius: '50px',
        border: '1px solid rgba(255, 255, 255, 0.18)',
        boxShadow: '0 4px 16px 0 rgba(31, 38, 135, 0.2)',
        backdropFilter: 'blur(4px)',
        WebkitBackdropFilter: 'blur(4px)',
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      {/* Avatar Group */}
      <div className="flex items-center mr-3">
        {avatars && avatars.map((src, index) => (
          <motion.img
            key={index}
            src={src}
            alt={`Client ${index + 1}`}
            className="w-10 h-10 rounded-full border-2 border-white object-cover"
            style={{ marginLeft: index > 0 ? '-0.5rem' : '0' }}
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.5 + index * 0.1, duration: 0.3 }}
          />
        ))}
        {/* Plus circle */}
        <motion.div
          className="w-10 h-10 rounded-full bg-yellow-500 flex items-center justify-center text-white font-bold text-xl border-2 border-white"
          style={{ marginLeft: '-0.5rem' }}
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ delay: 0.5 + (avatars ? avatars.length : 0) * 0.1, duration: 0.3 }}
        >
          +
        </motion.div>
      </div>

      {/* Counter Value and Label */}
      <div className="flex items-baseline whitespace-nowrap">
        <span className="text-xl md:text-xl font-bold text-white drop-shadow-md inline-block">
          {displayValue}K
        </span>
        <span className="text-sm md:text-sm text-white/90 font-medium tracking-wide ml-1">
          {label}
        </span>
      </div>
    </motion.div>
  );
}

export default SatisfiedClientCounter;