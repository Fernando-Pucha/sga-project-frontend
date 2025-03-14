# SGA Project - Frontend

## Descripción Técnica
Sistema de Gestión Académica (SGA) construido con React. Este repositorio contiene el frontend de la aplicación.

## Tecnologías Utilizadas
- React 18
- React Router DOM v6
- Tailwind CSS
- Axios
- JWT para autenticación

## Requisitos Previos
- Node.js >= 14.0.0
- npm >= 6.14.0
- Git

## Configuración del Entorno

1. **Clonar el repositorio**
```bash
git clone https://github.com/your-username/sga-project-frontend.git
cd sga-project-frontend
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Configurar variables de entorno**
Crear archivo `.env` en la raíz del proyecto:
```env
REACT_APP_API_URL=http://localhost:5005/api
```

## Estructura del Proyecto
```
src/
├── components/        # Componentes reutilizables
├── context/          # Contextos de React (auth, etc.)
├── pages/            # Páginas/Vistas principales
├── services/         # Servicios API
├── App.jsx           # Componente principal
└── index.jsx         # Punto de entrada
```

## Scripts Disponibles

- **Desarrollo**
```bash
npm start
```

- **Construcción**
```bash
npm run build
```

- **Tests**
```bash
npm test
```

## Rutas Principales
- `/` - Página de inicio
- `/login` - Inicio de sesión
- `/signup` - Registro
- `/profile` - Perfil de usuario
- `/courses` - Gestión de cursos
- `/users` - Gestión de usuarios (admin)

## Autenticación
- Implementada usando JWT
- Token almacenado en localStorage
- Rutas protegidas usando componentes `IsPrivate` e `IsAnon`

## Convenciones de Código
- Usar ESLint y Prettier para formateo
- Nombres de componentes en PascalCase
- Nombres de funciones en camelCase
- Props destructuring en componentes

## Contribución
1. Crear branch: `feature/nombre-caracteristica`
2. Commit cambios: `git commit -m 'feat: add nueva característica'`
3. Push al branch: `git push origin feature/nombre-caracteristica`
4. Crear Pull Request

## Gestión de Estado
- Context API para estado global
- Estados locales con useState
- useEffect para efectos secundarios

## Mejores Prácticas
- Componentización modular
- Reutilización de código
- Manejo de errores consistente
- Lazy loading para optimización

## Despliegue
```bash
npm run build
```
Los archivos de producción se generarán en la carpeta `build/`

## Testing
- Jest para pruebas unitarias
- React Testing Library para pruebas de componentes
- Coverage mínimo requerido: 70%

## Contacto
- Desarrollador Principal: Fernando Pucha
- Email: fernandopuchap@gmail.com

## Licencia
MIT