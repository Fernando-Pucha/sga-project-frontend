import "./Navbar.css";
import { Link, useLocation } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";

function Navbar() {

  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);

  const location = useLocation();
  const navTag =
    location.pathname === "/" ? "Home" :
      location.pathname === "/users" ? "Users" :
        location.pathname === "/profile" ? "Profile" :
          location.pathname === "/coursesenrolled" ? "Courses Enrolled" :
            location.pathname === "/courses" ? "Courses" : "";

  return (
    <nav>
      <div className="navbar bg-base-100 shadow-sm fixed top-0 left-0 right-0 z-50">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box mt-3 w-52 p-2 shadow z-50 absolute">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/courses">Courses</Link></li>
              <li><Link to="/coursesenrolled">Courses enrolled</Link></li>
              {user?.role === "admin" ? (
                <li><Link to="/users">Users</Link></li>
              ) : null}
            </ul>
          </div>
        </div>
        <div className="navbar-center">
          <Link to="/" className="btn btn-ghost text-xl">SGA <p>{navTag}</p> </Link>
        </div>
        <div className="navbar-end">
          <span>{user && user.name}</span>
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  src="https://img.daisyui.com/images/profile/demo/2@94.webp" />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box mt-3 w-52 p-2 shadow z-50 absolute">
              <li><Link to="/profile" >Profile</Link></li>
              <li><Link to="/profile/edit" >Settings</Link></li>
              {isLoggedIn && <li><button onClick={logOutUser}>Logout</button></li>}
              {!isLoggedIn && <li><Link to="/login" >Login</Link></li>}
              
            </ul>
          </div>
        </div>
      </div>
    </nav>

  );
}

export default Navbar;
