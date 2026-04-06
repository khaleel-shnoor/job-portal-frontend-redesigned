import { useState } from "react";
import { users } from "../../data/dummyData";

export default function UserProfile() {
  const user = users[1]; // Get the dummy user

  // 1. Edit Profile Feature
  const [isEditing, setIsEditing] = useState(false);

  // 2. Personal Info & Custom Profile URL
  const [profile, setProfile] = useState({
    name: user.name || "Candidate",
    title: user.title || "Frontend Developer",
    customUrl: user.customUrl || (user.name || "candidate").toLowerCase().replace(/\s/g, "-"),
    bio: user.bio || "Passionate developer building accessible web apps.",
  });

  // 3. Portfolio / Project Links Feature
  const [projects, setProjects] = useState(user.projects || [
    { id: 1, name: "E-commerce App", url: "https://github.com/" }
  ]);

  // 4. Skills & Keyword Suggestions Feature
  const [skills, setSkills] = useState(user.skills || ["React.js", "TailwindCSS"]);
  const [skillInput, setSkillInput] = useState("");
  
  // Mock database of skills to suggest from
  const AVAILABLE_SKILLS = [
    "JavaScript", "TypeScript", "Node.js", "Python", 
    "Figma", "UI/UX", "GraphQL", "Vue.js", "AWS", "Docker"
  ];

  // Derived State: We filter available skills based on what the user types, 
  // making sure not to suggest skills they already added.
  const suggestedSkills = AVAILABLE_SKILLS.filter(
    s => s.toLowerCase().includes(skillInput.toLowerCase()) && !skills.includes(s)
  );

  // --- Handlers ---
  
  const handleAddProject = () => {
    // Add a blank project object to the array with a unique ID
    setProjects([...projects, { id: Date.now(), name: "", url: "" }]);
  };

  const handleUpdateProject = (id, field, value) => {
    // Map over the projects, find the one being edited, and update its specific field
    setProjects(projects.map(p => p.id === id ? { ...p, [field]: value } : p));
  };

  const handleAddSkill = (skill) => {
    if (!skills.includes(skill)) setSkills([...skills, skill]);
    setSkillInput(""); // Clear the input after adding
  };

  return (
    <div className="flex flex-col gap-8 h-full max-w-4xl pb-12">
      
      {/* Header & Edit Toggle */}
      <header className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-[var(--color-primary)] tracking-tight">My Profile</h1>
          <p className="text-[var(--text-secondary)] mt-2">Manage your personal information and resume.</p>
        </div>
        <button 
          onClick={() => setIsEditing(!isEditing)}
          className={`px-6 py-2 rounded-xl font-bold shadow-sm transition-colors ${
            isEditing 
              ? "bg-[var(--color-accent)] text-white hover:bg-opacity-90" 
              : "bg-[var(--bg-primary)] text-[var(--text-primary)] border border-[var(--border-color)] hover:border-[var(--color-primary)]"
          }`}
        >
          {isEditing ? "Save Changes" : "Edit Profile"}
        </button>
      </header>

      {/* Basic Info & Custom URL */}
      <section className="bg-[var(--bg-primary)] p-6 rounded-xl border border-[var(--border-color)] shadow-sm flex flex-col gap-6">
        <h2 className="text-xl font-bold text-[var(--color-primary)]">Basic Information</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-[var(--text-secondary)]">Full Name</label>
            <input type="text" value={profile.name} onChange={(e) => setProfile({...profile, name: e.target.value})} disabled={!isEditing} className="p-3 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-color)] text-[var(--text-primary)] focus:outline-none focus:border-[var(--color-accent)] disabled:opacity-60 transition-colors" />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-[var(--text-secondary)]">Professional Title</label>
            <input type="text" value={profile.title} onChange={(e) => setProfile({...profile, title: e.target.value})} disabled={!isEditing} className="p-3 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-color)] text-[var(--text-primary)] focus:outline-none focus:border-[var(--color-accent)] disabled:opacity-60 transition-colors" />
          </div>
        </div>

        {/* Bio */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-[var(--text-secondary)]">Bio</label>
          <textarea value={profile.bio} onChange={(e) => setProfile({...profile, bio: e.target.value})} disabled={!isEditing} rows="4" className="p-3 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-color)] text-[var(--text-primary)] focus:outline-none focus:border-[var(--color-accent)] disabled:opacity-60 transition-colors resize-none" placeholder="Tell us a little bit about yourself..."></textarea>
        </div>

        {/* Custom Profile URL */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-[var(--text-secondary)]">Custom Profile URL</label>
          <div className="flex items-center">
            <span className="px-4 py-3 bg-[var(--bg-secondary)] border border-[var(--border-color)] border-r-0 rounded-l-xl text-[var(--text-secondary)] font-medium">
              shnoor.com/
            </span>
            <input type="text" value={profile.customUrl} onChange={(e) => setProfile({...profile, customUrl: e.target.value})} disabled={!isEditing} className="flex-1 p-3 rounded-r-xl bg-[var(--bg-primary)] border border-[var(--border-color)] text-[var(--text-primary)] focus:outline-none focus:border-[var(--color-accent)] disabled:opacity-60 transition-colors" />
          </div>
        </div>
      </section>

      {/* Resume Upload */}
      <section className="bg-[var(--bg-primary)] p-6 rounded-xl border border-[var(--border-color)] shadow-sm flex flex-col gap-4">
        <h2 className="text-xl font-bold text-[var(--color-primary)]">Resume</h2>
        <input type="file" disabled={!isEditing} className="block w-full text-[var(--text-secondary)] file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-[var(--color-primary)] file:text-white hover:file:bg-[var(--color-secondary)] transition-all cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"/>
      </section>

      {/* Skills with Keyword Suggestions */}
      <section className="bg-[var(--bg-primary)] p-6 rounded-xl border border-[var(--border-color)] shadow-sm flex flex-col gap-4">
        <h2 className="text-xl font-bold text-[var(--color-primary)]">Skills</h2>
        
        <div className="flex flex-wrap gap-2 mb-2">
          {skills.map(skill => (
            <span key={skill} className="px-3 py-1 bg-[var(--bg-secondary)] text-[var(--text-primary)] text-sm font-semibold rounded-full border border-[var(--border-color)] flex items-center gap-2">
              {skill}
              {isEditing && (
                <button onClick={() => setSkills(skills.filter(s => s !== skill))} className="text-[var(--text-secondary)] hover:text-red-500 font-bold">&times;</button>
              )}
            </span>
          ))}
        </div>

        {isEditing && (
          <div className="relative">
            <input type="text" placeholder="Type to search skills..." value={skillInput} onChange={(e) => setSkillInput(e.target.value)} className="w-full p-3 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-color)] text-[var(--text-primary)] focus:outline-none focus:border-[var(--color-accent)] transition-colors" />
            
            {/* Autocomplete Dropdown */}
            {skillInput && suggestedSkills.length > 0 && (
              <ul className="absolute top-full mt-2 w-full bg-[var(--bg-primary)] border border-[var(--border-color)] rounded-xl shadow-lg z-10 max-h-48 overflow-y-auto">
                {suggestedSkills.map(skill => (
                  <li key={skill} onClick={() => handleAddSkill(skill)} className="p-3 hover:bg-[var(--bg-secondary)] cursor-pointer text-[var(--text-primary)] font-medium border-b border-[var(--border-color)] last:border-0">
                    {skill}
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </section>

      {/* Portfolio / Project Links */}
      <section className="bg-[var(--bg-primary)] p-6 rounded-xl border border-[var(--border-color)] shadow-sm flex flex-col gap-4">
        <h2 className="text-xl font-bold text-[var(--color-primary)]">Portfolio & Projects</h2>
        {projects.map((project, index) => (
          <div key={project.id} className="flex flex-col md:flex-row gap-4 mb-2">
            <input type="text" placeholder="Project Name (e.g. My Website)" value={project.name} onChange={(e) => handleUpdateProject(project.id, 'name', e.target.value)} disabled={!isEditing} className="flex-1 p-3 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-color)] text-[var(--text-primary)] focus:outline-none focus:border-[var(--color-accent)] disabled:opacity-60 transition-colors" />
            <input type="url" placeholder="URL (https://...)" value={project.url} onChange={(e) => handleUpdateProject(project.id, 'url', e.target.value)} disabled={!isEditing} className="flex-[2] p-3 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-color)] text-[var(--text-primary)] focus:outline-none focus:border-[var(--color-accent)] disabled:opacity-60 transition-colors" />
          </div>
        ))}
        {isEditing && (
          <button onClick={handleAddProject} className="self-start text-[var(--color-accent)] font-bold hover:underline text-sm mt-2">
            + Add another project
          </button>
        )}
      </section>

    </div>
  );
}