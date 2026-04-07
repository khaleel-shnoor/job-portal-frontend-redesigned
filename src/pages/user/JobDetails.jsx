import { useParams, Link } from "react-router-dom";
<<<<<<< HEAD
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
=======
import { useState } from "react";
import { jobs as dummyJobs, companies } from "../../data/dummyData";
import { useAuth } from "../../context/AuthContext";
>>>>>>> 1254ad9c4a731c8f55ec664191bc68947ee2abe8

export default function JobDetails() {
  const { id } = useParams();
<<<<<<< HEAD
  console.log("Job ID from URL:", id);
  const navigate = useNavigate();

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hasApplied, setHasApplied] = useState(false); 
=======
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
>>>>>>> 1254ad9c4a731c8f55ec664191bc68947ee2abe8
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/jobs/${id}`);
        const jobData = response.data;


        // Format salary display
        let salaryDisplay = "Not specified";
        if (jobData.salary_min && jobData.salary_max) {
          const formatter = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 });
          salaryDisplay = `${formatter.format(jobData.salary_min)} - ${formatter.format(jobData.salary_max)}`;
        } else if (jobData.salary_min) {
          salaryDisplay = `From ${new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(jobData.salary_min)}`;
        } else if (jobData.salary_max) {
          salaryDisplay = `Up to ${new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(jobData.salary_max)}`;
        }

        // Format location: if null/empty, show "Remote"
        const displayLocation = jobData.location || "Remote";

        // Format job type for display (capitalize)
        const displayType = jobData.type ? jobData.type.replace('-', ' ') : 'Not specified';
        // Capitalize first letter of each word
        const formattedType = displayType.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

        // Enhance job object with computed fields
        const enhancedJob = {
          ...jobData,
          salaryDisplay,
          displayLocation,
          displayType: formattedType,
          // If your API doesn't provide company name, you'll need to set it here
          company: jobData.company_name || "Unknown Company"
        };

        setJob(enhancedJob);
        setError(null);
      } catch (err) {
        console.error("Failed to fetch job:", err);
        setError(err.response?.data?.message || "Job not found or server error.");
      } finally {
        setLoading(false);
      }
    };

    fetchJobDetails();
  }, [id]);

  // Load saved state from localStorage (optional)
  useEffect(() => {
    const stored = localStorage.getItem("savedJobIds");
    if (stored && job) {
      const savedIds = JSON.parse(stored);
      setIsSaved(savedIds.includes(job.id));
    }
  }, [job]);

  // Persist save toggles
  const handleSaveToggle = () => {
    const newSaved = !isSaved;
    setIsSaved(newSaved);
    const stored = localStorage.getItem("savedJobIds");
    let savedIds = stored ? JSON.parse(stored) : [];
    if (newSaved) {
      if (!savedIds.includes(job.id)) savedIds.push(job.id);
    } else {
      savedIds = savedIds.filter(id => id !== job.id);
    }
    localStorage.setItem("savedJobIds", JSON.stringify(savedIds));
  };

  if (loading) {
    return <div className="p-8 text-center">Loading job details...</div>;
  }

  if (error || !job) {
    return <div className="p-8 text-center text-red-500">{error || "Job not found."}</div>;
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

            {/* Remove requirements section as it's not in the jobs table; optionally add later */}
            {/* If you have a requirements field in your DB, uncomment and map */}
            {/* <h2 className="text-2xl font-bold text-[var(--color-primary)] mt-8 mb-4">Requirements</h2>
            <ul className="list-disc list-inside text-[var(--text-primary)] space-y-2 ml-4">
              {job.requirements?.map((req, index) => (
                <li key={index} className="leading-relaxed">{req}</li>
              ))}
            </ul> */}
          </section>
        </div>

        {/* Right Column: Sticky Action Card */}
        <aside className="w-full lg:w-80">
          <div className="bg-[var(--bg-primary)] p-6 rounded-xl border border-[var(--border-color)] shadow-sm sticky top-8 flex flex-col gap-6">
            <div className="flex flex-col gap-3 text-[var(--text-primary)]">
              <div className="flex justify-between items-center border-b border-[var(--border-color)] pb-3">
                <span className="text-[var(--text-secondary)] font-medium">Location</span>
                <span className="font-semibold">{job.displayLocation}</span>
              </div>
              <div className="flex justify-between items-center border-b border-[var(--border-color)] pb-3">
                <span className="text-[var(--text-secondary)] font-medium">Job Type</span>
                <span className="font-semibold">{job.displayType}</span>
              </div>
              <div className="flex justify-between items-center pb-3">
                <span className="text-[var(--text-secondary)] font-medium">Salary</span>
                <span className="font-semibold text-[var(--color-accent)]">{job.salaryDisplay}</span>
              </div>
            </div>
            
<<<<<<< HEAD
            <div className="flex flex-col gap-3">
              <button
                onClick={() => navigate(`/user/apply/${job.id}`)}
                className="w-full py-4 font-bold rounded-xl shadow-sm text-lg bg-[var(--color-primary)] text-white hover:bg-[var(--color-secondary)]"
              >
                Apply Now
              </button>
              <button 
                onClick={handleSaveToggle}
                className={`w-full py-3 font-bold rounded-xl shadow-sm transition-colors border ${isSaved ? "bg-[var(--bg-secondary)] text-[var(--color-accent)] border-[var(--color-accent)]" : "bg-[var(--bg-primary)] text-[var(--color-primary)] border-[var(--border-color)] hover:border-[var(--color-primary)]"}`}
              >
                {isSaved ? "Saved ♥" : "Save Job ♡"}
              </button>
            </div>
=======
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
>>>>>>> 1254ad9c4a731c8f55ec664191bc68947ee2abe8
          </div>
        </aside>
      </div>
    </div>
  );
}