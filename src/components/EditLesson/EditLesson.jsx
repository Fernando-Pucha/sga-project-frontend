import React, { useState } from 'react';
import lessonService from '../../services/lesson.service';

export default function EditLesson({ courseId, lesson, getInitialLesson }) {
    const [title, setTitle] = useState(lesson.title);
    const [content, setContent] = useState(lesson.content);
    const [videoUrl, setVideoUrl] = useState(lesson.videoUrl || '');

    const handleUpdateLesson = (e) => {
        e.preventDefault();

        lessonService
            .lessonUpdate({ title, content, videoUrl },courseId, lesson._id )
            .then(() => {
                getInitialLesson(courseId);
                document.getElementById(`edit_modal_${lesson._id}`).close();
            })
            .catch(err => console.log(err));
    };

    return (
        <>
            {/* <button onClick={() => document.getElementById(`edit_modal_${lesson._id}`).showModal()}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 text-green-500">
                    <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z" />
                    <path d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z" />
                </svg>
            </button> */}

            <dialog id={`edit_modal_${lesson._id}`} className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Edit Lesson</h3>
                    <form onSubmit={handleUpdateLesson}>
                        <label className="block mt-4">Title</label>
                        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="input input-bordered w-full" required />

                        <label className="block mt-4">Content</label>
                        <textarea value={content} onChange={(e) => setContent(e.target.value)} className="textarea textarea-bordered w-full" required />

                        <label className="block mt-4">Video URL</label>
                        <input type="text" value={videoUrl} onChange={(e) => setVideoUrl(e.target.value)} className="input input-bordered w-full" />

                        <div className="flex justify-end mt-4">
                            <button type="submit" className="btn btn-primary">Save Changes</button>
                            <button type="button" className="btn ml-2" onClick={() => document.getElementById(`edit_modal_${lesson._id}`).close()}>Cancel</button>
                        </div>
                    </form>
                </div>
            </dialog>
        </>
    );
}
