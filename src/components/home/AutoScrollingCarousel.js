// src/components/home/AutoScrollingCarousel.js
import React, { useRef, useEffect, useState } from 'react';
import { motion, useReducedMotion, useAnimation, useScroll, useTransform } from 'framer-motion';
import EventCard from './EventCard';

const AutoScrollingCarousel = ({ data, speed = 60, direction = 'left', title }) => {
  const carouselRef = useRef(null);
  const containerRef = useRef(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const [carouselWidth, setCarouselWidth] = useState(0);
  const shouldReduceMotion = useReducedMotion();

  // Initialize Framer Motion controls for the main carousel scroll
  const controls = useAnimation();

  // For the enhanced edge overlays - NOTE: These are now effectively unused but hooks remain
  // if you re-introduce overlays later. For now, they won't render.
  const { scrollYProgress: containerScrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });
  const overlayOpacity = useTransform(containerScrollYProgress, [0, 0.5, 1], [0.5, 1, 0.5]);

  // Create a duplicate set of data to ensure seamless looping
  const duplicatedData = [...data, ...data, ...data]; // Triple for a longer perceived loop

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current && carouselRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
        const cards = Array.from(carouselRef.current.querySelectorAll('.group'));
        if (cards.length > 0) {
            const cardWidth = cards[0].offsetWidth;
            const gap = parseInt(window.getComputedStyle(carouselRef.current).gap || '0px', 10);
            setCarouselWidth((data.length * cardWidth) + (data.length > 0 ? (data.length - 1) * gap : 0));
        } else {
            setCarouselWidth(0);
        }
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [data]);

  useEffect(() => {
    if (shouldReduceMotion) {
      controls.stop();
      return;
    }

    if (carouselWidth > 0 && containerWidth > 0 && carouselWidth > containerWidth) {
      const distanceToScroll = carouselWidth;

      const animateCarousel = async () => {
        if (direction === 'left') {
          await controls.start({ x: -distanceToScroll }, {
            ease: "linear",
            duration: distanceToScroll / speed,
          });
          controls.set({ x: 0 });
          animateCarousel();
        } else { // direction === 'right'
          controls.set({ x: -distanceToScroll });
          await controls.start({ x: 0 }, {
            ease: "linear",
            duration: distanceToScroll / speed,
          });
          animateCarousel();
        }
      };

      animateCarousel();

      return () => controls.stop();
    } else if (controls) {
        controls.stop();
        controls.set({ x: 0 });
    }
  }, [carouselWidth, containerWidth, speed, direction, controls, shouldReduceMotion]);


  return (
    <section className="relative w-full overflow-hidden py-8" ref={containerRef}>
      <h2 className="text-4xl md:text-5xl font-extrabold text-center text-white mb-12 drop-shadow-lg leading-tight tracking-wide">
        {title}
      </h2>
      <div className="flex flex-nowrap items-center w-full">
        <motion.div
          className="flex flex-nowrap gap-8 md:gap-10 pr-8 md:pr-10"
          ref={carouselRef}
          animate={controls}
        >
          {duplicatedData.map((item, index) => (
            <EventCard key={`${item.id}-${index}`} event={item} />
          ))}
        </motion.div>
      </div>

      {/* The overlays have been removed as requested */}
      {/*
      <motion.div
        className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[rgba(13,13,38,0.95)] to-transparent z-10 pointer-events-none"
        style={{ opacity: overlayOpacity }}
      ></motion.div>
      <motion.div
        className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[rgba(13,13,38,0.95)] to-transparent z-10 pointer-events-none"
        style={{ opacity: overlayOpacity }}
      ></motion.div>
      */}
    </section>
  );
};

export default AutoScrollingCarousel;




// // src/components/home/AutoScrollingCarousel.js
// import React, { useRef, useEffect, useState } from 'react';
// import { motion, useReducedMotion, useAnimation } from 'framer-motion'; // <-- IMPORTANT: Import useAnimation
// import EventCard from './EventCard';

// const AutoScrollingCarousel = ({ data, speed = 60, direction = 'left', title }) => {
//   const carouselRef = useRef(null);
//   const containerRef = useRef(null);
//   const [containerWidth, setContainerWidth] = useState(0);
//   const [carouselWidth, setCarouselWidth] = useState(0);
//   const shouldReduceMotion = useReducedMotion();

//   // Initialize Framer Motion controls
//   const controls = useAnimation(); // <-- Initialize useAnimation

//   // Create a duplicate set of data to ensure seamless looping
//   const duplicatedData = [...data, ...data, ...data]; // Triple for a longer perceived loop

//   useEffect(() => {
//     const handleResize = () => {
//       if (containerRef.current && carouselRef.current) {
//         setContainerWidth(containerRef.current.offsetWidth);
//         const cards = Array.from(carouselRef.current.querySelectorAll('.group'));
//         if (cards.length > 0) {
//             const cardWidth = cards[0].offsetWidth;
//             const gap = parseInt(window.getComputedStyle(carouselRef.current).gap || '0px', 10);
//             setCarouselWidth((data.length * cardWidth) + (data.length > 0 ? (data.length - 1) * gap : 0));
//         } else {
//             setCarouselWidth(0);
//         }
//       }
//     };

//     handleResize();
//     window.addEventListener('resize', handleResize);
//     return () => window.removeEventListener('resize', handleResize);
//   }, [data]);

//   useEffect(() => {
//     if (shouldReduceMotion) {
//       controls.stop(); // Stop animation if reduce motion is preferred
//       return;
//     }

//     if (carouselWidth > 0 && containerWidth > 0 && carouselWidth > containerWidth) {
//       const distanceToScroll = carouselWidth; // Scroll one full set of original data

//       const animateCarousel = async () => {
//         if (direction === 'left') {
//           // Animate from current position to -distanceToScroll
//           await controls.start({ x: -distanceToScroll }, {
//             ease: "linear",
//             duration: distanceToScroll / speed,
//           });
//           // After completing one scroll, instantly reset to 0 to loop seamlessly
//           controls.set({ x: 0 });
//           animateCarousel(); // Loop
//         } else { // direction === 'right'
//           // For right scroll, we animate from -distanceToScroll to 0
//           // First, jump to the starting point of the animation cycle
//           controls.set({ x: -distanceToScroll });
//           await controls.start({ x: 0 }, {
//             ease: "linear",
//             duration: distanceToScroll / speed,
//           });
//           animateCarousel(); // Loop
//         }
//       };

//       animateCarousel(); // Start the animation loop

//       return () => controls.stop(); // Stop animation on unmount or dependency change
//     } else if (controls) { // If carousel content is smaller than container, stop animation
//         controls.stop();
//         controls.set({ x: 0 }); // Reset position
//     }
//   }, [carouselWidth, containerWidth, speed, direction, controls, shouldReduceMotion]);


//   return (
//     <section className="relative w-full overflow-hidden py-16" ref={containerRef}>
//       <h2 className="text-4xl md:text-5xl font-extrabold text-center text-white mb-12 drop-shadow-lg leading-tight tracking-wide">
//         {title}
//       </h2>
//       <div className="flex flex-nowrap items-center w-full">
//         <motion.div
//           className="flex flex-nowrap gap-8 md:gap-10 pr-8 md:pr-10"
//           ref={carouselRef}
//           animate={controls} // Apply controls here
//         >
//           {duplicatedData.map((item, index) => (
//             <EventCard key={`${item.id}-${index}`} event={item} />
//           ))}
//         </motion.div>
//       </div>

//       {/* Overlays matching the dark background */}
//       <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[rgba(13,13,38,0.95)] to-transparent z-10 pointer-events-none"></div>
//       <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[rgba(13,13,38,0.95)] to-transparent z-10 pointer-events-none"></div>
//     </section>
//   );
// };

// export default AutoScrollingCarousel;