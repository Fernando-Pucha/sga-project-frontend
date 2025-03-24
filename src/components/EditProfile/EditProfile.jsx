import { useEffect, useState } from "react";
import authService from "../../services/auth.service";
import { useNavigate } from "react-router";
import uploadImage from "../../services/file-upload.service.js"

export default function EditProfile() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const handleEmail = (e) => setEmail(e.target.value);
  const handleName = (e) => setName(e.target.value);
  const handleRole = (e) => setRole(e.target.value);

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) {
      console.error("No file selected.");
      return;
    }
    const uploadData = new FormData();
    uploadData.append("imageUrl", e.target.files[0]);

    try {
      const response = await uploadImage(uploadData);
      console.log("Image uploaded successfully:", response);
      setImageUrl(response.fileUrl);
    } catch (err) {
      console.error("Error while uploading the file:", err);
    }
  };


  useEffect(() => {
    authService
      .userProfile()
      .then((response) => {
        const oneUser = response.data;
        setEmail(oneUser.email);
        setName(oneUser.name);
        setRole(oneUser.role);
        setImageUrl(oneUser.imageUrl)
      })
      .catch(err => console.log(err.message));
  }, []);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!imageUrl) {
      alert("Espera a que la imagen se suba antes de enviar el formulario.");
      return;
    }
    const requestBody = { email, name, role, imageUrl};
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
        <div className="hero bg-base-200 min-h-[90vh] mt-14">
          <div className="hero-content flex-col lg:flex-row gap-44">
            <div>
              <img
                src={imageUrl}
                alt=""
                className="max-w-sm rounded-lg shadow-2xl" />
              <input type="file" name="imageUrl" onChange={handleFileUpload} className="input input-bordered" />
            </div>

            <div className="text-left">
              <h1 className="text-5xl mb-4">Edit Profile</h1>

              <h2 className="text-2xl font-bold mb-2">Name</h2>
              <input type="text" name="name" value={name} onChange={handleName} className="input input-bordered" required />

              <h2 className="text-2xl font-bold mb-2">Email</h2>
              <input type="email" name="email" value={email} onChange={handleEmail} className="input input-bordered" required readOnly/>

              <h2 className="text-2xl font-bold mb-2">Role</h2>
              <select name="role" value={role} onChange={handleRole} className="select select-bordered w-full max-w-xs" required >
                <option value="" disabled>Role</option>
                <option value="profesor">Teacher</option>
                <option value="estudiante">Student</option>
              </select>
              <div className="flex gap-4 items-center justify-center mt-7">
                <button type="submit" className="btn btn-primary w-32">Update</button>
                <button className="btn btn-neutral" onClick={() => navigate("/profile")} >Back</button>
              </div>

            </div>

          </div>

        </div>

      </form>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </>

  );
}
