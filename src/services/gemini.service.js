import axios from "axios";

class GeminiService {
  constructor() {
    this.api = axios.create({
      baseURL: process.env.REACT_APP_SERVER_URL || "http://localhost:5005",
    });

    this.api.interceptors.request.use((config) => {
      const storedToken = localStorage.getItem("authToken");
      if (storedToken) {
        config.headers = { Authorization: `Bearer ${storedToken}` };
      }
      return config;
    });
  }

  getSummary = (text) => {
    return this.api.post("api/ai/summarize", { text });
  };
}

const geminiService = new GeminiService();
export default geminiService;