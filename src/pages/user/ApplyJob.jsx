import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "../../services/api";

export default function ApplyJob() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [coverLetter, setCoverLetter] = useState("");
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleFileChange = (e) => {
    setResume(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!resume) {
      setError("Please upload your resume.");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess(false);

    const formData = new FormData();
    formData.append("job_id", id);
    formData.append("cover_letter", coverLetter);
    formData.append("resume", resume);

    try {
      const response = await api.post("/applications", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setSuccess(true);
      setTimeout(() => {
        navigate("/user/applications");
      }, 1500);
    } catch (err) {
      const message = err.response?.data?.message || "Failed to submit application.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-[var(--bg-primary)] p-8 rounded-xl border border-[var(--border-color)]">
      <h1 className="text-2xl font-bold mb-6">Apply for Job #{id}</h1>

      {success && (
        <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-lg">
          Application submitted successfully! Redirecting...
        </div>
      )}

      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Cover Letter (optional)</label>
          <textarea
            rows="4"
            placeholder="Why are you a good fit for this role?"
            className="w-full p-3 border border-[var(--border-color)] rounded-lg"
            value={coverLetter}
            onChange={(e) => setCoverLetter(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Resume *</label>
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            className="w-full p-3 border border-[var(--border-color)] rounded-lg"
            onChange={handleFileChange}
            required
          />
          <p className="text-xs text-gray-500 mt-1">Upload PDF, DOC, or DOCX (max 5MB)</p>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-[var(--color-primary)] text-white py-3 rounded-lg disabled:opacity-50"
        >
          {loading ? "Submitting..." : "Submit Application"}
        </button>
      </form>
    </div>
  );
}