import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { SparklesIcon, CalendarDaysIcon } from '@heroicons/react/24/outline'; // Example icons
import { Link } from 'react-router-dom';

const CallForPapers = () => {
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

  const sectionVariants = {
    hidden: { opacity: 0, x: -100 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.7,
        ease: "easeOut",
      },
    },
  };

  const iconVariants = {
    hover: { rotate: 360, transition: { duration: 0.5 } },
  };

  return (
    <div className="min-h-screen relative overflow-hidden text-white py-20 px-4 bg-gray-900">
      {/* Background: Gentle, Flowing Wave Animation */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: 'linear-gradient(90deg, #4A2868, #2E659A, #4A2868)',
          backgroundSize: '200% 100%',
          animation: 'wave-flow 20s linear infinite',
        }}
      >
        <div className="absolute inset-0 bg-black opacity-40"></div> {/* Dark overlay */}
      </div>

      <div className="container mx-auto relative z-10">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-12 animate-fade-in-up">
          Call For Papers
        </h1>

        <p className="text-lg text-center mb-10 max-w-3xl mx-auto">
          We invite researchers, academics, and industry experts to submit their original work
          for presentation at our upcoming conferences. Your contributions are vital to advancing
          knowledge and fostering innovation.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <motion.div
            ref={ref}
            initial="hidden"
            animate={controls}
            variants={sectionVariants}
            className="bg-gray-800/70 p-8 rounded-xl shadow-lg backdrop-blur-sm border border-white/10"
          >
            <div className="flex items-center mb-6">
              <motion.div
                className="p-4 rounded-full bg-blue-600 text-white mr-4 shadow-md"
                whileHover="hover"
                variants={iconVariants}
              >
                <SparklesIcon className="w-8 h-8" />
              </motion.div>
              <h2 className="text-2xl font-semibold">Submission Guidelines</h2>
            </div>
            <ul className="list-disc list-inside space-y-3 text-gray-300">
              <li>Abstracts should be between 250-300 words.</li>
              <li>Full papers should not exceed 10 pages (including references).</li>
              <li>Submissions must be original and not previously published.</li>
              <li>Please use our provided template for formatting.</li>
              <li>All submissions will undergo a rigorous peer-review process.</li>
            </ul>
            <motion.img
              src="https://placehold.co/400x300/4A2868/FFFFFF?text=Submission+Guidelines"
              alt="Submission Guidelines"
              className="w-full h-auto rounded-lg mt-8 shadow-md transform transition-transform duration-300 hover:scale-105"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.8 }}
            />
          </motion.div>

          <motion.div
            ref={ref}
            initial="hidden"
            animate={controls}
            variants={{ ...sectionVariants, x: 100 }} // Slide in from right for second column
            className="bg-gray-800/70 p-8 rounded-xl shadow-lg backdrop-blur-sm border border-white/10"
          >
            <div className="flex items-center mb-6">
              <motion.div
                className="p-4 rounded-full bg-green-600 text-white mr-4 shadow-md"
                whileHover="hover"
                variants={iconVariants}
              >
                <CalendarDaysIcon className="w-8 h-8" />
              </motion.div>
              <h2 className="text-2xl font-semibold">Important Dates</h2>
            </div>
            <ul className="list-disc list-inside space-y-3 text-gray-300">
              <li>Abstract Submission Deadline: <span className="font-bold text-white">August 15, 2025</span></li>
              <li>Notification of Acceptance: <span className="font-bold text-white">September 30, 2025</span></li>
              <li>Early Bird Registration Deadline: <span className="font-bold text-white">October 20, 2025</span></li>
              <li>Full Paper Submission Deadline: <span className="font-bold text-white">November 10, 2025</span></li>
              <li>Conference Dates: <span className="font-bold text-white">December 5-7, 2025</span></li>
            </ul>
            <motion.img
              src="https://placehold.co/400x300/2E659A/FFFFFF?text=Important+Dates"
              alt="Important Dates"
              className="w-full h-auto rounded-lg mt-8 shadow-md transform transition-transform duration-300 hover:scale-105"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.8 }}
            />
          </motion.div>
        </div>

        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          <Link
            to="/contact"
            className="inline-block bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-8 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform active:scale-95"
          >
            Submit Your Paper
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default CallForPapers;