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

  //Muestra todos los cursos donde un estudiante esta inscrito
  enrollView = () =>{
    return this.api.get(`/api/enrollments/student/courses`);
  }
  
  // Inscribir al estudiante en un curso
  enrollCreate = (courseId) =>{
    return this.api.post(`/api/enrollments/${courseId}/enroll`);
  }

  // Verificar si el estudiante está inscrito en un curso específico
  checkEnrollment(courseId) {
    return this.api.get(`/api/enrollments/${courseId}/check`);
  }

   // Desinscribir al estudiante de un curso
   enrollDelete(courseId) {
    return this.api.delete(`/api/enrollments/${courseId}/disenroll`);
  }

}

// Create one instance (object) of the service
const enrollService = new EnrollService();

export default enrollService;
