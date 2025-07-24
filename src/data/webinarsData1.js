import React from 'react';
import { motion } from 'framer-motion';

// Import images from your assets folder as per the provided image names
import Aerotech2026 from '../assets/images/Webinar/Aerotech_2026.jpg';
import AIR2025 from '../assets/images/Webinar/AIR_2025.jpg'; // Note: Used for AIR - 2026 also, ensure this is intentional
import AR2026 from '../assets/images/Webinar/AR_2026.jpg';
import Battery2026 from '../assets/images/Webinar/Battery_2026.jpg';
import Bigdata2026 from '../assets/images/Webinar/Bigdata_2026.jpg';
import Bioelectronics2026 from '../assets/images/Webinar/Bioelectronics_2026.jpg';
import Biofuel2026 from '../assets/images/Webinar/Biofuel_2026.jpeg';
import Biomechanics2026 from '../assets/images/Webinar/Biomechanics_2026.jpg';
import Blockchain2026 from '../assets/images/Webinar/Blockchain_2026.jpg'; // This image will now be correctly associated
import Cloud2026 from '../assets/images/Webinar/Cloud_2026.jpg';
import Cyber2026 from '../assets/images/Webinar/Cyber_2026.jpg';
import DataAnalytics2026 from '../assets/images/Webinar/Data Analytics_2026.jpg';
import Fermentation2026 from '../assets/images/Webinar/Fermentation_2026.jpg';
import Food2026 from '../assets/images/Webinar/Food_2026.jpg';
import Gene2026 from '../assets/images/Webinar/GENE-2026.jpg';
import Genomics2026 from '../assets/images/Webinar/Genomics_2026.jpg';
import GPS2026 from '../assets/images/Webinar/GPS_2026.jpg';
import Green2026 from '../assets/images/Webinar/Green_2026.jpg';
import Hydrogen2026 from '../assets/images/Webinar/Hydrogen_2026.jpg';
import IBS2026 from '../assets/images/Webinar/IBS_2026.jpg';
import IGC2026 from '../assets/images/Webinar/IGC_2026.jpg';
import Immuno2026 from '../assets/images/Webinar/Immuno_2026.jpg';
import MachineLearning2026 from '../assets/images/Webinar/Machine_Learning_2026.jpg';
import Meta2026 from '../assets/images/Webinar/META_2026.jpg';
import Nano2026 from '../assets/images/Webinar/Nano_2026.jpg'; // Note: Used for NEST - 2026, ensure this is intentional
import NEST2025 from '../assets/images/Webinar/NEST_2025.jpg'; // Note: Original NEST image, now used for "World Nano Summit" in 2026
import Quantum2026 from '../assets/images/Webinar/Quantum_2026.jpg';
import Renewable2026 from '../assets/images/Webinar/Renewable_2026.jpg';
import STEM2026 from '../assets/images/Webinar/STEM_2026.jpg';
import Vaccine2026 from '../assets/images/Webinar/Vaccine_2026.jpg';

import IDOM2025 from '../assets/images/Webinar/IDOM_2025.jpg';
import GENT2025 from '../assets/images/Webinar/GENT_2025.jpeg';
import Ican2025 from '../assets/images/Webinar/Ican_2025.jpg';
import ARM2025 from '../assets/images/Webinar/ARM_2025.jpg';

const WebinarsData = [
  // 2025 webinars
  {
    title: "International Conference on Dentistry & Oral Medicine",
    code: "IDOM-2025", // Changed to IDOM-2025 for consistency and uniqueness
    date: "Sep 12, 2025",
    type: "webinar",
    image: IDOM2025,
    link: "https://IDOM.helixconferences.com/",
    year: 2025
  },
  {
    title: "Global Summit on Graphene and Nano Technology",
    code: "GENT-2025", // Changed to GENT-2025 for consistency and uniqueness
    date: "Sep 16, 2025",
    type: "webinar",
    image: GENT2025,
    link: "https://GENT.helixconferences.com/",
    year: 2025
  },
  {
    title: "International Conference on Autism and Neuropsychiatry",
    code: "ICAN-2025", // Changed to ICAN-2025 for consistency and uniqueness
    date: "October 10, 2025",
    type: "webinar",
    image: Ican2025,
    link: "https://ICAN.helixconferences.com/",
    year: 2025
  },
  {
    title: "Global Conclave on AI, Robotics, & Metaverse",
    code: "ARM-2025", // Changed to ARM-2025 for consistency and uniqueness
    date: "October 24, 2025",
    type: "webinar",
    image: ARM2025,
    link: "https://ARM.helixconferences.com/",
    year: 2025
  },
  {
    title: "Global Women Empowerment & Sustainability Congress", // Corrected typo: "Sustanibility" to "Sustainability"
    code: "WEST-2025", // Consistent hyphenation
    date: "Aug 22, 2025",
    type: "webinar",
    image: "https://women.helixconferences.com/static/media/about_img.67ed4ac21add9f07bf21.jpg",
    link: "https://women.helixconferences.com/",
    year: 2025
  },
  {
    title: "Global Summit on Nano Engineering & Smart Technology (NEST 2025)", // Added (NEST 2025) for clarity
    code: "NEST-2025", // Consistent hyphenation
    date: "Oct 14, 2025", // Corrected to 2025 as per image name NEST2025
    type: "webinar",
    image: NEST2025,
    link: "", // Assuming no specific link for 2025 NEST
    year: 2025
  },


  // 2026 webinars (Upcoming)
  {
    title: "World Gene Therapy Summit",
    code: "GENE-2026",
    date: "Feb 11, 2026",
    type: "webinar",
    image: Gene2026,
    link: "",
    year: 2026
  },
  {
    title: "Global Stemcell Meet",
    code: "STEM-2026",
    date: "Feb 18, 2026",
    type: "webinar",
    image: STEM2026,
    link: "",
    year: 2026
  },
  {
    title: "International Immunotherapy Conclave",
    code: "IMMUNO-2026", // Consistent hyphenation
    date: "Feb 25, 2026",
    type: "webinar",
    image: Immuno2026,
    link: "",
    year: 2026
  },
  {
    title: "International Biosensors Summit",
    code: "IBS-2026",
    date: "Mar 11, 2026",
    type: "webinar",
    image: IBS2026,
    link: "",
    year: 2026
  },
  {
    title: "Global Battery Tech Summit",
    code: "BATTERY-2026", // Consistent hyphenation
    date: "Mar 18, 2026",
    type: "webinar",
    image: Battery2026,
    link: "",
    year: 2026
  },
  {
    title: "World Bioelectronics Conclave",
    code: "BIOELECTRONICS-2026", // Consistent hyphenation
    date: "Mar 25, 2026",
    type: "webinar",
    image: Bioelectronics2026,
    link: "",
    year: 2026
  },
  {
    title: "Global Vaccine Technology Summit",
    code: "VACCINE-2026", // Consistent hyphenation
    date: "Apr 15, 2026",
    type: "webinar",
    image: Vaccine2026,
    link: "",
    year: 2026
  },
  {
    title: "World Genomics Conclave", // Corrected typo: "Genomices" to "Genomics"
    code: "GENOMICS-2026", // Corrected code to match title for clarity and uniqueness
    date: "Apr 22, 2026",
    type: "webinar",
    image: Genomics2026,
    link: "",
    year: 2026
  },
  {
    title: "Global Proteomics Summit",
    code: "GPS-2026-WEBINAR", // This code is retained for the Proteomics Summit
    date: "Apr 29, 2026",
    type: "webinar",
    image: GPS2026,
    link: "",
    year: 2026
  },
  {
    title: "Global Bigdata Summit",
    code: "BIGDATA-2026", // Consistent hyphenation
    date: "May 13, 2026",
    type: "webinar",
    image: Bigdata2026,
    link: "",
    year: 2026
  },
  {
    title: "World Data Analytics Conclave",
    code: "DATAANALYTICS-2026", // Consistent hyphenation, removed space
    date: "May 20, 2026",
    type: "webinar",
    image: DataAnalytics2026,
    link: "",
    year: 2026
  },
  {
    title: "Global Block Chain Summit",
    code: "BLOCKCHAIN-2026", // **CHANGED THIS CODE TO BE UNIQUE**
    date: "May 27, 2026",
    type: "webinar",
    image: Blockchain2026,
    link: "",
    year: 2026
  },
  {
    title: "Global Green Chemistry Conclave",
    code: "GREEN-2026", // Consistent hyphenation
    date: "Jun 10, 2026",
    type: "webinar",
    image: Green2026,
    link: "",
    year: 2026
  },
  {
    title: "World Biofuels Conclave",
    code: "BIOFUEL-2026", // Consistent hyphenation
    date: "Jun 17, 2026",
    type: "webinar",
    image: Biofuel2026,
    link: "",
    year: 2026
  },
  {
    title: "Global Fermentation Technology Summit",
    code: "FERMENTATION-2026", // Consistent hyphenation
    date: "Jun 24, 2026",
    type: "webinar",
    image: Fermentation2026,
    link: "",
    year: 2026
  },
  {
    title: "World Symposia on Food Chemistry", // Corrected typo: "world Symposia" to "World Symposia"
    code: "FOOD-2026", // Consistent hyphenation
    date: "Jul 15, 2026", // Corrected 'JuL' to 'Jul'
    type: "webinar",
    image: Food2026,
    link: "",
    year: 2026
  },
  {
    title: "World Renewable Energy Conclave",
    code: "RENEWABLE-2026", // Consistent hyphenation
    date: "Jul 22, 2026", // Corrected 'JuL' to 'Jul'
    type: "webinar",
    image: Renewable2026,
    link: "",
    year: 2026
  },
  {
    title: "Global Green Hydrogen Summit",
    code: "HYDROGEN-2026", // Consistent hyphenation
    date: "Jun 24, 2026",
    type: "webinar",
    image: Hydrogen2026,
    link: "",
    year: 2026
  },
  {
    title: "International Quantum Computing Conclave",
    code: "QUANTUM-2026", // Consistent hyphenation
    date: "Aug 12, 2026",
    type: "webinar",
    image: Quantum2026,
    link: "",
    year: 2026
  },
  {
    title: "Global Biomechanics Summit",
    code: "BIOMECHANICS-2026", // Consistent hyphenation
    date: "Aug 19, 2026",
    type: "webinar",
    image: Biomechanics2026,
    link: "",
    year: 2026
  },
  {
    title: "Global Cybersecurity Summit",
    code: "CYBER-2026", // Consistent hyphenation
    date: "Aug 26, 2026",
    type: "webinar",
    image: Cyber2026,
    link: "",
    year: 2026
  },
  {
    title: "Global Symposia on Metaverse", // Corrected typo: "Metavera" to "Metaverse"
    code: "META-2026", // Consistent hyphenation
    date: "Sep 16, 2026",
    type: "webinar",
    image: Meta2026,
    link: "",
    year: 2026
  },
  {
    title: "International Machine Learning Summit",
    code: "MACHINELEARNING-2026", // Consistent hyphenation, removed space
    date: "Sep 23, 2026",
    type: "webinar",
    image: MachineLearning2026,
    link: "",
    year: 2026
  },
  {
    title: "Global Conclave on Augmented Reality",
    code: "AR-2026", // Consistent hyphenation
    date: "Sep 30, 2026",
    type: "webinar",
    image: AR2026,
    link: "",
    year: 2026
  },
  {
    title: "Global Summit on Nano Engineering & Smart Technology",
    code: "NEST-2026", // Consistent hyphenation for 2026
    date: "Oct 14, 2026",
    type: "webinar",
    image: Nano2026, // Using Nano2026 image
    link: "",
    year: 2026
  },
  {
    title: "World Nano Summit",
    code: "NANO-2026", // Consistent hyphenation
    date: "Oct 21, 2026",
    type: "webinar",
    image: NEST2025, // Using NEST2025 image for World Nano Summit
    link: "",
    year: 2026
  },
  {
    title: "International Graphene Conclave",
    code: "IGC-2026", // Consistent hyphenation
    date: "Oct 28, 2026",
    type: "webinar",
    image: IGC2026,
    link: "",
    year: 2026
  },
  {
    title: "International Conference on Cloud Computing",
    code: "CLOUD-2026", // Consistent hyphenation
    date: "Nov 11, 2026",
    type: "webinar",
    image: Cloud2026,
    link: "",
    year: 2026
  },
  {
    title: "International Artificial Intelligence & Robotics Conclave",
    code: "AIR-2026", // Consistent hyphenation
    date: "Nov 18, 2026",
    type: "webinar",
    image: AIR2025, // Using AIR2025 image for AIR-2026
    link: "",
    year: 2026
  },
  {
    title: "Global Aerospace Engineering Conclave",
    code: "AEROTECH-2026", // Consistent hyphenation
    date: "Nov 25, 2026",
    type: "webinar",
    image: Aerotech2026,
    link: "",
    year: 2026
  }
];

export default WebinarsData;