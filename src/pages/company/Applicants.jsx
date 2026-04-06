import { useState } from "react";
import {
  Users,
  Search,
  Filter,
  Eye,
  UserCheck,
  UserX,
  FileText,
  ChevronDown,
} from "lucide-react";
import { applications, jobs, users } from "../../data/dummyData.js";

const Applicants = ({ companyId = 1 }) => {
  const companyJobs = jobs.filter((job) => job.companyId === companyId);
  const companyJobIds = companyJobs.map((job) => job.id);
  const companyApplications = applications.filter((app) =>
    companyJobIds.includes(app.jobId)
  );

  const [selectedJob, setSelectedJob] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const enrichedApplications = companyApplications.map((app) => {
    const job = jobs.find((j) => j.id === app.jobId);
    const user = users.find((u) => u.id === app.userId);
    return { ...app, job, user };
  });

  const filteredApplications = enrichedApplications.filter((app) => {
    const matchesJob = selectedJob === "all" || app.jobId === parseInt(selectedJob);
    const matchesStatus = selectedStatus === "all" || app.status === selectedStatus;
    const matchesSearch =
      searchTerm === "" ||
      app.user?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.user?.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.job?.title.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesJob && matchesStatus && matchesSearch;
  });

  const updateStatus = (appId, newStatus) => {
    // In a real app, you'd update the database/state
    console.log(`Application ${appId} status updated to ${newStatus}`);
    alert(`Application ${appId} marked as ${newStatus}`);
  };

  const getStatusBadge = (status) => {
    const styles = {
      applied: "bg-blue-100 text-blue-800",
      shortlisted: "bg-yellow-100 text-yellow-800",
      hired: "bg-green-100 text-green-800",
      rejected: "bg-red-100 text-red-800",
      interview: "bg-purple-100 text-purple-800",
    };
    return styles[status] || "bg-gray-100 text-gray-800";
  };

  return (
    <div className="p-6 bg-[var(--bg-primary)] min-h-screen">
      <div className="flex items-center gap-2 mb-6">
        <Users className="h-6 w-6 text-[var(--color-accent)]" />
        <h1 className="text-2xl font-bold text-[var(--text-primary)]">
          Applicants Management
        </h1>
      </div>

      <div className="bg-[var(--bg-secondary)] rounded-lg border border-[var(--border-color)] p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-[var(--text-secondary)]" />
            <input
              type="text"
              placeholder="Search by name, email, or job"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-[var(--bg-primary)] border border-[var(--border-color)] rounded-lg text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
            />
          </div>

          <div className="relative">
            <Filter className="absolute left-3 top-2.5 h-4 w-4 text-[var(--text-secondary)]" />
            <select
              value={selectedJob}
              onChange={(e) => setSelectedJob(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-[var(--bg-primary)] border border-[var(--border-color)] rounded-lg text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] appearance-none"
            >
              <option value="all">All Jobs</option>
              {companyJobs.map((job) => (
                <option key={job.id} value={job.id}>
                  {job.title}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-2.5 h-4 w-4 text-[var(--text-secondary)] pointer-events-none" />
          </div>

          <div className="relative">
            <Filter className="absolute left-3 top-2.5 h-4 w-4 text-[var(--text-secondary)]" />
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-[var(--bg-primary)] border border-[var(--border-color)] rounded-lg text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] appearance-none"
            >
              <option value="all">All Status</option>
              <option value="applied">Applied</option>
              <option value="shortlisted">Shortlisted</option>
              <option value="interview">Interview</option>
              <option value="hired">Hired</option>
              <option value="rejected">Rejected</option>
            </select>
            <ChevronDown className="absolute right-3 top-2.5 h-4 w-4 text-[var(--text-secondary)] pointer-events-none" />
          </div>

          <div className="text-right text-[var(--text-secondary)] text-sm pt-2">
            Showing {filteredApplications.length} of {enrichedApplications.length} applicants
          </div>
        </div>
      </div>

      {filteredApplications.length === 0 ? (
        <div className="text-center py-12 bg-[var(--bg-secondary)] rounded-lg border border-[var(--border-color)]">
          <Users className="h-12 w-12 text-[var(--text-secondary)] mx-auto mb-3" />
          <p className="text-[var(--text-secondary)]">No applicants found</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredApplications.map((app) => (
            <div
              key={app.id}
              className="bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-lg p-4 hover:shadow-md transition"
            >
              <div className="flex flex-col md:flex-row justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-[var(--text-primary)]">
                        {app.user?.name}
                      </h3>
                      <p className="text-sm text-[var(--text-secondary)]">
                        {app.user?.email}
                      </p>
                    </div>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadge(
                        app.status
                      )}`}
                    >
                      {app.status}
                    </span>
                  </div>

                  <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                    <div>
                      <span className="text-[var(--text-secondary)]">Applied for:</span>
                      <span className="ml-2 text-[var(--text-primary)] font-medium">
                        {app.job?.title}
                      </span>
                    </div>
                    <div>
                      <span className="text-[var(--text-secondary)]">Location:</span>
                      <span className="ml-2 text-[var(--text-primary)]">
                        {app.job?.location}
                      </span>
                    </div>
                    <div>
                      <span className="text-[var(--text-secondary)]">Skills:</span>
                      <div className="inline-flex flex-wrap gap-1 ml-2">
                        {app.user?.skills.slice(0, 3).map((skill) => (
                          <span
                            key={skill}
                            className="px-1.5 py-0.5 bg-[var(--bg-primary)] border border-[var(--border-color)] rounded text-xs"
                          >
                            {skill}
                          </span>
                        ))}
                        {app.user?.skills.length > 3 && (
                          <span className="text-xs text-[var(--text-secondary)]">
                            +{app.user.skills.length - 3}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {app.status === "rejected" && (
                    <p className="mt-2 text-xs text-red-600">
                      Note: Candidate has been rejected
                    </p>
                  )}
                </div>

                <div className="flex flex-row md:flex-col gap-2 justify-end">
                  <button
                    onClick={() => window.open(`/resume/${app.user?.resume}`, "_blank")}
                    className="flex items-center gap-1 px-3 py-1.5 text-sm border border-[var(--border-color)] rounded-lg text-[var(--text-primary)] hover:bg-[var(--bg-primary)] transition"
                    title="View Resume"
                  >
                    <FileText className="h-4 w-4" /> Resume
                  </button>
                  <button
                    onClick={() => alert(`View details for ${app.user?.name}`)}
                    className="flex items-center gap-1 px-3 py-1.5 text-sm border border-[var(--border-color)] rounded-lg text-[var(--text-primary)] hover:bg-[var(--bg-primary)] transition"
                    title="View Details"
                  >
                    <Eye className="h-4 w-4" /> Details
                  </button>
                  {app.status !== "shortlisted" && app.status !== "hired" && app.status !== "rejected" && (
                    <button
                      onClick={() => updateStatus(app.id, "shortlisted")}
                      className="flex items-center gap-1 px-3 py-1.5 text-sm bg-yellow-100 text-yellow-800 rounded-lg hover:bg-yellow-200 transition"
                    >
                      <UserCheck className="h-4 w-4" /> Shortlist
                    </button>
                  )}
                  {app.status !== "rejected" && app.status !== "hired" && (
                    <button
                      onClick={() => updateStatus(app.id, "rejected")}
                      className="flex items-center gap-1 px-3 py-1.5 text-sm bg-red-100 text-red-800 rounded-lg hover:bg-red-200 transition"
                    >
                      <UserX className="h-4 w-4" /> Reject
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Applicants;