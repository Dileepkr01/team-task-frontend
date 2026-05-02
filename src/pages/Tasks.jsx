import { useState, useEffect } from "react";
import API from "../api";
import Navbar from "../components/Navbar";

export default function Tasks() {
  const [title, setTitle] = useState("");
  const [projectId, setProjectId] = useState("");
  const [assignedTo, setAssignedTo] = useState("");

  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [users, setUsers] = useState([]);

  const fetchTasks = async () => {
    const res = await API.get("/tasks");
    setTasks(res.data);
  };

  const fetchProjects = async () => {
    const res = await API.get("/projects");
    setProjects(res.data);
  };

  const fetchUsers = async () => {
    const res = await API.get("/users");
    setUsers(res.data);
  };

  useEffect(() => {
    fetchTasks();
    fetchProjects();
    fetchUsers();
  }, []);

  const createTask = async () => {
    try {
      if (!title || !projectId) {
        return alert("Fill all fields");
      }

      await API.post("/tasks", {
        title,
        projectId,
        assignedTo: assignedTo || null
      });

      alert("Task created");

      setTitle("");
      setProjectId("");
      setAssignedTo("");

      fetchTasks();

    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Error");
    }
  };

  const updateStatus = async (id, status) => {
    await API.put(`/tasks/${id}`, { status });
    fetchTasks();
  };

  return (
    <div style={styles.container}>
      <Navbar />

      <div style={styles.wrapper}>
        <h2 style={styles.heading}>Task Management</h2>

        {/* FORM CARD */}
        <div style={styles.card}>
          <input
            style={styles.input}
            placeholder="Task title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <select
            style={styles.select}
            value={projectId}
            onChange={(e) => setProjectId(e.target.value)}
          >
            <option value="">Select Project</option>
            {projects.map((p) => (
              <option key={p._id} value={p._id}>
                {p.name}
              </option>
            ))}
          </select>

          <select
            style={styles.select}
            value={assignedTo}
            onChange={(e) => setAssignedTo(e.target.value)}
          >
            <option value="">Assign User (optional)</option>
            {users.map((u) => (
              <option key={u._id} value={u._id}>
                {u.name}
              </option>
            ))}
          </select>

          <button style={styles.createBtn} onClick={createTask}>
            + Create Task
          </button>
        </div>

        {/* TASK LIST */}
        <div style={styles.taskList}>
          {tasks.map((t) => (
            <div key={t._id} style={styles.taskCard}>
              <div>
                <h4 style={styles.taskTitle}>{t.title}</h4>
                <p style={styles.taskInfo}>
                  Status: <b>{t.status}</b>
                </p>
                <p style={styles.taskInfo}>
                  Assigned: {t.assignedTo?.name || "Unassigned"}
                </p>
              </div>

              <button
                style={styles.doneBtn}
                onClick={() => updateStatus(t._id, "done")}
              >
                ✔ Done
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    background: "#f4f7fb",
    minHeight: "100vh",
  },
  wrapper: {
    maxWidth: "900px",
    margin: "20px auto",
    padding: "20px",
  },
  heading: {
    textAlign: "center",
    marginBottom: "20px",
  },
  card: {
    background: "#fff",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
    marginBottom: "25px",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  input: {
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "14px",
  },
  select: {
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "14px",
    background: "#fff",
  },
  createBtn: {
    padding: "10px",
    background: "#4facfe",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold",
  },
  taskList: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  taskCard: {
    background: "#fff",
    padding: "15px",
    borderRadius: "10px",
    boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  taskTitle: {
    margin: "0 0 5px 0",
  },
  taskInfo: {
    margin: "2px 0",
    fontSize: "13px",
    color: "#555",
  },
  doneBtn: {
    background: "#43e97b",
    color: "#fff",
    border: "none",
    padding: "8px 12px",
    borderRadius: "6px",
    cursor: "pointer",
  },
};