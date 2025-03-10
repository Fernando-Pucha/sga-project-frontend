/* import { Link } from "react-router-dom";
const FrontApiURL = `${process.env.REACT_APP_FRONT_URL}`; */

export default function CourseList({ course }) {

    return (
        <div className="card bg-base-100 image-full w-96 shadow-xl">
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
                <div className="card-actions justify-end">
                    <button className="btn btn-primary">+ Details</button>
                </div>
            </div>
        </div>
    )
}