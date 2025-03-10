import { useEffect, useState } from "react";
import courseService from "../../services/course.service";
import CourseList from "../../components/CourseList/CourseList";


export default function CourseEnrollPage() {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        courseService
            .courseMycourses()
            .then(res => setCourses(res.data))
            .catch(err => console.log(err));
    }, []);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-items-center mx-auto mt-4">
            {courses.length > 0 ? (
                courses.map((course) => (
                    <CourseList key={course._id} course={course} />
                ))
            ) : (
                <h1 className="text-3xl font-bold text-center mt-8 mb-8">You are not registered in any course.</h1>
            )}
        </div>
    );
}

