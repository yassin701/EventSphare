// src/components/AdminRoute.jsx
import { Navigate } from "react-router-dom";

export default function AdminRoute({ children }) {
  const isAdmin = localStorage.getItem("isAdmin");

  return isAdmin ? children : <Navigate to="/login" />;
}
