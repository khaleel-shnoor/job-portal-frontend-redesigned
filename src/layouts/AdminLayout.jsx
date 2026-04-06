import { Outlet, Link, useNavigate } from "react-router-dom";
import { LayoutDashboard, Users, Building2, Briefcase, LogOut } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function AdminLayout() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      
      {/* Sidebar */}
      <aside className="w-64 bg-black text-white p-5">
        <h1 className="text-xl font-bold mb-6">Admin Panel</h1>

        <nav className="flex flex-col gap-4">
          <Link to="/admin" className="flex items-center gap-2 hover:text-blue-400">
            <LayoutDashboard size={18} /> Dashboard
          </Link>

          <Link to="/admin/users" className="flex items-center gap-2 hover:text-blue-400">
            <Users size={18} /> Users
          </Link>

          <Link to="/admin/companies" className="flex items-center gap-2 hover:text-blue-400">
            <Building2 size={18} /> Companies
          </Link>

          <Link to="/admin/jobs" className="flex items-center gap-2 hover:text-blue-400">
            <Briefcase size={18} /> Jobs
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">

        {/* Topbar */}
        <header className="flex justify-between items-center p-4 bg-white shadow">
          <h2 className="font-semibold">Admin Dashboard</h2>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-red-500"
          >
            <LogOut size={18} /> Logout
          </button>
        </header>

        {/* Page Content */}
        <main className="p-6">
          <Outlet />
        </main>

      </div>
    </div>
  );
}