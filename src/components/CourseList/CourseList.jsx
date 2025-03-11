/* import { Link } from "react-router-dom";
const FrontApiURL = `${process.env.REACT_APP_FRONT_URL}`; */

export default function CourseList({ course }) {

    return (
        <div className="card card-compact bg-base-100 w-96 shadow-xl">
            <figure>
                <img
                    src="https://i.blogs.es/8ba74b/man-2562325_1920/1200_800.webp"
                    alt="Shoes" />
            </figure>
            <div className="card-body flex flex-col justify-center">
                <h2 className="card-title">{course.title}</h2>
                <div className="space-y-0">
                    <p className="text-left">{`Professor: ${course.professor.name}`}</p>
                    <p className="text-left">{`Enrolled students:`}</p>
                </div>
                <div className="flex justify-between w-full">
                    <h2 className="text-blue-500 font-bold"><i class="fa fa-book"></i> {course.lessons.length} Lesson</h2>
                    <h2 className="font-bold text-lg text-accent">Free</h2>
                </div>
{/*                 <div className="card-actions justify-end">
                    <button className="btn btn-primary">+ Details</button>
                </div> */}
            </div>
        </div>
    )
}