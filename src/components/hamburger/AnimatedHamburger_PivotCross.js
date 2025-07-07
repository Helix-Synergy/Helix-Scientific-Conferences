import React from 'react';
import { motion } from 'framer-motion';

const lineProps = {
  stroke: '#fff',
  strokeWidth: 3,
  strokeLinecap: 'round',
};

export default function AnimatedHamburger_PivotCross({ isOpen, onClick }) {
  return (
    <button
      aria-label="Menu"
      className="w-12 h-12 flex items-center justify-center focus:outline-none"
      onClick={onClick}
      type="button"
    >
      <svg width="32" height="32" viewBox="0 0 32 32">
        <motion.line
          x1="6" y1="10" x2="26" y2="10"
          {...lineProps}
          animate={isOpen ? { rotate: 45, y: 12 } : { rotate: 0, y: 0 }}
          transition={{ duration: 0.3 }}
        />
        <motion.line
          x1="6" y1="16" x2="26" y2="16"
          {...lineProps}
          animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
          transition={{ duration: 0.2 }}
        />
        <motion.line
          x1="6" y1="22" x2="26" y2="22"
          {...lineProps}
          animate={isOpen ? { rotate: -45, y: -12 } : { rotate: 0, y: 0 }}
          transition={{ duration: 0.3 }}
        />
      </svg>
    </button>
  );
} 