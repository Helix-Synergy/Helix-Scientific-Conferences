import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer'; // For scroll-triggered animations
import './EphemeralGallery.css'; // Import the CSS file

const images = [
  { id: 1, src: 'https://images.unsplash.com/photo-1540575467063-162579c20d75?q=80&w=600&auto=format&fit=crop', alt: 'Event 1', caption: 'Opening Keynote - Vision for the Future', },
  { id: 2, src: 'https://images.unsplash.com/photo-1505373877845-8c2aace4d816?q=80&w=600&auto=format&fit=crop', alt: 'Event 2', caption: 'Interactive Workshops & Learning' },
  { id: 3, src: 'https://images.unsplash.com/photo-1504384764586-bb4cdc1706b5?q=80&w=600&auto=format&fit=crop', alt: 'Event 3', caption: 'Dynamic Networking Sessions' },
  { id: 4, src: 'https://images.unsplash.com/photo-1531051515914-1e0c60c2394e?q=80&w=600&auto=format&fit=crop', alt: 'Event 4', caption: 'Exhibition Hall - Innovation Showcase' },
  { id: 5, src: 'https://images.unsplash.com/photo-1522204523234-87295a7f976a?q=80&w=600&auto=format&fit=crop', alt: 'Event 5', caption: 'In-depth Research Presentations' },
  { id: 6, src: 'https://images.unsplash.com/photo-1507679799974-c3dd3f123f07?q=80&w=600&auto=format&fit=crop', alt: 'Event 6', caption: 'Engaged Audience & Lively Discussions' },
  { id: 7, src: 'https://images.unsplash.com/photo-1496917756830-8a40498a5d3f?q=80&w=600&auto=format&fit=crop', alt: 'Event 7', caption: 'Hands-on Lab Demonstrations' },
  { id: 8, src: 'https://images.unsplash.com/photo-1504881850109-1a0cf5f59bf5?q=80&w=600&auto=format&fit=crop', alt: 'Event 8', caption: 'Poster Sessions & Collaborations' },
  { id: 9, src: 'https://images.unsplash.com/photo-1523580556276-8805370d9a0d?q=80&w=600&auto=format&fit=crop', alt: 'Event 9', caption: 'Gala Dinner & Awards Ceremony' },
  { id: 10, src: 'https://images.unsplash.com/photo-1510070112810-d4abfe57577f?q=80&w=600&auto=format&fit=crop', alt: 'Event 10', caption: 'Distinguished Speakers & Thought Leaders' },
  { id: 11, src: 'https://images.unsplash.com/photo-1517457375796-cf03723321c8?q=80&w=600&auto=format&fit=crop', alt: 'Event 11', caption: 'Interactive Q&A with Experts' },
  { id: 12, src: 'https://images.unsplash.com/photo-1526615598282-3d7507119f99?q=80&w=600&auto=format&fit=crop', alt: 'Event 12', caption: 'Future of Technology Panel' },
];

const EphemeralGallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);

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

  const modalBackdropVariants = {
    visible: { opacity: 1 },
    hidden: { opacity: 0 }
  };

  const modalContentVariants = {
    hidden: { scale: 0.7, opacity: 0, transition: { duration: 0.2 } },
    visible: { scale: 1, opacity: 1, transition: { delay: 0.1, type: 'spring', stiffness: 200, damping: 20 } }
  };

  // Variants for individual gallery items
  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 50 },
    visible: (i) => ({ // Use a function to pass index for staggered animation
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 10,
        delay: i * 0.1 + 0.3 // Staggered reveal + initial delay
      }
    })
  };

  const GalleryItem = ({ image, index }) => {
    const controls = useAnimation();
    const [ref, inView] = useInView({
      triggerOnce: true, // Only trigger animation once
      threshold: 0.2, // Trigger when 20% of the item is visible
    });

    useEffect(() => {
      if (inView) {
        controls.start("visible");
      }
    }, [controls, inView]);

    return (
      <motion.div
        ref={ref}
        className="ephemeral-grid-item ephemeral-glass-card"
        variants={itemVariants}
        initial="hidden"
        animate={controls}
        whileHover={{ scale: 1.05, boxShadow: '0 15px 30px rgba(0,0,0,0.6)' }}
        onClick={() => handleImageClick(image)}
        custom={index} // Pass index as custom prop for staggered animation
      >
        <div className="ephemeral-light-trail-effect"></div> {/* Light trail overlay */}
        <img src={image.src} alt={image.alt} loading="lazy" className="ephemeral-image" />
        <div className="ephemeral-caption">
          <p className="font-semibold">{image.caption}</p>
        </div>
      </motion.div>
    );
  };


  return (
    <div className="ephemeral-gallery-container">
      {/* Dynamic, Scroll-Reactive Background */}
      <div className="absolute inset-0 z-0 ephemeral-background">
        <div className="absolute inset-0 ephemeral-gradient-shift"></div>
        <div className="absolute inset-0 ephemeral-particle-overlay"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-20">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-12 text-teal-300 drop-shadow-lg animate-fade-in-up-custom">
          Ephemeral Event Highlights
        </h1>
        <p className="text-lg text-center mb-10 max-w-3xl mx-auto text-gray-300 animate-fade-in-custom">
          Witness moments captured in fleeting light, revealing the essence of our gatherings.
        </p>

        <div className="ephemeral-grid">
          {images.map((image, index) => (
            <GalleryItem key={image.id} image={image} index={index} />
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

export default EphemeralGallery;