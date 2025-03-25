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

  getShortContent = (topic) => {
    return this.api.post("api/ai/short-content", { topic });
  };

  getChatbot = (question) => {
    return this.api.post("api/ai/chat", { question });
  };
}

const geminiService = new GeminiService();
export default geminiService;