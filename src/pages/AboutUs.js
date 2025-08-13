import React from "react";
import { motion } from "framer-motion";
import AboutBanner from "../assets/images/About_banner.jpg"; // Correct import
import SEO from "../components/SEO";

const CreativeAboutUs = () => {
  // Animation variants for different element types
  const sectionVariants = {
    hidden: { opacity: 0, y: 70 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.9,
        ease: "easeOut",
        staggerChildren: 0.25,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.7,
        ease: "easeOut",
      },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.85, rotate: -5 },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: {
        duration: 1.2,
        ease: [0.2, 0.6, 0.4, 1],
      },
    },
  };

  // Correcting the pageData object to directly use the imported variable
  const pageData = {
    meta: {
      title: "International Organizer For Webinars And Events",
      description:
        "Helix Conferences is the International Organizer for Speakers and Researchers. We are the biggest Platform for promoting your Ideas and Knowledge through Conferences.",
    },
    header: {
      logo: "assets/img/logo/finallogo-e1707385272842.png",
      contactLink: "contact.html",
    },
    breadcrumb: {
      title: "About Us",
      backgroundImage: AboutBanner, // Use the variable directly
    },
    sections: [
      {
        id: "who-we-are",
        icon: "fa-solid fa-users",
        title: "Who We Are",
        subtitle: "Transforming Visions into Reality",
        text: "Have a vision? Let’s make it real. Our Conferences provide the tools, resources, and connections necessary to turn your Ideas into actionable plans.",
      },
      {
        id: "why-choose-us",
        icon: "fa-solid fa-lightbulb",
        title: "Why Choose Us",
        subtitle: "Igniting Minds, Inspiring Futures",
        text: "Our Events spark creativity & passion, lighting the path for future leaders. Set your career on fire with unparalleled insights & Networking opportunities.",
      },
      {
        id: "what-we-do",
        icon: "fa-solid fa-globe",
        title: "What We Do",
        subtitle: "Connecting Innovators Worldwide",
        text: "We bridge the gap between continents and cultures, connecting the brightest minds from around the globe. Come & Join Helix to Experience the difference.",
      },
    ],
    mainContent: {
      title: "Helix Conferences—Where Knowledge Meets Opportunity !!!",
      intro:
        "Are you ready to take your Research and professional Network to the next level? Welcome to Helix Conferences, the leading international Organizer of Scientific Conferences that has been at the forefront of Innovation for over six years. With a proven track record of executing more than 150 Conferences across diverse fields—including Medical, Pharma, Biotech, Engineering, Agriculture, and Food—we are your gateway to a world of opportunities",
      bullets: [
        {
          heading: "Global Expertise:",
          text: "Join a Community of over 25,000 eminent Speakers from around the world. Our Conferences attract top-tier Professionals and thought leaders, providing you with unparalleled access to cutting-edge Research and insights.",
        },
        {
          heading: "Networking Opportunities:",
          text: "Our Conferences are designed to foster meaningful connections. Engage with fellow Researchers, industry experts, and potential collaborators, expanding your professional Network and opening doors to new opportunities.",
        },
        {
          heading: "Rigorous Standards:",
          text: "We pride ourselves on maintaining the highest standards in selecting Research Papers and Speakers. This ensures that every Conference is not only informative but also a showcase of cutting-edge Research and Innovation.",
        },
        {
          heading: "Quality Assurance:",
          text: "Our stringent selection criteria guarantee that you’ll be part of a Conference that upholds the highest standards of Research and Innovation.",
        },
        {
          heading: "Supportive Environment:",
          text: "From the moment you submit your Research to the final applause at the Conference, our dedicated team is here to support you every step of the way.",
        },
        {
          heading: "Tailored Experiences:",
          text: "We understand that every field has unique needs. Our Conferences are designed to cater to the specific interests and challenges of each discipline, ensuring relevance and engagement.",
        },
        {
          heading: null,
          text: "Join us at Helix Conferences and be part of a transformative experience that not only showcases your work but also propels your career forward. Let’s shape the future of science and Innovation together!",
        },
      ],
      images: [
        "https://html.storebuild.shop/tecz-prv/tecz/assets/img/about/five/about-5-thumb-1.jpg",
        "https://html.storebuild.shop/tecz-prv/tecz/assets/img/about/five/about-5-thumb-2.jpg",
      ],
    },
  };

  return (
    <div
      className="min-h-screen relative overflow-hidden text-gray-800"
      style={{
        // Using the imported AboutBanner variable correctly
        backgroundImage: `url(${AboutBanner})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <SEO
        title="About Helix Conferences | Global Leader in Conferences, Webinars, Workshops, Expos & Exhibitions"
        description="Learn about Helix Conferences, a global platform for organizing impactful international conferences, scientific webinars, academic workshops, expos, and exhibitions. Discover our mission, vision, and commitment to connecting professionals, researchers, and innovators worldwide."
        keywords="about Helix Conferences, global conference organizer, international conferences, professional events, scientific webinars, academic workshops, industry expos, trade exhibitions, worldwide summits, networking events, innovation forums, business conferences, research symposiums, Helix mission, Helix vision"
        url="https://helixconferences.com/about"
        image="https://helixconferences.com/social-preview.jpg"
        canonical="https://helixconferences.com/about"
        schema={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "Organization",
              "@id": "https://helixconferences.com/#organization",
              name: "Helix Conferences",
              url: "https://helixconferences.com/",
              logo: "https://helixconferences.com/images/logo.png",
              sameAs: [
                "https://www.facebook.com/HelixConferences",
                "https://www.linkedin.com/company/helixconferences",
                "https://x.com/HelixConfe69272",
                "https://www.instagram.com/helix_conferences/",
                "https://www.youtube.com/@Helixconferences",
              ],
              description:
                "Helix Conferences is a leading organizer of global conferences, webinars, workshops, expos, and exhibitions, fostering international collaboration and innovation.",
              foundingDate: "2010",
              founders: [{ "@type": "Person", name: "Dr Surya Sarva" }],
              contactPoint: [
                {
                  "@type": "ContactPoint",
                  telephone: "+1-757-656-7778",
                  contactType: "Customer Service",
                  areaServed: "Worldwide",
                  availableLanguage: "English",
                },
              ],
            },
            {
              "@type": "WebPage",
              "@id": "https://helixconferences.com/about/#webpage",
              url: "https://helixconferences.com/about",
              name: "About Helix Conferences",
              description:
                "About Helix Conferences: Mission, vision, and history of a global leader in organizing conferences, webinars, workshops, expos, and exhibitions.",
              inLanguage: "en",
            },
          ],
        }}
      />

      {/* Bright gradient overlay to blend with the image and keep text readable */}
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 opacity-70"></div>

      {/* Background Gradient/Blobs for uniqueness */}
      <div className="absolute inset-0 z-10 opacity-40">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
        <div className="absolute top-1/2 right-1/4 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>

      {/* Breadcrumb Area - Glassmorphism Effect */}
      <section
        className="relative py-28 md:py-40 bg-cover bg-center overflow-hidden z-20"
        style={{
          // Using the imported AboutBanner variable correctly
          backgroundImage: `url(${pageData.breadcrumb.backgroundImage})`,
          backgroundAttachment: "fixed",
        }}
      >
        <div className="absolute inset-0 bg-white/20 backdrop-blur-sm"></div>
        <div className="container mx-auto relative z-10 text-center px-4">
          <motion.h1
            className="text-5xl md:text-7xl font-extrabold mb-4 drop-shadow-lg text-transparent bg-clip-text bg-gradient-to-br from-yellow-400 to-green-500 text-shadow-md"
            initial="hidden"
            animate="visible"
            variants={itemVariants}
          >
            {pageData.breadcrumb.title}
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl text-white max-w-2xl mx-auto"
            initial="hidden"
            animate="visible"
            variants={itemVariants}
            transition={{ delay: 0.3 }}
          >
            {pageData.meta.description}
          </motion.p>
        </div>
      </section>

      {/* Who We Are / Why Choose Us / What We Do Section - Glassmorphism Effect */}
      <section
        className="py-20 px-4 relative z-20"
        style={{
          backgroundImage: `url(${AboutBanner})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="absolute inset-0 bg-white/20 backdrop-blur-md"></div>
        <div className="container mx-auto relative z-20">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, threshold: 0.15 }}
            variants={sectionVariants}
          >
            {pageData.sections.map((section, index) => (
              <motion.div
                key={section.id}
                variants={itemVariants}
                whileHover={{
                  scale: 1.03,
                  boxShadow:
                    "0 10px 20px rgba(0,0,0,0.1), 0 0 0 3px rgba(129, 140, 248, 0.3)",
                }}
                transition={{ duration: 0.3 }}
                className="bg-white/30 border border-white/50 p-10 rounded-2xl shadow-xl flex flex-col items-center text-center relative overflow-hidden group transition-all duration-300"
              >
                <div className="relative z-10">
                  <div className="text-6xl text-transparent bg-clip-text bg-gradient-to-br from-yellow-500 to-orange-600 mb-6 group-hover:animate-bounce-y">
                    <i className={section.icon}></i>
                  </div>
                  <h4 className="text-3xl font-bold mb-3 text-gray-800">
                    {section.title}
                  </h4>
                  <h6 className="text-white text-xl mb-4">
                    {section.subtitle}
                  </h6>
                  <p className="text-gray-700 text-base leading-relaxed fs-size">
                    {section.text}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Main Content Section - Glassmorphism Effect */}
      <section className="py-20 px-4 relative z-20">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Images Column */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, threshold: 0.15 }}
              variants={sectionVariants}
              className="relative h-[450px] lg:h-[600px] flex justify-center items-center"
            >
              <motion.img
                variants={imageVariants}
                src={pageData.mainContent.images[0]}
                alt="Conference Scene 1"
                className="absolute top-0 left-0 w-2/3 md:w-auto h-auto max-h-[400px] object-cover rounded-2xl shadow-2xl z-10 transform rotate-[-5deg] group-hover:rotate-[-8deg] transition-transform duration-500"
                style={{
                  maxWidth: "80%",
                  aspectRatio: "4/3",
                  boxShadow: "0 15px 30px rgba(0,0,0,0.2)",
                }}
                whileHover={{ scale: 1.05, rotate: -7 }}
              />
              <motion.img
                variants={imageVariants}
                src={pageData.mainContent.images[1]}
                alt="Conference Scene 2"
                className="absolute bottom-0 right-0 w-2/3 md:w-auto h-auto max-h-[400px] object-cover rounded-2xl shadow-2xl z-20 transform rotate-[8deg] group-hover:rotate-[10deg] transition-transform duration-500"
                style={{
                  maxWidth: "70%",
                  aspectRatio: "3/4",
                  boxShadow: "0 15px 30px rgba(0,0,0,0.2)",
                }}
                whileHover={{ scale: 1.05, rotate: 10 }}
              />
            </motion.div>

            {/* Text Content Column - Glassmorphism Effect */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, threshold: 0.15 }}
              variants={sectionVariants}
              className="space-y-6 text-lg leading-relaxed lg:order-2 order-1 lg:pl-10 p-4 bg-white/30 backdrop-blur-md rounded-xl shadow-2xl border border-white/50"
            >
              <h4 className="text-2xl md:text-4xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-red-700">
                <motion.span variants={itemVariants}>
                  {pageData.mainContent.title}
                </motion.span>
              </h4>
              <motion.p
                variants={itemVariants}
                className="text-gray-700 text-lg leading-relaxed fs-size max-h-[500px] overflow-y-auto pr-4 custom-scrollbar"
              >
                {pageData.mainContent.intro}
                <ul className="mt-8 space-y-4">
                  {pageData.mainContent.bullets.map((bullet, index) => (
                    <motion.li
                      key={index}
                      variants={itemVariants}
                      className="flex items-start py-1 fs-size"
                      whileHover={{ x: 5 }}
                    >
                      <i className="fa-solid fa-play text-blue-500 mr-3 mt-1.5 min-w-[20px]"></i>
                      <span>
                        {bullet.heading && (
                          <span className="font-semibold text-gray-800">
                            {bullet.heading}
                          </span>
                        )}{" "}
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
    </div>
  );
};

export default CreativeAboutUs;
