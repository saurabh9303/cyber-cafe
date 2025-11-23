"use client";

import { motion } from "framer-motion";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gray-950 text-gray-300 px-6 md:px-20 py-28">

      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="max-w-4xl mx-auto"
      >
        <h1 className="text-4xl md:text-5xl font-extrabold text-cyan-400 mb-4">
          Privacy Policy
        </h1>
        <p className="text-gray-400 text-sm">
          Last updated: {new Date().toLocaleDateString()}
        </p>
      </motion.div>

      {/* Content Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.7 }}
        className="max-w-4xl mx-auto mt-10 space-y-10 leading-relaxed"
      >

        {/* Section 1 */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-3">1. Introduction</h2>
          <p className="text-gray-300">
            Welcome to <span className="text-cyan-400 font-semibold">CyberCafe</span>.
            Your privacy is extremely important to us. This Privacy Policy explains how
            we collect, use, and protect your personal information when you use our
            online and offline services.
          </p>
        </section>

        {/* Section 2 */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-3">2. Information We Collect</h2>
          <ul className="list-disc ml-6 text-gray-300 space-y-1">
            <li>Name, email, phone number provided during login or form submission.</li>
            <li>Documents or files uploaded for online services.</li>
            <li>Browser and device information used for security & analytics.</li>
            <li>Order history and service usage details.</li>
          </ul>
        </section>

        {/* Section 3 */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-3">3. How We Use Your Information</h2>
          <ul className="list-disc ml-6 text-gray-300 space-y-1">
            <li>To provide and process your cyber services.</li>
            <li>To improve user experience and service quality.</li>
            <li>To ensure secure login and prevent unauthorized access.</li>
            <li>To contact you regarding support or service updates.</li>
          </ul>
        </section>

        {/* Section 4 */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-3">4. Data Protection & Security</h2>
          <p className="text-gray-300">
            We use industry-standard security practices to protect your data,
            including encrypted storage, secure authentication, and limited data access.
            Only authorized personnel can view sensitive information for service purposes.
          </p>
        </section>

        {/* Section 5 */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-3">5. Sharing of Information</h2>
          <p className="text-gray-300">
            We <span className="font-semibold text-white">do not sell or rent your personal data</span>
            to any third parties.  
            Information may be shared only with:
          </p>
          <ul className="list-disc ml-6 text-gray-300 space-y-1 mt-2">
            <li>Government portals (only when you request a service requiring it).</li>
            <li>Verified service partners (for ticket booking or other services).</li>
            <li>Legal authorities if required by law.</li>
          </ul>
        </section>

        {/* Section 6 */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-3">6. Cookies & Tracking</h2>
          <p className="text-gray-300">
            CyberCafe uses essential cookies to ensure secure login and smooth
            functioning of the website. We may also use analytics tools to improve
            performance, but no personal data is shared.
          </p>
        </section>

        {/* Section 7 */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-3">7. Your Rights</h2>
          <ul className="list-disc ml-6 text-gray-300 space-y-1">
            <li>Access your personal data.</li>
            <li>Request correction of incorrect details.</li>
            <li>Request deletion of your account.</li>
            <li>Withdraw consent anytime.</li>
          </ul>
        </section>

        {/* Section 8 */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-3">8. Contact Us</h2>
          <p className="text-gray-300">
            If you have any questions about this Privacy Policy, feel free to contact us at:
          </p>
          <p className="text-cyan-400 mt-2 font-semibold">support@cybercafe.com</p>
        </section>

      </motion.div>
    </div>
  );
}
