import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import { jobs as dummyJobs, companies } from "../../data/dummyData";
import { useAuth } from "../../context/AuthContext";

export default function JobDetails() {
  // useParams extracts the dynamic part of the URL (the :id)
  const { id } = useParams();
  const { user } = useAuth(); // Bring in the auth context to check roles

  const [job] = useState(() => {
    // 1. Find the job by ID 
    const foundJob = dummyJobs.find(j => j.id === parseInt(id));
    if (!foundJob) return null;
    
    // 2. Find the company
    const companyInfo = companies.find(c => c.id === foundJob.companyId);
    
    // 3. Merge them 
    return {
      ...foundJob,
      company: companyInfo ? companyInfo.name : "Unknown Company",
      posted: "2 days ago",
      isActive: foundJob.isActive ?? true // Track if the job is active/taken down
    };
  });

  // Mock states for interaction
  const [hasApplied, setHasApplied] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  // Protect against users typing in a random job ID in the URL that doesn't exist
  if (!job) {
    return <div className="p-8 text-center text-[var(--text-secondary)]">Job not found.</div>;
  }

  return (
    <div className="flex flex-col gap-8">
      
      {/* Back Button */}
      <div>
        {/* Dynamically link back to the correct dashboard based on role */}
        <Link to={user?.role === "admin" ? "/admin/jobs" : "/user/jobs"} className="text-[var(--text-secondary)] hover:text-[var(--color-accent)] transition-colors text-sm font-semibold flex items-center gap-2">
          &larr; Back to jobs
        </Link>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* Left Column: Job Content */}
        <div className="flex-1 flex flex-col gap-8">
          <header className="flex flex-col gap-2">
            <h1 className="text-4xl font-extrabold text-[var(--color-primary)] tracking-tight">{job.title}</h1>
            <p className="text-xl text-[var(--text-secondary)] font-medium">{job.company}</p>
          </header>

          <section className="bg-[var(--bg-primary)] p-8 rounded-xl border border-[var(--border-color)] shadow-sm">
            <h2 className="text-2xl font-bold text-[var(--color-primary)] mb-4">Job Description</h2>
            <p className="text-[var(--text-primary)] leading-relaxed">{job.description}</p>

            <h2 className="text-2xl font-bold text-[var(--color-primary)] mt-8 mb-4">Requirements</h2>
            <ul className="list-disc list-inside text-[var(--text-primary)] space-y-2 ml-4">
              {job.requirements.map((req, index) => (
                <li key={index} className="leading-relaxed">{req}</li>
              ))}
            </ul>
          </section>
        </div>

        {/* Right Column: Sticky Action Card */}
        <aside className="w-full lg:w-80">
          {/* Using sticky keeps the apply button visible as they read the description */}
          <div className="bg-[var(--bg-primary)] p-6 rounded-xl border border-[var(--border-color)] shadow-sm sticky top-8 flex flex-col gap-6">
            <div className="flex flex-col gap-3 text-[var(--text-primary)]">
              <div className="flex justify-between items-center border-b border-[var(--border-color)] pb-3">
                <span className="text-[var(--text-secondary)] font-medium">Location</span>
                <span className="font-semibold">{job.location}</span>
              </div>
              <div className="flex justify-between items-center border-b border-[var(--border-color)] pb-3">
                <span className="text-[var(--text-secondary)] font-medium">Job Type</span>
                <span className="font-semibold">{job.type}</span>
              </div>
              <div className="flex justify-between items-center pb-3">
                <span className="text-[var(--text-secondary)] font-medium">Salary</span>
                <span className="font-semibold text-[var(--color-accent)]">{job.salary}</span>
              </div>
            </div>
            
            {/* Render different buttons based on the user role */}
            {user?.role === "admin" ? (
              <div className="flex flex-col gap-3">
                <button className={`w-full py-4 font-bold rounded-xl shadow-sm text-lg transition-colors border ${job.isActive ? 'bg-[var(--bg-primary)] text-red-500 border-red-500 hover:bg-red-500/10' : 'bg-[var(--bg-primary)] text-green-500 border-green-500 hover:bg-green-500/10'}`}>
                  {job.isActive ? "Takedown Job" : "Restore Job"}
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                <button 
                  onClick={() => setHasApplied(true)}
                  disabled={hasApplied}
                  className={`w-full py-4 font-bold rounded-xl shadow-sm text-lg transition-colors ${hasApplied ? "bg-[var(--color-secondary)] text-white cursor-not-allowed opacity-90" : "bg-[var(--color-primary)] text-white hover:bg-[var(--color-secondary)]"}`}
                >
                  {hasApplied ? "Applied ✓" : "Apply Now"}
                </button>
                <button 
                  onClick={() => setIsSaved(!isSaved)}
                  className={`w-full py-3 font-bold rounded-xl shadow-sm transition-colors border ${isSaved ? "bg-[var(--bg-secondary)] text-[var(--color-accent)] border-[var(--color-accent)]" : "bg-[var(--bg-primary)] text-[var(--color-primary)] border-[var(--border-color)] hover:border-[var(--color-primary)]"}`}
                >
                  {isSaved ? "Saved ♥" : "Save Job ♡"}
                </button>
              </div>
            )}
          </div>
        </aside>

      </div>
    </div>
  );
}