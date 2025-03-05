import "./SignupPage.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import authService from "../../services/auth.service";

function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState('');
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const handleName = (e) => setName(e.target.value);
  const handleRole = e => setRole(e.target.value);

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    // Create an object representing the request body
    const requestBody = { email, password, name };

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
    <div className="SignupPage h-screen bg-cover bg-center relative " style={{ backgroundImage: 'url("https://observatorio.tec.mx/wp-content/uploads/2022/05/librosdetexto.jpeg")' }}>

      <div className="flex justify-center items-center h-full">

        <div className="bg-gray-100 p-8 rounded-lg shadow-lg w-full sm:w-96">
          <img
            src="/logoSGA.png" 
            alt="logo SGA"
            className="w-48 h-auto mb-4 mx-auto"
          />
          {/* <h1 className="text-2xl font-bold text-center mb-6">SGA Sign Up</h1> */}
          <form onSubmit={handleSignupSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium">Email:</label>
              <input type="email" name="email" value={email} onChange={handleEmail} className="w-full p-2 border border-gray-300 rounded-md" required />
            </div>

            <div>
              <label className="block text-sm font-medium">Password:</label>
              <input type="password" name="password" value={password} onChange={handlePassword} className="w-full p-2 border border-gray-300 rounded-md" required />
            </div>

            <div>
              <label className="block text-sm font-medium">Name:</label>
              <input type="text" name="name" value={name} onChange={handleName} className="w-full p-2 border border-gray-300 rounded-md" required />
            </div>

            <div>
              <label className="block text-sm font-medium">Role:</label>
              <select name="role" value={role} onChange={handleRole} className="w-full p-2 border border-gray-300 rounded-md" required >
                <option value="" disabled>Role</option>
                <option value="Profesor">Profesor</option>
                <option value="Estudiante">Estudiante</option>
              </select>
            </div>

            <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition">Sign Up</button>
          </form>

          {errorMessage && <p className="mt-4 text-center text-red-500">{errorMessage}</p>}

          <p className="text-center mt-4">Already have an account?</p>
          <Link to="/login" className="block text-center text-blue-500 hover:underline">Login</Link>
        </div>
      </div>
    </div>


  );
}

export default SignupPage;
