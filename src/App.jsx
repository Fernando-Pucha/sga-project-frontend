import "./App.css";
import { Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage/HomePage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import SignupPage from "./pages/SignupPage/SignupPage";
import LoginPage from "./pages/LoginPage/LoginPage";

import Navbar from "./components/Navbar/Navbar";
import IsPrivate from "./components/IsPrivate/IsPrivate";
import IsAnon from "./components/IsAnon/IsAnon";

import CoursePage from "./pages/CoursePage/CoursePage";
import UserPage from "./pages/UserPage/UserPage";
import UserDetails from "./components/UserDetails/UserDetails";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import EditProfile from "./components/EditProfile/EditProfile";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/signup" element={<IsAnon><SignupPage /></IsAnon>} />
        <Route path="/login" element={<IsAnon><LoginPage /></IsAnon>} />
        <Route path="/" element={<IsPrivate><HomePage /> </IsPrivate>} />
        <Route path="/profile" element={<IsPrivate><ProfilePage /></IsPrivate>} />
        <Route path="/profile/edit" element={<IsPrivate><EditProfile /></IsPrivate>} />
        <Route path="/courses" element={<IsPrivate><CoursePage /></IsPrivate>} />
        <Route path="/users" element={<IsPrivate><UserPage /></IsPrivate>} />
        <Route path="/userdetail/:userId" element={<IsPrivate><UserDetails/></IsPrivate>} />
        <Route path="*" element={<NotFoundPage/>} />
      </Routes>
    </div>
  );
}

export default App;
