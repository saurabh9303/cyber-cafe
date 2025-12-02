"use client";
import React, { useState, useEffect, useRef } from "react";
import { MessageCircle, X, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ChatAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [chat, setChat] = useState([
    {
      sender: "bot",
      text: "👋 Welcome to Saurabh Online Cyber Cafe! I’m your virtual assistant. How can I help you today?",
    },
  ]);
  const chatEndRef = useRef(null);

  const qaPairs = [
    {
      q: "What services do you provide?",
      a: "We offer Printing, Scanning, Online Form Filling, Railway Ticket Booking, Photo Editing, Lamination, and More.",
    },
    {
      q: "Do you fill government online forms?",
      a: "Yes! We fill all types of online forms like PAN Card, Aadhaar Update, Scholarship, Ration Card, and Government Exams.",
    },
    {
      q: "Do you provide railway ticket booking?",
      a: "Yes 🚆 We provide IRCTC Railway Ticket Booking, Tatkal Tickets, and PNR Status Check.",
    },
    {
      q: "Can I print and scan documents?",
      a: "Absolutely! We provide B/W and Color Printing, High-Quality Scanning, and Email Sending services.",
    },
    {
      q: "Do you make passport size photos?",
      a: "Yes 📸 We create high-quality passport size photos — print and digital both available.",
    },
    {
      q: "Is lamination available?",
      a: "Yes, we provide lamination for documents, ID cards, certificates, and photos.",
    },
    {
      q: "Do you provide typing services?",
      a: "Yes, we provide English & Hindi typing, resume making, cover letter writing, and content writing.",
    },
    {
      q: "Can I book a computer for use?",
      a: "Yes! You can book a computer for internet browsing, online exams, or document work.",
    },
    {
      q: "Do you help with online payments?",
      a: "Yes 💳 We help with bill payments, recharges, money transfers, and online application fees.",
    },
    {
      q: "Do you offer Digital Photo Editing?",
      a: "Yes! We provide background removal, photo retouching, and professional ID photo editing.",
    },
    {
      q: "How can I contact support?",
      a: "You can call us at +91-9876543210 or email support@saurabhcybercafe.com — Available 9AM to 9PM.",
    },
  ];

  const handleQuestionClick = (question) => {
    const selected = qaPairs.find((pair) => pair.q === question);
    if (!selected) return;

    setChat((prev) => [...prev, { sender: "user", text: question }]);

    setTimeout(() => {
      setChat((prev) => [
        ...prev,
        { sender: "bot", text: selected.a },
      ]);
    }, 600);
  };

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chat]);

  return (
    <div className="fixed bottom-5 right-5 z-50 font-sans">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 80, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 80, scale: 0.9 }}
            transition={{ duration: 0.35 }}
            className="w-80 sm:w-96 h-[460px] bg-white/90 backdrop-blur-lg shadow-2xl rounded-3xl flex flex-col border border-blue-200 overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-4 py-3 flex justify-between items-center shadow-md">
              <div className="flex items-center gap-2">
                <Sparkles size={18} />
                <h2 className="font-semibold tracking-wide">Your Assistant</h2>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="hover:bg-white/20 rounded-full p-1 transition"
              >
                <X size={20} />
              </button>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 px-4 py-3 space-y-3 overflow-y-auto bg-gradient-to-br from-blue-50 via-white to-cyan-50">
              {chat.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${
                    msg.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`px-3 py-2 rounded-2xl max-w-[75%] leading-snug text-sm ${
                      msg.sender === "user"
                        ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white"
                        : "bg-white border border-blue-200 text-gray-800 shadow-sm"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              <div ref={chatEndRef} />
            </div>

            {/* Predefined Questions */}
            <div className="border-t border-blue-200 bg-white/80 backdrop-blur-lg p-3">
              <p className="text-xs text-gray-500 mb-2 font-medium">Ask a question:</p>
              <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
                {qaPairs.map((pair, i) => (
                  <button
                    key={i}
                    onClick={() => handleQuestionClick(pair.q)}
                    className="whitespace-nowrap text-xs px-3 py-1.5 rounded-full border border-blue-300 text-gray-700 hover:bg-blue-100 transition"
                  >
                    {pair.q}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Button */}
      {!isOpen && (
        <motion.button
          onClick={() => setIsOpen(true)}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.1 }}
          className="relative bg-gradient-to-r from-blue-600 to-cyan-500 text-white p-4 rounded-full shadow-2xl hover:shadow-blue-500/50 transition-all duration-300"
        >
          <MessageCircle size={26} />
          <span className="absolute -top-2 font-bold -right-2 bg-white text-blue-700 text-xs px-1.5 py-0.5 rounded-full shadow">
            .
          </span>
        </motion.button>
      )}
    </div>
  );
}
