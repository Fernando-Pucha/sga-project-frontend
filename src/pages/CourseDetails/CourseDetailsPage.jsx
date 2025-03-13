import React, { useEffect, useState } from 'react';
/* import { Link } from 'react-router-dom'; */
import "font-awesome/css/font-awesome.min.css";
import { useParams } from "react-router";
import courseService from '../../services/course.service';
import lessonService from '../../services/lesson.service';
import AddLesson from '../../components/AddLesson/AddLesson';
import authService from "../../services/auth.service";
import VideoPlayer from '../../components/VideoPlayer/VideoPlayer';
import enrollService from '../../services/enroll.service';
import EditLesson from '../../components/EditLesson/EditLesson';

export default function CourseDetailsPage() {

    const { courseId } = useParams();

    const [activeTab, setActiveTab] = useState('overview');

    const [course, setCourse] = useState({})
    const [lesson, setLesson] = useState({})
    const [userLogin, setUserLogin] = useState([]);

    const [isEnroll, setIsEnroll] = useState(false)
    const [isLoading, setIsLoading] = useState(true);

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    const getInitialCourse = (courseId) => {
        courseService
            .courseDetails(courseId)
            .then(res => setCourse(res.data))
            .catch(err => console.log(err))
    }

    const getInitialLesson = (courseId) => {
        lessonService
            .lessonView(courseId)
            .then(res => setLesson(res.data))
            .catch(err => console.log(err))
    }

    const checkEnrollmentStatus = (courseId) => {
        setIsLoading(true);
        enrollService
            .checkEnrollment(courseId)
            .then(res => {
                setIsEnroll(res.data.isEnrolled);
                setIsLoading(false);
            })
            .catch(err => {
                console.log(err);
                setIsLoading(false);
            });
    };

    useEffect(() => {
        window.scrollTo(0, 0);

        authService
            .userProfile()
            .then(res => {
                setUserLogin(res.data)
                if (res.data && (res.data.role === "estudiante" || res.data.role === "admin") && courseId) {
                    checkEnrollmentStatus(courseId);
                } else {
                    setIsLoading(false);
                }
            })
            .catch(err => {
                console.log(err);
                setIsLoading(false);
            });
    }, [courseId]);

    useEffect(() => {
        getInitialCourse(courseId);
        getInitialLesson(courseId);

    }, [courseId])


    const closeModal = () => {
        getInitialCourse();
        document.getElementById('my_modal_4').close();
    };

    const clickDeleteLesson = (courseId, lessonId) => {
        const isConfirmed = window.confirm("Are you sure you want to delete the lesson?")

        if (isConfirmed) {
            lessonService
                .lessonDelete(courseId, lessonId)
                .then(() => {
                    getInitialCourse(courseId);
                    getInitialLesson(courseId);

                })
                .catch((err) => console.log(err));
        }
    };

    const clickEnrollStudent = (courseId) => {
        enrollService
            .enrollCreate(courseId)
            .then(() => {
                setIsEnroll(true)
            })
            .catch((err) => console.log(err));
    }

    const clickUnsubscribeStudent = (courseId) => {
        enrollService
            .enrollDelete(courseId)
            .then(() => {
                setIsEnroll(false);
            })
            .catch((err) => console.log(err));
    };



    return (
        <div className="container mx-auto py-10 px-5 mt-6">
            {/* Course Header */}
            <div className="hero min-h-[60vh] bg-cover bg-center" style={{ backgroundImage: `url(${course.image})` }}>
                <div className="hero-overlay bg-opacity-60"></div>
                <div className="text-center text-white">
                    <h1 className="text-4xl font-extrabold mb-4">{course.title}</h1>
                    <p className="text-lg mb-11 p-5">{course.description}</p>
                    {/* Muestra el boton EnrollNow - Unsubcribe */}
                    {!isLoading && (
                        <>
                            {((userLogin.role === "estudiante" || userLogin.role === "admin") && !isEnroll) && (
                                <button className="btn btn-primary" onClick={() => clickEnrollStudent(courseId)}>
                                    Enroll Now
                                </button>
                            )}
                            {isEnroll && (
                                <button className="btn btn-accent" onClick={() => clickUnsubscribeStudent(courseId)}>
                                    Unsubscribe
                                </button>
                            )}
                        </>
                    )}
                </div>
            </div>

            {/* Course Info Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 mt-10 justify-items-center">


                <div className="card bg-base-100 shadow-xl w-full md:w-[555px]">
                    {/* Menú de navegación por pestañas */}
                    <div className="flex border-b border-gray-200">
                        <button
                            className={`py-3 px-4 font-medium text-sm ${activeTab === 'overview' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-blue-600'}`}
                            onClick={() => handleTabChange('overview')}
                        >
                            Lessons
                        </button>

                        <button
                            className={`py-3 px-4 font-medium text-sm ${activeTab === 'instructor' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-blue-600'}`}
                            onClick={() => handleTabChange('instructor')}
                        >
                            Instructor
                        </button>
                        <button
                            className={`py-3 px-4 font-medium text-sm ${activeTab === 'requirements' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-blue-600'}`}
                            onClick={() => handleTabChange('requirements')}
                        >
                            Requirements
                        </button>
                    </div>

                    {/* Contenido de las pestañas */}
                    <div className="card-body">

                        {/* Pestaña Lesson */}

                        {activeTab === 'overview' && (

                            <>
                                {
                                    (userLogin.role === "admin" || (userLogin.role === "profesor" && userLogin._id.toString() === course?.professor?._id.toString())) &&
                                    <div className="flex">
                                        <button className="btn btn-outline btn-primary ml-auto" onClick={() => document.getElementById('my_modal_4').showModal()}>+ Lesson</button>
                                        <dialog id="my_modal_4" className="modal">
                                            <div className="modal-box w-11/12 max-w-5xl">
                                                <h3 className="font-bold text-lg">Add new lesson</h3>
                                                <AddLesson getInitialLesson={getInitialLesson} />
                                                <button className="btn mt-4" onClick={closeModal}>Close</button>
                                            </div>
                                        </dialog>
                                    </div>
                                }

                                {lesson.length > 0 ? (
                                    lesson.map(less => (
                                        <div key={less._id} className="collapse collapse-plus bg-base-200">
                                            <input type="radio" name="my-accordion-3" defaultChecked />
                                            <div className="collapse-title text-xl font-medium">{less.title}</div>
                                            <div className="collapse-content">
                                                <div className="text-left mt-6" style={{ whiteSpace: 'pre-wrap' }}>{less.content}</div>
                                                {less.videoUrl && <VideoPlayer videoUrl={less.videoUrl} />}
                                                {(userLogin.role === "admin" || (userLogin.role === "profesor" && userLogin._id.toString() === course?.professor?._id.toString())) &&
                                                    <div className='flex justify-between mt-4'>

                                                        <button onClick={() => document.getElementById(`edit_modal_${less._id}`).showModal()}>
                                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 text-green-500">
                                                                <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z" />
                                                                <path d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z" />
                                                            </svg>
                                                        </button>

                                                        <EditLesson lesson={less} courseId={courseId} getInitialLesson={getInitialLesson} />
                                                        <button onClick={() => clickDeleteLesson(courseId, less._id)}>
                                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 text-red-700">
                                                                <path fillRule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z" clipRule="evenodd" />
                                                            </svg>
                                                        </button>
                                                    </div>
                                                }
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p>No lesson to show</p>
                                )}
                                <div>
                                    <h2 className="card-title">Lessons</h2>
                                    <ul className="text-left mt-6">
                                        <li>Module 1: Introduction to Web Development</li>
                                        <li>Module 2: HTML & CSS Fundamentals</li>
                                        <li>Module 3: JavaScript Basics</li>
                                        <li>Module 4: Introduction to React</li>
                                        <li>Module 5: Building Full-Stack Applications with Node.js</li>
                                        <li>Module 6: Final Project</li>
                                    </ul>
                                </div>
                            </>
                        )}

                        {/* Pestaña Instructor */}
                        {activeTab === 'instructor' && (
                            <div>
                                <h2 className="card-title">Instructor</h2>
                                <p className="text-left mt-6">
                                    {course.professor.name} <br /> <br />
                                    Experienced Web Developer and Full-stack Engineer with over 8 years of experience building web applications.</p>
                            </div>
                        )}

                        {/* Pestaña Requirements */}
                        {activeTab === 'requirements' && (
                            <div>
                                <h2 className="card-title">Requirements</h2>
                                <ul className="text-left mt-6">
                                    <li>Basic understanding of computers</li>
                                    <li>Text editor (e.g., VS Code)</li>
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
                {/* Course Info */}
                <div className="card bg-base-100 shadow-xl">
                    <div className="card-body">
                        <div className='flex justify-between'>
                            <h2 className="card-title">Course Info</h2>
                            {(userLogin?.role === "admin" || (userLogin?.role === "profesor" && userLogin._id === course?.professor?._id)) &&
                                <button>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 text-blue-900">
                                        <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z" />
                                        <path d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z" />
                                    </svg>
                                </button>
                            }

                        </div>

                        <div className='flex justify-between mt-8'>
                            <div>
                                <i className="fa fa-tag"></i> Price:
                            </div>

                            {course.price > 0 ? (
                                <div className="text-2xl font-bold text-blue-600">€ {course.price}</div>
                            ) : (
                                course.price === 0 && <h2 className="font-bold text-lg text-accent">Free</h2>
                            )}


                        </div>
                        <div className="divider divider-primary"></div>
                        <div className='flex justify-between'>
                            <div>
                                <i className="fa fa-globe"></i> Language:
                            </div>
                            <div className="font-bold">{course.language}</div>
                        </div>
                        <div className="divider divider-primary"></div>
                        <div className='flex justify-between'>
                            <div>
                                <i className="fa fa-hourglass-half"></i> Duration:
                            </div>
                            <div className="font-bold">{course.duration} hour</div>
                        </div>
                        <div className="divider divider-primary"></div>
                        <div className='flex justify-between'>
                            <div>
                                <i className="fa fa-folder"></i> Category:
                            </div>
                            <div className="font-bold">{course.category}</div>
                        </div>

                        <p className="mt-8 mb-4">Get lifetime access to the course content and updates.</p>

                        {
                            ((userLogin.role === "estudiante" || userLogin.role === "admin") && !isEnroll) &&
                            <button onClick={() => clickEnrollStudent(courseId)} className="btn btn-primary">Enroll Now</button>
                        }
                        {
                            isEnroll &&
                            <button onClick={() => clickUnsubscribeStudent(courseId)} className="btn btn-accent">Unsubscribe</button>
                        }

                    </div>
                </div>
            </div>

            {/* About Section */}
            <div className="mt-16">
                <h2 className="text-3xl font-bold text-center mb-6">Why Choose This Course?</h2>
                <p className="text-lg text-center mb-6">This course is perfect for beginners who want to learn web development from the ground up. It covers both frontend and backend technologies, providing a complete understanding of full-stack web development.</p>
                <div className="flex flex-col sm:flex-row justify-center space-y-6 sm:space-y-0 sm:space-x-6">
                    <div className="card w-full sm:w-1/4 bg-base-100 shadow-xl">
                        <div className="card-body">
                            <h2 className="card-title">Experienced Instructor</h2>
                            <p>Learn from an expert instructor with years of experience in web development.</p>
                        </div>
                    </div>
                    <div className="card w-full sm:w-1/4 bg-base-100 shadow-xl">
                        <div className="card-body">
                            <h2 className="card-title">Comprehensive Curriculum</h2>
                            <p>Covering everything from HTML & CSS to React and Node.js, this course is packed with knowledge.</p>
                        </div>
                    </div>
                    <div className="card w-full sm:w-1/4 bg-base-100 shadow-xl">
                        <div className="card-body">
                            <h2 className="card-title">Real-World Projects</h2>
                            <p>Build real-world projects to showcase your skills and add to your portfolio.</p>
                        </div>
                    </div>
                </div>
            </div>

        </div >
    );
};