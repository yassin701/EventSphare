import { NavLink } from "react-router-dom";
import {
  FaTachometerAlt,
  FaPlusCircle,
  FaCalendarAlt,
  FaShoppingCart,
} from "react-icons/fa";

export default function Sidebar() {
  const linkStyle =
    "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200";

  const activeStyle = "bg-green-600 text-white";
  const inactiveStyle = "text-gray-300 hover:bg-green-700 hover:text-white";

  return (
    <div className="w-64 h-screen bg-gray-900 text-white p-6 flex flex-col">
      {/* Logo / Title */}
      <h2 className="text-2xl font-bold mb-10 text-green-400">
        EventSphere Admin
      </h2>

      {/* Navigation */}
      <nav className="flex flex-col gap-3">
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
      <div className="mt-auto text-sm text-gray-400">
        © 2025 EventSphere
      </div>
    </div>
  );
}
