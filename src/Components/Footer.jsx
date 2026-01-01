import React from 'react'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-gray-100 text-black py-12 relative overflow-hidden border-t border-gray-200">
  {/* subtle floating shapes in the background */}
  <div className="absolute inset-0 -z-10 opacity-5">
    <div className="w-56 h-56 bg-gray-600 rounded-full blur-3xl animate-pulse absolute top-1/3 left-1/4"></div>
    <div className="w-80 h-80 bg-gray-600 rounded-full blur-2xl animate-pulse absolute bottom-1/4 right-1/3"></div>
  </div>

  <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
    {/* Brand / Logo */}
    <div className="font-extrabold text-2xl tracking-wide">Eventify</div>

    {/* Footer links */}
    <div className="flex flex-wrap justify-center md:justify-start gap-6 text-gray-700 font-medium">
      <Link to="/" className="hover:text-purple-500 transition-colors">Home</Link>
      <Link to="/events" className="hover:text-purple-500 transition-colors">Events</Link>
      <Link to="/Contact" className="hover:text-purple-500 transition-colors">Contact</Link>
      <Link to="/faq" className="hover:text-purple-500 transition-colors">FAQ</Link>
    </div>

    {/* Social icons */}
    <div className="flex gap-4 text-gray-700">
      <a href="#" className="hover:text-blue-500 transition-colors text-xl">🐦</a>
      <a href="#" className="hover:text-pink-500 transition-colors text-xl">📸</a>
      <a href="#" className="hover:text-blue-700 transition-colors text-xl">💼</a>
    </div>
  </div>

  <p className="text-center text-gray-500 mt-10 text-sm">
    &copy; 2026 Eventify. All rights reserved.
  </p>
</footer>
  )
}

