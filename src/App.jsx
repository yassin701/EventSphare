import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./Components/Navbar";
import CartSidbar from "./Components/CartSidbar";
import AdminLayout from "./Components/AdminLayout";
import Dashboard from "./pages/Admin/Dashboard";
import AddEvent from "./pages/AddEvent";
import AdminEvent from "./pages/Admin/AdminEvent";
import Checkout from "./pages/Checkout";
import Events from "./pages/Events";
import AdminRoute from "./components/AdminRoute"; // 🔑 import AdminRoute
import Login from "./pages/Admin/Login";
import { Toaster } from "react-hot-toast";
import "./App.css";

function AppRoutes() {
  const location = useLocation();

  return (
    <>
      {!location.pathname.startsWith("/admin") && (
        <>
          <Navbar />
          <CartSidbar />
        </>
      )}

      <Toaster position="top-center" />

      <Routes>
        <Route path="/login" element={<Login/>} />
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminLayout />
            </AdminRoute>
          }
        >
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="add" element={<AddEvent />} />
          <Route path="events" element={<AdminEvent />} />
        </Route>

        {/* user routes */}
        <Route path="/events" element={<Events />} />
        <Route path="/checkout" element={<Checkout />} />
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
