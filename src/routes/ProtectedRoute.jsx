import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children, role }) {
  const { user } = useAuth();

  // Not logged in
  if (!user) return <Navigate to="/login" />;

  // If already logged in and trying to access wrong role → redirect to correct dashboard
  if (role && user.role !== role) {
    if (user.role === "admin") return <Navigate to="/admin" />;
    if (user.role === "company") return <Navigate to="/company" />;
    return <Navigate to="/" />;
  }

  return children;
}