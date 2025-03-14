import { Link } from "react-router-dom";
import EditCourse from "../EditCourse/EditCourse";

export default function CourseList({ course, userLogin, courseId, clickDeleteCourse, refreshCourses }) {
    // Crear un ID único para el modal de cada curso
    const modalId = `edit_course_modal_${courseId}`;
    const FrontApiURL = process.env.REACT_APP_FRONT_URL;

    // Función para cerrar el modal y refrescar los cursos
    const handleCloseModal = () => {
        document.getElementById(modalId).close();
    };

    return (
        <div className="card card-compact bg-base-100 w-96 shadow-xl">
            <figure>
                <Link to={`${FrontApiURL}/courses/${course._id}/details`}>
                    <img
                        src={course.image}
                        alt="Shoes" />
                </Link>
            </figure>
            <div className="card-body flex flex-col justify-center">
                <h2 className="card-title">
                    <Link to={`${FrontApiURL}/courses/${course._id}/details`} className="hover:text-green-500 hover:font-bold" style={{ textDecoration: 'none' }}>
                        {course.title}
                    </Link>
                </h2>
                <div className="space-y-0">
                    {course.professor?.name && <p className="text-left">Professor: {course.professor.name}</p>}
                </div>
                <div className="flex justify-between w-full">
                    <h2 className="text-blue-500 font-bold"><i className="fa fa-book"></i> {course.lessons?.length || 0} Lesson</h2>
                    {course.price > 0 ? (
                        <div className="text-2xl font-bold text-accent">€ {course.price}</div>
                    ) : (
                        <h2 className="font-bold text-lg text-primary">Free</h2>
                    )}

                    {(userLogin?.role === "admin" || (userLogin?.role === "profesor" && userLogin?._id === course?.professor)) &&
                        <>
                            <div className="flex">
                                <button onClick={() => document.getElementById(modalId).showModal()}>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 text-green-700">
                                        <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z" />
                                        <path d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z" />
                                    </svg>
                                </button>
                                <dialog id={modalId} className="modal">
                                    <div className="modal-box w-11/12 max-w-5xl">
                                        <h3 className="font-bold text-lg">Edit course: {course.title}</h3>
                                        <EditCourse
                                            courseId={courseId}
                                            closeModal={handleCloseModal}
                                            onUpdateSuccess={refreshCourses}
                                        />
                                        <button className="btn mt-4" onClick={handleCloseModal}>Close</button>
                                    </div>
                                </dialog>
                            </div>

                            <button onClick={() => clickDeleteCourse(courseId)}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 text-red-700">
                                    <path fillRule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z" clipRule="evenodd" />
                                </svg>
                            </button>
                        </>
                    }
                </div>
            </div>
        </div>
    )
}