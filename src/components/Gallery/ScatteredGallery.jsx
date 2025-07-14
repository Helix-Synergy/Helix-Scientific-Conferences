// import React, { useState, useEffect, useRef } from 'react';
// import { motion, AnimatePresence,useAnimation } from 'framer-motion';
// import { useInView } from 'react-intersection-observer';
// import './ScatteredGallery.css'; // New CSS file

// // Utility function to get a random number within a range
// const getRandom = (min, max) => Math.random() * (max - min) + min;

// const initialImages = [
//     { id: 1, src: 'https://picsum.photos/id/10/300/200', alt: 'Placeholder 1', caption: 'Scenic View' },
//     { id: 2, src: 'https://picsum.photos/id/20/300/200', alt: 'Placeholder 2', caption: 'Cityscape' },
//     { id: 3, src: 'https://picsum.photos/id/30/300/200', alt: 'Placeholder 3', caption: 'Nature' },
//     { id: 4, src: 'https://picsum.photos/id/40/300/200', alt: 'Placeholder 4', caption: 'Architecture' },
//     { id: 5, src: 'https://picsum.photos/id/50/300/200', alt: 'Placeholder 5', caption: 'Abstract' },
//     { id: 6, src: 'https://picsum.photos/id/60/300/200', alt: 'Placeholder 6', caption: 'People' },
//     { id: 7, src: 'https://picsum.photos/id/70/300/200', alt: 'Placeholder 7', caption: 'Animals' },
//     { id: 8, src: 'https://picsum.photos/id/80/300/200', alt: 'Placeholder 8', caption: 'Food' },
//     { id: 9, src: 'https://picsum.photos/id/90/300/200', alt: 'Placeholder 9', caption: 'Technology' },
//     { id: 10, src: 'https://picsum.photos/id/100/300/200', alt: 'Placeholder 10', caption: 'Work' },
//     { id: 11, src: 'https://picsum.photos/id/110/300/200', alt: 'Placeholder 11', caption: 'Travel' },
//     { id: 12, src: 'https://picsum.photos/id/120/300/200', alt: 'Placeholder 12', caption: 'Art' },
//   ];

// const ScatteredGallery = () => {
//   // We'll manage images with their positions and z-index in state
//   const [images, setImages] = useState(() =>
//     initialImages.map((img) => ({
//       ...img,
//       x: getRandom(-150, 150), // Initial random x offset from center
//       y: getRandom(-100, 100), // Initial random y offset from center
//       rotate: getRandom(-15, 15), // Initial random rotation
//       zIndex: 1, // Base z-index
//     }))
//   );
//   const [selectedImage, setSelectedImage] = useState(null); // For the full-screen modal
//   const containerRef = useRef(null); // Ref for the main gallery area
//   const highestZIndex = useRef(initialImages.length); // Track highest z-index

//   const handleImageClick = (image) => {
//     setSelectedImage(image);
//   };

//   const handleCloseModal = () => {
//     setSelectedImage(null);
//   };

//   useEffect(() => {
//     if (selectedImage) {
//       document.body.style.overflow = 'hidden';
//     } else {
//       document.body.style.overflow = 'unset';
//     }
//     return () => {
//       document.body.style.overflow = 'unset';
//     };
//   }, [selectedImage]);

//   const handleDragStart = (info, id) => {
//     setImages((prevImages) => {
//       highestZIndex.current += 1; // Increment z-index for the dragged item
//       return prevImages.map((img) =>
//         img.id === id ? { ...img, zIndex: highestZIndex.current } : img
//       );
//     });
//   };

//   const handleDragEnd = (event, info, id) => {
//     // Update the position in state after drag ends
//     setImages((prevImages) =>
//       prevImages.map((img) =>
//         img.id === id
//           ? {
//               ...img,
//               x: img.x + info.offset.x,
//               y: img.y + info.offset.y,
//               // Reset rotation slightly after drag if desired
//               // rotate: getRandom(-5, 5) // You can add a subtle snap back or new random rotate
//             }
//           : img
//       )
//     );

//     // Swap Logic (Simplified):
//     // Find the dragged item and its new center
//     const draggedItem = images.find(img => img.id === id);
//     const draggedRect = itemRefs.current[id]?.getBoundingClientRect(); // Get current screen position

//     if (!draggedRect || !containerRef.current) return;

//     // Iterate through other items to check for overlap/proximity
//     setImages(prevImages => {
//       let newImages = [...prevImages];
//       let swapped = false;

//       for (let i = 0; i < newImages.length; i++) {
//         const otherItem = newImages[i];
//         if (otherItem.id === id) continue; // Don't compare with self

//         const otherRect = itemRefs.current[otherItem.id]?.getBoundingClientRect();
//         if (!otherRect) continue;

//         // Simple overlap check: if centers are close, consider a swap
//         const distanceX = Math.abs((draggedRect.left + draggedRect.right) / 2 - (otherRect.left + otherRect.right) / 2);
//         const distanceY = Math.abs((draggedRect.top + draggedRect.bottom) / 2 - (otherRect.top + otherRect.bottom) / 2);

//         // Define a threshold for "close enough" to swap. Adjust as needed.
//         const swapThreshold = 100; // pixels

//         if (distanceX < swapThreshold && distanceY < swapThreshold) {
//           // Perform swap: copy positions and rotations
//           const draggedIndex = newImages.findIndex(img => img.id === id);
//           const otherIndex = i;

//           const tempX = newImages[draggedIndex].x;
//           const tempY = newImages[draggedIndex].y;
//           const tempRotate = newImages[draggedIndex].rotate;

//           // Swap positions and rotations for a "magnetic" swap effect
//           newImages[draggedIndex] = {
//             ...newImages[draggedIndex],
//             x: newImages[otherIndex].x,
//             y: newImages[otherIndex].y,
//             rotate: newImages[otherIndex].rotate,
//             zIndex: highestZIndex.current // Keep dragged item on top
//           };
//           newImages[otherIndex] = {
//             ...newImages[otherIndex],
//             x: tempX,
//             y: tempY,
//             rotate: tempRotate,
//             zIndex: newImages[otherIndex].zIndex - 1 // Put swapped item slightly behind
//           };
//           swapped = true;
//           break; // Only swap with one item at a time
//         }
//       }
//       return newImages;
//     });
//   };

//   const itemRefs = useRef({}); // Store refs for collision detection

//   // Framer Motion variants for reveal on scroll
//   const revealVariants = {
//     hidden: { opacity: 0, scale: 0.8, y: 50 },
//     visible: (i) => ({
//       opacity: 1,
//       scale: 1,
//       y: 0,
//       transition: {
//         type: 'spring',
//         stiffness: 100,
//         damping: 10,
//         delay: i * 0.1 + 0.3 // Staggered reveal
//       }
//     })
//   };

//   const ScatteredGalleryItem = ({ image, index, onDragStart, onDragEnd }) => {
//     const controls = useAnimation();
//     const [ref, inView] = useInView({
//       triggerOnce: true,
//       threshold: 0.2,
//     });

//     useEffect(() => {
//       if (inView) {
//         controls.start("visible");
//       }
//     }, [controls, inView]);

//     return (
//       <motion.div
//         ref={(el) => {
//           ref(el); // for useInView
//           itemRefs.current[image.id] = el; // for drag collision
//         }}
//         className="scattered-gallery-item ephemeral-glass-card"
//         style={{
//           x: image.x,
//           y: image.y,
//           rotate: image.rotate,
//           zIndex: image.zIndex,
//         }}
//         drag // Enable drag
//         dragConstraints={containerRef} // Constrain drag to parent
//         dragElastic={0.2} // How much the item can be dragged beyond constraints
//         onDragStart={(event, info) => onDragStart(info, image.id)}
//         onDragEnd={(event, info) => onDragEnd(event, info, image.id)}
//         variants={revealVariants}
//         initial="hidden"
//         animate={controls}
//         whileHover={{ scale: 1.08, zIndex: highestZIndex.current + 1, boxShadow: '0 15px 30px rgba(0,0,0,0.6)' }}
//         onClick={() => handleImageClick(image)}
//         custom={index}
//         layout // Crucial for animating position changes due to swaps
//       >
//         <div className="ephemeral-light-trail-effect"></div>
//         <img src={image.src} alt={image.alt} className="scattered-image" />
//         <div className="scattered-caption">
//           <p className="font-semibold">{image.caption}</p>
//         </div>
//       </motion.div>
//     );
//   };

//   const modalBackdropVariants = {
//     visible: { opacity: 1 },
//     hidden: { opacity: 0 }
//   };

//   const modalContentVariants = {
//     hidden: { scale: 0.7, opacity: 0, transition: { duration: 0.2 } },
//     visible: { scale: 1, opacity: 1, transition: { delay: 0.1, type: 'spring', stiffness: 200, damping: 20 } }
//   };

//   return (
//     <div className="ephemeral-gallery-container">
//       {/* Dynamic, Scroll-Reactive Background (keeping the light version) */}
//       <div className="absolute inset-0 z-0 ephemeral-background">
//         <div className="absolute inset-0 ephemeral-gradient-shift"></div>
//         <div className="absolute inset-0 ephemeral-particle-overlay"></div>
//       </div>

//       <div className="relative z-10 container mx-auto px-4 py-20">
//         <h1 className="text-4xl md:text-5xl font-bold text-center mb-12 text-teal-700 drop-shadow-lg animate-fade-in-up-custom">
//           Ephemeral Memories Scattered
//         </h1>
//         <p className="text-lg text-center mb-10 max-w-3xl mx-auto text-gray-700 animate-fade-in-custom">
//           Drag, drop, and rearrange these moments, brought to life with trails of light.
//         </p>

//         {/* This will be the main area for the scattered images */}
//         <div ref={containerRef} className="scattered-gallery-area">
//           {images.map((image, index) => (
//             <ScatteredGalleryItem
//               key={image.id}
//               image={image}
//               index={index}
//               onDragStart={handleDragStart}
//               onDragEnd={handleDragEnd}
//             />
//           ))}
//         </div>
//       </div>

//       {/* Image Modal (same as before) */}
//       <AnimatePresence>
//         {selectedImage && (
//           <motion.div
//             className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
//             variants={modalBackdropVariants}
//             initial="hidden"
//             animate="visible"
//             exit="hidden"
//             onClick={handleCloseModal}
//           >
//             <motion.div
//               className="relative rounded-xl shadow-2xl p-6 max-w-4xl w-full ephemeral-modal-content"
//               variants={modalContentVariants}
//               initial="hidden"
//               animate="visible"
//               exit="hidden"
//               onClick={(e) => e.stopPropagation()}
//             >
//               <button
//                 onClick={handleCloseModal}
//                 className="absolute top-4 right-4 text-white text-4xl font-light hover:text-gray-300 transition-colors z-10"
//                 aria-label="Close modal"
//               >
//                 &times;
//               </button>
//               <img
//                 src={selectedImage.src}
//                 alt={selectedImage.alt}
//                 className="w-full h-auto max-h-[70vh] object-contain rounded-lg shadow-lg"
//               />
//               <p className="text-center text-gray-200 text-xl mt-4 font-semibold">{selectedImage.caption}</p>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// };

// export default ScatteredGallery;



import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import './ScatteredGallery.css';

// Utility function to get a random number within a range
const getRandom = (min, max) => Math.random() * (max - min) + min;

const initialImages = [
  { id: 1, src: 'https://picsum.photos/id/10/300/200', alt: 'Placeholder 1', caption: 'Scenic View' },
  { id: 2, src: 'https://picsum.photos/id/20/300/200', alt: 'Placeholder 2', caption: 'Cityscape' },
  { id: 3, src: 'https://picsum.photos/id/30/300/200', alt: 'Placeholder 3', caption: 'Nature' },
  { id: 4, src: 'https://picsum.photos/id/40/300/200', alt: 'Placeholder 4', caption: 'Architecture' },
  { id: 5, src: 'https://picsum.photos/id/50/300/200', alt: 'Placeholder 5', caption: 'Abstract' },
  { id: 6, src: 'https://picsum.photos/id/60/300/200', alt: 'Placeholder 6', caption: 'People' },
  { id: 7, src: 'https://picsum.photos/id/70/300/200', alt: 'Placeholder 7', caption: 'Animals' },
  { id: 8, src: 'https://picsum.photos/id/80/300/200', alt: 'Placeholder 8', caption: 'Food' },
  { id: 9, src: 'https://picsum.photos/id/90/300/200', alt: 'Placeholder 9', caption: 'Technology' },
  { id: 10, src: 'https://picsum.photos/id/100/300/200', alt: 'Placeholder 10', caption: 'Work' },
  { id: 11, src: 'https://picsum.photos/id/110/300/200', alt: 'Placeholder 11', caption: 'Travel' },
  { id: 12, src: 'https://picsum.photos/id/120/300/200', alt: 'Placeholder 12', caption: 'Art' },
];

const ScatteredGallery = () => {
  const [images, setImages] = useState(() =>
    initialImages.map((img) => ({
      ...img,
      x: getRandom(-150, 150),
      y: getRandom(-100, 100),
      rotate: getRandom(-15, 15),
      zIndex: 1,
    }))
  );
  const [selectedImage, setSelectedImage] = useState(null);
  const containerRef = useRef(null);
  const highestZIndex = useRef(initialImages.length); // Start with initial count for base z-index

  // Ref to store current positions of items for swap logic
  const itemRefs = useRef({});

  const handleImageClick = useCallback((image) => {
    setSelectedImage(image);
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedImage(null);
  }, []);

  useEffect(() => {
    document.body.style.overflow = selectedImage ? 'hidden' : 'unset';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedImage]);

  const handleDragStart = useCallback((id) => {
    setImages((prevImages) => {
      highestZIndex.current += 1;
      return prevImages.map((img) =>
        img.id === id ? { ...img, zIndex: highestZIndex.current } : img
      );
    });
  }, []);

  const handleDragEnd = useCallback((id, dragInfo) => {
    setImages((prevImages) => {
      let newImages = [...prevImages];
      const draggedIndex = newImages.findIndex(img => img.id === id);
      const draggedItem = newImages[draggedIndex];

      // Update the position of the dragged item
      const newX = draggedItem.x + dragInfo.offset.x;
      const newY = draggedItem.y + dragInfo.offset.y;

      newImages[draggedIndex] = {
        ...draggedItem,
        x: newX,
        y: newY,
        // Optional: subtly reset rotation after drag for a cleaner stop
        rotate: getRandom(-5, 5),
      };

      const draggedElementRect = itemRefs.current[id]?.getBoundingClientRect();

      if (!draggedElementRect || !containerRef.current) {
        return newImages; // Return updated position, no swap if refs are missing
      }

      // Simplified Swap Logic: Find closest element to swap with
      let closestItemIndex = -1;
      let minDistance = Infinity;

      for (let i = 0; i < newImages.length; i++) {
        if (i === draggedIndex) continue;

        const otherItem = newImages[i];
        const otherElementRect = itemRefs.current[otherItem.id]?.getBoundingClientRect();

        if (otherElementRect) {
          // Calculate distance between centers
          const otherCenterX = otherElementRect.left + otherElementRect.width / 2;
          const otherCenterY = otherElementRect.top + otherElementRect.height / 2;
          const draggedCenterX = draggedElementRect.left + draggedElementRect.width / 2;
          const draggedCenterY = draggedElementRect.top + draggedElementRect.height / 2;

          const distance = Math.sqrt(
            Math.pow(draggedCenterX - otherCenterX, 2) +
            Math.pow(draggedCenterY - otherCenterY, 2)
          );

          // If dragged item is 'over' another, consider it for a swap
          // A more robust check might involve actual overlap percentage
          const overlapThreshold = Math.min(draggedElementRect.width, draggedElementRect.height) / 2; // e.g., if centers are within half the smaller dimension
          if (distance < overlapThreshold && distance < minDistance) {
            minDistance = distance;
            closestItemIndex = i;
          }
        }
      }

      if (closestItemIndex !== -1) {
        // Perform the swap in the array
        const otherItem = newImages[closestItemIndex];

        // Swap visual positions (x, y, rotate)
        newImages[draggedIndex] = {
          ...draggedItem,
          x: otherItem.x,
          y: otherItem.y,
          rotate: otherItem.rotate,
          zIndex: highestZIndex.current, // Ensure dragged item stays on top after swap
        };

        newImages[closestItemIndex] = {
          ...otherItem,
          x: newX, // Other item moves to the dragged item's drop position
          y: newY,
          rotate: getRandom(-5, 5), // Give the swapped item a slight new random rotation
          zIndex: otherItem.zIndex - 1 < 1 ? 1 : otherItem.zIndex - 1 // Ensure zIndex doesn't go below 1
        };

        // You might want to also reorder the array itself if the order matters for anything else
        // This makes `layout` property work best for animating true reorders
        // [newImages[draggedIndex], newImages[closestItemIndex]] = [newImages[closestItemIndex], newImages[draggedIndex]];
      }

      return newImages;
    });
  }, [images]); // Dependency on 'images' for swap logic. Could be optimized for very large lists.

  // Framer Motion variants for reveal on scroll
  const revealVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 50 },
    visible: (i) => ({
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 10,
        delay: i * 0.1 + 0.3 // Staggered reveal
      }
    })
  };

  const ScatteredGalleryItem = React.memo(({ image, index, onDragStart, onDragEnd }) => {
    const controls = useAnimation();
    const [ref, inView] = useInView({
      triggerOnce: true, // Only trigger animation once when it first enters view
      threshold: 0.2,
    });

    useEffect(() => {
      if (inView) {
        controls.start("visible");
      }
    }, [controls, inView]);

    // Added for drag and drop accessibility
    const dragAccessibilityProps = {
      role: "button",
      "aria-label": `Drag and drop image: ${image.caption}`,
      tabIndex: 0, // Make draggable items focusable
    };

    return (
      <motion.div
        ref={(el) => {
          ref(el); // for useInView
          itemRefs.current[image.id] = el; // for drag collision
        }}
        className="scattered-gallery-item ephemeral-glass-card"
        style={{
          x: image.x,
          y: image.y,
          rotate: image.rotate,
          zIndex: image.zIndex,
        }}
        drag
        dragConstraints={containerRef}
        dragElastic={0.2}
        onDragStart={() => onDragStart(image.id)} // Pass only ID
        onDragEnd={(event, info) => onDragEnd(image.id, info)} // Pass ID and dragInfo
        variants={revealVariants}
        initial="hidden"
        animate={controls}
        whileHover={{
          scale: 1.08,
          boxShadow: '0 15px 30px rgba(0,0,0,0.4)', // Slightly stronger shadow on hover
          transition: { type: 'spring', stiffness: 300, damping: 20 }
        }}
        whileTap={{ cursor: 'grabbing', scale: 1.1, zIndex: highestZIndex.current + 2 }} // Extra visual feedback on tap
        onClick={() => handleImageClick(image)}
        custom={index}
        layout
        {...dragAccessibilityProps} // Apply accessibility props
      >
        <div className="ephemeral-light-trail-effect"></div>
        <img src={image.src} alt={image.alt} className="scattered-image" />
        <div className="scattered-caption">
          <p className="font-semibold">{image.caption}</p>
        </div>
      </motion.div>
    );
  });

  const modalBackdropVariants = {
    visible: { opacity: 1 },
    hidden: { opacity: 0 }
  };

  const modalContentVariants = {
    hidden: { scale: 0.7, opacity: 0, transition: { duration: 0.2 } },
    visible: { scale: 1, opacity: 1, transition: { delay: 0.1, type: 'spring', stiffness: 200, damping: 20 } }
  };

  return (
    <div className="ephemeral-gallery-container">
      {/* Dynamic, Scroll-Reactive Background (keeping the light version) */}
      <div className="absolute inset-0 z-0 ephemeral-background">
        <div className="absolute inset-0 ephemeral-gradient-shift"></div>
        <div className="absolute inset-0 ephemeral-particle-overlay"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-20">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-12 text-teal-700 drop-shadow-lg animate-fade-in-up-custom">
          Ephemeral Memories Scattered
        </h1>
        <p className="text-lg text-center mb-10 max-w-3xl mx-auto text-gray-700 animate-fade-in-custom">
          Drag, drop, and rearrange these moments, brought to life with trails of light.
        </p>

        {/* This will be the main area for the scattered images */}
        <div ref={containerRef} className="scattered-gallery-area">
          {images.map((image, index) => (
            <ScatteredGalleryItem
              key={image.id}
              image={image}
              index={index}
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
            />
          ))}
        </div>
      </div>

      {/* Image Modal (same as before) */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
            variants={modalBackdropVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={handleCloseModal}
          >
            <motion.div
              className="relative rounded-xl shadow-2xl p-6 max-w-4xl w-full ephemeral-modal-content"
              variants={modalContentVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={handleCloseModal}
                className="absolute top-4 right-4 text-white text-4xl font-light hover:text-gray-300 transition-colors z-10"
                aria-label="Close modal"
              >
                &times;
              </button>
              <img
                src={selectedImage.src}
                alt={selectedImage.alt}
                className="w-full h-auto max-h-[70vh] object-contain rounded-lg shadow-lg"
              />
              <p className="text-center text-gray-200 text-xl mt-4 font-semibold">{selectedImage.caption}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ScatteredGallery;