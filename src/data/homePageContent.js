// src/data/homePageContent.js

// IMPORTANT: These are DUMMY PLACEHOLDER IMAGE URLs from Pexels.
// They are used to ensure the site displays content even without local assets.
// You MUST REPLACE THESE with your ACTUAL IMAGES from public/assets/images/ AND public/assets/avatars/ LATER.

import GlobalScienceTechnology from "../assets/images/homePage/GlobalScienceTechnology.jpg";
import ArtificialIntelligenceMachineLearning from "../assets/images/homePage/ArtificialIntelligenceMachineLearning.jpg";
import BiotechLifeSciencesForum from "../assets/images/homePage/BiotechLifeSciencesForum.jpg";
import RenewableEnergySustainability from "../assets/images/homePage/RenewableEnergySustainability.jpg";
import ConnectInspireInnovate from "../assets/images/homePage/ConnectInspireInnovate..jpg";

import innovationImageA from "../assets/images/homePage/innovationImageA.jpg";
import innovationImageB from "../assets/images/homePage/innovationImageB.jpg";
import innovationImageC from "../assets/images/homePage/innovationImageC.jpg";
import innovationImageD from "../assets/images/homePage/innovationImageD.jpg";
import innovationImageE from "../assets/images/homePage/innovationImageE.jpg";
import Foodmeet_2026 from "../assets/images/Hybrid/Foodmeet_2026.jpg";

import FoodMircobiome from "../assets/images/Hybrid/FoodMicroBiome.jpg";
import Agritech from "../assets/images/Hybrid/Agritech.jpg";
import FoodTech from "../assets/images/Hybrid/FoodTech.jpg";
import Millets from "../assets/images/Hybrid/Millets.jpg";
// About Section Images (Pexels URLs related to collaboration/work)
const aboutImg1 =
  "https://images.pexels.com/photos/3184433/pexels-photo-3184433.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2";
const aboutImg2 =
  "https://images.pexels.com/photos/1708936/pexels-photo-1708936.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2";

// Testimonial Avatars (Pexels URLs for diverse headshots)
const testimonialAvatar1 =
  "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2";
const testimonialAvatar2 =
  "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2";
const testimonialAvatar3 =
  "https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2";



export const heroSlides = [
  {
    backgroundImage: Foodmeet_2026,
    mainTitle: " Food Agriculture & Environmental Sciences Forum",
    subHeading: "FOODMEET-2026  - April 23-24, 2026 | Barcelona | Spain",
    button1: {
      text: "View Conference Details",
      link: "https://foodmeet.helixconferences.com/",
      target: "_blank",
    },
    button2: { text: "Register Now", link: "/buy-a-ticket" },
  },
  // FoodMic
  {
    backgroundImage: FoodMircobiome,
    mainTitle: "Food Microbiome Summit",
    subHeading: "FOOD MICROBIOME-2026 - April 23-24, 2026 | Barcelona | Spain",
    button1: {
      text: "View Conference Details",
      link: "https://foodmicrobiome.helixconferences.com/",
      target: "_blank",
    },
    button2: { text: "Register Now", link: "/buy-a-ticket" },
  },
  {
    backgroundImage: Agritech,
    mainTitle: "Regenerative AgriTech Forum",
    subHeading: "AGRIREGEN-2026 - April 23-24, 2026 | Barcelona | Spain",
    button1: {
      text: "View Conference Details",
      link: "https://agritech.helixconferences.com/",
      target: "_blank",
    },
    button2: { text: "Register Now", link: "/buy-a-ticket" },
  },
  {
    backgroundImage: FoodTech,
    mainTitle: "Future FoodTech Expo",
    subHeading: "FOODTECH-2026 - April 23-24, 2026 | Barcelona | Spain",
    button1: {
      text: "View Conference Details",
      link: "https://foodtech.helixconferences.com/",
      target: "_blank",
    },
    button2: { text: "Register Now", link: "/buy-a-ticket" },
  },
  {
    backgroundImage: Millets,
    mainTitle: "Millets & Climate-Resilient Agriculture Summit",
    subHeading: "MILLETS-2026 - April 23-24, 2026 | Barcelona | Spain",
    button1: {
      text: "View Conference Details",
      link: "https://millets.helixconferences.com/",
      target: "_blank",
    },
    button2: { text: "Register Now", link: "/buy-a-ticket" },
  },
  

  // {
  //   backgroundImage: Nursing,
  //   mainTitle: " Nursing & Nurse Practices Conclave",
  //   subHeading: "NURSESUMMIT-2026 - Nov 19-20, 2026 | Dubai | UAE",
  //   button1: { text: "View Conference Details", link: "/", target: "_blank" },
  //   button2: { text: "Register Now", link: "/buy-a-ticket" },
  // },
];

export const statisticsData = [
  { value: 27, label: "Executed Conferences" },
  { value: 137, label: "Eminent Speakers" },
  { value: 846, label: "Speakers" },
  { value: 2145, label: "Publications" },
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
    innovationImageE,
  ],
  satisfiedClients: {
    count: 3500,
    label: "Satisfied Clients",
    // These are also Pexels URLs now to avoid local file dependency
    avatars: [testimonialAvatar1, testimonialAvatar2, testimonialAvatar3],
  },
};

export const journalsData = {
  heading: "Helix Open Access Journals",
  subHeading: "Publish Your Research with Global Reach",
  description:
    "Helix Conferences proudly supports open access publishing through its network of peer-reviewed Journals. Submit your Research and contribute to the Global Scientific community.",
  button: { text: "View All Journals", link: "/journals" },
};

export const testimonialsData = [
  {
    quote:
      "Attending Helix Conferences has been a game-changer for my research. The quality of presentations and networking opportunities are unparalleled.",
    author: "Dr. Sarah Chen",
    title: "Research Scientist, Tech Innovations Inc.",
    avatar: testimonialAvatar1,
  },
  {
    quote:
      "The webinars provided invaluable insights into emerging technologies. Highly recommended for anyone in the tech industry.",
    author: "Mr. David Lee",
    title: "Software Engineer, Global Solutions",
    avatar: testimonialAvatar2,
  },
  {
    quote:
      "A truly international platform! I connected with collaborators from different continents, leading to exciting new projects.",
    author: "Prof. Emily White",
    title: "University Professor, Global University",
    avatar: testimonialAvatar3,
  },
];

export const contactData = {
  heading: "Get In Touch",
  subHeading: "Have questions? We're here to help.",
  address:
    "Helix Conferences Office, 123 Science Blvd, Innovation City, 500081, India",
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
  ],
};
