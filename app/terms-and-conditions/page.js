"use client";

import { motion } from "framer-motion";

export default function TermsAndConditions() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen bg-gray-950 text-gray-200 px-6 py-25"
    >
      <div className="max-w-5xl mx-auto">

        {/* HEADER */}
        <h1 className="text-4xl font-bold text-cyan-400 mb-6">
          Terms & Conditions
        </h1>
        <p className="text-gray-400 mb-10">
          Last Updated: {new Date().getFullYear()}
        </p>

        {/* CONTENT */}
        <div className="space-y-10 text-gray-300 leading-relaxed">

          <section>
            <h2 className="text-xl font-semibold text-white mb-2">
              1. Introduction
            </h2>
            <p>
              Welcome to <span className="text-cyan-400 font-medium">CyberCafe</span>. 
              By accessing or using our website, services, or digital platform, you agree to comply with 
              and be bound by the following Terms & Conditions. Please read them carefully.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-2">
              2. Eligibility
            </h2>
            <p>
              By using our services, you confirm that you are at least 18 years old or using the platform 
              under the supervision of a legal guardian.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-2">
              3. Use of Services
            </h2>
            <p>
              You agree not to misuse the services provided by CyberCafe. 
              This includes— but is not limited to— illegal activities, fraudulent actions, 
              offensive behavior, misuse of computer systems, or breaching any applicable laws.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-2">
              4. User Responsibilities
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>You must provide accurate and updated information.</li>
              <li>You are responsible for maintaining the confidentiality of your account.</li>
              <li>You agree not to attempt unauthorized access to our systems.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-2">
              5. Orders & Payments
            </h2>
            <p>
              All orders placed through our system must be valid and genuine. CyberCafe reserves the 
              right to cancel suspicious or incomplete orders. Payment terms must be followed as displayed 
              at the time of order placement.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-2">
              6. Refund & Cancellation Policy
            </h2>
            <p>
              Refunds and cancellations are subject to specific service rules. Digital services may not 
              be eligible for refunds once processing has started. A cancellation window of 5 minutes 
              may apply for certain orders.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-2">
              7. Limitation of Liability
            </h2>
            <p>
              CyberCafe will not be held responsible for any direct, indirect, or incidental damages 
              arising from the use or inability to use our services. All services are provided “as is” 
              without warranties of any kind.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-2">
              8. Intellectual Property
            </h2>
            <p>
              All content, graphics, logos, UI components, and digital assets on this website are the 
              intellectual property of CyberCafe. Unauthorized use, reproduction, or distribution 
              is strictly prohibited.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-2">
              9. Privacy
            </h2>
            <p>
              Your use of our services is also governed by our Privacy Policy. By using CyberCafe, you 
              consent to the collection and use of data as described in that policy.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-2">
              10. Changes to Terms
            </h2>
            <p>
              CyberCafe reserves the right to update or modify these Terms & Conditions at any time. 
              Continued use of our services after updates signifies your acceptance of the revised terms.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-2">
              11. Contact Us
            </h2>
            <p>
              For any questions regarding these Terms & Conditions, please contact us at:  
              <span className="text-cyan-400"> support@cybercafe.com</span>
            </p>
          </section>

        </div>
      </div>
    </motion.div>
  );
}
