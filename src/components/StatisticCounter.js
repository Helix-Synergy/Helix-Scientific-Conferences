// src/components/StatisticCounter.js
import React, { useState, useEffect } from 'react';
import { motion, useSpring, animate } from 'framer-motion';

function StatisticCounter({ icon: IconComponent, value, label, isInView }) {
  const [displayValue, setDisplayValue] = useState(0);

  const count = useSpring(0, {
    stiffness: 100,
    damping: 15,
    restDelta: 0.001
  });

  useEffect(() => {
    if (isInView) {
      count.set(value / 2);

      const controls = animate(count, value, {
        type: 'spring',
        stiffness: 100,
        damping: 15,
        restDelta: 0.001,
        delay: 0.2
      });

      return () => controls.stop();
    } else {
      count.set(0);
    }
  }, [isInView, value, count]);

  useEffect(() => {
    const unsubscribe = count.onChange((latest) => {
      setDisplayValue(Math.round(latest));
    });
    return () => unsubscribe();
  }, [count]);

  return (
    <motion.div
      // Reduced padding for a more minimal look
      className="flex flex-col items-center justify-center p-2 sm:p-3 rounded-lg text-center"
      style={{
        background: 'rgba(255, 255, 255, 0.08)',
        borderRadius: '16px',
        border: '1px solid rgba(255, 255, 255, 0.18)',
        boxShadow: '0 4px 16px 0 rgba(31, 38, 135, 0.2)', // Reduced shadow for minimal look
        backdropFilter: 'blur(4px)',
        WebkitBackdropFilter: 'blur(4px)',
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      {IconComponent && (
        // motion.div wrapper for the icon to enable floating animation
        <motion.div
          animate={{ y: [0, -5, 0] }} // Animate y from 0 to -5px and back to 0
          transition={{
            duration: 2.5, // Duration of one cycle of floating
            repeat: Infinity, // Repeat indefinitely
            ease: "easeInOut", // Smooth start and end
            repeatType: "mirror", // Go up and then down smoothly
            delay: 0.5 // Start the floating a bit after the card appears
          }}
        >
          {/* Reduced icon size and margin-bottom for a minimal look */}
          <IconComponent className="h-8 w-8 mb-1 text-white" />
        </motion.div>
      )}
      <div
        // Reduced font size and margin-bottom for a minimal look
        className="text-2xl md:text-xl font-bold mb-0.5 leading-none text-white drop-shadow-md"
      >
        <span className="inline-block">{displayValue}</span>
        {(label === "Conferences Conducted" || label === "Attendees" || label === "Speakers" || label === "Publications") && "+"}
      </div>
      <p
        // Reduced font size for a minimal look
        className="text-xs md:text-xs text-white/90 font-medium tracking-wide"
      >
        {label}
      </p>
    </motion.div>
  );
}

export default StatisticCounter;



// // src/components/StatisticCounter.js
// import React, { useState, useEffect } from 'react';
// import { motion, useSpring, animate } from 'framer-motion';

// function StatisticCounter({ icon: IconComponent, value, label, isInView }) {
//   const [displayValue, setDisplayValue] = useState(0);

//   const count = useSpring(0, {
//     stiffness: 100,
//     damping: 15,
//     restDelta: 0.001
//   });

//   useEffect(() => {
//     if (isInView) {
//       count.set(value / 2);

//       const controls = animate(count, value, {
//         type: 'spring',
//         stiffness: 100,
//         damping: 15,
//         restDelta: 0.001,
//         delay: 0.2
//       });

//       return () => controls.stop();
//     } else {
//       count.set(0);
//     }
//   }, [isInView, value, count]);

//   useEffect(() => {
//     const unsubscribe = count.onChange((latest) => {
//       setDisplayValue(Math.round(latest));
//     });
//     return () => unsubscribe();
//   }, [count]);

//   return (
//     <motion.div
//       className="flex flex-col items-center justify-center p-4 sm:p-6 rounded-lg text-center"
//       style={{
//         background: 'rgba(255, 255, 255, 0.08)',
//         borderRadius: '16px',
//         border: '1px solid rgba(255, 255, 255, 0.18)',
//         boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
//         backdropFilter: 'blur(4px)',
//         WebkitBackdropFilter: 'blur(4px)',
//       }}
//       initial={{ opacity: 0, y: 20 }}
//       animate={isInView ? { opacity: 1, y: 0 } : {}}
//       transition={{ duration: 0.5, delay: 0.2 }}
//     >
//       {IconComponent && (
//         // ADDED: motion.div wrapper for the icon to enable floating animation
//         <motion.div
//           animate={{ y: [0, -5, 0] }} // Animate y from 0 to -5px and back to 0
//           transition={{
//             duration: 2.5, // Duration of one cycle of floating
//             repeat: Infinity, // Repeat indefinitely
//             ease: "easeInOut", // Smooth start and end
//             repeatType: "mirror", // Go up and then down smoothly
//             delay: 0.5 // Start the floating a bit after the card appears
//           }}
//         >
//           <IconComponent className="h-16 w-16 mb-2 text-white" />
//         </motion.div>
//       )}
//       <div className="text-4xl md:text-3xl font-bold mb-1 leading-none text-white drop-shadow-md">
//         <span className="inline-block">{displayValue}</span>
//         {label === "Conferences Conducted" && "+"}
//         {label === "Attendees" && "+"}
//         {label === "Speakers" && "+"}
//         {label === "Publications" && "+"}
//       </div>
//       <p className="text-base md:text-sm text-white/90 font-medium tracking-wide">
//         {label}
//       </p>
//     </motion.div>
//   );
// }

// export default StatisticCounter;