import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { BookOpenIcon, } from '@heroicons/react/24/outline'; // Example icons
import { Link } from 'react-router-dom';

const Journals = () => {
  const journalCovers = [
    { id: 1, title: 'Journal of Advanced AI', imageUrl: 'https://placehold.co/400x550/2E659A/FFFFFF?text=AI+Journal', link: '#' },
    { id: 2, title: 'Sustainable Science Review', imageUrl: 'https://placehold.co/400x550/4A2868/FFFFFF?text=Sustainability', link: '#' },
    { id: 3, title: 'Frontiers in Biomedical Research', imageUrl: 'https://placehold.co/400x550/9A2E65/FFFFFF?text=Biomedical', link: '#' },
    { id: 4, title: 'Innovations in Quantum Computing', imageUrl: 'https://placehold.co/400x550/6A3F9B/FFFFFF?text=Quantum+Comp', link: '#' },
    { id: 5, title: 'Environmental Policy Insights', imageUrl: 'https://placehold.co/400x550/2E659A/FFFFFF?text=Environmental', link: '#' },
    { id: 6, title: 'Robotics and Automation Quarterly', imageUrl: 'https://placehold.co/400x550/4A2868/FFFFFF?text=Robotics', link: '#' },
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

  const coverVariants = {
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
      {/* Background: Abstract, Flowing Lines Animation */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: 'linear-gradient(45deg, #4A2868 25%, transparent 25%, transparent 50%, #2E659A 50%, #2E659A 75%, transparent 75%, transparent 100%)',
          backgroundSize: '200% 200%',
          animation: 'abstract-lines 25s linear infinite',
          opacity: 0.3,
        }}
      >
        <div className="absolute inset-0 bg-black opacity-40"></div> {/* Dark overlay */}
      </div>

      <div className="container mx-auto relative z-10">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-12 animate-fade-in-up">
          Our Academic Journals
        </h1>

        <p className="text-lg text-center mb-10 max-w-3xl mx-auto">
          Explore our collection of peer-reviewed journals, featuring cutting-edge research
          and insightful articles across various scientific disciplines.
        </p>

        <div ref={ref} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {journalCovers.map((journal, index) => (
            <motion.div
              key={journal.id}
              className="bg-gray-800 rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 group
                         perspective-[1000px] hover:shadow-2xl"
              variants={coverVariants}
              initial="hidden"
              animate={controls}
              custom={index}
            >
              <div className="relative w-full h-auto [transform-style:preserve-3d] group-hover:rotate-y-10 transition-transform duration-500">
                {/* Front of the journal cover */}
                <div className="absolute w-full h-full backface-hidden">
                  <img
                    src={journal.imageUrl}
                    alt={journal.title}
                    className="w-full h-80 object-cover object-center"
                  />
                  <div className="p-4 text-center">
                    <h3 className="text-xl font-semibold mb-2 text-white">{journal.title}</h3>
                    <a
                      href={journal.link}
                      className="inline-block bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md text-sm font-medium transition-colors duration-300"
                    >
                      View Journal
                    </a>
                  </div>
                </div>

                {/* Back of the journal cover (simple text overlay) */}
                <div className="absolute w-full h-full backface-hidden rotate-y-180 bg-gray-700 p-6 flex flex-col justify-center items-center text-center">
                  <BookOpenIcon className="w-12 h-12 text-purple-300 mb-4" />
                  <p className="text-gray-200 text-md leading-relaxed">
                    Dive deeper into the latest research in {journal.title}.
                  </p>
                  <p className="text-xs text-gray-400 mt-4">Click to flip back</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <p className="text-xl font-semibold mb-4">
            Interested in publishing your research with us?
          </p>
          <Link
            to="/call-for-papers"
            className="inline-block bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform active:scale-95"
          >
            Submit Your Manuscript
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default Journals;