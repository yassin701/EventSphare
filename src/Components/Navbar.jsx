import React, { useState } from "react";
import { FaShoppingCart, FaUser, FaBars, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleCart } from "../redux/cartSlice";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const totalQuantity = useSelector((s) => (s.cart.items || []).reduce((sum, it) => sum + (it.quantity || 0), 0));

  return (
    <nav className="fixed top-0 left-0 w-full z-50">
      <div className="flex justify-center pt-4 px-4">
        <div className="w-full max-w-4xl">
          <div className="bg-white/95 rounded-2xl shadow-lg border border-gray-200">
            <div className="flex justify-between h-16 items-center px-8">
              
              {/* Logo */}
 <div className="shrink-0">
                <Link 
                  to="/" 
                  className="text-2xl font-bold bg-linear-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent hover:opacity-90 transition-opacity duration-200"
                >
                  EventSphere
                </Link>
              </div>

              {/* Links (desktop) */}
              <div className="hidden md:flex space-x-10">
                <Link 
                  to="/" 
                  className="text-gray-700 hover:text-blue-600 font-medium text-sm uppercase tracking-wider transition-all duration-200 hover:scale-105"
                >
                  Home
                </Link>
                <Link 
                  to="/events" 
                  className="text-gray-700 hover:text-blue-600 font-medium text-sm uppercase tracking-wider transition-all duration-200 hover:scale-105"
                >
                  Events
                </Link>
                <Link 
                  to="/contact" 
                  className="text-gray-700 hover:text-blue-600 font-medium text-sm uppercase tracking-wider transition-all duration-200 hover:scale-105"
                >
                  Contact
                </Link>
              </div>

              {/* Mobile burger */}
              <div className="flex items-center md:hidden">
                <button
                  onClick={() => setOpen((s) => !s)}
                  aria-label="Toggle menu"
                  className="p-2 text-gray-600 hover:text-green-600 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  {open ? <FaTimes size={20} /> : <FaBars size={20} />}
                </button>
              </div>

              {/* Icons */}
              <div className="hidden sm:flex items-center space-x-6">
                <button
                  onClick={() => dispatch(toggleCart())}
                  className="relative text-gray-600 hover:text-green-600 p-2 hover:bg-gray-100 rounded-full transition-colors"
                  aria-label="Open cart"
                >
                  <FaShoppingCart size={20} />
                  {totalQuantity > 0 && (
                    <span className="absolute -top-1 -right-1 bg-green-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                      {totalQuantity}
                    </span>
                  )}
                </button>
                <Link 
                  to="/login" 
                  className="text-gray-600 hover:text-green-600 p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <FaUser size={20} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu panel */}
      <div className={`
        ${open ? "block" : "hidden"} 
        md:hidden absolute top-24 left-1/2 transform -translate-x-1/2 w-64 bg-white rounded-xl shadow-xl z-40 border border-gray-200
      `}>
        <nav className="flex flex-col p-4 space-y-3">
          <Link 
            onClick={() => setOpen(false)} 
            to="/" 
            className="text-gray-700 hover:text-green-600 font-medium py-3 px-4 hover:bg-gray-50 rounded-lg transition-colors"
          >
            Home
          </Link>
          <Link 
            onClick={() => setOpen(false)} 
            to="/events" 
            className="text-gray-700 hover:text-green-600 font-medium py-3 px-4 hover:bg-gray-50 rounded-lg transition-colors"
          >
            Events
          </Link>
          <Link 
            onClick={() => setOpen(false)} 
            to="/contact" 
            className="text-gray-700 hover:text-green-600 font-medium py-3 px-4 hover:bg-gray-50 rounded-lg transition-colors"
          >
            Contact
          </Link>
          <div className="flex items-center justify-center space-x-4 pt-4 border-t border-gray-100 mt-2">
            <button
              onClick={() => {
                setOpen(false);
                dispatch(toggleCart());
              }}
              className="relative text-gray-600 hover:text-green-600 p-2 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Open cart"
            >
              <FaShoppingCart size={20} />
              {totalQuantity > 0 && (
                <span className="absolute -top-1 -right-1 bg-green-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {totalQuantity}
                </span>
              )}
            </button>
            <Link 
              onClick={() => setOpen(false)} 
              to="/login" 
              className="text-gray-600 hover:text-green-600 p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <FaUser size={20} />
            </Link>
          </div>
        </nav>
      </div>
    </nav>
  );
}