import { Link, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useState } from "react";

export default function UserLayout() {
  const { logout } = useAuth();
  const [open, setOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-[var(--bg-secondary)] text-[var(--text-primary)]">

      {/* Mobile Topbar */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-20 bg-[var(--bg-primary)] border-b border-[var(--border-color)] flex items-center justify-between px-4 py-3">
        <h2 className="text-lg font-bold text-[var(--color-primary)]">Shnoor</h2>
        <button onClick={() => setOpen(true)}>☰</button>
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
        {/* Close button (mobile) */}
        <button className="lg:hidden mb-6" onClick={() => setOpen(false)}>✕</button>

        <h2 className="text-2xl font-extrabold text-[var(--color-primary)] mb-10">
          Shnoor
        </h2>

        <nav className="flex flex-col gap-4 text-sm">
          <Link to="/user">Dashboard</Link>
          <Link to="/user/profile">My Profile</Link>
          <Link to="/user/jobs">Find Jobs</Link>
          <Link to="/user/applications">My Applications</Link>
          <Link to="/user/saved">Saved Jobs</Link>
        </nav>

        <button
          onClick={logout}
          className="mt-auto pt-6 border-t border-[var(--border-color)] text-red-500 text-sm"
        >
          Logout
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
      <main className="flex-1 p-4 sm:p-6 lg:p-10 mt-14 lg:mt-0 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}