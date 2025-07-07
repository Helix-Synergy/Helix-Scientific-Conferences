// // src/components/Button.js
// import React from 'react';
// import { Link } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import { useCursor } from './CustomCursor'; // Import the custom cursor hook

// const Button = ({ children, to, onClick, variant = 'primary', className = '' }) => {
//   const { setCursorVariant } = useCursor();

//   const handleMouseEnter = () => setCursorVariant('interactive');
//   const handleMouseLeave = () => setCursorVariant('default');

//   const baseClasses = "font-semibold py-3 px-6 rounded-lg text-lg transition-all duration-300 flex items-center justify-center whitespace-nowrap";

//   const variants = {
//     primary: "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg transform hover:-translate-y-1",
//     secondary: "bg-transparent border-2 border-white hover:border-primary text-white hover:text-primary transform hover:-translate-y-1",
//     buyTicket: "relative w-24 h-24 rounded-full bg-gradient-to-br from-blue-600 to-purple-700 flex flex-col items-center justify-center text-white text-xs font-semibold shadow-lg overflow-hidden group hover:scale-105 transition-transform duration-300",
//     // Add more variants as needed
//   };

//   const content = (
//     <motion.span
//       className={`${baseClasses} ${variants[variant]} ${className}`}
//       onMouseEnter={handleMouseEnter}
//       onMouseLeave={handleMouseLeave}
//       whileTap={{ scale: 0.95 }}
//     >
//       {children}
//     </motion.span>
//   );

//   return to ? (
//     <Link to={to} onClick={onClick}>
//       {content}
//     </Link>
//   ) : (
//     <button onClick={onClick}>
//       {content}
//     </button>
//   );
// };

// export default Button;





// src/components/Button.js
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useCursor } from './CustomCursor';

const Button = ({ children, to, onClick, variant = 'primary', className = '' }) => {
  const { setCursorVariant } = useCursor();

  const handleMouseEnter = () => setCursorVariant('interactive');
  const handleMouseLeave = () => setCursorVariant('default');

  // Removed 'buyTicket' variant.
  // 'navLink' variant added for the subtle hover animation on nav items.
  // 'primary' and 'secondary' remain for general buttons.
  const baseClasses = "font-semibold py-3 px-6 rounded-lg text-lg transition-all duration-300 flex items-center justify-center whitespace-nowrap";

  const variants = {
    primary: "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg transform hover:-translate-y-1",
    secondary: "bg-transparent border-2 border-white hover:border-primary text-white hover:text-primary transform hover:-translate-y-1",
    navLink: "hover:scale-105 hover:rotate-[1deg] transform transition-transform duration-300 ease-out", // Apply a subtle scale/rotate on hover
  };

  const content = (
    <motion.span
      className={`${baseClasses} ${variants[variant]} ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      whileTap={{ scale: 0.95 }}
    >
      {children}
    </motion.span>
  );

  return to ? (
    <Link to={to} onClick={onClick}>
      {content}
    </Link>
  ) : (
    <button onClick={onClick}>
      {content}
    </button>
  );
};

export default Button;