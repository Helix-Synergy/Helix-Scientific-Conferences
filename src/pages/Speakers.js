import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { AcademicCapIcon, BriefcaseIcon } from '@heroicons/react/24/outline'; // Example icons

const Speakers = () => {
  const speakers = [
    {
      id: 1,
      name: 'Dr. Anya Sharma',
      title: 'AI Ethics Researcher',
      affiliation: 'FutureTech Institute',
      imageUrl: 'https://placehold.co/300x300/2E659A/FFFFFF?text=Anya+S',
      bio: 'Specializing in the ethical implications and societal impact of artificial intelligence.',
    },
    {
      id: 2,
      name: 'Prof. Liam Chen',
      title: 'Quantum Computing Pioneer',
      affiliation: 'Quantum Innovations Lab',
      imageUrl: 'https://placehold.co/300x300/4A2868/FFFFFF?text=Liam+C',
      bio: 'Leading research in quantum algorithms and their applications in cryptography.',
    },
    {
      id: 3,
      name: 'Dr. Sofia Rodriguez',
      title: 'Biotechnology Expert',
      affiliation: 'Genomic Solutions Inc.',
      imageUrl: 'https://placehold.co/300x300/9A2E65/FFFFFF?text=Sofia+R',
      bio: 'Known for her groundbreaking work in CRISPR gene-editing technologies.',
    },
    {
      id: 4,
      name: 'Mr. Kenji Tanaka',
      title: 'Robotics Engineer',
      affiliation: 'Automated Systems Corp.',
      imageUrl: 'https://placehold.co/300x300/6A3F9B/FFFFFF?text=Kenji+T',
      bio: 'Develops advanced humanoid robotics for industrial and healthcare applications.',
    },
    {
      id: 5,
      name: 'Dr. Chloe Dubois',
      title: 'Environmental Scientist',
      affiliation: 'Green Earth Foundation',
      imageUrl: 'https://placehold.co/300x300/2E659A/FFFFFF?text=Chloe+D',
      bio: 'Focuses on sustainable urban development and climate change mitigation strategies.',
    },
    {
      id: 6,
      name: 'Prof. Omar Hassan',
      title: 'Data Science Lead',
      affiliation: 'Data Insights Group',
      imageUrl: 'https://placehold.co/300x300/4A2868/FFFFFF?text=Omar+H',
      bio: 'Expert in big data analytics and predictive modeling for complex systems.',
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
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.7,
        ease: "easeOut",
      },
    },
  };

  return (
    <div className="min-h-screen relative overflow-hidden text-white py-20 px-4 bg-gray-900">
      {/* Background: Spotlight Effect */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: 'radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(74, 40, 104, 0.3) 0%, transparent 50%)',
          animation: 'spotlight-move 20s linear infinite', // Animates a large spotlight
          backgroundSize: '200% 200%', // Makes the gradient larger than the screen
        }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div> {/* Dark overlay */}
      </div>

      <div className="container mx-auto relative z-10">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-12 animate-fade-in-up">
          Our Distinguished Speakers
        </h1>

        <p className="text-lg text-center mb-10 max-w-3xl mx-auto">
          Meet the brilliant minds who will be sharing their insights and expertise
          at our upcoming conferences.
        </p>

        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {speakers.map((speaker, index) => (
            <motion.div
              key={speaker.id}
              className="bg-gray-800 rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-[1.03] group relative cursor-interactive"
              variants={cardVariants}
              initial="hidden"
              animate={controls}
              custom={index}
            >
              {/* Subtle glow on hover */}
              <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                   style={{ background: 'radial-gradient(circle at center, rgba(106, 63, 155, 0.3) 0%, transparent 70%)' }}></div>

              <div className="relative p-6 flex flex-col items-center text-center">
                <div className="w-32 h-32 rounded-full overflow-hidden mb-4 border-4 border-blue-400 group-hover:border-purple-400 transition-colors duration-300">
                  <img
                    src={speaker.imageUrl}
                    alt={speaker.name}
                    loading="lazy"
                    className="w-full h-full object-cover object-center transform transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
                <h3 className="text-2xl font-semibold mb-1 text-white">{speaker.name}</h3>
                <p className="text-blue-300 text-md font-medium">{speaker.title}</p>
                <p className="text-gray-400 text-sm mt-1 flex items-center">
                  <BriefcaseIcon className="w-4 h-4 mr-1" /> {speaker.affiliation}
                </p>
                <p className="text-gray-300 text-sm mt-4 leading-relaxed">{speaker.bio}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Speakers;