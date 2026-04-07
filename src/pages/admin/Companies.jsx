import { useState } from "react";
import { companies as dummyCompanies, jobs } from "../../data/dummyData";

export default function Companies() {
  // 1. Initialize state by combining companies with their job counts
  const [companyList, setCompanyList] = useState(() => {
    return dummyCompanies.map((company) => {
      // Count how many active jobs belong to this specific company
      const jobCount = jobs.filter((job) => job.companyId === company.id).length;
      
      return {
        ...company,
        jobCount,
        // Fallbacks in case your dummyData doesn't have these boolean fields yet
        isVerified: company.isVerified ?? true,
        isActive: company.isActive ?? true,
      };
    });
  });

  const [searchTerm, setSearchTerm] = useState("");

  // 2. Handlers for Admin Actions
  const handleToggleVerify = (id) => {
    setCompanyList(companyList.map(c => 
      c.id === id ? { ...c, isVerified: !c.isVerified } : c
    ));
  };

  const handleToggleStatus = (id) => {
    setCompanyList(companyList.map(c => 
      c.id === id ? { ...c, isActive: !c.isActive } : c
    ));
  };

  // 3. Derived state for the search bar
  const filteredCompanies = companyList.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-8 h-full max-w-7xl pb-12">
      
      {/* Header & Search */}
      <header className="flex flex-col md:flex-row justify-between md:items-end gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[var(--color-primary)] tracking-tight">Company Management</h1>
          <p className="text-[var(--text-secondary)] mt-2">View, verify, and manage employers on the platform.</p>
        </div>
        <input 
          type="text" 
          placeholder="Search companies..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full md:w-72 p-3 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-color)] text-[var(--text-primary)] focus:outline-none focus:border-[var(--color-accent)] shadow-sm transition-colors"
        />
      </header>

      {/* Data Table */}
      <section className="bg-[var(--bg-primary)] rounded-xl border border-[var(--border-color)] shadow-sm overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[800px]">
          <thead>
            <tr className="bg-[var(--bg-secondary)] border-b border-[var(--border-color)] text-[var(--text-secondary)] text-sm uppercase tracking-wider">
              <th className="p-4 font-semibold">Company</th>
              <th className="p-4 font-semibold">Location</th>
              <th className="p-4 font-semibold text-center">Active Jobs</th>
              <th className="p-4 font-semibold text-center">Status</th>
              <th className="p-4 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--border-color)]">
            {filteredCompanies.length === 0 ? (
              <tr>
                <td colSpan="5" className="p-8 text-center text-[var(--text-secondary)] italic">No companies found.</td>
              </tr>
            ) : (
              
              filteredCompanies.map((company) => (
                <tr key={company.id} className="hover:bg-[var(--bg-secondary)] transition-colors group">
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-[var(--color-primary)]">{company.name}</span>
                    </div>
                    <div className="text-sm text-[var(--text-secondary)] mt-1">{company.email || `contact@${company.name.toLowerCase().replace(/\s/g, '')}.com`}</div>
                  </td>
                  <td className="p-4 text-[var(--text-secondary)] font-medium">{company.location || "Remote"}</td>
                  <td className="p-4 text-center font-bold text-[var(--text-primary)]">{company.jobCount}</td>
                  <td className="p-4 text-center">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold border ${company.isActive ? 'bg-green-500/10 text-green-500 border-green-500/20' : 'bg-red-500/10 text-red-500 border-red-500/20'}`}>
                      {company.isActive ? "Active" : "Suspended"}
                    </span>
                  </td>
                  <td className="p-4 flex justify-end gap-4 items-center">
                    <button onClick={() => handleToggleVerify(company.id)} className="text-sm font-semibold text-[var(--text-secondary)] hover:text-[var(--color-accent)] transition-colors">
                      {company.isVerified ? "Unverify" : "Verify"}
                    </button>
                    <button onClick={() => handleToggleStatus(company.id)} className={`text-sm font-semibold transition-colors ${company.isActive ? 'text-[var(--text-secondary)] hover:text-red-500' : 'text-red-500 hover:text-green-500'}`}>
                      {company.isActive ? "Suspend" : "Activate"}
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