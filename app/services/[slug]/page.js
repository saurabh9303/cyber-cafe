"use client";

import { useParams } from "next/navigation";
import { useState } from "react";
import { services } from "../page";
import { useSession } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";

const formData = {
  "online-forms-applications": [
    { label: "Full Name", type: "text", name: "name", required: true },
    { label: "Father/Guardian Name", type: "text", name: "guardian", required: true },
    { label: "Date of Birth", type: "date", name: "dob", required: true },
    { label: "Email", type: "email", name: "email", required: true },
    { label: "Phone Number", type: "tel", name: "phone", required: true },
    { label: "Exam / Job Name", type: "text", name: "examJob", required: true },
    { label: "Address", type: "textarea", name: "address", required: true },
  ],
  "cyber-security-help": [
    { label: "Account Type", type: "text", name: "account", required: true },
    { label: "Email/Username", type: "text", name: "username", required: true },
    { label: "Problem Description", type: "textarea", name: "problem", required: true },
  ],
  "ticket-booking": [
    { label: "From", type: "text", name: "from", required: true },
    { label: "To", type: "text", name: "to", required: true },
    { label: "Date of Travel", type: "date", name: "date", required: true },
    { label: "Number of Tickets", type: "number", name: "tickets", required: true, min: 1 },
    { label: "Passenger Names", type: "textarea", name: "passengers", required: true },
  ],
};

export default function ServiceFormPage() {
  const params = useParams();
  const slug = params.slug;
  const fields = formData[slug];
  const service = services.online.find(s => s.slug === slug);
  const { data: session } = useSession();

  const [formValues, setFormValues] = useState({});
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ type: "", message: "" });

  if (!fields) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 p-6">
        <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 text-center">
          <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Service Not Found</h2>
          <p className="text-gray-300">The requested service does not exist.</p>
        </div>
      </div>
    );
  }

  const validate = () => {
    const newErrors = {};
    fields.forEach(f => {
      const value = formValues[f.name];
      if (f.required && (!value || value.toString().trim() === "")) {
        newErrors[f.name] = `${f.label} is required`;
      } else if (f.type === "email") {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(value)) newErrors[f.name] = "Invalid email address";
      } else if (f.type === "tel") {
        const phonePattern = /^[0-9]{10}$/;
        if (!phonePattern.test(value)) newErrors[f.name] = "Invalid 10-digit phone number";
      } else if (f.type === "number" && f.min && value < f.min) {
        newErrors[f.name] = `${f.label} must be at least ${f.min}`;
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    setErrors({ ...errors, [name]: undefined });
  };

  const handleSubmit = async e => {
    e.preventDefault();

    if (!session) {
      setAlert({ type: "error", message: "Please login before submitting the form" });
      return;
    }

    if (!validate()) {
      setAlert({ type: "error", message: "Please fix the errors in the form" });
      return;
    }

    setLoading(true);
    setAlert({ type: "", message: "" });

    try {
      const res = await fetch("/api/service-form", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          serviceSlug: slug,
          serviceName: service?.title,
          formValues,
        }),
      });

      const data = await res.json();
      setLoading(false);

      if (res.ok) {
        setAlert({ type: "success", message: "Form submitted successfully!" });
        setFormValues({});
      } else {
        setAlert({ type: "error", message: data.error || "Something went wrong" });
      }
    } catch (err) {
      console.error(err);
      setLoading(false);
      setAlert({ type: "error", message: "Server error. Try again later." });
    }
  };

  return (
    <div className="h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 flex items-center justify-center px-4 pt-20">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-4xl h-full flex flex-col"
      >
        {/* Header Card */}
        <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-t-2xl p-4 lg:p-6 flex-shrink-0">
          <div className="flex items-center gap-3 lg:gap-4">
            <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
              <svg className="w-5 h-5 lg:w-6 lg:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div>
              <h1 className="text-xl lg:text-2xl font-bold text-white">
                {service?.title || slug.replace(/-/g, " ").toUpperCase()}
              </h1>
              <p className="text-gray-300 text-xs lg:text-sm mt-0.5">Fill out the form below to submit your request</p>
            </div>
          </div>
        </div>

        {/* Form Card */}
        <motion.form
          onSubmit={handleSubmit}
          className="bg-white/95 backdrop-blur-sm rounded-b-2xl shadow-2xl flex-1 flex flex-col overflow-hidden"
        >
          <div className="flex-1 overflow-y-auto p-4 lg:p-6"
            style={{
              scrollbarWidth: 'thin',
              scrollbarColor: '#cbd5e1 #f1f5f9'
            }}
          >
          {/* ALERT MESSAGE */}
          <AnimatePresence>
            {alert.message && (
              <motion.div
                key={alert.message}
                initial={{ opacity: 0, scale: 0.95, y: -10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -10 }}
                transition={{ duration: 0.2 }}
                className="mb-4"
              >
                <div className={`rounded-xl p-3 flex items-start gap-2 shadow-md ${
                  alert.type === "success"
                    ? "bg-green-50 border border-green-200"
                    : "bg-red-50 border border-red-200"
                }`}>
                  {alert.type === "success" ? (
                    <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-3 h-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  ) : (
                    <div className="w-5 h-5 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-3 h-3 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </div>
                  )}
                  <p className={`font-medium text-sm ${
                    alert.type === "success" ? "text-green-800" : "text-red-800"
                  }`}>
                    {alert.message}
                  </p>
                  <button
                    type="button"
                    onClick={() => setAlert({ type: "", message: "" })}
                    className="ml-auto text-gray-400 hover:text-gray-600"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 lg:gap-4">
            {fields.map((f, i) => (
              <motion.div
                key={i}
                animate={
                  errors[f.name]
                    ? { x: [0, -5, 5, -5, 5, 0] }
                    : { x: 0 }
                }
                transition={{ duration: 0.4 }}
                className={f.type === "textarea" ? "lg:col-span-2" : ""}
              >
                <label className="block mb-1.5">
                  <span className="text-gray-700 font-medium text-sm">
                    {f.label}
                    {f.required && <span className="text-red-500 ml-1">*</span>}
                  </span>
                </label>
                
                {f.type === "textarea" ? (
                  <textarea
                    name={f.name}
                    placeholder={`Enter ${f.label.toLowerCase()}`}
                    required={f.required}
                    className={`w-full px-3 py-2.5 rounded-lg border-2 transition-all duration-200 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-sm ${
                      errors[f.name] 
                        ? "border-red-500 focus:border-red-500" 
                        : "border-gray-200 focus:border-blue-500"
                    }`}
                    onChange={handleChange}
                    rows={3}
                    value={formValues[f.name] || ""}
                  />
                ) : (
                  <input
                    type={f.type}
                    name={f.name}
                    placeholder={f.type === "date" ? "" : `Enter ${f.label.toLowerCase()}`}
                    required={f.required}
                    min={f.min}
                    className={`w-full px-3 py-2.5 rounded-lg border-2 transition-all duration-200 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-sm ${
                      errors[f.name] 
                        ? "border-red-500 focus:border-red-500" 
                        : "border-gray-200 focus:border-blue-500"
                    }`}
                    onChange={handleChange}
                    value={formValues[f.name] || ""}
                  />
                )}
                
                {errors[f.name] && (
                  <motion.p
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-600 text-sm mt-1 flex items-center gap-1"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {errors[f.name]}
                  </motion.p>
                )}
              </motion.div>
            ))}
          </div>

          {/* Info Section */}
          <div className="mt-4 p-3 bg-blue-50 border border-blue-100 rounded-lg">
            <div className="flex items-start gap-2">
              <svg className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <p className="text-xs text-blue-900 font-medium mb-0.5">Important Information</p>
                <p className="text-xs text-blue-700">All fields marked with an asterisk (*) are required. Please ensure all information is accurate before submission.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Submit Button - Fixed at bottom */}
        <div className="p-4 lg:p-6 border-t border-gray-200 flex-shrink-0 bg-white/95">
          <motion.button
            type="submit"
            disabled={loading}
            whileHover={{ scale: loading ? 1 : 1.02 }}
            whileTap={{ scale: loading ? 1 : 0.98 }}
            className="w-full py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Submitting...
              </>
            ) : (
              <>
                Submit Form
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </>
            )}
          </motion.button>
        </div>
        </motion.form>
      </motion.div>
    </div>
  );
}