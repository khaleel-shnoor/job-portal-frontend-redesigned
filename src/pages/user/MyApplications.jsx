import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api"; // adjust path to your axios instance

export default function MyApplications() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  // Status mapping: backend value -> UI display name
  const statusMap = {
    applied: "Applied",
    shortlisted: "Under Review",
    interview: "Interviewing",
    rejected: "Rejected",
    hired: "Hired",
  };

  // Stages for Kanban columns (order matters)
  const stages = ["Applied", "Under Review", "Interviewing", "Rejected", "Hired"];

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        setLoading(true);
        // 1. Fetch applications for the logged-in user
        const response = await api.get("/applications/my");
        const apps = response.data;

        if (apps.length === 0) {
          setApplications([]);
          return;
        }

        // 2. For each application, fetch job details (and company name)
        //    Better: backend should return job title & company name directly.
        //    Here we do separate calls – but be careful with many requests.
        //    Alternatively, we could fetch all jobs once and map.
        const enrichedApps = await Promise.all(
          apps.map(async (app) => {
            try {
              // Fetch job details
              const jobRes = await api.get(`/jobs/${app.job_id}`);
              const job = jobRes.data;
              // Company name might be included in job response (if backend joins)
              // If not, we need another fetch: const companyRes = await api.get(`/companies/${job.company_id}`);
              // Assuming job includes company_name:
              const companyName = job.company_name || "Unknown Company";
              return {
                id: app.id,
                jobId: app.job_id,
                title: job.title,
                company: companyName,
                status: statusMap[app.status] || "Applied",
                date: app.created_at ? new Date(app.created_at).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" }) : "Unknown date",
              };
            } catch (err) {
              console.error(`Failed to fetch job ${app.job_id}:`, err);
              return {
                id: app.id,
                jobId: app.job_id,
                title: "Unknown Job",
                company: "Unknown Company",
                status: statusMap[app.status] || "Applied",
                date: "Unknown date",
              };
            }
          })
        );

        setApplications(enrichedApps);
        setError("");
      } catch (err) {
        console.error("Failed to fetch applications:", err);
        setError(err.response?.data?.message || "Failed to load applications.");
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  // Filter applications by search term
  const filteredApplications = applications.filter(
    (app) =>
      app.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.company.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-[var(--text-secondary)]">Loading your applications...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 text-center text-red-500 bg-red-50 rounded-xl">
        {error}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8 h-full">
      {/* Header */}
      <header className="flex flex-col md:flex-row justify-between md:items-end gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[var(--color-primary)] tracking-tight">
            My Applications
          </h1>
          <p className="text-[var(--text-secondary)] mt-2">
            Track the status of the jobs you've applied for.
          </p>
        </div>
        <input
          type="text"
          placeholder="Search applications..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full md:w-64 p-3 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-color)] text-[var(--text-primary)] focus:outline-none focus:border-[var(--color-accent)] shadow-sm transition-colors"
        />
      </header>

      {/* Kanban Board Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 items-start pb-8">
        {stages.map((stage) => {
          const stageApps = filteredApplications.filter(
            (app) => app.status === stage
          );

          return (
            <div key={stage} className="flex flex-col gap-4">
              {/* Column Header */}
              <div className="flex items-center justify-between border-b-2 border-[var(--border-color)] pb-2">
                <h2 className="font-bold text-[var(--text-primary)]">{stage}</h2>
                <span className="bg-[var(--bg-primary)] text-[var(--text-secondary)] text-xs font-bold px-2 py-1 rounded-full border border-[var(--border-color)]">
                  {stageApps.length}
                </span>
              </div>

              {/* Column Cards */}
              <div className="flex flex-col gap-4">
                {stageApps.length === 0 ? (
                  <div className="p-4 text-sm text-[var(--text-secondary)] text-center italic border border-dashed border-[var(--border-color)] rounded-xl">
                    No applications here.
                  </div>
                ) : (
                  stageApps.map((app) => (
                    <Link
                      to={`/user/jobs/${app.jobId}`}
                      key={app.id}
                      className="block group"
                    >
                      <div className="bg-[var(--bg-primary)] p-5 rounded-xl border border-[var(--border-color)] shadow-sm group-hover:shadow-md group-hover:border-[var(--color-accent)] transition-all cursor-pointer flex flex-col gap-2">
                        <h3 className="font-bold text-[var(--color-primary)] group-hover:text-[var(--color-accent)] transition-colors leading-tight">
                          {app.title}
                        </h3>
                        <p className="text-sm font-medium text-[var(--text-secondary)]">
                          {app.company}
                        </p>
                        <p className="text-xs text-[var(--text-secondary)] mt-2 font-medium bg-[var(--bg-secondary)] inline-block w-fit px-2 py-1 rounded border border-[var(--border-color)]">
                          Applied: {app.date}
                        </p>
                      </div>
                    </Link>
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}