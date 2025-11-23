"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

export default function FAQPage() {
  const faqs = [
    {
      q: "What services does CyberCafe provide?",
      a: "We offer online form filling, printing, scanning, Aadhaar services, cyber security assistance, ticket booking, and more digital solutions designed for convenience."
    },
    {
      q: "How can I check my order status?",
      a: "Once you log in, your Dashboard and My Orders page will show all your submitted forms and their real-time status."
    },
    {
      q: "Can I cancel my order?",
      a: "You can cancel newly placed orders within the first 5 minutes. After that, processing begins and cancellation may not be possible."
    },
    {
      q: "How long does a service take to complete?",
      a: "Most services are completed within 24 hours. Some tasks may take longer depending on document verification or service type."
    },
    {
      q: "Is my personal data safe?",
      a: "Absolutely. We follow secure encryption, never share your data, and comply with data protection standards."
    },
    {
      q: "Do I need an account to use services?",
      a: "Yes, logging in ensures that all your service forms, orders, and receipts remain securely stored under your profile."
    },
    {
      q: "What payment methods are accepted?",
      a: "We accept UPI, debit/credit cards, net banking, and wallet-based payments depending on service availability."
    },
    {
      q: "How can I contact support?",
      a: "You can use the Contact page or email us at support@cybercafe.com. We usually reply within 24 hours."
    },
  ];

  const [open, setOpen] = useState(null);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen bg-gray-950 text-gray-200 px-6 py-25"
    >
      <div className="max-w-4xl mx-auto">

        {/* HEADER */}
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-5xl font-bold text-cyan-400 mb-3 text-center"
        >
          Frequently Asked Questions
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-gray-400 text-center mb-12 max-w-2xl mx-auto"
        >
          Find answers to the most common questions about our services and platform.
        </motion.p>

        {/* FAQ LIST */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden shadow-md"
            >
              {/* QUESTION */}
              <button
                onClick={() => setOpen(open === index ? null : index)}
                className="w-full px-6 py-4 flex justify-between items-center text-left hover:bg-gray-800 transition"
              >
                <span className="text-white font-medium text-sm md:text-base">
                  {faq.q}
                </span>

                <ChevronDown
                  className={`transition-transform ${
                    open === index ? "rotate-180 text-cyan-400" : "text-gray-400"
                  }`}
                />
              </button>

              {/* ANSWER */}
              <AnimatePresence>
                {open === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="px-6 pb-4 text-gray-300 text-sm leading-relaxed"
                  >
                    {faq.a}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
