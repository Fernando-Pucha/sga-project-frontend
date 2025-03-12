import { useEffect, useState } from "react";
import authService from "../../services/auth.service";
import courseService from "../../services/course.service";

export default function AddCourse() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState("");
    const [professor, setProfessor] = useState("");
    const [errorMessage, setErrorMessage] = useState(undefined);
    const [userLogin, setUserLogin] = useState([]);
    const [professors, setProfessors] = useState([]);

    const handleTitle = (e) => setTitle(e.target.value);
    const handleDescription = (e) => setDescription(e.target.value);
    const handleProfessor = (e) => setProfessor(e.target.value);
    const handleImage = (e) => setImage(e.target.value);

    const handleSignupSubmit = (e) => {
        e.preventDefault();
        const requestBody = { title, description, professorId: professor, image};
        courseService
            .courseCreate(requestBody)
            .then(() => {
                setTitle("");
                setDescription("");
                setProfessor("");
                setImage("");
            })
            .catch((error) => {
                const errorDescription = error.response.data.message;
                setErrorMessage(errorDescription);
            });
    };

    useEffect(() => {
        authService
            .userProfile()
            .then(res => setUserLogin(res.data))
            .catch(err => console.log(err));

        authService
            .userProfessors()
            .then(res => setProfessors(res.data))
            .catch(err => console.log(err));
    }, []);

    return (
        <div className="hero bg-base-200 " style={{ backgroundImage: 'url("https://observatorio.tec.mx/wp-content/uploads/2022/05/librosdetexto.jpeg")' }}>
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="card bg-base-100 w-full max-w-lg shrink-0 shadow-2xl">
                    <form onSubmit={handleSignupSubmit} className="card-body">

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
                            <input type="textarea" name="description" value={description} onChange={handleDescription} className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Image</span>
                            </label>
                            <input type="text" name="image" value={image} onChange={handleImage} className="input input-bordered" required />
                        </div>

                        {userLogin?.role === "admin" &&
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Professor</span>
                                </label>
                                <select name="professor" value={professor} onChange={handleProfessor} className="select select-bordered w-full max-w-xs" required >
                                    <option value="" disabled>Choose a Professor</option>
                                    {professors.map((professor) => (
                                        <option key={professor._id} value={professor._id}>{professor.name}</option>
                                    ))}
                                </select>
                            </div>
                        }

                        <div className="form-control mt-6">
                            <button className="btn btn-primary">Add Course</button>
                        </div>
                    </form>
                    {errorMessage && <p className="error-message">{errorMessage}</p>}

                </div>
            </div>
        </div>
    );
}