import React, { useState } from "react";
import { FaShoppingCart, FaUser, FaBars, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">

          {/* Logo */}
          <div className="shrink-0">
            <Link to="/" className="text-2xl font-bold text-black">
              EventSphere
            </Link>
          </div>

          {/* Links (desktop) */}
          <div className="hidden md:flex space-x-8">
            <Link to="/" className="text-gray-700 hover:text-green-600 font-medium">
              Home
            </Link>
            <Link to="/events" className="text-gray-700 hover:text-green-600 font-medium">
              Events
            </Link>
            <Link to="/contact" className="text-gray-700 hover:text-green-600 font-medium">
              Contact
            </Link>
          </div>

          {/* Mobile burger */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setOpen((s) => !s)}
              aria-label="Toggle menu"
              className="p-2 text-gray-700 hover:text-green-600"
            >
              {open ? <FaTimes size={20} /> : <FaBars size={20} />}
            </button>
          </div>

          {/* Icons */}
          <div className="hidden sm:flex items-center space-x-4">
            <Link to="/cart" className="text-gray-700 hover:text-green-600">
              <FaShoppingCart size={20} />
            </Link>
            <Link to="/login" className="text-gray-700 hover:text-green-600">
              <FaUser size={20} />
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile menu panel */}
      <div className={`${open ? "block" : "hidden"} md:hidden absolute top-16 left-0 w-full bg-white shadow z-40`}>
        <nav className="flex flex-col p-4 space-y-2">
          <Link onClick={() => setOpen(false)} to="/" className="text-gray-700 hover:text-green-600 font-medium">
            Home
          </Link>
          <Link onClick={() => setOpen(false)} to="/events" className="text-gray-700 hover:text-green-600 font-medium">
            Events
          </Link>
          <Link onClick={() => setOpen(false)} to="/contact" className="text-gray-700 hover:text-green-600 font-medium">
            Contact
          </Link>
          <div className="flex items-center space-x-4 pt-2">
            <Link onClick={() => setOpen(false)} to="/cart" className="text-gray-700 hover:text-green-600">
              <FaShoppingCart size={20} />
            </Link>
            <Link onClick={() => setOpen(false)} to="/login" className="text-gray-700 hover:text-green-600">
              <FaUser size={20} />
            </Link>
          </div>
        </nav>
      </div>
    </nav>
  );
}
