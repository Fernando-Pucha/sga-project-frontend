import "./SignupPage.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import authService from "../../services/auth.service";

function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const handleName = (e) => setName(e.target.value);
  const handleRole = (e) => setRole(e.target.value);

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    // Create an object representing the request body
    const requestBody = { email, password, name, role };

    // Send a request to the server using axios
    /* 
    const authToken = localStorage.getItem("authToken");
    axios.post(
      `${process.env.REACT_APP_SERVER_URL}/auth/signup`, 
      requestBody, 
      { headers: { Authorization: `Bearer ${authToken}` },
    })
    .then((response) => {})
    */

    // Or using a service
    authService
      .signup(requestBody)
      .then((response) => {
        // If the POST request is successful redirect to the login page
        navigate("/login");
      })
      .catch((error) => {
        // If the request resolves with an error, set the error message in the state
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  };

  return (
    <div className="hero bg-base-200 min-h-screen" style={{ backgroundImage: 'url("https://observatorio.tec.mx/wp-content/uploads/2022/05/librosdetexto.jpeg")' }}>
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="card bg-base-100 w-full max-w-lg shrink-0 shadow-2xl">
          <form onSubmit={handleSignupSubmit} className="card-body">
            <img src="/logoSGA.png" alt="logo SGA" className="w-48 h-auto mb-4 mx-auto" />
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="form-control">

                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input type="email" name="email" value={email} onChange={handleEmail} className="input input-bordered" required />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input type="password" name="password" value={password} onChange={handlePassword} className="input input-bordered" required />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input type="text" name="name" value={name} onChange={handleName} className="input input-bordered" required />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Role</span>
                </label>
                <select name="role" value={role} onChange={handleRole} className="select select-bordered w-full max-w-xs" required >
                  <option value="" disabled>Role</option>
                  <option value="profesor">Profesor</option>
                  <option value="estudiante">Estudiante</option>
                </select>
              </div>
            </div>

            <div className="form-control mt-6">
              <button className="btn btn-primary">Sing up</button>
            </div>
          </form>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <p className="text-center mb-5">Don't have an account yet? <Link to={"/login"} className="link link-primary">Login</Link></p>
        </div>
      </div>
    </div>
  );
}

export default SignupPage;
