// // // import React, { useState, useEffect, useContext } from 'react';
// // // import { motion } from 'framer-motion';

// // // // --- Custom Cursor Context (New file, or integrated into a central context if you have one) ---
// // // // For simplicity for now, we'll define it here.
// // // // In a larger app, you might move this to src/context/CursorContext.js
// // // const CursorContext = React.createContext(null);

// // // export const CursorProvider = ({ children }) => {
// // //   const [cursorVariant, setCursorVariant] = useState('default'); // 'default', 'text', 'button', etc.
// // //   const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

// // //   useEffect(() => {
// // //     const mouseMove = (e) => {
// // //       setMousePosition({ x: e.clientX, y: e.clientY });
// // //     };

// // //     window.addEventListener('mousemove', mouseMove);

// // //     return () => {
// // //       window.removeEventListener('mousemove', mouseMove);
// // //     };
// // //   }, []);

// // //   const variants = {
// // //     default: {
// // //       x: mousePosition.x - 16, // Half of size
// // //       y: mousePosition.y - 16, // Half of size
// // //       backgroundColor: 'rgba(255, 255, 255, 0.4)', // Semi-transparent white
// // //       mixBlendMode: 'difference',
// // //       height: 32,
// // //       width: 32,
// // //       transition: { type: 'tween', ease: 'backOut', duration: 0.1 }
// // //     },
// // //     interactive: { // For hoverable elements like buttons, links
// // //       x: mousePosition.x - 24, // Half of new size
// // //       y: mousePosition.y - 24, // Half of new size
// // //       backgroundColor: 'rgba(74, 217, 245, 0.8)', // Example accent color, adjust as needed
// // //       mixBlendMode: 'difference',
// // //       height: 48,
// // //       width: 48,
// // //       transition: { type: 'tween', ease: 'backOut', duration: 0.1 }
// // //     },
// // //     // Add more variants as needed, e.g., for text hover, image hover
// // //   };

// // //   return (
// // //     <CursorContext.Provider value={{ setCursorVariant }}>
// // //       {children}
// // //       <motion.div
// // //         className="fixed top-0 left-0 rounded-full pointer-events-none z-[9999]"
// // //         variants={variants}
// // //         animate={cursorVariant}
// // //       />
// // //     </CursorContext.Provider>
// // //   );
// // // };

// // // export const useCursor = () => useContext(CursorContext);

// // // export default CursorProvider;











// // // // src/components/CustomCursor.js

// // // import React, { useState, useEffect, useContext, createContext } from 'react';
// // // import { motion } from 'framer-motion';

// // // // 1. Create the Cursor Context
// // // // This context will provide the `setCursorVariant` function to components
// // // const CursorContext = createContext(null);

// // // // 2. Create the Cursor Provider Component
// // // // This component wraps your application and manages the custom cursor's state and rendering
// // // export const CursorProvider = ({ children }) => {
// // //   // State to control which animation variant (style) the cursor should currently use
// // //   const [cursorVariant, setCursorVariant] = useState('default');

// // //   // State to store the real-time mouse position
// // //   const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

// // //   // useEffect hook to handle mouse movement and hide the default cursor
// // //   useEffect(() => {
// // //     // Hide the default system cursor for the entire body
// // //     document.body.style.cursor = 'none';

// // //     // Event handler for mouse movement
// // //     const mouseMove = (e) => {
// // //       setMousePosition({ x: e.clientX, y: e.clientY });
// // //     };

// // //     // Add the mousemove event listener to the window
// // //     window.addEventListener('mousemove', mouseMove);

// // //     // Cleanup function:
// // //     // - Remove the event listener when the component unmounts
// // //     // - Restore the default system cursor
// // //     return () => {
// // //       window.removeEventListener('mousemove', mouseMove);
// // //       document.body.style.cursor = 'default';
// // //     };
// // //   }, []); // Empty dependency array ensures this effect runs once on mount and cleans up on unmount

// // //   // Define Framer Motion variants for the "Distortion Field" effect
// // //   const variants = {
// // //     // Default cursor style (subtle inversion field)
// // //     default: {
// // //       // Position: Centered on the mouse pointer based on its height/width
// // //       x: mousePosition.x - 40, // Half of 80px width
// // //       y: mousePosition.y - 40, // Half of 80px height
// // //       height: 80, // Size of the distortion field
// // //       width: 80,
// // //       // backdropFilter applies effects to the content *behind* this element
// // //       backdropFilter: 'invert(100%)', // Inverts colors behind the cursor
// // //       backgroundColor: 'rgba(255, 255, 255, 0)', // Cursor element itself is transparent
// // //       opacity: 0.8, // Slightly opaque to make the backdropFilter effect more visible
// // //       // Framer Motion transition for smooth animation
// // //       transition: { type: 'spring', stiffness: 500, damping: 30 },
// // //     },
// // //     // Interactive cursor style (more intense distortion for clickable elements)
// // //     interactive: {
// // //       x: mousePosition.x - 60, // Half of 120px width (larger field)
// // //       y: mousePosition.y - 60, // Half of 120px height
// // //       height: 120, // Larger size for interactive elements
// // //       width: 120,
// // //       backdropFilter: 'invert(100%) hue-rotate(180deg)', // Adds a hue shift for more drama
// // //       backgroundColor: 'rgba(255, 255, 255, 0.1)', // Slightly visible active state
// // //       opacity: 1, // Fully opaque for stronger effect
// // //       transition: { type: 'spring', stiffness: 500, damping: 30 },
// // //     },
// // //     // Example of another possible distortion field (e.g., for blur effect)
// // //     blurField: {
// // //         x: mousePosition.x - 50,
// // //         y: mousePosition.y - 50,
// // //         height: 100,
// // //         width: 100,
// // //         backdropFilter: 'blur(10px) saturate(200%)', // Blurs and saturates content behind
// // //         backgroundColor: 'rgba(0, 0, 0, 0.2)', // Slightly dark overlay
// // //         opacity: 0.9,
// // //         transition: { type: 'spring', stiffness: 500, damping: 30 },
// // //     }
// // //   };

// // //   return (
// // //     // Provide the setCursorVariant function to all children components
// // //     <CursorContext.Provider value={{ setCursorVariant }}>
// // //       {children} {/* Render all child components passed to CursorProvider */}

// // //       {/* The actual custom cursor element */}
// // //       <motion.div
// // //         className="fixed top-0 left-0 rounded-full pointer-events-none z-[9999]"
// // //         // mixBlendMode property is applied directly via style here.
// // //         // It determines how the cursor element's content blends with its parent's content.
// // //         // 'difference' creates a contrasting/inverted effect which complements backdrop-filter.
// // //         style={{ mixBlendMode: 'difference' }}
// // //         variants={variants} // Link to the defined animation variants
// // //         animate={cursorVariant} // Animate to the currently active cursor variant
// // //       />
// // //     </CursorContext.Provider>
// // //   );
// // // };

// // // // 3. Create the useCursor Hook
// // // // This custom hook simplifies accessing the setCursorVariant function in other components
// // // export const useCursor = () => {
// // //   const context = useContext(CursorContext);
// // //   // Throw an error if the hook is used outside of a CursorProvider
// // //   if (!context) {
// // //     throw new Error("useCursor must be used within a CursorProvider");
// // //   }
// // //   return context;
// // // };

// // // // Export the CursorProvider as the default export for easy import in App.js
// // // export default CursorProvider;





// // // src/components/CustomCursor.js

// // import React, { useState, useEffect, useContext, createContext } from 'react';
// // import { motion } from 'framer-motion';

// // // 1. Create the Cursor Context
// // // This context will provide the `setCursorVariant` function to components
// // const CursorContext = createContext(null);

// // // 2. Create the Cursor Provider Component
// // // This component wraps your application and manages the custom cursor's state and rendering
// // export const CursorProvider = ({ children }) => {
// //   // State to control which animation variant (style) the cursor should currently use
// //   const [cursorVariant, setCursorVariant] = useState('default');

// //   // State to store the real-time mouse position
// //   const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

// //   // useEffect hook to handle mouse movement and hide the default cursor
// //   useEffect(() => {
// //     // Hide the default system cursor for the entire body
// //     document.body.style.cursor = 'none';

// //     // Event handler for mouse movement
// //     const mouseMove = (e) => {
// //       setMousePosition({ x: e.clientX, y: e.clientY });
// //     };

// //     // Add the mousemove event listener to the window
// //     window.addEventListener('mousemove', mouseMove);

// //     // Cleanup function:
// //     // - Remove the event listener when the component unmounts
// //     // - Restore the default system cursor
// //     return () => {
// //       window.removeEventListener('mousemove', mouseMove);
// //       document.body.style.cursor = 'default';
// //     };
// //   }, []); // Empty dependency array ensures this effect runs once on mount and cleans up on unmount

// //   // Define Framer Motion variants for the "Interactive Glow" effect
// //   const variants = {
// //     // Default style: Small, subtle dot
// //     default: {
// //       // Position: Centered on the mouse pointer based on its height/width
// //       x: mousePosition.x - 8, // Half of 16px width
// //       y: mousePosition.y - 8, // Half of 16px height
// //       height: 16, // Default size of the cursor dot
// //       width: 16,
// //       backgroundColor: 'rgba(255, 255, 255, 0.7)', // Semi-transparent white dot
// //       scale: 1, // Ensure base scale is 1
// //       // No shadow or glow by default
// //       filter: 'brightness(100%) drop-shadow(0 0 0px rgba(0, 0, 0, 0))',
// //       // Framer Motion spring transition for smooth, bouncy movement
// //       transition: { type: 'spring', stiffness: 500, damping: 30 },
// //     },
// //     // Interactive style: Expands, changes color, and emits a soft glow
// //     interactive: {
// //       x: mousePosition.x - 24, // Half of 48px width (larger size)
// //       y: mousePosition.y - 24, // Half of 48px height
// //       height: 48, // Expanded size for interactive elements
// //       width: 48,
// //       backgroundColor: 'rgba(74, 217, 245, 0.8)', // Brighter, accent color (cyan)
// //       scale: 1, // Keep scale at 1, size change is handled by height/width
// //       // Apply brightness and a matching drop-shadow for the glow effect
// //       filter: 'brightness(120%) drop-shadow(0 0 10px rgba(74, 217, 245, 0.8))',
// //       transition: { type: 'spring', stiffness: 500, damping: 30 },
// //     },
// //     // You can add more specific variants if needed, for other unique interactions.
// //     // Example: A text input cursor (if you want a different style for text fields)
// //     text: {
// //         x: mousePosition.x - 1, // Position for a thin vertical line
// //         y: mousePosition.y - 12,
// //         backgroundColor: "rgba(255, 255, 255, 0.9)",
// //         height: 24,
// //         width: 2,
// //         borderRadius: "0%", // Make it a rectangle/line (override default rounded-full)
// //         filter: 'none', // No glow or shadow for text cursor
// //         transition: { type: 'spring', stiffness: 500, damping: 30 },
// //     },
// //   };

// //   return (
// //     // Provide the setCursorVariant function to all children components
// //     <CursorContext.Provider value={{ setCursorVariant }}>
// //       {children} {/* Render all child components passed to CursorProvider */}

// //       {/* The actual custom cursor element */}
// //       <motion.div
// //         className="fixed top-0 left-0 rounded-full pointer-events-none z-[9999]"
// //         // mixBlendMode property is applied directly via style here.
// //         // 'difference' creates a contrasting/inverted effect which can look unique
// //         // over varied backgrounds, as you previously liked.
// //         style={{ mixBlendMode: 'difference' }}
// //         variants={variants} // Link to the defined animation variants
// //         animate={cursorVariant} // Animate to the currently active cursor variant
// //       />
// //     </CursorContext.Provider>
// //   );
// // };

// // // 3. Create the useCursor Hook
// // // This custom hook simplifies accessing the setCursorVariant function in other components
// // export const useCursor = () => {
// //   const context = useContext(CursorContext);
// //   // Throw an error if the hook is used outside of a CursorProvider
// //   if (!context) {
// //     throw new Error("useCursor must be used within a CursorProvider");
// //   }
// //   return context;
// // };

// // // Export the CursorProvider as the default export for easy import in App.js
// // export default CursorProvider;



// // src/components/CustomCursor.js

// import React, { useState, useEffect, useContext, createContext, useCallback } from 'react';
// import { motion, useAnimation } from 'framer-motion';

// // 1. Create the Cursor Context
// const CursorContext = createContext(null);

// // 2. Create the Cursor Provider Component
// export const CursorProvider = ({ children }) => {
//   const [cursorVariant, setCursorVariant] = useState('default');
//   const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

//   // Framer Motion controls for the dot and ring, allowing programmatic animation
//   const cursorDotControls = useAnimation();
//   const cursorRingControls = useAnimation();

//   useEffect(() => {
//     document.body.style.cursor = 'none';

//     const mouseMove = (e) => {
//       setMousePosition({ x: e.clientX, y: e.clientY });
//     };

//     window.addEventListener('mousemove', mouseMove);

//     return () => {
//       window.removeEventListener('mousemove', mouseMove);
//       document.body.style.cursor = 'default';
//     };
//   }, []);

//   // Use a separate useEffect for animating the cursor elements based on mousePosition
//   useEffect(() => {
//     // Animate the main ring immediately to the mouse position
//     cursorRingControls.start({
//       x: mousePosition.x - 20, // Center the 40px ring
//       y: mousePosition.y - 20,
//       transition: { type: 'spring', stiffness: 500, damping: 30 }
//     });

//     // Animate the chasing dot with a slight delay
//     // This creates the 'chasing' effect
//     cursorDotControls.start({
//       x: mousePosition.x - 4, // Center the 8px dot
//       y: mousePosition.y - 4,
//       transition: { type: 'spring', stiffness: 400, damping: 25, delay: 0.05 } // Slight delay
//     });

//   }, [mousePosition, cursorDotControls, cursorRingControls]); // Re-run when mousePosition changes

//   // Define Framer Motion variants for different interaction states
//   const cursorVariants = {
//     default: {
//       cursorDot: {
//         height: 8,
//         width: 8,
//         backgroundColor: 'rgba(255, 255, 255, 0.9)', // White dot
//         opacity: 1,
//         filter: 'none',
//         borderRadius: '50%',
//       },
//       cursorRing: {
//         height: 40,
//         width: 40,
//         border: '2px solid rgba(74, 217, 245, 0.4)', // Semi-transparent cyan ring
//         backgroundColor: 'transparent',
//         opacity: 1,
//         filter: 'none',
//         borderRadius: '50%',
//       },
//     },
//     // Interactive state: Dot expands, ring expands and glows
//     interactive: {
//       cursorDot: {
//         height: 24, // Dot expands
//         width: 24,
//         backgroundColor: 'rgba(74, 217, 245, 0.9)', // Dot changes to cyan
//         opacity: 1,
//         filter: 'brightness(120%) drop-shadow(0 0 8px rgba(74, 217, 245, 0.8))',
//         borderRadius: '50%',
//       },
//       cursorRing: {
//         height: 60, // Ring expands
//         width: 60,
//         border: '3px solid rgba(74, 217, 245, 0.8)', // Ring border becomes more solid
//         backgroundColor: 'rgba(74, 217, 245, 0.1)', // Slight fill
//         opacity: 1,
//         filter: 'brightness(120%) drop-shadow(0 0 15px rgba(74, 217, 245, 0.7))', // Ring glows
//         borderRadius: '50%',
//       },
//     },
//     // Example: Text input cursor (a vertical line)
//     text: {
//       cursorDot: {
//         height: 24,
//         width: 2,
//         backgroundColor: "rgba(255, 255, 255, 0.9)",
//         borderRadius: "0%", // Make it a rectangle/line
//         opacity: 1,
//         filter: 'none',
//       },
//       cursorRing: { // Hide the ring for text input
//         opacity: 0,
//         height: 0,
//         width: 0,
//         border: 'none',
//         backgroundColor: 'transparent',
//         filter: 'none',
//       }
//     },
//   };


//   // Function to apply the correct variant properties based on current state
//   const animateCursorElements = useCallback((variantName) => {
//     const { cursorDot, cursorRing } = cursorVariants[variantName];

//     // Animate dot properties
//     cursorDotControls.start({
//       ...cursorDot,
//       transition: { type: 'spring', stiffness: 400, damping: 25 }
//     });

//     // Animate ring properties
//     cursorRingControls.start({
//       ...cursorRing,
//       transition: { type: 'spring', stiffness: 500, damping: 30 }
//     });
//   }, [cursorDotControls, cursorRingControls, cursorVariants]);

//   // Effect to update cursor element styles when cursorVariant changes
//   useEffect(() => {
//     animateCursorElements(cursorVariant);
//   }, [cursorVariant, animateCursorElements]);


//   return (
//     <CursorContext.Provider value={{ setCursorVariant }}>
//       {children}

//       {/* The outer Chasing Ring */}
//       <motion.div
//         className="fixed top-0 left-0 pointer-events-none z-[9999]"
//         style={{ mixBlendMode: 'difference' }} // Apply blend mode to the ring
//         animate={cursorRingControls} // Animate using controls
//       />

//       {/* The inner Chasing Dot */}
//       <motion.div
//         className="fixed top-0 left-0 pointer-events-none z-[9999]"
//         style={{ mixBlendMode: 'difference' }} // Apply blend mode to the dot as well
//         animate={cursorDotControls} // Animate using controls
//       />
//     </CursorContext.Provider>
//   );
// };

// // 3. Create the useCursor Hook
// export const useCursor = () => {
//   const context = useContext(CursorContext);
//   if (!context) {
//     throw new Error("useCursor must be used within a CursorProvider");
//   }
//   return context;
// };

// export default CursorProvider;




// src/components/CustomCursor.js

import React, { useState, useEffect, useContext, createContext, useCallback } from 'react';
import { motion, useAnimation } from 'framer-motion';

// 1. Create the Cursor Context
const CursorContext = createContext(null);

// 2. Create the Cursor Provider Component
export const CursorProvider = ({ children }) => {
  const [cursorVariant, setCursorVariant] = useState('default');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Framer Motion controls for the dot and ring, allowing programmatic animation
  const cursorDotControls = useAnimation();
  const cursorRingControls = useAnimation();

  useEffect(() => {
    document.body.style.cursor = 'none';

    const mouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', mouseMove);

    return () => {
      window.removeEventListener('mousemove', mouseMove);
      document.body.style.cursor = 'default';
    };
  }, []);

  // Use a separate useEffect for animating the cursor elements based on mousePosition
  useEffect(() => {
    // Animate the main ring immediately to the mouse position
    cursorRingControls.start({
      x: mousePosition.x - 20, // Center the 40px ring (40/2 = 20)
      y: mousePosition.y - 20,
      transition: { type: 'spring', stiffness: 500, damping: 30 }
    });

    // Animate the chasing dot with a slight delay
    // This creates the 'chasing' effect
    cursorDotControls.start({
      x: mousePosition.x - 4, // Center the 8px dot (8/2 = 4)
      y: mousePosition.y - 4,
      transition: { type: 'spring', stiffness: 400, damping: 25, delay: 0.05 } // Slight delay for chasing effect
    });

  }, [mousePosition, cursorDotControls, cursorRingControls]); // Re-run when mousePosition changes

  // Define Framer Motion variants for different interaction states
  const cursorVariants = {
    // Default state: Small dot, medium ring
    default: {
      cursorDot: {
        height: 8,
        width: 8,
        backgroundColor: 'rgba(255, 255, 255, 0.9)', // White dot
        opacity: 1,
        filter: 'none',
        borderRadius: '50%',
      },
      cursorRing: {
        height: 40,
        width: 40,
        border: '2px solid rgba(74, 217, 245, 0.4)', // Semi-transparent cyan ring
        backgroundColor: 'transparent',
        opacity: 1,
        filter: 'none',
        borderRadius: '50%',
      },
    },
    // Interactive state: Dot expands, ring expands and glows
    interactive: {
      cursorDot: {
        height: 24, // Dot expands
        width: 24,
        backgroundColor: 'rgba(74, 217, 245, 0.9)', // Dot changes to cyan
        opacity: 1,
        filter: 'brightness(120%) drop-shadow(0 0 8px rgba(74, 217, 245, 0.8))',
        borderRadius: '50%',
      },
      cursorRing: {
        height: 60, // Ring expands
        width: 60,
        border: '3px solid rgba(74, 217, 245, 0.8)', // Ring border becomes more solid
        backgroundColor: 'rgba(74, 217, 245, 0.1)', // Slight fill
        opacity: 1,
        filter: 'brightness(120%) drop-shadow(0 0 15px rgba(74, 217, 245, 0.7))', // Ring glows
        borderRadius: '50%',
      },
    },
    // Example: Text input cursor (a vertical line)
    text: {
      cursorDot: {
        height: 24,
        width: 2,
        backgroundColor: "rgba(255, 255, 255, 0.9)",
        borderRadius: "0%", // Make it a rectangle/line
        opacity: 1,
        filter: 'none',
      },
      cursorRing: { // Hide the ring for text input
        opacity: 0,
        height: 0,
        width: 0,
        border: 'none',
        backgroundColor: 'transparent',
        filter: 'none',
      }
    },
  };


  // Function to apply the correct variant properties based on current state
  const animateCursorElements = useCallback((variantName) => {
    const { cursorDot, cursorRing } = cursorVariants[variantName];

    // Animate dot properties
    cursorDotControls.start({
      ...cursorDot,
      transition: { type: 'spring', stiffness: 400, damping: 25 }
    });

    // Animate ring properties
    cursorRingControls.start({
      ...cursorRing,
      transition: { type: 'spring', stiffness: 500, damping: 30 }
    });
  }, [cursorDotControls, cursorRingControls, cursorVariants]);

  // Effect to update cursor element styles when cursorVariant changes
  useEffect(() => {
    animateCursorElements(cursorVariant);
  }, [cursorVariant, animateCursorElements]);


  return (
    <CursorContext.Provider value={{ setCursorVariant }}>
      {children}

      {/* The outer Chasing Ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{ mixBlendMode: 'difference' }} // Apply blend mode to the ring
        animate={cursorRingControls} // Animate using controls
      />

      {/* The inner Chasing Dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{ mixBlendMode: 'difference' }} // Apply blend mode to the dot as well
        animate={cursorDotControls} // Animate using controls
      />
    </CursorContext.Provider>
  );
};

// 3. Create the useCursor Hook
export const useCursor = () => {
  const context = useContext(CursorContext);
  if (!context) {
    throw new Error("useCursor must be used within a CursorProvider");
  }
  return context;
};

export default CursorProvider;