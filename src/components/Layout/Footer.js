// // src/components/Footer.js
// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';

// // Import Heroicons for general UI and navigation icons
// import {
//   MapPinIcon,
//   PhoneIcon,
//   EnvelopeIcon,
//   HomeIcon,
//   BookOpenIcon,
//   NewspaperIcon,
//   PencilSquareIcon,
//   TicketIcon,
//   ArrowRightIcon,
// } from '@heroicons/react/24/outline';

// // Import Font Awesome components and specific brand icons
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import {
//   faWhatsapp,
//   faFacebookF,
//   faTwitter,
//   faInstagram,
//   faLinkedinIn,
//   faYoutube,
//   faReddit,
// } from '@fortawesome/free-brands-svg-icons';
// import Logo from '../assets/images/Header-logo.png'


// function Footer() {
//   const [email, setEmail] = useState('');
//   const [message, setMessage] = useState('');
//   const [messageColor, setMessageColor] = useState('text-white');

//   const handleSubscribe = async (e) => {
//     e.preventDefault();
//     setMessage('');

//     if (!email) {
//       setMessage('Email cannot be empty.');
//       setMessageColor('text-red-400');
//       return;
//     }

//     if (!/^\S+@\S+\.\S+$/.test(email)) {
//       setMessage('Please enter a valid email address.');
//       setMessageColor('text-red-400');
//       return;
//     }

//     try {
//       // Simulate API call
//       await new Promise(resolve => setTimeout(resolve, 1000));
//       setMessage('Thank you for subscribing!');
//       setMessageColor('text-green-400');
//       setEmail('');
//     } catch (error) {
//       console.error('Subscription error:', error);
//       setMessage('There was an error. Please try again later.');
//       setMessageColor('text-red-400');
//     }
//   };

//   // Data for navigation links with corresponding Heroicons
//   const navigationLinks = [
//     { name: 'Home', to: '/', icon: <HomeIcon className="w-5 h-5 mr-2" /> },
//     { name: 'About', to: '/about', icon: <BookOpenIcon className="w-5 h-5 mr-2" /> },
//     { name: 'Journals', to: '/journals', icon: <NewspaperIcon className="w-5 h-5 mr-2" /> },
//     { name: 'Blogs', to: '/blogs', icon: <PencilSquareIcon className="w-5 h-5 mr-2" /> },
//     { name: 'Contact', to: '/contact', icon: <EnvelopeIcon className="w-5 h-5 mr-2" /> },
//     { name: 'Buy A Ticket', to: '/buy-a-ticket', icon: <TicketIcon className="w-5 h-5 mr-2" /> },
//   ];

//   // Data for social media icons with their specific brand colors and Font Awesome icons
//   const socialMediaLinks = [
//     { name: 'Facebook', icon: faFacebookF, href: 'https://www.facebook.com/people/Helix-Conference-LLC/61570321457803/', iconColorClass: 'text-blue-500' },
//     { name: 'Instagram', icon: faInstagram, href: 'https://www.instagram.com/helix_scientific_conferences/?fbclid=IwY2xjawLPDsJleHRuA2FlbQIxMQBicmlkETFHY1owa2l4SVh3a1U4dUJiAR5fK64x9qd1yRrehrq3_DcHRirw6NfGpHHFF2CeeIh1zexrKM8wb5Lw_8SVsg_aem__iAurQPmLh5EAw3hA20cAw', iconColorClass: 'text-pink-500' },
//     { name: 'LinkedIn', icon: faLinkedinIn, href: 'https://www.linkedin.com/company/helixscientificconferences/?viewAsMember=true', iconColorClass: 'text-blue-700' },
//     { name: 'Twitter', icon: faTwitter, href: 'https://x.com/Helixconfe69272', iconColorClass: 'text-blue-400' },
//     { name: 'YouTube', icon: faYoutube, href: 'https://www.youtube.com/@Helixconferences', iconColorClass: 'text-red-600' },
//     { name: 'Reddit', icon: faReddit, href: 'https://www.reddit.com/user/Salty-Ad6381/', iconColorClass: 'text-orange-500' },
//   ];

//   return (
//     <footer className="relative z-30">
//       {/* Combined Footer Section with Gradient Background */}
//       <div
//         className="relative overflow-hidden py-8 md:py-10 text-gray-300"
//         style={{
//           background: 'linear-gradient(to right, #4A2868, #2E659A)',
//           boxShadow: '0 -8px 30px rgba(0, 0, 0, 0.5)',
//         }}
//       >
//         <div className="container mx-auto px-4">
//           {/* Main Grid for Footer Columns - Ensuring equal height and full space */}
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-y-12 gap-x-8 h-full">

//             {/* Column 1: Logo & Contact Info */}
//             {/* Removed items-center and text-center for left alignment */}
//             <div className="flex flex-col items-start text-left">
//               <div className="mb-2" >
//                 <Link to="/" className="inline-block transform transition-transform duration-300 hover:scale-105">
//                   <img src={Logo} alt="Helix Conferences Logo" className="w-36 h-auto" />
//                 </Link>
//               </div>
//               <div className="space-y-3 text-sm">
//                 {/* Changed justify-center to justify-start */}
//                 <p className="flex items-center justify-start group">
//                   <PhoneIcon className="w-5 h-5 mr-3 text-blue-300 flex-shrink-0 animate-pulse-subtle" />
//                   <a href="tel:+17576567778" className="hover:text-white transition-colors duration-200">+1757 656 7778</a>
//                 </p>
//                 <p className="flex items-center justify-start group">
//                   <PhoneIcon className="w-5 h-5 mr-3 text-blue-300 flex-shrink-0 animate-pulse-subtle" />
//                   <a href="tel:+919000146000" className="hover:text-white transition-colors duration-200">+91 9000146000</a>
//                 </p>
//                 <p className="flex items-center justify-start group">
//                   <FontAwesomeIcon icon={faWhatsapp} className="w-5 h-5 mr-3 text-green-400 flex-shrink-0 animate-pulse-subtle" />
//                   <a href="https://wa.me/+17159905583" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors duration-200">
//                     +17159905583
//                   </a>
//                 </p>
//                 <p className="flex items-center justify-start group">
//                   <EnvelopeIcon className="w-5 h-5 mr-3 text-red-300 flex-shrink-0 animate-pulse-subtle" />
//                   <a href="mailto:hello@helixconferences.com" className="hover:text-white transition-colors duration-200">
//                     hello@helixconferences.com
//                   </a>
//                 </p>
//                 <address className="not-italic flex items-start justify-start group">
//                   <MapPinIcon className="w-5 h-5 mr-3 text-yellow-300 flex-shrink-0 mt-1 animate-pulse-subtle" />
//                   <span className="max-w-[250px]">
//                     Helix Conferences <br />
//                     45573, Shepard Drive, Suit#101, <br />
//                     Sterling, Virginia-20164, USA
//                   </span>
//                 </address>
//               </div>
//             </div>

//             {/* Column 2: Our Navigation */}
//             {/* Removed items-center and text-center for left alignment */}
//             <div className="flex flex-col items-start text-left">
//               <h4 className="text-xl font-semibold text-white mb-6">Our Navigation</h4>
//               <ul className="space-y-3 text-base">
//                 {navigationLinks.map((link, index) => (
//                   <li key={index}>
//                     {/* Changed justify-center to justify-start */}
//                     <Link
//                       to={link.to}
//                       className="flex items-center justify-start hover:text-blue-400 transition-colors duration-200 relative group overflow-hidden"
//                     >
//                       {link.icon}
//                       <span className="relative z-10">{link.name}</span>
//                       <span className="absolute bottom-0 left-0 w-full h-[2px] bg-blue-500 transform scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-300 ease-out-quad"></span>
//                     </Link>
//                   </li>
//                 ))}
//               </ul>
//             </div>

//             {/* Column 3: Our Social Media */}
//             {/* Removed items-center and text-center for left alignment */}
//             <div className="flex flex-col items-start text-left">
//               <h4 className="text-xl font-semibold text-white mb-6">Our Social Media</h4>
//               <ul className="space-y-4 w-full">
//                 {socialMediaLinks.map((social, index) => (
//                   <li key={index}>
//                     <a
//                       href={social.href}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       // Changed justify-center to justify-start
//                       className="group flex items-center rounded-lg transition-all duration-300 ease-in-out
//                                  hover:scale-[1.02]
//                                  transform cursor-pointer justify-start"
//                       aria-label={social.name}
//                     >
//                       <div
//                         className="flex items-center justify-center w-6 h-6 rounded-full mr-4 shadow-md transition-all duration-300 transform group-hover:rotate-6"
//                         style={{
//                           background: social.iconColorClass === 'text-pink-500'
//                             ? 'linear-gradient(45deg,rgb(53, 20, 120),rgba(220, 39, 66, 0.42),rgba(188, 24, 136, 0.27))'
//                             : (social.name === 'Twitter'
//                                 ? '#000000'
//                                 : social.iconColorClass.replace('text-', '#').replace('400', '600').replace('500', '700')),
//                         }}
//                       >
//                         <FontAwesomeIcon
//                           icon={social.icon}
//                           className={`text-white text-sm transition-colors duration-300 group-hover:text-opacity-80`}
//                         />
//                       </div>
//                       <span className="text-sm font-medium text-gray-200 group-hover:text-white transition-colors duration-300">
//                         {social.name}
//                       </span>
//                     </a>
//                   </li>
//                 ))}
//               </ul>
//             </div>

//             {/* Column 4: Subscribe & Discover Button */}
//             {/* Changed items-center and text-center to items-start and text-left */}
//             <div className="flex flex-col items-start text-left">
//               <h4 className="text-xl font-semibold text-white mb-6">Subscribe</h4>
//               <p className="text-sm mb-4">Subscribe to our newsletter for the latest updates.</p>
//               {/* Removed mx-auto for left alignment */}
//               <form onSubmit={handleSubscribe} className="flex flex-col w-full max-w-[180px] md:mx-0">
//                 <input
//                   type="email"
//                   placeholder="Get News & Updates"
//                   className="p-3 mb-3 bg-white bg-opacity-10 border border-gray-700 rounded-md text-white placeholder-gray-400
//                              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   required
//                 />
//                 <button
//                   type="submit"
//                   className="
//                     bg-blue-600/30 backdrop-blur-sm border border-white/20
//                     hover:bg-blue-700/40 active:translate-y-0.5
//                     text-white font-bold py-2 px-5 rounded-md transition-all duration-300
//                     w-full flex items-center justify-center text-base
//                     shadow-xl shadow-white/10 hover:shadow-2xl
//                   "
//                 >
//                   Subscribe
//                 </button>
//               </form>

//               {/* Message for subscription */}
//               {message && (
//                 <p className={`mt-4 text-sm ${messageColor} px-3 py-1 rounded-md`}
//                    style={{ backgroundColor: messageColor.includes('green') ? 'rgba(40, 167, 69, 0.1)' : 'rgba(220, 53, 69, 0.1)' }}>
//                   {message}
//                 </p>
//               )}

//               {/* Discover Button - Now a React Router Link */}
//               {/* Removed mx-auto for left alignment */}
//               <Link
//                 to="/discover"
//                 className="
//                   mt-4
//                   bg-green-600/30 backdrop-blur-sm border border-white/20
//                   hover:bg-green-700/40 active:translate-y-0.5
//                   text-white font-bold py-2 px-5 rounded-md transition-all duration-300
//                   w-full max-w-[180px] md:mx-0 flex items-center justify-center text-base
//                   shadow-xl shadow-white/10 hover:shadow-2xl
//                 "
//               >
//                 <ArrowRightIcon className="w-5 h-5 mr-3" />
//                 Discover
//               </Link>
//             </div>
//           </div>

//           {/* Footer Bottom Section (Copyright and Terms) - NOW INSIDE THE GRADIENT DIV */}
//           <div className="border-t border-gray-800 pt-6 mt-8">
//             {/* Added md:justify-between to ensure space between copyright and links on md+ */}
//             <div className="container mx-auto px-4 flex flex-col md:flex-row justify-center md:justify-between items-center text-sm text-gray-400">
//               {/* Copyright text: always centered */}
//               <p className="mb-4 md:mb-0 text-center">
//                 Copyright © {new Date().getFullYear()}{' '}
//                 <Link
//                   to="/helix-conferences"
//                   className="hover:opacity-80 transition-opacity duration-200
//                              bg-gradient-to-r from-purple-400 to-blue-400
//                              bg-clip-text text-transparent font-semibold"
//                 >
//                   Helix Conferences
//                 </Link>
//                 . All Rights Reserved.
//               </p>
//               {/* Policy links: stacked on mobile, row on md+, centered on mobile */}
//               <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-6">
//                 <Link to="/terms-of-use" className="hover:text-white transition-colors duration-200 text-center">Terms of Use</Link>
//                 <Link to="/privacy-policy" className="hover:text-white transition-colors duration-200 text-center">Privacy Policy</Link>
//               </div>
//             </div>
//           </div>

//         </div> {/* End of container */}
//       </div> {/* End of main gradient div */}
//     </footer>
//   );
// }

// export default Footer;





// // src/components/Footer.js
// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';

// // Import Heroicons for general UI and navigation icons
// import {
//   MapPinIcon,
//   PhoneIcon,
//   EnvelopeIcon,
//   HomeIcon,
//   BookOpenIcon,
//   NewspaperIcon,
//   PencilSquareIcon,
//   TicketIcon,
//   ArrowRightIcon,
// } from '@heroicons/react/24/outline';

// // Import Font Awesome components and specific brand icons
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import {
//   faWhatsapp,
//   faFacebookF,
//   faTwitter,
//   faInstagram,
//   faLinkedinIn,
//   faYoutube,
//   faReddit,
// } from '@fortawesome/free-brands-svg-icons';
// import Logo from '../assets/images/Header-logo.png'


// function Footer() {
//   const [email, setEmail] = useState('');
//   const [message, setMessage] = useState('');
//   const [messageColor, setMessageColor] = useState('text-white');

//   const handleSubscribe = async (e) => {
//     e.preventDefault();
//     setMessage('');

//     if (!email) {
//       setMessage('Email cannot be empty.');
//       setMessageColor('text-red-400');
//       return;
//     }

//     if (!/^\S+@\S+\.\S+$/.test(email)) {
//       setMessage('Please enter a valid email address.');
//       setMessageColor('text-red-400');
//       return;
//     }

//     try {
//       // Simulate API call
//       await new Promise(resolve => setTimeout(resolve, 1000));
//       setMessage('Thank you for subscribing!');
//       setMessageColor('text-green-400');
//       setEmail('');
//     } catch (error) {
//       console.error('Subscription error:', error);
//       setMessage('There was an error. Please try again later.');
//       setMessageColor('text-red-400');
//     }
//   };

//   // Data for navigation links with corresponding Heroicons
//   const navigationLinks = [
//     { name: 'Home', to: '/', icon: <HomeIcon className="w-5 h-5 mr-2" /> },
//     { name: 'About', to: '/about', icon: <BookOpenIcon className="w-5 h-5 mr-2" /> },
//     { name: 'Journals', to: '/journals', icon: <NewspaperIcon className="w-5 h-5 mr-2" /> },
//     { name: 'Blogs', to: '/blogs', icon: <PencilSquareIcon className="w-5 h-5 mr-2" /> },
//     { name: 'Contact', to: '/contact', icon: <EnvelopeIcon className="w-5 h-5 mr-2" /> },
//     { name: 'Buy A Ticket', to: '/buy-a-ticket', icon: <TicketIcon className="w-5 h-5 mr-2" /> },
//   ];

//   // Data for social media icons with their specific brand colors and Font Awesome icons
//   const socialMediaLinks = [
//     { name: 'Facebook', icon: faFacebookF, href: 'https://www.facebook.com/people/Helix-Conference-LLC/61570321457803/', iconColorClass: 'bg-blue-500' },
//     { name: 'Instagram', icon: faInstagram, href: 'https://www.instagram.com/helix_scientific_conferences/?fbclid=IwY2xjawLPDsJleHRuA2FlbQIxMQBicmlkETFHY1owa2l4SVh3a1U4dUJiAR5fK64x9qd1yRrehrq3_DcHRirw6NfGpHHFF2CeeIh1zexrKM8wb5Lw_8SVsg_aem__iAurQPmLh5EAw3hA20cAw', iconColorClass: 'bg-pink-500' },
//     { name: 'LinkedIn', icon: faLinkedinIn, href: 'https://www.linkedin.com/company/helixscientificconferences/?viewAsMember=true', iconColorClass: 'bg-blue-700' },
//     { name: 'Twitter', icon: faTwitter, href: 'https://x.com/Helixconfe69272', iconColorClass: 'bg-blue-400' },
//     { name: 'YouTube', icon: faYoutube, href: 'https://www.youtube.com/@Helixconferences', iconColorClass: 'bg-red-600' },
//     { name: 'Reddit', icon: faReddit, href: 'https://www.reddit.com/user/Salty-Ad6381/', iconColorClass: 'bg-orange-500' },
//   ];

//   return (
//     <footer className="relative z-30">
//       {/* Combined Footer Section with Black Glassmorphism Background */}
//       <div
//         className="relative overflow-hidden py-8 md:py-10 text-gray-300 glassmorphism-footer"
        
//       >
//         <div className="container mx-auto px-4">
//           {/* Main Grid for Footer Columns - Ensuring equal height and full space */}
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-y-12 gap-x-8 h-full">

//             {/* Column 1: Logo & Contact Info */}
//             <div className="flex flex-col items-start text-left">
//               <div className="mb-2" >
//                 {/* Ensure your logo looks good on a dark/transparent background */}
//                 <Link to="/" className="inline-block transform transition-transform duration-300 hover:scale-105">
//                   <img src={Logo} alt="Helix Conferences Logo" className="w-36 h-auto" />
//                 </Link>
//               </div>
//               <div className="space-y-3 text-sm">
//                 {/* WhatsApp moved to the top */}
//                 <p className="flex items-center justify-start group">
//                   <FontAwesomeIcon icon={faWhatsapp} className="w-5 h-5 mr-3 text-green-400 flex-shrink-0 animate-pulse-subtle" />
//                   <a href="https://wa.me/+17159905583" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors duration-200">
//                     +17159905583
//                   </a>
//                 </p>
//                 <p className="flex items-center justify-start group">
//                   <PhoneIcon className="w-5 h-5 mr-3 text-blue-300 flex-shrink-0 animate-pulse-subtle" />
//                   <a href="tel:+17576567778" className="hover:text-white transition-colors duration-200">+1757 656 7778</a>
//                 </p>
//                 <p className="flex items-center justify-start group">
//                   <PhoneIcon className="w-5 h-5 mr-3 text-blue-300 flex-shrink-0 animate-pulse-subtle" />
//                   <a href="tel:+919000146000" className="hover:text-white transition-colors duration-200">+91 9000146000</a>
//                 </p>
//                 <p className="flex items-center justify-start group">
//                   <EnvelopeIcon className="w-5 h-5 mr-3 text-red-300 flex-shrink-0 animate-pulse-subtle" />
//                   <a href="mailto:hello@helixconferences.com" className="hover:text-white transition-colors duration-200">
//                     hello@helixconferences.com
//                   </a>
//                 </p>
//                 <address className="not-italic flex items-start justify-start group">
//                   <MapPinIcon className="w-5 h-5 mr-3 text-yellow-300 flex-shrink-0 mt-1 animate-pulse-subtle" />
//                   <span className="max-w-[250px]">
//                     Helix Conferences <br />
//                     45573, Shepard Drive, Suit#101, <br />
//                     Sterling, Virginia-20164, USA
//                   </span>
//                 </address>
//               </div>
//             </div>

//             {/* Column 2: Our Navigation */}
//             <div className="flex flex-col items-start text-left">
//               <h4 className="text-xl font-semibold text-white mb-6">Our Navigation</h4>
//               <ul className="space-y-3 text-base">
//                 {navigationLinks.map((link, index) => (
//                   <li key={index}>
//                     <Link
//                       to={link.to}
//                       className="flex items-center justify-start hover:text-blue-400 transition-colors duration-200 relative group overflow-hidden"
//                     >
//                       {link.icon}
//                       <span className="relative z-10">{link.name}</span>
//                       <span className="absolute bottom-0 left-0 w-full h-[2px] bg-blue-500 transform scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-300 ease-out-quad"></span>
//                     </Link>
//                   </li>
//                 ))}
//               </ul>
//             </div>

//             {/* Column 3: Our Social Media */}
//             <div className="flex flex-col items-start text-left">
//               <h4 className="text-xl font-semibold text-white mb-6">Our Social Media</h4>
//               <ul className="space-y-4 w-full">
//                 {socialMediaLinks.map((social, index) => (
//                   <li key={index}>
//                     <a
//                       href={social.href}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="group flex items-center rounded-lg transition-all duration-300 ease-in-out
//                                  hover:scale-[1.02]
//                                  transform cursor-pointer justify-start"
//                       aria-label={social.name}
//                     >
//                       <div
//                         className={`flex items-center justify-center w-8 h-8 rounded-full mr-4 shadow-md transition-all duration-300 transform group-hover:rotate-6
//                                     bg-white/10                      // Default transparent white background
//                                     group-hover:${social.iconColorClass}  // Apply brand color on hover
//                                     ${social.iconColorClass === 'bg-pink-500' ? 'group-hover:bg-gradient-to-br group-hover:from-purple-500 group-hover:via-red-500 group-hover:to-yellow-500' : ''} // Instagram gradient on hover
//                                     `}
//                       >
//                         <FontAwesomeIcon
//                           icon={social.icon}
//                           className={`text-white text-base transition-colors duration-300`} // Icon always white, no hover color
//                         />
//                       </div>
//                       <span className="text-sm font-medium text-gray-200 group-hover:text-white transition-colors duration-300">
//                         {social.name}
//                       </span>
//                     </a>
//                   </li>
//                 ))}
//               </ul>
//             </div>

//             {/* Column 4: Subscribe & Discover Button */}
//             <div className="flex flex-col items-start text-left">
//               <h4 className="text-xl font-semibold text-white mb-6">Subscribe</h4>
//               <p className="text-sm mb-4">Subscribe to our newsletter for the latest updates.</p>
//               <form onSubmit={handleSubscribe} className="flex flex-col w-full max-w-[180px] md:mx-0">
//                 <input
//                   type="email"
//                   placeholder="Get News & Updates"
//                   className="p-3 mb-3 bg-white bg-opacity-10 border border-gray-700 rounded-md text-white placeholder-gray-400
//                                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   required
//                 />
//                 <button
//                   type="submit"
//                   className="
//                     bg-blue-600/30 backdrop-blur-sm border border-white/20
//                     hover:bg-blue-700/40 active:translate-y-0.5
//                     text-white font-bold py-2 px-5 rounded-md transition-all duration-300
//                     w-full flex items-center justify-center text-base
//                     shadow-xl shadow-white/10 hover:shadow-2xl
//                   "
//                 >
//                   Subscribe
//                 </button>
//               </form>

//               {/* Message for subscription */}
//               {message && (
//                 <p className={`mt-4 text-sm ${messageColor} px-3 py-1 rounded-md`}
//                    style={{ backgroundColor: messageColor.includes('green') ? 'rgba(40, 167, 69, 0.1)' : 'rgba(220, 53, 69, 0.1)' }}>
//                   {message}
//                 </p>
//               )}

//               {/* Discover Button - Now a React Router Link */}
//               <Link
//                 to="/discover"
//                 className="
//                   mt-4
//                   bg-green-600/30 backdrop-blur-sm border border-white/20
//                   hover:bg-green-700/40 active:translate-y-0.5
//                   text-white font-bold py-2 px-5 rounded-md transition-all duration-300
//                   w-full max-w-[180px] md:mx-0 flex items-center justify-center text-base
//                   shadow-xl shadow-white/10 hover:shadow-2xl
//                 "
//               >
//                 <ArrowRightIcon className="w-5 h-5 mr-3" />
//                 Discover
//               </Link>
//             </div>
//           </div>

//           {/* Footer Bottom Section (Copyright and Terms) */}
//           <div className="border-t border-gray-800 pt-6 mt-8">
//             <div className="container mx-auto px-4 flex flex-col md:flex-row justify-center md:justify-between items-center text-sm text-gray-400">
//               <p className="mb-4 md:mb-0 text-center">
//                 Copyright © {new Date().getFullYear()}{' '}
//                 <Link
//                   to="/helix-conferences"
//                   className="hover:opacity-80 transition-opacity duration-200
//                                bg-gradient-to-r from-purple-400 to-blue-400
//                                bg-clip-text text-transparent font-semibold"
//                 >
//                   Helix Conferences
//                 </Link>
//                 . All Rights Reserved.
//               </p>
//               <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-6">
//                 <Link to="/terms-of-use" className="hover:text-white transition-colors duration-200 text-center">Terms of Use</Link>
//                 <Link to="/privacy-policy" className="hover:text-white transition-colors duration-200 text-center">Privacy Policy</Link>
//               </div>
//             </div>
//           </div>

//         </div> {/* End of container */}
//       </div> {/* End of main glassmorphism div */}
//     </footer>
//   );
// }

// export default Footer;












// // src/components/Footer.js
// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';

// // Import Heroicons for general UI and navigation icons
// import {
//   MapPinIcon,
//   PhoneIcon,
//   EnvelopeIcon,
//   HomeIcon,
//   BookOpenIcon,
//   NewspaperIcon,
//   PencilSquareIcon,
//   TicketIcon,
//   ArrowRightIcon,
// } from '@heroicons/react/24/outline';

// // Import Font Awesome components and specific brand icons
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import {
//   faWhatsapp,
//   faFacebookF,
//   faTwitter,
//   faInstagram,
//   faLinkedinIn,
//   faYoutube,
//   faReddit,
// } from '@fortawesome/free-brands-svg-icons';
// import Logo from '../../assets/images/Header-logo.png'


// function Footer() {
//   const [email, setEmail] = useState('');
//   const [message, setMessage] = useState('');
//   const [messageColor, setMessageColor] = useState('text-white');

//   const handleSubscribe = async (e) => {
//     e.preventDefault();
//     setMessage('');

//     if (!email) {
//       setMessage('Email cannot be empty.');
//       setMessageColor('text-red-400');
//       return;
//     }

//     if (!/^\S+@\S+\.\S+$/.test(email)) {
//       setMessage('Please enter a valid email address.');
//       setMessageColor('text-red-400');
//       return;
//     }

//     try {
//       // Simulate API call
//       await new Promise(resolve => setTimeout(resolve, 1000));
//       setMessage('Thank you for subscribing!');
//       setMessageColor('text-green-400');
//       setEmail('');
//     } catch (error) {
//       console.error('Subscription error:', error);
//       setMessage('There was an error. Please try again later.');
//       setMessageColor('text-red-400');
//     }
//   };

//   // Data for navigation links with corresponding Heroicons
//   const navigationLinks = [
//     { name: 'Home', to: '/', icon: <HomeIcon className="w-5 h-5 mr-2" /> },
//     { name: 'About', to: '/about', icon: <BookOpenIcon className="w-5 h-5 mr-2" /> },
//     { name: 'Journals', to: '/journals', icon: <NewspaperIcon className="w-5 h-5 mr-2" /> },
//     { name: 'Blogs', to: '/blogs', icon: <PencilSquareIcon className="w-5 h-5 mr-2" /> },
//     { name: 'Contact', to: '/contact', icon: <EnvelopeIcon className="w-5 h-5 mr-2" /> },
//     { name: 'Buy A Ticket', to: '/buy-a-ticket', icon: <TicketIcon className="w-5 h-5 mr-2" /> },
//   ];

//   // Data for social media icons with their specific brand colors and Font Awesome icons
//   const socialMediaLinks = [
//     { name: 'Facebook', icon: faFacebookF, href: 'https://www.facebook.com/people/Helix-Conference-LLC/61570321457803/', iconColorClass: 'bg-blue-500' },
//     { name: 'Instagram', icon: faInstagram, href: 'https://www.instagram.com/helix_scientific_conferences/?fbclid=IwY2xjawLPDsJleHRuA2FlbQIxMQBicmlkETFHY1owa2l4SVh3a1U4dUJiAR5fK64x9qd1yRrehrq3_DcHRirw6NfGpHHFF2CeeIh1zexrKM8wb5Lw_8SVsg_aem__iAurQPmLh5EAw3hA20cAw', iconColorClass: 'bg-pink-500' },
//     { name: 'LinkedIn', icon: faLinkedinIn, href: 'https://www.linkedin.com/company/helixscientificconferences/?viewAsMember=true', iconColorClass: 'bg-blue-700' },
//     { name: 'Twitter', icon: faTwitter, href: 'https://x.com/Helixconfe69272', iconColorClass: 'bg-blue-400' },
//     { name: 'YouTube', icon: faYoutube, href: 'https://www.youtube.com/@Helixconferences', iconColorClass: 'bg-red-600' },
//     { name: 'Reddit', icon: faReddit, href: 'https://www.reddit.com/user/Salty-Ad6381/', iconColorClass: 'bg-orange-500' },
//   ];

//   return (
//     <footer className="relative z-30">
//       {/* Combined Footer Section with Black Glassmorphism Background */}
//       <div
//         className="relative overflow-hidden py-8 md:py-10 text-gray-300 glassmorphism-footer"
//       >
//         <div className="container mx-auto px-4">
//           {/* Main Grid for Footer Columns - Ensuring equal height and full space */}
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-y-12 gap-x-8 h-full">

//             {/* Column 1: Logo & Contact Info */}
//             <div className="flex flex-col items-start text-left">
//               <div className="mb-2" >
//                 {/* Ensure your logo looks good on a dark/transparent background */}
//                 <Link to="/" className="inline-block transform transition-transform duration-300 hover:scale-105">
//                   <img src={Logo} alt="Helix Conferences Logo" className="w-36 h-auto" />
//                 </Link>
//               </div>
//               <div className="space-y-3 text-sm">
//                 {/* WhatsApp moved to the top */}
//                 {/* Apply hover:text-shadow-white-glow to links and text containers */}
//                 <p className="flex items-center justify-start group">
//                   <FontAwesomeIcon icon={faWhatsapp} className="w-5 h-5 mr-3 text-green-400 flex-shrink-0 animate-pulse-subtle" />
//                   <a href="https://wa.me/+17159905583" target="_blank" rel="noopener noreferrer" 
//                      className="hover:text-white transition-colors duration-200 hover:text-shadow-white-glow cursor-interactive"> {/* Added glow */}
//                     +17159905583
//                   </a>
//                 </p>
//                 <p className="flex items-center justify-start group">
//                   <PhoneIcon className="w-5 h-5 mr-3 text-blue-300 flex-shrink-0 animate-pulse-subtle" />
//                   <a href="tel:+17576567778" 
//                      className="hover:text-white transition-colors duration-200 hover:text-shadow-white-glow cursor-interactive">+1757 656 7778</a> {/* Added glow */}
//                 </p>
//                 <p className="flex items-center justify-start group">
//                   <PhoneIcon className="w-5 h-5 mr-3 text-blue-300 flex-shrink-0 animate-pulse-subtle" />
//                   <a href="tel:+919000146000" 
//                      className="hover:text-white transition-colors duration-200 hover:text-shadow-white-glow cursor-interactive">+91 9000146000</a> {/* Added glow */}
//                 </p>
//                 <p className="flex items-center justify-start group">
//                   <EnvelopeIcon className="w-5 h-5 mr-3 text-red-300 flex-shrink-0 animate-pulse-subtle" />
//                   <a href="mailto:hello@helixconferences.com" 
//                      className="hover:text-white transition-colors duration-200 hover:text-shadow-white-glow cursor-interactive"> {/* Added glow */}
//                     hello@helixconferences.com
//                   </a>
//                 </p>
//                 <address className="not-italic flex items-start justify-start group">
//                   <MapPinIcon className="w-5 h-5 mr-3 text-yellow-300 flex-shrink-0 mt-1 animate-pulse-subtle" />
//                   <span className="max-w-[250px] group-hover:text-shadow-white-glow transition-shadow duration-200 cursor-interactive"> {/* Added glow to span */}
//                     Helix Conferences <br />
//                     45573, Shepard Drive, Suit#101, <br />
//                     Sterling, Virginia-20164, USA
//                   </span>
//                 </address>
//               </div>
//             </div>

//             {/* Column 2: Our Navigation */}
//             <div className="flex flex-col items-start text-left">
//               <h4 className="text-xl font-semibold text-white mb-6">Our Navigation</h4>
//               <ul className="space-y-3 text-base">
//                 {navigationLinks.map((link, index) => (
//                   <li key={index}>
//                     <Link
//                       to={link.to}
//                       // Added hover:text-shadow-white-glow to existing classes
//                       className="flex items-center justify-start hover:text-blue-400 transition-colors duration-200 relative group overflow-hidden hover:text-shadow-white-glow cursor-interactive"
//                     >
//                       {link.icon}
//                       <span className="relative z-10">{link.name}</span>
//                       <span className="absolute bottom-0 left-0 w-full h-[2px] bg-blue-500 transform scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-300 ease-out-quad"></span>
//                     </Link>
//                   </li>
//                 ))}
//               </ul>
//             </div>

//             {/* Column 3: Our Social Media */}
//             <div className="flex flex-col items-start text-left">
//               <h4 className="text-xl font-semibold text-white mb-6">Our Social Media</h4>
//               <ul className="space-y-4 w-full">
//                 {socialMediaLinks.map((social, index) => (
//                   <li key={index}>
//                     <a
//                       href={social.href}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       // Added hover:text-shadow-white-glow to the anchor tag
//                       className="group flex items-center rounded-lg transition-all duration-300 ease-in-out hover:scale-[1.02] transform justify-start hover:text-shadow-white-glow cursor-interactive"
//                       aria-label={social.name}
//                     >
//                       <div
//                         className={`flex items-center justify-center w-8 h-8 rounded-full mr-4 shadow-md transition-all duration-300 transform group-hover:rotate-6
//                                       bg-white/10                      // Default transparent white background
//                                       group-hover:bg-opacity-100        // Ensure brand color is fully opaque on hover
//                                       ${social.iconColorClass}          // Apply brand color by default, if desired, or only on hover
//                                       ${social.iconColorClass === 'bg-pink-500' ? 'group-hover:bg-gradient-to-br group-hover:from-purple-500 group-hover:via-red-500 group-hover:to-yellow-500' : `group-hover:${social.iconColorClass}`} // Apply brand color on hover, handle Instagram separately
//                                       `}
//                       >
//                         <FontAwesomeIcon
//                           icon={social.icon}
//                           className={`text-white text-base transition-colors duration-300`} // Icon always white, no hover color
//                         />
//                       </div>
//                       <span className="text-sm font-medium text-gray-200 group-hover:text-white transition-colors duration-300">
//                         {social.name}
//                       </span>
//                     </a>
//                   </li>
//                 ))}
//               </ul>
//             </div>

//             {/* Column 4: Subscribe & Discover Button */}
//             <div className="flex flex-col items-start text-left">
//               <h4 className="text-xl font-semibold text-white mb-6">Subscribe</h4>
//               {/* Added hover:text-shadow-white-glow to this paragraph */}
//               <p className="text-sm mb-4 hover:text-shadow-white-glow transition-shadow duration-200 cursor-interactive">Subscribe to our newsletter for the latest updates.</p>
//               <form onSubmit={handleSubscribe} className="flex flex-col w-full max-w-[180px] md:mx-0">
//                 <input
//                   type="email"
//                   placeholder="Get News & Updates"
//                   className="p-3 mb-3 bg-white bg-opacity-10 border border-gray-700 rounded-md text-white placeholder-gray-400
//                                   focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   required
//                 />
//                 <button
//                   type="submit"
//                   className="
//                     bg-blue-600/30 backdrop-blur-sm border border-white/20
//                     hover:bg-blue-700/40 active:translate-y-0.5
//                     text-white font-bold py-2 px-5 rounded-md transition-all duration-300
//                     w-full flex items-center justify-center text-base
//                     shadow-xl shadow-white/10 hover:shadow-2xl
//                     hover:text-shadow-white-glow                                                                 /* Added glow to button text */
//                   "
//                 >
//                   Subscribe
//                 </button>
//               </form>

//               {/* Message for subscription */}
//               {message && (
//                 <p className={`mt-4 text-sm ${messageColor} px-3 py-1 rounded-md`}
//                     style={{ backgroundColor: messageColor.includes('green') ? 'rgba(40, 167, 69, 0.1)' : 'rgba(220, 53, 69, 0.1)' }}>
//                   {message}
//                 </p>
//               )}

//               {/* Discover Button - Now a React Router Link */}
//               <Link
//                 to="/discover"
//                 className="
//                   mt-4
//                   bg-green-600/30 backdrop-blur-sm border border-white/20
//                   hover:bg-green-700/40 active:translate-y-0.5
//                   text-white font-bold py-2 px-5 rounded-md transition-all duration-300
//                   w-full max-w-[180px] md:mx-0 flex items-center justify-center text-base
//                   shadow-xl shadow-white/10 hover:shadow-2xl
//                   hover:text-shadow-white-glow                                                                   /* Added glow to button text */
//                 "
//               >
//                 <ArrowRightIcon className="w-5 h-5 mr-3" />
//                 Discover
//               </Link>
//             </div>
//           </div>

//           {/* Footer Bottom Section (Copyright and Terms) */}
//           <div className="border-t border-gray-800 pt-6 mt-8">
//             <div className="container mx-auto px-4 flex flex-col md:flex-row justify-center md:justify-between items-center text-sm text-gray-400">
//               {/* Added glow to copyright text and links */}
//               <p className="mb-4 md:mb-0 text-center group-hover:text-shadow-white-glow transition-shadow duration-200 cursor-interactive">
//                 Copyright © {new Date().getFullYear()}{' '}
//                 <Link
//                   to="/helix-conferences"
//                   className="hover:opacity-80 transition-opacity duration-200
//                                 bg-gradient-to-r from-purple-400 to-blue-400
//                                 bg-clip-text text-transparent font-semibold
//                                 hover:text-shadow-white-glow                                               /* Added glow to link */
//                                 "
//                 >
//                   Helix Conferences
//                 </Link>
//                 . All Rights Reserved.
//               </p>
//               <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-6">
//                 <Link to="/terms-of-use" 
//                       className="hover:text-white transition-colors duration-200 text-center hover:text-shadow-white-glow cursor-interactive">Terms of Use</Link> {/* Added glow */}
//                 <Link to="/privacy-policy" 
//                       className="hover:text-white transition-colors duration-200 text-center hover:text-shadow-white-glow cursor-interactive">Privacy Policy</Link> {/* Added glow */}
//               </div>
//             </div>
//           </div>

//         </div> {/* End of container */}
//       </div> {/* End of main glassmorphism div */}
//     </footer>
//   );
// }

// export default Footer;















// src/components/Footer.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

// Import Heroicons for general UI and navigation icons
import {
  MapPinIcon,
  PhoneIcon,
  EnvelopeIcon,
  HomeIcon,
  BookOpenIcon,
  NewspaperIcon,
  PencilSquareIcon,
  TicketIcon,
  ArrowRightIcon,
  UserGroupIcon, // For "About Us"
  BuildingLibraryIcon, // For "Hybrids"
  VideoCameraIcon, // For "Webinars"
  PhotoIcon, // For "Gallery"
  ChatBubbleBottomCenterTextIcon, // For "Testimonials"
  ChevronDownIcon, // For dropdown
} from '@heroicons/react/24/outline';

// Import Font Awesome components and specific brand icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faWhatsapp,
  faFacebookF,
  faTwitter,
  faInstagram,
  faLinkedinIn,
  faYoutube,
  faReddit,
} from '@fortawesome/free-brands-svg-icons';
import Logo from '../../assets/images/Header-logo.png'
import { useCursor } from "../CustomCursor";

// Variants for the entire footer container (staggers children)
const footerContainerVariants = {
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    }
  },
};

// Variants for each individual footer column (fade up with spring)
const footerColumnVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 10,
    }
  },
};

// Variants for individual links or social icons (more subtle effect)
const linkVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: "easeOut"
    }
  }
};

// Animation variants for the icon rotation
const iconRotateVariants = {
  initial: { rotate: 0 },
  hover: { rotate: 380, transition: { duration: 0.3, ease: "easeInOut" } },
};

// Variants for the dropdown content
const dropdownVariants = {
  hidden: { opacity: 0, height: 0 },
  visible: {
    opacity: 1,
    height: "auto",
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 20,
      staggerChildren: 0.05,
    }
  },
};

// Motion component for the link
// const MotionLink = motion(Link);

const MotionLink = motion.create(Link);

function Footer() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [messageColor, setMessageColor] = useState('text-white');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { setCursorVariant } = useCursor();

  const handleLinkMouseEnter = () => setCursorVariant("interactive");
  const handleLinkMouseLeave = () => setCursorVariant("default");

  const handleSubscribe = async (e) => {
    e.preventDefault();
    setMessage('');

    if (!email) {
      setMessage('Email cannot be empty.');
      setMessageColor('text-red-400');
      return;
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setMessage('Please enter a valid email address.');
      setMessageColor('text-red-400');
      return;
    }

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setMessage('Thank you for subscribing!');
      setMessageColor('text-green-400');
      setEmail('');
    } catch (error) {
      console.error('Subscription error:', error);
      setMessage('There was an error. Please try again later.');
      setMessageColor('text-red-400');
    }
  };

  // Reordered navigation links with "Home" at the start
  const navigationLinks = [
    { name: 'Home', to: '/', icon: <HomeIcon className="w-5 h-5 mr-2" /> },
    { name: 'Buy A Ticket', to: '/buy-a-ticket', icon: <TicketIcon className="w-5 h-5 mr-2" /> },
    { name: 'Contact', to: '/contact', icon: <EnvelopeIcon className="w-5 h-5 mr-2" /> },
    { name: 'About Us', to: '/about-us', icon: <UserGroupIcon className="w-5 h-5 mr-2" /> },
    { name: 'Hybrids', to: '/hybrids', icon: <BuildingLibraryIcon className="w-5 h-5 mr-2" /> },
    { name: 'Webinars', to: '/webinars', icon: <VideoCameraIcon className="w-5 h-5 mr-2" /> },
    { name: 'Gallery', to: '/gallery', icon: <PhotoIcon className="w-5 h-5 mr-2" /> },
    { name: 'Blog', to: '/blog', icon: <PencilSquareIcon className="w-5 h-5 mr-2" /> },
    { name: 'Testimonials', to: '/testimonials', icon: <ChatBubbleBottomCenterTextIcon className="w-5 h-5 mr-2" /> },
    { name: 'Journals', to: '/journals', icon: <NewspaperIcon className="w-5 h-5 mr-2" /> },
  ];

  const socialMediaLinks = [
    { name: 'Facebook', icon: faFacebookF, href: 'https://www.facebook.com/profile.php?id=61576697796195', brandColor: 'bg-blue-600' },
    { name: 'Instagram', icon: faInstagram, href: 'https://www.instagram.com/helix_conferences/', brandColor: 'bg-pink-500' },
    { name: 'LinkedIn', icon: faLinkedinIn, href: 'https://www.linkedin.com/company/helixscientificconferences/?viewAsMember=true', brandColor: 'bg-blue-700' },
    { name: 'Twitter', icon: faTwitter, href: 'https://x.com/Helixconfe69272', brandColor: 'bg-blue-400' },
    { name: 'YouTube', icon: faYoutube, href: 'https://www.youtube.com/@Helixconferences', brandColor: 'bg-red-600' },
    { name: 'Reddit', icon: faReddit, href: 'https://www.reddit.com/user/Salty-Ad6381/', brandColor: 'bg-orange-500' },
  ];

  return (
    <motion.footer
      className="relative z-30"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={footerContainerVariants}
    >
      {/* Updated background gradient to be more prominent */}
      <div
        className="relative overflow-hidden pt-8 md:pt-10 pb-4 text-black
                   bg-gradient-to-br from-[#dce5f1] via-[#e8e0f1] to-[#f8e0e0]
                   backdrop-blur-xl border-t border-white/30 shadow-inner"
      >
        <div className="container mx-auto px-4">
          {/* Main Grid for Footer Columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-y-12 gap-x-8">

            {/* Column 1: Logo & Contact Info */}
            <motion.div
              variants={footerColumnVariants}
              className="flex flex-col items-start text-left"
            >
              <div className="mb-4">
                <MotionLink
                  to="/"
                  onMouseEnter={handleLinkMouseEnter}
                  onMouseLeave={handleLinkMouseLeave}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <img src={Logo} alt="Helix Conferences Logo" loading="lazy" className="h-14 w-auto" />
                </MotionLink>
              </div>
              <div className="space-y-5 text-sm">
                
                <p className="flex items-center justify-start group">
                  <PhoneIcon className="w-5 h-5 mr-3 text-blue-500 flex-shrink-0" />
                  <a
                    href="tel:+17576567778"
                    className="
                      transition-colors duration-200
                      hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500"
                    onMouseEnter={handleLinkMouseEnter}
                    onMouseLeave={handleLinkMouseLeave}
                  >+1 757 656 7778</a>
                </p>
                <p className="flex items-center justify-start group">
                  <PhoneIcon className="w-5 h-5 mr-3 text-blue-500 flex-shrink-0" />
                  <a
                    href="tel:+91 9000 146 000"
                    className="
                      transition-colors duration-200
                      hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500"
                    onMouseEnter={handleLinkMouseEnter}
                    onMouseLeave={handleLinkMouseLeave}
                  >+91 949 211 7897</a>
                </p>
                <p className="flex items-center justify-start group">
                  <FontAwesomeIcon icon={faWhatsapp} className="w-5 h-5 mr-3 text-green-500 flex-shrink-0" />
                  <a
                    href="https://wa.me/+17159905583"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="
                      transition-colors duration-200
                      hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500"
                    onMouseEnter={handleLinkMouseEnter}
                    onMouseLeave={handleLinkMouseLeave}
                  >+1 715 990 5583</a>
                </p>
                <p className="flex items-center justify-start group">
                  <EnvelopeIcon className="w-5 h-5 mr-3 text-red-500 flex-shrink-0" />
                  <a
                    href="mailto:hello@helixconferences.com"
                    className="
                      transition-colors duration-200
                      hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500"
                    onMouseEnter={handleLinkMouseEnter}
                    onMouseLeave={handleLinkMouseLeave}
                  >hello@helixconferences.com</a>
                </p>
                <address className="not-italic flex font-bold items-start justify-start group">
                  <MapPinIcon className="w-5 h-5 mr-3  text-yellow-500 flex-shrink-0 mt-1" />
                  <span className="max-w-[250px]">
                    Helix Conferences LLC <br />
                    45573, Shepard Drive, Suit#101, <br />
                    Sterling, Virginia-20164, USA
                  </span>
                </address>
              </div>
            </motion.div>

            {/* Column 2: Our Navigation */}
            <motion.div
              variants={footerColumnVariants}
              className="flex flex-col items-start text-left"
            >
              <h4 className="text-xl font-semibold text-black mb-6">Our Navigation</h4>
              <ul className="space-y-3 text-base">
                {navigationLinks.slice(0, 5).map((link, index) => (
                  <motion.li key={index} variants={linkVariants}>
                    <MotionLink
                      to={link.to}
                      className="flex items-center justify-start text-black transition-colors duration-200 group
                                 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500"
                      onMouseEnter={handleLinkMouseEnter}
                      onMouseLeave={handleLinkMouseLeave}
                      whileHover="hover"
                      initial="initial"
                    >
                      <motion.span
                        className="flex items-center justify-center mr-2 text-current"
                        variants={iconRotateVariants}
                      >
                        {link.icon}
                      </motion.span>
                      {link.name}
                    </MotionLink>
                  </motion.li>
                ))}
                {/* Dropdown for remaining links */}
                <motion.li variants={linkVariants}>
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="flex items-center justify-start text-black transition-colors duration-200"
                    onMouseEnter={handleLinkMouseEnter}
                    onMouseLeave={handleLinkMouseLeave}
                  >
                    <span className="hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 transition-all duration-200">
                      More
                    </span>
                    <motion.span
                      animate={{ rotate: isDropdownOpen ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="ml-2"
                    >
                      <ChevronDownIcon className="w-4 h-4" />
                    </motion.span>
                  </button>
                </motion.li>
              </ul>

              <AnimatePresence>
                {isDropdownOpen && (
                  <motion.ul
                    variants={dropdownVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    className="pl-4 mt-3 space-y-3 text-sm overflow-hidden"
                  >
                    {navigationLinks.slice(5).map((link, index) => (
                      <motion.li key={index} variants={linkVariants}>
                        <Link
                          to={link.to}
                          className="flex items-center justify-start text-black
                                     hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 transition-colors duration-200"
                          onMouseEnter={handleLinkMouseEnter}
                          onMouseLeave={handleLinkMouseLeave}
                        >
                          {link.icon}
                          {link.name}
                        </Link>
                      </motion.li>
                    ))}
                  </motion.ul>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Column 3: Our Social Media */}
            <motion.div
              variants={footerColumnVariants}
              className="flex flex-col items-start text-left"
            >
              <h4 className="text-xl font-semibold text-black mb-6">Our Social Media</h4>
              <ul className="space-y-4 w-full">
                {socialMediaLinks.map((social, index) => (
                  <motion.li key={index} variants={linkVariants}>
                    <motion.a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center justify-start text-black hover:scale-[1.02] transform transition-all duration-300"
                      aria-label={social.name}
                      onMouseEnter={handleLinkMouseEnter}
                      onMouseLeave={handleLinkMouseLeave}
                      whileHover="hover"
                      initial="initial"
                    >
                      {/* Updated social icon styling with rounded full background and gradient shadow on hover */}
                      <motion.div
                        className={`
                          flex items-center justify-center w-6 h-6 rounded-full mr-4
                          bg-black group-hover:${social.brandColor}
                          transition-all duration-300 transform
                          group-hover:drop-shadow-gradient
                        `}
                        variants={iconRotateVariants}
                      >
                        <FontAwesomeIcon
                          icon={social.icon}
                          className={`text-white text-base`}
                        />
                      </motion.div>
                      <span className="text-sm font-medium text-gray-800
                                       group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500
                                       transition-colors duration-300">
                        {social.name}
                      </span>
                    </motion.a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Column 4: Subscribe Form */}
            <motion.div
              variants={footerColumnVariants}
              className="flex flex-col items-start text-left"
            >
              <h4 className="text-xl font-semibold text-black mb-6">Subscribe</h4>
              <p className="text-sm mb-4 text-gray-800">Subscribe to our newsletter for the latest updates.</p>
              <form onSubmit={handleSubscribe} className="flex flex-col w-full max-w-[180px] md:mx-0">
                <input
                  type="email"
                  placeholder="Your Email Address"
                  className="p-3 mb-3 bg-white/50 border border-gray-400 rounded-md text-black placeholder-gray-500
                                 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  onMouseEnter={handleLinkMouseEnter}
                  onMouseLeave={handleLinkMouseLeave}
                />
                <motion.button
                  type="submit"
                  className="
                    bg-blue-600/30 backdrop-blur-sm border border-blue-600/50
                    text-black font-semibold py-2 px-5 rounded-md transition-all duration-300
                    w-full flex items-center justify-center text-base
                    hover:bg-blue-600/50 hover:text-white"
                  whileHover={{ scale: 1.05, boxShadow: "0 5px 20px rgba(0, 0, 0, 0.2)" }}
                  whileTap={{ scale: 0.95 }}
                  onMouseEnter={handleLinkMouseEnter}
                  onMouseLeave={handleLinkMouseLeave}
                >
                  Subscribe
                </motion.button>
              </form>

              {message && (
                <p className={`mt-4 text-sm ${messageColor} px-3 py-1 rounded-md`}>
                  {message}
                </p>
              )}
            </motion.div>
          </div>

          {/* Footer Bottom Section (Copyright and Terms) */}
          <div className="border-t border-gray-300 pt-6 mt-8">
            <div className="container mx-auto px-4 flex flex-col md:flex-row justify-center md:justify-between items-center text-sm text-gray-700">
              <p className="mb-4 md:mb-0 text-center">
                Copyright © {new Date().getFullYear()}{' '}
                <Link
                  to="/helix-conferences"
                  className="
                    hover:opacity-80 transition-opacity duration-200
                    text-transparent font-semibold
                    bg-clip-text bg-gradient-to-r from-purple-500 to-blue-500
                  "
                  onMouseEnter={handleLinkMouseEnter}
                  onMouseLeave={handleLinkMouseLeave}
                >
                  Helix Conferences
                </Link>
                . All Rights Reserved.
              </p>
              <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-6">
                <Link
                  to="/terms-of-use"
                  className="
                    transition-colors duration-200 text-center
                    hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500"
                  onMouseEnter={handleLinkMouseEnter}
                  onMouseLeave={handleLinkMouseLeave}
                >Terms of Use</Link>
                <Link
                  to="/privacy-policy"
                  className="
                    transition-colors duration-200 text-center
                    hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500"
                  onMouseEnter={handleLinkMouseEnter}
                  onMouseLeave={handleLinkMouseLeave}
                >Privacy Policy</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.footer>
  );
}

export default Footer;