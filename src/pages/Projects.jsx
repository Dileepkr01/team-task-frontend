import { useState, useEffect } from "react";
import API from "../api";
import Navbar from "../components/Navbar";

export default function Projects() {
  const [name, setName] = useState("");
  const [projects, setProjects] = useState([]);

  const fetchProjects = async () => {
    const res = await API.get("/projects");
    setProjects(res.data);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const createProject = async () => {
    try {
      if (!name) {
        return alert("Enter project name");
      }

      // ✅ Only send name
      await API.post("/projects", {
        name
      });

      setName("");
      fetchProjects();

    } catch (err) {
      alert(err.response?.data?.message || "Error");
    }
  };

  return (
    <div>
      <Navbar />

      <h2>Projects</h2>

      {/* PROJECT NAME */}
      <input
        placeholder="Project name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <button onClick={createProject}>Create</button>

      {/* PROJECT LIST */}
      <ul>
        {projects.map((p) => (
          <li key={p._id}>{p.name}</li>
        ))}
      </ul>
    </div>
  );
}