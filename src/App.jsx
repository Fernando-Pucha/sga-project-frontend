import "./App.css";
import { Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage/HomePage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import SignupPage from "./pages/SignupPage/SignupPage";
import LoginPage from "./pages/LoginPage/LoginPage";

import Navbar from "./components/Navbar/Navbar";
import IsPrivate from "./components/IsPrivate/IsPrivate";
import IsAnon from "./components/IsAnon/IsAnon";
import EditProfilePage from "./pages/ProfilePage/EditProfilePage";
import CoursePage from "./pages/CoursePage/CoursePage";
import UserPage from "./pages/UserPage/UserPage";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/signup" element={<IsAnon><SignupPage /></IsAnon>} />
        <Route path="/login" element={<IsAnon><LoginPage /></IsAnon>} />
        <Route path="/" element={<LoginPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/profile" element={<IsPrivate><ProfilePage /></IsPrivate>} />
        <Route path="/profile/edit" element={<IsPrivate><EditProfilePage /></IsPrivate>} />
        <Route path="/courses" element={<IsPrivate><CoursePage /></IsPrivate>} />
        <Route path="/users" element={<IsPrivate><UserPage /></IsPrivate>} />
      </Routes>
    </div>
  );
}

export default App;
