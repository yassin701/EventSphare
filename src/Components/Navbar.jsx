import React from "react";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          
          {/* Logo */}
          <div className="shrink-0">
            <Link to="/" className="text-2xl font-bold text-green-600">
              EventSphere
            </Link>
          </div>

          {/* Links */}
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

          {/* Icons */}
          <div className="flex items-center space-x-4">
            <Link to="/cart" className="text-gray-700 hover:text-green-600">
              <FaShoppingCart size={20} />
            </Link>
            <Link to="/login" className="text-gray-700 hover:text-green-600">
              <FaUser size={20} />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
