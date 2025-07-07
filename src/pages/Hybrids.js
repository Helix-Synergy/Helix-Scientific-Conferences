import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import { GlobeAltIcon, ComputerDesktopIcon, AdjustmentsHorizontalIcon } from '@heroicons/react/24/outline';

const Hybrids = () => {
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

  const featureVariants = {
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
      {/* Background: Blending of two animated patterns */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: 'linear-gradient(45deg, #4A2868, #2E659A, #4A2868, #2E659A)',
          backgroundSize: '400% 400%',
          animation: 'hybrid-blend 20s ease-in-out infinite alternate',
        }}
      >
        <div className="absolute inset-0 bg-black opacity-40"></div> {/* Dark overlay */}
      </div>

      <div className="container mx-auto relative z-10">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-12 animate-fade-in-up">
          Hybrid Conferences
        </h1>

        <p className="text-lg text-center mb-10 max-w-3xl mx-auto">
          Experience the best of both worlds with our hybrid conferences, seamlessly blending
          in-person and virtual participation to maximize reach and engagement.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <motion.div
            ref={ref}
            initial="hidden"
            animate={controls}
            variants={featureVariants}
            className="bg-gray-800/70 p-8 rounded-xl shadow-lg backdrop-blur-sm border border-white/10 group"
          >
            <div className="flex items-center mb-6">
              <GlobeAltIcon className="w-10 h-10 text-blue-400 mr-4 transform transition-transform duration-300 group-hover:scale-110" />
              <h2 className="text-2xl font-semibold">In-Person Experience</h2>
            </div>
            <p className="text-gray-300 leading-relaxed mb-6">
              Participate live at our state-of-the-art venues, network face-to-face with peers,
              and immerse yourself in the vibrant atmosphere of our physical events. Enjoy
              interactive sessions, dedicated exhibition areas, and social gatherings.
            </p>
            <motion.img
              src="https://placehold.co/600x400/6A3F9B/FFFFFF?text=In-Person+Experience"
              alt="In-Person Experience"
              className="w-full h-auto rounded-lg shadow-md transform transition-transform duration-300 group-hover:scale-105"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.8 }}
            />
          </motion.div>

          <motion.div
            ref={ref}
            initial="hidden"
            animate={controls}
            variants={featureVariants}
            className="bg-gray-800/70 p-8 rounded-xl shadow-lg backdrop-blur-sm border border-white/10 group"
          >
            <div className="flex items-center mb-6">
              <ComputerDesktopIcon className="w-10 h-10 text-green-400 mr-4 transform transition-transform duration-300 group-hover:scale-110" />
              <h2 className="text-2xl font-semibold">Virtual Accessibility</h2>
            </div>
            <p className="text-gray-300 leading-relaxed mb-6">
              Join from anywhere in the world with our robust virtual platform. Access live streams,
              on-demand content, virtual networking tools, and interactive Q&A sessions.
              Our virtual experience is designed to be as engaging as being there in person.
            </p>
            <motion.img
              src="https://placehold.co/600x400/2E659A/FFFFFF?text=Virtual+Accessibility"
              alt="Virtual Accessibility"
              className="w-full h-auto rounded-lg shadow-md transform transition-transform duration-300 group-hover:scale-105"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.8 }}
            />
          </motion.div>
        </div>

        <motion.div
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={featureVariants}
          className="mt-12 bg-gray-800/70 p-8 rounded-xl shadow-lg backdrop-blur-sm border border-white/10 text-center group"
        >
          <AdjustmentsHorizontalIcon className="w-12 h-12 text-purple-400 mx-auto mb-6 transform transition-transform duration-300 group-hover:rotate-12" />
          <h2 className="text-3xl font-semibold mb-4">Seamless Integration</h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Our hybrid model ensures a cohesive experience for all attendees, regardless of their mode of participation.
            Cutting-edge technology facilitates smooth interactions between in-person and virtual audiences.
          </p>
          <Link
            to="/buy-a-ticket"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full mt-8 transition-all duration-300 shadow-lg hover:shadow-xl transform active:scale-95"
          >
            Register for a Hybrid Event
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default Hybrids;