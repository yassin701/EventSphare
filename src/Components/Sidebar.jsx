import { NavLink } from "react-router-dom";
import {
  FaTachometerAlt,
  FaPlusCircle,
  FaCalendarAlt,
  FaShoppingCart,
  FaTimes,
} from "react-icons/fa";

export default function Sidebar({ onClose } = {}) {
  const linkStyle =
    "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200";

  const activeStyle = "bg-green-600 text-white";
  const inactiveStyle =
    "text-gray-300 hover:bg-green-700 hover:text-white";

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

      {/* Footer */}
      <div className="mt-auto pt-6 text-xs text-gray-500 border-t border-gray-800">
        © 2025 EventSphere
      </div>
    </aside>
  );
}
