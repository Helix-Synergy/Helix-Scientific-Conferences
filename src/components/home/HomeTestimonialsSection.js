// src/components/home/HomeTestimonialsSection.js
import React from 'react';
import { Link } from 'react-router-dom';
import TestimonialCarousel from '../../components/TestimonialCarousel'; // Import the carousel component

// Placeholder data for testimonials on the home page
const homeTestimonials = [
  {
    id: 1,
    quote: "For six years, Helix Conference LLC has hosted expertly curated events on diverse topics, offering valuable insights. I look forward to more enriching experiences.",
    author: "Samantha Reynolds",
    stars: 5,
  },
  {
    id: 2,
    quote: "I was impressed by the professionalism and diverse topics at the Helix Conference LLC event. It was an insightful experience, and I look forward to more.",
    author: "Sarah Johnson",
    stars: 5,
  },
  {
    id: 3,
    quote: "For six years, Helix Conference LLC has hosted expertly curated events on diverse topics, offering valuable insights. I look forward to more enriching experiences.",
    author: "Samantha Reynolds",
    stars: 5,
  },
   {
    id: 4,
    quote: "Helix provides an excellent platform for scientific exchange and networking. The insights gained were invaluable.",
    author: "Dr. Alex Lee",
    stars: 4,
  },
  {
    id: 5,
    quote: "The quality of speakers and topics at Helix conferences is consistently high. A truly enriching experience.",
    author: "Maria Garcia",
    stars: 5,
  },
  {
    id: 6,
    quote: "A must-attend for anyone in the field. The organization and content are top-notch year after year.",
    author: "James Peterson",
    stars: 5,
  },
];


const HomeTestimonialsSection = () => {
  return (
    // Applied the linear gradient background here and removed bg-gray-50
    <section
      className="py-16 md:py-24 overflow-hidden" // Removed bg-gray-50
      style={{
        background: 'linear-gradient(to right, #4A2868, #2E659A)', // Applied the gradient
      }}
    >
      <div className="container mx-auto px-4">
        <div className="text-center md:text-left max-w-4xl mx-auto mb-12 text-white"> {/* Added text-white for readability */}
          <h2 className="text-4xl md:text-5xl font-bold mb-4"> {/* Removed text-gray-900, will inherit white */}
            What People Speak About <span className="text-blue-300">Helix</span> {/* Adjusted text-blue-600 to text-blue-300 for better contrast on dark bg */}
          </h2>
          <p className="text-lg"> {/* Removed text-gray-700, will inherit white */}
            Helix Conferences are known for their focus on cutting-edge topics and global collaboration.
            Explore themes like AI, robotics, IoT, and digital transformation, with discussions on their
            societal and ethical impacts.
          </p>
        </div>

        {/* This is where the interactive carousel will be displayed */}
        <div className="mb-12">
          <TestimonialCarousel testimonials={homeTestimonials} />
        </div>

        <div className="text-center mt-8">
          <Link to="/testimonials">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full text-lg transition duration-300 ease-in-out transform hover:scale-105">
              View All Testimonials
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HomeTestimonialsSection;