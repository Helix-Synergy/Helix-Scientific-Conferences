// src/data/homePageContent.js

// IMPORTANT: These are DUMMY PLACEHOLDER IMAGE URLs from Pexels.
// They are used to ensure the site displays content even without local assets.
// You MUST REPLACE THESE with your ACTUAL IMAGES from public/assets/images/ AND public/assets/avatars/ LATER.

import GlobalScienceTechnology from '../assets/images/homePage/GlobalScienceTechnology.jpg'
import ArtificialIntelligenceMachineLearning from '../assets/images/homePage/ArtificialIntelligenceMachineLearning.jpg'
import BiotechLifeSciencesForum from '../assets/images/homePage/BiotechLifeSciencesForum.jpg'
import RenewableEnergySustainability from '../assets/images/homePage/RenewableEnergySustainability.jpg'
import ConnectInspireInnovate from '../assets/images/homePage/ConnectInspireInnovate..jpg'

import innovationImageA from '../assets/images/homePage/innovationImageA.jpg'
import innovationImageB from '../assets/images/homePage/innovationImageB.jpg'
import innovationImageC from '../assets/images/homePage/innovationImageC.jpg'
import innovationImageD from '../assets/images/homePage/innovationImageD.jpg'
import innovationImageE from '../assets/images/homePage/innovationImageE.jpg'
import Foodmeet_2026 from "../assets/images/Hybrid/Foodmeet_2026.jpg";
import Techmatics_2026 from '../assets/images/Hybrid/TECHMATICS_2026.jpg'
import Biocon_2025 from '../assets/images/Hybrid/BIOCON_2025.jpg'
import Pharmatech_2025 from '../assets/images/Hybrid/PHARMATECH_2025.jpg'
import Mediclave_2025 from '../assets/images/Hybrid/MEDICLAVE_2025.jpg'





// About Section Images (Pexels URLs related to collaboration/work)
const aboutImg1 = "https://images.pexels.com/photos/3184433/pexels-photo-3184433.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2";
const aboutImg2 = "https://images.pexels.com/photos/1708936/pexels-photo-1708936.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2";


// Testimonial Avatars (Pexels URLs for diverse headshots)
const testimonialAvatar1 = "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2";
const testimonialAvatar2 = "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2";
const testimonialAvatar3 = "https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2";


// // heroData is now an array of slides
// export const heroSlides = [
//   {
//     backgroundImage: GlobalScienceTechnology,
//     mainTitle: "Global Science & Technology Summit 2025",
//     subHeading: "Driving Innovation, Collaboration, And Discovery Across Disciplines",
//     button1: { text: "Explore Conferences", link: "/hybrids" },
//     button2: { text: "About Helix", link: "/about" },
//   },
//   {
//     backgroundImage: ArtificialIntelligenceMachineLearning,
//     mainTitle: "Artificial Intelligence & Machine Learning Congress",
//     subHeading: "Join Global Leaders Shaping The Future Of Intelligent Systems",
//     button1: { text: "AI & Robotics Tracks", link: "https://arm.helixconferences.com/", target: "_blank" },
//     button2: { text: "Submit Your Abstract", link: "/contact" },
//   },
//   {
//     backgroundImage: BiotechLifeSciencesForum,
//     mainTitle: "International Biotech & Life Sciences Forum",
//     subHeading: "Breakthrough Research In Genomics, Proteomics & Medical Innovation",
//     button1: { text: "Biotech Conference Agenda", link: "https://biocon.helixconferences.com/", target: "_blank" },
//     button2: { text: "Register To Attend", link: "/buy-a-ticket" },
//   },
//   {
//     backgroundImage: RenewableEnergySustainability,
//     mainTitle: "Genetic Engineering & Nanotechnology Summit",
//     subHeading: "Bridging Genetics And Nanotechnology For Future Innovations",
//     button1: { text: "Explore GENT Sessions", link: "https://gent.helixconferences.com/", target: "_blank" },
//     button2: { text: "Partner With Helix", link: "/contact" },
//   },
//   {
//     backgroundImage: ConnectInspireInnovate,
//     mainTitle: "Connect. Inspire. Innovate.",
//     subHeading: "Empowering Global Scientific Dialogue Through Helix Conferences",
//     button1: { text: "Apply As A Speaker", link: "/speakers" },
//     button2: { text: "Success Stories", link: "/testimonials" },
//   },
// ];

export const heroSlides = [
  {
    backgroundImage: Foodmeet_2026,
    mainTitle: "World Agriculture & Food Sciences Conclave",
    subHeading: "Nov 25-27, 2025 | Valencia, Spain | (FOODMEET-2025)",
    button1: { text: "View Conference Details", link: "https://foodmeet.helixconferences.com/", target: "_blank" },
    button2: { text: "Register Now", link: "/buy-a-ticket" },
  },
  {
    backgroundImage: Techmatics_2026,
    mainTitle: "International Science & Technology Summit",
    subHeading: "Nov 25-27, 2025 | Valencia, Spain | (TECHMATICS-2025)",
    button1: { text: "View Conference Details", link: "https://techmatics.helixconferences.com/", target: "_blank" },
    button2: { text: "Register Now", link: "/buy-a-ticket" },
  },
  {
    backgroundImage: Pharmatech_2025,
    mainTitle: "Global Pharmaceutical Conclave",
    subHeading: "Nov 25-27, 2025 | Valencia, Spain | (PHARMATECH-2025)",
    button1: { text: "View Conference Details", link: "https://pharmatech.helixconferences.com/", target: "_blank" },
    button2: { text: "Register Now", link: "/buy-a-ticket" },
  },
  {
    backgroundImage: Biocon_2025,
    mainTitle: "World Biotechnology Summit",
    subHeading: "Nov 25-27, 2025 | Valancia, Spain | (BIOCON-2025)",
    button1: { text: "View Conference Details", link: "https://biocon.helixconferences.com/", target: "_blank" },
    button2: { text: "Register Now", link: "/buy-a-ticket" },
  },
  {
    backgroundImage: Mediclave_2025,
    mainTitle: "Global Medical Conclave",
    subHeading: "Nov 25-27, 2025 | Valancia, Spain | (MEDICLAVE-2025)",
    button1: { text: "View Conference Details", link: "https://mediclave.helixconferences.com/", target: "_blank" },
    button2: { text: "Register Now", link: "/buy-a-ticket" },
  },
];


export const statisticsData = [
  { value: 21, label: "Executed Conferences" },
  { value: 100, label: "Eminent Speakers" },
  { value: 900, label: "Speakers" },
  { value: 1500, label: "Publications" },
];

export const aboutData = {
  heading: "Unlock The Future Of Innovation With Helix Conferences !!!",
  subHeading: "Your Gateway To Global Scientific Exchange",
  paragraphs: [
    "Helix Conferences is dedicated to fostering groundbreaking research and technological advancements. We organize international summits that bring together leading scientists, researchers, and industry experts from across the globe.",
    "Our mission is to create a dynamic platform for knowledge exchange, networking, and collaboration, driving innovation in various scientific disciplines. We believe in the power of shared ideas to shape a brighter future.",
  ],
  image1: aboutImg1,
  image2: aboutImg2,
  points: [
    "Cutting-Edge Research Presentations.",
    "Networking Opportunities with Global Experts.",
    "Workshops and Interactive Sessions.",
    "Publication Opportunities In Prestigious Journals.",
  ],
  buttonText: "Read More",
  // Innovation Section images, explicitly using four distinct Pexels URLs
  innovationImages: [
    innovationImageA,
    innovationImageB,
    innovationImageC,
    innovationImageD,
    innovationImageE
  ],
  satisfiedClients: {
    count: 3500,
    label: "Satisfied Clients",
    // These are also Pexels URLs now to avoid local file dependency
    avatars: [
      testimonialAvatar1,
      testimonialAvatar2,
      testimonialAvatar3,
    ],
  },
};





export const journalsData = {
  heading: "Helix Open Access Journals",
  subHeading: "Publish Your Research with Global Reach",
  description: "Helix Conferences proudly supports open access publishing through its network of peer-reviewed Journals. Submit your Research and contribute to the Global Scientific community.",
  button: { text: "View All Journals", link: "/journals" }
};

export const testimonialsData = [
  {
    quote: "Attending Helix Conferences has been a game-changer for my research. The quality of presentations and networking opportunities are unparalleled.",
    author: "Dr. Sarah Chen",
    title: "Research Scientist, Tech Innovations Inc.",
    avatar: testimonialAvatar1,
  },
  {
    quote: "The webinars provided invaluable insights into emerging technologies. Highly recommended for anyone in the tech industry.",
    author: "Mr. David Lee",
    title: "Software Engineer, Global Solutions",
    avatar: testimonialAvatar2,
  },
  {
    quote: "A truly international platform! I connected with collaborators from different continents, leading to exciting new projects.",
    author: "Prof. Emily White",
    title: "University Professor, Global University",
    avatar: testimonialAvatar3,
  },
];

export const contactData = {
  heading: "Get In Touch",
  subHeading: "Have questions? We're here to help.",
  address: "Helix Conferences Office, 123 Science Blvd, Innovation City, 500081, India",
  phone: "+91 123 456 7890",
  email: "info@helixconferences.com",
};

export const footerLinks = {
  quickLinks: [
    { text: "Home", link: "/" },
    { text: "About Us", link: "/about" },
    { text: "Conferences", link: "/conferences" },
    { text: "Journals", link: "/journals" },
    { text: "Contact", link: "/contact" },
  ],
  services: [
    { text: "Hybrid Conferences", link: "/hybrids" },
    { text: "Webinars", link: "/webinars" },
    { text: "Call for Papers", link: "/call-for-papers" },
    { text: "Speakers", link: "/speakers" },
    { text: "Committees", link: "/committees" },
  ],
  support: [
    { text: "FAQs", link: "/faqs" },
    { text: "Privacy Policy", link: "/privacy-policy" },
    { text: "Terms & Conditions", link: "/terms-conditions" },
  ]
};







