import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const Committees = () => {
  const committeeMembers = [
    {
      id: 1,
      name: 'Dr. Alice Johnson',
      role: 'Chairperson',
      affiliation: 'University of Science',
      imageUrl: 'https://placehold.co/300x300/6A3F9B/FFFFFF?text=Alice+J',
      bio: 'Dr. Johnson is a renowned expert in theoretical physics with over 20 years of experience.',
    },
    {
      id: 2,
      name: 'Prof. Bob Williams',
      role: 'Program Committee',
      affiliation: 'Tech Innovations Inc.',
      imageUrl: 'https://placehold.co/300x300/2E659A/FFFFFF?text=Bob+W',
      bio: 'Prof. Williams leads cutting-edge research in AI and machine learning applications.',
    },
    {
      id: 3,
      name: 'Dr. Carol Davis',
      role: 'Organizing Committee',
      affiliation: 'Global Research Institute',
      imageUrl: 'https://placehold.co/300x300/9A2E65/FFFFFF?text=Carol+D',
      bio: 'Dr. Davis specializes in sustainable energy solutions and environmental policy.',
    },
    {
      id: 4,
      name: 'Mr. David Lee',
      role: 'Advisory Board',
      affiliation: 'Future Technologies Corp.',
      imageUrl: 'https://placehold.co/300x300/4A2868/FFFFFF?text=David+L',
      bio: 'Mr. Lee is a visionary leader in quantum computing and data security.',
    },
    {
      id: 5,
      name: 'Dr. Emily White',
      role: 'Review Committee',
      affiliation: 'BioTech Solutions',
      imageUrl: 'https://placehold.co/300x300/6A3F9B/FFFFFF?text=Emily+W',
      bio: 'Dr. White focuses on genetic engineering and its ethical implications.',
    },
    {
      id: 6,
      name: 'Prof. Frank Green',
      role: 'Logistics Coordinator',
      affiliation: 'Event Management Group',
      imageUrl: 'https://placehold.co/300x300/2E659A/FFFFFF?text=Frank+G',
      bio: 'Prof. Green ensures seamless execution of all conference operations.',
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
      {/* Background: Grid of Subtle, Animated Squares */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div
          className="absolute inset-0 bg-[length:100px_100px] opacity-20"
          style={{
            backgroundImage: `repeating-linear-gradient(0deg, #4A2868 0, #4A2868 1px, transparent 1px, transparent 100px),
                              repeating-linear-gradient(90deg, #2E659A 0, #2E659A 1px, transparent 1px, transparent 100px)`,
            animation: 'grid-fade 10s infinite alternate',
          }}
        ></div>
        <div className="absolute inset-0 bg-black opacity-40"></div> {/* Dark overlay */}
      </div>

      <div className="container mx-auto relative z-10">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-12 animate-fade-in-up">
          Our Esteemed Committees
        </h1>

        <p className="text-lg text-center mb-10 max-w-3xl mx-auto">
          Our conferences are shaped by the dedication and expertise of our committee members,
          who ensure the highest standards of scientific rigor and event organization.
        </p>

        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {committeeMembers.map((member, index) => (
            <motion.div
              key={member.id}
              className="bg-gray-800 rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 group
                         perspective-[1000px] hover:shadow-2xl"
              variants={cardVariants}
              initial="hidden"
              animate={controls}
              custom={index}
            >
              <div className="relative w-full h-auto [transform-style:preserve-3d] group-hover:rotate-y-180 transition-transform duration-700">
                {/* Front of the card */}
                <div className="absolute w-full h-full backface-hidden">
                  <img
                    src={member.imageUrl}
                    alt={member.name}
                    loading="lazy"
                    className="w-full h-64 object-cover object-center"
                  />
                  <div className="p-6 text-center">
                    <h3 className="text-xl font-semibold mb-1 text-white">{member.name}</h3>
                    <p className="text-blue-300 text-md font-medium">{member.role}</p>
                    <p className="text-gray-400 text-sm mt-1">{member.affiliation}</p>
                  </div>
                </div>

                {/* Back of the card (hidden by default) */}
                <div className="absolute w-full h-full backface-hidden rotate-y-180 bg-gray-700 p-6 flex flex-col justify-center items-center text-center">
                  <h3 className="text-xl font-semibold mb-2 text-white">{member.name}</h3>
                  <p className="text-gray-300 text-sm leading-relaxed">{member.bio}</p>
                  <p className="text-xs text-gray-400 mt-4">Click to flip back</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Committees;