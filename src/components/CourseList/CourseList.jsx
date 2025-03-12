import { Link } from "react-router-dom";
const FrontApiURL = `${process.env.REACT_APP_FRONT_URL}`;

export default function CourseList({ course }) {

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
                    {course.professor.name && <p className="text-left">{`Professor: ${course.professor.name}`}</p>}
                    <p className="text-left">{`Enrolled students:`}</p>
                </div>
                <div className="flex justify-between w-full">
                    <h2 className="text-blue-500 font-bold"><i class="fa fa-book"></i> {course.lessons.length} Lesson</h2>
                    {course.price > 0 ? (
                        <div className="text-2xl font-bold text-accent">€ {course.price}</div>
                    ) : (
                        course.price === 0 && <h2 className="font-bold text-lg text-primary">Free</h2>
                    )}
                </div>
            </div>
        </div>
    )
}