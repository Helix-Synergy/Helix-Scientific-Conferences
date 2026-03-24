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
  const duplicatedData = [...data, ...data]; // Two sets are sufficient for a seamless loop

useEffect(() => {
  const handleResize = () => {
    if (containerRef.current && carouselRef.current) {
      setContainerWidth(containerRef.current.offsetWidth);
      setCarouselWidth(carouselRef.current.scrollWidth);
    }
  };

  handleResize();
  window.addEventListener("resize", handleResize);
  return () => window.removeEventListener("resize", handleResize);
}, [data]);

  useEffect(() => {
    if (shouldReduceMotion) {
      controls.stop();
      return;
    }

    if (carouselWidth > 0 && containerWidth > 0 && carouselWidth > containerWidth) {
      // With two sets, the distance to scroll for a seamless loop is half the total width
      // plus half the gap width (since there's one less gap than items).
      // However, a simpler approach is to use the actual scroll distance of one full set.
      const gap = window.innerWidth >= 768 ? 40 : 32; // md:gap-10 (40px) or gap-8 (32px)
      const distanceToScroll = (carouselWidth + gap) / 2;

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
<section className="relative w-full overflow-x-hidden py-8" ref={containerRef}>

      <h2 className="text-4xl md:text-5xl font-extrabold text-center text-white mb-12 drop-shadow-lg leading-tight tracking-wide">
        {title}
      </h2>
<div className="flex flex-nowrap items-center w-full overflow-hidden">
        <motion.div
          className="flex flex-nowrap gap-8 md:gap-10"
          ref={carouselRef}
          animate={controls}
        >
          {duplicatedData.map((item, index) => (
          <EventCard key={`${item.link}-${index}`} event={item} />
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



