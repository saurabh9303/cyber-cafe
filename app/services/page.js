"use client";

import { motion } from "framer-motion";
import Link from "next/link";

// Full services list without upload flag
export const services = {
  online: [
    { slug: "online-forms-applications", title: "Online Forms & Applications", desc: "Professional form filling for government exams, jobs & admissions.", img: "/services/forms.jpg" },
    { slug: "cyber-security-help", title: "Cyber Security Help", desc: "Account recovery, data protection & security guidance.", img: "/services/security.jpg" },
    { slug: "ticket-booking", title: "Ticket Booking", desc: "Bus, train and flight ticket bookings instantly.", img: "/services/ticket.jpg" }
  ],
  offline: [
    { title: "Photo Editing", desc: "Premium editing for documents, resumes, ID photos and more.", img: "/services/editing.jpg" },
    { title: "Printing & Scanning", desc: "High-quality printing, scanning, and photocopy services.", img: "/services/print.jpg" },
    { title: "High-Speed Internet", desc: "Fast and stable internet access for browsing, studying, and work.", img: "/services/internet.jpg" },
    { title: "Passport Photo & Print", desc: "Passport-size photo in HD with instant print.", img: "/services/passport.jpg" },
    { title: "Lamination", desc: "High-quality lamination to protect important documents.", img: "/services/lamination.jpg" }
  ],
  computers: [
    { slug: "book-computer", title: "Book a Computer", desc: "Reserve a computer system with high-speed internet & power backup.", img: "/services/computer.jpg" }
  ]
};

const Card = ({ srv }) => (
  <motion.div
    whileHover={{ scale: 1.04 }}
    className="relative rounded-2xl overflow-hidden bg-white/10 backdrop-blur-lg border border-white/20 shadow-md hover:shadow-2xl transition-all duration-300 cursor-pointer"
  >
    <img src={srv.img} className="w-full h-52 object-cover transition-transform duration-300 hover:scale-105" />
    <div className="p-6 flex flex-col justify-between h-56">
      <div>
        <h3 className="text-xl font-bold text-white">{srv.title}</h3>
        <p className="text-gray-300 text-sm mt-2 leading-relaxed">{srv.desc}</p>
      </div>
      {srv.slug ? (
        <Link href={`/services/${srv.slug}`}>
          <button className="mt-4 w-full py-2 rounded-lg bg-gradient-to-r from-cyan-400 to-blue-500 text-black font-semibold hover:from-cyan-500 hover:to-blue-600 transition">
            Book Service
          </button>
        </Link>
      ) : (
        <button className="mt-4 w-full py-2 rounded-lg bg-gray-600 text-white cursor-not-allowed">
          In Café
        </button>
      )}
    </div>
    <span className={`absolute top-4 right-4 px-3 py-1 text-xs rounded-full font-semibold text-black ${srv.slug ? "bg-green-400" : "bg-gray-400"} bg-opacity-80 shadow`}>
      {srv.slug ? "Online" : "In Café"}
    </span>
  </motion.div>
);

export default function ServicesPage() {
  return (
    <div className="min-h-screen px-6 md:px-20 pt-32 pb-20 bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white">

      <section className="mb-20">
        <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-cyan-400 tracking-wide">Online Bookable Services</h2>
        <p className="text-gray-300 mb-10 max-w-xl text-lg">
          Book these services directly from your home — instant, secure, and convenient.
        </p>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
          {services.online.map((srv, i) => (
            <Card key={i} srv={srv} />
          ))}
        </div>
      </section>

      <section className="mb-20">
        <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-purple-400 tracking-wide">Book a Computer</h2>
        <p className="text-gray-300 mb-10 max-w-xl text-lg">
          Reserve a computer system for study, online exams, browsing, printing, or office work.
        </p>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
          {services.computers.map((srv, i) => (
            <Card key={i} srv={srv} />
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-blue-400 tracking-wide">Café Visit Required Services</h2>
        <p className="text-gray-300 mb-10 max-w-xl text-lg">
          These services require machines & equipment available only at the cyber café.
        </p>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
          {services.offline.map((srv, i) => (
            <Card key={i} srv={srv} />
          ))}
        </div>
      </section>

    </div>
  );
}
