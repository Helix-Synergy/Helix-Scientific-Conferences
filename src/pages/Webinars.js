import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { PlayCircleIcon, CalendarDaysIcon } from '@heroicons/react/24/outline'; // Example icons

const Webinars = () => {
  const webinars = [
    {
      id: 1,
      title: 'Mastering Machine Learning Algorithms',
      date: 'August 10, 2025',
      speaker: 'Dr. Anya Sharma',
      thumbnail: 'https://placehold.co/600x350/2E659A/FFFFFF?text=ML+Webinar',
      link: '#',
    },
    {
      id: 2,
      title: 'Sustainable Energy Solutions for Cities',
      date: 'September 5, 2025',
      speaker: 'Dr. Chloe Dubois',
      thumbnail: 'https://placehold.co/600x350/4A2868/FFFFFF?text=Energy+Webinar',
      link: '#',
    },
    {
      id: 3,
      title: 'Introduction to Quantum Cryptography',
      date: 'October 2, 2025',
      speaker: 'Prof. Liam Chen',
      thumbnail: 'https://placehold.co/600x350/9A2E65/FFFFFF?text=Quantum+Webinar',
      link: '#',
    },
    {
      id: 4,
      title: 'Biomedical Imaging Techniques',
      date: 'November 15, 2025',
      speaker: 'Dr. Sofia Rodriguez',
      thumbnail: 'https://placehold.co/600x350/6A3F9B/FFFFFF?text=Imaging+Webinar',
      link: '#',
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

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <div className="min-h-screen relative overflow-hidden text-white py-20 px-4 bg-gray-900">
      {/* Background: Digital Circuit Board Animation */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: 'linear-gradient(45deg, #1a0033 0%, #000000 100%)',
          backgroundImage: `url(https://www.transparenttextures.com/patterns/digital-circuit.png)`,
          backgroundSize: '200% 200%',
          animation: 'digital-flow 30s linear infinite',
          opacity: 0.4,
        }}
      >
        <div className="absolute inset-0 bg-black opacity-40"></div> {/* Dark overlay */}
      </div>

      <div className="container mx-auto relative z-10">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-12 animate-fade-in-up">
          Our Upcoming Webinars
        </h1>

        <p className="text-lg text-center mb-10 max-w-3xl mx-auto">
          Join our expert-led webinars to gain valuable insights and stay updated
          on the latest trends and research in your field.
        </p>

        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {webinars.map((webinar, index) => (
            <motion.div
              key={webinar.id}
              className="bg-gray-800 rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-[1.02] group"
              variants={cardVariants}
              initial="hidden"
              animate={controls}
              custom={index}
            >
              <div className="relative h-56 overflow-hidden">
                <img
                  src={webinar.thumbnail}
                  alt={webinar.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <PlayCircleIcon className="w-16 h-16 text-white opacity-80 group-hover:opacity-100 transform transition-transform duration-300 group-hover:scale-110" />
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 text-white group-hover:text-blue-300 transition-colors duration-300">
                  {webinar.title}
                </h3>
                <p className="flex items-center text-gray-300 text-sm mb-2">
                  <CalendarDaysIcon className="w-4 h-4 mr-2 text-blue-300" />
                  {webinar.date}
                </p>
                <p className="text-gray-400 text-sm mb-4">Speaker: {webinar.speaker}</p>
                <a
                  href={webinar.link}
                  className="inline-block bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-md text-sm font-medium transition-colors duration-300"
                >
                  Register Now
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Webinars;