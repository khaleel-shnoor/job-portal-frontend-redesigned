import {
  Briefcase,
  Users,
  UserCheck,
  UserPlus,
  Clock,
  PlusCircle,
  Eye,
  FileText,
  Bell,
} from "lucide-react";

import { users, jobs, applications, companies } from "../../data/dummyData.js";

const CompanyDashboard = ({ companyId = 1 }) => {
  const company = companies.find((c) => c.id === companyId);
  const companyJobs = jobs.filter((job) => job.companyId === companyId);
  const companyJobIds = companyJobs.map((job) => job.id);
  const companyApplications = applications.filter((app) =>
    companyJobIds.includes(app.jobId)
  );

  const totalJobs = companyJobs.length;
  const totalApplications = companyApplications.length;
  const shortlisted = companyApplications.filter(
    (app) => app.status === "shortlisted"
  ).length;
  const hired = companyApplications.filter((app) => app.status === "hired").length;
  const pendingReviews = companyApplications.filter(
    (app) => app.status === "applied"
  ).length;

  const recentApplications = [...companyApplications]
    .reverse()
    .slice(0, 5)
    .map((app) => {
      const job = jobs.find((j) => j.id === app.jobId);
      const user = users.find((u) => u.id === app.userId);
      return { ...app, job, user };
    });

  return (
    <div className="p-6 space-y-6 bg-[var(--bg-primary)] min-h-screen">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-[var(--text-primary)]">
            Dashboard
          </h1>
          <p className="text-[var(--text-secondary)]">
            Welcome back, {company?.name || "Company"}
          </p>
        </div>
        <div className="text-[var(--text-secondary)]">
          {new Date().toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[var(--bg-secondary)] p-4 rounded-lg shadow-sm border border-[var(--border-color)]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-[var(--text-secondary)]">Total Jobs</p>
              <p className="text-2xl font-bold text-[var(--text-primary)]">{totalJobs}</p>
            </div>
            <Briefcase className="h-8 w-8 text-[var(--color-accent)]" />
          </div>
        </div>

        <div className="bg-[var(--bg-secondary)] p-4 rounded-lg shadow-sm border border-[var(--border-color)]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-[var(--text-secondary)]">Applications</p>
              <p className="text-2xl font-bold text-[var(--text-primary)]">{totalApplications}</p>
            </div>
            <Users className="h-8 w-8 text-[var(--color-accent)]" />
          </div>
        </div>

        <div className="bg-[var(--bg-secondary)] p-4 rounded-lg shadow-sm border border-[var(--border-color)]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-[var(--text-secondary)]">Shortlisted</p>
              <p className="text-2xl font-bold text-[var(--text-primary)]">{shortlisted}</p>
            </div>
            <UserCheck className="h-8 w-8 text-[var(--color-accent)]" />
          </div>
        </div>

        <div className="bg-[var(--bg-secondary)] p-4 rounded-lg shadow-sm border border-[var(--border-color)]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-[var(--text-secondary)]">Hired</p>
              <p className="text-2xl font-bold text-[var(--text-primary)]">{hired}</p>
            </div>
            <UserPlus className="h-8 w-8 text-[var(--color-accent)]" />
          </div>
        </div>
      </div>

      <div className="bg-[var(--bg-secondary)] rounded-lg shadow-sm border border-[var(--border-color)]">
        <div className="p-4 border-b border-[var(--border-color)] flex justify-between items-center">
          <h2 className="text-lg font-semibold text-[var(--text-primary)]">
            Recent Applications
          </h2>
          <button className="text-sm text-[var(--color-accent)] hover:underline flex items-center gap-1">
            View all <Eye className="h-4 w-4" />
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[var(--bg-primary)]">
              <tr className="text-left text-[var(--text-secondary)] text-sm">
                <th className="p-4">Candidate</th>
                <th className="p-4">Job</th>
                <th className="p-4">Applied Date</th>
                <th className="p-4">Status</th>
                <th className="p-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {recentApplications.map((app) => (
                <tr key={app.id} className="border-t border-[var(--border-color)]">
                  <td className="p-4">
                    <div>
                      <p className="font-medium text-[var(--text-primary)]">
                        {app.user?.name || "Unknown"}
                      </p>
                      <p className="text-sm text-[var(--text-secondary)]">
                        {app.user?.email || ""}
                      </p>
                    </div>
                  </td>
                  <td className="p-4 text-[var(--text-primary)]">
                    {app.job?.title || "N/A"}
                  </td>
                  <td className="p-4 text-[var(--text-secondary)]">
                    {new Date().toLocaleDateString()}
                  </td>
                  <td className="p-4">
                    <span
                      className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium
                        ${
                          app.status === "applied"
                            ? "bg-blue-100 text-blue-800"
                            : app.status === "shortlisted"
                            ? "bg-yellow-100 text-yellow-800"
                            : app.status === "hired"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                    >
                      {app.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <button className="text-[var(--color-accent)] hover:opacity-80">
                      <FileText className="h-5 w-5" />
                    </button>
                  </td>
                </tr>
              ))}
              {recentApplications.length === 0 && (
                <tr>
                  <td colSpan="5" className="p-8 text-center text-[var(--text-secondary)]">
                    No applications yet
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-[var(--bg-secondary)] rounded-lg shadow-sm border border-[var(--border-color)] p-4">
          <div className="flex items-center gap-2 mb-3">
            <Clock className="h-5 w-5 text-[var(--color-accent)]" />
            <h2 className="text-lg font-semibold text-[var(--text-primary)]">
              Pending Actions
            </h2>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-[var(--text-secondary)]">
                Applications need review
              </span>
              <span className="font-bold text-[var(--text-primary)]">
                {pendingReviews}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[var(--text-secondary)]">
                Upcoming interviews
              </span>
              <span className="font-bold text-[var(--text-primary)]">0</span>
            </div>
            <button className="w-full mt-2 bg-[var(--color-primary)] text-white py-2 rounded-lg hover:opacity-90 transition">
              Review Applications
            </button>
          </div>
        </div>

        <div className="bg-[var(--bg-secondary)] rounded-lg shadow-sm border border-[var(--border-color)] p-4">
          <div className="flex items-center gap-2 mb-3">
            <Bell className="h-5 w-5 text-[var(--color-accent)]" />
            <h2 className="text-lg font-semibold text-[var(--text-primary)]">
              Quick Actions
            </h2>
          </div>
          <div className="space-y-3">
            <button className="w-full flex items-center justify-center gap-2 bg-[var(--color-primary)] text-white py-2 rounded-lg hover:opacity-90 transition">
              <PlusCircle className="h-4 w-4" /> Post New Job
            </button>
            <button className="w-full flex items-center justify-center gap-2 border border-[var(--border-color)] text-[var(--text-primary)] py-2 rounded-lg hover:bg-[var(--bg-primary)] transition">
              <Briefcase className="h-4 w-4" /> Manage Jobs
            </button>
            <button className="w-full flex items-center justify-center gap-2 border border-[var(--border-color)] text-[var(--text-primary)] py-2 rounded-lg hover:bg-[var(--bg-primary)] transition">
              <Users className="h-4 w-4" /> View All Applicants
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyDashboard;