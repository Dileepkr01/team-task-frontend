import axios from "axios";

const API = axios.create({
  baseURL: "https://team-task-backend-production-6748.up.railway.app/api"
});

// Attach token automatically
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;