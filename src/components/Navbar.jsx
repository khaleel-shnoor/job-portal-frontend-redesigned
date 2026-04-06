import { Link } from "react-router-dom";
import { Menu, X, Home, Briefcase, LogIn, UserPlus } from "lucide-react";
import { useEffect, useState } from "react";
import logo from "../assets/shnoor-logo.png";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when clicking outside or pressing escape
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  return (
    <>
      <nav
        className={`fixed w-full z-50 backdrop-blur-md bg-white/10 border-b border-white/20 ${
          scrolled
            ? "bg-[var(--bg-primary)] shadow-md"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 text-white">
            <div className="w-16 h-16 rounded-lg">
              <img src={logo} alt="JobPortal Logo" className="w-full h-full object-cover"/>
            </div>
            <span className={`${scrolled ? "text-[var(--text-primary)]" : "text-white"} font-semibold text-3xl`}>
              Job Hunt
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex gap-6 items-center">
            <Link to="/" className={`flex items-center gap-2 ${scrolled ? "text-[var(--text-primary)]" : "text-white"} hover:opacity-80 transition`}>
              <Home size={18} />
              Home
            </Link>

            <Link to="/jobs" className={`flex items-center gap-2 ${scrolled ? "text-[var(--text-primary)]" : "text-white"} hover:opacity-80 transition`}>
              <Briefcase size={18} />
              Jobs
            </Link>

            <Link to="/login" className={`flex items-center gap-2 ${scrolled ? "text-[var(--text-primary)]" : "text-white"} hover:opacity-80 transition`}>
              <LogIn size={18} />
              Login
            </Link>

            <Link
              to="/register"
              className="flex items-center gap-2 px-4 py-2 bg-[var(--color-accent)] text-black rounded-lg hover:opacity-90 transition"
            >
              <UserPlus size={18} />
              Register
            </Link>
          </div>

          {/* Mobile Menu Button */}
         <button 
                onClick={() => setOpen(!open)} 
                className={`md:hidden p-2 rounded-lg transition ${
                    scrolled 
                    ? "text-[var(--text-primary)] hover:bg-gray-100" 
                    : "text-[var(--text-primary)] hover:bg-white/10"
                }`}
                aria-label="Toggle menu"
                >
                {open ? <X size={24} /> : <Menu size={24} />}
                </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {open && (
        <div className="fixed inset-0 z-40 md:hidden">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />
          
          {/* Menu Panel */}
          <div className="fixed right-0 top-0 h-full w-80 bg-white shadow-2xl animate-slide-in">
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg overflow-hidden">
                    <img src={logo} alt="Logo" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <span className="font-bold text-xl text-gray-900">Job Hunt</span>
                  </div>
                </div>
              </div>

              {/* Navigation Links */}
              <div className="flex-1 py-6">
                <div className="space-y-2 px-4">
                  <Link
                    to="/"
                    className="flex items-center gap-3 px-4 py-3 text-gray-700 font-medium rounded-lg hover:bg-gray-100 transition-colors"
                    onClick={() => setOpen(false)}
                  >
                    <Home size={20} />
                    Home
                  </Link>
                  
                  <Link
                    to="/jobs"
                    className="flex items-center gap-3 px-4 py-3 text-gray-700 font-medium rounded-lg hover:bg-gray-100 transition-colors"
                    onClick={() => setOpen(false)}
                  >
                    <Briefcase size={20} />
                    Jobs
                  </Link>
                  
                  <div className="border-t border-gray-100 my-4"></div>
                  
                  <Link
                    to="/login"
                    className="flex items-center gap-3 px-4 py-3 text-gray-700 font-medium rounded-lg hover:bg-gray-100 transition-colors"
                    onClick={() => setOpen(false)}
                  >
                    <LogIn size={20} />
                    Login
                  </Link>
                  
                  <Link
                    to="/register"
                    className="flex items-center justify-center gap-2 px-4 py-3 bg-[var(--color-accent)] text-black font-semibold rounded-lg hover:opacity-90 transition-colors mt-4"
                    onClick={() => setOpen(false)}
                  >
                    <UserPlus size={20} />
                    Register
                  </Link>
                </div>
              </div>

              {/* Footer */}
              <div className="p-6 border-t border-gray-100">
                <p className="text-xs text-center text-gray-500">
                  Find your dream job today
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add animation style */}
      <style>{`
        @keyframes slideIn {
          from {
            transform: translateX(100%);
          }
          to {
            transform: translateX(0);
          }
        }
        .animate-slide-in {
          animation: slideIn 0.3s ease-out;
        }
      `}</style>
    </>
  );
}