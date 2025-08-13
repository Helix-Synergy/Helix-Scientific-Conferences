import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  PhoneIcon,
  EnvelopeIcon,
  MapPinIcon,
} from "@heroicons/react/24/outline";
import Logo from "../assets/images/journal-logo.png";
import WorldMap from "../components/Map/map.js";
import { Helmet } from "react-helmet";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("submitting");
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      console.log("Form submitted:", formData);
      setStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      console.error("Form submission error:", error);
      setStatus("error");
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden text-white bg-gray-900">
      <Helmet>
        {/* Title */}
        <title>
          Get in Touch with Helix Conferences | Global Events & Support
        </title>

        {/* Meta Description */}
        <meta
          name="description"
          content="Reach Helix Conferences for event inquiries, collaborations, or support. Call +1 757 656 7778 (USA) or +91 9000146000 (India), or email hello@helixconferences.com. We're here to connect ideas worldwide."
        />

        {/* Keywords */}
        <meta
          name="keywords"
          content="Helix Conferences contact, global conference organizers, event collaboration, scientific events contact, Sterling Virginia office, India office, call Helix, email Helix"
        />

        {/* Open Graph (Facebook, LinkedIn) */}
        <meta
          property="og:title"
          content="Contact Helix Conferences | Connect With Us"
        />
        <meta
          property="og:description"
          content="Helix Conferences — bridging ideas across borders. Contact our USA or India office for partnerships, registrations, and global event support."
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://helixconferences.com/contact"
        />
        <meta
          property="og:image"
          content="https://helixconferences.com/images/contact-og.jpg"
        />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Contact Helix Conferences | Global Events & Support"
        />
        <meta
          name="twitter:description"
          content="Connect with Helix Conferences for global events, collaborations, and support. USA: +1 757 656 7778 | India: +91 9000146000"
        />
        <meta
          name="twitter:image"
          content="https://helixconferences.com/images/contact-twitter.jpg"
        />

        {/* Schema.org JSON-LD for Local Business */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "Helix Conferences",
            url: "https://helixconferences.com",
            logo: "https://helixconferences.com/images/logo.png",
            contactPoint: [
              {
                "@type": "ContactPoint",
                telephone: "+1-757-656-7778",
                contactType: "customer service",
                areaServed: "US",
                availableLanguage: ["English"],
              },
              {
                "@type": "ContactPoint",
                telephone: "+91-9000146000",
                contactType: "customer service",
                areaServed: "IN",
                availableLanguage: ["English"],
              },
            ],
            address: {
              "@type": "PostalAddress",
              streetAddress: "45573 Shepard Drive, Suite 101",
              addressLocality: "Sterling",
              addressRegion: "VA",
              postalCode: "20164",
              addressCountry: "USA",
            },
            email: "hello@helixconferences.com",
          })}
        </script>
      </Helmet>
      {/* Main content container with correct stacking and full width */}
      <div className="relative w-full">
        {/* Full-width Map Element */}
        <div
          className="w-full bg-gray-900 shadow-xl"
          style={{
            aspectRatio: "16/9",
          }}
        >
          <WorldMap width={1920} height={1080} />
        </div>

        {/* Content Section: Overlaps the map with a negative margin */}
        <div className="relative z-20 -mt-40 sm:-mt-52 md:-mt-80 lg:-mt-96">
          <div className="container mx-auto px-2 sm:px-4">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-8 sm:mb-12 animate-fade-in-up">
              Get In Touch
            </h1>

            <p className="text-base sm:text-lg text-center mb-6 sm:mb-10 max-w-3xl mx-auto">
              Have questions, suggestions, or need assistance? Reach out to us
              through the form below or using our contact details. We're here to
              help!
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-10 lg:gap-12 p-2 sm:p-6 md:p-8 rounded-xl shadow-lg backdrop-blur-sm border border-white/10 bg-gray-900/80">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-white">
                  Send Us a Message
                </h2>
                <form
                  onSubmit={handleSubmit}
                  className="space-y-4 sm:space-y-6"
                >
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-gray-300 text-sm font-medium mb-2"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full p-2 sm:p-3 rounded-md bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-gray-300 text-sm font-medium mb-2"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full p-2 sm:p-3 rounded-md bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-gray-300 text-sm font-medium mb-2"
                    >
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full p-2 sm:p-3 rounded-md bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="message"
                      className="block text-gray-300 text-sm font-medium mb-2"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows="4"
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full p-2 sm:p-3 rounded-md bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                      required
                    ></textarea>
                  </div>
                  <motion.button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 sm:py-3 px-6 sm:px-8 rounded-md transition-all duration-300 shadow-lg hover:shadow-xl w-full"
                    whileTap={{ scale: 0.95, y: 2 }}
                    disabled={status === "submitting"}
                  >
                    {status === "submitting" ? "Sending..." : "Send Message"}
                  </motion.button>
                  {status === "success" && (
                    <p className="text-green-400 mt-2 sm:mt-4 text-center">
                      Your message has been sent successfully!
                    </p>
                  )}
                  {status === "error" && (
                    <p className="text-red-400 mt-2 sm:mt-4 text-center">
                      Failed to send message. Please try again.
                    </p>
                  )}
                </form>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                className="flex flex-col justify-center space-y-6 sm:space-y-8 p-4 sm:p-6 rounded-xl shadow-lg backdrop-blur-sm border border-white/10 bg-gray-900/70"
              >
                <h2 className="text-2xl sm:text-3xl font-bold mb-2 sm:mb-4 text-white">
                  Contact Information
                </h2>
                <div className="flex items-start text-base sm:text-lg">
                  <MapPinIcon className="w-6 h-6 sm:w-7 sm:h-7 mr-3 sm:mr-4 text-yellow-300 flex-shrink-0" />
                  <div>
                    <p className="font-semibold">Our Office</p>
                    <p>45573, Shepard Drive, Suit#101,</p>
                    <p>Sterling, Virginia-20164, USA</p>
                  </div>
                </div>
                <div className="flex items-center text-base sm:text-lg">
                  <PhoneIcon className="w-6 h-6 sm:w-7 sm:h-7 mr-3 sm:mr-4 text-blue-300 flex-shrink-0" />
                  <div>
                    <p className="font-semibold">Phone Numbers</p>
                    <p>+1757 656 7778</p>
                    <p>+91 9000146000</p>
                  </div>
                </div>
                <div className="flex items-center text-base sm:text-lg">
                  <EnvelopeIcon className="w-6 h-6 sm:w-7 sm:h-7 mr-3 sm:mr-4 text-red-300 flex-shrink-0" />
                  <div>
                    <p className="font-semibold">Email Us</p>
                    <p>hello@helixconferences.com</p>
                  </div>
                </div>
                <motion.img
                  src={Logo}
                  alt="Contact Us Location"
                  className="w-24 sm:w-32 h-auto rounded-lg mt-6 sm:mt-8 shadow-md transform transition-transform rounded-full duration-300 hover:scale-105 mx-auto"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8, duration: 0.8 }}
                />
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
