"use client";

import { useSession, signOut } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { LogOut, LayoutDashboard } from "lucide-react";
import { useEffect, useState } from "react";

/* =====================================================
   🔔 CUSTOM TOAST COMPONENT
===================================================== */
function Toast({ message, type = "success", onClose }) {
  useEffect(() => {
    const t = setTimeout(onClose, 3000);
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      className={`fixed top-6 right-6 px-5 py-3 rounded-lg shadow-xl 
      text-white text-sm z-[9999] animate-slide-in
      ${type === "error" ? "bg-red-600" : "bg-green-600"}
    `}
    >
      {message}
    </div>
  );
}

/* =====================================================
   ❗ CUSTOM CONFIRMATION MODAL
===================================================== */
function ConfirmModal({ message, onConfirm, onCancel }) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9998]">
      <div className="bg-gray-900 border border-white/10 p-6 rounded-xl w-80 shadow-xl">
        <p className="text-white text-lg mb-6 text-center">{message}</p>

        <div className="flex justify-between gap-4">
          <button
            onClick={onCancel}
            className="flex-1 py-2 rounded-lg bg-gray-700 text-white hover:bg-gray-600"
          >
            No
          </button>

          <button
            onClick={onConfirm}
            className="flex-1 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700"
          >
            Yes, Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

/* =====================================================
   MAIN DASHBOARD PAGE
===================================================== */
export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [recentOrders, setRecentOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [ordersError, setOrdersError] = useState("");
  const [showCancel, setShowCancel] = useState({});
  const CANCEL_TIME = 5 * 60; // 5 minutes

  // UI States
  const [toast, setToast] = useState(null);
  const [confirmData, setConfirmData] = useState(null);

  /* Redirect if not logged in */
  if (status === "unauthenticated") redirect("/login");

  /* =====================================================
     FETCH ORDERS (NO INTERVAL HERE)
  ====================================================== */
  const fetchRecentOrders = async () => {
    try {
      const res = await fetch("/api/service-form");
      const data = await res.json();

      if (res.ok) {
        const userOrders = data.forms
          .filter(f => f.user?.email === session.user.email)
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .slice(0, 5);

        setRecentOrders(userOrders);

        // Setup countdown initial values
        const initialCountdown = {};

        userOrders.forEach(f => {
          const createdAt = new Date(f.createdAt).getTime();
          const diff = Math.floor((Date.now() - createdAt) / 1000);

          if (diff < CANCEL_TIME) {
            initialCountdown[f._id] = CANCEL_TIME - diff;
          }
        });

        setShowCancel(initialCountdown);
      } else {
        setOrdersError(data.error || "Failed to fetch recent orders.");
      }
    } catch (err) {
      setOrdersError("Server error. Try again later.");
    } finally {
      setLoadingOrders(false);
    }
  };

  useEffect(() => {
    if (status === "authenticated") fetchRecentOrders();
  }, [status]);

  /* =====================================================
     PERFECT COUNTDOWN INTERVAL (runs only once)
  ====================================================== */
  useEffect(() => {
    const interval = setInterval(() => {
      setShowCancel(prev => {
        const updated = { ...prev };

        Object.keys(updated).forEach(id => {
          updated[id] -= 1;
          if (updated[id] <= 0) delete updated[id];
        });

        return updated;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  /* =====================================================
     HANDLE CANCEL (show modal)
  ====================================================== */
  const handleCancel = (id) => {
    setConfirmData({
      message: "Are you sure you want to cancel this order?",
      onConfirm: () => cancelOrder(id),
    });
  };

  /* FINAL ORDER CANCEL LOGIC */
  const cancelOrder = async (id) => {
    try {
      const res = await fetch(`/api/service-form?id=${id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (res.ok) {
        setToast({ message: "Order cancelled successfully!", type: "success" });
        setRecentOrders(prev => prev.filter(f => f._id !== id));
      } else {
        setToast({ message: data.error || "Failed to cancel order.", type: "error" });
      }
    } catch (err) {
      setToast({ message: "Server error. Try later.", type: "error" });
    }
  };

  /* =====================================================
     LOADING STATE
  ====================================================== */
  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center text-white text-xl px-4">
        Loading Dashboard...
      </div>
    );
  }

  /* =====================================================
     MAIN UI
  ====================================================== */
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white px-4 md:px-8 pt-24 md:pt-32">

      {/* PROFILE CARD */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="max-w-4xl mx-auto bg-white/10 backdrop-blur-xl p-8 md:p-10 rounded-3xl border border-white/10 shadow-2xl flex flex-col md:flex-row gap-8"
      >
        <div className="flex-shrink-0 flex flex-col items-center md:items-start">
          <img
            src={session?.user?.image}
            alt="Profile"
            className="w-24 h-24 md:w-28 md:h-28 rounded-full border-2 border-white/20"
          />
          <div className="mt-4 text-center md:text-left">
            <p className="text-2xl md:text-3xl font-bold">{session?.user?.name}</p>
            <p className="text-gray-300 mt-1 text-sm md:text-base">{session?.user?.email}</p>
          </div>
        </div>

        <div className="flex-1 flex flex-col justify-between">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Welcome to Your Dashboard 👋</h1>
            <p className="text-gray-300 text-sm md:text-base">
              You are successfully logged in using Google.
            </p>
          </div>

          <div className="mt-6 md:mt-10 flex flex-col md:flex-row gap-4">
            <button
              onClick={() => signOut({ callbackUrl: "/login" })}
              className="px-6 py-3 rounded-full bg-red-600 hover:bg-red-700 transition flex items-center gap-2 font-semibold text-white"
            >
              <LogOut size={20} />
              Logout
            </button>

            {session?.user?.role === "admin" && (
              <button
                onClick={() => router.push("/admin")}
                className="px-6 py-3 rounded-full bg-yellow-500 hover:bg-yellow-600 transition flex items-center gap-2 font-semibold text-black"
              >
                <LayoutDashboard size={20} />
                Go to Admin Panel
              </button>
            )}
          </div>
        </div>
      </motion.div>

      {/* RECENT ORDERS */}
      <section className="max-w-4xl mx-auto mt-12">
        <h2 className="text-2xl font-bold mb-4 text-cyan-300">Recent Orders</h2>

        {ordersError && <p className="text-red-400 mb-4">{ordersError}</p>}

        {loadingOrders ? (
          <p className="text-gray-300">Loading recent orders...</p>
        ) : !recentOrders.length ? (
          <p className="text-gray-300">You have not submitted any orders yet.</p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence>
              {recentOrders.map(order => (
                <motion.div
                  key={order._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="bg-gray-800 p-6 rounded-2xl shadow-lg border border-white/20 hover:shadow-2xl hover:-translate-y-1 transition-all"
                >
                  <h3 className="text-xl font-bold mb-2 text-cyan-300">
                    {order.serviceName || order.serviceSlug}
                  </h3>

                  <p className="text-gray-400 text-sm mb-3">
                    Submitted on: {new Date(order.createdAt).toLocaleString()}
                  </p>

                  <div className="text-gray-300 text-sm space-y-1">
                    {Object.entries(order.formValues).map(([key, value]) => (
                      <p key={key}><span className="font-semibold">{key}:</span> {value}</p>
                    ))}
                  </div>

                  {showCancel[order._id] !== undefined && (
                    <div className="mt-4 flex justify-between items-center">
                      <span className="text-sm text-yellow-400 font-medium">
                        Cancel in {Math.floor(showCancel[order._id] / 60)}:
                        {(showCancel[order._id] % 60).toString().padStart(2, "0")}
                      </span>

                      <button
                        onClick={() => handleCancel(order._id)}
                        className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-semibold transition"
                      >
                        Cancel
                      </button>
                    </div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </section>

      {/* TOAST + MODAL */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      {confirmData && (
        <ConfirmModal
          message={confirmData.message}
          onCancel={() => setConfirmData(null)}
          onConfirm={() => {
            confirmData.onConfirm();
            setConfirmData(null);
          }}
        />
      )}
    </div>
  );
}

/* =====================================================
   ANIMATION STYLE FOR TOAST
===================================================== */
if (typeof window !== "undefined") {
  const style = document.createElement("style");
  style.innerHTML = `
    @keyframes slideIn {
      from { opacity: 0; transform: translateX(40px); }
      to { opacity: 1; transform: translateX(0); }
    }
    .animate-slide-in {
      animation: slideIn 0.3s ease-out;
    }
  `;
  document.head.appendChild(style);
}
