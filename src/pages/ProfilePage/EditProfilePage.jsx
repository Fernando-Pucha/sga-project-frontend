import { useEffect, useState } from "react";
import authService from "../../services/auth.service";
import "./ProfilePage.css";


function EditProfilePage() {
  

  const [user, setUser] = useState([]);

  useEffect(() => {
    authService
      .profile()
      .then(res => setUser(res.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div className="hero bg-base-200 min-h-[91vh]">
      <div className="hero-content flex-col lg:flex-row gap-44">
        <img
          src="https://img.freepik.com/free-photo/man-with-photo-camera-his-holidays_23-2149373965.jpg?semt=ais_hybrid"
          alt=""
          className="max-w-sm rounded-lg shadow-2xl" />

        <div className="text-left">
          <h1 className="text-5xl mb-4">Details</h1>

          <h2 className="text-2xl font-bold mb-2">Name</h2>
          <p className="mb-4">{user.name}</p>

          <h2 className="text-2xl font-bold mb-2">Email</h2>
          <p className="mb-4">{user.email}</p>

          <h2 className="text-2xl font-bold mb-2">Role</h2>
          <p className="mb-6">{user.role}</p>

          <button className="btn btn-primary w-32">Edit</button>
        </div>
      </div>
    </div>

  );
}

export default EditProfilePage;
