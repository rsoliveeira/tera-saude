import axios from "axios";

const api = axios.create({
  baseURL: "http://192.168.69.151:3001",
});

export default api;