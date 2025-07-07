// import React, { useEffect } from 'react';
// import { motion, useAnimation } from 'framer-motion';
// import { useInView } from 'react-intersection-observer'; // For scroll-based animations

// const AboutUs = () => {
//   const controls = useAnimation();
//   const [ref, inView] = useInView({
//     triggerOnce: true, // Animation triggers only once when element enters view
//     threshold: 0.1,    // Percentage of element visible to trigger
//   });

//   useEffect(() => {
//     if (inView) {
//       controls.start("visible");
//     }
//   }, [controls, inView]);

//   const textVariants = {
//     hidden: { opacity: 0, y: 50 },
//     visible: {
//       opacity: 1,
//       y: 0,
//       transition: {
//         duration: 0.8,
//         ease: "easeOut",
//       },
//     },
//   };

//   const imageVariants = {
//     hidden: { opacity: 0, scale: 0.8 },
//     visible: {
//       opacity: 1,
//       scale: 1,
//       transition: {
//         duration: 1,
//         ease: "easeOut",
//       },
//     },
//   };

//   return (
//     <div className="min-h-screen relative overflow-hidden text-white py-20 px-4 bg-gray-900">
//       {/* Background: Subtle Parallax Effect */}
//       <div
//         className="absolute inset-0 z-0 bg-cover bg-fixed bg-center"
//         style={{
//           backgroundImage: `url(https://placehold.co/1920x1080/4A2868/FFFFFF?text=About+Us+Background)`,
//           backgroundAttachment: 'fixed', // Creates parallax effect
//         }}
//       >
//         <div className="absolute inset-0 bg-black opacity-50"></div> {/* Dark overlay */}
//       </div>

//       <div className="container mx-auto relative z-10">
//         <motion.h1
//           className="text-4xl md:text-5xl font-bold text-center mb-12 animate-fade-in-up"
//           initial="hidden"
//           animate="visible"
//           variants={textVariants}
//         >
//           About Helix Conferences
//         </motion.h1>

//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
//           <motion.div
//             ref={ref}
//             initial="hidden"
//             animate={controls}
//             variants={textVariants}
//             className="space-y-6 text-lg leading-relaxed"
//           >
//             <p>
//               Welcome to Helix Conferences, a leading organizer of scientific and academic events worldwide.
//               Our mission is to foster collaboration, disseminate knowledge, and inspire innovation across various disciplines.
//               We believe in creating platforms where brilliant minds can connect, share insights, and collectively
//               address the grand challenges of our time.
//             </p>
//             <p>
//               Founded on the principles of excellence and accessibility, Helix Conferences brings together
//               researchers, academics, industry professionals, and students from diverse backgrounds.
//               We are committed to delivering high-quality, impactful conferences that not only advance
//               scientific understanding but also contribute to societal progress.
//             </p>
//             <p>
//               Our events are meticulously planned to offer a rich blend of keynote speeches,
//               oral presentations, poster sessions, workshops, and networking opportunities.
//               Join us as we explore the frontiers of knowledge and build a brighter future, together.
//             </p>
//           </motion.div>

//           <motion.div
//             ref={ref}
//             initial="hidden"
//             animate={controls}
//             variants={imageVariants}
//             className="relative overflow-hidden rounded-xl shadow-2xl group"
//           >
//             <img
//               src="https://placehold.co/800x600/6A3F9B/FFFFFF?text=Our+Vision"
//               alt="Our Vision"
//               className="w-full h-auto object-cover transform transition-all duration-500 group-hover:scale-105 group-hover:rounded-3xl"
//             />
//             <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
//               <h3 className="text-2xl font-semibold text-white">Our Vision for the Future</h3>
//             </div>
//           </motion.div>
//         </div>

//         <motion.div
//           ref={ref}
//           initial="hidden"
//           animate={controls}
//           variants={textVariants}
//           className="mt-16 text-center"
//         >
//           <p className="text-xl font-semibold">
//             "Connecting Minds, Advancing Science, Inspiring Innovation."
//           </p>
//         </motion.div>
//       </div>
//     </div>
//   );
// };

// export default AboutUs;










import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const CreativeAboutUs = () => {
    // Controls for triggering animations on scroll
    const controls = useAnimation();
    const [ref, inView] = useInView({
        triggerOnce: true, // Animation triggers only once when in view
        threshold: 0.15,   // Percentage of element visible to trigger (adjusted slightly)
    });

    useEffect(() => {
        if (inView) {
            controls.start("visible");
        }
    }, [controls, inView]);

    // Animation variants for different element types
    const sectionVariants = {
        hidden: { opacity: 0, y: 70 }, // Increased y-offset for more dramatic entry
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.9, // Slightly longer duration for smoother feel
                ease: "easeOut",
                staggerChildren: 0.25, // Stagger children
                delayChildren: 0.2 // Delay for children to start after parent
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 40, scale: 0.95 }, // Added scale for a 'pop-in' effect
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                duration: 0.7,
                ease: "easeOut"
            },
        },
    };

    const imageVariants = {
        hidden: { opacity: 0, scale: 0.85, rotate: -5 }, // Initial slight rotation for dynamism
        visible: {
            opacity: 1,
            scale: 1,
            rotate: 0,
            transition: {
                duration: 1.2, // Longer duration for image emphasis
                ease: [0.2, 0.6, 0.4, 1], // Custom ease for a more fluid feel
            },
        },
    };

    const statVariants = {
        hidden: { opacity: 0, y: 30, scale: 0.9 },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                duration: 0.8,
                ease: "easeOut",
            },
        },
    };

    // Static data extracted and enhanced
    const pageData = {
        meta: {
            title: "International Organizer For Webinars And Events",
            description: "Helix Conferences is the International Organizer for speakers and researchers. We are the biggest platform for promoting your ideas and knowledge through conferences."
        },
        header: {
            logo: "assets/img/logo/finallogo-e1707385272842.png",
            contactLink: "contact.html"
        },
        breadcrumb: {
            title: "About Us",
            backgroundImage: "assets/img/breadcrumb/About-Us.png",
            shapeImage: "assets/img/breadcrumb/breadcrumb-shape-1.png"
        },
        sections: [
            {
                id: "who-we-are",
                icon: "fa-solid fa-users",
                title: "Who We Are",
                subtitle: "Transforming Visions into Reality",
                text: "Have a vision? Let’s make it real. Our conferences provide the tools, resources, and connections necessary to turn your ideas into actionable plans.",
                bgShape: "assets/img/feature/one/feature-shape-1.png" // Reusing this shape for visual consistency
            },
            {
                id: "why-choose-us",
                icon: "fa-solid fa-lightbulb",
                title: "Why Choose Us",
                subtitle: "Igniting Minds, Inspiring Futures",
                text: "Our events spark creativity & passion, lighting the path for future leaders. Set your career on fire with unparalleled insights & networking opportunities.",
                bgShape: "assets/img/feature/one/feature-shape-1.png"
            },
            {
                id: "what-we-do",
                icon: "fa-solid fa-globe",
                title: "What We Do",
                subtitle: "Connecting Innovators Worldwide",
                text: "We bridge the gap between continents and cultures, connecting the brightest minds from around the globe. Come & Join Helix to Experience the difference.",
                bgShape: "assets/img/feature/one/feature-shape-1.png"
            }
        ],
        mainContent: {
            title: "Helix Conferences—Where Knowledge Meets Opportunity !!!",
            intro: "Are you ready to take your research and professional network to the next level? Welcome to Helix Conferences, the leading international organizer of scientific conferences that has been at the forefront of innovation for over six years. With a proven track record of executing more than 150 conferences across diverse fields—including Medical, Pharma, Biotech, Engineering, Agriculture, and Food—we are your gateway to a world of opportunities",
            bullets: [
                {
                    heading: "Global Expertise:",
                    text: "Join a community of over 25,000 eminent speakers from around the world. Our conferences attract top-tier professionals and thought leaders, providing you with unparalleled access to cutting-edge research and insights."
                },
                {
                    heading: "Networking Opportunities:",
                    text: "Our conferences are designed to foster meaningful connections. Engage with fellow researchers, industry experts, and potential collaborators, expanding your professional network and opening doors to new opportunities."
                },
                {
                    heading: "Rigorous Standards:",
                    text: "We pride ourselves on maintaining the highest standards in selecting research papers and speakers. This ensures that every conference is not only informative but also a showcase of cutting-edge research and innovation."
                },
                {
                    heading: "Quality Assurance:",
                    text: "Our stringent selection criteria guarantee that you’ll be part of a conference that upholds the highest standards of research and innovation."
                },
                {
                    heading: "Supportive Environment:",
                    text: "From the moment you submit your research to the final applause at the conference, our dedicated team is here to support you every step of the way."
                },
                {
                    heading: "Tailored Experiences:",
                    text: "We understand that every field has unique needs. Our conferences are designed to cater to the specific interests and challenges of each discipline, ensuring relevance and engagement."
                },
                {
                    heading: null, // No specific heading for the last point
                    text: "Join us at Helix Conferences and be part of a transformative experience that not only showcases your work but also propels your career forward. Let’s shape the future of science and innovation together!"
                }
            ],
            images: [
                "https://html.storebuild.shop/tecz-prv/tecz/assets/img/about/five/about-5-thumb-1.jpg",
                "https://html.storebuild.shop/tecz-prv/tecz/assets/img/about/five/about-5-thumb-2.jpg"
            ]
        }
    };

    return (
        <div className="min-h-screen relative overflow-hidden text-white bg-gradient-to-br from-gray-900 via-purple-950 to-black">
            {/* Background Gradient/Blobs for uniqueness */}
            <div className="absolute inset-0 z-0 opacity-20">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
                <div className="absolute top-1/2 right-1/4 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
                <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
            </div>

            {/* Breadcrumb Area - More dynamic and attractive */}
            <section
                className="relative py-28 md:py-40 bg-cover bg-center overflow-hidden"
                style={{
                    backgroundImage: `url(${pageData.breadcrumb.backgroundImage})`,
                    backgroundAttachment: 'fixed', // Parallax effect
                }}
            >
                <div className="absolute inset-0 bg-black bg-opacity-70 backdrop-blur-sm"></div>
                <div className="container mx-auto relative z-10 text-center px-4">
                    <motion.h1
                        className="text-5xl md:text-7xl font-extrabold mb-4 drop-shadow-2xl text-transparent bg-clip-text bg-gradient-to-r from-teal-300 to-indigo-400"
                        initial="hidden"
                        animate="visible"
                        variants={itemVariants}
                    >
                        {pageData.breadcrumb.title}
                    </motion.h1>
                    <motion.p
                        className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto"
                        initial="hidden"
                        animate="visible"
                        variants={itemVariants}
                        transition={{ delay: 0.3 }}
                    >
                        {pageData.meta.description}
                    </motion.p>
                </div>
                {/* Decorative shape - subtle and moving */}
                <motion.div
                    className="absolute -bottom-10 right-0 hidden md:block opacity-30"
                    initial={{ x: '100%', rotate: 0 }}
                    animate={{ x: '0%', rotate: 10 }}
                    transition={{ duration: 2.5, ease: "easeOut", repeat: Infinity, repeatType: "reverse", repeatDelay: 1 }}
                >
                    <img src={pageData.breadcrumb.shapeImage} alt="Decorative shape" className="w-auto h-40 lg:h-60" />
                </motion.div>
            </section>

            {/* Who We Are / Why Choose Us / What We Do Section - Enhanced Layout & Interaction */}
            <section
                ref={ref}
                className="py-20 px-4 relative z-10"
                style={{ backgroundImage: `url(assets/img/feature/inner/about-banner.png)`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundAttachment: 'fixed' }}
            >
                <div className="absolute inset-0 bg-gray-900 opacity-80"></div> {/* Overlay for readability */}
                <div className="container mx-auto relative z-20">
                    <motion.div
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
                        initial="hidden"
                        animate={controls}
                        variants={sectionVariants}
                    >
                        {pageData.sections.map((section, index) => (
                            <motion.div
                                key={section.id}
                                variants={itemVariants}
                                whileHover={{ scale: 1.03, boxShadow: "0 15px 30px rgba(0,0,0,0.5), 0 0 0 5px rgba(129, 140, 248, 0.3)" }}
                                transition={{ duration: 0.3 }}
                                className="bg-gray-800 bg-opacity-90 border border-gray-700 p-10 rounded-2xl shadow-xl flex flex-col items-center text-center relative overflow-hidden group hover:border-purple-500 transition-all duration-300"
                            >
                                {/* Background shape effect */}
                                <div className="absolute inset-0 bg-cover bg-center opacity-10 group-hover:opacity-20 transition-opacity duration-500"
                                     style={{ backgroundImage: `url(${section.bgShape})` }}></div>
                                <div className="relative z-10">
                                    <div className="text-6xl text-transparent bg-clip-text bg-gradient-to-br from-yellow-300 to-orange-400 mb-6 group-hover:animate-bounce-y">
                                        <i className={section.icon}></i>
                                    </div>
                                    <h4 className="text-3xl font-bold mb-3 text-white">{section.title}</h4>
                                    <h6 className="text-yellow-300 text-xl mb-4">{section.subtitle}</h6>
                                    <p className="text-gray-300 text-base leading-relaxed fs-size">{section.text}</p>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Video Area / Where Knowledge Meets Opportunity Section - More dynamic visuals */}
            <section className="py-20 px-4 bg-gray-900 relative z-10">
                <div className="container mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        {/* Images Column - Advanced layout with overlapping & parallax */}
                        <motion.div
                            ref={ref}
                            initial="hidden"
                            animate={controls}
                            variants={sectionVariants}
                            className="relative h-[450px] lg:h-[600px] flex justify-center items-center"
                        >
                            <motion.img
                                variants={imageVariants}
                                src={pageData.mainContent.images[0]}
                                alt="Conference Scene 1"
                                className="absolute top-0 left-0 w-2/3 md:w-auto h-auto max-h-[400px] object-cover rounded-2xl shadow-2xl z-10 transform rotate-[-5deg] group-hover:rotate-[-8deg] transition-transform duration-500"
                                style={{
                                    maxWidth: '80%', // Responsive sizing
                                    aspectRatio: '4/3', // Maintain aspect ratio
                                    boxShadow: '0 15px 30px rgba(0,0,0,0.6)'
                                }}
                                whileHover={{ scale: 1.05, rotate: -7 }}
                            />
                            <motion.img
                                variants={imageVariants}
                                src={pageData.mainContent.images[1]}
                                alt="Conference Scene 2"
                                className="absolute bottom-0 right-0 w-2/3 md:w-auto h-auto max-h-[400px] object-cover rounded-2xl shadow-2xl z-20 transform rotate-[8deg] group-hover:rotate-[10deg] transition-transform duration-500"
                                style={{
                                    maxWidth: '70%', // Responsive sizing
                                    aspectRatio: '3/4', // Maintain aspect ratio
                                    boxShadow: '0 15px 30px rgba(0,0,0,0.6)'
                                }}
                                whileHover={{ scale: 1.05, rotate: 10 }}
                            />
                            {/* Visual connecting element */}
                            <motion.div
                                className="absolute w-full h-full border-4 border-dashed border-purple-600 rounded-3xl opacity-20"
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={controls}
                                variants={{
                                    visible: { scale: 1, opacity: 0.2, transition: { duration: 1.5, delay: 0.5 } }
                                }}
                            ></motion.div>
                        </motion.div>

                        {/* Text Content Column - Improved Readability & Interaction */}
                        <motion.div
                            ref={ref}
                            initial="hidden"
                            animate={controls}
                            variants={sectionVariants}
                            className="space-y-6 text-lg leading-relaxed lg:order-2 order-1 lg:pl-10 p-4 bg-gray-800 bg-opacity-70 rounded-xl shadow-2xl border border-gray-700"
                        >
                            <h4 className="text-3xl md:text-5xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
                                <motion.span variants={itemVariants}>{pageData.mainContent.title}</motion.span>
                            </h4>
                            <motion.p variants={itemVariants} className="text-gray-200 text-lg leading-relaxed fs-size max-h-80 overflow-y-auto pr-4 custom-scrollbar">
                                {pageData.mainContent.intro}
                                <ul className="mt-8 space-y-4">
                                    {pageData.mainContent.bullets.map((bullet, index) => (
                                        <motion.li
                                            key={index}
                                            variants={itemVariants}
                                            className="flex items-start py-1 fs-size"
                                            whileHover={{ x: 5 }} // Slight slide on hover for bullets
                                        >
                                            <i className="fa-solid fa-play text-yellow-300 mr-3 mt-1.5 min-w-[20px]"></i>
                                            <span>
                                                {bullet.heading && <span className="font-semibold text-white">{bullet.heading}</span>}{' '}
                                                {bullet.text}
                                            </span>
                                        </motion.li>
                                    ))}
                                </ul>
                            </motion.p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Optional: Add a call to action or footer-like element here if desired */}
            {/* <section className="py-20 text-center bg-gray-800 bg-opacity-60 mt-20">
                <motion.h2 variants={sectionVariants} className="text-4xl font-bold mb-6 text-emerald-400">Ready to Experience the Difference?</motion.h2>
                <motion.button
                    variants={itemVariants}
                    whileHover={{ scale: 1.1, boxShadow: "0 0 25px rgba(52, 211, 153, 0.7)" }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-4 px-10 rounded-full text-xl transition duration-300 ease-in-out shadow-lg"
                >
                    View All Conferences
                </motion.button>
            </section> */}
        </div>
    );
};

export default CreativeAboutUs;



// import React, { useEffect } from 'react';
// import { motion, useAnimation } from 'framer-motion';
// import { useInView } from 'react-intersection-observer';

// const MinimalistAboutUs = () => {
//     // Controls for triggering animations on scroll
//     const controls = useAnimation();
//     const [ref, inView] = useInView({
//         triggerOnce: true, // Animation triggers only once when in view
//         threshold: 0.1,   // Trigger earlier for subtle reveals
//     });

//     useEffect(() => {
//         if (inView) {
//             controls.start("visible");
//         }
//     }, [controls, inView]);

//     // Animation variants
//     const sectionVariants = {
//         hidden: { opacity: 0, y: 30 }, // Reduced y-offset for subtle entry
//         visible: {
//             opacity: 1,
//             y: 0,
//             transition: {
//                 duration: 0.8,
//                 ease: "easeOut",
//                 staggerChildren: 0.15, // Slightly faster stagger
//                 delayChildren: 0.1 // Shorter delay
//             },
//         },
//     };

//     const itemVariants = {
//         hidden: { opacity: 0, y: 20 }, // Minimal Y-shift
//         visible: {
//             opacity: 1,
//             y: 0,
//             transition: {
//                 duration: 0.6,
//                 ease: "easeOut"
//             },
//         },
//     };

//     const iconVariants = {
//         rest: { scale: 1, rotate: 0 },
//         hover: { scale: 1.1, rotate: 5, transition: { duration: 0.2 } }, // Gentle scale and rotate on hover
//     };

//     const bulletVariants = {
//         hidden: { opacity: 0, x: -10 },
//         visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
//         hover: { x: 8, transition: { duration: 0.2 } }, // More pronounced slide on hover
//     };

//     // Data remains the same for consistency
//     const pageData = {
//         meta: {
//             title: "International Organizer For Webinars And Events",
//             description: "Helix Conferences is the International Organizer for speakers and researchers. We are the biggest platform for promoting your ideas and knowledge through conferences."
//         },
//         breadcrumb: {
//             title: "About Us",
//             backgroundImage: "assets/img/breadcrumb/About-Us.png", // Will be used as a subtle texture or removed
//             shapeImage: "assets/img/breadcrumb/breadcrumb-shape-1.png" // Minimal use or replaced
//         },
//         sections: [
//             {
//                 id: "who-we-are",
//                 icon: "fa-solid fa-users",
//                 title: "Who We Are",
//                 subtitle: "Transforming Visions into Reality",
//                 text: "Have a vision? Let’s make it real. Our conferences provide the tools, resources, and connections necessary to turn your ideas into actionable plans."
//             },
//             {
//                 id: "why-choose-us",
//                 icon: "fa-solid fa-lightbulb",
//                 title: "Why Choose Us",
//                 subtitle: "Igniting Minds, Inspiring Futures",
//                 text: "Our events spark creativity & passion, lighting the path for future leaders. Set your career on fire with unparalleled insights & networking opportunities."
//             },
//             {
//                 id: "what-we-do",
//                 icon: "fa-solid fa-globe",
//                 title: "What We Do",
//                 subtitle: "Connecting Innovators Worldwide",
//                 text: "We bridge the gap between continents and cultures, connecting the brightest minds from around the globe. Come & Join Helix to Experience the difference."
//             }
//         ],
//         mainContent: {
//             title: "Helix Conferences—Where Knowledge Meets Opportunity",
//             intro: "Are you ready to take your research and professional network to the next level? Welcome to Helix Conferences, the leading international organizer of scientific conferences that has been at the forefront of innovation for over six years. With a proven track record of executing more than 150 conferences across diverse fields—including Medical, Pharma, Biotech, Engineering, Agriculture, and Food—we are your gateway to a world of opportunities",
//             bullets: [
//                 {
//                     heading: "Global Expertise:",
//                     text: "Join a community of over 25,000 eminent speakers from around the world. Our conferences attract top-tier professionals and thought leaders, providing you with unparalleled access to cutting-edge research and insights."
//                 },
//                 {
//                     heading: "Networking Opportunities:",
//                     text: "Our conferences are designed to foster meaningful connections. Engage with fellow researchers, industry experts, and potential collaborators, expanding your professional network and opening doors to new opportunities."
//                 },
//                 {
//                     heading: "Rigorous Standards:",
//                     text: "We pride ourselves on maintaining the highest standards in selecting research papers and speakers. This ensures that every conference is not only informative but also a showcase of cutting-edge research and innovation."
//                 },
//                 {
//                     heading: "Quality Assurance:",
//                     text: "Our stringent selection criteria guarantee that you’ll be part of a conference that upholds the highest standards of research and innovation."
//                 },
//                 {
//                     heading: "Supportive Environment:",
//                     text: "From the moment you submit your research to the final applause at the conference, our dedicated team is here to support you every step of the way."
//                 },
//                 {
//                     heading: "Tailored Experiences:",
//                     text: "We understand that every field has unique needs. Our conferences are designed to cater to the specific interests and challenges of each discipline, ensuring relevance and engagement."
//                 },
//                 {
//                     heading: null,
//                     text: "Join us at Helix Conferences and be part of a transformative experience that not only showcases your work but also propels your career forward. Let’s shape the future of science and innovation together!"
//                 }
//             ],
//             images: [ // These will be used in a cleaner, less overlapping way
//                 "https://html.storebuild.shop/tecz-prv/tecz/assets/img/about/five/about-5-thumb-1.jpg",
//                 "https://html.storebuild.shop/tecz-prv/tecz/assets/img/about/five/about-5-thumb-2.jpg"
//             ]
//         }
//     };

//     return (
//         <div className="min-h-screen relative overflow-hidden text-white bg-gray-950 font-sans">
//             {/* Background elements are removed or heavily simplified for minimalism */}
//             {/* The previous blob animations are replaced with a single, subtle, radial gradient */}
//             <div className="absolute inset-0 z-0 opacity-10" style={{ background: 'radial-gradient(circle at top left, rgba(128,0,128,0.1) 0%, transparent 50%), radial-gradient(circle at bottom right, rgba(0,0,255,0.1) 0%, transparent 50%)' }}></div>

//             {/* Hero/Breadcrumb Area - Clean & Typographic */}
//             <section className="relative py-32 md:py-48 flex items-center justify-center text-center overflow-hidden z-10">
//                 {/* Subtle, almost invisible background texture or shape */}
//                 <div
//                     className="absolute inset-0 opacity-5"
//                     style={{
//                         backgroundImage: `url(${pageData.breadcrumb.backgroundImage})`,
//                         backgroundSize: 'cover',
//                         backgroundPosition: 'center',
//                         filter: 'grayscale(100%) blur(5px)', // Desaturate and blur for subtle effect
//                         transform: 'scale(1.05)' // Slightly zoomed for effect
//                     }}
//                 ></div>
//                 <div className="absolute inset-0 bg-gray-950 bg-opacity-80 backdrop-filter backdrop-blur-sm"></div>

//                 <div className="container mx-auto relative z-20 px-4 max-w-4xl">
//                     <motion.h1
//                         className="text-6xl md:text-8xl font-extrabold mb-6 tracking-tight leading-tight text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-300 drop-shadow-md"
//                         initial="hidden"
//                         animate="visible"
//                         variants={itemVariants}
//                     >
//                         {pageData.breadcrumb.title}
//                     </motion.h1>
//                     <motion.p
//                         className="text-xl md:text-2xl text-gray-300 font-light max-w-3xl mx-auto"
//                         initial="hidden"
//                         animate="visible"
//                         variants={itemVariants}
//                         transition={{ delay: 0.3 }}
//                     >
//                         {pageData.meta.description}
//                     </motion.p>
//                     {/* Minimal decorative element, not animated complexly */}
//                     <motion.div
//                         className="w-16 h-1.5 bg-yellow-400 mx-auto mt-10 rounded-full"
//                         initial={{ width: 0, opacity: 0 }}
//                         animate={{ width: '4rem', opacity: 1 }}
//                         transition={{ delay: 0.6, duration: 0.8, ease: "easeOut" }}
//                     ></motion.div>
//                 </div>
//             </section>

//             {/* Feature Blocks (Who We Are, Why Choose Us, What We Do) - Clean Cards with Icon Micro-interactions */}
//             <section
//                 ref={ref}
//                 className="py-24 px-4 relative z-10 bg-gray-900"
//             >
//                 <div className="container mx-auto relative z-20">
//                     <motion.div
//                         className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto"
//                         initial="hidden"
//                         animate={controls}
//                         variants={sectionVariants}
//                     >
//                         {pageData.sections.map((section, index) => (
//                             <motion.div
//                                 key={section.id}
//                                 variants={itemVariants}
//                                 whileHover="hover"
//                                 initial="rest"
//                                 className="bg-gray-800 border border-gray-700 p-8 rounded-xl shadow-xl flex flex-col items-center text-center transition-all duration-300 hover:border-blue-500 hover:shadow-blue-900/30 group"
//                             >
//                                 <motion.div
//                                     variants={iconVariants}
//                                     className="text-5xl text-blue-400 mb-6 group-hover:text-yellow-400 transition-colors duration-300"
//                                 >
//                                     <i className={section.icon}></i>
//                                 </motion.div>
//                                 <h4 className="text-2xl font-bold mb-2 text-white">{section.title}</h4>
//                                 <h6 className="text-blue-300 text-lg mb-4">{section.subtitle}</h6>
//                                 <p className="text-gray-300 text-base leading-relaxed">{section.text}</p>
//                             </motion.div>
//                         ))}
//                     </motion.div>
//                 </div>
//             </section>

//             {/* Main Content (Where Knowledge Meets Opportunity) - Structured & Clean */}
//             <section className="py-24 px-4 bg-gray-950 relative z-10">
//                 <div className="container mx-auto">
//                     <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
//                         {/* Images Column - Cleaner layout, less overlap */}
//                         <motion.div
//                             ref={ref}
//                             initial="hidden"
//                             animate={controls}
//                             variants={sectionVariants}
//                             className="relative flex flex-col items-center justify-center space-y-8 p-4 bg-gray-800 rounded-xl shadow-2xl border border-gray-700"
//                         >
//                             <motion.img
//                                 variants={itemVariants} // Reusing itemVariants for clean fade-in
//                                 src={pageData.mainContent.images[0]}
//                                 alt="Conference Scene 1"
//                                 className="w-full h-auto object-cover rounded-lg shadow-lg"
//                                 style={{ maxWidth: '400px', aspectRatio: '4/3' }}
//                                 whileHover={{ scale: 1.03, rotate: -2, transition: { duration: 0.3 } }}
//                             />
//                             <motion.img
//                                 variants={itemVariants} // Reusing itemVariants for clean fade-in
//                                 src={pageData.mainContent.images[1]}
//                                 alt="Conference Scene 2"
//                                 className="w-full h-auto object-cover rounded-lg shadow-lg"
//                                 style={{ maxWidth: '400px', aspectRatio: '3/4' }}
//                                 whileHover={{ scale: 1.03, rotate: 2, transition: { duration: 0.3 } }}
//                             />
//                         </motion.div>

//                         {/* Text Content Column - Accordion/Tabbed-like Structure (Simulated) */}
//                         <motion.div
//                             ref={ref}
//                             initial="hidden"
//                             animate={controls}
//                             variants={sectionVariants}
//                             className="space-y-8 text-lg leading-relaxed lg:pl-10 p-4 bg-gray-800 rounded-xl shadow-2xl border border-gray-700"
//                         >
//                             <h4 className="text-4xl md:text-5xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-purple-400">
//                                 <motion.span variants={itemVariants}>{pageData.mainContent.title}</motion.span>
//                             </h4>
//                             <motion.p variants={itemVariants} className="text-gray-200 text-lg leading-relaxed mb-8">
//                                 {pageData.mainContent.intro}
//                             </motion.p>

//                             {/* Accordion/Collapsible Bullets Simulation */}
//                             <div className="space-y-4">
//                                 {pageData.mainContent.bullets.map((bullet, index) => (
//                                     <motion.div
//                                         key={index}
//                                         className="border-b border-gray-700 pb-4 last:border-b-0 last:pb-0"
//                                     >
//                                         <motion.li
//                                             variants={bulletVariants}
//                                             initial="hidden"
//                                             animate={controls} // Each bullet animates with section
//                                             whileHover="hover"
//                                             className="flex items-start text-white cursor-pointer group"
//                                             // For a true accordion, you'd add state here to toggle visibility
//                                         >
//                                             <i className="fa-solid fa-circle-check text-yellow-400 mr-3 mt-1.5 min-w-[20px] group-hover:text-blue-400 transition-colors duration-200"></i>
//                                             <span className="flex-1">
//                                                 {bullet.heading && <span className="font-semibold text-white group-hover:text-blue-200 transition-colors duration-200">{bullet.heading}</span>}{' '}
//                                                 <span className="text-gray-300 group-hover:text-gray-200 transition-colors duration-200">{bullet.text}</span>
//                                             </span>
//                                         </motion.li>
//                                         {/* In a real accordion, the content would be here, conditionally rendered */}
//                                         {/* <motion.p
//                                             initial={{ height: 0, opacity: 0 }}
//                                             animate={activeIndex === index ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }}
//                                             transition={{ duration: 0.3, ease: "easeOut" }}
//                                             className="text-gray-400 text-sm mt-2 pl-8"
//                                         >
//                                             More details about {bullet.heading || 'this point'}.
//                                         </motion.p> */}
//                                     </motion.div>
//                                 ))}
//                             </div>
//                         </motion.div>
//                     </div>
//                 </div>
//             </section>

//             {/* Minimalist Call to Action */}
//             <section className="py-20 text-center bg-gray-900 border-t border-gray-800 relative z-10">
//                 <motion.h2
//                     variants={sectionVariants}
//                     initial="hidden"
//                     animate={controls}
//                     className="text-4xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-cyan-400"
//                 >
//                     Ready to Connect and Innovate?
//                 </motion.h2>
//                 <motion.button
//                     variants={itemVariants}
//                     whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(52, 211, 153, 0.4)", backgroundColor: '#06d6a0' }} // Subtle hover on color
//                     whileTap={{ scale: 0.95 }}
//                     className="bg-emerald-500 text-white font-bold py-4 px-12 rounded-full text-xl transition-all duration-300 ease-in-out shadow-lg tracking-wide border-2 border-emerald-500 hover:border-emerald-400"
//                 >
//                     Contact Us Today
//                 </motion.button>
//             </section>
//         </div>
//     );
// };

// export default MinimalistAboutUs;