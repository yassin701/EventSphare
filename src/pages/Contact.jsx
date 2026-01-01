import React, { useState } from "react";
import axios from "axios";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

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

    try {
      await axios.post(APIURL, form);
      setSuccess(true);
      setForm({ name: "", email: "", message: "" });
      setErrors({});

      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      console.error("n8n error:", error);
    }
  };

  return (
    <div className="max-w-md mx-auto p-5 mt-0 min-h-screen flex flex-col justify-center">
      <h1 className="text-black text-3xl mb-6 text-center">Contact Us</h1>

      {success && (
        <p className="text-green-600 font-semibold mb-4 text-center">
          Message sent successfully!
        </p>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className={`p-2 border ${errors.name ? "border-red-500" : "border-gray-300"} rounded w-full`}
        />
        {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}

        <input
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className={`p-2 border ${errors.email ? "border-red-500" : "border-gray-300"} rounded w-full`}
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

        <textarea
          name="message"
          placeholder="Message"
          rows="4"
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          className={`p-2 border ${errors.message ? "border-red-500" : "border-gray-300"} rounded w-full`}
        />
        {errors.message && <p className="text-red-500 text-sm">{errors.message}</p>}

        <button className="p-2.5 bg-black text-white rounded hover:bg-gray-800">
          Send
        </button>
      </form>
    </div>
  );
}
