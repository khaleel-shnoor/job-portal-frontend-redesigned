import { useState } from "react";
import { users, companies, jobs, applications } from "../../data/dummyData";

export default function AdminDashboard() {
  // 1. Calculate Top-Level Metrics from our dummy database
  const stats = {
    // Assuming your dummy users have a role property. If not, this acts as a fallback!
    candidates: users.filter(u => u.role !== "admin" && u.role !== "company").length,
    companies: companies.length,
    activeJobs: jobs.length,
    totalApplications: applications.length,
  };

  // 2. Generate Recent Activity dynamically from dummyData
  const [recentActivity] = useState(() => {
    const activity = [];

    // Dynamically grab the latest 2 jobs (simulating ORDER BY date DESC)
    [...jobs].reverse().slice(0, 2).forEach((job, index) => {
      const comp = companies.find(c => c.id === job.companyId);
      activity.push({
        id: `job-${job.id}`,
        user: comp?.name || "Unknown Company",
        action: "posted a new job:",
        target: job.title,
        time: `${index + 1} hour(s) ago`,
      });
    });

    // Dynamically grab the latest 3 applications
    [...applications].reverse().slice(0, 3).forEach((app, index) => {
      const candidate = users.find(u => u.id === app.userId);
      const job = jobs.find(j => j.id === app.jobId);
      const comp = companies.find(c => c.id === job?.companyId);
      
      activity.push({
        id: `app-${app.id}`,
        user: candidate?.name || "A Candidate",
        action: "applied for",
        target: `${job?.title || "a job"} at ${comp?.name || "a company"}`,
        time: `${(index + 1) * 3} hours ago`,
      });
    });

    return activity;
  });

  return (
    <div className="flex flex-col gap-8 h-full max-w-6xl pb-12">
      
      {/* Header */}
      <header>
        <h1 className="text-3xl font-bold text-[var(--color-primary)] tracking-tight">Admin Overview</h1>
        <p className="text-[var(--text-secondary)] mt-2">Monitor platform health and recent activities.</p>
      </header>

      {/* Top-Level Metrics Grid */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-[var(--bg-primary)] p-6 rounded-xl border border-[var(--border-color)] shadow-sm flex flex-col gap-2">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-[var(--text-secondary)]">Total Candidates</h3>
          <p className="text-4xl font-black text-[var(--color-primary)]">{stats.candidates}</p>
        </div>
        <div className="bg-[var(--bg-primary)] p-6 rounded-xl border border-[var(--border-color)] shadow-sm flex flex-col gap-2">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-[var(--text-secondary)]">Verified Companies</h3>
          <p className="text-4xl font-black text-[var(--color-primary)]">{stats.companies}</p>
        </div>
        <div className="bg-[var(--bg-primary)] p-6 rounded-xl border border-[var(--border-color)] shadow-sm flex flex-col gap-2">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-[var(--text-secondary)]">Active Jobs</h3>
          <p className="text-4xl font-black text-[var(--color-accent)]">{stats.activeJobs}</p>
        </div>
        <div className="bg-[var(--bg-primary)] p-6 rounded-xl border border-[var(--border-color)] shadow-sm flex flex-col gap-2">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-[var(--text-secondary)]">Applications</h3>
          <p className="text-4xl font-black text-[var(--color-primary)]">{stats.totalApplications}</p>
        </div>
      </section>

      {/* Recent Activity Feed */}
      <section className="bg-[var(--bg-primary)] rounded-xl border border-[var(--border-color)] shadow-sm overflow-hidden flex flex-col">
        <div className="p-6 border-b border-[var(--border-color)]">
          <h2 className="text-xl font-bold text-[var(--color-primary)]">Recent Activity</h2>
        </div>
        
        <div className="flex flex-col">
          {recentActivity.map((activity, index) => (
            <div 
              key={activity.id} 
              className={`p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-[var(--bg-secondary)] transition-colors ${index !== recentActivity.length - 1 ? 'border-b border-[var(--border-color)]' : ''}`}
            >
              <p className="text-[var(--text-primary)] text-sm md:text-base leading-relaxed">
                <span className="font-bold text-[var(--color-primary)]">{activity.user}</span>
                {" "}{activity.action}{" "}
                <span className="font-semibold">{activity.target}</span>
              </p>
              <span className="text-xs font-medium text-[var(--text-secondary)] whitespace-nowrap bg-[var(--bg-secondary)] px-3 py-1 rounded-full border border-[var(--border-color)]">
                {activity.time}
              </span>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}