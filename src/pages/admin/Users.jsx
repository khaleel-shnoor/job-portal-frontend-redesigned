import { useState, Fragment } from "react";
import { users as dummyUsers, applications, jobs } from "../../data/dummyData";
import { Link } from "react-router-dom";

export default function Users() {
  // 1. Initialize state by combining users with their application counts
  const [userList, setUserList] = useState(() => {
    // Filter out admins and companies to only show candidates
    const candidates = dummyUsers.filter(u => u.role !== "admin" && u.role !== "company");
    
    return candidates.map((user) => {
      // Count how many applications belong to this specific user
      const appsCount = applications.filter((app) => app.userId === user.id).length;
      
      return {
        ...user,
        appsCount,
        // Fallback in case your dummyData doesn't have an isActive boolean
        isActive: user.isActive ?? true,
      };
    });
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [expandedUserId, setExpandedUserId] = useState(null);

  // 2. Handlers for Admin Actions
  const handleToggleStatus = (id) => {
    setUserList(userList.map(u => 
      u.id === id ? { ...u, isActive: !u.isActive } : u
    ));
  };

  // 3. Derived state for the search bar
  const filteredUsers = userList.filter(u => 
    u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (u.email || "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-8 h-full max-w-7xl pb-12">
      
      {/* Header & Search */}
      <header className="flex flex-col md:flex-row justify-between md:items-end gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[var(--color-primary)] tracking-tight">Candidate Management</h1>
          <p className="text-[var(--text-secondary)] mt-2">View profiles and manage candidate accounts.</p>
        </div>
        <input 
          type="text" 
          placeholder="Search by name or email..." 
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
              <th className="p-4 font-semibold">Candidate</th>
              <th className="p-4 font-semibold">Title</th>
              <th className="p-4 font-semibold text-center">Applications</th>
              <th className="p-4 font-semibold text-center">Status</th>
              <th className="p-4 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--border-color)]">
            {filteredUsers.length === 0 ? (
              <tr>
                <td colSpan="5" className="p-8 text-center text-[var(--text-secondary)] italic">No candidates found.</td>
              </tr>
            ) : (
              filteredUsers.map((user) => (
                <Fragment key={user.id}>
                <tr className="hover:bg-[var(--bg-secondary)] transition-colors group">
                  <td className="p-4">
                    <div className="font-bold text-[var(--color-primary)]">{user.name}</div>
                    <div className="text-sm text-[var(--text-secondary)] mt-1">{user.email || `${user.name.toLowerCase().replace(/\s/g, '')}@gmail.com`}</div>
                  </td>
                  <td className="p-4 text-[var(--text-secondary)] font-medium">{user.title || "Candidate"}</td>
                  <td className="p-4 text-center font-bold text-[var(--text-primary)]">{user.appsCount}</td>
                  <td className="p-4 text-center">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold border ${user.isActive ? 'bg-green-500/10 text-green-500 border-green-500/20' : 'bg-red-500/10 text-red-500 border-red-500/20'}`}>
                      {user.isActive ? "Active" : "Suspended"}
                    </span>
                  </td>
                  <td className="p-4 flex justify-end gap-4 items-center">
                    <button 
                      onClick={() => setExpandedUserId(expandedUserId === user.id ? null : user.id)} 
                      className="text-sm font-semibold text-[var(--text-secondary)] hover:text-[var(--color-accent)] transition-colors"
                    >
                      {expandedUserId === user.id ? "Close Profile" : "View Profile"}
                    </button>
                    <button onClick={() => handleToggleStatus(user.id)} className={`text-sm font-semibold transition-colors ${user.isActive ? 'text-[var(--text-secondary)] hover:text-red-500' : 'text-red-500 hover:text-green-500'}`}>
                      {user.isActive ? "Suspend" : "Activate"}
                    </button>
                  </td>
                </tr>
                
                {/* Expandable Profile & Activity Row */}
                {expandedUserId === user.id && (
                  <tr className="bg-[var(--bg-secondary)] border-b border-[var(--border-color)]">
                    <td colSpan="5" className="p-6">
                      <div className="flex flex-col md:flex-row gap-12">
                        <div className="flex-1">
                          <h4 className="text-xs font-bold text-[var(--color-secondary)] uppercase tracking-wider mb-3">Profile Details</h4>
                          <p className="text-sm text-[var(--text-primary)] mb-2"><span className="font-semibold text-[var(--text-secondary)]">Bio:</span> {user.bio || "No bio provided."}</p>
                          <p className="text-sm text-[var(--text-primary)]"><span className="font-semibold text-[var(--text-secondary)]">Skills:</span> {user.skills?.join(", ") || "No skills listed."}</p>
                        </div>
                        <div className="flex-1">
                          <h4 className="text-xs font-bold text-[var(--color-secondary)] uppercase tracking-wider mb-3">Recent Applications</h4>
                          <ul className="space-y-2">
                            {applications.filter(app => app.userId === user.id).map(app => {
                              const appliedJob = jobs.find(j => j.id === app.jobId);
                              return (
                                <li key={app.id} className="text-sm flex justify-between items-center bg-[var(--bg-primary)] p-2 rounded border border-[var(--border-color)] shadow-sm">
                                  <Link to={`/admin/jobs/${app.jobId}`} target="_blank" className="font-semibold text-[var(--color-primary)] hover:text-[var(--color-accent)] hover:underline transition-colors">
                                    {appliedJob?.title || "Unknown Job"}
                                  </Link>
                                  <span className="text-xs font-bold px-2 py-1 rounded bg-[var(--bg-secondary)] text-[var(--color-accent)] uppercase tracking-wider">{app.status}</span>
                                </li>
                              );
                            })}
                            {user.appsCount === 0 && <li className="text-sm text-[var(--text-secondary)] italic">No applications found.</li>}
                          </ul>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
                </Fragment>
              ))
            )}
          </tbody>
        </table>
      </section>

    </div>
  );
}