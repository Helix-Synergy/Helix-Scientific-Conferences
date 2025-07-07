import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const images = [
    { id: 1, src: 'https://placehold.co/800x600/2E659A/FFFFFF?text=Event+1', alt: 'Conference Event 1', caption: 'Opening Ceremony' },
    { id: 2, src: 'https://placehold.co/800x600/4A2868/FFFFFF?text=Event+2', alt: 'Conference Event 2', caption: 'Keynote Speaker Session' },
    { id: 3, src: 'https://placehold.co/800x600/9A2E65/FFFFFF?text=Event+3', alt: 'Conference Event 3', caption: 'Networking Break' },
    { id: 4, src: 'https://placehold.co/800x600/6A3F9B/FFFFFF?text=Event+4', alt: 'Conference Event 4', caption: 'Poster Presentation' },
    { id: 5, src: 'https://placehold.co/800x600/2E659A/FFFFFF?text=Event+5', alt: 'Conference Event 5', caption: 'Workshop Session' },
    { id: 6, src: 'https://placehold.co/800x600/4A2868/FFFFFF?text=Event+6', alt: 'Conference Event 6', caption: 'Gala Dinner' },
    { id: 7, src: 'https://placehold.co/800x600/9A2E65/FFFFFF?text=Event+7', alt: 'Conference Event 7', caption: 'Panel Discussion' },
    { id: 8, src: 'https://placehold.co/800x600/6A3F9B/FFFFFF?text=Event+8', alt: 'Conference Event 8', caption: 'Exhibition Hall' },
  ];

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

  const backdropVariants = {
    visible: { opacity: 1 },
    hidden: { opacity: 0 }
  };

  const modalVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { scale: 1, opacity: 1, transition: { delay: 0.1 } }
  };

  return (
    <div className="min-h-screen relative overflow-hidden text-white py-20 px-4 bg-gray-900">
      {/* Background: Starfield/Particle Animation */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: 'radial-gradient(circle at center, #1a0033 0%, #000000 100%)',
          overflow: 'hidden',
        }}
      >
        {/* Simple starfield effect with multiple layers */}
        <div className="absolute inset-0 animate-[shimmer_20s_linear_infinite] opacity-30"
             style={{ backgroundImage: 'url(https://www.transparenttextures.com/patterns/stardust.png)' }}></div>
        <div className="absolute inset-0 animate-[shimmer_30s_linear_infinite_reverse] opacity-20"
             style={{ backgroundImage: 'url(https://www.transparenttextures.com/patterns/light-honeycomb.png)' }}></div>
        <div className="absolute inset-0 bg-black opacity-40"></div> {/* Dark overlay */}
      </div>

      <div className="container mx-auto relative z-10">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-12 animate-fade-in-up">
          Our Event Gallery
        </h1>

        <p className="text-lg text-center mb-10 max-w-3xl mx-auto">
          Relive the memorable moments from our past conferences and events.
          Click on any image to view details.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {images.map((image) => (
            <motion.div
              key={image.id}
              className="relative overflow-hidden rounded-lg shadow-xl cursor-pointer group"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              whileHover={{ scale: 1.05, boxShadow: '0 10px 20px rgba(0,0,0,0.4)' }}
              onClick={() => handleImageClick(image)}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <p className="text-white text-lg font-semibold text-center px-4">{image.caption}</p>
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
              className="relative bg-gray-800 rounded-lg shadow-2xl p-6 max-w-3xl w-full"
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
            >
              <button
                onClick={handleCloseModal}
                className="absolute top-3 right-3 text-white text-3xl font-bold hover:text-gray-400 transition-colors"
                aria-label="Close modal"
              >
                &times;
              </button>
              <img
                src={selectedImage.src}
                alt={selectedImage.alt}
                className="w-full h-auto max-h-[70vh] object-contain rounded-md"
              />
              <p className="text-center text-gray-300 text-lg mt-4">{selectedImage.caption}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Gallery;