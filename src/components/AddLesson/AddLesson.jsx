import { useState } from "react";
import lessonService from "../../services/lesson.service";
import { useParams } from "react-router";

export default function AddLesson({getInitialLesson}) {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [videoUrl, setVideoUrl] = useState("");
    const [errorMessage, setErrorMessage] = useState(undefined);

    const handleTitle = (e) => setTitle(e.target.value);
    const handleContent = (e) => setContent(e.target.value);
    const handleVideoUrl = (e) => setVideoUrl(e.target.value);

    const { courseId } = useParams();

    const handleAddLessonSubmit = (e) => {
        e.preventDefault();
        const requestBody = { title, content, videoUrl };
        lessonService
            .lessonCreate(requestBody, courseId)
            .then(() => {
                setTitle("");
                setContent("");
                setVideoUrl("");
                getInitialLesson(courseId)
            })
            .catch((error) => {
                const errorDescription = error.response.data.message;
                setErrorMessage(errorDescription);
            });
    };

    return (
        <div className="hero bg-base-200 " style={{ backgroundImage: 'url("https://observatorio.tec.mx/wp-content/uploads/2022/05/librosdetexto.jpeg")' }}>
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="card bg-base-100 w-full max-w-lg shrink-0 shadow-2xl">
                    <form onSubmit={handleAddLessonSubmit} className="card-body w-96">

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Title</span>
                            </label>
                            <input type="text" name="text" value={title} onChange={handleTitle} className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Description</span>
                            </label>
                            <textarea type="textarea" name="description" value={content} onChange={handleContent} className="textarea input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Video URL</span>
                            </label>
                            <input type="text" name="text" value={videoUrl} onChange={handleVideoUrl} className="input input-bordered" />
                        </div>                        
                        <div className="form-control mt-6">
                            <button className="btn btn-primary">Add Lesson</button>
                        </div>
                    </form>
                    {errorMessage && <p className="error-message">{errorMessage}</p>}

                </div>
            </div>
        </div>
    );
}