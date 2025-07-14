// // src/components/StatisticsSection.js
// import React, { useRef, useEffect } from 'react';
// import { motion, useInView } from 'framer-motion'; // Importing useInView
// import StatisticCounter from './StatisticCounter';
// import { statisticsData } from '../data/homePageContent'; // Import your statistics data
// import {
//   UsersIcon, // Example icon for Eminent Speakers
//   ClipboardDocumentCheckIcon, // Example icon for publications
//   BriefcaseIcon, // Example icon for conferences
//   SpeakerWaveIcon // Example icon for speakers
// } from '@heroicons/react/24/solid'; // Or use outline icons

// // Map the data labels to appropriate Heroicons
// const iconMap = {
//   "Executed Conferences": BriefcaseIcon,
//   "Eminent Speakers": UsersIcon,
//   "Speakers": SpeakerWaveIcon,
//   "Publications": ClipboardDocumentCheckIcon,
// };

// function StatisticsSection() {
//   const ref = useRef(null);
//   const isInView = useInView(ref, { once: true, amount: 0.5 }); // Trigger animation once when 50% in view

//   // Variants for section entrance animation
//   const sectionVariants = {
//     hidden: { opacity: 0, y: 50 },
//     visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
//   };

//   return (
//     <motion.section
//       id="statistics"
//       ref={ref}
//       className="py-16 md:py-24 bg-gradient-to-r from-blue-700 to-purple-600 text-white relative overflow-hidden" // Applied a vibrant gradient background
//       variants={sectionVariants}
//       initial="hidden"
//       animate={isInView ? "visible" : "hidden"}
//     >
//       {/* Background patterns/effects (optional) */}
//       <div className="absolute inset-0 z-0 opacity-10" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.2\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zm0-30V0H4v4H0v2h4v4h2V6H0V4h4z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }}></div>


//       <div className="container mx-auto px-4 relative z-10">
//         <h2 className="text-3xl md:text-5xl font-extrabold text-center mb-12 drop-shadow-md">
//           Our Achievements
//         </h2>
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
//           {statisticsData.map((stat, index) => {
//             const IconComponent = iconMap[stat.label]; // Get the icon component from the map
//             return (
//               <StatisticCounter
//                 key={index}
//                 icon={IconComponent} // Pass the icon component
//                 value={stat.value}
//                 label={stat.label}
//                 isInView={isInView} // Pass isInView prop to StatisticCounter for count animation
//               />
//             );
//           })}
//         </div>
//       </div>
//     </motion.section>
//   );
// }

// export default StatisticsSection;



// src/components/StatisticsSection.js
import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import StatisticCounter from '../StatisticCounter';
import { statisticsData } from '../../data/homePageContent';
import {
  UsersIcon,
  ClipboardDocumentCheckIcon,
  BriefcaseIcon,
  SpeakerWaveIcon
} from '@heroicons/react/24/solid';

const iconMap = {
  "Executed Conferences": BriefcaseIcon,
  "Eminent Speakers": UsersIcon,
  "Speakers": SpeakerWaveIcon,
  "Publications": ClipboardDocumentCheckIcon,
};

function StatisticsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        staggerChildren: 0.2 // Unique: Staggered entrance for each statistic counter
      }
    },
  };

  const itemVariants = { // Variants for individual StatisticCounter items
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <motion.section
      id="statistics"
      ref={ref}
      className="text-white relative overflow-hidden flex items-center justify-center"
      style={{
        backgroundImage: 'linear-gradient(to right, #4A2868, #2E659A)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        backgroundSize: 'cover',
        backgroundAttachment: 'fixed',
        borderTop: '1px solid rgba(255, 255, 255, 0.1)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        minHeight: '350px', // INCREASED HEIGHT: Ensures more vertical space for the section
      }}
      variants={sectionVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      {/* UNIQUE ANIMATIONS: Glowing orb background elements */}
      <motion.div
        className="absolute w-64 h-64 bg-purple-500 rounded-full blur-3xl opacity-50 z-0"
        animate={{ x: [-50, 50, -50], y: [-50, 50, -50], rotate: [0, 360] }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        style={{ top: '10%', left: '5%' }}
      />
      <motion.div
        className="absolute w-80 h-80 bg-blue-400 rounded-full blur-3xl opacity-40 z-0"
        animate={{ x: [50, -50, 50], y: [50, -50, 50], rotate: [360, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear", delay: 1 }}
        style={{ bottom: '10%', right: '5%' }}
      />
      <motion.div
        className="absolute inset-0 z-10 bg-black/30" // Changed z-index to be above orbs for a subtle overlay
      />

      <div className="container mx-auto px-4 relative z-20 py-16"> {/* INCREASED HEIGHT: More vertical padding for content */}
        <h2 className="text-2xl md:text-3xl font-extrabold text-center mb-8 drop-shadow-lg"> {/* INCREASED MARGIN: More space below the heading */}
          Our Achievements
        </h2>
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8" // INCREASED GAP: More spacing between statistic cards
          variants={sectionVariants} // Applies staggered animation to grid children
        >
          {statisticsData.map((stat, index) => {
            const IconComponent = iconMap[stat.label];
            return (
              <StatisticCounter
                key={index}
                icon={IconComponent}
                value={stat.value}
                label={stat.label}
                isInView={isInView}
                variants={itemVariants} // Passes unique animation variants to each counter
              />
            );
          })}
        </motion.div>
      </div>
    </motion.section>
  );
}

export default StatisticsSection;