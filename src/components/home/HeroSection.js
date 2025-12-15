// // src/components/HeroSection.js
// import React, { useState, useEffect, useRef } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { heroSlides } from '../../data/homePageContent';
// import Button from '../Button';
// import { ArrowLeftCircleIcon, ArrowRightCircleIcon } from '@heroicons/react/24/solid';

// function HeroSection() {
//   const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
//   const currentSlide = heroSlides[currentSlideIndex];
//   const intervalRef = useRef(null);

//   const startAutoPlay = () => {
//     if (intervalRef.current) {
//       clearInterval(intervalRef.current);
//     }
//     intervalRef.current = setInterval(() => {
//       setCurrentSlideIndex((prevIndex) =>
//         (prevIndex + 1) % heroSlides.length
//       );
//     }, 5000); // 5 seconds
//   };

//   useEffect(() => {
//     startAutoPlay();
//     return () => {
//       if (intervalRef.current) {
//         clearInterval(intervalRef.current);
//       }
//     };
//   }, []);

//   useEffect(() => {
//     startAutoPlay();
//   }, [currentSlideIndex]);

//   const goToSlide = (index) => {
//     setCurrentSlideIndex(index);
//     startAutoPlay();
//   };

//   const goToNextSlide = () => {
//     setCurrentSlideIndex((prevIndex) => (prevIndex + 1) % heroSlides.length);
//     startAutoPlay();
//   };

//   const goToPrevSlide = () => {
//     setCurrentSlideIndex((prevIndex) =>
//       (prevIndex - 1 + heroSlides.length) % heroSlides.length
//     );
//     startAutoPlay();
//   };

//   // Animation variants for Framer Motion
//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.2,
//       },
//     },
//   };

//   const itemVariants = {
//     hidden: { opacity: 0, y: 50 },
//     visible: {
//       opacity: 1,
//       y: 0,
//       transition: {
//         type: 'spring',
//         damping: 10,
//         stiffness: 100,
//       },
//     },
//   };

//   // Variants for image fade animation
//   const imageVariants = {
//     initial: { opacity: 0 },
//     animate: { opacity: 1, transition: { duration: 1.5, ease: "easeInOut" } },
//     exit: { opacity: 0, transition: { duration: 1.5, ease: "easeInOut" } },
//   };

//   // Styling for the arrow buttons specifically
//   // MODIFIED: Further reduced w, h, and padding
//   const arrowIconWrapperClasses = `
//     w-8 h-8 flex items-center justify-center 
//     rounded-full transition-all duration-300
//     focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-black
//     p-1 
//     border-2 border-white border-opacity-50
//     bg-black bg-opacity-20 backdrop-filter backdrop-blur-sm
//     hover:bg-opacity-40 transition-colors duration-300
//     shadow-lg
//   `;


//   return (
//     <div
//       id="home-hero"
//       className="relative h-screen w-full flex items-center justify-center text-center text-white overflow-hidden"
//     >
//       {/* Background Image Carousel */}
//       <AnimatePresence initial={false}>
//         <motion.div
//           key={currentSlideIndex}
//           className="absolute inset-0"
//           variants={imageVariants}
//           initial="initial"
//           animate="animate"
//           exit="exit"
//           style={{
//             backgroundImage: `url(${currentSlide.backgroundImage})`,
//             backgroundSize: 'cover',
//             backgroundPosition: 'center',
//           }}
//         />
//       </AnimatePresence>

//       {/* Overlay for gradient and darkening */}
//       <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-70"></div>
//       <div className="absolute inset-0 bg-gradient-to-br from-primary via-transparent to-accent opacity-20"></div>

//       {/* Content */}
//       <motion.div
//         key={currentSlideIndex + 'content'}
//         className="relative z-10 p-4 pt-20 max-w-4xl mx-auto"
//         variants={containerVariants}
//         initial="hidden"
//         animate="visible"
//       >
//         <motion.h1
//           className="text-4xl md:text-6xl font-extrabold mb-4 leading-tight drop-shadow-lg"
//           variants={itemVariants}
//         >
//           {currentSlide.mainTitle}
//         </motion.h1>
//         <motion.p
//           className="text-lg md:text-xl mb-8 opacity-80 drop-shadow-md"
//           variants={itemVariants}
//         >
//           {currentSlide.subHeading}
//         </motion.p>
//         <motion.div
//           className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4"
//           variants={itemVariants}
//         >
//           <Button
//             to={currentSlide.button1.link}
//             variant="primary"
//           >
//             {currentSlide.button1.text}
//           </Button>
//           <Button
//             to={currentSlide.button2.link}
//             variant="secondary"
//           >
//             {currentSlide.button2.text}
//           </Button>
//         </motion.div>
//       </motion.div>

//       {/* Consolidated Navigation (Dots and Arrows) */}
//       {/* MODIFIED: Further reduced padding and spacing */}
//       <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex items-center space-x-2 md:space-x-3 p-1 bg-black bg-opacity-30 rounded-full backdrop-filter backdrop-blur-md shadow-lg"> {/* space-x-2, p-1 */}

//         {/* Previous Arrow Button */}
//         <button
//           onClick={goToPrevSlide}
//           className={`${arrowIconWrapperClasses}`}
//           aria-label="Previous slide"
//         >
//           {/* MODIFIED: Further reduced h and w for the icon */}
//           <ArrowLeftCircleIcon className="h-5 w-5 text-white" /> {/* Reduced from h-6 w-6 */}
//         </button>

//         {/* Navigation Dots */}
//         {/* MODIFIED: Further reduced space-x and dot sizes */}
//         <div className="flex space-x-1.5"> {/* Reduced from space-x-2 */}
//           {heroSlides.map((_, index) => (
//             <button
//               key={index}
//               onClick={() => goToSlide(index)}
//               className={`relative w-2 h-2 rounded-full transition-all duration-300 // Reduced from w-2.5 h-2.5
//                 ${index === currentSlideIndex
//                   ? 'bg-primary scale-110 shadow-md shadow-primary/50'
//                   : 'bg-gray-400 hover:bg-gray-200 opacity-70'}
//                 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-black
//               `}
//               aria-label={`Go to slide ${index + 1}`}
//             />
//           ))}
//         </div>

//         {/* Next Arrow Button */}
//         <button
//           onClick={goToNextSlide}
//           className={`${arrowIconWrapperClasses}`}
//           aria-label="Next slide"
//         >
//           {/* MODIFIED: Further reduced h and w for the icon */}
//           <ArrowRightCircleIcon className="h-5 w-5 text-white" /> {/* Reduced from h-6 w-6 */}
//         </button>
//       </div>
//     </div>
//   );
// }

// export default HeroSection;

// src/components/HeroSection.js
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { heroSlides } from '../../data/homePageContent';
import Button from '../Button';
import { ArrowLeftCircleIcon, ArrowRightCircleIcon } from '@heroicons/react/24/solid';

function HeroSection() {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const currentSlide = heroSlides[currentSlideIndex];
  const intervalRef = useRef(null);

  const startAutoPlay = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    intervalRef.current = setInterval(() => {
      setCurrentSlideIndex((prevIndex) =>
        (prevIndex + 1) % heroSlides.length
      );
    }, 5000); // 5 seconds
  };

  useEffect(() => {
    startAutoPlay();
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  useEffect(() => {
    startAutoPlay();
  }, [currentSlideIndex]);

  const goToSlide = (index) => {
    setCurrentSlideIndex(index);
    startAutoPlay();
  };

  const goToNextSlide = () => {
    setCurrentSlideIndex((prevIndex) => (prevIndex + 1) % heroSlides.length);
    startAutoPlay();
  };

  const goToPrevSlide = () => {
    setCurrentSlideIndex((prevIndex) =>
      (prevIndex - 1 + heroSlides.length) % heroSlides.length
    );
    startAutoPlay();
  };

  // Animation variants for Framer Motion
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        damping: 10,
        stiffness: 100,
      },
    },
  };

  // Variants for image fade animation
  const imageVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 1, ease: "easeInOut" } },
    exit: { opacity: 0, transition: { duration: 1, ease: "easeInOut" } },
  };

  // Styling for the arrow buttons specifically
  const arrowIconWrapperClasses = `
    w-8 h-8 flex items-center justify-center 
    rounded-full transition-all duration-300
    focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-black
    p-1 
    border-2 border-white border-opacity-50
    bg-black bg-opacity-20 backdrop-filter backdrop-blur-sm
    hover:bg-opacity-40 transition-colors duration-300
    shadow-lg
  `;


  return (
    <div
      id="home-hero"
      className="relative h-screen w-full flex items-center justify-center text-center text-white overflow-hidden"
    >
      {/* Background Image Carousel */}
      <AnimatePresence initial={false}>
        <motion.div
          key={currentSlideIndex}
          className="absolute inset-0"
          variants={imageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          style={{
            backgroundImage: `url(${currentSlide.backgroundImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
      </AnimatePresence>

      {/* NEW: Dark layer on the background image for better text readability */}
      <div className="absolute inset-0 bg-black opacity-60"></div>

      {/* Overlay for gradient and darkening */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-70"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-transparent to-accent opacity-20"></div>

      {/* Content */}
      <motion.div
        key={currentSlideIndex + 'content'}
        className="relative z-10 p-4 pt-20 max-w-4xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* <motion.h1
          className="text-4xl md:text-6xl font-extrabold mb-4 leading-tight drop-shadow-lg"
          variants={itemVariants}
        >
          {currentSlide.mainTitle}
        </motion.h1> */}
        <motion.h1
  className="text-2xl md:text-5xl font-extrabold mb-4 leading-tight drop-shadow-lg"
  variants={itemVariants}
>
  {currentSlide.mainTitle}
</motion.h1>

        <motion.p
          className="text-lg md:text-xl mb-8 opacity-80 drop-shadow-md"
          variants={itemVariants}
        >
          {currentSlide.subHeading}
        </motion.p>
        <motion.div
          className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4"
          variants={itemVariants}
        >
          <Button
            to={currentSlide.button1.link}
            variant="primary"
          >
            {currentSlide.button1.text}
          </Button>
          
        </motion.div>
      </motion.div>

      {/* Consolidated Navigation (Dots and Arrows) */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex items-center space-x-2 md:space-x-3 p-1 bg-black bg-opacity-30 rounded-full backdrop-filter backdrop-blur-md shadow-lg">
        {/* Previous Arrow Button */}
        <button
          onClick={goToPrevSlide}
          className={`${arrowIconWrapperClasses}`}
          aria-label="Previous slide"
        >
          <ArrowLeftCircleIcon className="h-5 w-5 text-white" />
        </button>

        {/* Navigation Dots */}
        <div className="flex space-x-1.5">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`relative w-2 h-2 rounded-full transition-all duration-300
                ${index === currentSlideIndex
                  ? 'bg-primary scale-110 shadow-md shadow-primary/50'
                  : 'bg-gray-400 hover:bg-gray-200 opacity-70'}
                focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-black
              `}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Next Arrow Button */}
        <button
          onClick={goToNextSlide}
          className={`${arrowIconWrapperClasses}`}
          aria-label="Next slide"
        >
          <ArrowRightCircleIcon className="h-5 w-5 text-white" />
        </button>
      </div>
    </div>
  );
}

export default HeroSection;