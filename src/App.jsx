import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./Components/Navbar";
import AdminLayout from "./Components/AdminLayout";
import Dashboard from "./pages/Admin/Dashboard";
import AddEvent from "./pages/AddEvent";
import AdminEvent from "./pages/Admin/AdminEvent";
import Events from "./pages/Events";
import { Toaster } from "react-hot-toast";
import "./App.css";
function AppRoutes() {
  const location = useLocation(); // ✅ now it's inside Router

  return (
    <>
      {!location.pathname.startsWith("/admin") && <Navbar />}

      <Toaster position="top-center" />

      <Routes>
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="add" element={<AddEvent />} />
          <Route path="events" element={<AdminEvent />} />
        </Route>

        {/* user routes later */}
        <Route path="/events" element={<Events />} />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}
