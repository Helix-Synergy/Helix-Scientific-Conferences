import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { StarIcon } from '@heroicons/react/24/solid'; // For rating stars

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      quote: "Helix Conferences consistently delivers high-quality events with insightful content and unparalleled networking opportunities. A must-attend for anyone in the scientific community!",
      author: "Dr. Lena Khan",
      role: "Lead Researcher, BioGen Corp.",
      rating: 5,
      imageUrl: "https://placehold.co/100x100/2E659A/FFFFFF?text=LK",
    },
    {
      id: 2,
      quote: "The hybrid format of Helix Conferences is a game-changer. I could participate from anywhere and still feel fully engaged with the live sessions and discussions.",
      author: "Prof. Marcus Bell",
      role: "University Professor",
      rating: 5,
      imageUrl: "https://placehold.co/100x100/4A2868/FFFFFF?text=MB",
    },
    {
      id: 3,
      quote: "The diverse range of topics and the caliber of speakers at Helix events are truly impressive. I always leave feeling inspired and with new ideas.",
      author: "Ms. Sarah Chen",
      role: "Innovation Manager, Tech Solutions",
      rating: 4,
      imageUrl: "https://placehold.co/100x100/9A2E65/FFFFFF?text=SC",
    },
    {
      id: 4,
      quote: "As a young researcher, attending a Helix Conference was invaluable. The feedback on my poster presentation and the connections I made were incredibly supportive.",
      author: "Mr. Alex Green",
      role: "Ph.D. Candidate",
      rating: 5,
      imageUrl: "https://placehold.co/100x100/6A3F9B/FFFFFF?text=AG",
    },
  ];

  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  const testimonialVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: "easeOut",
      },
    },
  };

  return (
    <div className="min-h-screen relative overflow-hidden text-white py-20 px-4 bg-gray-900">
      {/* Background: Soft, Swirling Nebula Effect */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: 'radial-gradient(circle at center, rgba(74, 40, 104, 0.6), rgba(46, 101, 154, 0.6), rgba(154, 46, 101, 0.6))',
          backgroundSize: '300% 300%',
          animation: 'swirl-bg 40s linear infinite',
        }}
      >
        <div className="absolute inset-0 bg-black opacity-40"></div> {/* Dark overlay */}
      </div>

      <div className="container mx-auto relative z-10">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-12 animate-fade-in-up">
          What Our Attendees Say
        </h1>

        <p className="text-lg text-center mb-10 max-w-3xl mx-auto">
          Hear directly from participants about their experiences at Helix Conferences.
          Their satisfaction is our greatest reward.
        </p>

        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              className="bg-gray-800/70 p-8 rounded-xl shadow-lg backdrop-blur-sm border border-white/10 transform transition-all duration-300 hover:scale-[1.01] group"
              variants={testimonialVariants}
              initial="hidden"
              animate={controls}
              custom={index}
            >
              <div className="flex items-start mb-6">
                <img
                  src={testimonial.imageUrl}
                  alt={testimonial.author}
                  className="w-16 h-16 rounded-full object-cover mr-4 border-2 border-blue-400 flex-shrink-0"
                />
                <div>
                  <h3 className="text-xl font-semibold text-white">{testimonial.author}</h3>
                  <p className="text-gray-400 text-sm">{testimonial.role}</p>
                  <div className="flex mt-1">
                    {[...Array(5)].map((_, i) => (
                      <StarIcon
                        key={i}
                        className={`w-5 h-5 ${i < testimonial.rating ? 'text-yellow-400' : 'text-gray-500'} transition-colors duration-200`}
                      />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-lg italic text-gray-200 leading-relaxed relative">
                <span className="absolute -top-4 -left-4 text-6xl text-blue-500 opacity-20 transform rotate-180">“</span>
                {testimonial.quote}
                <span className="absolute -bottom-4 -right-4 text-6xl text-blue-500 opacity-20">”</span>
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;