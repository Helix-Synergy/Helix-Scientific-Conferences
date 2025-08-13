

import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { blogsData } from '../data/blogsData';

// Reusable component for each individual blog card
const BlogPostCard = ({ post }) => {
  // Dynamically generate a placeholder image URL based on the blog title
  const imageUrl = `https://placehold.co/600x400/212121/E0E0E0?text=${encodeURIComponent(post.title)}`;

  return (
    <motion.div 
      className="col-lg-4 col-md-6 mb-8"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="group h-full flex flex-col bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 ease-in-out hover:shadow-xl">
        {/* Blog Image */}
        <Link to={post.link} className="block relative h-56 w-full overflow-hidden">
          <img
            src={imageUrl}
            alt={post.title}
            className="w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
          />
          {/* Subtle overlay on hover */}
          <div className="absolute inset-0 bg-black bg-opacity-20 transition-opacity duration-300 group-hover:bg-opacity-0"></div>
        </Link>

        {/* Blog Content */}
        <div className="flex-grow p-6 flex flex-col">
          <h4 className="text-2xl font-bold mb-2">
            <Link to={post.link} className="text-gray-900 transition-colors duration-300 hover:text-indigo-600">
              {post.title}
            </Link>
          </h4>
          
          {/* Summary */}
          <p className="text-sm text-gray-600 mb-4 flex-grow">
            {post.summary}
          </p>
          
          {/* Read More button */}
          <div className="mt-auto">
            <Link to={post.link} className="relative inline-flex items-center text-indigo-600 font-semibold group">
                <span className="text-base transition-colors duration-300 group-hover:text-indigo-800">Read More</span>
                <span className="ml-2 transform translate-x-0 transition-transform duration-300 group-hover:translate-x-1">
                    &rarr;
                </span>
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// Main Blog Page Component
const BlogPage = () => {
  return (
    <main>
      {/* Breadcrumb / Hero Section */}
      <section 
        className="relative py-32 md:py-48 flex items-center justify-center bg-cover bg-center text-white"
        style={{ backgroundImage: 'url(https://www.schooljotter.com/wp-content/uploads/2023/01/Create-A-School-Blog-1000x630-1.jpg)' }}
      >
        <div className="absolute inset-0 bg-black opacity-60"></div>
        <div className="relative z-10 text-center">
          <h2 className="text-4xl md:text-6xl font-extrabold drop-shadow-lg">
            BLOGS
          </h2>
        </div>
      </section>

      {/* Blog Posts Grid Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
            {blogsData.map(post => (
              <BlogPostCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default BlogPage;