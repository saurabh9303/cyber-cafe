"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";

export default function MyOrdersPage() {
  const { data: session, status } = useSession();

  const [forms, setForms] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [cancelTimers, setCancelTimers] = useState({});
  const [toast, setToast] = useState({ message: "", type: "" });
  const [confirmModal, setConfirmModal] = useState({
    show: false,
    id: null,
    type: ""
  });

  // Fetch data when status changes
  useEffect(() => {
    if (status === "authenticated") {
      fetchMyForms();
      fetchMyBookings();
    }

    if (status === "unauthenticated") {
      setLoading(false); // Stop loading if user is not logged in
    }
  }, [status]);

  // Countdown timers
  useEffect(() => {
    const interval = setInterval(() => {
      setCancelTimers(prev => {
        let updated = {};
        let changed = false;

        for (const id in prev) {
          if (prev[id] > 0) {
            updated[id] = prev[id] - 1;
            changed = true;
          }
        }

        return changed ? updated : prev;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Toast
  const showToast = (message, type = "info", duration = 3000) => {
    setToast({ message, type });
    setTimeout(() => setToast({ message: "", type: "" }), duration);
  };

  // Fetch forms
  const fetchMyForms = async () => {
    try {
      const res = await fetch("/api/service-form");
      const data = await res.json();

      if (res.ok) {
        const userForms = data.forms.filter(
          f => f.user?.email === session?.user?.email
        );

        setForms(userForms);

        const timers = {};
        userForms.forEach(f => {
          const createdAt = new Date(f.createdAt).getTime();
          const remaining = Math.max(
            300 - (Date.now() - createdAt) / 1000,
            0
          );
          if (remaining > 0) timers["form-" + f._id] = Math.floor(remaining);
        });

        setCancelTimers(prev => ({ ...prev, ...timers }));
      }
    } catch (err) {
      console.error(err);
      setError("Failed to load forms.");
    }
  };

  // Fetch bookings
  const fetchMyBookings = async () => {
    try {
      const res = await fetch("/api/computer/book?user=true");
      const data = await res.json();

      if (res.ok) {
        const userBookings = data.bookings.filter(
          b => b.userEmail === session?.user?.email
        );

        setBookings(userBookings);

        const timers = {};
        userBookings.forEach(b => {
          const createdAt = new Date(b.createdAt).getTime();
          const remaining = Math.max(
            300 - (Date.now() - createdAt) / 1000,
            0
          );
          if (remaining > 0) timers["book-" + b._id] = Math.floor(remaining);
        });

        setCancelTimers(prev => ({ ...prev, ...timers }));
      }
    } catch (err) {
      console.error(err);
      setError("Failed to load bookings.");
    }

    setLoading(false); // Always stop loading here
  };

  // Cancel request
  const handleCancel = async (id, type) => {
    try {
      const res = await fetch(`/api/${type}?id=${id}`, { method: "DELETE" });
      const data = await res.json();

      if (res.ok) {
        if (type === "service-form") {
          setForms(forms.filter(f => f._id !== id));
        } else {
          setBookings(bookings.filter(b => b._id !== id));
        }

        setCancelTimers(prev => ({ ...prev, [`${type}-${id}`]: 0 }));
        showToast("Cancelled successfully!", "success");
      } else {
        showToast(data.error || "Failed to cancel.", "error");
      }
    } catch (err) {
      console.error(err);
      showToast("Server error.", "error");
    }
  };

  const openConfirm = (id, type) =>
    setConfirmModal({ show: true, id, type });

  const closeConfirm = () =>
    setConfirmModal({ show: false, id: null, type: "" });

  const confirmCancel = () => {
    handleCancel(confirmModal.id, confirmModal.type);
    closeConfirm();
  };

  // Loading screen
  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center text-white bg-gray-950">
        Loading...
      </div>
    );

  // Not logged in
  if (!session) {
    return (
      <div className="min-h-screen bg-gray-950 flex flex-col items-center justify-center text-white px-6 text-center">
        <div className="max-w-md bg-gray-900/60 backdrop-blur-lg p-10 rounded-2xl border border-white/10 shadow-xl">
          <h1 className="text-3xl font-extrabold text-cyan-400 mb-4">
            Login Required
          </h1>

          <p className="text-gray-300 mb-8 text-lg">
            Please login first to view your bookings and service orders.
          </p>

          <a
            href="/login"
            className="px-8 py-3 bg-cyan-600 hover:bg-cyan-700 rounded-xl font-semibold text-lg inline-block transition-all shadow-lg"
          >
            Go to Login Page
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 md:px-20 pt-32 bg-gray-950 text-white relative">
      {/* Toast */}
      <AnimatePresence>
        {toast.message && (
          <motion.div
            className={`fixed top-6 right-6 z-50 px-4 py-3 rounded shadow-lg font-semibold ${
              toast.type === "success"
                ? "bg-green-500"
                : toast.type === "error"
                ? "bg-red-500"
                : "bg-cyan-500 text-black"
            }`}
          >
            {toast.message}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Confirmation modal */}
      <AnimatePresence>
        {confirmModal.show && (
          <motion.div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
            <motion.div className="bg-gray-800 p-6 rounded-xl shadow-xl text-center w-80">
              <p className="text-lg mb-4">Are you sure?</p>
              <div className="flex justify-center gap-4">
                <button
                  onClick={confirmCancel}
                  className="bg-red-500 px-4 py-2 rounded"
                >
                  Yes
                </button>
                <button
                  onClick={closeConfirm}
                  className="bg-gray-600 px-4 py-2 rounded"
                >
                  No
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <h1 className="text-4xl font-extrabold mb-8 text-cyan-400">
        My Orders
      </h1>

      {/* Service Forms */}
      <h2 className="text-2xl font-bold mb-4 text-cyan-300">
        Online Service Forms
      </h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {forms.map(form => (
          <motion.div
            key={form._id}
            className="bg-gray-800 p-6 rounded-2xl border border-white/20 shadow"
          >
            <h3 className="text-xl font-bold text-cyan-300">
              {form.serviceName}
            </h3>

            <p className="text-gray-400 text-sm mb-2">
              Submitted: {new Date(form.createdAt).toLocaleString()}
            </p>

            {Object.entries(form.formValues).map(([key, value]) => (
              <p key={key} className="text-gray-300 text-sm">
                <strong>{key}:</strong> {value}
              </p>
            ))}

            {cancelTimers["form-" + form._id] > 0 && (
              <button
                onClick={() => openConfirm(form._id, "service-form")}
                className="mt-4 bg-red-500 px-3 py-2 rounded"
              >
                Cancel (
                {String(
                  Math.floor(cancelTimers["form-" + form._id] / 60)
                ).padStart(2, "0")}
                :
                {String(
                  cancelTimers["form-" + form._id] % 60
                ).padStart(2, "0")}
                )
              </button>
            )}
          </motion.div>
        ))}
      </div>

      {/* Computer Bookings */}
      <h2 className="text-2xl font-bold mb-4 text-blue-300">
        Computer Bookings
      </h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {bookings.map(b => (
          <motion.div
            key={b._id}
            className="bg-gray-800 p-6 rounded-2xl border border-white/20 shadow"
          >
            <h3 className="text-xl font-bold text-blue-300">
              Computer Booking
            </h3>

            <p className="text-gray-400 text-sm mb-2">
              Booked On: {new Date(b.createdAt).toLocaleString()}
            </p>

            <p className="text-gray-300">
              <strong>Date:</strong> {b.date}
            </p>
            <p className="text-gray-300">
              <strong>Days:</strong> {b.days}
            </p>
            <p className="text-gray-300">
              <strong>Computers:</strong> {b.computersBooked}
            </p>
            <p className="text-gray-300">
              <strong>Session:</strong> {b.sessionStart} - {b.sessionEnd}
            </p>

            {cancelTimers["book-" + b._id] > 0 && (
              <button
                onClick={() =>
                  openConfirm(b._id, "computer/book")
                }
                className="mt-4 bg-red-500 px-3 py-2 rounded"
              >
                Cancel (
                {String(
                  Math.floor(cancelTimers["book-" + b._id] / 60)
                ).padStart(2, "0")}
                :
                {String(
                  cancelTimers["book-" + b._id] % 60
                ).padStart(2, "0")}
                )
              </button>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
