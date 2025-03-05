import "./LoginPage.css";
import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";
import authService from "../../services/auth.service";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const { storeToken, authenticateUser } = useContext(AuthContext);

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const requestBody = { email, password };

    // Send a request to the server using axios
    /* 
    axios.post(`${process.env.REACT_APP_SERVER_URL}/auth/login`)
      .then((response) => {})
    */

    // Or using a service
    authService
      .login(requestBody)
      .then((response) => {
        // If the POST request is successful store the authentication token,
        // after the token is stored authenticate the user
        // and at last navigate to the home page
        storeToken(response.data.authToken);
        authenticateUser();
        navigate("/home");
      })
      .catch((error) => {
        // If the request resolves with an error, set the error message in the state
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  };

  return (
    /* 
    <div className="SignupPage h-screen bg-cover bg-center relative" style={{ backgroundImage: 'url("https://observatorio.tec.mx/wp-content/uploads/2022/05/librosdetexto.jpeg")' }}>
      <div className="flex justify-center items-center h-full">
        <div className="bg-gray-100 p-8 rounded-lg shadow-lg w-full sm:w-96">
          <h1 className="text-2xl font-bold text-center mb-6">Login</h1>

          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <label className="block text-sm font-medium">Email:</label>
            <input type="email" name="email" value={email} onChange={handleEmail} className="w-full p-2 border border-gray-300 rounded-md" required/>

            <label className="block text-sm font-medium">Password:</label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={handlePassword}
              className="w-full p-2 border border-gray-300 rounded-md" required
            />

            <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition">Login</button>
          </form>
          {errorMessage && <p className="error-message">{errorMessage}</p>}

          <p className="text-center mt-4">Don't have an account yet?</p>
          <Link to={"/signup"} className="block text-center text-blue-500 hover:underline"> Sign Up</Link>
        </div>

      </div>

    </div> */

    <div className="hero bg-base-200 min-h-screen" style={{ backgroundImage: 'url("https://observatorio.tec.mx/wp-content/uploads/2022/05/librosdetexto.jpeg")' }}>
      <div className="hero-content flex-col lg:flex-row-reverse">

        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <form className="card-body w-96">
            <div className="form-control">
            <img src="/logoSGA.png" alt="logo SGA" className="w-48 h-auto mb-4 mx-auto"/>
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input type="email" placeholder="email" className="input input-bordered" required />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input type="password" placeholder="password" className="input input-bordered" required />
              <label className="label">
                <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
              </label>
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary">Login</button>
            </div>
          </form>
        </div>
      </div>
    </div>
 
  );
}

export default LoginPage;
