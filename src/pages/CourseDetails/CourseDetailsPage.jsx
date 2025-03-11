import React from 'react';
import { Link } from 'react-router-dom';
import "font-awesome/css/font-awesome.min.css";

export default function CourseDetailsPage() {
    return (
        <div className="container mx-auto py-10 px-5 mt-6">
            {/* Course Header */}
            <div className="hero min-h-[60vh] bg-cover bg-center" style={{ backgroundImage: 'url(https://admin.12grids.com/uploads/blogs/original_cover_images/top-11-web-development-technologies-you-must-know-in-2024-12grids-compressed.jpg)' }}>
                <div className="hero-overlay bg-opacity-60"></div>
                <div className="text-center text-white">
                    <h1 className="text-4xl font-extrabold mb-4">Web Development Mastery Course</h1>
                    <p className="text-lg mb-4">Learn full-stack web development, build websites, and create modern web applications.</p>
                    <Link to="/enroll" className="btn btn-primary">Enroll Now</Link>
                </div>
            </div>

            {/* Course Info Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-10">
                <div className="card bg-base-100 shadow-xl">
                    <div className="card-body">
                        <h2 className="card-title">Course Overview</h2>
                        <p>This course will teach you the fundamentals of web development, including HTML, CSS, JavaScript, React, and Node.js. You'll learn how to build websites and modern web applications from scratch.</p>
                        <div className="divider"></div>
                        <h2 className="card-title">Instructor</h2>
                        <p>Jane Smith - Experienced Web Developer and Full-stack Engineer with over 8 years of experience building web applications.</p>
                    </div>
                </div>

                <div className="card bg-base-100 shadow-xl">
                    <div className="card-body">
                        <h2 className="card-title">Curriculum</h2>
                        <ul>
                            <li>Module 1: Introduction to Web Development</li>
                            <li>Module 2: HTML & CSS Fundamentals</li>
                            <li>Module 3: JavaScript Basics</li>
                            <li>Module 4: Introduction to React</li>
                            <li>Module 5: Building Full-Stack Applications with Node.js</li>
                            <li>Module 6: Final Project</li>
                        </ul>
                        <div className="divider"></div>
                        <h2 className="card-title">Requirements</h2>
                        <ul>
                            <li>Basic understanding of computers</li>
                            <li>Text editor (e.g., VS Code)</li>
                        </ul>
                    </div>
                </div>

                <div className="card bg-base-100 shadow-xl ">
                    <div className="card-body">
                        <h2 className="card-title">Course Info</h2>
                        <div className='flex justify-between mt-8'>
                            <div>
                                <i class="fa fa-tag"></i> Price:
                            </div>
                            <div className="text-2xl font-bold text-blue-600">$149.99</div>
                        </div>
                        <div className="divider divider-primary"></div>
                        <div className='flex justify-between'>
                            <div>
                                <i class="fa fa-globe"></i> Language:
                            </div>
                            <div className="font-bold">Englis</div>
                        </div>
                        <div className="divider divider-primary"></div>
                        <div className='flex'>
                            <i class="fa fa-hourglass-half"></i> Duration
                        </div>
                        <div className="divider divider-primary"></div>
                        <div className='flex'>
                            <i class="fa fa-folder"></i>Category
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
                <div className="flex justify-center space-x-6">
                    <div className="card w-1/4 bg-base-100 shadow-xl">
                        <div className="card-body">
                            <h2 className="card-title">Experienced Instructor</h2>
                            <p>Learn from an expert instructor with years of experience in web development.</p>
                        </div>
                    </div>
                    <div className="card w-1/4 bg-base-100 shadow-xl">
                        <div className="card-body">
                            <h2 className="card-title">Comprehensive Curriculum</h2>
                            <p>Covering everything from HTML & CSS to React and Node.js, this course is packed with knowledge.</p>
                        </div>
                    </div>
                    <div className="card w-1/4 bg-base-100 shadow-xl">
                        <div className="card-body">
                            <h2 className="card-title">Real-World Projects</h2>
                            <p>Build real-world projects to showcase your skills and add to your portfolio.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};