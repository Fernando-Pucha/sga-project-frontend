import React from "react";

export default function HomePage() {

  return (
    <div className="min-h-screen bg-base-200">
      {/* Navbar */}
      {/*  <div className="navbar bg-base-100 shadow-md px-6 fixed top-0 left-0 right-0 z-50">
        <div className="flex-1">
          <a href=" " className="btn btn-ghost text-2xl font-bold text-primary">SGA</a>
        </div>
        <div className="flex-none space-x-2">
          <button className="btn btn-secondary">Registrarse</button>
          <button className="btn btn-primary">Iniciar Sesión</button>
        </div>
      </div> */}

      {/* Hero Section */}
      <div className="hero min-h-screen" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1515378960530-7c0da6231fb1?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')" }}>
        <div className="hero-content flex flex-col lg:flex-row-reverse items-center">
          <img
            src="https://img.freepik.com/foto-gratis/sonriente-joven-estudiante-gafas-bolsa-trasera-sosteniendo-mirando-libros-pie-frente-pared-blanca-aislada-pared-rosa_141793-97678.jpg"
            alt="Estudiantes"
            className="rounded-lg shadow-lg w-full lg:w-1/2 opacity-95"
          />
          <div className="text-center lg:text-left p-5">
            <h1 className="text-5xl font-bold text-white">Bienvenido a SGA</h1>
            <p className="py-6 text-lg text-white">
              Administra cursos, alumnos y profesores en un solo lugar.
            </p>
            <button className="btn btn-accent btn-lg shadow-lg hover:scale-105 transition-transform">
              Explorar Cursos
            </button>
          </div>
        </div>
      </div>

      {/* Sección de Características */}
      <div className="p-10">
        <h2 className="text-4xl font-bold text-center text-neutral mb-8">
          ¿Qué ofrecemos?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "Profesores",
              text: "Gestiona cursos y alumnos fácilmente.",
              color: "bg-primary",
            },
            {
              title: "Estudiantes",
              text: "Inscríbete y accede a tus clases en línea.",
              color: "bg-accent",
            },
            {
              title: "Cursos",
              text: "Explora la mejor oferta educativa disponible.",
              color: "bg-neutral",
            },
          ].map((item, index) => (
            <div
              key={index}
              className={`card ${item.color} text-white shadow-xl p-6 text-center transform hover:scale-105 transition-all duration-300`}
            >
              <h2 className="text-2xl font-semibold">{item.title}</h2>
              <p className="mt-2">{item.text}</p>
            </div>
          ))}
        </div>
      </div>

       {/* Sección de Conoce a nuestros Profesores */}
      <div className="p-10 bg-base-100">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="flex flex-col justify-center p-5">
          <h2 className="text-4xl font-bold text-center text-neutral mb-8">
          Conoce a nuestros Profesores
        </h2>
            <p className="text-lg text-gray-600 mb-4">
              En nuestra plataforma, contamos con los mejores profesores, apasionados por la enseñanza y comprometidos con el éxito de cada estudiante. Nuestros educadores tienen años de experiencia y son expertos en sus respectivas áreas, brindando clases dinámicas, interactivas y de alta calidad.
            </p>
            <p className="text-lg text-gray-600">
              Estamos aquí para garantizar una experiencia educativa excepcional, ayudando a nuestros estudiantes a alcanzar sus metas y desarrollar habilidades clave para el futuro.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div className="relative group">
              <img
                src="https://thepixelcurve.com/edubin/lp/wp-content/uploads/sites/2/2024/01/EDUBIN0017.jpg"
                alt="Profesor 1"
                className="rounded-lg w-full h-80 object-cover transition-all duration-300 group-hover:scale-105"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-white text-center py-3 px-4 opacity-0 group-hover:opacity-100 transition-all duration-300">
                <h3 className="text-xl font-semibold">Juan Pérez</h3>
                <p className="text-sm text-gray-600">Profesor de Matemáticas</p>
                <p className="mt-2 text-sm text-gray-500 hidden group-hover:block">
                  Juan tiene más de 10 años de experiencia enseñando matemáticas a estudiantes de todos los niveles.
                </p>
              </div>
            </div>

            <div className="relative group">
              <img
                src="https://img.freepik.com/foto-gratis/joven-maestra-anteojos-explicando-leccion-sosteniendo-pila-libros-feliz-positiva-sonriendo-alegremente-pie-escritorio-escuela-frente-pizarra-aula_141793-131257.jpg"
                alt="Profesor 2"
                className="rounded-lg w-full h-80 object-cover transition-all duration-300 group-hover:scale-105"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-white text-center py-3 px-4 opacity-0 group-hover:opacity-100 transition-all duration-300">
                <h3 className="text-xl font-semibold">María Gómez</h3>
                <p className="text-sm text-gray-600">Profesora de Lengua y Literatura</p>
                <p className="mt-2 text-sm text-gray-500 hidden group-hover:block">
                  María es una apasionada de la literatura clásica y contemporánea, con años de experiencia educativa.
                </p>
              </div>
            </div>

            <div className="relative group">
              <img
                src="https://thepixelcurve.com/edubin/lp/wp-content/uploads/sites/2/2024/01/EDUBIN0018.jpg"
                alt="Profesor 3"
                className="rounded-lg w-full h-80 object-cover transition-all duration-300 group-hover:scale-105"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-white text-center py-3 px-4 opacity-0 group-hover:opacity-100 transition-all duration-300">
                <h3 className="text-xl font-semibold">Carlos Rodríguez</h3>
                <p className="text-sm text-gray-600">Profesor de Ciencias</p>
                <p className="mt-2 text-sm text-gray-500 hidden group-hover:block">
                  Carlos es un experto en ciencias naturales, con un enfoque en hacer los temas accesibles y divertidos.
                </p>
              </div>
            </div>

            <div className="relative group">
              <img
                src="https://media.istockphoto.com/id/1368496816/es/foto/feliz-estudiante-hispana-de-la-generaci%C3%B3n-z-con-auriculares-visitando-la-biblioteca.jpg?s=612x612&w=0&k=20&c=8ocxAW4-oHKF6B_-TRMBVkk3d7b_jtQ3gmZRm9hFwuA="
                alt="Profesor 4"
                className="rounded-lg w-full h-80 object-cover transition-all duration-300 group-hover:scale-105"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-white text-center py-3 px-4 opacity-0 group-hover:opacity-100 transition-all duration-300">
                <h3 className="text-xl font-semibold">Laura Martínez</h3>
                <p className="text-sm text-gray-600">Profesora de Historia</p>
                <p className="mt-2 text-sm text-gray-500 hidden group-hover:block">
                  Laura es especialista en historia moderna y tiene una amplia experiencia en el ámbito académico.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
