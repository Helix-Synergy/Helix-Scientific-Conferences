// // src/components/TestimonialCarousel.js
// import React, { useEffect, useRef } from 'react';
// import { Splide, SplideSlide } from '@splidejs/react-splide';
// import '@splidejs/react-splide/css'; // Default Splide theme CSS
// // Optional: You can import a different theme or add your own custom CSS
// // import '@splidejs/react-splide/css/themes/splide-skyblue.min.css';

// // Helper component to render stars
// const StarRating = ({ count }) => {
//   return (
//     <div className="flex justify-center mb-4">
//       {[...Array(5)].map((_, i) => (
//         <svg
//           key={i}
//           className={`w-5 h-5 ${i < count ? 'text-yellow-400' : 'text-gray-300'}`}
//           fill="currentColor"
//           viewBox="0 0 20 20"
//         >
//           <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.538 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.783.57-1.838-.197-1.538-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.381-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z"></path>
//         </svg>
//       ))}
//     </div>
//   );
// };

// const TestimonialCarousel = ({ testimonials }) => {
//   const splideRef = useRef(null); // Ref to access the Splide instance

//   useEffect(() => {
//     if (splideRef.current) {
//       const splide = splideRef.current.splide;

//       // Animation for active slide entrance
//       splide.on('active', (slide) => {
//         // Remove from all slides first to re-trigger for the new active slide
//         splide.Components.Slides.get  ().forEach(s => {
//           s.slide.querySelector('.testimonial-card').classList.remove('animate-fade-in-down');
//         });
//         // Add animation to the currently active slide
//         slide.slide.querySelector('.testimonial-card').classList.add('animate-fade-in-down');
//       });

//       // Clear animation when slide becomes inactive to prepare for re-animation
//       splide.on('inactive', (slide) => {
//         slide.slide.querySelector('.testimonial-card').classList.remove('animate-fade-in-down');
//       });

//       // Initialize the first slide animation if autoplay starts
//       // This ensures the first visible slide also animates
//       splide.on('mounted', () => {
//         const activeSlide = splide.Components.Slides.get(splide.index);
//         if (activeSlide) {
//           activeSlide.slide.querySelector('.testimonial-card').classList.add('animate-fade-in-down');
//         }
//       });
//     }
//   }, []);

//   const splideOptions = {
//     type: 'loop',           // Continuous loop
//     perPage: 3,             // Show 3 testimonials at once on large screens
//     perMove: 1,             // Move 1 testimonial at a time
//     autoplay: true,         // Auto-play the carousel
//     interval: 4000,         // Interval for auto-play (4 seconds)
//     speed: 1000,            // Transition speed (1 second)
//     easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)', // More dynamic easing
//     pauseOnHover: true,     // Pause auto-play on hover
//     focus: 'center',        // Keep current slide centered
//     gap: '2rem',            // Space between slides
//     padding: '1rem',        // Padding around the slides
//     arrows: true,           // Show navigation arrows (icons)
//     pagination: true,       // Show pagination dots (icons)
//     breakpoints: {
//       1024: { perPage: 2, gap: '1.5rem' }, // 2 testimonials on medium screens
//       768: { perPage: 1, gap: '1rem' },   // 1 testimonial on small screens
//     },
//     // Customize arrow and pagination classes for potential custom styling
//     classes: {
//       arrows: 'splide__arrows custom-arrows',
//       arrow: 'splide__arrow custom-arrow transform transition duration-300 hover:scale-110', // Hover animation for arrows
//       prev: 'splide__arrow--prev custom-arrow--prev',
//       next: 'splide__arrow--next custom-arrow--next',
//       pagination: 'splide__pagination custom-pagination',
//       page: 'splide__pagination__page custom-pagination__page',
//     },
//   };

//   return (
//     <>
//       <Splide ref={splideRef} options={splideOptions} aria-label="Testimonials Carousel">
//         {testimonials.map(testimonial => (
//           <SplideSlide key={testimonial.id}>
//             {/* Individual Testimonial Card - with 'floating' like animations on hover */}
//             <div
//               className="testimonial-card bg-white p-8 rounded-lg shadow-lg flex flex-col items-center text-center h-full
//                          transform transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-2xl hover:-translate-y-2
//                          border border-gray-200 hover:border-blue-400"
//             >
//               <StarRating count={testimonial.stars} />
//               <p className="text-gray-700 italic mb-4 text-base">"{testimonial.quote}"</p>
//               <p className="font-semibold text-gray-800 text-lg">- {testimonial.author}</p>
//             </div>
//           </SplideSlide>
//         ))}
//       </Splide>

//       {/* Global CSS for custom animations and arrow styling (place this in your global CSS file, e.g., index.css or globals.css) */}
//       <style jsx global>{`
//         /* Keyframe animation for slide entrance */
//         @keyframes fade-in-down {
//           from {
//             opacity: 0;
//             transform: translateY(-20px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }

//         .animate-fade-in-down {
//           animation: fade-in-down 0.7s ease-out forwards;
//         }

//         /* Custom arrow styling - make sure these match your Splide arrow elements if default styling is not sufficient */
//         .splide__arrow svg {
//           fill: currentColor; /* Ensures SVG icons take on text color */
//           width: 1.5em; /* Adjust size */
//           height: 1.5em; /* Adjust size */
//         }

//         .splide__arrow {
//             opacity: 0.7; /* Make arrows slightly transparent */
//             background: rgba(255, 255, 255, 0.8); /* Slightly translucent background */
//             border-radius: 50%;
//         }

//         .splide__arrow:hover {
//             opacity: 1;
//             background: rgba(255, 255, 255, 1);
//         }

//         /* Optional: adjust pagination dots styling */
//         .splide__pagination__page {
//             background: #cbd5e0; /* Gray dots */
//             transition: background-color 0.3s ease;
//         }
//         .splide__pagination__page.is-active {
//             background: #3b82f6; /* Blue active dot */
//         }

//         /* Ensure card heights are consistent if needed for better alignment in carousel */
//         .testimonial-card {
//             min-height: 250px; /* Adjust as needed based on your content */
//             display: flex;
//             flex-direction: column;
//             justify-content: center;
//         }

//       `}</style>
//     </>
//   );
// };

// export default TestimonialCarousel;



// src/components/TestimonialCarousel.js
import React, { useRef, useState, useEffect, useCallback } from 'react';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css'; // Default Splide theme CSS
import { ArrowLeftCircleIcon, ArrowRightCircleIcon } from '@heroicons/react/24/solid'; // Assuming Heroicons

// Helper component to render stars
const StarRating = ({ count }) => {
  return (
    <div className="flex justify-center mb-4">
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          className={`w-5 h-5 ${i < count ? 'text-yellow-400' : 'text-gray-300'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.538 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.783.57-1.838-.197-1.538-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.381-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z"></path>
        </svg>
      ))}
    </div>
  );
};

const TestimonialCarousel = ({ testimonials }) => {
  const splideRef = useRef(null);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  const splideOptions = {
    type: 'loop',
    perPage: 3,
    perMove: 1,
    autoplay: true,
    interval: 4000,
    speed: 800,
    easing: 'ease-out',
    pauseOnHover: true,
    focus: 'center',
    gap: '2rem',
    arrows: false,
    pagination: false,
    breakpoints: {
      1024: {
        perPage: 3,
        gap: '2rem',
      },
      768: {
        perPage: 2,
        gap: '1.5rem',
      },
      640: {
        perPage: 1,
        gap: '1rem',
      },
    },
  };

  // Functions to control Splide manually (corrected to use .splide)
  const goToPrevSlide = useCallback(() => {
    if (splideRef.current && splideRef.current.splide) {
      splideRef.current.splide.go('<');
    }
  }, []);

  const goToNextSlide = useCallback(() => {
    if (splideRef.current && splideRef.current.splide) {
      splideRef.current.splide.go('>');
    }
  }, []);

  const goToSlide = useCallback((index) => {
    if (splideRef.current && splideRef.current.splide) {
      splideRef.current.splide.go(index);
    }
  }, []);

  // Effect to update currentSlideIndex when Splide moves (corrected to use .splide)
  useEffect(() => {
    const splideInstance = splideRef.current;
    if (splideInstance && splideInstance.splide) {
      // Set initial slide index
      setCurrentSlideIndex(splideInstance.splide.index);

      // Listen for 'moved' event to update the index
      splideInstance.splide.on('moved', (newIndex) => {
        setCurrentSlideIndex(newIndex);
      });
    }
    // Cleanup event listener when component unmounts
    return () => {
      if (splideInstance && splideInstance.splide) {
        splideInstance.splide.off('moved');
      }
    };
  }, []);

  const arrowIconWrapperClasses = 'flex items-center justify-center p-1 rounded-full transition-colors duration-200 hover:bg-white hover:bg-opacity-20 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-black'; // Changed focus ring to blue-500

  return (
    <div className="relative pb-24">
      <Splide ref={splideRef} options={splideOptions} aria-label="Testimonials Carousel">
        {testimonials.map(testimonial => (
          <SplideSlide key={testimonial.id}>
            <div
              className="testimonial-card p-8 rounded-2xl shadow-lg flex flex-col items-center text-center h-full
                         transform transition-all duration-300 ease-in-out
                         hover:scale-x-105 hover:shadow-2xl cursor-pointer"
              style={{
                background: 'rgba(255, 255, 255, 0.2)',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.3)',
              }}
            >
              <StarRating count={testimonial.stars} />
              <p className="text-gray-900 italic mb-4 text-base">"{testimonial.quote}"</p>
              <p className="font-semibold text-gray-900 text-lg">- {testimonial.author}</p>
            </div>
          </SplideSlide>
        ))}
      </Splide>

      {/* CUSTOM NAVIGATION CONTROLS - Now positioned in the bottom right */}
      <div className="absolute bottom-8 right-8 z-20 flex items-center space-x-2 md:space-x-3 p-1 bg-black bg-opacity-30 rounded-full backdrop-filter backdrop-blur-md shadow-lg">
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
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`relative w-2 h-2 rounded-full transition-all duration-300
                ${index === currentSlideIndex
                  ? 'bg-blue-500 scale-110 shadow-md shadow-blue-500/50'
                  : 'bg-gray-400 hover:bg-gray-200 opacity-70'}
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-black
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
};

export default TestimonialCarousel;