import React, { useState } from 'react';
import lessonService from '../../services/lesson.service';

export default function EditLesson({ courseId, lesson, getInitialLesson }) {
    const [title, setTitle] = useState(lesson.title);
    const [content, setContent] = useState(lesson.content);
    const [videoUrl, setVideoUrl] = useState(lesson.videoUrl || '');

    const handleUpdateLesson = (e) => {
        e.preventDefault();

        lessonService
            .lessonUpdate({ title, content, videoUrl }, courseId, lesson._id)
            .then(() => {
                getInitialLesson(courseId);
                document.getElementById(`edit_modal_${lesson._id}`).close();
            })
            .catch(err => console.log(err));
    };

    return (
        <>
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
