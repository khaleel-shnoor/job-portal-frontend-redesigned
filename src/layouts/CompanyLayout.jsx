import { Outlet, Link, useNavigate } from "react-router-dom";
import { LayoutDashboard, PlusCircle, Briefcase, Users, LogOut } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function CompanyLayout() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white p-5">
        <h1 className="text-xl font-bold mb-6">Company Panel</h1>

        <nav className="flex flex-col gap-4">
          <Link to="/company" className="flex items-center gap-2 hover:text-green-400">
            <LayoutDashboard size={18} /> Dashboard
          </Link>

          <Link to="/company/post-job" className="flex items-center gap-2 hover:text-green-400">
            <PlusCircle size={18} /> Post Job
          </Link>

          <Link to="/company/jobs" className="flex items-center gap-2 hover:text-green-400">
            <Briefcase size={18} /> My Jobs
          </Link>

          <Link to="/company/applicants" className="flex items-center gap-2 hover:text-green-400">
            <Users size={18} /> Applicants
          </Link>
        </nav>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col">

        {/* Topbar */}
        <header className="flex justify-between items-center p-4 bg-white shadow">
          <h2 className="font-semibold">Company Dashboard</h2>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-red-500"
          >
            <LogOut size={18} /> Logout
          </button>
        </header>

        {/* Content */}
        <main className="p-6">
          <Outlet />
        </main>

      </div>
    </div>
  );
}