import axios from "axios";

class CourseService {
  constructor() {
    this.api = axios.create({
      baseURL: process.env.REACT_APP_SERVER_URL || "http://localhost:5005",
    });

    // Automatically set JWT token on the request headers for every request
    this.api.interceptors.request.use((config) => {
      // Retrieve the JWT token from the local storage
      const storedToken = localStorage.getItem("authToken");

      if (storedToken) {
        config.headers = { Authorization: `Bearer ${storedToken}` };
      }

      return config;
    });
  }

  courseCreate = (requestBody) =>{
    return this.api.post("/api/course/create", requestBody);
  }

  courseView = () =>{
    return this.api.get("/api/course/courses");
  }

  courseMycourses = () =>{
    return this.api.get("/api/course/mycourses");
  }

  courseUpdate = (id, requestBody) =>{
    return this.api.put(`/api/course/courseupdate/${id}`, requestBody);
  }

  courseDetails = (id) =>{
    return this.api.get(`/api/course/${id}`);
  }

  courseDelete = (id) =>{
    return this.api.delete(`/api/course/${id}`);
  }

}

// Create one instance (object) of the service
const courseService = new CourseService();

export default courseService;
