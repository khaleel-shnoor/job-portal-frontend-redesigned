import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Briefcase, MapPin, DollarSign, Clock, FileText, Building } from "lucide-react";
import api from "../../services/api";

export default function PostJob() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [companies, setCompanies] = useState([]);
  const [selectedCompanyId, setSelectedCompanyId] = useState("");
  const [fetching, setFetching] = useState(true);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    salary_min: "",
    salary_max: "",
    type: "full-time",
  });

  useEffect(() => {
    const fetchManagerCompanies = async () => {
      try {
        // Try to get all companies (assuming /companies returns all)
        // Then filter by manager_id client-side? But we don't have manager_id in response?
        // Alternative: use a dedicated endpoint /companies/my if it returns array.
        // Since /companies/my is failing, let's try /companies and assume it returns all companies
        // and then we filter by the logged-in user's id (stored in token).
        const response = await api.get("/users/companies");
        const allCompanies = response.data;
        
        // We need the current user's ID. Assume it's stored in localStorage or from /users/me
        const userRes = await api.get("/users/profile");
        const currentUserId = userRes.data.id;
        
        const managedCompanies = allCompanies.filter(company => company.manager_id === currentUserId);
        
        if (managedCompanies.length === 0) {
          setError("You don't manage any companies. Please contact an admin.");
        } else {
          setCompanies(managedCompanies);
          setSelectedCompanyId(managedCompanies[0].id);
        }
      } catch (err) {
        console.error(err);
        setError("Unable to fetch your companies. Please try again later.");
      } finally {
        setFetching(false);
      }
    };

    fetchManagerCompanies();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!selectedCompanyId) {
      setError("Please select a company.");
      setLoading(false);
      return;
    }

    const salaryMin = parseFloat(formData.salary_min);
    const salaryMax = parseFloat(formData.salary_max);

    if (isNaN(salaryMin) || isNaN(salaryMax) || salaryMin < 0 || salaryMax < 0 || salaryMin > salaryMax) {
      setError("Please enter valid salary range (min ≤ max).");
      setLoading(false);
      return;
    }

    const payload = {
      title: formData.title,
      description: formData.description,
      company_id: selectedCompanyId,
      salary_min: salaryMin,
      salary_max: salaryMax,
      location: formData.location.trim() || null,
      type: formData.type,
      status: "open",
    };

    try {
      await api.post("/jobs", payload);
      navigate("/company/jobs");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to post job.");
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="p-8 text-center text-[var(--text-secondary)]">
        Loading company information...
      </div>
    );
  }

  return (
    <div className="p-6 bg-[var(--bg-primary)] min-h-screen">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center gap-2 mb-6">
          <Briefcase className="h-6 w-6 text-[var(--color-accent)]" />
          <h1 className="text-2xl font-bold text-[var(--text-primary)]">
            Post a New Job
          </h1>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Company selection */}
          {companies.length > 1 && (
            <div>
              <label className="block text-sm font-medium text-[var(--text-primary)] mb-1">
                Posting for Company *
              </label>
              <div className="relative">
                <Building className="absolute left-3 top-2.5 h-4 w-4 text-[var(--text-secondary)]" />
                <select
                  value={selectedCompanyId}
                  onChange={(e) => setSelectedCompanyId(Number(e.target.value))}
                  className="w-full pl-9 pr-3 py-2 bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-lg text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
                >
                  {companies.map(company => (
                    <option key={company.id} value={company.id}>
                      {company.name} {!company.approved ? "(Pending Approval)" : ""}
                    </option>
                  ))}
                </select>
              </div>
              {companies.find(c => c.id === selectedCompanyId)?.approved === false && (
                <p className="text-xs text-amber-600 mt-1">
                  Note: Your company is not yet approved. Job will be hidden until approval.
                </p>
              )}
            </div>
          )}

          {companies.length === 1 && (
            <div className="bg-[var(--bg-secondary)] p-3 rounded-lg">
              <span className="text-sm font-medium text-[var(--text-secondary)]">Posting for: </span>
              <span className="font-semibold text-[var(--text-primary)]">{companies[0].name}</span>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-[var(--text-primary)] mb-1">
              Job Title *
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-lg text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
              placeholder="e.g., Frontend Developer"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-[var(--text-primary)] mb-1">
                Location
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-2.5 h-4 w-4 text-[var(--text-secondary)]" />
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="w-full pl-9 pr-3 py-2 bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-lg text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
                  placeholder="e.g., Hyderabad (leave empty for remote)"
                />
              </div>
              <p className="text-xs text-[var(--text-secondary)] mt-1">
                Leave empty if remote.
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-[var(--text-primary)] mb-1">
                Job Type *
              </label>
              <div className="relative">
                <Clock className="absolute left-3 top-2.5 h-4 w-4 text-[var(--text-secondary)]" />
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  required
                  className="w-full pl-9 pr-3 py-2 bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-lg text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
                >
                  <option value="full-time">Full-time</option>
                  <option value="part-time">Part-time</option>
                  <option value="remote">Remote</option>
                </select>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-[var(--text-primary)] mb-1">
                Salary Min (INR) *
              </label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-2.5 h-4 w-4 text-[var(--text-secondary)]" />
                <input
                  type="number"
                  name="salary_min"
                  value={formData.salary_min}
                  onChange={handleChange}
                  required
                  step="1000"
                  min="0"
                  className="w-full pl-9 pr-3 py-2 bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-lg text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
                  placeholder="e.g., 50000"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-[var(--text-primary)] mb-1">
                Salary Max (INR) *
              </label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-2.5 h-4 w-4 text-[var(--text-secondary)]" />
                <input
                  type="number"
                  name="salary_max"
                  value={formData.salary_max}
                  onChange={handleChange}
                  required
                  step="1000"
                  min="0"
                  className="w-full pl-9 pr-3 py-2 bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-lg text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
                  placeholder="e.g., 110000"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-[var(--text-primary)] mb-1">
              Job Description *
            </label>
            <div className="relative">
              <FileText className="absolute left-3 top-3 h-4 w-4 text-[var(--text-secondary)]" />
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows="6"
                className="w-full pl-9 pr-3 py-2 bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-lg text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
                placeholder="Describe the role, responsibilities, benefits, and requirements..."
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={() => navigate("/manager/jobs")}
              className="px-6 py-2 border border-[var(--border-color)] text-[var(--text-primary)] rounded-lg hover:bg-[var(--bg-secondary)] transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-[var(--color-primary)] text-white rounded-lg hover:opacity-90 transition disabled:opacity-50"
            >
              {loading ? "Posting..." : "Post Job"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}