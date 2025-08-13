import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Helmet } from "react-helmet";

const BuyATicket = () => {
  const [ticketType, setTicketType] = useState('standard'); // 'standard' or 'vip'

  const ticketOptions = [
    {
      id: 'standard',
      name: 'Standard Pass',
      price: '$299',
      features: [
        'Access to all main sessions',
        'Digital conference proceedings',
        'Networking events',
        'Coffee breaks & lunch',
      ],
      color: 'bg-blue-600',
    },
    {
      id: 'vip',
      name: 'VIP Pass',
      price: '$599',
      features: [
        'All Standard Pass features',
        'Exclusive VIP lounge access',
        'Priority seating',
        'Meet & Greet with keynote speakers',
        'Premium gift bag',
      ],
      color: 'bg-purple-600',
    },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden text-white py-20 px-4 bg-gray-900">
      {/* Background: Pulsating Radial Gradient */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: 'radial-gradient(circle at center, #4A2868, #2E659A)',
          backgroundSize: '200% 200%',
          animation: 'radial-pulse 8s infinite ease-in-out',
        }}
      >
        <div className="absolute inset-0 bg-black opacity-40"></div> {/* Dark overlay */}
      </div>

      <div className="container mx-auto relative z-10">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-12 animate-fade-in-up">
          Secure Your Spot
        </h1>

        <p className="text-lg text-center mb-10 max-w-2xl mx-auto">
          Choose the ticket option that best suits your needs and join us for an unforgettable experience.
        </p>

        <div className="flex flex-col md:flex-row justify-center items-center gap-8">
          {ticketOptions.map((option) => (
            <motion.div
              key={option.id}
              className={`relative bg-gray-800 rounded-2xl shadow-xl p-8 w-full md:w-96 text-center border-2 ${
                ticketType === option.id ? 'border-blue-400 scale-105' : 'border-transparent'
              } transform transition-all duration-500 ease-out-quad cursor-pointer`}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              whileHover={{ scale: 1.03, rotateY: 5, boxShadow: '0 15px 30px rgba(0,0,0,0.4)' }}
              onClick={() => setTicketType(option.id)}
            >
              <div className={`absolute -top-4 left-1/2 -translate-x-1/2 px-6 py-2 rounded-full text-white font-bold text-lg shadow-md ${option.color}`}>
                {option.name}
              </div>
              <h2 className="text-5xl font-extrabold mt-10 mb-4 text-white">{option.price}</h2>
              <ul className="text-gray-300 text-left space-y-2 mb-8">
                {option.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center">
                    <svg className="w-5 h-5 mr-2 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
              <button
                className={`w-full py-3 rounded-lg text-white font-bold text-lg transition-all duration-300 transform
                           ${ticketType === option.id ? 'bg-green-500 hover:bg-green-600 active:scale-95' : 'bg-gray-700 hover:bg-gray-600 active:scale-95'}
                           shadow-md hover:shadow-lg`}
              >
                Select {option.name}
              </button>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
        >
          <p className="text-md text-gray-400">
            For group discounts or custom packages, please <Link to="/contact" className="text-blue-400 hover:underline">contact us</Link>.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default BuyATicket;