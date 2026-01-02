import React from "react";
import { Link } from "react-router-dom";
import { FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-50 text-gray-700 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-4 gap-10">
        
        {/* Brand */}
        <div>
          <h2 className="text-2xl font-bold text-black">EventSphere</h2>
          <p className="mt-3 text-sm leading-relaxed text-gray-600">
            EventSphere is your trusted platform for discovering, booking,
            and managing event tickets with ease.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h3 className="font-semibold text-black mb-4">Navigation</h3>
          <ul className="space-y-3 text-sm">
            <li>
              <Link to="/" className="hover:text-purple-600 transition">
                Home
              </Link>
            </li>
            <li>
              <Link to="/events" className="hover:text-purple-600 transition">
                Events
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-purple-600 transition">
                Contact
              </Link>
            </li>
            <li>
              <Link to="/faq" className="hover:text-purple-600 transition">
                FAQ
              </Link>
            </li>
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h3 className="font-semibold text-black mb-4">Legal</h3>
          <ul className="space-y-3 text-sm">
            <li>
              <Link to="/privacy" className="hover:text-purple-600 transition">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link to="/terms" className="hover:text-purple-600 transition">
                Terms of Service
              </Link>
            </li>
          </ul>
        </div>

        {/* Social */}
        <div>
          <h3 className="font-semibold text-black mb-4">Follow Us</h3>
          <div className="flex gap-4 text-xl">
            <a
              href="#"
              className="hover:text-blue-500 transition"
              aria-label="Twitter"
            >
              <FaTwitter />
            </a>
            <a
              href="#"
              className="hover:text-pink-500 transition"
              aria-label="Instagram"
            >
              <FaInstagram />
            </a>
            <a
              href="#"
              className="hover:text-blue-700 transition"
              aria-label="LinkedIn"
            >
              <FaLinkedin />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-200 py-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} EventSphere. All rights reserved.
      </div>
    </footer>
  );
}
