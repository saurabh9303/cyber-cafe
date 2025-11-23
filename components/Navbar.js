"use client";

import Link from "next/link";
import { Menu, X, LogOut, LayoutDashboard } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { useSession, signOut } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { data: session } = useSession();
  const user = session?.user;
  const pathname = usePathname();
  const router = useRouter();

  // Close menus on route change
  useEffect(() => {
    setProfileOpen(false);
    setOpen(false);
  }, [pathname]);

  // Close dropdown when clicked outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed w-full z-50 bg-black/20 backdrop-blur-lg border-b border-white/10"
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* LOGO */}
        <Link href="/" className="text-2xl font-bold text-cyan-400 tracking-wide">
          Cyber<span className="text-white">Cafe</span>
        </Link>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex items-center gap-8 text-gray-300 text-sm">
          {["Home", "Services", "My Orders", "Contact"].map((item, index) => (
            <motion.div key={index} whileHover={{ scale: 1.1 }}>
              <Link
                href={item === "Home" ? "/" : `/${item.toLowerCase().replace(" ", "")}`}
                className="hover:text-cyan-400 transition"
              >
                {item}
              </Link>
            </motion.div>
          ))}

          {/* NOT LOGGED IN */}
          {!user && (
            <motion.div whileHover={{ scale: 1.05 }}>
              <Link
                href="/login"
                className="px-5 py-2 rounded-full bg-cyan-500 hover:bg-cyan-400 text-black font-semibold shadow-md transition"
              >
                Login
              </Link>
            </motion.div>
          )}

          {/* LOGGED IN USER */}
          {user && (
            <div className="relative" ref={dropdownRef}>
              <img
                src={user.image}
                alt="profile"
                onClick={() => setProfileOpen(!profileOpen)}
                className="w-10 h-10 rounded-full border-2 border-cyan-400 cursor-pointer"
              />

              {profileOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute right-0 mt-3 bg-black/90 backdrop-blur-xl border border-white/10 rounded-xl p-4 w-60 shadow-lg"
                >
                  {/* NAME + EMAIL */}
                  <div className="border-b border-white/10 pb-3 mb-3">
                    <p className="text-white font-semibold">{user.name}</p>
                    <p className="text-gray-400 text-sm">{user.email}</p>
                  </div>

                  {/* DASHBOARD BUTTON */}
                  <Link
                    href="/dashboard"
                    className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/10 text-gray-200 text-sm"
                  >
                    <LayoutDashboard size={16} />
                    Dashboard
                  </Link>

                  {/* ADMIN PANEL BUTTON */}
                  {user.role === "admin" && (
                    <Link
                      href="/admin"
                      className="flex items-center gap-3 mt-2 px-3 py-2 rounded-lg hover:bg-white/10 text-yellow-400 text-sm font-semibold"
                    >
                      <LayoutDashboard size={16} />
                      Admin Panel
                    </Link>
                  )}

                  {/* LOGOUT */}
                  <button
                    onClick={() => signOut()}
                    className="mt-2 flex items-center gap-3 w-full px-3 py-2 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-400 text-sm"
                  >
                    <LogOut size={16} />
                    Logout
                  </button>
                </motion.div>
              )}
            </div>
          )}
        </div>

        {/* MOBILE MENU BUTTON */}
        <button onClick={() => setOpen(!open)} className="md:hidden text-white">
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {/* MOBILE MENU */}
      {open && (
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-black/90 border-t border-white/10 py-5 px-6 space-y-4"
        >
          <Link href="/" className="block text-gray-300 hover:text-cyan-400">Home</Link>
          <Link href="/services" className="block text-gray-300 hover:text-cyan-400">Services</Link>
          <Link href="/myorders" className="block text-gray-300 hover:text-cyan-400">My Orders</Link>
          <Link href="/contact" className="block text-gray-300 hover:text-cyan-400">Contact</Link>

          {!user && (
            <Link
              href="/login"
              className="inline-block mt-2 px-5 py-2 rounded-full bg-cyan-500 text-black font-semibold"
            >
              Login
            </Link>
          )}

          {user && (
            <>
              {/* Mobile Dashboard */}
              <Link
                href="/dashboard"
                className="block text-gray-300 mt-2 hover:text-cyan-400"
              >
                Dashboard
              </Link>

              {/* Mobile Admin Panel */}
              {user.role === "admin" && (
                <Link
                  href="/admin"
                  className="block text-yellow-400 mt-2 hover:text-yellow-300 font-semibold"
                >
                  Admin Panel
                </Link>
              )}

              {/* Mobile Logout */}
              <button
                onClick={() => signOut()}
                className="mt-3 flex items-center gap-2 px-5 py-2 rounded-full bg-red-500/20 text-red-300 font-semibold"
              >
                <LogOut size={16} /> Logout
              </button>
            </>
          )}
        </motion.div>
      )}
    </motion.nav>
  );
}
