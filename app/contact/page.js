"use client";

import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Twitter, Facebook, Instagram, Linkedin, CheckCircle } from "lucide-react";
import { useState } from "react";
import { useSession } from "next-auth/react";

export default function ContactPage() {
  const { data: session } = useSession();

  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [errors, setErrors] = useState({});
  const [authError, setAuthError] = useState("");

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = "Name is required";

    if (!form.email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) newErrors.email = "Enter a valid email";

    if (!form.phone.trim()) newErrors.phone = "Phone number is required";
    else if (!/^\d{10}$/.test(form.phone)) newErrors.phone = "Phone must be 10 digits";

    if (!form.message.trim()) newErrors.message = "Message cannot be empty";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: null });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 🔥 If user is NOT logged in → Show red message
    if (!session) {
      setAuthError("Please sign in to submit the form.");
      return;
    }

    setAuthError(""); // clear message if logged in 

    if (!validate()) return;

    setLoading(true);
    setSuccess(false);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setSuccess(true);
        setShowToast(true);
        setForm({ name: "", email: "", phone: "", subject: "", message: "" });

        setTimeout(() => setShowToast(false), 2000);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <section className="pt-25 pb-8 px-4 sm:px-6 md:px-12 lg:px-24 bg-gradient-to-br from-black via-gray-900 to-gray-800">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-cyan-400">
            Get in Touch with CyberCafe
          </h1>
          <p className="mt-4 text-gray-300 max-w-3xl mx-auto text-sm md:text-base">
            Have questions or need assistance? Send us a message and our team will respond soon.
          </p>
        </div>
      </section>

      <div className="min-h-auto flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-gray-800 py-2 px-6">

        <div className="w-full max-w-5xl bg-gray-900/70 backdrop-blur-xl rounded-3xl shadow-xl border border-white/10 p-4 md:p-4 grid md:grid-cols-2 gap-8 overflow-hidden">

          {/* Left Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-4"
          >
            <h2 className="text-3xl font-bold mb-4">Send Us a Message</h2>

            <form className="space-y-3" onSubmit={handleSubmit}>

              {/* 🔴 Show login required message */}
              {authError && (
                <p className="text-red-400 text-sm font-semibold mb-2">{authError}</p>
              )}

              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={form.name}
                onChange={handleChange}
                className={`w-full p-1 rounded-lg bg-gray-800 border ${errors.name ? "border-red-500" : "border-gray-700"} focus:border-cyan-400 outline-none`}
              />
              {errors.name && <p className="text-red-400 text-sm">{errors.name}</p>}

              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={form.email}
                onChange={handleChange}
                className={`w-full p-1 rounded-lg bg-gray-800 border ${errors.email ? "border-red-500" : "border-gray-700"} focus:border-cyan-400 outline-none`}
              />
              {errors.email && <p className="text-red-400 text-sm">{errors.email}</p>}

              <input
                type="tel"
                name="phone"
                placeholder="Phone Number (10 digits)"
                value={form.phone}
                onChange={handleChange}
                className={`w-full p-1 rounded-lg bg-gray-800 border ${errors.phone ? "border-red-500" : "border-gray-700"} focus:border-cyan-400 outline-none`}
              />
              {errors.phone && <p className="text-red-400 text-sm">{errors.phone}</p>}

              <input
                type="text"
                name="subject"
                placeholder="Subject"
                value={form.subject}
                onChange={handleChange}
                className="w-full p-1 rounded-lg bg-gray-800 border border-gray-700 focus:border-cyan-400 outline-none"
              />

              <textarea
                name="message"
                rows={4}
                placeholder="Your Message"
                value={form.message}
                onChange={handleChange}
                className={`w-full p-1 rounded-lg bg-gray-800 border ${errors.message ? "border-red-500" : "border-gray-700"} focus:border-cyan-400 outline-none`}
              />
              {errors.message && <p className="text-red-400 text-sm">{errors.message}</p>}

              <button
                type="submit"
                disabled={loading}
                className={`w-full py-2 rounded-full bg-cyan-500 hover:bg-cyan-400 transition font-semibold ${loading ? "opacity-70 cursor-not-allowed" : ""}`}
              >
                {loading ? "Sending..." : "Send Message"}
              </button>

              {success && (
                <p className="mt-2 text-green-400 font-medium">
                  Thank you! Your message was sent successfully.
                </p>
              )}

              {showToast && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute top-4 right-4 bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 shadow-lg"
                >
                  <CheckCircle size={20} /> Message sent successfully!
                </motion.div>
              )}
            </form>
          </motion.div>

          {/* RIGHT - Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-2 flex flex-col justify-center"
          >
            <h2 className="text-3xl font-bold mb-4">Contact Information</h2>

            <div className="flex items-start gap-4">
              <MapPin className="text-cyan-400 mt-1" />
              <p className="text-gray-300">485001, Mukhtiyarganj, Satna City, India</p>
            </div>

            <div className="flex items-center gap-4">
              <Mail className="text-cyan-400" />
              <p className="text-gray-300">support@cybercafe.com</p>
            </div>

            <div className="flex items-center gap-4">
              <Phone className="text-cyan-400" />
              <p className="text-gray-300">+91 0000000000</p>
            </div>

            <div className="flex items-center gap-4 mt-2">
              <Twitter size={24} className="hover:text-cyan-400 transition" />
              <Facebook size={24} className="hover:text-cyan-400 transition" />
              <Instagram size={24} className="hover:text-cyan-400 transition" />
              <Linkedin size={24} className="hover:text-cyan-400 transition" />
            </div>

            <div className="mt-4 w-full h-64 rounded-xl overflow-hidden border border-white/10 shadow-lg">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d95510.31608199462!2d80.83359897732802!3d24.624580013963108!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39847f12a0d55141%3A0xa6208334386e35e2!2sSatna%2C%20Madhya%20Pradesh!5e1!3m2!1sen!2sin!4v1763870030020!5m2!1sen!2sin"
                className="w-full h-full border-0"
                loading="lazy"
              ></iframe>
            </div>
          </motion.div>

        </div>
      </div>
    </>
  );
}

