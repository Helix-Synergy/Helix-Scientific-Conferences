// src/components/TestimonialCarousel.js
import React, { useRef, useState, useEffect, useCallback } from 'react';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css'; // Default Splide theme CSS
import { ArrowLeftCircleIcon, ArrowRightCircleIcon } from '@heroicons/react/24/solid';
import { StarIcon } from '@heroicons/react/24/solid';

// Helper component to render stars with a numerical rating, now on a single line
const StarRating = ({ rating }) => {
    const roundedRating = Math.round(rating * 2) / 2;
    const fullStars = Math.floor(roundedRating);
    const hasHalfStar = roundedRating % 1 !== 0;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return (
        // Adjusted to a flex row for the single-line layout
        <div className="flex items-center space-x-1"> 
            <span className="text-sm font-medium text-white">Rating:</span>
            <div className="flex text-yellow-400">
                {[...Array(fullStars)].map((_, i) => (
                    <StarIcon key={`full-${i}`} className="w-4 h-4 md:w-5 md:h-5" />
                ))}
                {hasHalfStar && <StarIcon className="w-4 h-4 md:w-5 md:h-5" style={{ clipPath: 'inset(0 50% 0 0)' }} />}
                {[...Array(emptyStars)].map((_, i) => (
                    <StarIcon key={`empty-${i}`} className="w-4 h-4 md:w-5 md:h-5 text-gray-400" />
                ))}
            </div>
            <span className="text-lg font-bold text-white">{rating}/5</span>
        </div>
    );
};

const TestimonialCarousel = ({ testimonials }) => {
    const splideRef = useRef(null);
    const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

    const splideOptions = {
        type: 'loop',
        perPage: 1,
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
            1024: { perPage: 1 },
            768: { perPage: 1 },
            640: { perPage: 1 },
        },
    };

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

    useEffect(() => {
        const splideInstance = splideRef.current;
        if (splideInstance && splideInstance.splide) {
            setCurrentSlideIndex(splideInstance.splide.index);
            splideInstance.splide.on('moved', (newIndex) => {
                setCurrentSlideIndex(newIndex);
            });
        }
        return () => {
            if (splideInstance && splideInstance.splide) {
                splideInstance.splide.off('moved');
            }
        };
    }, []);

    const arrowIconWrapperClasses = 'flex items-center justify-center p-1 rounded-full transition-colors duration-200 hover:bg-white hover:bg-opacity-20 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-black';

    return (
        // Adjusted the max width to 90% as requested
        <div className="relative w-[full] max-w-[90%] mx-auto pb-24">
            <Splide ref={splideRef} options={splideOptions} aria-label="Testimonials Carousel">
                {testimonials.map(testimonial => (
                    <SplideSlide key={testimonial.id}>
                        <div
                            className="testimonial-card p-8 rounded-2xl shadow-lg flex flex-col justify-between h-[300px] transform transition-all duration-300 ease-in-out  hover:shadow-2xl cursor-interactive"
                            style={{
                                background: 'rgba(255, 255, 255, 0.2)',
                                backdropFilter: 'blur(10px)',
                                WebkitBackdropFilter: 'blur(10px)',
                                border: '1px solid rgba(255, 255, 255, 0.3)',
                            }}
                        >
                            {/* Testimonial Quote */}
                            <p className="text-white italic mb-4 text-xl">"{testimonial.quote}"</p>

                            {/* Author and Rating Section - Adjusted to display as requested */}
                            <div className="flex flex-col items-end text-right mt-auto">
                                <p className="font-semibold text-white text-lg">- {testimonial.author}</p>
                                <p className="text-sm font-normal text-gray-300">{testimonial.role}</p>
                                <div className="mt-2">
                                    <StarRating rating={testimonial.rating} />
                                </div>
                            </div>
                        </div>
                    </SplideSlide>
                ))}
            </Splide>

            {/* CUSTOM NAVIGATION CONTROLS */}
            <div className="absolute bottom-8 right-8 z-20 flex items-center space-x-2 md:space-x-3 p-1 bg-black bg-opacity-30 rounded-full backdrop-filter backdrop-blur-md shadow-lg">
                <button
                    onClick={goToPrevSlide}
                    className={`${arrowIconWrapperClasses}`}
                    aria-label="Previous slide"
                >
                    <ArrowLeftCircleIcon className="h-5 w-5 text-white" />
                </button>

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