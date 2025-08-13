import React from 'react';
import { motion } from 'framer-motion';

const PrivacyPolicy = () => {
  const pageVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  return (
    <motion.div 
      className="flex flex-col items-center min-h-screen p-8 bg-[#f7fafc] font-inter text-[#2d3748]"
      variants={pageVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="w-full max-w-4xl bg-white p-8 md:p-12 rounded-xl shadow-lg">
        <h1 className="text-4xl md:text-5xl font-bold mb-2 text-[#2d3748]">Privacy Policy</h1>
        <p className="text-sm text-[#718096] mb-8 pb-4 border-b border-gray-200">
          Last Updated: August 12, 2025
        </p>

        <section className="mb-10">
          <h2 className="text-2xl md:text-3xl font-semibold mb-4 mt-6 text-[#4a5568]">1. Information We Collect</h2>
          <p className="text-base leading-relaxed mb-4">
            We collect several different types of information for various purposes to provide and improve our service to you. This may include personal data such as your email address, name, and contact details, which you provide to us when you register for a conference or subscribe to our newsletter.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl md:text-3xl font-semibold mb-4 mt-6 text-[#4a5568]">2. How We Use Your Information</h2>
          <p className="text-base leading-relaxed mb-4">We use the collected data for various purposes, including:</p>
          <ul className="list-disc list-inside space-y-2 text-[#4a5568] leading-relaxed">
            <li>To provide and maintain our Service.</li>
            <li>To notify you about changes to our Service.</li>
            <li>To allow you to participate in interactive features of our Service.</li>
            <li>To provide customer support.</li>
            <li>To send you updates about upcoming conferences, workshops, and events.</li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl md:text-3xl font-semibold mb-4 mt-6 text-[#4a5568]">3. Your Rights</h2>
          <p className="text-base leading-relaxed mb-4">
            Depending on your location, you may have the right to access, update, or delete the personal information we have on you. You can do this by contacting us directly.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl md:text-3xl font-semibold mb-4 mt-6 text-[#4a5568]">4. Security of Data</h2>
          <p className="text-base leading-relaxed mb-4">
            The security of your data is important to us, but remember that no method of transmission over the Internet or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your Personal Data, we cannot guarantee its absolute security.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl md:text-3xl font-semibold mb-4 mt-6 text-[#4a5568]">5. Third-Party Services</h2>
          <p className="text-base leading-relaxed mb-4">
            We may employ third-party companies and individuals to facilitate our Service, such as analytics providers or payment processors. These third parties have access to your Personal Data only to perform these tasks on our behalf and are obligated not to disclose or use it for any other purpose.
          </p>
        </section>

        <section>
          <h2 className="text-2xl md:text-3xl font-semibold mb-4 mt-6 text-[#4a5568]">6. Contact Us</h2>
          <p className="text-base leading-relaxed mb-4">
            If you have any questions about this Privacy Policy, please contact us at <a href="mailto:contact@helixconferences.com" className="text-[#3182ce] hover:underline font-medium">contact@helixconferences.com</a>.
          </p>
        </section>
      </div>
    </motion.div>
  );
};

export default PrivacyPolicy;