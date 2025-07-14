import React, { useRef } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { CalendarIcon, MapPinIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';

const InteractiveCard = ({ event }) => {
  const cardRef = useRef(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Map the mouse position to rotation values
  const rotateX = useTransform(y, [0, 1], [-10, 10]);
  const rotateY = useTransform(x, [0, 1], [10, -10]);

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

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      // Animate the card's 3D transform on hover
      whileHover={{
        scale: 1.05,
        boxShadow: "0 15px 30px rgba(0, 255, 255, 0.4), 0 0 15px rgba(0, 255, 255, 0.2)"
      }}
      initial={{ rotateX: 0, rotateY: 0 }}
      style={{
        perspective: 1000,
        rotateX,
        rotateY,
        transition: "transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)"
      }}
      className="relative p-1 rounded-xl shadow-lg backdrop-blur-sm group overflow-hidden cursor-pointer"
    >
      <motion.div
        className="relative z-10 bg-gray-900 rounded-xl h-full p-4"
        style={{
          // Create the glowing background effect that follows the cursor
          background: `
            radial-gradient(
              600px circle at calc(var(--x) * 1px) calc(var(--y) * 1px),
              rgba(46, 101, 154, 0.5),
              transparent 80%
            ),
            #1f2937` // Use your darkBg color here if defined in tailwind.config
        }}
        // Pass mouse coordinates to the CSS variables
        onMouseMove={e => {
            const { clientX, clientY } = e;
            const { left, top } = e.currentTarget.getBoundingClientRect();
            e.currentTarget.style.setProperty("--x", clientX - left);
            e.currentTarget.style.setProperty("--y", clientY - top);
        }}
      >
        <div className="relative overflow-hidden rounded-lg mb-4 h-48">
          <img
            src={event.image}
            alt={event.title}
            className="w-full h-full object-cover transition-transform duration-500 transform group-hover:scale-110"
          />
        </div>
        <h3 className="text-xl font-bold text-white mb-2">{event.title}</h3>
        <p className="text-sm font-semibold text-gray-400 mb-4">{event.code}</p>
        <div className="flex items-center text-gray-300 mb-2">
          <CalendarIcon className="w-5 h-5 mr-2 text-primary" />
          <span>{event.date}</span>
        </div>
        <div className="flex items-center text-gray-300 mb-4">
          <MapPinIcon className="w-5 h-5 mr-2 text-accent-purple" />
          <span>{event.location}</span>
        </div>
        {event.link && (
          <Link
            to={event.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-secondary hover:bg-secondary-dark text-white font-bold py-2 px-6 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform active:scale-95 text-sm"
          >
            Learn More
          </Link>
        )}
      </motion.div>
    </motion.div>
  );
};

export default InteractiveCard;