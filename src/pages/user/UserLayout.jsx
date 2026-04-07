import { Link, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function UserLayout() {
  const { logout } = useAuth();

  return (
    <div className="flex min-h-screen bg-[var(--bg-secondary)] text-[var(--text-primary)]">
      
     <aside className="w-64 sticky top-0 h-screen bg-[var(--bg-primary)] border-r border-[var(--border-color)] p-6 flex flex-col">
        <div className="mb-10">
          <h2 className="text-3xl font-extrabold text-[var(--color-primary)] tracking-tight">
            Shnoor International LLC
          </h2>
        </div>

        <nav className="flex flex-col gap-4 font-medium">
          <Link to="/user" className="text-[var(--text-primary)] hover:text-green-400 transition-colors">
            Dashboard
          </Link>
          <Link to="/user/profile" className="text-[var(--text-secondary)] hover:text-green-400 transition-colors">
            My Profile
          </Link>
          <Link to="/user/jobs" className="text-[var(--text-secondary)] hover:text-green-400 transition-colors">
            Find Jobs
          </Link>
          <Link to="/user/applications" className="text-[var(--text-secondary)] hover:text-green-400 transition-colors">
            My Applications
          </Link>
          <Link to="/user/saved" className="text-[var(--text-secondary)] hover:text-green-400 transition-colors">
            Saved Jobs
          </Link>
        </nav>
        <div className="mt-auto pt-6 border-t border-[var(--border-color)]">
          <button 
            onClick={logout}
            className="w-full text-left text-[var(--text-secondary)] hover:text-red-500 transition-colors font-medium flex items-center gap-2"
          >
            Logout
          </button>
        </div>
      </aside>


      <main className="flex-1 p-8 lg:p-12 overflow-y-auto">
        <Outlet />
      </main>
      
    </div>
  );
}