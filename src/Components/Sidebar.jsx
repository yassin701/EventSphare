import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  FaTachometerAlt,
  FaPlusCircle,
  FaCalendarAlt,
  FaShoppingCart,
  FaTimes,
  FaSignOutAlt,
} from "react-icons/fa";

export default function Sidebar({ onClose } = {}) {
  const linkStyle = "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200";
  const activeStyle = "bg-green-600 text-white";
  const inactiveStyle = "text-gray-300 hover:bg-green-700 hover:text-white";

  const navigate = useNavigate();
  const [showConfirm, setShowConfirm] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("isAdmin");
    navigate("/login");
  };

  return (
    <aside className="w-64 h-screen bg-gray-900 text-white p-6 flex flex-col fixed left-0 top-0">

      {/* Mobile close button */}
      {onClose && (
        <div className="md:hidden mb-4 flex justify-end">
          <button
            onClick={onClose}
            className="p-2 rounded-md bg-gray-800 hover:bg-gray-700"
          >
            <FaTimes />
          </button>
        </div>
      )}

      {/* Logo */}
      <h2 className="text-2xl font-bold mb-10 text-green-400 tracking-wide">
        EventSphere Admin
      </h2>

      {/* Navigation */}
      <nav className="flex flex-col gap-2">
        <NavLink
          to="/admin/dashboard"
          className={({ isActive }) =>
            `${linkStyle} ${isActive ? activeStyle : inactiveStyle}`
          }
        >
          <FaTachometerAlt />
          Dashboard
        </NavLink>

        <NavLink
          to="/admin/add"
          className={({ isActive }) =>
            `${linkStyle} ${isActive ? activeStyle : inactiveStyle}`
          }
        >
          <FaPlusCircle />
          Add Event
        </NavLink>

        <NavLink
          to="/admin/events"
          className={({ isActive }) =>
            `${linkStyle} ${isActive ? activeStyle : inactiveStyle}`
          }
        >
          <FaCalendarAlt />
          Events
        </NavLink>

        <NavLink
          to="/admin/orders"
          className={({ isActive }) =>
            `${linkStyle} ${isActive ? activeStyle : inactiveStyle}`
          }
        >
          <FaShoppingCart />
          Orders
        </NavLink>
      </nav>

      {/* Logout button */}
      <button
        onClick={() => setShowConfirm(true)}
        className="mt-4 flex items-center gap-3 px-4 py-2 bg-red-500 rounded hover:bg-red-600 transition"
      >
        <FaSignOutAlt /> Logout
      </button>

      {/* Logout confirmation modal */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-80">
            <h2 className="text-black text-lg font-semibold mb-4">Confirm Logout</h2>
            <p className="mb-6 text-black">Are you sure you want to log out?</p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowConfirm(false)}
                className="px-4 py-2 rounded border text-black hover:bg-gray-100 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600 transition"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="mt-auto pt-6 text-xs text-gray-500 border-t border-gray-800">
        © 2025 EventSphere
      </div>
    </aside>
  );
}
