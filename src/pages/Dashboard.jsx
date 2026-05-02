import { useEffect, useState } from "react";
import API from "../api";
import Navbar from "../components/Navbar";

export default function Dashboard() {
  const [data, setData] = useState({
    total: 0,
    completed: 0,
    pending: 0,
    overdue: 0
  });

  useEffect(() => {
    API.get("/tasks/dashboard")
      .then(res => setData(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div style={styles.container}>
      <Navbar />

      <div style={styles.wrapper}>
        <h2 style={styles.heading}>Dashboard Overview</h2>

        <div style={styles.grid}>
          <div style={styles.card}>
            <h3>Total Tasks</h3>
            <p style={styles.number}>{data.total}</p>
          </div>

          <div style={{ ...styles.card, background: "#e6f7ff" }}>
            <h3>Completed</h3>
            <p style={styles.number}>{data.completed}</p>
          </div>

          <div style={{ ...styles.card, background: "#fff7e6" }}>
            <h3>Pending</h3>
            <p style={styles.number}>{data.pending}</p>
          </div>

          <div style={{ ...styles.card, background: "#ffe6e6" }}>
            <h3>Overdue</h3>
            <p style={styles.number}>{data.overdue}</p>
          </div>
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
    marginBottom: "25px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "20px",
  },
  card: {
    background: "#fff",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
    textAlign: "center",
  },
  number: {
    fontSize: "28px",
    fontWeight: "bold",
    marginTop: "10px",
  },
};