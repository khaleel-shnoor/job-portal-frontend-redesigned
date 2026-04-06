import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import ProtectedRoute from "./ProtectedRoute";

// layouts
import MainLayout from "../layouts/MainLayout";
import AdminLayout from "../layouts/AdminLayout";
import CompanyLayout from "../layouts/CompanyLayout";

// pages
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Home from "../pages/user/Home";
import AdminDashboard from "../pages/admin/Dashboard";
import CompanyDashboard from "../pages/company/Dashboard";
import Users from "../pages/admin/Users";
import Companies from "../pages/admin/Companies";
import Jobs from "../pages/admin/Jobs";
import PostJob from "../pages/company/PostJob";
import MyJobs from "../pages/company/MyJobs";
import Applicants from "../pages/company/Applicants";
import Landing from "../pages/public/Landing";

function RoleRedirect() {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" />;

  if (user.role === "admin") return <Navigate to="/admin" />;
  if (user.role === "company") return <Navigate to="/company" />;
  return <Navigate to="/home" />;
}

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Landing />} />
        {/* Auto redirect after login */}
        <Route path="/redirect" element={<RoleRedirect />} />

        {/* Auth */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* User */}
        <Route
          path="/home"
          element={
            <ProtectedRoute role="user">
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Home />} />
        </Route>

        {/* Admin */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute role="admin">
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="users" element={<Users />} />
          <Route path="companies" element={<Companies />} />
          <Route path="jobs" element={<Jobs />} />
        </Route>

        {/* Company */}
        <Route
          path="/company"
          element={
            <ProtectedRoute role="company">
              <CompanyLayout />
            </ProtectedRoute>
          }
        >
          <Route path="dashboard" element={<CompanyDashboard />} />
          <Route path="post-job" element={<PostJob />} />
          <Route path="jobs" element={<MyJobs />} />
          <Route path="applicants" element={<Applicants />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}