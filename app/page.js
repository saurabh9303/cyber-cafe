"use client";

import { motion } from "framer-motion";
import {
  Wifi,
  Clock,
  Smartphone,
  Shield,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import TypingEffect from "@/components/TypingEffect";
import React from "react";

const MemoTyping = React.memo(TypingEffect);

export default function HomePage() {
  const { data: session } = useSession();

  return (
    <div className="relative min-h-screen text-white overflow-x-hidden">

      {/* BACKGROUND IMAGE */}
      <div
        className="absolute inset-0 -z-10 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/images/cyber-bg.webp')", // optimized image
        }}
      />

      {/* Smooth Overlay */}
      <div className="absolute inset-0 -z-10 bg-black/60 backdrop-blur-sm" />

      {/* HERO SECTION */}
      <section className="relative pt-40 pb-36 px-6 text-center max-w-6xl mx-auto">

        {/* Optimized Glow */}
        <div className="absolute inset-0 -z-10 flex items-center justify-center pointer-events-none">
          <div className="w-[380px] h-[380px] bg-blue-500/10 rounded-full blur-[80px]"></div>
        </div>

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="px-6 py-2 inline-block text-sm font-medium 
               bg-white/10 text-blue-100 rounded-full border border-white/20
               shadow-lg backdrop-blur-md"
        >
          Welcome to <span className="font-semibold">Rahul Cyber Café</span>
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.15 }}
          className="text-2xl md:text-5xl font-extrabold mt-8 leading-tight 
                     tracking-tight bg-gradient-to-r from-white via-blue-200 to-blue-400 
                     text-transparent bg-clip-text"
        >
          Your Trusted Hub for Digital Solutions
        </motion.h1>

        {/* Memoized Typing Effect → No Lag */}
        <MemoTyping
          texts={[
            "High-Speed Internet Access",
            "Premium Online Services",
            "Secure Browsing Experience",
            "Device Support & Verification Help",
          ]}
          className="text-5xl md:text-8xl mt-6 text-blue-300 font-medium"
        />

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-6 text-lg max-w-2xl mx-auto text-gray-300 leading-relaxed"
        >
          Delivering reliable digital services with enterprise-grade security, 
          modern infrastructure and a seamless customer experience.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.25 }}
          className="mt-12 flex gap-5 justify-center"
        >
          <Link
            href="/services"
            className="px-10 py-3.5 bg-blue-600 hover:bg-blue-700 rounded-xl
                     font-semibold text-lg flex items-center gap-2 shadow-lg
                     transition-all duration-300"
          >
            Explore Services <ArrowRight size={20} />
          </Link>

          {!session && (
            <Link
              href="/login"
              className="px-10 py-3.5 bg-white/10 hover:bg-white/20 border border-white/20 
                       rounded-xl font-semibold text-lg shadow-md backdrop-blur-md
                       transition-all duration-300"
            >
              Login
            </Link>
          )}
        </motion.div>
      </section>

      {/* SERVICES SECTION */}
      <section id="services" className="py-24 px-6">
        <div className="max-w-6xl mx-auto text-center mb-14">
          <h2 className="text-4xl font-bold bg-clip-text text-transparent 
                         bg-gradient-to-r from-white via-blue-200 to-blue-400">
            Services We Provide
          </h2>
          <p className="text-gray-300 mt-4 max-w-xl mx-auto">
            A digital cyber café delivering secure, fast and reliable experiences.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">

          <FeatureCard
            icon={<Wifi size={38} />}
            title="High-Speed Internet"
            desc="Consistent high-speed browsing for work, study or entertainment."
          />

          <FeatureCard
            icon={<Clock size={38} />}
            title="Online Form Services"
            desc="Government forms, job applications - done professionally."
          />

          <FeatureCard
            icon={<Smartphone size={38} />}
            title="Device Support"
            desc="Help with verification, uploads, and account recovery."
          />

          <FeatureCard
            icon={<Shield size={38} />}
            title="Top-Level Security"
            desc="Encrypted systems ensuring safe browsing & privacy."
          />
        </div>
      </section>

      {/* CTA */}
      {!session && (
        <section className="py-24 text-center bg-black/40">
          <h2 className="text-4xl font-bold mb-3">Get Started Today</h2>
          <p className="text-gray-300 mb-7">
            Login and access premium fast services.
          </p>

          <Link
            href="/login"
            className="px-8 py-3 bg-green-600 hover:bg-green-700 text-lg 
                       rounded-xl font-semibold inline-flex items-center gap-2"
          >
            Login Now <ArrowRight size={20} />
          </Link>
        </section>
      )}
    </div>
  );
}

/* FEATURE CARD */
function FeatureCard({ icon, title, desc }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      viewport={{ once: true }}
      className="p-8 rounded-3xl bg-white/10 border border-white/10 backdrop-blur-md
                 shadow-lg hover:shadow-blue-500/20 hover:border-blue-400/40
                 transition-all"
    >
      <div className="text-blue-400 mb-4 flex justify-center">{icon}</div>
      <h3 className="text-2xl font-bold mb-1">{title}</h3>
      <p className="text-gray-300">{desc}</p>
    </motion.div>
  );
}
