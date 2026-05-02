import { useState, useEffect } from "react";
import API from "../api";
import Navbar from "../components/Navbar";

export default function Projects() {
  const [name, setName] = useState("");
  const [projects, setProjects] = useState([]);

  //  ADD HERE
  const token = localStorage.getItem("token");
  const user = token ? JSON.parse(atob(token.split(".")[1])) : null;

  const fetchProjects = async () => {
    const res = await API.get("/projects");
    setProjects(res.data);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const createProject = async () => {
    await API.post("/projects", { name });
    setName("");
    fetchProjects();
  };

  return (
    <div>
      <Navbar />

      <h2>Projects</h2>

      {/*  ONLY ADMIN CAN SEE */}
      {user?.role === "admin" && (
        <>
          <input
            placeholder="Project name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button onClick={createProject}>Create</button>
        </>
      )}

      <ul>
        {projects.map((p) => (
          <li key={p._id}>{p.name}</li>
        ))}
      </ul>
    </div>
  );
}