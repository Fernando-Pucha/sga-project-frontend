import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import "font-awesome/css/font-awesome.min.css";
import { useParams } from "react-router";
import courseService from '../../services/course.service';
import lessonService from '../../services/lesson.service';
import AddLesson from '../../components/AddLesson/AddLesson';
import authService from "../../services/auth.service";
import VideoPlayer from '../../components/VideoPlayer/VideoPlayer';

export default function CourseDetailsPage() {

    const [activeTab, setActiveTab] = useState('overview');
    const { courseId } = useParams();
    const [course, setCourse] = useState({})
    const [lesson, setLesson] = useState({})
    const [userLogin, setUserLogin] = useState([]);



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

    useEffect(() => {
        window.scrollTo(0, 0);

        authService
            .userProfile()
            .then(res => setUserLogin(res.data))
            .catch(err => console.log(err));
    }, []);

    useEffect(() => {
        getInitialCourse(courseId);
        getInitialLesson(courseId);

    }, [courseId])


    const closeModal = () => {
        getInitialCourse();
        document.getElementById('my_modal_4').close();
    };

    const clickDeleteLesson = (courseId, lessonId) => {
        const isConfirmed = window.confirm("¿Estás seguro de que deseas eliminar la actividad?")

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

    return (
        <div className="container mx-auto py-10 px-5 mt-6">
            {/* Course Header */}
            <div className="hero min-h-[60vh] bg-cover bg-center" style={{ backgroundImage: `url(${course.image})` }}>
                <div className="hero-overlay bg-opacity-60"></div>
                <div className="text-center text-white">
                    <h1 className="text-4xl font-extrabold mb-4">{course.title}</h1>
                    <p className="text-lg mb-4">Learn full-stack web development, build websites, and create modern web applications.</p>
                    <Link to="/enroll" className="btn btn-primary">Enroll Now</Link>
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
                            Overview
                        </button>
                        <button
                            className={`py-3 px-4 font-medium text-sm ${activeTab === 'lesson' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-blue-600'}`}
                            onClick={() => handleTabChange('lesson')}
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
                        {/* Pestaña Overview */}
                        {activeTab === 'overview' && (
                            <div>
                                <h2 className="card-title">Course Overview</h2>
                                <p className="text-left mt-6">
                                    {course.description} <br /> <br />
                                    This course will teach you the fundamentals of web development, including HTML, CSS, JavaScript, React, and Node.js. You'll learn how to build websites and modern web applications from scratch.</p>
                            </div>
                        )}
                        {console.log("ID de usuario", userLogin, course)}


                        {/* Pestaña Lesson */}
                        {activeTab === 'lesson' && (
                            <>
                                {
                                    (userLogin.role === "admin" || (userLogin.role === "profesor" && userLogin._id.toString() === course.professor._id.toString())) &&
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
                                                {(userLogin.role === "admin" || (userLogin.role === "profesor" && userLogin._id.toString() === course.professor._id.toString())) &&
                                                    <div className='flex justify-between mt-4'>
                                                        <button className="btn btn-secondary">Edit</button>
                                                        <button className="btn btn-accent" onClick={() => clickDeleteLesson(courseId, less._id)}> Delete</button>
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
                        <h2 className="card-title">Course Info</h2>
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
                        <Link to="/enroll" className="btn btn-primary">Enroll Now</Link>
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