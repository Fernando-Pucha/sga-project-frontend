import { useNavigate } from "react-router-dom";
import "./NotFoundPage.css";

function NotFoundPage() {
  const navigate = useNavigate();
    return (
      <div className="error-container">
           <img src="https://www.qualentum.com/wp-content/uploads/2024/03/Imagen-de-storyset-en-Freepik-3-1024x1024.jpg" alt="eror-404" />
           <h1>¡Ups!</h1>
           <p>The page was not found</p>
          {/*  <button onClick={() => navigate("/")}>Back to Home</button> */}
           <button className="btn btn-outline" onClick={() => navigate("/")}>Back to Home</button>
      </div>
    );
}

export default NotFoundPage;
