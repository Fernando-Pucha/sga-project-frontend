export default function CoursePage() {
    return (
        <>
            <h1 className="text-4xl mb-4 text-center">Courses enrolled</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-items-center mx-auto">
                <div className="card card-compact bg-base-100 w-96 shadow-xl">
                    <figure>
                        <img
                            src="https://grupopremiumformacion.com/wp-content/uploads/2023/07/Curso-Microsoft-Word.jpg"
                            alt="Word" />
                    </figure>
                    <div className="card-body">
                        <h2 className="card-title">Microsoft Word</h2>
                        <p>Enrolled students:</p>
                    </div>
                </div>
                <div className="card card-compact bg-base-100 w-96 shadow-xl">
                    <figure>
                        <img
                            src="https://patronesdecabotaje.org.ar/ajuar/wp-content/uploads/2023/07/cursos-excel.jpg"
                            alt="Excel" />
                    </figure>
                    <div className="card-body">
                        <h2 className="card-title">Microsoft Excel</h2>
                        <p>Enrolled students:</p>
                    </div>
                </div>
                <div className="card card-compact bg-base-100 w-96 shadow-xl">
                    <figure>
                        <img
                            src="https://t7m8e9c8.delivery.rocketcdn.me/wp-content/uploads/2020/11/microsoft-powerpoint.jpg"
                            alt="PowerPoint" />
                    </figure>
                    <div className="card-body">
                        <h2 className="card-title">Microsoft PowerPoint</h2>
                        <p>Enrolled students:</p>
                    </div>
                </div>
            </div>
        </>
    );
}

