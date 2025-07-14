import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const Blog = () => {
  const blogPosts = [
    {
      id: 1,
      title: 'The Future of AI in Healthcare',
      date: 'July 1, 2025',
      excerpt: 'Exploring how artificial intelligence is revolutionizing diagnostics, treatment, and patient care.',
      imageUrl: 'https://placehold.co/600x400/9A2E65/FFFFFF?text=AI+Healthcare',
      link: '#',
    },
    {
      id: 2,
      title: 'Sustainable Practices in Research Labs',
      date: 'June 20, 2025',
      excerpt: 'Innovations and strategies for making scientific research more environmentally friendly.',
      imageUrl: 'https://placehold.co/600x400/2E659A/FFFFFF?text=Sustainable+Research',
      link: '#',
    },
    {
      id: 3,
      title: 'Quantum Computing: A New Era',
      date: 'June 5, 2025',
      excerpt: 'Understanding the basics and potential impact of quantum computing on various industries.',
      imageUrl: 'https://placehold.co/600x400/4A2868/FFFFFF?text=Quantum+Computing',
      link: '#',
    },
    {
      id: 4,
      title: 'The Role of Big Data in Climate Science',
      date: 'May 28, 2025',
      excerpt: 'How massive datasets are helping us understand and combat climate change.',
      imageUrl: 'https://placehold.co/600x400/6A3F9B/FFFFFF?text=Big+Data+Climate',
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
    <div className="min-h-screen relative overflow-hidden text-white py-20 px-4">
      {/* Background: Animated Gradient */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: 'linear-gradient(270deg, #4A2868, #2E659A, #9A2E65)',
          backgroundSize: '400% 400%',
          animation: 'animated-gradient 15s ease infinite alternate',
        }}
      >
        <div className="absolute inset-0 bg-black opacity-40"></div> {/* Dark overlay */}
      </div>

      <div className="container mx-auto relative z-10">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-12 animate-fade-in-up">
          Our Latest Blogs
        </h1>

        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {blogPosts.map((post, index) => (
            <motion.div
              key={post.id}
              className="bg-gray-800 rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl group cursor-interactive"
              variants={cardVariants}
              initial="hidden"
              animate={controls}
              custom={index} // Pass index for staggered animation if desired
            >
              <div className="relative overflow-hidden">
                <img
                  src={post.imageUrl}
                  alt={post.title}
                  className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105 cursor-interactive"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 text-white group-hover:text-blue-300 transition-colors duration-300 cursor-interactive">
                  {post.title}
                </h3>
                <p className="text-gray-400 text-sm mb-3">{post.date}</p>
                <p className="text-gray-300 mb-4">{post.excerpt}</p>
                <a
                  href={post.link}
                  className="inline-block bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md text-sm font-medium transition-colors duration-300 cursor-interactive"
                >
                  Read More
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;