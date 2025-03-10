import { useEffect, useState } from "react";
import courseService from "../../services/course.service";
import CourseList from "../../components/CourseList/CourseList";
import authService from "../../services/auth.service";
import AddCourse from "../../components/AddCourse/AddCourse";



export default function CoursePage() {
    const [courses, setCourses] = useState([]);
    const [userLogin, setUserLogin] = useState([]);

    const getInitialCourses = () => {
        courseService
            .courseView()
            .then(res => setCourses(res.data))
            .catch(err => console.log(err));
      }
    
      useEffect(() => {
        getInitialCourses();    
        authService
          .userProfile()
          .then(res => setUserLogin(res.data))
          .catch(err => console.log(err));
      }, []);
    
      const closeModal = () => {
        getInitialCourses();
        document.getElementById('my_modal_4').close();
      };


    return (
        <>
        {(userLogin?.role === "admin")|| (userLogin?.role === "profesor") ? (
                <div className="flex">
                  <button className="btn btn-outline btn-primary mt-2 ml-auto mr-14" onClick={() => document.getElementById('my_modal_4').showModal()}>+ Course</button>
                  <dialog id="my_modal_4" className="modal">
                    <div className="modal-box w-11/12 max-w-5xl">
                      <h3 className="font-bold text-lg">Add new course</h3>
                      <AddCourse /> 
                      <button className="btn mt-4" onClick={closeModal}>Close</button>
                    </div>
                  </dialog>
                </div>
        
              ) : null}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-items-center mx-auto mt-4">
                <div className="card card-compact bg-base-100 w-96 shadow-xl">
                    <figure>
                        <img
                            src="https://grupopremiumformacion.com/wp-content/uploads/2023/07/Curso-Microsoft-Word.jpg"
                            alt="Word" />
                    </figure>
                    <div className="card-body">
                        <h2 className="card-title">Microsoft Word</h2>
                        <p>Enrolled students:</p>
                        <div className="card-actions justify-end">
                            <button className="btn btn-primary">+ Details</button>
                        </div>
                    </div>
                </div>
                <div className="card card-compact bg-base-100 w-96 shadow-xl">
                    <figure>
                        <img
                            src="https://patronesdecabotaje.org.ar/ajuar/wp-content/uploads/2023/07/cursos-excel.jpg"
                            alt="Excel" />
                    </figure>
                    <div className="card-body">
                        <h2 className="card-title">Microsoft Excel</h2>
                        <p>Enrolled students:</p>
                        <div className="card-actions justify-end">
                            <button className="btn btn-primary">+ Details</button>
                        </div>
                    </div>
                </div>
                <div className="card card-compact bg-base-100 w-96 shadow-xl">
                    <figure>
                        <img
                            src="https://img.odcdn.com.br/wp-content/uploads/2024/06/imagem_2024-06-27_110434641-1920x1080.png"
                            alt="PowerPoint" />
                    </figure>
                    <div className="card-body">
                        <h2 className="card-title">Microsoft PowerPoint</h2>
                        <p>Enrolled students:</p>
                        <div className="card-actions justify-end">
                            <button className="btn btn-primary">+ Details</button>
                        </div>
                    </div>
                </div>

                {courses.length > 0 ? (
                    courses.map((course) => (
                        <CourseList key={course._id} course={course} />
                    ))
                ) : (
                    <h1 className="text-3xl font-bold text-center mt-8 mb-8">No course to show</h1>
                )}

            </div>
        </>
    );
}

