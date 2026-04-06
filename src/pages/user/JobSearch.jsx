import { useState } from "react";
import { Link } from "react-router-dom";
import { jobs as dummyJobs, companies } from "../../data/dummyData";

export default function JobSearch() {
  // Map the dummy jobs to include the actual company name
  const [jobs] = useState(() => {
    return dummyJobs.map(job => {
      const companyInfo = companies.find(c => c.id === job.companyId);
      return {
        ...job,
        company: companyInfo ? companyInfo.name : "Unknown Company",
        posted: "2 days ago" // hardcoded since it's not in dummy data
      };
    });
  });

  // State for search, filters, and local saves
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [savedJobIds, setSavedJobIds] = useState([dummyJobs[0]?.id, dummyJobs[1]?.id]); // Mock some saved jobs

  const handleTypeChange = (type) => {
    setSelectedTypes(prev => prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]);
  };

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) || job.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedTypes.length === 0 || selectedTypes.includes(job.type);
    return matchesSearch && matchesType;
  });

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
        <aside className="w-full lg:w-64 flex flex-col gap-6">
          <div className="bg-[var(--bg-primary)] p-6 rounded-xl border border-[var(--border-color)] shadow-sm">
            <h3 className="font-bold text-[var(--text-primary)] mb-4 uppercase tracking-wider text-sm">Filters</h3>
            
            <div className="flex flex-col gap-3">
              <h4 className="text-sm font-semibold text-[var(--text-secondary)]">Job Type</h4>
              {['Full-time', 'Part-time', 'Contract', 'Internship'].map(type => (
                <label key={type} className="flex items-center gap-3 text-[var(--text-primary)] cursor-pointer hover:text-[var(--color-accent)] transition-colors">
                  <input 
                    type="checkbox" 
                    checked={selectedTypes.includes(type)}
                    onChange={() => handleTypeChange(type)}
                    className="w-4 h-4 accent-[var(--color-accent)] cursor-pointer" 
                  /> {type}
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
                  <p className="text-[var(--text-secondary)] mt-1">{job.company} &bull; {job.location}</p>
                  <div className="flex gap-2 mt-4">
                    <span className="px-3 py-1 bg-[var(--bg-secondary)] text-[var(--text-secondary)] text-xs font-semibold rounded-full border border-[var(--border-color)]">{job.type}</span>
                    <span className="px-3 py-1 bg-[var(--bg-secondary)] text-[var(--text-secondary)] text-xs font-semibold rounded-full border border-[var(--border-color)]">{job.posted}</span>
                  </div>
                </div>
                <div className="flex sm:flex-col justify-end items-end gap-2">
                  <button 
                    onClick={(e) => {
                      e.preventDefault(); // Prevents the `<Link>` from firing
                      setSavedJobIds(prev => prev.includes(job.id) ? prev.filter(id => id !== job.id) : [...prev, job.id]);
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