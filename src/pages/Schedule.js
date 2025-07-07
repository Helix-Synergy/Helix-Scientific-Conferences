import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ClockIcon, MapPinIcon } from '@heroicons/react/24/outline'; // Example icons

const Schedule = () => {
  const [activeDay, setActiveDay] = useState('Day 1');

  const conferenceSchedule = {
    'Day 1': [
      { time: '09:00 AM', title: 'Opening Ceremony & Welcome Address', speaker: 'Dr. John Doe', location: 'Main Hall' },
      { time: '10:00 AM', title: 'Keynote: The Future of AI', speaker: 'Prof. Jane Smith', location: 'Main Hall' },
      { time: '11:00 AM', title: 'Networking Break', speaker: '', location: 'Foyer' },
      { time: '11:30 AM', title: 'Parallel Sessions: Track A - Deep Learning', speaker: '', location: 'Room 1' },
      { time: '11:30 AM', title: 'Parallel Sessions: Track B - Robotics', speaker: '', location: 'Room 2' },
      { time: '01:00 PM', title: 'Lunch Break', speaker: '', location: 'Dining Area' },
      { time: '02:00 PM', title: 'Panel Discussion: Ethical AI', speaker: 'Various', location: 'Main Hall' },
      { time: '03:30 PM', title: 'Poster Session 1', speaker: '', location: 'Exhibition Area' },
      { time: '05:00 PM', title: 'Day 1 Wrap-up', speaker: 'Organizers', location: 'Main Hall' },
    ],
    'Day 2': [
      { time: '09:00 AM', title: 'Keynote: Sustainable Technologies', speaker: 'Dr. Emily White', location: 'Main Hall' },
      { time: '10:00 AM', title: 'Parallel Sessions: Track C - Renewable Energy', speaker: '', location: 'Room 1' },
      { time: '10:00 AM', title: 'Parallel Sessions: Track D - Green Chemistry', speaker: '', location: 'Room 2' },
      { time: '11:30 AM', title: 'Networking Break', speaker: '', location: 'Foyer' },
      { time: '12:00 PM', title: 'Workshop: AI for Climate Modeling', speaker: 'Dr. Alex Green', location: 'Room 3' },
      { time: '01:00 PM', title: 'Lunch Break', speaker: '', location: 'Dining Area' },
      { time: '02:00 PM', title: 'Invited Talk: Quantum Computing Advances', speaker: 'Prof. David Brown', location: 'Main Hall' },
      { time: '03:30 PM', title: 'Poster Session 2', speaker: '', location: 'Exhibition Area' },
      { time: '05:00 PM', title: 'Gala Dinner & Awards', speaker: '', location: 'Grand Ballroom' },
    ],
    'Day 3': [
      { time: '09:00 AM', title: 'Keynote: Biomedical Breakthroughs', speaker: 'Dr. Sarah Lee', location: 'Main Hall' },
      { time: '10:00 AM', title: 'Parallel Sessions: Track E - Gene Editing', speaker: '', location: 'Room 1' },
      { time: '10:00 AM', title: 'Parallel Sessions: Track F - Drug Discovery', speaker: '', location: 'Room 2' },
      { time: '11:30 AM', title: 'Networking Break', speaker: '', location: 'Foyer' },
      { time: '12:00 PM', title: 'Closing Remarks & Future Outlook', speaker: 'Organizers', location: 'Main Hall' },
      { time: '01:00 PM', title: 'Departure', speaker: '', location: '' },
    ],
  };

  const scheduleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3, ease: "easeIn" } },
  };

  return (
    <div className="min-h-screen relative overflow-hidden text-white py-20 px-4 bg-gray-900">
      {/* Background: Time-lapse Cloud Movement */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(https://placehold.co/1920x1080/2E659A/FFFFFF?text=Cloud+Background)`,
          backgroundSize: '200% 100%', // Make it wider than screen to allow movement
          animation: 'cloud-move 60s linear infinite', // Slow horizontal movement
        }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div> {/* Dark overlay */}
      </div>

      <div className="container mx-auto relative z-10">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-12 animate-fade-in-up">
          Conference Schedule
        </h1>

        <p className="text-lg text-center mb-10 max-w-3xl mx-auto">
          Plan your experience with our detailed schedule, covering all sessions, breaks, and special events.
        </p>

        {/* Day Navigation Tabs */}
        <div className="flex justify-center mb-10 space-x-4">
          {Object.keys(conferenceSchedule).map((day) => (
            <button
              key={day}
              onClick={() => setActiveDay(day)}
              className={`py-3 px-6 rounded-full text-lg font-semibold transition-all duration-300
                          ${activeDay === day ? 'bg-blue-600 text-white shadow-lg' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}
                          transform active:scale-95`}
            >
              {day}
            </button>
          ))}
        </div>

        {/* Schedule Content */}
        <div className="bg-gray-800/70 p-8 rounded-xl shadow-lg backdrop-blur-sm border border-white/10">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeDay}
              variants={scheduleVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="space-y-6"
            >
              {conferenceSchedule[activeDay].length > 0 ? (
                conferenceSchedule[activeDay].map((item, index) => (
                  <motion.div
                    key={index}
                    className="flex flex-col md:flex-row items-start md:items-center bg-gray-700/50 p-4 rounded-lg shadow-md
                               transform transition-all duration-300 hover:scale-[1.01] hover:bg-gray-700 hover:shadow-xl"
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                  >
                    <div className="flex items-center text-blue-300 font-bold text-md md:w-32 flex-shrink-0 mb-2 md:mb-0">
                      <ClockIcon className="w-5 h-5 mr-2" />
                      {item.time}
                    </div>
                    <div className="flex-grow md:ml-4">
                      <h3 className="text-xl font-semibold text-white">{item.title}</h3>
                      {item.speaker && <p className="text-gray-300 text-sm">Speaker: {item.speaker}</p>}
                    </div>
                    {item.location && (
                      <p className="flex items-center text-gray-400 text-sm mt-2 md:mt-0 md:ml-4 flex-shrink-0">
                        <MapPinIcon className="w-4 h-4 mr-1" />
                        {item.location}
                      </p>
                    )}
                  </motion.div>
                ))
              ) : (
                <p className="text-center text-lg text-gray-400 py-10">No events scheduled for this day yet.</p>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Schedule;