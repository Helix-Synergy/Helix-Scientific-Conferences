


import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Gallery.css'; // We'll put the complex hexagonal CSS here

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const images = [
    { id: 1, src: 'https://images.unsplash.com/photo-1540575467063-162579c20d75?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', alt: 'Panel Discussion', caption: 'Engaging Panel Discussion on Biotechnology' },
    { id: 2, src: 'https://images.unsplash.com/photo-1505373877845-8c2aace4d816?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', alt: 'Keynote Speaker', caption: 'Inspiring Keynote by Dr. Sharma' },
    { id: 3, src: 'https://images.unsplash.com/photo-1504384764586-bb4cdc1706b5?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', alt: 'Networking Session', caption: 'Productive Networking Session' },
    { id: 4, src: 'https://images.unsplash.com/photo-1531051515914-1e0c60c2394e?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', alt: 'Exhibition Booths', caption: 'Innovative Startups at Exhibition' },
    { id: 5, src: 'https://images.unsplash.com/photo-1522204523234-87295a7f976a?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', alt: 'Research Presentation', caption: 'Cutting-Edge Research Presentations' },
    { id: 6, src: 'https://images.unsplash.com/photo-1507679799974-c3dd3f123f07?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', alt: 'Audience Engagement', caption: 'Engaged Audience at the Plenary Session' },
    { id: 7, src: 'https://images.unsplash.com/photo-1496917756830-8a40498a5d3f?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', alt: 'Hands-on Workshop', caption: 'Practical Workshop on Peptide Synthesis' },
    { id: 8, src: 'https://images.unsplash.com/photo-1504881850109-1a0cf5f59bf5?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', alt: 'Scientific Poster Session', caption: 'Innovations in Peptide Science' },
    { id: 9, src: 'https://images.unsplash.com/photo-1523580556276-8805370d9a0d?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', alt: 'Closing Ceremony', caption: 'Grand Closing Ceremony' },
    { id: 10, src: 'https://images.unsplash.com/photo-1510070112810-d4abfe57577f?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', alt: 'Award Distribution', caption: 'Recognizing Excellence in Research' },
  ];

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  useEffect(() => {
    if (selectedImage) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedImage]);

  const backdropVariants = {
    visible: { opacity: 1 },
    hidden: { opacity: 0 }
  };

  const modalVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { scale: 1, opacity: 1, transition: { delay: 0.1 } }
  };

  return (
    <div className="relative min-h-screen overflow-hidden text-white py-20 px-4 bg-zinc-950">
      {/* Background with subtle polygonal pattern */}
      <div
        className="absolute inset-0 z-0 opacity-70"
        style={{
          background: `linear-gradient(135deg, rgba(0,0,0,0.8) 0%, rgba(10,0,20,0.9) 50%, rgba(0,0,0,0.8) 100%)`,
          overflow: 'hidden',
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%235533AA' fill-opacity='0.1' fill-rule='evenodd'%3E%3Cpath d='M0 60L60 0H0zM60 60V0L0 60z'/%3E%3C/g%3E%3C/svg%3E")`,
          backgroundAttachment: 'fixed',
        }}
      >
        <div className="absolute inset-0 bg-black opacity-10"></div>
      </div>

      <div className="container mx-auto relative z-10">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-12 animate-fade-in-up text-indigo-300 drop-shadow-lg">
          Our Event Gallery
        </h1>

        <p className="text-lg text-center mb-10 max-w-3xl mx-auto text-gray-300">
          Relive the memorable moments from our past conferences and events.
          Click on any image to view details.
        </p>

        {/* HEXAGONAL GALLERY CONTAINER */}
        <div className="hexagon-gallery-container">
          {images.map((image) => (
            <motion.div
              key={image.id}
              className="hexagon-item"
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: image.id * 0.08 }} // Slightly faster staggered delay
              whileHover={{ zIndex: 10 }} // Bring to front on hover to prevent clipping
              onClick={() => handleImageClick(image)}
            >
              <div className="hexagon-item-inner">
                <div className="hexagon-item-content gallery-card"> {/* Apply glass-card here */}
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="hexagon-img"
                  />
                  {/* Caption overlay for hexagon */}
                  <div className="hexagon-caption-overlay">
                    <p className="hexagon-caption-text">{image.caption}</p>
                  </div>
                  {/* Hover "View" overlay */}
                  <div className="hexagon-hover-overlay">
                    <p className="text-white text-xl font-bold">View</p>
                  </div>
                </div>
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
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={handleCloseModal}
          >
            <motion.div
              className="relative rounded-xl shadow-2xl p-6 max-w-4xl w-full gallery-modal" // Apply specific class for modal
              variants={modalVariants}
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

export default Gallery;