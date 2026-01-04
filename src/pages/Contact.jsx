import React, { useState } from "react";
import axios from "axios";
import Footer from "../Components/Footer";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const APIURL = import.meta.env.VITE_API_CONTACT_URL;

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let newErrors = {};
    let isValid = true;

    if (!form.name.trim()) {
      newErrors.name = "Name is required.";
      isValid = false;
    }

    if (!form.email.trim()) {
      newErrors.email = "Email is required.";
      isValid = false;
    } else if (!validateEmail(form.email)) {
      newErrors.email = "Invalid email format.";
      isValid = false;
    }

    if (!form.message.trim()) {
      newErrors.message = "Message is required.";
      isValid = false;
    }

    setErrors(newErrors);
    if (!isValid) return;

    setLoading(true);
    
    try {
      await axios.post(APIURL, form);
      setSuccess(true);
      setForm({ name: "", email: "", message: "" });
      setErrors({});

      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-gray-50 to-blue-50 px-4 pt-20 pb-12">
        <div className="w-full max-w-lg">
          <div className="text-center mb-5">
            <h1 className="text-3xl font-bold text-gray-900 mb-2 mt-3">Contact Us</h1>
            <p className="text-gray-600">We'll get back to you as soon as possible.</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8">
            {success && (
              <div className="mb-6 p-4 bg-green-50 text-green-700 rounded-xl border border-green-200 text-center">
                Message sent successfully! We'll respond soon.
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  name="name"
                  placeholder="Your name"
                  value={form.name}
                  onChange={(e) => {
                    setForm({ ...form, name: e.target.value });
                    if (errors.name) setErrors({ ...errors, name: "" });
                  }}
                  className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                    errors.name ? "border-red-300" : "border-gray-300"
                  }`}
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={(e) => {
                    setForm({ ...form, email: e.target.value });
                    if (errors.email) setErrors({ ...errors, email: "" });
                  }}
                  className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                    errors.email ? "border-red-300" : "border-gray-300"
                  }`}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  name="message"
                  placeholder="How can we help you?"
                  rows="4"
                  value={form.message}
                  onChange={(e) => {
                    setForm({ ...form, message: e.target.value });
                    if (errors.message) setErrors({ ...errors, message: "" });
                  }}
                  className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none ${
                    errors.message ? "border-red-300" : "border-gray-300"
                  }`}
                />
                {errors.message && (
                  <p className="text-red-500 text-sm mt-1">{errors.message}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`w-full py-3 px-4 rounded-xl font-semibold text-white transition-all duration-200 ${
                  loading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-linear-to-r from-blue-600 to-purple-600 hover:opacity-90"
                }`}
              >
                {loading ? "Sending..." : "Send Message"}
              </button>
            </form>

          
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}