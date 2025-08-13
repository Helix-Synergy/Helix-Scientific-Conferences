import React from 'react';
import { motion } from 'framer-motion';

const TermsOfUse = () => {
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
        <h1 className="text-4xl md:text-5xl font-bold mb-2 text-[#2d3748]">Terms of Use</h1>
        <p className="text-sm text-[#718096] mb-8 pb-4 border-b border-gray-200">
          Last Updated: August 12, 2025
        </p>

        <section className="mb-10">
          <h2 className="text-2xl md:text-3xl font-semibold mb-4 mt-6 text-[#4a5568]">1. Introduction</h2>
          <p className="text-base leading-relaxed mb-4">
            Welcome to Helix Conferences ("Website"). This Website is owned and operated by Helix Conferences. By accessing or using our Website, you agree to comply with and be bound by these Terms of Use. If you do not agree to these terms, you are prohibited from using or accessing this site.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl md:text-3xl font-semibold mb-4 mt-6 text-[#4a5568]">2. Intellectual Property</h2>
          <p className="text-base leading-relaxed mb-4">
            The content, features, and functionality of this Website, including text, graphics, logos, and images, are the exclusive property of Helix Conferences and are protected by copyright, trademark, and other intellectual property laws. You may not reproduce, distribute, modify, or create derivative works of any part of this Website without our prior written consent.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl md:text-3xl font-semibold mb-4 mt-6 text-[#4a5568]">3. User Obligations</h2>
          <p className="text-base leading-relaxed mb-4">As a user of this Website, you agree not to:</p>
          <ul className="list-disc list-inside space-y-2 text-[#4a5568] leading-relaxed">
            <li>Use the Website for any unlawful purpose.</li>
            <li>Post or transmit any content that is harmful, offensive, or violates the rights of others.</li>
            <li>Attempt to gain unauthorized access to our systems or disrupt the Website's operation.</li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl md:text-3xl font-semibold mb-4 mt-6 text-[#4a5568]">4. Limitation of Liability</h2>
          <p className="text-base leading-relaxed mb-4">
            In no event shall Helix Conferences, nor its directors, employees, partners, or agents, be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of, or inability to access or use, the Website.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl md:text-3xl font-semibold mb-4 mt-6 text-[#4a5568]">5. Governing Law</h2>
          <p className="text-base leading-relaxed mb-4">
            These Terms of Use shall be governed and construed in accordance with the laws of **[Your Jurisdiction]**, without regard to its conflict of law provisions.
          </p>
        </section>

        <section>
          <h2 className="text-2xl md:text-3xl font-semibold mb-4 mt-6 text-[#4a5568]">6. Contact Us</h2>
          <p className="text-base leading-relaxed mb-4">
            If you have any questions about these Terms of Use, please contact us at <a href="mailto:contact@helixconferences.com" className="text-[#3182ce] hover:underline font-medium">contact@helixconferences.com</a>.
          </p>
        </section>
      </div>
    </motion.div>
  );
};

export default TermsOfUse;