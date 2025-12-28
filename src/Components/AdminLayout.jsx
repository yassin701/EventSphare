import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import { useState } from "react";
import { FaBars } from "react-icons/fa";

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showLogout, setShowLogout] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isAdmin");
    navigate("/login");
  };

  return (
    <>

      <div className="flex h-screen">
        <div className="hidden md:block w-64 shrink-0">
          <Sidebar onLogout={() => setShowLogout(true)} />
        </div>

        {sidebarOpen && (
          <div className="fixed inset-0 z-50 md:hidden">
            <div
              className="absolute inset-0 bg-black/40"
              onClick={() => setSidebarOpen(false)}
            />
            <Sidebar
              onClose={() => setSidebarOpen(false)}
              onLogout={() => setShowLogout(true)}
            />
          </div>
        )}

        <div className="flex-1 flex flex-col bg-green-50">
          <div className="md:hidden flex items-center gap-3 p-4 bg-white shadow">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 rounded-md bg-gray-100"
            >
              <FaBars />
            </button>
          </div>

          <main className="flex-1 overflow-y-auto p-6">
            <Outlet />
          </main>
        </div>
      </div>

   
      {showLogout && (
        <div className="fixed inset-0 z-9999 flex items-center justify-center bg-black/50">
          <div className="bg-white p-6 rounded-xl w-80">
            <h2 className="text-lg font-semibold mb-4">Confirm Logout</h2>
            <p className="mb-6">Are you sure you want to log out?</p>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowLogout(false)}
                className="px-4 py-2 border rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-500 text-white rounded"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
