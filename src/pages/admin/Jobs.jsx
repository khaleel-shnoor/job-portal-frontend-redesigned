import { useState } from "react";
import { jobs as dummyJobs, companies, applications } from "../../data/dummyData";
import { Link } from "react-router-dom";

export default function Jobs() {
  // 1. Initialize state by combining jobs with their company names
  const [jobList, setJobList] = useState(() => {
    return dummyJobs.map((job) => {
      const company = companies.find(c => c.id === job.companyId);
      const applicantCount = applications.filter(app => app.jobId === job.id).length;
      return {
        ...job,
        companyName: company ? company.name : "Unknown Company",
        applicantCount,
        // Fallback in case your dummyData doesn't have an isActive boolean
        isActive: job.isActive ?? true,
      };
    });
  });

  const [searchTerm, setSearchTerm] = useState("");

  // 2. Handlers for Admin Actions
  const handleToggleStatus = (id) => {
    setJobList(jobList.map(job => 
      job.id === id ? { ...job, isActive: !job.isActive } : job
    ));
  };

  // 3. Derived state for the search bar
  const filteredJobs = jobList.filter(job => 
    job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.companyName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-8 h-full max-w-7xl pb-12">
      
      {/* Header & Search */}
      <header className="flex flex-col md:flex-row justify-between md:items-end gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[var(--color-primary)] tracking-tight">Global Job Feed</h1>
          <p className="text-[var(--text-secondary)] mt-2">Moderate active job postings across all companies.</p>
        </div>
        <input 
          type="text" 
          placeholder="Search by job title or company..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full md:w-80 p-3 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-color)] text-[var(--text-primary)] focus:outline-none focus:border-[var(--color-accent)] shadow-sm transition-colors"
        />
      </header>

      {/* Data Table */}
      <section className="bg-[var(--bg-primary)] rounded-xl border border-[var(--border-color)] shadow-sm overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[800px]">
          <thead>
            <tr className="bg-[var(--bg-secondary)] border-b border-[var(--border-color)] text-[var(--text-secondary)] text-sm uppercase tracking-wider">
              <th className="p-4 font-semibold">Job Title & Company</th>
              <th className="p-4 font-semibold text-center">Location</th>
              <th className="p-4 font-semibold text-center">Type</th>
              <th className="p-4 font-semibold text-center">Applicants</th>
              <th className="p-4 font-semibold text-center">Status</th>
              <th className="p-4 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--border-color)]">
            {filteredJobs.length === 0 ? (
              <tr>
                <td colSpan="5" className="p-8 text-center text-[var(--text-secondary)] italic">No jobs found matching your criteria.</td>
              </tr>
            ) : (
              filteredJobs.map((job) => (
                <tr key={job.id} className="hover:bg-[var(--bg-secondary)] transition-colors group">
                  <td className="p-4">
                    <div className="font-bold text-[var(--color-primary)]">{job.title}</div>
                    <div className="text-sm font-medium text-[var(--text-secondary)] mt-1">{job.companyName}</div>
                  </td>
                  <td className="p-4 text-center text-[var(--text-secondary)] font-medium">{job.location || "Remote"}</td>
                  <td className="p-4 text-center">
                    <span className="px-3 py-1 bg-[var(--bg-secondary)] text-[var(--text-secondary)] text-xs font-semibold rounded-full border border-[var(--border-color)]">{job.type || "Full-time"}</span>
                  </td>
                  <td className="p-4 text-center font-bold text-[var(--text-primary)]">{job.applicantCount}</td>
                  <td className="p-4 text-center">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold border ${job.isActive ? 'bg-green-500/10 text-green-500 border-green-500/20' : 'bg-red-500/10 text-red-500 border-red-500/20'}`}>
                      {job.isActive ? "Active" : "Taken Down"}
                    </span>
                  </td>
                  <td className="p-4 flex justify-end gap-4 items-center">
                    {/* We can route the admin to the user-side job details page so they can see exactly what candidates see! */}
                    <Link to={`/admin/jobs/${job.id}`} target="_blank" className="text-sm font-semibold text-[var(--text-secondary)] hover:text-[var(--color-accent)] transition-colors">
                      View Posting
                    </Link>
                    <button onClick={() => handleToggleStatus(job.id)} className={`text-sm font-semibold transition-colors ${job.isActive ? 'text-[var(--text-secondary)] hover:text-red-500' : 'text-red-500 hover:text-green-500'}`}>
                      {job.isActive ? "Takedown" : "Restore"}
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </section>

    </div>
  );
}