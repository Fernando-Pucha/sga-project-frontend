

export default function CourseDetailsPage() {

    return (
        <div className="drawer lg:drawer-open">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col"> {/* items-center justify-center */}
                {/* Page content here */}
                <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">
                    Course menu
                </label>

                <div id="slide1" className="carousel-item relative w-full">
                    <img src="https://img.daisyui.com/images/stock/photo-1414694762283-acccc27bca85.webp" alt="Imagen de curso" className="w-full" />
                </div>
                <h1 className="text-3xl font-bold text-center mt-8 mb-8">Curso de Desarrollo Web</h1>
                <div className="flex w-full flex-col border-opacity-50">
                    <div className="card bg-base-300 rounded-box grid place-items-center p-3">
                        <p>Este curso de desarrollo web te proporcionará las habilidades esenciales para crear sitios web modernos y funcionales.
                            Aprenderás desde los fundamentos de HTML, CSS y JavaScript, hasta las técnicas avanzadas para diseñar interfaces interactivas y optimizar la experiencia del usuario.
                            Además, explorarás herramientas y tecnologías actuales como frameworks y sistemas de control de versiones.
                            Al finalizar, podrás desarrollar proyectos web completos y responsivos, listos para el mundo digital.</p>
                    </div>
                    <div className="divider divider-primary">Lesson</div>
                    <div className="card bg-base-300 rounded-box grid place-items-center p-3">
                        <div tabIndex={0} className="collapse collapse-plus border-base-300 bg-base-200 border mb-2">
                            <div className="collapse-title text-xl font-medium">Lección 1</div>
                            <div className="collapse-content">
                                <p>Content</p>
                                <p>Video URL</p>
                            </div>
                        </div>
                        <div tabIndex={0} className="collapse collapse-plus border-base-300 bg-base-200 border">
                        <div className="collapse-title text-xl font-medium">Lección 2</div>
                            <div className="collapse-content">
                                <p>Content</p>
                                <p>Video URL</p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <div className="drawer-side">
                <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
                    {/* Sidebar content here */}
                    <li><a href=" ">Home course</a></li>
                    <li><a href=" ">Foro</a></li>
                    <li><a href=" ">Calificaciones</a></li>
                    <li><a href=" ">Estudents</a></li>
                </ul>
            </div>
        </div>
    );
}
