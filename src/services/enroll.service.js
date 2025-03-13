import axios from "axios";

class EnrollService {
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

  enrollView = () =>{
    return this.api.get(`/api/enrollments/student/courses`);
  }
  
  enrollCreate = (courseId) =>{
    return this.api.post(`/api/enrollments/${courseId}/enroll`);
  }

 

 /*  

  myLesson = (courseId,lessonId) =>{
    return this.api.get(`/api/lesson/${courseId}/lessons/${lessonId}`);
  }

  lessonUpdate = (requestBody, courseId, lessonId ) =>{
    return this.api.put(`/api/lesson/${courseId}/lessons/${lessonId}`, requestBody);
  }

 lessonDelete = (courseId, lessonId) =>{
    return this.api.delete(`/api/lesson/${courseId}/lessons/${lessonId}`);
  } */

}

// Create one instance (object) of the service
const enrollService = new EnrollService();

export default enrollService;
