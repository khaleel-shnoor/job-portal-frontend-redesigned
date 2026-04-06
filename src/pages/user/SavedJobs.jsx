import { useState } from "react";
import { Link } from "react-router-dom";
import { jobs as dummyJobs, companies } from "../../data/dummyData";

export default function SavedJobs() {
  const [savedJobs, setSavedJobs] = useState(() => {
    // Grab the first two jobs to pretend they are saved
    return dummyJobs.slice(0, 2).map(job => {
      const companyInfo = companies.find(c => c.id === job.companyId);
      return {
        ...job,
        company: companyInfo ? companyInfo.name : "Unknown Company",
        savedOn: "Oct 29, 2023"
      };
    });
  });

  const handleRemove = (id) => {
    setSavedJobs(savedJobs.filter(job => job.id !== id));
  };

  return (
    <div className="flex flex-col gap-8 h-full">
      {/* Header */}
      <header>
        <h1 className="text-3xl font-bold text-[var(--color-primary)] tracking-tight">Saved Jobs</h1>
        <p className="text-[var(--text-secondary)] mt-2">Review and apply to the jobs you've bookmarked.</p>
      </header>

      {/* Saved Jobs List */}
      <main className="flex flex-col gap-4 max-w-4xl">
        {savedJobs.length === 0 ? (
          <div className="p-8 text-center text-[var(--text-secondary)] bg-[var(--bg-primary)] border border-dashed border-[var(--border-color)] rounded-xl">
            You haven't saved any jobs yet.
          </div>
        ) : (
          savedJobs.map((job) => (
            <div key={job.id} className="bg-[var(--bg-primary)] p-6 rounded-xl border border-[var(--border-color)] shadow-sm flex flex-col sm:flex-row justify-between gap-4 group">
              
              {/* Job Info (Clickable) */}
              <Link to={`/user/jobs/${job.id}`} className="flex-1 block cursor-pointer">
                <h2 className="text-xl font-bold text-[var(--color-primary)] group-hover:text-[var(--color-accent)] transition-colors">{job.title}</h2>
                <p className="text-[var(--text-secondary)] mt-1 font-medium">{job.company} &bull; {job.location}</p>
                <div className="flex gap-2 mt-4 items-center">
                  <span className="px-3 py-1 bg-[var(--bg-secondary)] text-[var(--text-secondary)] text-xs font-semibold rounded-full border border-[var(--border-color)]">{job.type}</span>
                  <span className="text-xs text-[var(--text-secondary)]">Saved: {job.savedOn}</span>
                </div>
              </Link>

              {/* Actions */}
              <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-3 border-t sm:border-t-0 sm:border-l border-[var(--border-color)] pt-4 sm:pt-0 sm:pl-4 mt-2 sm:mt-0">
                <Link to={`/user/jobs/${job.id}`}>
                  <button className="px-6 py-2 bg-[var(--color-primary)] text-white text-sm font-bold rounded-lg hover:bg-[var(--color-secondary)] transition-colors shadow-sm">
                    Apply
                  </button>
                </Link>
                <button 
                  onClick={() => handleRemove(job.id)}
                  className="text-[var(--text-secondary)] text-sm font-semibold hover:text-green-400 transition-colors"
                >
                  Remove
                </button>
              </div>

            </div>
          ))
        )}
      </main>
      
    </div>
  );
}