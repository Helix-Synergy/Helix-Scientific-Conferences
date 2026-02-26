import React, { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import PrecisionMedicineImage from "../../assets/images/homePage/PrecisionMedicineImage.jpg";
/* ===================== DATA (ALL 25 EVENTS) ===================== */
const fieldImages = {
  "FOOD & AGRI": "https://images.unsplash.com/photo-1490818387583-1baba5e638af?w=400&h=250&fit=crop",
  "MEDICAL": PrecisionMedicineImage,
  "LIFE SCIENCES": "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=400&h=250&fit=crop",
  "SCIENCE & TECHNOLOGY": "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=400&h=250&fit=crop",
  "PHARMA": "https://images.unsplash.com/photo-1585435557343-3b092031d77a?w=400&h=250&fit=crop",
  "NURSING": "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=250&fit=crop",
  "Digi": "https://cdn.sanity.io/images/0vv8moc6/mhe/7fbfb1af70cd235247dcf65e5d4aa94b3d02cd1a-8500x4000.jpg?fit=crop&auto=format",
  "Food": "https://tse4.mm.bing.net/th/id/OIP.o0uJsoIlV3JTZo9K6qEDrQHaE7?pid=Api&P=0&h=180",
  "Medi": "https://wallpaperaccess.com/full/3275630.jpg",
  "Bio": "https://wallpapercave.com/wp/wp9283244.jpg",
  "Smart_Materials": "https://wallpaperaccess.com/full/3310619.jpg",
  "AIDrug": "https://www.idbs.com/wp-content/uploads/2024/01/BL_Blog_Feature_Image_PR_9_Webpage_2048x1152.png",
  "Cellgene": "https://tse2.mm.bing.net/th/id/OIP.M-gUvAXPG88mKN_9tx2uBAHaEK?pid=Api&P=0&h=180",
  "Food-Meet": "https://images.squarespace-cdn.com/content/v1/57879a6cbebafb879f256735/1712835327056-D280SHVHRBB49J5M58TM/CH040421-5.jpg",
  "osaka": "https://wallpapers.com/images/hd/information-technology-1920-x-1080-background-yj5lntx9lzio3yiz.jpg",
  "tech": "https://wallpapers.com/images/hd/information-technology-1920-x-1080-background-yj5lntx9lzio3yiz.jpg",
  "bio": "https://florenciahealthcare.com/wp-content/uploads/2023/10/Slider-01.jpg",
  "medical": "https://www.pixelstalk.net/wp-content/uploads/images1/Medical-Wallpapers-HD-Free-download.jpg",
  "biocon": "https://thesaudiboom.com/wp-content/uploads/2024/01/1-Saudi-Arabia-Launches-National-Biotechnology-Strategy-To-Become-Global-BioTech-Hub-by-2040-scaled.jpeg",
  "nursing": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlogsZ1LK2PopL1jGerEig3DzWzYk2I8_I3A&s",

  "food-tech-expo":"https://images.yourstory.com/cs/wordpress/2016/03/foodtech.jpg",
  "millets":"https://www.zettafarms.com/wp-content/uploads/2024/01/blog-7.jpg",
  "medicine":"https://cdn.pixabay.com/photo/2023/10/01/14/40/medicine-8287535_1280.jpg",
  "rare":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTp1rD-4ayjUib1DET_1b2JFcmxrb6ZUcSHkQ&s",
  "energy":"https://sdg.iisd.org/wp-content/uploads/2023/08/cg642.jpg",
  "pharma-access":"https://img.freepik.com/free-photo/medicine-capsules-global-health-with-geometric-pattern-digital-remix_53876-126742.jpg",
  "nursing-lead":"https://wallpapers.com/images/hd/beautiful-indian-nurse-05s83ahwccah9a3i.jpg"
};
const conferenceData = [
  {
    field: "Food-Meet",
    title: "Food, Agriculture & Environmental Sciences Forum",
    shortName: "FOODMEET-2026",
    date: "Apr 23-24 | 2026",
    venue: "Barcelona | Spain",
    link: "https://foodmeet.helixconferences.com/"
  },
  {
    field: "FOOD & AGRI",
    title: "Food Microbiome Summit",
    shortName: "FOODMICRO-2026",
    date: "Apr 23-24 | 2026",
    venue: "Barcelona | Spain",
    link:"https://foodmicrobiome.helixconferences.com/"
  },
  {
    field: "Food",
    title: "Regenerative AgriTech Forum",
    shortName: "AGRIREGEN-2026",
    date: "Apr 23-24 | 2026",
    venue: "Barcelona | Spain",
    link:"https://agritech.helixconferences.com/"
  },
  {
    field: "food-tech-expo",
    title: "Future FoodTech Expo",
    shortName: "FOODTECH-2026",
    date: "Apr 23-24 | 2026",
    venue: "Barcelona | Spain",
    link:"https://foodtech.helixconferences.com/"
  },
  {
    field: "millets",
    title: "Millets & Climate-Resilient Agriculture Summit",
    shortName: "MILLETS-2026",
    date: "Apr 23-24 | 2026",
    venue: "Barcelona | Spain",
    link:"https://millets.helixconferences.com/"
  },
  {
    field: "medical",
    title: "Advanced Medical Practices Conclave",
    shortName: "MEDICLAVE 2026",
    date: "May 21-22 | 2026",
    venue: "Vienna | Austria",
    link: "https://mediclave.helixconferences.com/"
  },
  {
    field: "Medi",
    title: "Digital Pathology & AI Diagnostics Congress",
    shortName: "DIGIPATH-2026",
    date: "May 21-22 | 2026",
    venue: "Vienna | Austria",
    link:"https://digital-pathology.helixconferences.com/"
  },
  {
    field: "MEDICAL",
    title: "Precision Medicine Summit",
    shortName: "PRECISIONMEDICINE-2026",
    date: "May 21-22 | 2026",
    venue: "Vienna | Austria",
    link:"https://precisionmedicine.helixconferences.com/"
  },
  {
    field: "medicine",
    title: "Aesthetic Medicine & Cosmetic Innovation Summit",
    shortName: "AESTHETICA-2026",
    date: "May 21-22 | 2026",
    venue: "Vienna | Austria",
    link:"https://cosmetology.helixconferences.com/"
  },
  {
    field: "biocon",
    title: "International Conference on Applied Lifesciences",
    shortName: "BIOCON-2026",
    date: "Jun 25-26 | 2026",
    venue: "Amsterdam | Netherlands",
    link: "https://biocon.helixconferences.com/"
  },
  {
    field: "LIFE SCIENCES",
    title: "International Synthetic Biology & Bioengineering Forum",
    shortName: "SYNBIO-2026",
    date: "Jun 25-26 | 2026",
    venue: "Amsterdam | Netherlands",
    link: "https://syntheticbiology.helixconferences.com/"
  },
  {
    field: "Bio",
    title: "Microbiome Therapeutics Summit",
    shortName: "MICROBIOME-2026",
    date: "Jun 25-26 | 2026",
    venue: "Amsterdam | Netherlands",
    link: "https://microbiome.helixconferences.com/"
  },
  {
    field: "rare",
    title: "International Rare Disease & Orphan Drug Congress",
    shortName: "RAREDISEASE-2026",
    date: "Jun 25-26 | 2026",
    venue: "Amsterdam | Netherlands",
    link: "https://raredisease.helixconferences.com/"
  },
  {
    field: "tech",
    title: "World Quantum Technology Summit",
    shortName: "QUANTUMTECH-2026",
    date: "Sep 24-25 | 2026",
    venue: "Osaka | Japan",
    link: "https://quantumtech.helixconferences.com/"
  },
  {
    field: "SCIENCE & TECHNOLOGY",
    title: "Zero-Trust Security & AI Defense Forum",
    shortName: "ZEROTRUSTAI-2026",
    date: "Sep 24-25 | 2026",
    venue: "Osaka | Japan",
    link: "https://zerotrust-ai.helixconferences.com/"
  },
  {
    field: "Smart_Materials",
    title: "Smart Materials, Nanotech & Advanced Manufacturing Congress",
    shortName: "SMARTMATERIALS-2026",
    date: "Sep 24-25 | 2026",
    venue: "Osaka | Japan",
    link: "https://smartmaterials.helixconferences.com/"
  },
  {
    field: "energy",
    title: "Advanced Materials & Clean Energy Forum",
    shortName: "MATENERGY-2026",
    date: "Sep 24-25 | 2026",
    venue: "Osaka | Japan",
    link: "https://advancedmaterials.helixconferences.com/"
  },
  {
    field: "bio",
    title: "Advanced Pharmaceutical Sciences Forum",
    shortName: "PHARMTECH-2026",
    date: "Oct 22-23 | 2026",
    venue: "Singapore | Singapore City",
    link: "https://pharmatech.helixconferences.com/"
  },
  {
    field: "AIDrug",
    title: "AI Drug Discovery Conclave",
    shortName: "AIDRUG-2026",
    date: "Oct 22-23 | 2026",
    venue: "Singapore | Singapore City",
    link:"https://drugdiscovery.helixconferences.com/"
  },
  {
    field: "Cellgene",
    title: "Cell & Gene Therapy Manufacturing Summit",
    shortName: "CELLGENE-2026",
    date: "Oct 22-23 | 2026",
    venue: "Singapore | Singapore City",
    link:"https://cellgene.helixconferences.com/"
  },
  {
    field: "pharma-access",
    title: "Real-World Evidence & Pharma Access Forum",
    shortName: "PHARMACCESS-2026",
    date: "Oct 22-23 | 2026",
    venue: "Singapore | Singapore City",
    link:"https://pharma.helixconferences.com/"
  },
  {
    field: "nursing",
    title: "Nursing & Nurse Practices Conclave",
    shortName: "NURSESUMMIT-2026",
    date: "Nov 19-20 | 2026",
    venue: "Dubai | UAE",
    link:"https://nursesummit.helixconferences.com/"
  },
  {
    field: "NURSING",
    title: "AI & Digital Nursing Forum",
    shortName: "AINURSE-2026",
    date: "Nov 19-20 | 2026",
    venue: "Dubai | UAE",
    link:"https://nursing.helixconferences.com/"
  },
  {
    field: "Digi",
    title: "Critical & Emergency Care Summit",
    shortName: "ER-SUMMIT-2026",
    date: "Nov 19-20 | 2026",
    venue: "Dubai | UAE",
    link:"https://criticalcare.helixconferences.com/"
  },
  {
    field: "nursing-lead",
    title: "Nursing Leadership & Workforce Excellence Congress",
    shortName: "ER-SUMMIT-2026",
    date: "Nov 19-20 | 2026",
    venue: "Dubai | UAE",
    link:"https://nursingleadership.helixconferences.com/"
  }
];

/* ===================== EVENT CARD (UNCHANGED) ===================== */



/* ===================== EVENT CARD ===================== */

const tiltFactor = 0.2;
const rotateX = (y) => `${y * tiltFactor}deg`;
const rotateY = (x) => `${x * tiltFactor}deg`;

const cardVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 100, damping: 20, duration: 0.8, delay: 0.1 }
  }
};

const EventCard = ({ event }) => {
  const cardRef = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { stiffness: 70, damping: 20 };
  const rotateXSpring = useSpring(useTransform(y, rotateX), springConfig);
  const rotateYSpring = useSpring(useTransform(x, rotateY), springConfig);

  const handleMouseMove = (e) => {
    const rect = cardRef.current.getBoundingClientRect();
    x.set(e.clientX - (rect.left + rect.width / 2));
    y.set(e.clientY - (rect.top + rect.height / 2));
  };

  return (
    <a href={event.link} target="_blank" rel="noopener noreferrer" className="block">
      <motion.div
        ref={cardRef}
        className="flex flex-col p-5 rounded-2xl text-white w-72 flex-shrink-0 group h-full bg-black/40 backdrop-blur-md"
        style={{ rotateX: rotateXSpring, rotateY: rotateYSpring }}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => { x.set(0); y.set(0); }}
        variants={cardVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {event.image && (
          <div className="w-full h-36 rounded-xl overflow-hidden mb-4">
            <img
              src={event.image}
              alt={event.title}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        )}

        <h3 className="text-lg font-bold">{event.title}</h3>
        <p className="text-sm opacity-80">Date: {event.date}</p>
        <p className="text-sm opacity-80">Venue: {event.venue}</p>
        <p className="text-xs opacity-60 mt-2">{event.shortName}</p>

        <div className="text-blue-400 mt-auto">Learn More →</div>
      </motion.div>
    </a>
  );
};

/* ===================== SECTION ===================== */

const EventsSection = () => {
  return (
  <section className="w-full overflow-x-auto py-10 scrollbar-hide">
  <div className="flex gap-6 px-6 min-w-max">
    {conferenceData.map((conf, i) => (
      <EventCard
        key={i}
        event={{
          title: conf.title,
          date: conf.date,
          venue: conf.venue,
          link: conf.link,
          shortName: conf.shortName,
          image: fieldImages[conf.field]
        }}
      />
    ))}
  </div>
</section>
  );
};

export default EventsSection;