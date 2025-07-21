// import React from 'react';
// import { motion } from 'framer-motion';

// const lineProps = {
//   stroke: '#000',
//   strokeWidth: 3,
//   strokeLinecap: 'round',
// };

// export default function AnimatedHamburger_AccordionFold({ isOpen, onClick }) {
//   return (
//     <button
//       aria-label="Menu"
//       className="w-12 h-12 flex items-center justify-center focus:outline-none"
//       onClick={onClick}
//       type="button"
//     >
//       <svg width="32" height="32" viewBox="0 0 32 32">
//         <motion.line
//           x1="6" y1="10" x2="26" y2="10"
//           {...lineProps}
//           animate={isOpen ? { y: 12 } : { y: 0 }}
//           transition={{ duration: 0.3 }}
//         />
//         <motion.line
//           x1="6" y1="16" x2="26" y2="16"
//           {...lineProps}
//           animate={isOpen ? { scaleX: 0 } : { scaleX: 1 }}
//           transition={{ duration: 0.2 }}
//         />
//         <motion.line
//           x1="6" y1="22" x2="26" y2="22"
//           {...lineProps}
//           animate={isOpen ? { y: -12 } : { y: 0 }}
//           transition={{ duration: 0.3 }}
//         />
//       </svg>
//     </button>
//   );
// } 

// src/components/hamburger/AnimatedHamburger_AccordionFold.js
import React from 'react';
import { motion } from 'framer-motion';

const lineProps = {
  stroke: '#000',
  strokeWidth: 4, // Thicker lines for visibility
  strokeLinecap: 'round',
};

export default function AnimatedHamburger_AccordionFold({ isOpen, onClick, buttonClassName }) {
  return (
    <button
      aria-label="Menu"
      className={`w-12 h-12 flex items-center justify-center focus:outline-none ${buttonClassName}`}
      onClick={onClick}
      type="button"
    >
      <svg width="32" height="32" viewBox="0 0 32 32">
        {/* Top line moves to center when open */}
        <motion.line
          x1="6"
          x2="26"
          y1={isOpen ? 16 : 10}
          y2={isOpen ? 16 : 10}
          {...lineProps}
          transition={{ duration: 0.3 }}
        />
        {/* Middle line fades out when open */}
        <motion.line
          x1="6"
          x2="26"
          y1="16"
          y2="16"
          {...lineProps}
          initial={{ opacity: 1 }} // Fix: Provide an explicit initial opacity value
          animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
          transition={{ duration: 0.2 }}
        />
        {/* Bottom line moves to center when open */}
        <motion.line
          x1="6"
          x2="26"
          y1={isOpen ? 16 : 22}
          y2={isOpen ? 16 : 22}
          {...lineProps}
          transition={{ duration: 0.3 }}
        />
      </svg>
    </button>
  );
}