import { useState } from "react";
import authService from "../../services/auth.service";

export default function AddUser() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const handleName = (e) => setName(e.target.value);
  const handleRole = (e) => setRole(e.target.value);

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    const requestBody = { email, password, name, role };
    authService
      .signup(requestBody)
      .then(() => {
        setEmail("");
        setPassword("");
        setName("");
        setRole("");
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  };

  return (
    <div className="hero bg-base-200 " style={{ backgroundImage: 'url("https://observatorio.tec.mx/wp-content/uploads/2022/05/librosdetexto.jpeg")' }}>
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="card bg-base-100 w-full max-w-lg shrink-0 shadow-2xl">
          <form onSubmit={handleSignupSubmit} className="card-body">
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
                  <option value="admin">Administrator</option>
                  <option value="profesor">Teacher</option>
                  <option value="estudiante">Student</option>
                </select>
              </div>
            </div>

            <div className="form-control mt-6">
              <button className="btn btn-primary">Add user</button>
            </div>
          </form>
          {errorMessage && <p className="error-message">{errorMessage}</p>}

        </div>
      </div>
    </div>
  );
}