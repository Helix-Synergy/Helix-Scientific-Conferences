// src/data/homePageContent.js

// IMPORTANT: These are DUMMY PLACEHOLDER IMAGE URLs from Pexels.
// They are used to ensure the site displays content even without local assets.
// You MUST REPLACE THESE with your ACTUAL IMAGES from public/assets/images/ AND public/assets/avatars/ LATER.

// Hero Section Backgrounds (Reliable Pexels URLs for diversity)
const heroBg1 = "https://images.pexels.com/photos/3861958/pexels-photo-3861958.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2";
const heroBg2 = "https://images.pexels.com/photos/3735777/pexels-photo-3735777.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2";
const heroBg3 = "https://images.pexels.com/photos/3862632/pexels-photo-3862632.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2";
const heroBg4 = "https://images.pexels.com/photos/3574990/pexels-photo-3574990.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2";
const heroBg5 = "https://images.pexels.com/photos/3184454/pexels-photo-3184454.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2";

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
    backgroundImage: heroBg1,
    mainTitle: "INTERNATIONAL SCIENCE & TECHNOLOGY SUMMIT",
    subHeading: "CONNECTING RESEARCH AND INNOVATION FOR A BRIGHTER FUTURE",
    button1: { text: "Explore Conferences", link: "/conferences" },
    button2: { text: "Learn More", link: "/about" },
  },
  {
    backgroundImage: heroBg2,
    mainTitle: "ADVANCING AI & MACHINE LEARNING",
    subHeading: "JOIN GLOBAL EXPERTS IN THE FRONTIERS OF INTELLIGENCE",
    button1: { text: "View AI Conferences", link: "/conferences/ai-robotics" },
    button2: { text: "Submit Research", link: "/call-for-papers" },
  },
  {
    backgroundImage: heroBg3,
    mainTitle: "BIOTECHNOLOGY FOR A HEALTHIER TOMORROW",
    subHeading: "DISCOVER BREAKTHROUGHS IN LIFE SCIENCES AND MEDICINE",
    button1: { text: "Discover Biotech Events", link: "/conferences/biotechnology" },
    button2: { text: "Register Now", link: "/buy-a-ticket" },
  },
  {
    backgroundImage: heroBg4,
    mainTitle: "GLOBAL ENERGY TRANSITION SUMMIT",
    subHeading: "SHAPING THE FUTURE OF SUSTAINABLE ENERGY",
    button1: { text: "Explore Energy Forums", link: "/conferences/renewable-energy" },
    button2: { text: "Partner With Us", link: "/contact" },
  },
  {
    backgroundImage: heroBg5,
    mainTitle: "NETWORK. COLLABORATE. INNOVATE.",
    subHeading: "YOUR PLATFORM FOR INTERDISCIPLINARY SCIENTIFIC EXCHANGE",
    button1: { text: "Become a Speaker", link: "/speakers" },
    button2: { text: "View Testimonials", link: "/testimonials" },
  },
];

export const statisticsData = [
  { value: 15, label: "Conferences Conducted" },
  { value: 2500, label: "Attendees" },
  { value: 500, label: "Speakers" },
  { value: 1200, label: "Publications" },
];

export const aboutData = {
  heading: "Unlock the Future of Innovation with Helix Conferences !!!",
  subHeading: "Your Gateway to Global Scientific Exchange",
  paragraphs: [
    "Helix Conferences is dedicated to fostering groundbreaking research and technological advancements. We organize international summits that bring together leading scientists, researchers, and industry experts from across the globe.",
    "Our mission is to create a dynamic platform for knowledge exchange, networking, and collaboration, driving innovation in various scientific disciplines. We believe in the power of shared ideas to shape a brighter future.",
  ],
  image1: aboutImg1,
  image2: aboutImg2,
  points: [
    "Cutting-edge research presentations.",
    "Networking opportunities with global experts.",
    "Workshops and interactive sessions.",
    "Publication opportunities in prestigious journals.",
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
    count: 120000,
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
  description: "Helix Conferences proudly supports open access publishing through its network of peer-reviewed journals. Submit your research and contribute to the global scientific community.",
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












// // src/data/homePageContent.js

// // Using external placeholder image URLs for now.
// // REMEMBER TO REPLACE THESE WITH YOUR ACTUAL IMAGES FROM public/assets/images/ LATER.

// // Example images - you'll replace these with your 5 actual banner images
// const heroBg1 = "https://images.pexels.com/photos/3861958/pexels-photo-3861958.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2";
// const heroBg2 = "https://images.pexels.com/photos/3735777/pexels-photo-3735777.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2";
// const heroBg3 = "https://images.pexels.com/photos/3862632/pexels-photo-3862632.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2";
// const heroBg4 = "https://images.pexels.com/photos/3574990/pexels-photo-3574990.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2";
// const heroBg5 = "https://images.pexels.com/photos/3184454/pexels-photo-3184454.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2";

// const aboutImg1 = "https://images.pexels.com/photos/3184433/pexels-photo-3184433.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"; // Can be repurposed if not used elsewhere
// const aboutImg2 = "https://images.pexels.com/photos/1708936/pexels-photo-1708936.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"; // Can be repurposed if not used elsewhere
// const confImg1 = "https://images.pexels.com/photos/3184643/pexels-photo-3184643.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2";
// const confImg2 = "https://images.pexels.com/photos/1103970/pexels-photo-1103970.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2";
// const confImg3 = "https://images.pexels.com/photos/1181534/pexels-photo-1181534.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2";
// const webinarImg1 = "https://images.pexels.com/photos/4144933/pexels-photo-4144933.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2";
// const webinarImg2 = "https://images.pexels.com/photos/3762804/pexels-photo-3762804.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2";
// const webinarImg3 = "https://images.pexels.com/photos/5926399/pexels-photo-5926399.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2";
// const testimonialAvatar1 = "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2";
// const testimonialAvatar2 = "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2";

// // NEW/UPDATED images for the Innovation Section's complex image display, matching image_864204.jpg more closely
// const innovationMainImage = "https://images.pexels.com/photos/4065615/pexels-photo-4065615.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"; // This looks like the main image (person working on laptop) in image_864204.jpg
// const innovationSubImage1 = "https://images.pexels.com/photos/3184436/pexels-photo-3184436.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"; // Group collaborating, for the bottom left
// const innovationSubImage2 = "https://images.pexels.com/photos/3184435/pexels-photo-3184435.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"; // Another individual working, for the bottom right (if distinct)

// // heroData is now an array of slides
// export const heroSlides = [
//   {
//     backgroundImage: heroBg1,
//     mainTitle: "INTERNATIONAL SCIENCE & TECHNOLOGY SUMMIT",
//     subHeading: "CONNECTING RESEARCH AND INNOVATION FOR A BRIGHTER FUTURE",
//     button1: { text: "Explore Conferences", link: "/conferences" },
//     button2: { text: "Learn More", link: "/about" },
//   },
//   {
//     backgroundImage: heroBg2,
//     mainTitle: "ADVANCING AI & MACHINE LEARNING",
//     subHeading: "JOIN GLOBAL EXPERTS IN THE FRONTIERS OF INTELLIGENCE",
//     button1: { text: "View AI Conferences", link: "/conferences/ai-robotics" }, // Example specific link
//     button2: { text: "Submit Research", link: "/call-for-papers" },
//   },
//   {
//     backgroundImage: heroBg3,
//     mainTitle: "BIOTECHNOLOGY FOR A HEALTHIER TOMORROW",
//     subHeading: "DISCOVER BREAKTHROUGHS IN LIFE SCIENCES AND MEDICINE",
//     button1: { text: "Discover Biotech Events", link: "/conferences/biotechnology" },
//     button2: { text: "Register Now", link: "/buy-a-ticket" },
//   },
//   {
//     backgroundImage: heroBg4,
//     mainTitle: "GLOBAL ENERGY TRANSITION SUMMIT",
//     subHeading: "SHAPING THE FUTURE OF SUSTAINABLE ENERGY",
//     button1: { text: "Explore Energy Forums", link: "/conferences/renewable-energy" },
//     button2: { text: "Partner With Us", link: "/contact" },
//   },
//   {
//     backgroundImage: heroBg5,
//     mainTitle: "NETWORK. COLLABORATE. INNOVATE.",
//     subHeading: "YOUR PLATFORM FOR INTERDISCIPLINARY SCIENTIFIC EXCHANGE",
//     button1: { text: "Become a Speaker", link: "/speakers" },
//     button2: { text: "View Testimonials", link: "/testimonials" },
//   },
// ];

// export const statisticsData = [
//   { value: 15, label: "Conferences Conducted" },
//   { value: 2500, label: "Attendees" },
//   { value: 500, label: "Speakers" },
//   { value: 1200, label: "Publications" },
// ];

// export const aboutData = {
//   heading: "Unlock the Future of Innovation with Helix Conferences !!!", // Ensure !!! is here if you want it from data
//   subHeading: "Your Gateway to Global Scientific Exchange",
//   paragraphs: [
//     "Helix Conferences is dedicated to fostering groundbreaking research and technological advancements. We organize international summits that bring together leading scientists, researchers, and industry experts from across the globe.",
//     "Our mission is to create a dynamic platform for knowledge exchange, networking, and collaboration, driving innovation in various scientific disciplines. We believe in the power of shared ideas to shape a brighter future.",
//   ],
//   image1: aboutImg1, // This can be deprecated or repurposed if we use the new innovation images elsewhere
//   image2: aboutImg2, // This can be deprecated or repurposed if we use the new innovation images elsewhere
//   points: [
//     "Cutting-edge research presentations.",
//     "Networking opportunities with global experts.",
//     "Workshops and interactive sessions.",
//     "Publication opportunities in prestigious journals.",
//   ],
//   buttonText: "Read More", // Ensure this exists for the button
//   // UPDATED PROPERTIES FOR INNOVATION SECTION COMPLEX IMAGE DISPLAY
//   innovationImages: {
//     main: innovationMainImage,
//     sub1: innovationSubImage1, // Corresponds to the bottom-left image in image_864204.jpg
//     sub2: innovationSubImage2, // Corresponds to the bottom-right image in image_864204.jpg
//   },
//   satisfiedClients: {
//     count: 120000,
//     label: "Satisfied Clients",
//     avatars: [ // Paths to small avatar images for the overlay
//       // REMEMBER TO REPLACE THESE WITH YOUR ACTUAL LOCAL AVATAR IMAGES
//       "/assets/avatars/avatar-male-1.jpg", // Example local path
//       "/assets/avatars/avatar-female-1.jpg", // Example local path
//       "/assets/avatars/avatar-male-2.jpg", // Example local path
//     ],
//   },
// };

// export const conferencesData = [
//   {
//     type: "Conference",
//     title: "Global Summit on AI & Robotics",
//     date: "November 10-12, 2025",
//     location: "Virtual/Hybrid",
//     image: confImg1,
//     link: "/conferences/ai-robotics"
//   },
//   {
//     type: "Conference",
//     title: "International Symposium on Biotechnology",
//     date: "December 5-7, 2025",
//     location: "London, UK",
//     image: confImg2,
//     link: "/conferences/biotechnology"
//   },
//   {
//     type: "Conference",
//     title: "Future of Renewable Energy",
//     date: "January 20-22, 2026",
//     location: "Dubai, UAE",
//     image: confImg3,
//     link: "/conferences/renewable-energy"
//   },
// ];

// export const webinarsData = [
//   {
//     type: "Webinar",
//     title: "Advancements in Quantum Computing",
//     date: "October 15, 2025",
//     speaker: "Dr. Jane Doe",
//     image: webinarImg1,
//     link: "/webinars/quantum-computing"
//   },
//   {
//     type: "Webinar",
//     title: "Sustainable Urban Development",
//     date: "November 1, 2025",
//     speaker: "Prof. John Smith",
//     image: webinarImg2,
//     link: "/webinars/urban-development"
//   },
//   {
//     type: "Webinar",
//     title: "Blockchain in Healthcare",
//     date: "November 25, 2025",
//     speaker: "Dr. Alice Brown",
//     image: webinarImg3,
//     link: "/webinars/blockchain"
//   },
// ];

// export const journalsData = {
//   heading: "Helix Open Access Journals",
//   subHeading: "Publish Your Research with Global Reach",
//   description: "Helix Conferences proudly supports open access publishing through its network of peer-reviewed journals. Submit your research and contribute to the global scientific community.",
//   button: { text: "View All Journals", link: "/journals" }
// };

// export const testimonialsData = [
//   {
//     quote: "Attending Helix Conferences has been a game-changer for my research. The quality of presentations and networking opportunities are unparalleled.",
//     author: "Dr. Sarah Chen",
//     title: "Research Scientist, Tech Innovations Inc.",
//     avatar: testimonialAvatar1,
//   },
//   {
//     quote: "The webinars provided invaluable insights into emerging technologies. Highly recommended for anyone in the tech industry.",
//     author: "Mr. David Lee",
//     title: "Software Engineer, Global Solutions",
//     avatar: testimonialAvatar2,
//   },
//   {
//     quote: "A truly international platform! I connected with collaborators from different continents, leading to exciting new projects.",
//     author: "Prof. Emily White",
//     title: "University Professor, Global University",
//     avatar: testimonialAvatar1,
//   },
// ];

// export const contactData = {
//   heading: "Get In Touch",
//   subHeading: "Have questions? We're here to help.",
//   address: "Helix Conferences Office, 123 Science Blvd, Innovation City, 500081, India",
//   phone: "+91 123 456 7890",
//   email: "info@helixconferences.com",
// };

// export const footerLinks = {
//   quickLinks: [
//     { text: "Home", link: "/" },
//     { text: "About Us", link: "/about" },
//     { text: "Conferences", link: "/conferences" },
//     { text: "Journals", link: "/journals" },
//     { text: "Contact", link: "/contact" },
//   ],
//   services: [
//     { text: "Hybrid Conferences", link: "/hybrids" },
//     { text: "Webinars", link: "/webinars" },
//     { text: "Call for Papers", link: "/call-for-papers" },
//     { text: "Speakers", link: "/speakers" },
//     { text: "Committees", link: "/committees" },
//   ],
//   support: [
//     { text: "FAQs", link: "/faqs" },
//     { text: "Privacy Policy", link: "/privacy-policy" },
//     { text: "Terms & Conditions", link: "/terms-conditions" },
//   ]
// };