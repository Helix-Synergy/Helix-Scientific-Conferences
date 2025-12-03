import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

const CallForPapers = () => {
  const [selectedConference, setSelectedConference] = useState('');

  // Conference data with external links
  const conferences = [
    { 
      id: '1', 
      name: 'World Agriculture & Food Sciences Conclave', 
      link: 'https://foodmeet.helixconferences.com/abstract-submission'
    },
    { 
      id: '2', 
      name: 'International Science & Technology Summit', 
      link: 'https://techmatics.helixconferences.com/abstractsubmission/'
    },
    { 
      id: '3', 
      name: 'Global Pharmaceutical Conclave', 
      link: 'https://pharmatech.helixconferences.com/abstract-submission'
    },
    { 
      id: '4', 
      name: 'World Biotechnology Summit', 
      link: 'https://biocon.helixconferences.com/abstract-submission'
    },
    { 
      id: '5', 
      name: 'Global Medical Conclave', 
      link: 'https://mediclave.helixconferences.com/abstract-submission'
    },
    { 
      id: '6', 
      name: 'World Summit on Nursing & Nurse Practices', 
      link: 'https://biocon.helixconferences.com/abstract-submission'
    },
  ];

  // Handle conference selection and redirect
  const handleConferenceSelect = (e) => {
    const conferenceId = e.target.value;
    setSelectedConference('');
    
    if (conferenceId) {
      const conference = conferences.find(conf => conf.id === conferenceId);
      if (conference && conference.link) {
        // Redirect to external URL
        window.open(conference.link, '_blank', 'noopener,noreferrer');
      }
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden text-white bg-gray-900">
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

      {/* Hero Image Section at the Top */}
      <div className="relative z-10">
        <div className="container mx-auto">
          <div className="relative h-96 md:h-[500px] lg:h-[600px] overflow-hidden">
            {/* Background Image - Use a placeholder or actual image */}
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: "url('https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')",
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent"></div>
            </div>
            
            {/* Overlay Content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
              <motion.h1 
                className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                Call For Papers
              </motion.h1>
              <motion.p 
                className="text-xl md:text-2xl text-gray-200 max-w-3xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                {/* Select a conference to submit your abstract */}
              </motion.p>
            </div>
          </div>
        </div>
      </div>

      {/* Conference Selection Dropdown - Directly Below Image */}
      <div className="container mx-auto relative z-10 -mt-24 md:-mt-32 px-4">
        <motion.div
          className="max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <div className="bg-gray-900/90 backdrop-blur-lg rounded-2xl p-6 md:p-8 shadow-2xl border border-white/20">
            <div className="relative">
              <select
                value={selectedConference}
                onChange={handleConferenceSelect}
                className="w-full bg-gray-800/90 border-2 border-purple-500 rounded-xl py-4 px-6 text-white text-lg focus:outline-none focus:ring-4 focus:ring-purple-500/50 focus:border-transparent appearance-none transition-all duration-300 hover:border-purple-400 cursor-pointer"
              >
                <option value="" className="text-gray-500 text-lg">
                  Select a conference to submit your abstract...
                </option>
                {conferences.map((conference) => (
                  <option 
                    key={conference.id} 
                    value={conference.id}
                    className="text-white text-lg py-2"
                  >
                    {conference.name}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-purple-400">
                <ChevronDownIcon className="w-6 h-6" />
              </div>
            </div>

            {/* Simple Note */}
            <div className="mt-6 text-center">
              <p className="text-gray-400 text-sm">
                Selecting a conference will open the abstract submission page
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CallForPapers;