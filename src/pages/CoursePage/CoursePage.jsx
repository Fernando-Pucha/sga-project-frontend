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
            {((userLogin?.role === "admin") || (userLogin?.role === "profesor")) &&
                <div className="flex mt-20">
                    <button className="btn btn-outline btn-primary mt-2 ml-auto mr-14" onClick={() => document.getElementById('my_modal_4').showModal()}>+ Course</button>
                    <dialog id="my_modal_4" className="modal">
                        <div className="modal-box w-11/12 max-w-5xl">
                            <h3 className="font-bold text-lg">Add new course</h3>
                            <AddCourse />
                            <button className="btn mt-4" onClick={closeModal}>Close</button>
                        </div>
                    </dialog>
                </div>
            }

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-items-center mx-auto mt-4">
                <div className="card card-compact bg-base-100 w-96 shadow-xl">
                    <figure>
                        <img
                            src="https://kinsta.com/es/wp-content/uploads/sites/8/2023/04/react-must-be-in-scope-when-using-jsx.jpg"
                            alt="Word" />
                    </figure>
                    <div className="card-body flex flex-col justify-center">
                        <h2 className="card-title">React</h2>
                        <div className="space-y-0">
                            <p className="text-left">Professor: Carlos</p>
                            <p className="text-left">Enrolled students: 18</p>
                        </div>
                        <div className="flex justify-between w-full">
                            <h2 className="text-blue-500 font-bold"><i class="fa fa-book"></i> 10 Lesson</h2>
                            <h2 className="font-bold text-lg text-accent">Free</h2>
                        </div>
                        {/*                 <div className="card-actions justify-end">
                    <button className="btn btn-primary">+ Details</button>
                </div> */}
                    </div>
                </div>
                <div className="card card-compact bg-base-100 w-96 shadow-xl">
                    <figure>
                        <img
                            src="https://www.dongee.com/tutoriales/content/images/2023/12/image-112.png"
                            alt="Excel" />
                    </figure>
                    <div className="card-body flex flex-col justify-center">
                        <h2 className="card-title">CSS Básico</h2>
                        <div className="space-y-0">
                            <p className="text-left">Professor: Javier Barrionuevo</p>
                            <p className="text-left">Enrolled students: 10</p>
                        </div>
                        <div className="flex justify-between w-full">
                            <h2 className="text-blue-500 font-bold"><i class="fa fa-book"></i> 5 Lesson</h2>
                            <h2 className="font-bold text-lg text-accent">Free</h2>
                        </div>
                    </div>
                </div>
                <div className="card card-compact bg-base-100 w-96 shadow-xl">
                    <figure>
                        <img
                            src="https://admin.12grids.com/uploads/blogs/original_cover_images/top-11-web-development-technologies-you-must-know-in-2024-12grids-compressed.jpg"
                            alt="PowerPoint" />
                    </figure>
                    <div className="card-body flex flex-col justify-center">
                        <h2 className="card-title">Web Development</h2>
                        <div className="space-y-0">
                            <p className="text-left">Professor: Javier Barrionuevo</p>
                            <p className="text-left">Enrolled students: 5</p>
                        </div>
                        <div className="flex justify-between w-full">
                            <h2 className="text-blue-500 font-bold"><i class="fa fa-book"></i> 5 Lesson</h2>
                            <h2 className="font-bold text-lg text-accent">Free</h2>
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

