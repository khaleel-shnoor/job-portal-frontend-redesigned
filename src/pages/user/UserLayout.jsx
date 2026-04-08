import { NavLink, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useState } from "react";

export default function UserLayout() {
  const { logout } = useAuth();
  const [open, setOpen] = useState(false);

  const navLinks = [
    { to: "/user", label: "Dashboard", end: true },
    { to: "/user/profile", label: "My Profile" },
    { to: "/user/jobs", label: "Find Jobs" },
    { to: "/user/applications", label: "My Applications" },
    { to: "/user/saved", label: "Saved Jobs" },
  ];

  return (
    <div className="flex min-h-screen bg-[var(--bg-secondary)] text-[var(--text-primary)]">

      {/* Mobile Topbar */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-20 bg-[var(--bg-primary)] border-b border-[var(--border-color)] flex items-center justify-between px-4 py-3">
        <h2 className="text-lg font-bold text-[var(--color-primary)]">Shnoor</h2>
        <button onClick={() => setOpen(true)} aria-label="Open menu" className="text-xl p-1">
          ☰
        </button>
      </div>

      {/* Sidebar */}
      <aside className={`
        fixed lg:sticky lg:top-0 lg:h-screen lg:overflow-y-auto
        z-30 top-0 left-0 h-full w-64
        bg-[var(--bg-primary)] border-r border-[var(--border-color)]
        p-6 flex flex-col
        transform transition-transform duration-300
        ${open ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0
      `}>
        <button
          className="lg:hidden mb-6 self-end text-lg p-1"
          onClick={() => setOpen(false)}
          aria-label="Close menu"
        >
          ✕
        </button>

        <h2 className="text-2xl font-extrabold text-[var(--color-primary)] mb-10">
          Shnoor
        </h2>

        <nav className="flex flex-col gap-4 text-sm">
          {navLinks.map(({ to, label, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `transition-colors ${
                  isActive
                    ? "font-bold text-[var(--color-primary)]"
                    : "text-[var(--text-secondary)] hover:text-[var(--color-primary)]"
                }`
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>

        <button
          onClick={logout}
          className="mt-auto pt-6 border-t border-[var(--border-color)] text-red-500 text-sm text-left hover:text-red-600 transition-colors"
        >
          Logout
        </button>
      </aside>

     
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-20 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

  
      <main className="flex-1 min-w-0 p-4 sm:p-6 lg:p-10 mt-14 lg:mt-0 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}