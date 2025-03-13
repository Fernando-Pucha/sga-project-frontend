import { useEffect, useState } from "react";
import courseService from "../../services/course.service";
import CourseList from "../../components/CourseList/CourseList";
import authService from "../../services/auth.service";
import AddCourse from "../../components/AddCourse/AddCourse";

export default function CoursePage() {
    const [courses, setCourses] = useState([]);
    const [userLogin, setUserLogin] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    

    const getInitialCourses = () => {
        setIsLoading(true);
        courseService
            .courseView()
            .then(res => {
                setCourses(res.data);
                setIsLoading(false);
            })
            .catch(err => {
                console.log("Error cargando cursos:", err);
                setIsLoading(false);
            });
    }

    useEffect(() => {
        // Cargar cursos
        getInitialCourses();
        
        // Cargar perfil de usuario
        authService
            .userProfile()
            .then(res => setUserLogin(res.data))
            .catch(err => console.log("Error cargando perfil:", err));
    }, []);

    const closeAddCourseModal = () => {
        getInitialCourses();
        document.getElementById('my_modal_add_course').close();
    };

    const clickDeleteCourse = (courseId) => {
        const isConfirmed = window.confirm("¿Estás seguro de que quieres eliminar este curso? Ten en cuenta que al eliminarlo, todas las actividades asociadas también se eliminarán.");

        if (isConfirmed) {
            courseService
                .courseDelete(courseId)
                .then(() => {
                    getInitialCourses();
                })
                .catch((err) => console.log("Error eliminando curso:", err));
        }
    };

    return (
        <>
            {((userLogin?.role === "admin") || (userLogin?.role === "profesor")) &&
                <div className="flex mt-20">
                    <button 
                        className="btn btn-outline btn-primary mt-2 ml-auto mr-14" 
                        onClick={() => document.getElementById('my_modal_add_course').showModal()}
                    >
                        + Course
                    </button>
                    <dialog id="my_modal_add_course" className="modal">
                        <div className="modal-box w-11/12 max-w-5xl">
                            <h3 className="font-bold text-lg">Add new course</h3>
                            <AddCourse closeModal={closeAddCourseModal} />
                            <button className="btn mt-4" onClick={closeAddCourseModal}>Close</button>
                        </div>
                    </dialog>
                </div>
            }

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-items-center mx-auto mt-20">
                {/* Ejemplos de cursos estáticos */}
                <div className="card card-compact bg-base-100 w-96 shadow-xl">
                    <figure>
                        <img
                            src="https://kinsta.com/es/wp-content/uploads/sites/8/2023/04/react-must-be-in-scope-when-using-jsx.jpg"
                            alt="React" />
                    </figure>
                    <div className="card-body flex flex-col justify-center">
                        <h2 className="card-title">React</h2>
                        <div className="space-y-0">
                            <p className="text-left">Professor: Carlos</p>
                            <p className="text-left">Enrolled students: 18</p>
                        </div>
                        <div className="flex justify-between w-full">
                            <h2 className="text-blue-500 font-bold"><i className="fa fa-book"></i> 10 Lesson</h2>
                            <h2 className="font-bold text-lg text-accent">Free</h2>
                        </div>
                    </div>
                </div>
                
                <div className="card card-compact bg-base-100 w-96 shadow-xl">
                    <figure>
                        <img
                            src="https://www.dongee.com/tutoriales/content/images/2023/12/image-112.png"
                            alt="CSS" />
                    </figure>
                    <div className="card-body flex flex-col justify-center">
                        <h2 className="card-title">CSS Básico</h2>
                        <div className="space-y-0">
                            <p className="text-left">Professor: Javier Barrionuevo</p>
                            <p className="text-left">Enrolled students: 10</p>
                        </div>
                        <div className="flex justify-between w-full">
                            <h2 className="text-blue-500 font-bold"><i className="fa fa-book"></i> 5 Lesson</h2>
                            <h2 className="font-bold text-lg text-accent">Free</h2>
                        </div>
                    </div>
                </div>
                
                <div className="card card-compact bg-base-100 w-96 shadow-xl">
                    <figure>
                        <img
                            src="https://admin.12grids.com/uploads/blogs/original_cover_images/top-11-web-development-technologies-you-must-know-in-2024-12grids-compressed.jpg"
                            alt="Web Development" />
                    </figure>
                    <div className="card-body flex flex-col justify-center">
                        <h2 className="card-title">Web Development</h2>
                        <div className="space-y-0">
                            <p className="text-left">Professor: Javier Barrionuevo</p>
                            <p className="text-left">Enrolled students: 5</p>
                        </div>
                        <div className="flex justify-between w-full">
                            <h2 className="text-blue-500 font-bold"><i className="fa fa-book"></i> 5 Lesson</h2>
                            <h2 className="font-bold text-lg text-accent">Free</h2>
                        </div>
                    </div>
                </div>

                {isLoading ? (
                    <div className="col-span-3 text-center py-10">
                        <div className="loading loading-spinner loading-lg"></div>
                        <p className="mt-4">Cargando cursos...</p>
                    </div>
                ) : (
                    courses.length > 0 ? (
                        courses.map((course) => (
                            <CourseList 
                                key={course._id} 
                                course={course} 
                                userLogin={userLogin} 
                                courseId={course._id} 
                                clickDeleteCourse={clickDeleteCourse}
                                refreshCourses={getInitialCourses}
                            />
                        ))
                    ) : (
                        <h1 className="col-span-3 text-3xl font-bold text-center p-40">No courses to show</h1>
                    )
                )}
            </div>
        </>
    );
}