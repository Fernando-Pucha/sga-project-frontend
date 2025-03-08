import { useEffect, useState } from "react";
import authService from "../../services/auth.service";
import { useNavigate } from "react-router";

export default function EditProfile() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const handleEmail = (e) => setEmail(e.target.value);
  const handleName = (e) => setName(e.target.value);
  const handleRole = (e) => setRole(e.target.value);

  useEffect(() => {
    authService
      .profile()
      .then((response) => {
        const oneUser = response.data;
        setEmail(oneUser.email);
        setName(oneUser.name);
        setRole(oneUser.role);
      })
      .catch(err => console.log(err.message));
  }, []);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const requestBody = { email, name, role };
    authService
      .profileUpdate(requestBody)
      .then(() => { navigate(`/profile`) })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  };

  return (
    <>
      <form className="formAddProduct" onSubmit={handleFormSubmit}>
        <div className="hero bg-base-200 min-h-[91vh]">
          <div className="hero-content flex-col lg:flex-row gap-44">
            <img
              src="https://img.freepik.com/free-photo/man-with-photo-camera-his-holidays_23-2149373965.jpg?semt=ais_hybrid"
              alt=""
              className="max-w-sm rounded-lg shadow-2xl" />

            <div className="text-left">
              <h1 className="text-5xl mb-4">Edit Profile</h1>

              <h2 className="text-2xl font-bold mb-2">Name</h2>
              <input type="text" name="name" value={name} onChange={handleName} className="input input-bordered" required />

              <h2 className="text-2xl font-bold mb-2">Email</h2>
              <input type="email" name="email" value={email} onChange={handleEmail} className="input input-bordered" required />

              <h2 className="text-2xl font-bold mb-2">Role</h2>
              <select name="role" value={role} onChange={handleRole} className="select select-bordered w-full max-w-xs" required >
                <option value="" disabled>Role</option>
                <option value="profesor">Teacher</option>
                <option value="estudiante">Student</option>
              </select>
              <button type="submit" className="btn btn-primary w-32 mt-7">Update</button>
            </div>
            
          </div>
         
        </div>
     
      </form>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </>

  );
}
