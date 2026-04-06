import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { users } from "../../data/dummyData";

export default function UserDashboard() {
  const user = users[0];
  const [theme, setTheme] = useState(user?.theme || "light");

  // Apply the theme to the HTML root so Tailwind's dark mode activates
  useEffect(() => {
    const isDark = theme === "dark" || (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches);
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  return (
    <div className="flex flex-col gap-8">
      {/* Header Section */}
      <header className="flex flex-col md:flex-row justify-between md:items-end gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[var(--color-primary)]">
            Welcome, {user?.name || "Candidate"}!
          </h1>
          <p className="text-[var(--text-secondary)] mt-2">
            Here is a track of your job hunt activity.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <label className="text-sm font-semibold text-[var(--text-secondary)]">Theme</label>
          <select value={theme} onChange={(e) => setTheme(e.target.value)} className="p-2 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-color)] text-[var(--text-primary)] focus:outline-none focus:border-[var(--color-accent)] transition-colors cursor-pointer shadow-sm font-medium">
            <option value="light">Light Mode</option>
            <option value="dark">Dark Mode</option>
            <option value="system">System Default</option>
          </select>
        </div>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[var(--bg-primary)] p-6 rounded-xl border border-[var(--border-color)] shadow-sm">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-[var(--color-secondary)]">Applied Jobs</h3>
          <p className="text-4xl font-black text-[var(--color-primary)] mt-3">12</p>
        </div>
        <div className="bg-[var(--bg-primary)] p-6 rounded-xl border border-[var(--border-color)] shadow-sm">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-[var(--color-secondary)]">Interviews</h3>
          <p className="text-4xl font-black text-[var(--color-accent)] mt-3">6</p>
        </div>
        <div className="bg-[var(--bg-primary)] p-6 rounded-xl border border-[var(--border-color)] shadow-sm">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-[var(--color-secondary)]">Saved</h3>
          <p className="text-4xl font-black text-[var(--color-primary)] mt-3">5</p>
        </div>
      </div>
    </div>
  );
}