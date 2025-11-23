"use client";

import { useState, useEffect } from "react";
import axios from "axios";

export default function BookComputerPage() {
  const [date, setDate] = useState("");
  const [days, setDays] = useState(1);
  const [available, setAvailable] = useState(null);
  const [computersBooked, setComputersBooked] = useState(1);
  const [sessionStart, setSessionStart] = useState("10:00");
  const [sessionEnd, setSessionEnd] = useState("18:00");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  /* ======================================================
     CHECK AVAILABILITY WHEN DATE CHANGES
  ====================================================== */
  useEffect(() => {
    if (!date) return;
    axios
      .get(`/api/computer/availability?date=${date}`)
      .then((res) => setAvailable(res.data.available))
      .catch(() => setAvailable(null));
  }, [date]);

  /* ======================================================
     VALIDATION FUNCTION
  ====================================================== */
  const validate = () => {
    if (!date) return "Please select a date.";

    // Past date validation
    const selected = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (selected < today) return "Selected date cannot be in the past.";

    if (days < 1 || days > 10)
      return "Days must be between 1 and 10.";

    if (computersBooked < 1)
      return "You must book at least 1 computer.";

    if (available === 0)
      return "No computers available on this date.";

    if (available !== null && computersBooked > available)
      return `Only ${available} computers available.`;

    if (!sessionStart || !sessionEnd)
      return "Please select session start and end time.";

    // Time validation
    const start = new Date(`2000-01-01T${sessionStart}`);
    const end = new Date(`2000-01-01T${sessionEnd}`);

    if (start >= end)
      return "End time must be after start time.";

    const diffMinutes = (end - start) / (1000 * 60);
    if (diffMinutes < 30)
      return "Session must be at least 30 minutes.";

    if (diffMinutes > 720)
      return "Session cannot exceed 12 hours.";

    return null;
  };

  /* ======================================================
     HANDLE BOOKING
  ====================================================== */
  const handleBooking = async () => {
    const error = validate();
    if (error) return setMessage(error);

    setLoading(true);
    setMessage("");

    try {
      const res = await axios.post("/api/computer/book", {
        date,
        days,
        computersBooked,
        sessionStart,
        sessionEnd,
      });

      setMessage("🎉 Booking Successful!");
    } catch (err) {
      const errorMsg =
        err.response?.data?.message || "❌ Booking Failed. Try Again.";
      setMessage(errorMsg);
    }

    setLoading(false);
  };

  /* ======================================================
     UI
  ====================================================== */
  return (
    <div className="min-h-screen pt-28 pb-20 px-6 md:px-20 bg-gradient-to-b from-gray-900 to-black text-white">
      <h1 className="text-4xl font-extrabold mb-6 text-cyan-400">Book a Computer</h1>

      <div className="bg-white/10 p-6 rounded-xl shadow-xl backdrop-blur-md border border-white/20 max-w-xl">
        
        {/* DATE */}
        <label className="block text-sm mb-2">Select Date</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full p-2 rounded-md bg-gray-800 border border-gray-600 mb-4"
        />

        {/* DAYS */}
        <label className="block text-sm mb-2">Number of Days (1–10)</label>
        <select
          value={days}
          onChange={(e) => setDays(Number(e.target.value))}
          className="w-full p-2 rounded-md bg-gray-800 border border-gray-600 mb-4"
        >
          {Array.from({ length: 10 }, (_, i) => i + 1).map((d) => (
            <option key={d} value={d}>
              {d} Day{d > 1 ? "s" : ""}
            </option>
          ))}
        </select>

        {/* AVAILABILITY */}
        {available !== null && (
          <p
            className={`mb-4 font-semibold ${
              available > 0 ? "text-green-400" : "text-red-400"
            }`}
          >
            {available > 0
              ? `${available} Computers Available`
              : "No Computers Available on this date"}
          </p>
        )}

        {/* COMPUTERS */}
        <label className="block text-sm mb-2">Number of Computers</label>
        <input
          type="number"
          min={1}
          max={50}
          value={computersBooked}
          onChange={(e) => setComputersBooked(Number(e.target.value))}
          className="w-full p-2 rounded-md bg-gray-800 border border-gray-600 mb-4"
        />

        {/* SESSION TIME */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm mb-2">Start Time</label>
            <input
              type="time"
              value={sessionStart}
              onChange={(e) => setSessionStart(e.target.value)}
              className="w-full p-2 rounded-md bg-gray-800 border border-gray-600"
            />
          </div>

          <div>
            <label className="block text-sm mb-2">End Time</label>
            <input
              type="time"
              value={sessionEnd}
              onChange={(e) => setSessionEnd(e.target.value)}
              className="w-full p-2 rounded-md bg-gray-800 border border-gray-600"
            />
          </div>
        </div>

        {/* BOOK BUTTON */}
        <button
          onClick={handleBooking}
          disabled={loading}
          className="w-full py-3 bg-gradient-to-r from-cyan-400 to-blue-500 text-black font-bold rounded-lg hover:opacity-90 mt-2"
        >
          {loading ? "Booking..." : "Confirm Booking"}
        </button>

        {/* MESSAGE */}
        {message && (
          <p className="mt-4 text-center font-semibold text-yellow-400">
            {message}
          </p>
        )}
      </div>
    </div>
  );
}
