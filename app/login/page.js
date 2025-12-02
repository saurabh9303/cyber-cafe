"use client";

import { motion } from "framer-motion";
import { signIn, useSession } from "next-auth/react";
import { ArrowRight, Loader2 } from "lucide-react";
import { useState } from "react";

export default function LoginPage() {
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    setLoading(true);
    signIn("google", { callbackUrl: "/dashboard" });
  };

  const isLoggedIn = status === "authenticated";

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-950 text-white">

      {/* LEFT SECTION - LOGIN CARD */}
      <div className="flex-1 flex items-center justify-center px-10 py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-10 shadow-xl"
        >
          <h2 className="text-4xl font-bold text-center mb-3">
            Welcome
          </h2>

          <p className="text-gray-300 text-center mb-10">
            {isLoggedIn ? (
              <span className="text-green-400 font-semibold">
                You are already logged in
              </span>
            ) : (
              <>
                Login to access{" "}
                <span className="text-blue-400 font-semibold">
                  Saurabh Cyber Dashboard
                </span>
              </>
            )}
          </p>

          {/* GOOGLE BUTTON */}
          <button
            onClick={handleLogin}
            disabled={loading || isLoggedIn}
            className="w-full flex items-center justify-center gap-3 bg-white text-black font-semibold py-3 rounded-full shadow-lg hover:bg-gray-200 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoggedIn ? (
              <>Already Logged In</>
            ) : loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Logging in...
              </>
            ) : (
              <>
                <img
                  src="https://www.svgrepo.com/show/475656/google-color.svg"
                  alt="Google"
                  className="w-5 h-5"
                />
                Continue with Google
                <ArrowRight size={18} className="ml-1" />
              </>
            )}
          </button>
        </motion.div>
      </div>

      {/* RIGHT SECTION - IMAGE */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="flex-1 hidden md:block relative"
      >
        <img
          src="/images/cyber-bg.webp"
          className="w-full h-full object-cover opacity-60"
          alt="Cyber Cafe"
        />

        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent"></div>

        {/* TEXT ON IMAGE */}
        <div className="absolute bottom-10 left-10">
          <h1 className="text-4xl font-bold text-white leading-tight drop-shadow-lg">
            Saurabh Cyber Cafe 
          </h1>
          <p className="text-gray-300 text-lg mt-2 drop-shadow">
            Fast • Secure • Reliable
          </p>
        </div>
      </motion.div>
    </div>
  );
}
