import React, { useState, useEffect, useContext, createContext, useCallback } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { Mic2 } from "lucide-react"; // Import Mic2 from lucide-react

// 1. Create the Cursor Context
const CursorContext = createContext(null);

// Centralized SVG Component for Mic2
// This component renders the Lucide Mic2 icon and applies base styling.
const MicCursorSVG = ({ color = "#FFFFFF", size = 24, variant = 'off' }) => { // Default color changed to White
  const isOn = variant === 'on';

  return (
    <Mic2
      size={size}
      color={color} // Lucide icons use 'color' prop for stroke/fill
      strokeWidth={isOn ? 2.5 : 2} // Slightly thicker stroke when 'on' for emphasis
      style={{
        transition: 'stroke 0.3s ease-out, filter 0.3s ease-out',
        filter: 'drop-shadow(0 0 4px rgba(193, 20, 20, 0.67)) drop-shadow(0 0 6px rgba(36, 194, 222, 0.2))',
      }}
    />
  );
};

// 2. Create the Cursor Provider Component
export const CursorProvider = ({ children }) => {
  const [cursorVariant, setCursorVariant] = useState('default');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Framer Motion controls for the cursor container (position, scale, rotation, flip)
  const cursorContainerControls = useAnimation();
  // Framer Motion controls for the SVG element itself (color animation)
  const svgControls = useAnimation();

  // Define selectors for different interactive element types
  const interactiveSelectors = 'a, button, input[type="button"], input[type="submit"], input[type="reset"], input[type="image"], label[for], textarea, select, [role="button"], [role="link"], [onClick], .clickable, .quantum-grid-item, .cursor-interactive';
  const textInputSelectors = 'input[type="text"], input[type="email"], input[type="password"], input[type="number"], textarea';

  useEffect(() => {
    // Hide the default system cursor
    document.body.style.cursor = 'none';

    // --- Mouse Position Tracking ---
    const mouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', mouseMove);

    // --- Global Interactive Element Detection ---
    const handleMouseOver = (e) => {
      const targetElement = e.target;

      if (targetElement.closest(interactiveSelectors)) {
        setCursorVariant('interactive');
      } else if (targetElement.matches(textInputSelectors)) {
        setCursorVariant('text');
      } else {
        if (cursorVariant !== 'default') {
          setCursorVariant('default');
        }
      }
    };

    const handleMouseOut = (e) => {
      if (cursorVariant !== 'default') {
        setCursorVariant('default');
      }
    };

    document.body.addEventListener('mouseover', handleMouseOver);
    document.body.addEventListener('mouseout', handleMouseOut);

    return () => {
      window.removeEventListener('mousemove', mouseMove);
      document.body.removeEventListener('mouseover', handleMouseOver);
      document.body.removeEventListener('mouseout', handleMouseOut);
      document.body.style.cursor = 'default';
    };
  }, [cursorVariant]);

  // Effect to continuously update the cursor's position
  useEffect(() => {
    const offsetX = 12;
    const offsetY = 12;

    cursorContainerControls.start({
      x: mousePosition.x - offsetX,
      y: mousePosition.y - offsetY,
      transition: { type: 'tween', ease: 'linear', duration: 0 }
    });

  }, [mousePosition, cursorContainerControls]);

  // Define Framer Motion variants for different interaction states
  const cursorVariants = {
    default: {
      scale: -1,
      opacity: 1,
      svgColor: '#FFFFFF',
      rotate: 0,
      filter: 'none',
      scaleY: -1,
      transition: { type: 'spring', stiffness: 400, damping: 25 },
    },
    interactive: {
      scale: -1.2,
      opacity: 1,
      svgColor: ['#ADD8E6', '#87CEEB', '#ADD8E6'],
      filter: 'drop-shadow(0 0 4px rgba(173,216,230,0.7)) drop-shadow(0 0 8px rgba(135,206,235,0.5))',
      rotate: [0, 5, -5, 0],
      scaleY: -1,
      transition: {
        type: 'spring', stiffness: 400, damping: 25,
        rotate: { duration: 0.4, ease: 'easeInOut', repeat: 0 },
        svgColor: { duration: 1, ease: 'easeInOut', repeat: Infinity, repeatType: 'reverse' },
        filter: { duration: 0.3, ease: 'easeOut' },
      },
    },
    text: {
      scale: 1,
      opacity: 1,
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      width: 2,
      height: 24,
      borderRadius: '0%',
      svgColor: 'transparent',
      scaleY: 1,
      transition: { type: 'spring', stiffness: 400, damping: 25 },
    }
  };

  const animateCursorElements = useCallback(async (variantName) => {
    const variantProperties = cursorVariants[variantName];

    cursorContainerControls.start({
      scale: variantProperties.scale,
      opacity: variantProperties.opacity,
      rotate: variantProperties.rotate,
      filter: variantProperties.filter,
      width: variantProperties.width || 24,
      height: variantProperties.height || 24,
      borderRadius: variantProperties.borderRadius || '0%',
      backgroundColor: variantProperties.backgroundColor || 'transparent',
      scaleY: variantProperties.scaleY,
      transition: variantProperties.transition,
    });

    if (variantProperties.svgColor) {
      svgControls.start({
        color: variantProperties.svgColor,
        transition: variantProperties.transition.svgColor || { duration: 0.3, ease: 'easeOut' },
      });
    } else {
      svgControls.start({ color: 'transparent' });
    }

  }, [cursorContainerControls, svgControls, cursorVariants]);

  useEffect(() => {
    animateCursorElements(cursorVariant);
  }, [cursorVariant, animateCursorElements]);

  return (
    <CursorContext.Provider value={{ setCursorVariant }}>
      {children}

      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] flex items-center justify-center"
        animate={cursorContainerControls}
      >
        {cursorVariant !== 'text' && (
          <motion.div animate={svgControls} className="w-full h-full flex items-center justify-center">
            <MicCursorSVG variant={cursorVariant === 'interactive' ? 'on' : 'off'} />
          </motion.div>
        )}
      </motion.div>
    </CursorContext.Provider>
  );
};

// 3. Create the useCursor Hook (for custom interactions with the cursor from other components)
export const useCursor = () => {
  const context = useContext(CursorContext);
  if (!context) {
    throw new Error("useCursor must be used within a CursorProvider");
  }
  return context;
};

export default CursorProvider;
