// src/components/InnovationSection.js
import React, { useRef, useState, useEffect, useLayoutEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import Button from '../Button';
import { aboutData } from '../../data/homePageContent';
import SatisfiedClientCounter from './SatisfiedClientCounter';
import { CheckCircleIcon } from '@heroicons/react/24/outline';

function InnovationSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const [currentLayoutIndex, setCurrentLayoutIndex] = useState(0);

  const imageRefs = useRef({}); // Refs for individual images

  // Define common styles for glassmorphism cards (Applied only to content card now)
  const glassmorphismCardStyles = {
    background: 'rgba(255, 255, 255, 0.08)',
    borderRadius: '16px',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
    backdropFilter: 'blur(8px)',
    WebkitBackdropFilter: 'blur(8px)',
  };

  // Specific border and new glow shadow for images
  const imageBorderStyle = {
    border: '0.5px solid rgba(255, 255, 255, 0.9)',
    boxShadow: '0 0 15px 5px rgba(100, 200, 255, 0.4), 0 0 8px 2px rgba(255, 255, 255, 0.2) inset',
  };

  // Define your dynamic image layouts
  const layouts = [
    // Layout 0: Original Overlay (3 Images)
    [
      { id: 'img0', src: aboutData.innovationImages[0], top: '10%', left: '10%', width: '75%', height: '75%', zIndex: 1, borderRadius: '12px' },
      { id: 'img1', src: aboutData.innovationImages[1], top: '5%', right: '5%', width: '35%', height: '35%', zIndex: 2, borderRadius: '12px' },
      { id: 'img2', src: aboutData.innovationImages[2], bottom: '5%', left: '5%', width: '35%', height: '35%', zIndex: 2, borderRadius: '12px' },
    ],
    // Layout 1: Staggered Collage (3 Images)
    [
      { id: 'img0', src: aboutData.innovationImages[0], top: '20%', left: '8%', width: '65%', height: '65%', zIndex: 1, borderRadius: '12px' },
      { id: 'img1', src: aboutData.innovationImages[1], top: '5%', left: '8%', width: '30%', height: '30%', zIndex: 2, borderRadius: '12px' },
      { id: 'img2', src: aboutData.innovationImages[2], bottom: '5%', right: '18%', width: '35%', height: '35%', zIndex: 3, borderRadius: '12px' },
    ],
    // Layout 2: Circles Layout (3 Images)
    [
      { id: 'img0', src: aboutData.innovationImages[0], top: '15%', left: '15%', width: '60%', height: '60%', zIndex: 1, borderRadius: '50%' },
      { id: 'img1', src: aboutData.innovationImages[1], top: '8%', right: '8%', width: '35%', height: '35%', zIndex: 2, borderRadius: '50%' },
      { id: 'img2', src: aboutData.innovationImages[2], bottom: '15%', left: '8%', width: '25%', height: '25%', zIndex: 3, borderRadius: '50%' },
    ],
    // Layout 3: Mixed Shapes (4 Images)
    [
      { id: 'img0', src: aboutData.innovationImages[0], top: '15%', left: '8%', width: '65%', height: '65%', zIndex: 1, borderRadius: '12px' },
      { id: 'img1', src: aboutData.innovationImages[1], top: '5%', right: '8%', width: '30%', height: '30%', zIndex: 2, borderRadius: '50%' },
      { id: 'img2', src: aboutData.innovationImages[2], bottom: '15%', left: '2%', width: '40%', height: '30%', zIndex: 3, borderRadius: '12px' },
      { id: 'img3', src: aboutData.innovationImages[3], top: '45%', right: '5%', width: '25%', height: '25%', zIndex: 4, borderRadius: '12px' },
    ],
  ];

  const currentLayout = layouts[currentLayoutIndex];

  const innovationContainerRef = useRef(null);

  // Initial entrance animation for the container
  useEffect(() => {
    if (isInView && innovationContainerRef.current) {
      gsap.fromTo(
        innovationContainerRef.current,
        { opacity: 0, y: 50, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 1, ease: 'power3.out' }
      );
    }
  }, [isInView]);

  // Automatic layout cycling (duration increased to 8 seconds)
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentLayoutIndex((prevIndex) => (prevIndex + 1) % layouts.length);
    }, 8000); // Change layout every 8 seconds

    return () => clearInterval(interval);
  }, [layouts.length]);

  // GSAP animation for new layout images (Magnetic Tile Flip & Slide In)
  useLayoutEffect(() => {
    Object.values(imageRefs.current).forEach(el => gsap.killTweensOf(el));
    if (!isInView) return;

    const masterTl = gsap.timeline({
      defaults: { duration: 1.0, ease: "power2.inOut" }, // Base duration and ease for slide/flip
      delay: 0.1 // Small delay before transition starts
    });

    currentLayout.forEach((imageConfig, index) => {
      const imgElement = imageRefs.current[imageConfig.id];

      if (imgElement) {
        // Random starting position for the "slide" from off-screen
        const startX = gsap.utils.random(-window.innerWidth * 0.8, window.innerWidth * 0.8);
        const startY = gsap.utils.random(-window.innerHeight * 0.8, window.innerHeight * 0.8);

        masterTl.fromTo(
          imgElement,
          {
            opacity: 1,
            scale: 0.7,
            rotationX: gsap.utils.random(90, 180),
            rotationY: gsap.utils.random(-90, 90),
            z: 200,
            x: startX,
            y: startY,
            borderRadius: imageConfig.borderRadius,
          },
          {
            opacity: 1,
            scale: 1,
            rotationX: 0,
            rotationY: 0,
            z: 0,
            x: 0,
            y: 0,
            top: imageConfig.top,
            left: imageConfig.left,
            right: imageConfig.right,
            bottom: imageConfig.bottom,
            width: imageConfig.width,
            height: imageConfig.height,
            zIndex: imageConfig.zIndex,
            borderRadius: imageConfig.borderRadius,
            duration: 1.2,
            ease: "power2.out",
            delay: index * 0.1,
            onComplete: () => {
              gsap.to(imgElement, {
                scale: 1, rotationX: 0, rotationY: 0, z: 0,
                ease: "back.out(1.7)",
                duration: 0.3,
              });
            }
          },
          0
        );
      }
    });

    return () => {
      masterTl.kill();
    };
  }, [currentLayoutIndex, isInView, currentLayout]);

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        staggerChildren: 0.15
      }
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <motion.section
      ref={ref}
      className="py-16 md:py-24 text-white relative overflow-hidden"
      style={{
        backgroundImage: 'linear-gradient(to right, #4A2868, #2E659A)',
        backgroundSize: 'cover',
        backgroundAttachment: 'fixed',
      }}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      <div className="absolute inset-0 z-0 bg-black/20"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center lg:space-x-12">
          {/* Left Column: Dynamic Image Layout */}
          <motion.div
            ref={innovationContainerRef}
            className="w-full lg:w-[40%] mb-8 lg:mb-0 relative p-2 md:p-4 flex items-center justify-center min-h-[350px] md:min-h-[450px] rounded-xl"
            style={{
              overflow: 'hidden',
              perspective: '1200px',
              transformStyle: 'preserve-3d',
            }}
          >
            <AnimatePresence initial={false} mode="wait">
              <>
                <motion.div
                  key={currentLayoutIndex}
                  className="absolute inset-0"
                >
                  {currentLayout.map((image, index) => (
                    <motion.img
                      key={image.id}
                      ref={el => {
                        if (el) {
                          imageRefs.current[image.id] = el;
                        } else {
                          delete imageRefs.current[image.id];
                        }
                      }}
                      src={image.src}
                      alt={`Innovation Image ${index}`}
                      className="absolute object-cover"
                      style={{
                        ...imageBorderStyle,
                        top: image.top,
                        left: image.left,
                        right: image.right,
                        bottom: image.bottom,
                        width: image.width,
                        height: image.height,
                        zIndex: image.zIndex,
                        borderRadius: image.borderRadius,
                      }}
                      exit={{
                        x: gsap.utils.random(-window.innerWidth * 1.5, window.innerWidth * 1.5),
                        y: gsap.utils.random(-window.innerHeight * 1.5, window.innerHeight * 1.5),
                        rotationX: gsap.utils.random(180, 540),
                        rotationY: gsap.utils.random(180, 540),
                        scale: 0.1,
                        opacity: 1,
                        transition: {
                          duration: 1.0,
                          ease: "easeIn",
                          delay: index * 0.05
                        }
                      }}
                      whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                    />
                  ))}
                </motion.div>

                {/* STATISTIC COUNTER POSITIONED TO BOTTOM-RIGHT OF IMAGE CONTAINER */}
                <motion.div
                  className="absolute bottom-4 right-4 md:bottom-6 md:right-6 z-50 w-max"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.8, duration: 0.5, ease: "easeOut" }}
                >
                  {/* CORRECTED: Pass the entire aboutData.satisfiedClients object as 'data' */}
                  <SatisfiedClientCounter
                    data={aboutData.satisfiedClients}
                    isInView={isInView}
                  />
                </motion.div>
              </>
            </AnimatePresence>
          </motion.div>

          {/* Right Column: Content with glassmorphism card */}
          <motion.div
            className="w-full lg:w-[60%] p-6 rounded-xl"
            style={glassmorphismCardStyles}
            variants={itemVariants}
          >
            <motion.h2
              className="text-3xl md:text-3xl font-extrabold text-white mb-4 leading-tight drop-shadow-md"
              variants={itemVariants}
            >
              {aboutData.heading.split('Helix Conferences')[0]}
              <span className="text-purple-400">Helix Conferences</span>
              {aboutData.heading.split('Helix Conferences')[1] || ' !!!'}
            </motion.h2>
            <motion.p
              className="text-base md:text-base text-gray-200 mb-5"
              variants={itemVariants}
            >
              {aboutData.subHeading}
            </motion.p>

            <ul className="mb-6 space-y-2 text-gray-100">
              {aboutData.points.map((point, index) => (
                <motion.li key={index} className="flex items-start text-sm md:text-sm" variants={itemVariants}>
                  <CheckCircleIcon className="w-5 h-5 text-blue-400 mr-2 mt-1 flex-shrink-0" />
                  <p>{point}</p>
                </motion.li>
              ))}
            </ul>

            <motion.div variants={itemVariants}>
              <Button to="/about">
                {aboutData.buttonText}
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}

export default InnovationSection;










// // src/components/InnovationSection.js
// import React, { useRef, useState, useEffect, useLayoutEffect } from 'react';
// import { motion, useInView, AnimatePresence } from 'framer-motion';
// import { gsap } from 'gsap';
// import Button from './Button';
// import { aboutData } from '../data/homePageContent';
// import SatisfiedClientCounter from './SatisfiedClientCounter';
// import { CheckCircleIcon } from '@heroicons/react/24/outline';

// function InnovationSection() {
//   const ref = useRef(null);
//   const isInView = useInView(ref, { once: true, amount: 0.3 });

//   const [currentLayoutIndex, setCurrentLayoutIndex] = useState(0);

//   const imageRefs = useRef({}); // Refs for individual images

//   // Define common styles for glassmorphism cards (Applied only to content card now)
//   const glassmorphismCardStyles = {
//     background: 'rgba(255, 255, 255, 0.08)',
//     borderRadius: '16px',
//     border: '1px solid rgba(255, 255, 255, 0.1)',
//     boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
//     backdropFilter: 'blur(8px)',
//     WebkitBackdropFilter: 'blur(8px)',
//   };

//   // Specific border and new glow shadow for images
//   const imageBorderStyle = {
//     border: '0.5px solid rgba(255, 255, 255, 0.9)',
//     boxShadow: '0 0 15px 5px rgba(100, 200, 255, 0.4), 0 0 8px 2px rgba(255, 255, 255, 0.2) inset',
//   };

//   // Define your dynamic image layouts
//   const layouts = [
//     // Layout 0: Original Overlay (3 Images)
//     [
//       { id: 'img0', src: aboutData.innovationImages[0], top: '10%', left: '10%', width: '75%', height: '75%', zIndex: 1, borderRadius: '12px' },
//       { id: 'img1', src: aboutData.innovationImages[1], top: '5%', right: '5%', width: '35%', height: '35%', zIndex: 2, borderRadius: '12px' },
//       { id: 'img2', src: aboutData.innovationImages[2], bottom: '5%', left: '5%', width: '35%', height: '35%', zIndex: 2, borderRadius: '12px' },
//     ],
//     // Layout 1: Staggered Collage (3 Images)
//     [
//       { id: 'img0', src: aboutData.innovationImages[0], top: '20%', left: '8%', width: '65%', height: '65%', zIndex: 1, borderRadius: '12px' },
//       { id: 'img1', src: aboutData.innovationImages[1], top: '5%', left: '8%', width: '30%', height: '30%', zIndex: 2, borderRadius: '12px' },
//       { id: 'img2', src: aboutData.innovationImages[2], bottom: '5%', right: '18%', width: '35%', height: '35%', zIndex: 3, borderRadius: '12px' },
//     ],
//     // Layout 2: Circles Layout (3 Images)
//     [
//       { id: 'img0', src: aboutData.innovationImages[0], top: '15%', left: '15%', width: '60%', height: '60%', zIndex: 1, borderRadius: '50%' },
//       { id: 'img1', src: aboutData.innovationImages[1], top: '8%', right: '8%', width: '35%', height: '35%', zIndex: 2, borderRadius: '50%' },
//       { id: 'img2', src: aboutData.innovationImages[2], bottom: '15%', left: '8%', width: '25%', height: '25%', zIndex: 3, borderRadius: '50%' },
//     ],
//     // Layout 3: Mixed Shapes (4 Images)
//     [
//       { id: 'img0', src: aboutData.innovationImages[0], top: '15%', left: '8%', width: '65%', height: '65%', zIndex: 1, borderRadius: '12px' },
//       { id: 'img1', src: aboutData.innovationImages[1], top: '5%', right: '8%', width: '30%', height: '30%', zIndex: 2, borderRadius: '50%' },
//       { id: 'img2', src: aboutData.innovationImages[2], bottom: '15%', left: '2%', width: '40%', height: '30%', zIndex: 3, borderRadius: '12px' },
//       { id: 'img3', src: aboutData.innovationImages[3], top: '45%', right: '5%', width: '25%', height: '25%', zIndex: 4, borderRadius: '12px' },
//     ],
//   ];

//   const currentLayout = layouts[currentLayoutIndex];

//   const innovationContainerRef = useRef(null);

//   // Initial entrance animation for the container
//   useEffect(() => {
//     if (isInView && innovationContainerRef.current) {
//       gsap.fromTo(
//         innovationContainerRef.current,
//         { opacity: 0, y: 50, scale: 0.9 },
//         { opacity: 1, y: 0, scale: 1, duration: 1, ease: 'power3.out' }
//       );
//     }
//   }, [isInView]);

//   // Automatic layout cycling (duration increased to 8 seconds)
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentLayoutIndex((prevIndex) => (prevIndex + 1) % layouts.length);
//     }, 8000); // Change layout every 8 seconds

//     return () => clearInterval(interval);
//   }, [layouts.length]);

//   // GSAP animation for new layout images (Magnetic Tile Flip & Slide In)
//   useLayoutEffect(() => {
//     Object.values(imageRefs.current).forEach(el => gsap.killTweensOf(el));
//     if (!isInView) return;

//     const masterTl = gsap.timeline({
//       defaults: { duration: 1.0, ease: "power2.inOut" }, // Base duration and ease for slide/flip
//       delay: 0.1 // Small delay before transition starts
//     });

//     currentLayout.forEach((imageConfig, index) => {
//       const imgElement = imageRefs.current[imageConfig.id];

//       if (imgElement) {
//         // Random starting position for the "slide" from off-screen
//         const startX = gsap.utils.random(-window.innerWidth * 0.8, window.innerWidth * 0.8);
//         const startY = gsap.utils.random(-window.innerHeight * 0.8, window.innerHeight * 0.8);

//         masterTl.fromTo(
//           imgElement,
//           {
//             opacity: 1,
//             scale: 0.7,
//             rotationX: gsap.utils.random(90, 180),
//             rotationY: gsap.utils.random(-90, 90),
//             z: 200,
//             x: startX,
//             y: startY,
//             borderRadius: imageConfig.borderRadius,
//           },
//           {
//             opacity: 1,
//             scale: 1,
//             rotationX: 0,
//             rotationY: 0,
//             z: 0,
//             x: 0,
//             y: 0,
//             top: imageConfig.top,
//             left: imageConfig.left,
//             right: imageConfig.right,
//             bottom: imageConfig.bottom,
//             width: imageConfig.width,
//             height: imageConfig.height,
//             zIndex: imageConfig.zIndex,
//             borderRadius: imageConfig.borderRadius,
//             duration: 1.2,
//             ease: "power2.out",
//             delay: index * 0.1,
//             onComplete: () => {
//               gsap.to(imgElement, {
//                 scale: 1, rotationX: 0, rotationY: 0, z: 0,
//                 ease: "back.out(1.7)",
//                 duration: 0.3,
//               });
//             }
//           },
//           0
//         );
//       }
//     });

//     return () => {
//       masterTl.kill();
//     };
//   }, [currentLayoutIndex, isInView, currentLayout]);

//   const containerVariants = {
//     hidden: { opacity: 0, y: 50 },
//     visible: {
//       opacity: 1,
//       y: 0,
//       transition: {
//         duration: 0.8,
//         ease: "easeOut",
//         staggerChildren: 0.15
//       }
//     },
//   };

//   const itemVariants = {
//     hidden: { opacity: 0, y: 20 },
//     visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
//   };

//   return (
//     <motion.section
//       ref={ref}
//       className="py-16 md:py-24 text-white relative overflow-hidden"
//       style={{
//         backgroundImage: 'linear-gradient(to right, #1F2937, #2D3A4B)',
//         backgroundSize: 'cover',
//         backgroundAttachment: 'fixed',
//       }}
//       variants={containerVariants}
//       initial="hidden"
//       animate={isInView ? "visible" : "hidden"}
//     >
//       <div className="absolute inset-0 z-0 bg-black/20"></div>

//       <div className="container mx-auto px-4 relative z-10">
//         <div className="flex flex-col lg:flex-row items-center lg:space-x-12">
//           {/* Left Column: Dynamic Image Layout */}
//           <motion.div
//             ref={innovationContainerRef}
//             className="w-full lg:w-[40%] mb-8 lg:mb-0 relative p-2 md:p-4 flex items-center justify-center min-h-[350px] md:min-h-[450px] rounded-xl"
//             style={{
//               overflow: 'hidden',
//               perspective: '1200px',
//               transformStyle: 'preserve-3d',
//             }}
//           >
//             <AnimatePresence initial={false} mode="wait">
//               {/* Added a React Fragment to wrap the two children for AnimatePresence */}
//               <>
//                 <motion.div
//                   key={currentLayoutIndex}
//                   className="absolute inset-0"
//                 >
//                   {currentLayout.map((image, index) => (
//                     <motion.img
//                       key={image.id}
//                       ref={el => {
//                         if (el) {
//                           imageRefs.current[image.id] = el;
//                         } else {
//                           delete imageRefs.current[image.id];
//                         }
//                       }}
//                       src={image.src}
//                       alt={`Innovation Image ${index}`}
//                       className="absolute object-cover"
//                       style={{
//                         ...imageBorderStyle,
//                         top: image.top,
//                         left: image.left,
//                         right: image.right,
//                         bottom: image.bottom,
//                         width: image.width,
//                         height: image.height,
//                         zIndex: image.zIndex,
//                         borderRadius: image.borderRadius,
//                       }}
//                       exit={{
//                         x: gsap.utils.random(-window.innerWidth * 1.5, window.innerWidth * 1.5),
//                         y: gsap.utils.random(-window.innerHeight * 1.5, window.innerHeight * 1.5),
//                         rotationX: gsap.utils.random(180, 540),
//                         rotationY: gsap.utils.random(180, 540),
//                         scale: 0.1,
//                         opacity: 1,
//                         transition: {
//                           duration: 1.0,
//                           ease: "easeIn",
//                           delay: index * 0.05
//                         }
//                       }}
//                       whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
//                     />
//                   ))}
//                 </motion.div>

//                 {/* STATISTIC COUNTER POSITIONED TO BOTTOM-RIGHT OF IMAGE CONTAINER */}
//                 <motion.div
//                   className="absolute bottom-4 left-0 md:bottom-6 md:right-6 z-50 w-max"
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={isInView ? { opacity: 1, y: 0 } : {}}
//                   transition={{ delay: 0.8, duration: 0.5, ease: "easeOut" }}
//                 >
//                   <SatisfiedClientCounter data={aboutData.satisfiedClients} isInView={isInView} />
//                 </motion.div>
//               </> {/* Closing React Fragment */}
//             </AnimatePresence>

//           </motion.div>

//           {/* Right Column: Content with glassmorphism card */}
//           <motion.div
//             className="w-full lg:w-[60%] p-6 rounded-xl"
//             style={glassmorphismCardStyles}
//             variants={itemVariants}
//           >
//             <motion.h2
//               className="text-3xl md:text-3xl font-extrabold text-white mb-4 leading-tight drop-shadow-md"
//               variants={itemVariants}
//             >
//               {aboutData.heading.split('Helix Conferences')[0]}
//               <span className="text-purple-400">Helix Conferences</span>
//               {aboutData.heading.split('Helix Conferences')[1] || ' !!!'}
//             </motion.h2>
//             <motion.p
//               className="text-base md:text-base text-gray-200 mb-5"
//               variants={itemVariants}
//             >
//               {aboutData.subHeading}
//             </motion.p>

//             <ul className="mb-6 space-y-2 text-gray-100">
//               {aboutData.points.map((point, index) => (
//                 <motion.li key={index} className="flex items-start text-sm md:text-sm" variants={itemVariants}>
//                   <CheckCircleIcon className="w-5 h-5 text-blue-400 mr-2 mt-1 flex-shrink-0" />
//                   <p>{point}</p>
//                 </motion.li>
//               ))}
//             </ul>

//             <motion.div variants={itemVariants}>
//               <Button to="/about">
//                 {aboutData.buttonText}
//               </Button>
//             </motion.div>
//           </motion.div>
//         </div>
//       </div>
//     </motion.section>
//   );
// }

// export default InnovationSection;