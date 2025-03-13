import { useEffect, useState } from "react";
import authService from "../../services/auth.service";
import courseService from "../../services/course.service";
import { useNavigate } from "react-router-dom";

export default function EditCourse({ courseId, closeModal, onUpdateSuccess }) {
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState("");
/*     const [price, setPrice] = useState(0); */
    const [professor, setProfessor] = useState("");
    const [errorMessage, setErrorMessage] = useState(undefined);
    const [userLogin, setUserLogin] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [professors, setProfessors] = useState([]);
    const [isImageValid, setIsImageValid] = useState(true);

    const handleTitle = (e) => setTitle(e.target.value);
    const handleDescription = (e) => setDescription(e.target.value);
    const handleProfessor = (e) => setProfessor(e.target.value);
   /*  const handlePrice = (e) => setPrice(Number(e.target.value)); */
    const handleImage = (e) => {
        const url = e.target.value;
        setImage(url);
        const imagePattern = /\.(jpg|jpeg|png|gif|bmp)$/i;
        setIsImageValid(imagePattern.test(url) || url === "");
    };

    useEffect(() => {

        setIsLoading(true);
        courseService
            .courseDetails(courseId)
            .then((response) => {
                const oneCourse = response.data;
                setTitle(oneCourse.title || "");
                setDescription(oneCourse.description || "");
                setImage(oneCourse.image || "");
                /* setPrice(oneCourse.price || 0); */
                if (oneCourse.professor) {
                    setProfessor(oneCourse.professor._id || "");
                }
                setIsLoading(false);
            })
            .catch((error) => {
                console.log("Error al cargar detalles del curso:", error);
                setIsLoading(false);
                setErrorMessage("No se pudieron cargar los detalles del curso");
            });

        // Cargar perfil de usuario
        authService
            .userProfile()
            .then(res => setUserLogin(res.data))
            .catch(err => console.log("Error al cargar perfil:", err));

        // Cargar profesores (solo para rol admin)
        authService
            .userProfessors()
            .then(res => setProfessors(res.data))
            .catch(err => console.log("Error al cargar profesores:", err));

    }, [courseId]);

    const handleFormSubmit = (e) => {
        e.preventDefault();
        
        if (!isImageValid && image !== "") {
            setErrorMessage("Por favor, ingresa una URL de imagen válida");
            return;
        }
        
        const requestBody = { 
            title, 
            description, 
            image
        };
        
        // Si es admin y ha seleccionado un profesor, incluirlo en la solicitud
        if (userLogin?.role === "admin" && professor) {
            requestBody.professor = professor;
        }
        
        courseService
            .courseUpdate(courseId, requestBody)
            .then(() => {
                // Llamar a la función de actualización exitosa para refrescar la lista de cursos
                if (onUpdateSuccess) {
                    onUpdateSuccess();
                }
                
                // Cerrar el modal después de actualizar
                if (closeModal) {
                    closeModal();
                } else {
                    navigate(`/courses/${courseId}/details`);
                }
            })
            .catch((error) => {
                const errorDescription = error.response?.data?.message || "Error al actualizar el curso";
                setErrorMessage(errorDescription);
            });
    };

    if (isLoading) {
        return <div className="text-center">Cargando datos del curso...</div>;
    }

    return (
        <div className="bg-base-200 rounded-lg">
            <div className="flex-col lg:flex-row-reverse">
                <div className="card bg-base-100 w-full shadow-xl">
                    <form onSubmit={handleFormSubmit} className="card-body">
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
                            <textarea name="description" value={description} onChange={handleDescription} className="textarea textarea-bordered h-24" required/>
                        </div>
                        
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Image URL</span>
                            </label>
                            <input type="text" name="image" value={image} onChange={handleImage} 
                                className={`input input-bordered ${!isImageValid ? 'input-error' : ''}`}
                                placeholder="https://ejemplo.com/imagen.jpg"
                            />
                            {!isImageValid && <p className="text-error text-sm mt-1">Por favor, ingresa una URL de imagen válida.</p>}
                        </div>

                        {/* <div className="form-control">
                            <label className="label">
                                <span className="label-text">Price (€)</span>
                            </label>
                            <input 
                                type="number" 
                                name="price" 
                                value={price} 
                                onChange={handlePrice}
                                className="input input-bordered" 
                                min="0"
                                step="0.01"
                            />
                        </div> */}

                        {image && isImageValid && (
                            <div className="form-control mt-4">
                                <label className="label">
                                    <span className="label-text">Image Preview</span>
                                </label>
                                <img src={image} alt="Preview" className="rounded-lg shadow-sm max-h-48 object-cover" />
                            </div>
                        )}

                        {userLogin?.role === "admin" &&
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Professor</span>
                                </label>
                                <select 
                                    name="professor" 
                                    value={professor} 
                                    onChange={handleProfessor} 
                                    className="select select-bordered w-full" 
                                    required
                                >
                                    <option value="" disabled>Choose a Professor</option>
                                    {professors.map((prof) => (
                                        <option key={prof._id} value={prof._id}>{prof.name}</option>
                                    ))}
                                </select>
                            </div>
                        }

                        {errorMessage && (
                            <div className="alert alert-error mt-4">
                                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span>{errorMessage}</span>
                            </div>
                        )}

                        <div className="form-control mt-6">
                            <button className="btn btn-primary" type="submit">Update Course</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}