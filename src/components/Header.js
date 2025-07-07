
// Rectangular Box effect
// // src/components/Header.js
// import React, { useState, useRef, useEffect, useCallback } from "react";
// import { NavLink, Link, useLocation } from "react-router-dom";
// import {
//   HomeIcon,
//   BookOpenIcon,
//   BriefcaseIcon,
//   SparklesIcon,
//   PencilSquareIcon,
//   NewspaperIcon,
//   EnvelopeIcon,
//   TicketIcon,
//   ChevronDownIcon,
//   Bars3Icon,
//   XMarkIcon,
// } from "@heroicons/react/24/outline";
// import { useCursor } from "./CustomCursor";

// function Header() {
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const location = useLocation();
//   const { setCursorVariant } = useCursor();

//   // State for the moving "focus light" indicator
//   const [indicatorStyle, setIndicatorStyle] = useState({
//     left: 0,
//     width: 0,
//     opacity: 0,
//   });
//   const navRefs = useRef({}); // To store refs for each NavLink (for measurement)
//   const navContainerRef = useRef(null); // Ref for the main nav container

//   // Helper function to determine active state
//   const isNavLinkActive = (path, hash) => {
//     if (path === "/") {
//       if (hash) return location.pathname === "/" && location.hash === hash;
//       return location.pathname === "/";
//     }
//     // Handle conferences path for dropdown items too
//     if (path === "/conferences") {
//       return (
//         location.pathname.startsWith("/hybrids") ||
//         location.pathname.startsWith("/webinars") ||
//         location.pathname.startsWith("/conferences")
//       );
//     }
//     return location.pathname === path;
//   };

//   // Function to calculate and set indicator style
//   const updateIndicator = useCallback((element) => {
//     if (navContainerRef.current && element) {
//       const navRect = navContainerRef.current.getBoundingClientRect();
//       const itemRect = element.getBoundingClientRect();

//       setIndicatorStyle({
//         left: itemRect.left - navRect.left, // Position relative to the nav container
//         width: itemRect.width,
//         opacity: 1, // Always visible when active or hovered
//       });
//     } else {
//       setIndicatorStyle((prev) => ({ ...prev, opacity: 0 })); // Hide if element is null
//     }
//   }, []);

//   // Effect to set initial indicator position on load and route changes
//   useEffect(() => {
//     const setActiveIndicator = () => {
//       let activeLinkElement = null;

//       // Check for explicit path match first
//       for (const path in navRefs.current) {
//         if (isNavLinkActive(path) && navRefs.current[path]) {
//           activeLinkElement = navRefs.current[path];
//           break;
//         }
//       }

//       // If no active link found, but on root path, default to home
//       if (!activeLinkElement && location.pathname === "/") {
//         activeLinkElement = navRefs.current["/"];
//       }

//       // Special handling for Buy A Ticket if it's the active route and should get the indicator
//       if (
//         location.pathname === "/buy-a-ticket" &&
//         navRefs.current["/buy-a-ticket"]
//       ) {
//         activeLinkElement = navRefs.current["/buy-a-ticket"];
//       }

//       if (activeLinkElement) {
//         updateIndicator(activeLinkElement);
//       } else {
//         // If no active element (e.g., 404 page or other unlisted path), hide indicator
//         setIndicatorStyle((prev) => ({ ...prev, opacity: 0 }));
//       }
//     };

//     // Give a small delay to ensure elements are rendered and measured correctly
//     const timer = setTimeout(setActiveIndicator, 50); // Small delay
//     window.addEventListener("resize", setActiveIndicator); // Recalculate on resize

//     return () => {
//       clearTimeout(timer);
//       window.removeEventListener("resize", setActiveIndicator);
//     };
//   }, [location.pathname, location.hash, updateIndicator]); // Re-run when path or hash changes

//   // Classes for Desktop NavLinks (Icons AND Text)
//   // Added group class for icon hover effect
//   const navLinkClasses = (path) => {
//     return `relative h-full flex items-center justify-center text-white text-base font-semibold whitespace-nowrap px-4 py-2 z-20 group`;
//   };

//   const mobileNavLinkClasses = (path, { isActive }) =>
//     `flex items-center px-6 py-4 text-xl font-medium border-b border-gray-700
//      ${
//        isActive || isNavLinkActive(path)
//          ? "text-cyan-400 bg-gray-800"
//          : "text-white hover:bg-gray-700"
//      }
//      transition-colors duration-200`;

//   // Cursor hover handlers
//   const handleLinkMouseEnter = () => setCursorVariant("interactive");
//   const handleLinkMouseLeave = () => setCursorVariant("default");

//   return (
//     <header
//       className={`fixed top-0 left-0 w-full z-50 transition-colors duration-300
//         py-4 min-h-[80px] flex justify-between items-center px-6 glassmorphism-header`} // Added glassmorphism-header class
//     >
//       {/* Logo - separate from the main navigation, on the far left */}
//       <Link
//         to="/"
//         className="flex items-center animate-fade-in-down z-20"
//         style={{ animationDelay: "0.1s" }}
//         onMouseEnter={handleLinkMouseEnter}
//         onMouseLeave={handleLinkMouseLeave}
//       >
//         <img
//           src="/assets/images/helix-logo.jpg"
//           alt="Helix Conferences Logo"
//           className="h-12"
//         />
//       </Link>

//       {/* Main navigation container for Desktop (rectangular, includes Buy A Ticket) */}
//       <nav
//         ref={navContainerRef}
//         className="relative hidden md:flex items-center h-full" // Removed space-x-2, p-1, bg-transparent etc.
//         onMouseLeave={() => {
//           // Revert indicator to active link when leaving the nav
//           const activeLinkKey = Object.keys(navRefs.current).find((key) =>
//             isNavLinkActive(key)
//           );
//           if (activeLinkKey && navRefs.current[activeLinkKey]) {
//             updateIndicator(navRefs.current[activeLinkKey]);
//           } else {
//             // Default to home if no active link found
//             setIndicatorStyle((prev) => ({ ...prev, opacity: 0 })); // Hide if no active element
//           }
//         }}
//       >
//         {/* The moving "focus light" indicator - transparent background, glow via box-shadow */}
//         <span
//           className="absolute top-0 bottom-0 bg-transparent rounded-[8px] transition-all duration-300 ease-in-out focus-light-shadow z-10" // bg-transparent is key. z-10 to be behind text.
//           style={{
//             left: indicatorStyle.left,
//             width: indicatorStyle.width,
//             opacity: indicatorStyle.opacity,
//           }}
//         ></span>

//         {/* Home Link */}
//         <NavLink
//           to="/"
//           className={navLinkClasses("/")}
//           onMouseEnter={(e) => {
//             updateIndicator(e.currentTarget);
//             handleLinkMouseEnter();
//           }}
//           onMouseLeave={handleLinkMouseLeave}
//           ref={(el) => (navRefs.current["/"] = el)}
//         >
//           <HomeIcon className="h-5 w-5 mr-1 text-gray-300 group-hover:rotate-[380deg] transition-transform duration-200" />
//           Home
//         </NavLink>

//         {/* About Us Link */}
//         <NavLink
//           to="/about"
//           className={navLinkClasses("/about")}
//           onMouseEnter={(e) => {
//             updateIndicator(e.currentTarget);
//             handleLinkMouseEnter();
//           }}
//           onMouseLeave={handleLinkMouseLeave}
//           ref={(el) => (navRefs.current["/about"] = el)}
//         >
//           <BookOpenIcon className="h-5 w-5 mr-1 text-gray-300 group-hover:rotate-[380deg] transition-transform duration-200" />
//           About Us
//         </NavLink>

//         {/* Conferences Link (with Dropdown) */}
//         <div
//           className="relative flex items-center h-full z-20 group"
//           onMouseEnter={() => {
//             setIsDropdownOpen(true);
//             handleLinkMouseEnter();
//             updateIndicator(navRefs.current["/conferences"]);
//           }}
//           onMouseLeave={() => {
//             setIsDropdownOpen(false);
//             handleLinkMouseLeave();
//           }}
//         >
//           <NavLink
//             to="/conferences"
//             className="flex items-center justify-center text-white text-base font-semibold whitespace-nowrap px-4 py-2"
//             ref={(el) => (navRefs.current["/conferences"] = el)}
//           >
//             <BriefcaseIcon className="h-5 w-5 mr-1 text-gray-300 group-hover:rotate-[380deg] transition-transform duration-200" />
//             Conferences
//             <ChevronDownIcon className="ml-1 h-4 w-4 transform transition-transform duration-200 text-gray-300" />
//           </NavLink>
//           {/* MODIFIED: Add glassmorphism classes to the dropdown div */}
//           <div
//             className={`absolute top-full left-1/2 -translate-x-1/2 w-52 rounded-md shadow-lg py-2 origin-top transition-all duration-300
//                bg-gray-900/40 backdrop-blur-md border border-gray-700/50  // Added these classes for glassmorphism
//                ${
//                  isDropdownOpen
//                    ? "scale-y-100 opacity-100 pointer-events-auto"
//                    : "scale-y-0 opacity-0 pointer-events-none"
//                }`}
//             onMouseEnter={handleLinkMouseEnter}
//             onMouseLeave={handleLinkMouseLeave}
//           >
//             <Link
//               to="/hybrids"
//               className="block px-4 py-2 text-white hover:bg-gray-700 transition-colors duration-200"
//             >
//               Hybrid Conferences
//             </Link>
//             <Link
//               to="/webinars"
//               className="block px-4 py-2 text-white hover:bg-gray-700 transition-colors duration-200"
//             >
//               Webinars
//             </Link>
//             <Link
//               to="/conferences"
//               className="block px-4 py-2 text-white hover:bg-gray-700 transition-colors duration-200"
//             >
//               All Conferences
//             </Link>
//           </div>
//         </div>
//         {/* Testimonials Link */}
//         <NavLink
//           to="/testimonials"
//           className={navLinkClasses("/testimonials")}
//           onMouseEnter={(e) => {
//             updateIndicator(e.currentTarget);
//             handleLinkMouseEnter();
//           }}
//           onMouseLeave={handleLinkMouseLeave}
//           ref={(el) => (navRefs.current["/testimonials"] = el)}
//         >
//           <SparklesIcon className="h-5 w-5 mr-1 text-gray-300 group-hover:rotate-[380deg] transition-transform duration-200" />
//           Testimonials
//         </NavLink>

//         {/* Blog Link */}
//         <NavLink
//           to="/blog"
//           className={navLinkClasses("/blog")}
//           onMouseEnter={(e) => {
//             updateIndicator(e.currentTarget);
//             handleLinkMouseEnter();
//           }}
//           onMouseLeave={handleLinkMouseLeave}
//           ref={(el) => (navRefs.current["/blog"] = el)}
//         >
//           <PencilSquareIcon className="h-5 w-5 mr-1 text-gray-300 group-hover:rotate-[380deg] transition-transform duration-200" />
//           Blog
//         </NavLink>

//         {/* Journals Link */}
//         <NavLink
//           to="/journals"
//           className={navLinkClasses("/journals")}
//           onMouseEnter={(e) => {
//             updateIndicator(e.currentTarget);
//             handleLinkMouseEnter();
//           }}
//           onMouseLeave={handleLinkMouseLeave}
//           ref={(el) => (navRefs.current["/journals"] = el)}
//         >
//           <NewspaperIcon className="h-5 w-5 mr-1 text-gray-300 group-hover:rotate-[380deg] transition-transform duration-200" />
//           Journals
//         </NavLink>

//         {/* Contact Link */}
//         <NavLink
//           to="/contact"
//           className={navLinkClasses("/contact")}
//           onMouseEnter={(e) => {
//             updateIndicator(e.currentTarget);
//             handleLinkMouseEnter();
//           }}
//           onMouseLeave={handleLinkMouseLeave}
//           ref={(el) => (navRefs.current["/contact"] = el)}
//         >
//           <EnvelopeIcon className="h-5 w-5 mr-1 text-gray-300 group-hover:rotate-[380deg] transition-transform duration-200" />
//           Contact
//         </NavLink>

//         {/* Buy A Ticket Button - Now inside the nav group, styled like other NavLinks */}
//         <NavLink
//           to="/buy-a-ticket"
//           className={`${navLinkClasses("/buy-a-ticket")} ml-4`} // Added ml-4 for spacing
//           onMouseEnter={(e) => {
//             updateIndicator(e.currentTarget);
//             handleLinkMouseEnter();
//           }}
//           onMouseLeave={handleLinkMouseLeave}
//           ref={(el) => (navRefs.current["/buy-a-ticket"] = el)}
//         >
//           <TicketIcon className="h-5 w-5 mr-1 text-gray-300 group-hover:rotate-[380deg] transition-transform duration-200" />
//           Buy A Ticket
//         </NavLink>
//       </nav>

//       {/* Mobile Menu Button (always visible on small screens) */}
//       <button
//         onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
//         className="md:hidden text-white focus:outline-none focus:ring-2 focus:ring-cyan-400 rounded-md p-2 z-20"
//         onMouseEnter={handleLinkMouseEnter}
//         onMouseLeave={handleLinkMouseLeave}
//       >
//         {isMobileMenuOpen ? (
//           <XMarkIcon className="h-8 w-8" />
//         ) : (
//           <Bars3Icon className="h-8 w-8" />
//         )}
//       </button>

//       {/* Mobile Menu Panel */}
//       {isMobileMenuOpen && (
//         <div className="md:hidden fixed inset-0 bg-gray-900 bg-opacity-95 pb-4 pt-20 animate-slide-down z-40 overflow-y-auto">
//           {/* Logo at the top of the mobile menu for branding */}
//           <Link
//             to="/"
//             className="flex items-center px-6 py-4 text-white text-2xl font-semibold border-b border-gray-700"
//             onClick={() => setIsMobileMenuOpen(false)}
//           >
//             <img
//               src="/assets/images/helix-logo.jpg"
//               alt="Helix Conferences Logo"
//               className="h-10 mr-3"
//             />
//             <span>Helix Conferences</span>
//           </Link>
//           <NavLink
//             to="/#home-hero"
//             className={mobileNavLinkClasses("/", {
//               isActive: isNavLinkActive("/"),
//             })}
//             onClick={() => setIsMobileMenuOpen(false)}
//           >
//             <HomeIcon className="h-6 w-6 inline-block mr-3" />
//             Home
//           </NavLink>
//           <NavLink
//             to="/about"
//             className={mobileNavLinkClasses("/about", {
//               isActive: isNavLinkActive("/about"),
//             })}
//             onClick={() => setIsMobileMenuOpen(false)}
//           >
//             <BookOpenIcon className="h-6 w-6 inline-block mr-3" />
//             About Us
//           </NavLink>
//           <div className="relative">
//             <button
//               onClick={() => setIsDropdownOpen(!isDropdownOpen)}
//               className={`flex items-center w-full px-6 py-4 text-xl font-medium border-b border-gray-700
//                          ${
//                            isDropdownOpen
//                              ? "text-cyan-400 bg-gray-800"
//                              : "text-white hover:bg-gray-700"
//                          }
//                          transition-colors duration-200 focus:outline-none`}
//             >
//               <BriefcaseIcon className="h-6 w-6 inline-block mr-3" />
//               Conferences
//               <ChevronDownIcon
//                 className={`ml-auto h-5 w-5 transition-transform duration-200 ${
//                   isDropdownOpen ? "rotate-180" : ""
//                 }`}
//               />
//             </button>
//             {isDropdownOpen && (
//               <div className="bg-gray-800 py-2">
//                 <Link
//                   to="/hybrids"
//                   className="block px-10 py-2 text-white hover:bg-gray-700 transition-colors duration-200 text-base"
//                   onClick={() => setIsMobileMenuOpen(false)}
//                 >
//                   Hybrid Conferences
//                 </Link>
//                 <Link
//                   to="/webinars"
//                   className="block px-10 py-2 text-white hover:bg-gray-700 transition-colors duration-200 text-base"
//                   onClick={() => setIsMobileMenuOpen(false)}
//                 >
//                   Webinars
//                 </Link>
//                 <Link
//                   to="/conferences"
//                   className="block px-10 py-2 text-white hover:bg-gray-700 transition-colors duration-200 text-base"
//                   onClick={() => setIsMobileMenuOpen(false)}
//                 >
//                   All Conferences
//                 </Link>
//               </div>
//             )}
//           </div>
//           <NavLink
//             to="/testimonials"
//             className={mobileNavLinkClasses("/testimonials", {
//               isActive: isNavLinkActive("/testimonials"),
//             })}
//             onClick={() => setIsMobileMenuOpen(false)}
//           >
//             <SparklesIcon className="h-6 w-6 inline-block mr-3" />
//             Testimonials
//           </NavLink>
//           <NavLink
//             to="/blog"
//             className={mobileNavLinkClasses("/blog", {
//               isActive: isNavLinkActive("/blog"),
//             })}
//             onClick={() => setIsMobileMenuOpen(false)}
//           >
//             <PencilSquareIcon className="h-6 w-6 inline-block mr-3" />
//             Blog
//           </NavLink>
//           <NavLink
//             to="/journals"
//             className={mobileNavLinkClasses("/journals", {
//               isActive: isNavLinkActive("/journals"),
//             })}
//             onClick={() => setIsMobileMenuOpen(false)}
//           >
//             <NewspaperIcon className="h-6 w-6 inline-block mr-3" />
//             Journals
//           </NavLink>
//           <NavLink
//             to="/contact"
//             className={mobileNavLinkClasses("/contact", {
//               isActive: isNavLinkActive("/contact"),
//             })}
//             onClick={() => setIsMobileMenuOpen(false)}
//           >
//             <EnvelopeIcon className="h-6 w-6 inline-block mr-3" />
//             Contact
//           </NavLink>
//           <NavLink
//             to="/buy-a-ticket"
//             className={mobileNavLinkClasses("/buy-a-ticket", {
//               isActive: isNavLinkActive("/buy-a-ticket"),
//             })}
//             onClick={() => setIsMobileMenuOpen(false)}
//           >
//             <TicketIcon className="h-6 w-6 inline-block mr-3" />
//             Buy A Ticket
//           </NavLink>
//         </div>
//       )}
//     </header>
//   );
// }

// export default Header;


// Rectangular Box Effect

// import React, { useState, useRef, useEffect, useCallback } from "react";
// import { NavLink, Link, useLocation } from "react-router-dom";
// import { motion, AnimatePresence } from "framer-motion";
// import {
//   HomeIcon,
//   BookOpenIcon,
//   BriefcaseIcon,
//   SparklesIcon,
//   PencilSquareIcon,
//   NewspaperIcon,
//   EnvelopeIcon,
//   TicketIcon,
//   ChevronDownIcon,
//   Bars3Icon,
//   XMarkIcon,
// } from "@heroicons/react/24/outline";
// import { useCursor } from "./CustomCursor"; // assuming correct path

// function Header() {
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const location = useLocation();
//   const { setCursorVariant } = useCursor();
//   const navRefs = useRef({});
//   const navContainerRef = useRef(null);
//   const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0, opacity: 0 });

//   const isNavLinkActive = (path) => {
//     if (path === "/") return location.pathname === "/";
//     if (path === "/conferences") {
//       return ["/conferences", "/webinars", "/hybrids"].some((p) =>
//         location.pathname.startsWith(p)
//       );
//     }
//     return location.pathname.startsWith(path);
//   };

//   const updateIndicator = useCallback((element) => {
//     if (navContainerRef.current && element) {
//       const navRect = navContainerRef.current.getBoundingClientRect();
//       const itemRect = element.getBoundingClientRect();
//       setIndicatorStyle({
//         left: itemRect.left - navRect.left,
//         width: itemRect.width,
//         opacity: 1,
//       });
//     } else {
//       setIndicatorStyle((prev) => ({ ...prev, opacity: 0 }));
//     }
//   }, []);

//   useEffect(() => {
//     const setActiveIndicator = () => {
//       const sortedPaths = Object.keys(navRefs.current).sort((a, b) => b.length - a.length);
//       for (const path of sortedPaths) {
//         if (navRefs.current[path] && isNavLinkActive(path)) {
//           updateIndicator(navRefs.current[path]);
//           return;
//         }
//       }
//       setIndicatorStyle((prev) => ({ ...prev, opacity: 0 }));
//     };
//     const timer = setTimeout(setActiveIndicator, 100);
//     window.addEventListener("resize", setActiveIndicator);
//     return () => {
//       clearTimeout(timer);
//       window.removeEventListener("resize", setActiveIndicator);
//     };
//   }, [location.pathname, updateIndicator]);

//   useEffect(() => {
//     document.body.style.overflow = isMobileMenuOpen ? "hidden" : "unset";
//     return () => {
//       document.body.style.overflow = "unset";
//     };
//   }, [isMobileMenuOpen]);

//   const navLinkClasses = () =>
//     "relative h-full flex items-center justify-center text-white text-base font-semibold whitespace-nowrap px-4 py-2 z-20 group";

//   const mobileNavLinkClasses = (path) =>
//     `flex items-center px-6 py-4 text-xl font-medium border-b border-gray-700 ${
//       isNavLinkActive(path) ? "text-cyan-400 bg-gray-800" : "text-white hover:bg-gray-700"
//     } transition-colors duration-200 w-full`;

//   const handleLinkMouseEnter = () => setCursorVariant("interactive");
//   const handleLinkMouseLeave = () => setCursorVariant("default");

//   return (
//     <header className="fixed top-0 left-0 w-full z-[100] bg-black/80 backdrop-blur-md text-white transition-all duration-300 px-6 py-4">
//       <div className="flex justify-between items-center relative z-[1000]">
//         {/* Logo */}
//         <Link
//           to="/"
//           className="flex items-center z-20"
//           onMouseEnter={handleLinkMouseEnter}
//           onMouseLeave={handleLinkMouseLeave}
//         >
//           <img src="/assets/images/helix-logo.jpg" alt="Helix Logo" className="h-12" />
//         </Link>

//         {/* Desktop Nav */}
//         <nav
//           ref={navContainerRef}
//           className="hidden md:flex items-center h-full relative"
//           onMouseLeave={() => {
//             const activePath = Object.keys(navRefs.current).find((key) =>
//               isNavLinkActive(key)
//             );
//             if (activePath && navRefs.current[activePath]) {
//               updateIndicator(navRefs.current[activePath]);
//             } else {
//               setIndicatorStyle((prev) => ({ ...prev, opacity: 0 }));
//             }
//           }}
//         >
//           {/* Indicator */}
//           <span
//             className="absolute top-0 bottom-0 bg-transparent rounded-[8px] transition-all duration-300 ease-in-out focus-light-shadow z-10"
//             style={indicatorStyle}
//           ></span>

//           {[
//             { path: "/", icon: HomeIcon, label: "Home" },
//             { path: "/about", icon: BookOpenIcon, label: "About Us" },
//             { path: "/testimonials", icon: SparklesIcon, label: "Testimonials" },
//             { path: "/blog", icon: PencilSquareIcon, label: "Blog" },
//             { path: "/journals", icon: NewspaperIcon, label: "Journals" },
//             { path: "/contact", icon: EnvelopeIcon, label: "Contact" },
//             { path: "/buy-a-ticket", icon: TicketIcon, label: "Buy A Ticket", extraClass: "ml-4" },
//           ].map(({ path, icon: Icon, label, extraClass = "" }) => (
//             <NavLink
//               key={path}
//               to={path}
//               className={`${navLinkClasses()} ${extraClass}`}
//               onMouseEnter={(e) => {
//                 updateIndicator(e.currentTarget);
//                 handleLinkMouseEnter();
//               }}
//               onMouseLeave={handleLinkMouseLeave}
//               ref={(el) => (navRefs.current[path] = el)}
//             >
//               <Icon className="h-5 w-5 mr-1 text-gray-300" />
//               {label}
//             </NavLink>
//           ))}

//           {/* Dropdown */}
//           <div
//             className="relative group"
//             onMouseEnter={() => {
//               setIsDropdownOpen(true);
//               handleLinkMouseEnter();
//               updateIndicator(navRefs.current["/conferences"]);
//             }}
//             onMouseLeave={() => {
//               setIsDropdownOpen(false);
//               handleLinkMouseLeave();
//             }}
//           >
//             <NavLink
//               to="/conferences"
//               className={navLinkClasses()}
//               ref={(el) => (navRefs.current["/conferences"] = el)}
//             >
//               <BriefcaseIcon className="h-5 w-5 mr-1 text-gray-300" />
//               Conferences
//               <ChevronDownIcon className="ml-1 h-4 w-4 text-gray-300" />
//             </NavLink>
//             <div
//               className={`absolute top-full mt-2 left-1/2 -translate-x-1/2 w-52 rounded-md shadow-lg bg-gray-900/80 backdrop-blur border border-gray-700 transition duration-300 ${
//                 isDropdownOpen ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
//               }`}
//             >
//               {["hybrids", "webinars", "conferences"].map((route) => (
//                 <Link
//                   key={route}
//                   to={`/${route}`}
//                   className="block px-4 py-2 hover:bg-gray-700 text-white"
//                   onClick={() => setIsDropdownOpen(false)}
//                 >
//                   {route === "hybrids" ? "Hybrid Conferences" : route.charAt(0).toUpperCase() + route.slice(1)}
//                 </Link>
//               ))}
//             </div>
//           </div>
//         </nav>

//         {/* Hamburger (Mobile) */}
//         <button
//           className="md:hidden z-[1050]"
//           onClick={() => setIsMobileMenuOpen((prev) => !prev)}
//           onMouseEnter={handleLinkMouseEnter}
//           onMouseLeave={handleLinkMouseLeave}
//         >
//           {isMobileMenuOpen ? <XMarkIcon className="h-8 w-8" /> : <Bars3Icon className="h-8 w-8" />}
//         </button>
//       </div>
      

//       {/* Mobile Menu */}
//       <AnimatePresence>
//         {isMobileMenuOpen && (
//           <motion.div
//             initial={{ opacity: 0, y: -40 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: -40 }}
//             transition={{ duration: 0.3 }}
//             className="md:hidden fixed left-0 right-0 top-[80px] h-[calc(100vh-80px)] bg-gray-900 z-[1000] overflow-y-auto flex flex-col"
//           >
//             {[
//               { path: "/", label: "Home" },
//               { path: "/about", label: "About Us" },
//               { path: "/hybrids", label: "Hybrid Conferences" },
//               { path: "/webinars", label: "Webinars" },
//               { path: "/conferences", label: "All Conferences" },
//               { path: "/testimonials", label: "Testimonials" },
//               { path: "/blog", label: "Blog" },
//               { path: "/journals", label: "Journals" },
//               { path: "/contact", label: "Contact" },
//               { path: "/buy-a-ticket", label: "Buy A Ticket" },
//             ].map(({ path, label }) => (
//               <NavLink
//                 key={path}
//                 to={path}
//                 className={`${mobileNavLinkClasses(path)} h-16 flex items-center`}
//                 onClick={() => setIsMobileMenuOpen(false)}
//               >
//                 {label}
//               </NavLink>
//             ))}
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </header>
//   );
// }

// export default Header;











// // White Background Capsule

// src/components/Header.js

import React, { useState, useRef, useEffect, useCallback } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  HomeIcon,
  BookOpenIcon,
  BriefcaseIcon,
  SparklesIcon,
  PencilSquareIcon,
  NewspaperIcon,
  EnvelopeIcon,
  TicketIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";
import { useCursor } from "./CustomCursor"; // assuming correct path
import AnimatedHamburger from './hamburger/AnimatedHamburger_AccordionFold';
import  Logo from '../assets/images/Header-logo.png'

const MotionNavLink = motion(NavLink);

// Variants for the mobile menu container (orchestrates children animation)
const mobileMenuContainerVariants = {
  hidden: { opacity: 0, y: -50 }, // Initial state when closed
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      when: "beforeChildren", // Animate container before children
      staggerChildren: 0.08, // Delay between each child's animation
      delayChildren: 0.2, // Initial delay before the first child starts
      duration: 0.3,
      ease: "easeOut"
    }
  },
  exit: {
    opacity: 0,
    y: -50,
    transition: {
      when: "afterChildren", // Animate container after children exit
      staggerChildren: 0.05, // Stagger children exit as well
      staggerDirection: -1, // Exit from last to first
      duration: 0.2
    }
  }
};

// Variants for individual mobile menu items (Cascading Fade-Up with Spring)
const mobileMenuItemVariants = {
  hidden: { opacity: 0, y: 25 }, // Start slightly below and transparent
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 120, // Adjust for more/less stiffness
      damping: 12,    // Adjust for more/less bounce
      duration: 0.4
    }
  },
  exit: {
    opacity: 0,
    y: 25, // Move down and fade out on exit
    transition: {
      duration: 0.2
    }
  }
};

function Header() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { setCursorVariant } = useCursor();

  const [indicatorStyle, setIndicatorStyle] = useState({
    left: 0,
    width: 0,
    opacity: 0,
  });
  const navRefs = useRef({});
  const navContainerRef = useRef(null);

  const isNavLinkActive = useCallback((path) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    if (path === "/conferences") {
      return (
        location.pathname.startsWith("/hybrids") ||
        location.pathname.startsWith("/webinars") ||
        location.pathname.startsWith("/conferences")
      );
    }
    return location.pathname.startsWith(path);
  }, [location.pathname]);

  const updateIndicator = useCallback((element) => {
    if (navContainerRef.current && element) {
      const navRect = navContainerRef.current.getBoundingClientRect();
      const itemRect = element.getBoundingClientRect();

      setIndicatorStyle({
        left: itemRect.left - navRect.left,
        width: itemRect.width,
        opacity: 1,
      });
    } else {
      setIndicatorStyle((prev) => ({ ...prev, opacity: 0 }));
    }
  }, []);

  useEffect(() => {
    const setActiveIndicator = () => {
      let activeLinkElement = null;

      const sortedPaths = Object.keys(navRefs.current).sort((a, b) => b.length - a.length);

      for (const path of sortedPaths) {
        if (navRefs.current[path] && isNavLinkActive(path)) {
          activeLinkElement = navRefs.current[path];
          break;
        }
      }

      if (activeLinkElement) {
        updateIndicator(activeLinkElement);
      } else {
        setIndicatorStyle((prev) => ({ ...prev, opacity: 0 }));
      }
    };

    const timer = setTimeout(setActiveIndicator, 100);
    window.addEventListener("resize", setActiveIndicator);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", setActiveIndicator);
    };
  }, [location.pathname, updateIndicator, isNavLinkActive]);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const navLinkClasses = () => {
    return `relative h-full flex items-center justify-center text-white text-base font-semibold whitespace-nowrap px-4 py-2 z-20 group`;
  };

  const mobileNavLinkClasses = (path) => {
    const isActive = isNavLinkActive(path);
    return `flex items-center px-6 py-4 text-xl font-medium border-b border-gray-700 h-16 w-full group
      ${isActive ? "text-cyan-400 bg-gray-800" : "text-white hover:bg-gray-700"}
      transition-colors duration-200`;
  };

  const handleLinkMouseEnter = () => setCursorVariant("interactive");
  const handleLinkMouseLeave = () => setCursorVariant("default");

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-colors duration-300
        py-4 min-h-[80px] flex justify-between items-center px-6 bg-black/80 backdrop-blur-md`}
    >
      <Link
        to="/"
        className="flex items-center animate-fade-in-down z-20"
        style={{ animationDelay: "0.1s" }}
        onMouseEnter={handleLinkMouseEnter}
        onMouseLeave={handleLinkMouseLeave}
      >
        <img
          src= {Logo}
          alt="Helix Conferences Logo"
          className="h-12"
        />
      </Link>

      <nav
        ref={navContainerRef}
        className="relative hidden lg:flex items-center h-full"
        onMouseLeave={() => {
          const activeLinkKey = Object.keys(navRefs.current).find((key) =>
            isNavLinkActive(key)
          );
          if (activeLinkKey && navRefs.current[activeLinkKey]) {
            updateIndicator(navRefs.current[activeLinkKey]);
          } else {
            setIndicatorStyle((prev) => ({ ...prev, opacity: 0 }));
          }
        }}
      >
        <span
          className="absolute top-0 bottom-0 bg-transparent rounded-full transition-all duration-300 ease-in-out focus-light-shadow z-10"
          style={{
            left: indicatorStyle.left,
            width: indicatorStyle.width,
            opacity: indicatorStyle.opacity,
          }}
        ></span>

        <NavLink
          to="/"
          className={navLinkClasses()}
          onMouseEnter={(e) => { updateIndicator(e.currentTarget); handleLinkMouseEnter(); }}
          onMouseLeave={handleLinkMouseLeave}
          ref={(el) => (navRefs.current["/"] = el)}
        >
          <HomeIcon className="h-5 w-5 mr-1 text-gray-300 group-hover:rotate-[380deg] transition-transform duration-200" />
          Home
        </NavLink>

        <NavLink
          to="/about"
          className={navLinkClasses()}
          onMouseEnter={(e) => { updateIndicator(e.currentTarget); handleLinkMouseEnter(); }}
          onMouseLeave={handleLinkMouseLeave}
          ref={(el) => (navRefs.current["/about"] = el)}
        >
          <BookOpenIcon className="h-5 w-5 mr-1 text-gray-300 group-hover:rotate-[380deg] transition-transform duration-200" />
          About Us
        </NavLink>

        <div
          className="relative flex items-center h-full z-20 group"
          onMouseEnter={() => {
            setIsDropdownOpen(true);
            handleLinkMouseEnter();
            updateIndicator(navRefs.current["/conferences"]);
          }}
          onMouseLeave={() => {
            setIsDropdownOpen(false);
            handleLinkMouseLeave();
          }}
        >
          <NavLink
            to="/conferences"
            className="flex items-center justify-center text-white text-base font-semibold whitespace-nowrap px-4 py-2"
            ref={(el) => (navRefs.current["/conferences"] = el)}
          >
            <BriefcaseIcon className="h-5 w-5 mr-1 text-gray-300 group-hover:rotate-[380deg] transition-transform duration-200" />
            Conferences
            <ChevronDownIcon className="ml-1 h-4 w-4 transform transition-transform duration-200 text-gray-300" />
          </NavLink>
          <AnimatePresence>
            {isDropdownOpen && (
              <motion.div
                initial={{ opacity: 0, scaleY: 0, originY: 'top' }}
                animate={{ opacity: 1, scaleY: 1 }}
                exit={{ opacity: 0, scaleY: 0 }}
                transition={{ duration: 0.3 }}
                className={`absolute top-full left-0 w-52 rounded-md shadow-lg py-2
                             bg-gray-900/40 backdrop-blur-md border border-gray-700/50`} 
                onMouseEnter={handleLinkMouseEnter}
                onMouseLeave={handleLinkMouseLeave}
              >
                <Link
                  to="/hybrids"
                  className="block px-4 py-2 text-white hover:bg-gray-700 transition-colors duration-200"
                  onClick={() => setIsDropdownOpen(false)}
                >
                  Hybrid Conferences
                </Link>
                <Link
                  to="/webinars"
                  className="block px-4 py-2 text-white hover:bg-gray-700 transition-colors duration-200"
                  onClick={() => setIsDropdownOpen(false)}
                >
                  Webinars
                </Link>
                <Link
                  to="/conferences"
                  className="block px-4 py-2 text-white hover:bg-gray-700 transition-colors duration-200"
                  onClick={() => setIsDropdownOpen(false)}
                >
                  All Conferences
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <NavLink
          to="/testimonials"
          className={navLinkClasses()}
          onMouseEnter={(e) => { updateIndicator(e.currentTarget); handleLinkMouseEnter(); }}
          onMouseLeave={handleLinkMouseLeave}
          ref={(el) => (navRefs.current["/testimonials"] = el)}
        >
          <SparklesIcon className="h-5 w-5 mr-1 text-gray-300 group-hover:rotate-[380deg] transition-transform duration-200" />
          Testimonials
        </NavLink>

        <NavLink
          to="/blog"
          className={navLinkClasses()}
          onMouseEnter={(e) => { updateIndicator(e.currentTarget); handleLinkMouseEnter(); }}
          onMouseLeave={handleLinkMouseLeave}
          ref={(el) => (navRefs.current["/blog"] = el)}
        >
          <PencilSquareIcon className="h-5 w-5 mr-1 text-gray-300 group-hover:rotate-[380deg] transition-transform duration-200" />
          Blog
        </NavLink>

        <NavLink
          to="/journals"
          className={navLinkClasses()}
          onMouseEnter={(e) => { updateIndicator(e.currentTarget); handleLinkMouseEnter(); }}
          onMouseLeave={handleLinkMouseLeave}
          ref={(el) => (navRefs.current["/journals"] = el)}
        >
          <NewspaperIcon className="h-5 w-5 mr-1 text-gray-300 group-hover:rotate-[380deg] transition-transform duration-200" />
          Journals
        </NavLink>

        <NavLink
          to="/contact"
          className={navLinkClasses()}
          onMouseEnter={(e) => { updateIndicator(e.currentTarget); handleLinkMouseEnter(); }}
          onMouseLeave={handleLinkMouseLeave}
          ref={(el) => (navRefs.current["/contact"] = el)}
        >
          <EnvelopeIcon className="h-5 w-5 mr-1 text-gray-300 group-hover:rotate-[380deg] transition-transform duration-200" />
          Contact
        </NavLink>

        <NavLink
          to="/buy-a-ticket"
          className={`${navLinkClasses()} ml-4`}
          onMouseEnter={(e) => { updateIndicator(e.currentTarget); handleLinkMouseEnter(); }}
          onMouseLeave={handleLinkMouseLeave}
          ref={(el) => (navRefs.current["/buy-a-ticket"] = el)}
        >
          <TicketIcon className="h-5 w-5 mr-1 text-gray-300 group-hover:rotate-[380deg] transition-transform duration-200" />
          Buy A Ticket
        </NavLink>
      </nav>

      {/* NEW WRAPPER FOR HAMBURGER ICON */}
      {/* This div will be flex by default (visible on mobile/tablet) and hidden on large screens. */}
      <div className="flex lg:hidden">
        <AnimatedHamburger
          isOpen={isMobileMenuOpen}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          // Removed className prop from AnimatedHamburger itself, handled by parent div
        />
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="lg:hidden fixed left-0 right-0 top-[80px] pb-4 z-[5300] overflow-y-auto flex flex-col h-[calc(100vh-80px)] bg-white/80 backdrop-blur-md"
            variants={mobileMenuContainerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <MotionNavLink
              to="/"
              className={mobileNavLinkClasses("/")}
              onClick={() => setIsMobileMenuOpen(false)}
              variants={mobileMenuItemVariants}
            >
              <HomeIcon className="h-6 w-6 inline-block mr-3 text-gray-300 group-hover:rotate-[380deg] transition-transform duration-200" />
              Home
            </MotionNavLink>
            <MotionNavLink
              to="/about"
              className={mobileNavLinkClasses("/about")}
              onClick={() => setIsMobileMenuOpen(false)}
              variants={mobileMenuItemVariants}
            >
              <BookOpenIcon className="h-6 w-6 inline-block mr-3 text-gray-300 group-hover:rotate-[380deg] transition-transform duration-200" />
              About Us
            </MotionNavLink>

            <motion.div
              className="relative"
              variants={mobileMenuItemVariants}
            >
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className={`flex items-center w-full px-6 py-4 text-xl font-medium border-b border-gray-700 h-16 group
                              ${isDropdownOpen ? "text-cyan-400 bg-gray-800" : "text-white hover:bg-gray-700"}
                              transition-colors duration-200 focus:outline-none`}
              >
                <BriefcaseIcon className="h-6 w-6 inline-block mr-3 text-gray-300 group-hover:rotate-[380deg] transition-transform duration-200" />
                Conferences
                <ChevronDownIcon
                  className={`ml-auto h-5 w-5 transition-transform duration-200 ${
                    isDropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
              <AnimatePresence>
                {isDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="bg-gray-800 py-2 overflow-hidden"
                  >
                    <Link
                      to="/hybrids"
                      className="block px-10 py-2 text-white hover:bg-gray-700 transition-colors duration-200 text-base h-16 flex items-center"
                      onClick={() => { setIsMobileMenuOpen(false); setIsDropdownOpen(false); }}
                    >
                      Hybrid Conferences
                    </Link>
                    <Link
                      to="/webinars"
                      className="block px-10 py-2 text-white hover:bg-gray-700 transition-colors duration-200 text-base h-16 flex items-center"
                      onClick={() => { setIsMobileMenuOpen(false); setIsDropdownOpen(false); }}
                    >
                      Webinars
                    </Link>
                    <Link
                      to="/conferences"
                      className="block px-10 py-2 text-white hover:bg-gray-700 transition-colors duration-200 text-base h-16 flex items-center"
                      onClick={() => { setIsMobileMenuOpen(false); setIsDropdownOpen(false); }}
                    >
                      All Conferences
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
            <MotionNavLink
              to="/testimonials"
              className={mobileNavLinkClasses("/testimonials")}
              onClick={() => setIsMobileMenuOpen(false)}
              variants={mobileMenuItemVariants}
            >
              <SparklesIcon className="h-6 w-6 inline-block mr-3 text-gray-300 group-hover:rotate-[380deg] transition-transform duration-200" />
              Testimonials
            </MotionNavLink>
            <MotionNavLink
              to="/blog"
              className={mobileNavLinkClasses("/blog")}
              onClick={() => setIsMobileMenuOpen(false)}
              variants={mobileMenuItemVariants}
            >
              <PencilSquareIcon className="h-6 w-6 inline-block mr-3 text-gray-300 group-hover:rotate-[380deg] transition-transform duration-200" />
              Blog
            </MotionNavLink>
            <MotionNavLink
              to="/journals"
              className={mobileNavLinkClasses("/journals")}
              onClick={() => setIsMobileMenuOpen(false)}
              variants={mobileMenuItemVariants}
            >
              <NewspaperIcon className="h-6 w-6 inline-block mr-3 text-gray-300 group-hover:rotate-[380deg] transition-transform duration-200" />
              Journals
            </MotionNavLink>
            <MotionNavLink
              to="/contact"
              className={mobileNavLinkClasses("/contact")}
              onClick={() => setIsMobileMenuOpen(false)}
              variants={mobileMenuItemVariants}
            >
              <EnvelopeIcon className="h-6 w-6 inline-block mr-3 text-gray-300 group-hover:rotate-[380deg] transition-transform duration-200" />
              Contact
            </MotionNavLink>
            <MotionNavLink
              to="/buy-a-ticket"
              className={mobileNavLinkClasses("/buy-a-ticket")}
              onClick={() => setIsMobileMenuOpen(false)}
              variants={mobileMenuItemVariants}
            >
              <TicketIcon className="h-6 w-6 inline-block mr-3 text-gray-300 group-hover:rotate-[380deg] transition-transform duration-200" />
              Buy A Ticket
            </MotionNavLink>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export default Header;






// // // White Background for the navbar!
// // src/components/Header.js

// import React, { useState, useRef, useEffect, useCallback } from "react";
// import { NavLink, Link, useLocation } from "react-router-dom";
// import { motion, AnimatePresence } from "framer-motion";
// import {
//   HomeIcon,
//   BookOpenIcon,
//   BriefcaseIcon,
//   SparklesIcon,
//   PencilSquareIcon,
//   NewspaperIcon,
//   EnvelopeIcon,
//   TicketIcon,
//   ChevronDownIcon,
// } from "@heroicons/react/24/outline";
// import { useCursor } from "./CustomCursor"; // assuming correct path
// import AnimatedHamburger from './hamburger/AnimatedHamburger_AccordionFold';

// const MotionNavLink = motion(NavLink);

// // Variants for the mobile menu container (orchestrates children animation)
// const mobileMenuContainerVariants = {
//   hidden: { opacity: 0, y: -50 }, // Initial state when closed
//   visible: {
//     opacity: 1,
//     y: 0,
//     transition: {
//       when: "beforeChildren", // Animate container before children
//       staggerChildren: 0.08, // Delay between each child's animation
//       delayChildren: 0.2, // Initial delay before the first child starts
//       duration: 0.3,
//       ease: "easeOut"
//     }
//   },
//   exit: {
//     opacity: 0,
//     y: -50,
//     transition: {
//       when: "afterChildren", // Animate container after children exit
//       staggerChildren: 0.05, // Stagger children exit as well
//       staggerDirection: -1, // Exit from last to first
//       duration: 0.2
//     }
//   }
// };

// // Variants for individual mobile menu items (Cascading Fade-Up with Spring)
// const mobileMenuItemVariants = {
//   hidden: { opacity: 0, y: 25 }, // Start slightly below and transparent
//   visible: {
//     opacity: 1,
//     y: 0,
//     transition: {
//       type: "spring",
//       stiffness: 120, // Adjust for more/less stiffness
//       damping: 12,    // Adjust for more/less bounce
//       duration: 0.4
//     }
//   },
//   exit: {
//     opacity: 0,
//     y: 25, // Move down and fade out on exit
//     transition: {
//       duration: 0.2
//     }
//   }
// };

// function Header() {
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const location = useLocation();
//   const { setCursorVariant } = useCursor();

//   const [indicatorStyle, setIndicatorStyle] = useState({
//     left: 0,
//     width: 0,
//     opacity: 0,
//   });
//   const navRefs = useRef({});
//   const navContainerRef = useRef(null);

//   const isNavLinkActive = useCallback((path) => {
//     if (path === "/") {
//       return location.pathname === "/";
//     }
//     if (path === "/conferences") {
//       return (
//         location.pathname.startsWith("/hybrids") ||
//         location.pathname.startsWith("/webinars") ||
//         location.pathname.startsWith("/conferences")
//       );
//     }
//     return location.pathname.startsWith(path);
//   }, [location.pathname]);

//   const updateIndicator = useCallback((element) => {
//     if (navContainerRef.current && element) {
//       const navRect = navContainerRef.current.getBoundingClientRect();
//       const itemRect = element.getBoundingClientRect();

//       setIndicatorStyle({
//         left: itemRect.left - navRect.left,
//         width: itemRect.width,
//         opacity: 1,
//       });
//     } else {
//       setIndicatorStyle((prev) => ({ ...prev, opacity: 0 }));
//     }
//   }, []);

//   useEffect(() => {
//     const setActiveIndicator = () => {
//       let activeLinkElement = null;

//       const sortedPaths = Object.keys(navRefs.current).sort((a, b) => b.length - a.length);

//       for (const path of sortedPaths) {
//         if (navRefs.current[path] && isNavLinkActive(path)) {
//           activeLinkElement = navRefs.current[path];
//           break;
//         }
//       }

//       if (activeLinkElement) {
//         updateIndicator(activeLinkElement);
//       } else {
//         setIndicatorStyle((prev) => ({ ...prev, opacity: 0 }));
//       }
//     };

//     const timer = setTimeout(setActiveIndicator, 100);
//     window.addEventListener("resize", setActiveIndicator);

//     return () => {
//       clearTimeout(timer);
//       window.removeEventListener("resize", setActiveIndicator);
//     };
//   }, [location.pathname, updateIndicator, isNavLinkActive]);

//   useEffect(() => {
//     if (isMobileMenuOpen) {
//       document.body.style.overflow = 'hidden';
//     } else {
//       document.body.style.overflow = 'unset';
//     }
//     return () => {
//       document.body.style.overflow = 'unset';
//     };
//   }, [isMobileMenuOpen]);

//   const navLinkClasses = () => {
//     return `relative h-full flex items-center justify-center text-black text-base font-semibold whitespace-nowrap px-4 py-2 z-20 group`;
//   };

//   const mobileNavLinkClasses = (path) => {
//     const isActive = isNavLinkActive(path);
//     return `flex items-center px-6 py-4 text-xl font-medium border-b border-gray-200 h-16 w-full group
//       ${isActive ? "text-cyan-600 bg-gray-100" : "text-black hover:bg-gray-50"}
//       transition-colors duration-200`;
//   };

//   const handleLinkMouseEnter = () => setCursorVariant("interactive");
//   const handleLinkMouseLeave = () => setCursorVariant("default");

//   return (
//     <header
//       className={`fixed top-0 left-0 w-full z-50 transition-colors duration-300
//         py-4 min-h-[80px] flex justify-between items-center px-6 bg-white/40 backdrop-blur-md border-b border-white/20`}
//     >
//       <Link
//         to="/"
//         className="flex items-center animate-fade-in-down z-20"
//         style={{ animationDelay: "0.1s" }}
//         onMouseEnter={handleLinkMouseEnter}
//         onMouseLeave={handleLinkMouseLeave}
//       >
//         <img
//           src="/assets/images/helix-logo.jpg" // Ensure this logo looks good on a light background
//           alt="Helix Conferences Logo"
//           className="h-12"
//         />
//       </Link>

//       <nav
//         ref={navContainerRef}
//         className="relative hidden lg:flex items-center h-full"
//         onMouseLeave={() => {
//           const activeLinkKey = Object.keys(navRefs.current).find((key) =>
//             isNavLinkActive(key)
//           );
//           if (activeLinkKey && navRefs.current[activeLinkKey]) {
//             updateIndicator(navRefs.current[activeLinkKey]);
//           } else {
//             setIndicatorStyle((prev) => ({ ...prev, opacity: 0 }));
//           }
//         }}
//       >
//         <span
//           className="absolute top-0 bottom-0 rounded-full transition-all duration-300 ease-in-out z-10"
//           style={{
//             left: indicatorStyle.left,
//             width: indicatorStyle.width,
//             opacity: indicatorStyle.opacity,
//             boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)', // Black shadow for indicator
//             background: 'rgba(0, 0, 0, 0.05)', // Slight transparency for the indicator
//           }}
//         ></span>

//         <NavLink
//           to="/"
//           className={navLinkClasses()}
//           onMouseEnter={(e) => { updateIndicator(e.currentTarget); handleLinkMouseEnter(); }}
//           onMouseLeave={handleLinkMouseLeave}
//           ref={(el) => (navRefs.current["/"] = el)}
//         >
//           <HomeIcon className="h-5 w-5 mr-1 text-gray-700 group-hover:rotate-[380deg] transition-transform duration-200" />
//           Home
//         </NavLink>

//         <NavLink
//           to="/about"
//           className={navLinkClasses()}
//           onMouseEnter={(e) => { updateIndicator(e.currentTarget); handleLinkMouseEnter(); }}
//           onMouseLeave={handleLinkMouseLeave}
//           ref={(el) => (navRefs.current["/about"] = el)}
//         >
//           <BookOpenIcon className="h-5 w-5 mr-1 text-gray-700 group-hover:rotate-[380deg] transition-transform duration-200" />
//           About Us
//         </NavLink>

//         <div
//           className="relative flex items-center h-full z-20 group"
//           onMouseEnter={() => {
//             setIsDropdownOpen(true);
//             handleLinkMouseEnter();
//             updateIndicator(navRefs.current["/conferences"]);
//           }}
//           onMouseLeave={() => {
//             setIsDropdownOpen(false);
//             handleLinkMouseLeave();
//           }}
//         >
//           <NavLink
//             to="/conferences"
//             className="flex items-center justify-center text-black text-base font-semibold whitespace-nowrap px-4 py-2"
//             ref={(el) => (navRefs.current["/conferences"] = el)}
//           >
//             <BriefcaseIcon className="h-5 w-5 mr-1 text-gray-700 group-hover:rotate-[380deg] transition-transform duration-200" />
//             Conferences
//             <ChevronDownIcon className="ml-1 h-4 w-4 transform transition-transform duration-200 text-gray-700" />
//           </NavLink>
//           <AnimatePresence>
//             {isDropdownOpen && (
//               <motion.div
//                 initial={{ opacity: 0, scaleY: 0, originY: 'top' }}
//                 animate={{ opacity: 1, scaleY: 1 }}
//                 exit={{ opacity: 0, scaleY: 0 }}
//                 transition={{ duration: 0.3 }}
//                 className={`absolute top-full left-0 w-52 rounded-md shadow-lg py-2
//                              bg-white/70 backdrop-blur-md border border-gray-200`}
//                 onMouseEnter={handleLinkMouseEnter}
//                 onMouseLeave={handleLinkMouseLeave}
//               >
//                 <Link
//                   to="/hybrids"
//                   className="block px-4 py-2 text-black hover:bg-gray-100 transition-colors duration-200"
//                   onClick={() => setIsDropdownOpen(false)}
//                 >
//                   Hybrid Conferences
//                 </Link>
//                 <Link
//                   to="/webinars"
//                   className="block px-4 py-2 text-black hover:bg-gray-100 transition-colors duration-200"
//                   onClick={() => setIsDropdownOpen(false)}
//                 >
//                   Webinars
//                 </Link>
//                 <Link
//                   to="/conferences"
//                   className="block px-4 py-2 text-black hover:bg-gray-100 transition-colors duration-200"
//                   onClick={() => setIsDropdownOpen(false)}
//                 >
//                   All Conferences
//                 </Link>
//               </motion.div>
//             )}
//           </AnimatePresence>
//         </div>

//         <NavLink
//           to="/testimonials"
//           className={navLinkClasses()}
//           onMouseEnter={(e) => { updateIndicator(e.currentTarget); handleLinkMouseEnter(); }}
//           onMouseLeave={handleLinkMouseLeave}
//           ref={(el) => (navRefs.current["/testimonials"] = el)}
//         >
//           <SparklesIcon className="h-5 w-5 mr-1 text-gray-700 group-hover:rotate-[380deg] transition-transform duration-200" />
//           Testimonials
//         </NavLink>

//         <NavLink
//           to="/blog"
//           className={navLinkClasses()}
//           onMouseEnter={(e) => { updateIndicator(e.currentTarget); handleLinkMouseEnter(); }}
//           onMouseLeave={handleLinkMouseLeave}
//           ref={(el) => (navRefs.current["/blog"] = el)}
//         >
//           <PencilSquareIcon className="h-5 w-5 mr-1 text-gray-700 group-hover:rotate-[380deg] transition-transform duration-200" />
//           Blog
//         </NavLink>

//         <NavLink
//           to="/journals"
//           className={navLinkClasses()}
//           onMouseEnter={(e) => { updateIndicator(e.currentTarget); handleLinkMouseEnter(); }}
//           onMouseLeave={handleLinkMouseLeave}
//           ref={(el) => (navRefs.current["/journals"] = el)}
//         >
//           <NewspaperIcon className="h-5 w-5 mr-1 text-gray-700 group-hover:rotate-[380deg] transition-transform duration-200" />
//           Journals
//         </NavLink>

//         <NavLink
//           to="/contact"
//           className={navLinkClasses()}
//           onMouseEnter={(e) => { updateIndicator(e.currentTarget); handleLinkMouseEnter(); }}
//           onMouseLeave={handleLinkMouseLeave}
//           ref={(el) => (navRefs.current["/contact"] = el)}
//         >
//           <EnvelopeIcon className="h-5 w-5 mr-1 text-gray-700 group-hover:rotate-[380deg] transition-transform duration-200" />
//           Contact
//         </NavLink>

//         <NavLink
//           to="/buy-a-ticket"
//           className={`${navLinkClasses()} ml-4`}
//           onMouseEnter={(e) => { updateIndicator(e.currentTarget); handleLinkMouseEnter(); }}
//           onMouseLeave={handleLinkMouseLeave}
//           ref={(el) => (navRefs.current["/buy-a-ticket"] = el)}
//         >
//           <TicketIcon className="h-5 w-5 mr-1 text-gray-700 group-hover:rotate-[380deg] transition-transform duration-200" />
//           Buy A Ticket
//         </NavLink>
//       </nav>

//       {/* NEW WRAPPER FOR HAMBURGER ICON */}
//       {/* This div will be flex by default (visible on mobile/tablet) and hidden on large screens. */}
//       <div className="flex lg:hidden">
//         <AnimatedHamburger
//           isOpen={isMobileMenuOpen}
//           onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
//           // Removed className prop from AnimatedHamburger itself, handled by parent div
//         />
//       </div>

//       <AnimatePresence>
//         {isMobileMenuOpen && (
//           <motion.div
//             className="lg:hidden fixed left-0 right-0 top-[80px] pb-4 z-[5300] overflow-y-auto flex flex-col h-[calc(100vh-80px)] bg-white/90 backdrop-blur-md border-t border-gray-200"
//             variants={mobileMenuContainerVariants}
//             initial="hidden"
//             animate="visible"
//             exit="exit"
//           >
//             <MotionNavLink
//               to="/"
//               className={mobileNavLinkClasses("/")}
//               onClick={() => setIsMobileMenuOpen(false)}
//               variants={mobileMenuItemVariants}
//             >
//               <HomeIcon className="h-6 w-6 inline-block mr-3 text-gray-700 group-hover:rotate-[380deg] transition-transform duration-200" />
//               Home
//             </MotionNavLink>
//             <MotionNavLink
//               to="/about"
//               className={mobileNavLinkClasses("/about")}
//               onClick={() => setIsMobileMenuOpen(false)}
//               variants={mobileMenuItemVariants}
//             >
//               <BookOpenIcon className="h-6 w-6 inline-block mr-3 text-gray-700 group-hover:rotate-[380deg] transition-transform duration-200" />
//               About Us
//             </MotionNavLink>

//             <motion.div
//               className="relative"
//               variants={mobileMenuItemVariants}
//             >
//               <button
//                 onClick={() => setIsDropdownOpen(!isDropdownOpen)}
//                 className={`flex items-center w-full px-6 py-4 text-xl font-medium border-b border-gray-200 h-16 group
//                                ${isDropdownOpen ? "text-cyan-600 bg-gray-100" : "text-black hover:bg-gray-50"}
//                                transition-colors duration-200 focus:outline-none`}
//               >
//                 <BriefcaseIcon className="h-6 w-6 inline-block mr-3 text-gray-700 group-hover:rotate-[380deg] transition-transform duration-200" />
//                 Conferences
//                 <ChevronDownIcon
//                   className={`ml-auto h-5 w-5 transition-transform duration-200 text-gray-700 ${
//                     isDropdownOpen ? "rotate-180" : ""
//                   }`}
//                 />
//               </button>
//               <AnimatePresence>
//                 {isDropdownOpen && (
//                   <motion.div
//                     initial={{ opacity: 0, height: 0 }}
//                     animate={{ opacity: 1, height: 'auto' }}
//                     exit={{ opacity: 0, height: 0 }}
//                     transition={{ duration: 0.2 }}
//                     className="bg-gray-100 py-2 overflow-hidden"
//                   >
//                     <Link
//                       to="/hybrids"
//                       className="block px-10 py-2 text-black hover:bg-gray-200 transition-colors duration-200 text-base h-16 flex items-center"
//                       onClick={() => { setIsMobileMenuOpen(false); setIsDropdownOpen(false); }}
//                     >
//                       Hybrid Conferences
//                     </Link>
//                     <Link
//                       to="/webinars"
//                       className="block px-10 py-2 text-black hover:bg-gray-200 transition-colors duration-200 text-base h-16 flex items-center"
//                       onClick={() => { setIsMobileMenuOpen(false); setIsDropdownOpen(false); }}
//                     >
//                       Webinars
//                     </Link>
//                     <Link
//                       to="/conferences"
//                       className="block px-10 py-2 text-black hover:bg-gray-200 transition-colors duration-200 text-base h-16 flex items-center"
//                       onClick={() => { setIsMobileMenuOpen(false); setIsDropdownOpen(false); }}
//                     >
//                       All Conferences
//                     </Link>
//                   </motion.div>
//                 )}
//               </AnimatePresence>
//             </motion.div>
//             <MotionNavLink
//               to="/testimonials"
//               className={mobileNavLinkClasses("/testimonials")}
//               onClick={() => setIsMobileMenuOpen(false)}
//               variants={mobileMenuItemVariants}
//             >
//               <SparklesIcon className="h-6 w-6 inline-block mr-3 text-gray-700 group-hover:rotate-[380deg] transition-transform duration-200" />
//               Testimonials
//             </MotionNavLink>
//             <MotionNavLink
//               to="/blog"
//               className={mobileNavLinkClasses("/blog")}
//               onClick={() => setIsMobileMenuOpen(false)}
//               variants={mobileMenuItemVariants}
//             >
//               <PencilSquareIcon className="h-6 w-6 inline-block mr-3 text-gray-700 group-hover:rotate-[380deg] transition-transform duration-200" />
//               Blog
//             </MotionNavLink>
//             <MotionNavLink
//               to="/journals"
//               className={mobileNavLinkClasses("/journals")}
//               onClick={() => setIsMobileMenuOpen(false)}
//               variants={mobileMenuItemVariants}
//             >
//               <NewspaperIcon className="h-6 w-6 inline-block mr-3 text-gray-700 group-hover:rotate-[380deg] transition-transform duration-200" />
//               Journals
//             </MotionNavLink>
//             <MotionNavLink
//               to="/contact"
//               className={mobileNavLinkClasses("/contact")}
//               onClick={() => setIsMobileMenuOpen(false)}
//               variants={mobileMenuItemVariants}
//             >
//               <EnvelopeIcon className="h-6 w-6 inline-block mr-3 text-gray-700 group-hover:rotate-[380deg] transition-transform duration-200" />
//               Contact
//             </MotionNavLink>
//             <MotionNavLink
//               to="/buy-a-ticket"
//               className={mobileNavLinkClasses("/buy-a-ticket")}
//               onClick={() => setIsMobileMenuOpen(false)}
//               variants={mobileMenuItemVariants}
//             >
//               <TicketIcon className="h-6 w-6 inline-block mr-3 text-gray-700 group-hover:rotate-[380deg] transition-transform duration-200" />
//               Buy A Ticket
//             </MotionNavLink>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </header>
//   );
// }

// export default Header;











// // Underline Effect for the Navbar!


// // src/components/Header.js
// import React, { useState, useRef, useEffect, useCallback } from 'react';
// import { NavLink, Link, useLocation } from 'react-router-dom';
// import {
//   HomeIcon,
//   BookOpenIcon,
//   BriefcaseIcon,
//   SparklesIcon,
//   PencilSquareIcon,
//   NewspaperIcon,
//   EnvelopeIcon,
//   TicketIcon,
//   ChevronDownIcon,
//   Bars3Icon,
//   XMarkIcon,
// } from '@heroicons/react/24/outline';
// import { useCursor } from './CustomCursor';

// function Header() {
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const location = useLocation();
//   const { setCursorVariant } = useCursor();

//   // State for the moving "focus light" indicator (the glowing bottom line)
//   const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0, opacity: 0 });
//   const navRefs = useRef({}); // To store refs for each NavLink (for measurement)
//   const navContainerRef = useRef(null); // Ref for the main nav container (where the indicator positions itself relative to)

//   // Helper function to determine active state
//   const isNavLinkActive = (path, hash) => {
//     if (path === '/') {
//       if (hash) return location.pathname === '/' && location.hash === hash;
//       return location.pathname === '/';
//     }
//     // Handle conferences path for dropdown items too
//     if (path === '/conferences') {
//       return location.pathname.startsWith('/hybrids') ||
//              location.pathname.startsWith('/webinars') ||
//              location.pathname.startsWith('/conferences');
//     }
//     return location.pathname === path;
//   };

//   // Function to calculate and set indicator style
//   const updateIndicator = useCallback((element) => {
//     if (navContainerRef.current && element) {
//       const navRect = navContainerRef.current.getBoundingClientRect();
//       const itemRect = element.getBoundingClientRect();

//       setIndicatorStyle({
//         left: itemRect.left - navRect.left, // Position relative to the nav container
//         width: itemRect.width,
//         opacity: 1, // Make visible when active or hovered
//       });
//     } else {
//         setIndicatorStyle(prev => ({ ...prev, opacity: 0 })); // Hide if element is null or not found
//     }
//   }, []);

//   // Effect to set initial indicator position on load and route changes
//   useEffect(() => {
//     const setActiveIndicator = () => {
//       let activeLinkElement = null;

//       // Find the currently active link element
//       for (const path in navRefs.current) {
//         if (isNavLinkActive(path) && navRefs.current[path]) {
//           activeLinkElement = navRefs.current[path];
//           break;
//         }
//       }

//       // If no active link found by path, and on root path, default to home
//       if (!activeLinkElement && location.pathname === '/') {
//         activeLinkElement = navRefs.current['/'];
//       }

//       // Ensure 'Buy A Ticket' also gets the indicator if active
//       if (location.pathname === '/buy-a-ticket' && navRefs.current['/buy-a-ticket']) {
//         activeLinkElement = navRefs.current['/buy-a-ticket'];
//       }

//       if (activeLinkElement) {
//         updateIndicator(activeLinkElement);
//       } else {
//         // If no active element (e.g., 404 page or other unlisted path), hide indicator
//         setIndicatorStyle(prev => ({ ...prev, opacity: 0 }));
//       }
//     };

//     // Give a small delay to ensure elements are rendered and measured correctly
//     const timer = setTimeout(setActiveIndicator, 50); // Small delay
//     window.addEventListener('resize', setActiveIndicator); // Recalculate on resize

//     return () => {
//       clearTimeout(timer);
//       window.removeEventListener('resize', setActiveIndicator);
//     };
//   }, [location.pathname, location.hash, updateIndicator]); // Re-run when path or hash changes

//   // Classes for Desktop NavLinks (Icons AND Text)
//   const navLinkClasses = () => {
//     return `relative flex items-center justify-center text-white text-base font-semibold whitespace-nowrap px-4 py-2 group`;
//   };

//   const mobileNavLinkClasses = (path, { isActive }) =>
//     `flex items-center px-6 py-4 text-xl font-medium border-b border-gray-700
//      ${isActive || isNavLinkActive(path)
//        ? 'text-cyan-400 bg-gray-800'
//        : 'text-white hover:bg-gray-700'}
//      transition-colors duration-200`;

//   // Cursor hover handlers
//   const handleLinkMouseEnter = () => setCursorVariant('interactive');
//   const handleLinkMouseLeave = () => setCursorVariant('default');

//   return (
//     <header
//       className={`fixed top-0 left-0 w-full z-50 transition-colors duration-300
//         py-4 min-h-[80px] flex justify-between items-center px-6 glassmorphism-header`}
//     >
//       {/* Logo - separate from the main navigation, on the far left */}
//       <Link
//         to="/"
//         className="flex items-center animate-fade-in-down z-20"
//         style={{ animationDelay: '0.1s' }}
//         onMouseEnter={handleLinkMouseEnter}
//         onMouseLeave={handleLinkMouseLeave}
//       >
//         <img src="/assets/images/helix-logo.jpg" alt="Helix Conferences Logo" className="h-12" />
//       </Link>

//       {/* Main navigation container for Desktop (rectangular, transparent background) */}
//       <nav
//         ref={navContainerRef}
//         className="relative hidden md:flex items-center h-full space-x-2"
//         onMouseLeave={() => {
//           const activeLinkKey = Object.keys(navRefs.current).find(key => isNavLinkActive(key));
//           if (activeLinkKey && navRefs.current[activeLinkKey]) {
//             updateIndicator(navRefs.current[activeLinkKey]);
//           } else {
//             setIndicatorStyle(prev => ({ ...prev, opacity: 0 }));
//           }
//         }}
//       >
//         {/* The moving "focus light" indicator - thin glowing bottom line */}
//         <span
//           className="absolute bottom-0 h-0.5 bg-white rounded-full transition-all duration-300 ease-in-out focus-light-line-glow z-10"
//           style={{
//             left: indicatorStyle.left,
//             width: indicatorStyle.width,
//             opacity: indicatorStyle.opacity,
//           }}
//         ></span>

//         {/* Home Link */}
//         <NavLink
//           to="/"
//           className={navLinkClasses()}
//           onMouseEnter={(e) => { updateIndicator(e.currentTarget); handleLinkMouseEnter(); }}
//           onMouseLeave={handleLinkMouseLeave}
//           ref={(el) => (navRefs.current['/'] = el)}
//         >
//           <HomeIcon className="h-5 w-5 mr-1 text-gray-300 group-hover:rotate-3 transition-transform duration-200" />
//           Home
//         </NavLink>

//         {/* About Us Link */}
//         <NavLink
//           to="/about"
//           className={navLinkClasses()}
//           onMouseEnter={(e) => { updateIndicator(e.currentTarget); handleLinkMouseEnter(); }}
//           onMouseLeave={handleLinkMouseLeave}
//           ref={(el) => (navRefs.current['/about'] = el)}
//         >
//           <BookOpenIcon className="h-5 w-5 mr-1 text-gray-300 group-hover:rotate-3 transition-transform duration-200" />
//           About Us
//         </NavLink>

//         {/* Conferences Link (with Dropdown) */}
//         <div
//           className="relative flex items-center h-full z-20 group"
//           onMouseEnter={() => { setIsDropdownOpen(true); handleLinkMouseEnter(); updateIndicator(navRefs.current['/conferences']); }}
//           onMouseLeave={() => { setIsDropdownOpen(false); handleLinkMouseLeave(); }}
//         >
//           <NavLink
//             to="/conferences"
//             className="flex items-center justify-center text-white text-base font-semibold whitespace-nowrap px-4 py-2"
//             ref={(el) => (navRefs.current['/conferences'] = el)}
//           >
//             <BriefcaseIcon className="h-5 w-5 mr-1 text-gray-300 group-hover:rotate-3 transition-transform duration-200" />
//             Conferences
//             <ChevronDownIcon className="ml-1 h-4 w-4 transform transition-transform duration-200 text-gray-300" />
//           </NavLink>
//           {/* MODIFIED: Removed mt-2 from dropdown div for no gap */}
//           <div
//             className={`absolute top-full left-1/2 -translate-x-1/2 w-52 bg-gray-900 rounded-md shadow-lg py-2 origin-top transition-all duration-300
//                        ${isDropdownOpen ? 'scale-y-100 opacity-100 pointer-events-auto' : 'scale-y-0 opacity-0 pointer-events-none'}`}
//             onMouseEnter={handleLinkMouseEnter}
//             onMouseLeave={handleLinkMouseLeave}
//           >
//             <Link to="/hybrids" className="block px-4 py-2 text-white hover:bg-gray-700 transition-colors duration-200">
//               Hybrid Conferences
//             </Link>
//             <Link to="/webinars" className="block px-4 py-2 text-white hover:bg-gray-700 transition-colors duration-200">
//               Webinars
//             </Link>
//             <Link to="/conferences" className="block px-4 py-2 text-white hover:bg-gray-700 transition-colors duration-200">
//               All Conferences
//             </Link>
//           </div>
//         </div>

//         {/* Testimonials Link */}
//         <NavLink
//           to="/testimonials"
//           className={navLinkClasses()}
//           onMouseEnter={(e) => { updateIndicator(e.currentTarget); handleLinkMouseEnter(); }}
//           onMouseLeave={handleLinkMouseLeave}
//           ref={(el) => (navRefs.current['/testimonials'] = el)}
//         >
//           <SparklesIcon className="h-5 w-5 mr-1 text-gray-300 group-hover:rotate-3 transition-transform duration-200" />
//           Testimonials
//         </NavLink>

//         {/* Blog Link */}
//         <NavLink
//           to="/blog"
//           className={navLinkClasses()}
//           onMouseEnter={(e) => { updateIndicator(e.currentTarget); handleLinkMouseEnter(); }}
//           onMouseLeave={handleLinkMouseLeave}
//           ref={(el) => (navRefs.current['/blog'] = el)}
//         >
//           <PencilSquareIcon className="h-5 w-5 mr-1 text-gray-300 group-hover:rotate-3 transition-transform duration-200" />
//           Blog
//         </NavLink>

//         {/* Journals Link */}
//         <NavLink
//           to="/journals"
//           className={navLinkClasses()}
//           onMouseEnter={(e) => { updateIndicator(e.currentTarget); handleLinkMouseEnter(); }}
//           onMouseLeave={handleLinkMouseLeave}
//           ref={(el) => (navRefs.current['/journals'] = el)}
//         >
//           <NewspaperIcon className="h-5 w-5 mr-1 text-gray-300 group-hover:rotate-3 transition-transform duration-200" />
//           Journals
//         </NavLink>

//         {/* Contact Link */}
//         <NavLink
//           to="/contact"
//           className={navLinkClasses()}
//           onMouseEnter={(e) => { updateIndicator(e.currentTarget); handleLinkMouseEnter(); }}
//           onMouseLeave={handleLinkMouseLeave}
//           ref={(el) => (navRefs.current['/contact'] = el)}
//         >
//           <EnvelopeIcon className="h-5 w-5 mr-1 text-gray-300 group-hover:rotate-3 transition-transform duration-200" />
//           Contact
//         </NavLink>

//         {/* Buy A Ticket Button - Now inside the nav group, styled like other NavLinks */}
//         <NavLink
//           to="/buy-a-ticket"
//           className={`${navLinkClasses()} ml-4`}
//           onMouseEnter={(e) => { updateIndicator(e.currentTarget); handleLinkMouseEnter(); }}
//           onMouseLeave={handleLinkMouseLeave}
//           ref={(el) => (navRefs.current['/buy-a-ticket'] = el)}
//         >
//           <TicketIcon className="h-5 w-5 mr-1 text-gray-300 group-hover:rotate-3 transition-transform duration-200" />
//           Buy A Ticket
//         </NavLink>
//       </nav>

//       {/* Mobile Menu Button (always visible on small screens) */}
//       <button
//         onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
//         className="md:hidden text-white focus:outline-none focus:ring-2 focus:ring-cyan-400 rounded-md p-2 z-20"
//         onMouseEnter={handleLinkMouseEnter}
//         onMouseLeave={handleLinkMouseLeave}
//       >
//         {isMobileMenuOpen ? (
//           <XMarkIcon className="h-8 w-8" />
//         ) : (
//           <Bars3Icon className="h-8 w-8" />
//         )}
//       </button>

//       {/* Mobile Menu Panel */}
//       {isMobileMenuOpen && (
//         <div className="md:hidden fixed inset-0 bg-gray-900 bg-opacity-95 pb-4 pt-20 animate-slide-down z-40 overflow-y-auto">
//           {/* Logo at the top of the mobile menu for branding */}
//           <Link to="/" className="flex items-center px-6 py-4 text-white text-2xl font-semibold border-b border-gray-700" onClick={() => setIsMobileMenuOpen(false)}>
//             <img src="/assets/images/helix-logo.jpg" alt="Helix Conferences Logo" className="h-10 mr-3" />
//             <span>Helix Conferences</span>
//           </Link>
//           <NavLink to="/#home-hero" className={mobileNavLinkClasses('/', { isActive: isNavLinkActive('/') })} onClick={() => setIsMobileMenuOpen(false)}>
//             <HomeIcon className="h-6 w-6 inline-block mr-3" />Home
//           </NavLink>
//           <NavLink to="/about" className={mobileNavLinkClasses('/about', { isActive: isNavLinkActive('/about') })} onClick={() => setIsMobileMenuOpen(false)}>
//             <BookOpenIcon className="h-6 w-6 inline-block mr-3" />About Us
//           </NavLink>
//           <div className="relative">
//             <button
//               onClick={() => setIsDropdownOpen(!isDropdownOpen)}
//               className={`flex items-center w-full px-6 py-4 text-xl font-medium border-b border-gray-700
//                          ${isDropdownOpen ? 'text-cyan-400 bg-gray-800' : 'text-white hover:bg-gray-700'}
//                          transition-colors duration-200 focus:outline-none`}
//             >
//               <BriefcaseIcon className="h-6 w-6 inline-block mr-3" />Conferences
//               <ChevronDownIcon className={`ml-auto h-5 w-5 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
//             </button>
//             {isDropdownOpen && (
//               <div className="bg-gray-800 py-2">
//                 <Link to="/hybrids" className="block px-10 py-2 text-white hover:bg-gray-700 transition-colors duration-200">
//                   Hybrid Conferences
//                 </Link>
//                 <Link to="/webinars" className="block px-10 py-2 text-white hover:bg-gray-700 transition-colors duration-200">
//                   Webinars
//                 </Link>
//                  <Link to="/conferences" className="block px-10 py-2 text-white hover:bg-gray-700 transition-colors duration-200">
//                   All Conferences
//                 </Link>
//               </div>
//             )}
//           </div>
//           <NavLink to="/testimonials" className={mobileNavLinkClasses('/testimonials', { isActive: isNavLinkActive('/testimonials') })} onClick={() => setIsMobileMenuOpen(false)}>
//             <SparklesIcon className="h-6 w-6 inline-block mr-3" />Testimonials
//           </NavLink>
//           <NavLink to="/blog" className={mobileNavLinkClasses('/blog', { isActive: isNavLinkActive('/blog') })} onClick={() => setIsMobileMenuOpen(false)}>
//             <PencilSquareIcon className="h-6 w-6 inline-block mr-3" />Blog
//           </NavLink>
//           <NavLink to="/journals" className={mobileNavLinkClasses('/journals', { isActive: isNavLinkActive('/journals') })} onClick={() => setIsMobileMenuOpen(false)}>
//             <NewspaperIcon className="h-6 w-6 inline-block mr-3" />Journals
//           </NavLink>
//           <NavLink to="/contact" className={mobileNavLinkClasses('/contact', { isActive: isNavLinkActive('/contact') })} onClick={() => setIsMobileMenuOpen(false)}>
//             <EnvelopeIcon className="h-6 w-6 inline-block mr-3" />Contact
//           </NavLink>
//           <NavLink to="/buy-a-ticket" className={mobileNavLinkClasses('/buy-a-ticket', { isActive: isNavLinkActive('/buy-a-ticket') })} onClick={() => setIsMobileMenuOpen(false)}>
//             <TicketIcon className="h-6 w-6 inline-block mr-3" />Buy A Ticket
//           </NavLink>
//         </div>
//       )}
//     </header>
//   );
// }

// export default Header;

