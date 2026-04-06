import { useState } from "react";
import { Link } from "react-router-dom";
import { applications as dummyApps, jobs, companies } from "../../data/dummyData";

export default function MyApplications() {
  const [applications] = useState(() => {
    // 1. Pretend we are user ID 1
    const myApps = dummyApps.filter(app => app.userId === 1);

    // 2. Map database statuses to our UI Kanban columns
    const statusMap = {
      "applied": "Applied",
      "shortlisted": "Under Review",
      "interview": "Interviewing",
      "rejected": "Rejected",
      "hired": "Hired"
    };

    // 3. Hydrate the applications with job and company data
    return myApps.map(app => {
      const jobInfo = jobs.find(j => j.id === app.jobId);
      const companyInfo = companies.find(c => c.id === jobInfo?.companyId);
      
      return {
        id: app.id,
        jobId: app.jobId,
        title: jobInfo?.title || "Unknown Job",
        company: companyInfo?.name || "Unknown Company",
        status: statusMap[app.status] || "Applied",
        date: "Oct 24, 2023"
      };
    });
  });

  // The stages of our Kanban board
  const stages = ["Applied", "Under Review", "Interviewing", "Rejected", "Hired"];

  const [searchTerm, setSearchTerm] = useState("");

  // Filter applications by search term globally before categorizing by column
  const filteredApplications = applications.filter(app => 
    app.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    app.company.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-8 h-full">
      
      {/* Header */}
      <header className="flex flex-col md:flex-row justify-between md:items-end gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[var(--color-primary)] tracking-tight">My Applications</h1>
          <p className="text-[var(--text-secondary)] mt-2">Track the status of the jobs you've applied for.</p>
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
          // Filter applications that belong in this specific column
          const stageApps = filteredApplications.filter(app => app.status === stage);
          
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
                    <Link to={`/user/jobs/${app.jobId}`} key={app.id} className="block group">
                      <div className="bg-[var(--bg-primary)] p-5 rounded-xl border border-[var(--border-color)] shadow-sm group-hover:shadow-md group-hover:border-[var(--color-accent)] transition-all cursor-pointer flex flex-col gap-2">
                        <h3 className="font-bold text-[var(--color-primary)] group-hover:text-[var(--color-accent)] transition-colors leading-tight">{app.title}</h3>
                        <p className="text-sm font-medium text-[var(--text-secondary)]">{app.company}</p>
                        <p className="text-xs text-[var(--text-secondary)] mt-2 font-medium bg-[var(--bg-secondary)] inline-block w-fit px-2 py-1 rounded border border-[var(--border-color)]">Applied: {app.date}</p>
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