import { useState } from "react";
import {
  Briefcase,
  MapPin,
  DollarSign,
  Clock,
  Users,
  Eye,
  Edit,
  Trash2,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { jobs, applications } from "../../data/dummyData.js";

const MyJobs = ({ companyId = 1 }) => {
  const [jobList, setJobList] = useState(
    jobs.filter((job) => job.companyId === companyId)
  );

  const getApplicationsCount = (jobId) => {
    return applications.filter((app) => app.jobId === jobId).length;
  };

  const getShortlistedCount = (jobId) => {
    return applications.filter(
      (app) => app.jobId === jobId && app.status === "shortlisted"
    ).length;
  };

  const handleDelete = (jobId) => {
    if (window.confirm("Are you sure you want to delete this job?")) {
      setJobList(jobList.filter((job) => job.id !== jobId));
    }
  };

  const handleToggleStatus = (jobId) => {
    setJobList(
      jobList.map((job) =>
        job.id === jobId ? { ...job, status: job.status === "active" ? "closed" : "active" } : job
      )
    );
  };

  return (
    <div className="p-6 bg-[var(--bg-primary)] min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <Briefcase className="h-6 w-6 text-[var(--color-accent)]" />
          <h1 className="text-2xl font-bold text-[var(--text-primary)]">My Posted Jobs</h1>
        </div>
        <button className="bg-[var(--color-primary)] text-white px-4 py-2 rounded-lg hover:opacity-90 transition flex items-center gap-2">
          <Briefcase className="h-4 w-4" /> Post New Job
        </button>
      </div>

      {jobList.length === 0 ? (
        <div className="text-center py-12 bg-[var(--bg-secondary)] rounded-lg border border-[var(--border-color)]">
          <Briefcase className="h-12 w-12 text-[var(--text-secondary)] mx-auto mb-3" />
          <p className="text-[var(--text-secondary)]">No jobs posted yet</p>
          <button className="mt-4 text-[var(--color-accent)] hover:underline">
            Post your first job
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {jobList.map((job) => (
            <div
              key={job.id}
              className="bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-lg p-4 hover:shadow-md transition"
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h2 className="text-xl font-semibold text-[var(--text-primary)]">
                      {job.title}
                    </h2>
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        job.status !== "closed"
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {job.status !== "closed" ? "Active" : "Closed"}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-3">
                    <div className="flex items-center gap-1 text-sm text-[var(--text-secondary)]">
                      <MapPin className="h-4 w-4" />
                      {job.location}
                    </div>
                    <div className="flex items-center gap-1 text-sm text-[var(--text-secondary)]">
                      <DollarSign className="h-4 w-4" />
                      {job.salary}
                    </div>
                    <div className="flex items-center gap-1 text-sm text-[var(--text-secondary)]">
                      <Clock className="h-4 w-4" />
                      {job.type}
                    </div>
                  </div>

                  <p className="text-[var(--text-primary)] mb-3 line-clamp-2">
                    {job.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-3">
                    {job.requirements.map((req) => (
                      <span
                        key={req}
                        className="px-2 py-1 bg-[var(--bg-primary)] border border-[var(--border-color)] rounded-full text-xs text-[var(--text-primary)]"
                      >
                        {req}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-4 text-sm">
                    <div className="flex items-center gap-1 text-[var(--text-secondary)]">
                      <Users className="h-4 w-4" />
                      <span>
                        {getApplicationsCount(job.id)} applications
                      </span>
                    </div>
                    <div className="flex items-center gap-1 text-[var(--text-secondary)]">
                      <CheckCircle className="h-4 w-4" />
                      <span>{getShortlistedCount(job.id)} shortlisted</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-2 ml-4">
                  <button
                    onClick={() => handleToggleStatus(job.id)}
                    className={`p-2 rounded-lg transition ${
                      job.status !== "closed"
                        ? "text-yellow-600 hover:bg-yellow-50"
                        : "text-green-600 hover:bg-green-50"
                    }`}
                    title={job.status !== "closed" ? "Close Job" : "Reopen Job"}
                  >
                    {job.status !== "closed" ? (
                      <XCircle className="h-5 w-5" />
                    ) : (
                      <CheckCircle className="h-5 w-5" />
                    )}
                  </button>
                  <button
                    className="p-2 text-[var(--color-accent)] hover:bg-[var(--bg-primary)] rounded-lg transition"
                    title="View Applications"
                  >
                    <Eye className="h-5 w-5" />
                  </button>
                  <button
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                    title="Edit Job"
                  >
                    <Edit className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(job.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                    title="Delete Job"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyJobs;