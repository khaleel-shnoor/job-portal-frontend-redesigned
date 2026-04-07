import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";

export default function JobSearch() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [savedJobIds, setSavedJobIds] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
       
        const [jobsRes, companiesRes] = await Promise.all([
          api.get("/jobs"),
          api.get("/users/companies") 
        ]);

        const jobsData = jobsRes.data;
        const companiesData = companiesRes.data;

        
        const companyMap = new Map();
        companiesData.forEach(company => {
          companyMap.set(company.id, company.name);
        });

        
        const enrichedJobs = jobsData.map(job => ({
          ...job,
          company: companyMap.get(job.company_id) || "Unknown Company",
          
          posted: getTimeAgo(job.created_at),
         
          displayLocation: job.location || "Remote"
        }));

        setJobs(enrichedJobs);
        setError(null);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
        console.error("Failed to fetch data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  const getTimeAgo = (timestamp) => {
    if (!timestamp) return "Recently";
    const created = new Date(timestamp);
    const now = new Date();
    const diffMs = now - created;
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    return `${diffDays} days ago`;
  };

  // Load saved jobs from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("savedJobIds");
    if (stored) setSavedJobIds(JSON.parse(stored));
  }, []);

  useEffect(() => {
    localStorage.setItem("savedJobIds", JSON.stringify(savedJobIds));
  }, [savedJobIds]);

  const handleTypeChange = (type) => {
    setSelectedTypes(prev =>
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    );
  };

  const filteredJobs = jobs.filter(job => {
<<<<<<< HEAD
    const matchesSearch =
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType =
      selectedTypes.length === 0 || selectedTypes.includes(job.type);
=======
    // If the admin takes a job down, it should completely disappear from the user feed
    if (job.isActive === false) return false;
    
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) || job.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedTypes.length === 0 || selectedTypes.includes(job.type);
>>>>>>> 1254ad9c4a731c8f55ec664191bc68947ee2abe8
    return matchesSearch && matchesType;
  });

  if (loading) return <div className="p-8 text-center">Loading jobs...</div>;
  if (error) return <div className="p-8 text-center text-red-500">Error: {error}</div>;


  const jobTypeOptions = [
    { value: "full-time", label: "Full-time" },
    { value: "part-time", label: "Part-time" },
    { value: "remote", label: "Remote" }
  ];

  return (
    <div className="flex flex-col gap-6">
      {/* Header & Search Bar */}
      <header className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold text-[var(--color-primary)]">Find your next job</h1>
        <div className="flex gap-4">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by job title, company, or keywords..."
            className="flex-1 p-4 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-color)] text-[var(--text-primary)] focus:outline-none focus:border-[var(--color-accent)] shadow-sm transition-colors"
          />
        </div>
      </header>

      <div className="flex flex-col lg:flex-row gap-8 mt-4">
        {/* Filters Sidebar */}
        <aside className="w-full lg:w-64 sticky top-6 self-start flex flex-col gap-6">
          <div className="bg-[var(--bg-primary)] p-6 rounded-xl border border-[var(--border-color)] shadow-sm">
            <h3 className="font-bold text-[var(--text-primary)] mb-4 uppercase tracking-wider text-sm">Filters</h3>
            <div className="flex flex-col gap-3">
              <h4 className="text-sm font-semibold text-[var(--text-secondary)]">Job Type</h4>
              {jobTypeOptions.map(option => (
                <label key={option.value} className="flex items-center gap-3 text-[var(--text-primary)] cursor-pointer hover:text-[var(--color-accent)] transition-colors">
                  <input
                    type="checkbox"
                    checked={selectedTypes.includes(option.value)}
                    onChange={() => handleTypeChange(option.value)}
                    className="w-4 h-4 accent-[var(--color-accent)] cursor-pointer"
                  /> {option.label}
                </label>
              ))}
            </div>
          </div>
        </aside>

        {/* Job Feed */}
        <main className="flex-1 flex flex-col gap-4">
          {filteredJobs.length === 0 && (
            <div className="p-8 text-center text-[var(--text-secondary)] bg-[var(--bg-primary)] border border-dashed border-[var(--border-color)] rounded-xl">
              No jobs found matching your criteria.
            </div>
          )}
          {filteredJobs.map((job) => (
            <Link to={`/user/jobs/${job.id}`} key={job.id} className="block group">
              <div className="bg-[var(--bg-primary)] p-6 rounded-xl border border-[var(--border-color)] shadow-sm group-hover:shadow-md group-hover:border-[var(--color-accent)] transition-all flex flex-col sm:flex-row justify-between gap-4">
                <div className="flex-1">
                  <h2 className="text-xl font-bold text-[var(--color-primary)] group-hover:text-[var(--color-accent)] transition-colors">{job.title}</h2>
                  <p className="text-[var(--text-secondary)] mt-1">
                    {job.company} &bull; {job.displayLocation}
                  </p>
                  
                  {job.salary_min && job.salary_max && (
                    <p className="text-sm text-[var(--text-secondary)] mt-1">
                      {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(job.salary_min)} - {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(job.salary_max)}
                    </p>
                  )}
                  <div className="flex gap-2 mt-4">
                    <span className="px-3 py-1 bg-[var(--bg-secondary)] text-[var(--text-secondary)] text-xs font-semibold rounded-full border border-[var(--border-color)] capitalize">{job.type}</span>
                    <span className="px-3 py-1 bg-[var(--bg-secondary)] text-[var(--text-secondary)] text-xs font-semibold rounded-full border border-[var(--border-color)]">{job.posted}</span>
                  </div>
                </div>
                <div className="flex sm:flex-col justify-end items-end gap-2">
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      setSavedJobIds(prev =>
                        prev.includes(job.id) ? prev.filter(id => id !== job.id) : [...prev, job.id]
                      );
                    }}
                    className="p-2 text-xl hover:scale-110 transition-transform"
                    title={savedJobIds.includes(job.id) ? "Unsave" : "Save"}
                  >
                    {savedJobIds.includes(job.id) ? "♥" : "♡"}
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </main>
      </div>
    </div>
  );
}