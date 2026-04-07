import { Link } from "react-router-dom";
import {
  Menu,
  X,
  Home,
  Briefcase,
  LogIn,
  UserPlus,
  LayoutDashboard,
  Users,
  Building2,
  LogOut,
  User,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import logo from "../assets/shnoor-logo.png";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  const { user, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  const navConfig = {
    guest: [
      { label: "Home", to: "/", icon: Home },
      { label: "Jobs", to: "/jobs", icon: Briefcase },
      { label: "Login", to: "/login", icon: LogIn },
      { label: "Register", to: "/register", icon: UserPlus, highlight: true },
    ],

    user: [
  { label: "Dashboard", to: "/user", icon: LayoutDashboard },
  { label: "Profile", to: "/user/profile", icon: User },
],

    company: [
      { label: "Dashboard", to: "/company", icon: LayoutDashboard },
      { label: "Post Job", to: "/company/post-job", icon: Briefcase },
      { label: "My Jobs", to: "/company/jobs" },
      { label: "Applicants", to: "/company/applicants" },
    ],

    admin: [
      { label: "Dashboard", to: "/admin", icon: LayoutDashboard },
      { label: "Users", to: "/admin/users", icon: Users },
      { label: "Companies", to: "/admin/companies", icon: Building2 },
      { label: "Jobs", to: "/admin/jobs", icon: Briefcase },
    ],
  };

  const currentRole = user ? user.role : "guest";
  const links = navConfig[currentRole];

  return (
    <>
      <nav
        className={`fixed w-full z-50 backdrop-blur-md bg-white/10 border-b border-white/20 ${
          scrolled ? "bg-[var(--bg-primary)] shadow-md" : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-16 h-16 rounded-lg">
              <img src={logo} alt="Logo" className="w-full h-full object-cover" />
            </div>
            <span
              className={`${
                scrolled ? "text-[var(--text-primary)]" : "text-white"
              } font-semibold text-3xl`}
            >
              Job Hunt
            </span>
          </Link>

          {/* Desktop */}
          <div className="hidden md:flex gap-6 items-center">
            {links.map((item, index) => {
              const Icon = item.icon;

              if (item.highlight) {
                return (
                  <Link
                    key={index}
                    to={item.to}
                    className="flex items-center gap-2 px-4 py-2 bg-[var(--color-accent)] text-black rounded-lg hover:opacity-90 transition"
                  >
                    {Icon && <Icon size={18} />}
                    {item.label}
                  </Link>
                );
              }

              return (
                <Link
                  key={index}
                  to={item.to}
                  className={`flex items-center gap-2 ${
                    scrolled ? "text-[var(--text-primary)]" : "text-white"
                  } hover:opacity-80 transition`}
                >
                  {Icon && <Icon size={18} />}
                  {item.label}
                </Link>
              );
            })}

            {/* Logout */}
            {user && (
              <button
                onClick={logout}
                className="flex items-center gap-2 text-red-500"
              >
                <LogOut size={18} />
                Logout
              </button>
            )}
          </div>

          {/* Mobile Button */}
          <button
            onClick={() => setOpen(!open)}
            className={`md:hidden p-2 rounded-lg transition ${
              scrolled
                ? "text-[var(--text-primary)] hover:bg-gray-100"
                : "text-white hover:bg-white/10"
            }`}
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {open && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />

          <div className="fixed right-0 top-0 h-full w-80 bg-white shadow-2xl animate-slide-in">
            <div className="flex flex-col h-full">

              {/* Header */}
              <div className="p-6 border-b border-gray-100 flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg overflow-hidden">
                  <img src={logo} className="w-full h-full object-cover" />
                </div>
                <span className="font-bold text-xl">Job Hunt</span>
              </div>

              {/* Links */}
              <div className="flex-1 py-6 px-4 space-y-2">
                {links.map((item, index) => {
                  const Icon = item.icon;

                  return (
                    <Link
                      key={index}
                      to={item.to}
                      onClick={() => setOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100"
                    >
                      {Icon && <Icon size={20} />}
                      {item.label}
                    </Link>
                  );
                })}

                {user && (
                  <button
                    onClick={() => {
                      logout();
                      setOpen(false);
                    }}
                    className="flex items-center gap-3 px-4 py-3 text-red-500 rounded-lg hover:bg-gray-100"
                  >
                    <LogOut size={20} />
                    Logout
                  </button>
                )}
              </div>

              {/* Footer */}
              <div className="p-6 border-t text-center text-xs text-gray-500">
                Find your dream job today
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes slideIn {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
        .animate-slide-in {
          animation: slideIn 0.3s ease-out;
        }
      `}</style>
    </>
  );
}