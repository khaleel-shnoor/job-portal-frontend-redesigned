import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { LayoutDashboard, PlusCircle, Briefcase, Users, LogOut, Menu, X } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";

export default function CompanyLayout() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const navLinks = [
    { to: "/company/dashboard", icon: <LayoutDashboard size={18} />, label: "Dashboard" },
    { to: "/company/post-job", icon: <PlusCircle size={18} />, label: "Post Job" },
    { to: "/company/jobs", icon: <Briefcase size={18} />, label: "My Jobs" },
    { to: "/company/applicants", icon: <Users size={18} />, label: "Applicants" },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* Mobile topbar */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-20 bg-gray-900 text-white flex items-center justify-between px-4 py-3">
        <h1 className="text-lg font-bold">Company Panel</h1>
        <button onClick={() => setOpen(true)} aria-label="Open menu">
          <Menu size={22} />
        </button>
      </div>

      {/* Sidebar */}
      <aside className={`fixed lg:sticky lg:top-0 lg:h-screen z-30 top-0 left-0 h-full w-64 bg-gray-900 text-white p-5 flex flex-col
        transform transition-transform duration-300
        ${open ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}>

        <button
          className="lg:hidden mb-4 self-end"
          onClick={() => setOpen(false)}
          aria-label="Close menu"
        >
          <X size={20} />
        </button>

        <h1 className="text-xl font-bold mb-6">Company Panel</h1>

        <nav className="flex flex-col gap-4">
          {navLinks.map(({ to, icon, label }) => (
            <NavLink
              key={to}
              to={to}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-2 text-sm transition ${
                  isActive ? "text-green-400 font-semibold" : "hover:text-green-400"
                }`
              }
            >
              {icon} {label}
            </NavLink>
          ))}
        </nav>

        <button
          onClick={handleLogout}
          className="mt-auto flex items-center gap-2 text-red-400 text-sm pt-6 border-t border-gray-700"
        >
          <LogOut size={18} /> Logout
        </button>
      </aside>

      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-20 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Desktop topbar */}
        <header className="hidden lg:flex justify-between items-center p-4 bg-white shadow">
          <h2 className="font-semibold">Company Dashboard</h2>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-red-500"
          >
            <LogOut size={18} /> Logout
          </button>
        </header>

        {/* Content */}
        <main className="p-4 sm:p-6 mt-14 lg:mt-0 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}