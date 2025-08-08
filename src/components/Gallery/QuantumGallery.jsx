import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './QuantumGallery.css'; // Import the CSS file

const images = [
  { id: 1, src: 'data:image/jpeg;base64,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', alt: 'Event 1', caption: 'Panel Discussion Insights' },
  { id: 2, src: 'https://agcdn-1d97e.kxcdn.com/wp-content/uploads/2017/02/alphagamma-top-10-business-conferences-for-entrepreneurs-opportunities-1021x580.jpg', alt: 'Event 2', caption: 'Keynote Address Highlights' },
  { id: 3, src: 'https://www.datarails.com/wp-content/uploads/2023/10/shutterstock_1746589124.jpg', alt: 'Event 3', caption: 'Networking & Collaborations' },
  { id: 4, src: 'https://www.millertanner.com/wp-content/uploads/2022/05/shutterstock_1908799612.jpg', alt: 'Event 4', caption: 'Exhibition Booths Innovation' },
  { id: 5, src: 'https://www.eventdrive.com/hubfs/Imported_Blog_Media/7-tips-pour-organiser-une-conference-qui-cartonne.jpg', alt: 'Event 5', caption: 'Research Presentation Showcase' },
  { id: 6, src: 'https://cdn.stemcell.com/media/images/social/conferences.jpg', alt: 'Event 6', caption: 'Audience Engagement & Q&A' },
  { id: 7, src: 'https://informationmatters.org/wp-content/uploads/2023/07/qtq80-ztOwFp-800x445.jpeg', alt: 'Event 7', caption: 'Hands-on Workshop Experience' },
  { id: 8, src: 'https://www.timeshighereducation.com/sites/default/files/styles/teaser_standard/public/conference_audience.jpg?itok=ff-ffVRn', alt: 'Event 8', caption: 'Scientific Poster Session' },
  { id: 9, src: 'https://www.placesandtechnologies.eu/wp-content/uploads/2021/11/Conference.jpg', alt: 'Event 9', caption: 'Closing Ceremony & Farewell' },
  { id: 10, src: 'https://event.exeter.ac.uk/storage/322/academic-research-conference.jpg', alt: 'Event 10', caption: 'Award Distribution Gala' },
  { id: 11, src: 'https://event.exeter.ac.uk/storage/322/academic-research-conference.jpg', alt: 'Event 11', caption: 'Innovation Hub Demo' },
  { id: 12, src: 'https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg?cs=srgb&dl=pexels-jibarofoto-2774556.jpg&fm=jpg', alt: 'Event 12', caption: 'Future Tech Discussion' },
];

const QuantumGallery = () => {
  const [hoveredId, setHoveredId] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null); // For the full-screen modal
  const itemRefs = useRef({}); // To store references to each gallery item
  const containerRef = useRef(null); // Ref for the main gallery container

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  useEffect(() => {
    // Disable body scroll when modal is open
    if (selectedImage) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedImage]);

  // Function to determine if an item is a direct neighbor (or the hovered item itself)
  const getItemVariant = (id) => {
    if (hoveredId === null) {
      return 'normal';
    }
    if (id === hoveredId) {
      return 'hovered';
    }

    // Calculate distance from hovered item
    // This is a simplified distance check based on array index.
    // For a true 2D grid neighbor check, you'd need to know row/col of each item
    // and calculate Euclidean distance, or manually map neighbors.
    const hoveredIndex = images.findIndex(img => img.id === hoveredId);
    const currentIndex = images.findIndex(img => img.id === id);

    const distance = Math.abs(hoveredIndex - currentIndex);

    if (distance <= 1) { // Immediate neighbors
      return 'closeNeighbor';
    }
    // You can add more distance tiers if you want more layers of effect
    // else if (distance <= 3) { // Slightly further out
    //   return 'farNeighbor';
    // }
    return 'background';
  };

  // Framer Motion variants for different states
  const variants = {
    normal: {
      scale: 1,
      opacity: 1,
      x: 0,
      y: 0,
      filter: 'blur(0px)',
      boxShadow: '0 5px 15px rgba(0,0,0,0.3)',
      zIndex: 1,
      transition: { type: 'spring', stiffness: 300, damping: 20 },
    },
    hovered: {
      scale: 1.15, // Hero image expands
      scaleZ: 1.2, // Adds a bit of 3D depth illusion
      opacity: 1,
      x: 0, y: 0,
      filter: 'blur(0px)',
      boxShadow: '0 15px 30px rgba(0,0,0,0.7)',
      zIndex: 10, // Bring to front
      // glowing border/background will be handled by CSS class or inline style
      transition: { type: 'spring', stiffness: 200, damping: 15 },
    },
    closeNeighbor: {
      scale: 0.9, // Neighbors recede slightly
      opacity: 0.7,
      x: 0, y: 0,
      filter: 'blur(1.5px)', // Subtle blur for neighbors
      boxShadow: '0 3px 10px rgba(0,0,0,0.2)',
      zIndex: 2, // Still visible, but behind hovered
      transition: { type: 'spring', stiffness: 300, damping: 25 },
    },
    // farNeighbor: {
    //   scale: 0.95,
    //   opacity: 0.85,
    //   filter: 'blur(0.5px)',
    //   boxShadow: '0 4px 12px rgba(0,0,0,0.25)',
    //   zIndex: 1,
    //   transition: { type: 'spring', stiffness: 300, damping: 25 },
    // },
    background: {
      scale: 0.85, // Distant images recede more
      opacity: 0.5,
      x: 0, y: 0,
      filter: 'blur(2px)', // Stronger blur for distant images
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      zIndex: 0, // Further back
      transition: { type: 'spring', stiffness: 300, damping: 30 },
    }
  };

  const modalBackdropVariants = {
    visible: { opacity: 1 },
    hidden: { opacity: 0 }
  };

  const modalContentVariants = {
    hidden: { scale: 0.7, opacity: 0, transition: { duration: 0.2 } },
    visible: { scale: 1, opacity: 1, transition: { delay: 0.1, type: 'spring', stiffness: 200, damping: 20 } }
  };


  return (
    <div className="quantum-gallery-container">
      {/* Background with subtle animation and glow */}
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-purple-950 via-red-950 to-black overflow-hidden">
        <div className="absolute inset-0 bg-dot-pattern opacity-10 animate-pulse-subtle"></div>
        <div className="absolute inset-0 bg-faded-radial-glow"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-20">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-12 text-blue-300 drop-shadow-lg animate-fade-in-up">
          Explore Our Event Moments
        </h1>
        <p className="text-lg text-center mb-10 max-w-3xl mx-auto text-gray-300 animate-fade-in">
          Witness the "quantum fluctuations" of our past events, where every moment connects. Hover to reveal the essence, click for details.
        </p>

        <div ref={containerRef} className="quantum-grid">
          {images.map((image) => (
            <motion.div
              key={image.id}
              ref={el => itemRefs.current[image.id] = el}
              className={`quantum-grid-item ${hoveredId === image.id ? 'active-hover-glass' : 'inactive-glass'}`}
              variants={variants}
              initial="normal"
              animate={getItemVariant(image.id)}
              onHoverStart={() => setHoveredId(image.id)}
              onHoverEnd={() => setHoveredId(null)}
              onClick={() => handleImageClick(image)}
            >
              <img src={image.src} alt={image.alt} loading="lazy" className="quantum-image" />
              <div className="quantum-caption">
                <p className="font-semibold">{image.caption}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Image Modal */}
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
              className="relative rounded-xl shadow-2xl p-6 max-w-4xl w-full quantum-modal-content"
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
                loading="lazy"
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

export default QuantumGallery;