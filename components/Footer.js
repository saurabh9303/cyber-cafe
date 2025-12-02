"use client";

import { motion } from "framer-motion";
import { Facebook, Twitter, Instagram, Mail } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="bg-gray-900 text-gray-300"
    >
      <div className="max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-4 gap-8">
        
        {/* Logo & About */}
        <div className="space-y-4">
          <h1 className="text-2xl font-bold text-cyan-400">
            Cyber<span className="text-white">Cafe</span>
          </h1>
          <p className="text-gray-400 text-sm">
            Premium online and offline services with fast, secure, and reliable solutions.
            Your cyber needs, all in one place.
          </p>
          <div className="flex items-center gap-4 mt-2">
            <Link href="#" className="hover:text-cyan-400 transition"><Facebook size={20} /></Link>
            <Link href="#" className="hover:text-cyan-400 transition"><Twitter size={20} /></Link>
            <Link href="#" className="hover:text-cyan-400 transition"><Instagram size={20} /></Link>
          </div>
        </div>

        {/* Quick Links */}
        <div className="space-y-2">
          <h3 className="font-semibold text-white">Quick Links</h3>
          <ul className="space-y-1 text-gray-400 text-sm">
            <li><Link href="/" className="hover:text-cyan-400 transition">Home</Link></li>
            <li><Link href="/services" className="hover:text-cyan-400 transition">Services</Link></li>
            <li><Link href="/myorders" className="hover:text-cyan-400 transition">My Orders</Link></li>
            <li><Link href="/contact" className="hover:text-cyan-400 transition">Contact</Link></li>
            <li><Link href="/login" className="hover:text-cyan-400 transition">Login</Link></li>
          </ul>
        </div>

        {/* Policies & Services */}
        <div className="space-y-2">
          <h3 className="font-semibold text-white">Services & Policies</h3>
          <ul className="space-y-1 text-gray-400 text-sm">


            {/* Policies */}
            <li>
              <Link href="/privacy-policy" className="hover:text-cyan-400 transition">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/terms-and-conditions" className="hover:text-cyan-400 transition">
                Terms & Conditions
              </Link>
            </li>
            <li>
              <Link href="/refund-policy" className="hover:text-cyan-400 transition">
                Refund Policy
              </Link>
            </li>
            <li>
              <Link href="/faqs" className="hover:text-cyan-400 transition">
                FAQs
              </Link>
            </li>
            
          </ul>
        </div>

        {/* Contact */}
        <div className="space-y-2">
          <h3 className="font-semibold text-white">Contact Us</h3>
          <p className="text-gray-400 text-sm">123 Cyber Street, Tech City, India</p>
          <p className="text-gray-400 text-sm">
            Email: <span className="text-cyan-400">support@cybercafe.com</span>
          </p>
          <p className="text-gray-400 text-sm">Phone: +91 0000000000</p>

          <div className="mt-2 flex items-center gap-2">
            <Mail size={18} className="text-cyan-400" />
            <span className="text-gray-400 text-sm">Subscribe to our newsletter</span>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-700 mt-6 py-4 text-center text-gray-500 text-sm">
  &copy; {new Date().getFullYear()} CyberCafe. All rights reserved. <br />
  Made with <span className="text-red-500">❤</span> by Saurabh Kumar
</div>
    </motion.footer>
  );
}
