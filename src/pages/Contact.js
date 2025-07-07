import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PhoneIcon, EnvelopeIcon, MapPinIcon } from '@heroicons/react/24/outline';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState(''); // 'success', 'error', 'submitting'

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting');
    // Simulate API call
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      console.log('Form submitted:', formData);
      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' }); // Clear form
    } catch (error) {
      console.error('Form submission error:', error);
      setStatus('error');
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden text-white py-20 px-4 bg-gray-900">
      {/* Background: Interactive Mouse-Hover Spotlight/Ripple */}
      {/* This effect is typically done with JavaScript directly on mouse events,
          so it's not a simple Tailwind class. For demonstration, we'll use a static
          subtle background and note the interactive potential. */}
      <div
        className="absolute inset-0 z-0 bg-gradient-to-br from-gray-800 to-gray-900"
        // You would add JS for mousemove events here to create dynamic effects
      >
        <div className="absolute inset-0 bg-black opacity-30"></div> {/* Dark overlay */}
      </div>

      <div className="container mx-auto relative z-10">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-12 animate-fade-in-up">
          Get In Touch
        </h1>

        <p className="text-lg text-center mb-10 max-w-3xl mx-auto">
          Have questions, suggestions, or need assistance? Reach out to us through the form below or
          using our contact details. We're here to help!
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 bg-gray-800/70 p-8 rounded-xl shadow-lg backdrop-blur-sm border border-white/10">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h2 className="text-3xl font-bold mb-6 text-white">Send Us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-gray-300 text-sm font-medium mb-2">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full p-3 rounded-md bg-gray-700 border border-gray-600 text-white placeholder-gray-400
                             focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-gray-300 text-sm font-medium mb-2">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-3 rounded-md bg-gray-700 border border-gray-600 text-white placeholder-gray-400
                             focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  required
                />
              </div>
              <div>
                <label htmlFor="subject" className="block text-gray-300 text-sm font-medium mb-2">Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full p-3 rounded-md bg-gray-700 border border-gray-600 text-white placeholder-gray-400
                             focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  required
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-gray-300 text-sm font-medium mb-2">Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full p-3 rounded-md bg-gray-700 border border-gray-600 text-white placeholder-gray-400
                             focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  required
                ></textarea>
              </div>
              <motion.button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-md transition-all duration-300 shadow-lg hover:shadow-xl w-full"
                whileTap={{ scale: 0.95, y: 2 }} // Button press effect
                disabled={status === 'submitting'}
              >
                {status === 'submitting' ? 'Sending...' : 'Send Message'}
              </motion.button>
              {status === 'success' && (
                <p className="text-green-400 mt-4 text-center">Your message has been sent successfully!</p>
              )}
              {status === 'error' && (
                <p className="text-red-400 mt-4 text-center">Failed to send message. Please try again.</p>
              )}
            </form>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="flex flex-col justify-center space-y-8 p-6 bg-gray-700/70 rounded-xl shadow-lg backdrop-blur-sm border border-white/10"
          >
            <h2 className="text-3xl font-bold mb-4 text-white">Contact Information</h2>
            <div className="flex items-start text-lg">
              <MapPinIcon className="w-7 h-7 mr-4 text-yellow-300 flex-shrink-0" />
              <div>
                <p className="font-semibold">Our Office</p>
                <p>45573, Shepard Drive, Suit#101,</p>
                <p>Sterling, Virginia-20164, USA</p>
              </div>
            </div>
            <div className="flex items-center text-lg">
              <PhoneIcon className="w-7 h-7 mr-4 text-blue-300 flex-shrink-0" />
              <div>
                <p className="font-semibold">Phone Numbers</p>
                <p>+1757 656 7778</p>
                <p>+91 9000146000</p>
              </div>
            </div>
            <div className="flex items-center text-lg">
              <EnvelopeIcon className="w-7 h-7 mr-4 text-red-300 flex-shrink-0" />
              <div>
                <p className="font-semibold">Email Us</p>
                <p>hello@helixconferences.com</p>
              </div>
            </div>
            <motion.img
              src="https://placehold.co/400x300/4A2868/FFFFFF?text=Contact+Us"
              alt="Contact Us Location"
              className="w-full h-auto rounded-lg mt-8 shadow-md transform transition-transform duration-300 hover:scale-105"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.8 }}
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;