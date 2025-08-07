// src/data/homePageContent.js

// IMPORTANT: These are DUMMY PLACEHOLDER IMAGE URLs from Pexels.
// They are used to ensure the site displays content even without local assets.
// You MUST REPLACE THESE with your ACTUAL IMAGES from public/assets/images/ AND public/assets/avatars/ LATER.

import GlobalScienceTechnology from '../assets/images/homePage/GlobalScienceTechnology.jpg'
import ArtificialIntelligenceMachineLearning from '../assets/images/homePage/ArtificialIntelligenceMachineLearning.jpg'
import BiotechLifeSciencesForum from '../assets/images/homePage/BiotechLifeSciencesForum.jpg'
import RenewableEnergySustainability from '../assets/images/homePage/RenewableEnergySustainability.jpg'
import ConnectInspireInnovate from '../assets/images/homePage/ConnectInspireInnovate..jpg'


// About Section Images (Pexels URLs related to collaboration/work)
const aboutImg1 = "https://images.pexels.com/photos/3184433/pexels-photo-3184433.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2";
const aboutImg2 = "https://images.pexels.com/photos/1708936/pexels-photo-1708936.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2";

// Conference Section Images (Pexels URLs for conference-like visuals)
const confImg1 = "https://images.pexels.com/photos/3184643/pexels-photo-3184643.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2";
const confImg2 = "https://images.pexels.com/photos/1103970/pexels-photo-1103970.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2";
const confImg3 = "https://images.pexels.com/photos/1181534/pexels-photo-1181534.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2";

// Webinar Section Images (Pexels URLs for online learning/webinars)
const webinarImg1 = "https://images.pexels.com/photos/4144933/pexels-photo-4144933.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2";
const webinarImg2 = "https://images.pexels.com/photos/3762804/pexels-photo-3762804.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2";
const webinarImg3 = "https://images.pexels.com/photos/5926399/pexels-photo-5926399.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2";

// Testimonial Avatars (Pexels URLs for diverse headshots)
const testimonialAvatar1 = "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2";
const testimonialAvatar2 = "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2";
const testimonialAvatar3 = "https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2";

// Four distinct images for the dynamic innovation section layouts (Pexels URLs for various work/collaboration scenes)
const innovationImageA = "https://media.istockphoto.com/id/1363105039/photo/businesspeople-do-video-conference-call-with-big-wall-tv-in-office-meeting-room-diverse-team.jpg?s=612x612&w=0&k=20&c=o7UjhyG3YmLj7jTtSdMkN-K_tE4HSfAq9wWdhiRDFAA=";
const innovationImageB = "https://media.istockphoto.com/id/1481370371/photo/portrait-of-enthusiastic-hispanic-young-woman-working-on-computer-in-a-modern-bright-office.jpg?s=612x612&w=0&k=20&c=8kNce9Ruc9F2KXvnwf0stWQXCwwQTBCrW8efrqhUIa4=";
const innovationImageC = "https://images.pexels.com/photos/3184424/pexels-photo-3184424.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2";
const innovationImageD = "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2";

// heroData is now an array of slides
export const heroSlides = [
  {
    backgroundImage: GlobalScienceTechnology,
    mainTitle: "Global Science & Technology Summit 2025",
    subHeading: "Driving Innovation, Collaboration, And Discovery Across Disciplines",
    button1: { text: "Explore Conferences", link: "/hybrids" },
    button2: { text: "About Helix", link: "/about" },
  },
  {
    backgroundImage: ArtificialIntelligenceMachineLearning,
    mainTitle: "Artificial Intelligence & Machine Learning Congress",
    subHeading: "Join Global Leaders Shaping The Future Of Intelligent Systems",
    button1: { text: "AI & Robotics Tracks", link: "https://arm.helixconferences.com/", target: "_blank" },
    button2: { text: "Submit Your Abstract", link: "/contact" },
  },
  {
    backgroundImage: BiotechLifeSciencesForum,
    mainTitle: "International Biotech & Life Sciences Forum",
    subHeading: "Breakthrough Research In Genomics, Proteomics & Medical Innovation",
    button1: { text: "Biotech Conference Agenda", link: "https://biocon.helixconferences.com/", target: "_blank" },
    button2: { text: "Register To Attend", link: "/buy-a-ticket" },
  },
  {
    backgroundImage: RenewableEnergySustainability,
    mainTitle: "Genetic Engineering & Nanotechnology Summit",
    subHeading: "Bridging Genetics And Nanotechnology For Future Innovations",
    button1: { text: "Explore GENT Sessions", link: "https://gent.helixconferences.com/", target: "_blank" },
    button2: { text: "Partner With Helix", link: "/contact" },
  },
  {
    backgroundImage: ConnectInspireInnovate,
    mainTitle: "Connect. Inspire. Innovate.",
    subHeading: "Empowering Global Scientific Dialogue Through Helix Conferences",
    button1: { text: "Apply As A Speaker", link: "/speakers" },
    button2: { text: "Success Stories", link: "/testimonials" },
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

export const conferencesData = [
  {
    type: "Conference",
    title: "Global Summit on AI & Robotics",
    date: "November 10-12, 2025",
    location: "Virtual/Hybrid",
    image: confImg1,
    link: "/conferences/ai-robotics"
  },
  {
    type: "Conference",
    title: "International Symposium on Biotechnology",
    date: "December 5-7, 2025",
    location: "London, UK",
    image: confImg2,
    link: "/conferences/biotechnology"
  },
  {
    type: "Conference",
    title: "Future of Renewable Energy",
    date: "January 20-22, 2026",
    location: "Dubai, UAE",
    image: confImg3,
    link: "/conferences/renewable-energy"
  },
];

export const webinarsData = [
  {
    type: "Webinar",
    title: "Advancements in Quantum Computing",
    date: "October 15, 2025",
    speaker: "Dr. Jane Doe",
    image: webinarImg1,
    link: "/webinars/quantum-computing"
  },
  {
    type: "Webinar",
    title: "Sustainable Urban Development",
    date: "November 1, 2025",
    speaker: "Prof. John Smith",
    image: webinarImg2,
    link: "/webinars/urban-development"
  },
  {
    type: "Webinar",
    title: "Blockchain in Healthcare",
    date: "November 25, 2025",
    speaker: "Dr. Alice Brown",
    image: webinarImg3,
    link: "/webinars/blockchain"
  },
];

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







