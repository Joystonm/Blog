import { Link } from "react-router-dom";
import "../style/Navbar.css";
import { useAuth } from "./AuthContext";

function Navbar() {
  const { authState, logout } = useAuth();
  
  return (
    <nav className="navbar">
      <div className="navbar-logo">BlogVerse</div>
      <ul className="navbar-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/contact">Contact</Link></li>
        <li><Link to="/articles">Article</Link></li>
        <li><Link to="/post">Post</Link></li>
        
        {authState.isAuthenticated ? (
          <>
            <li><span>Welcome, {authState.user?.username}</span></li>
            <li>
              <button onClick={logout} className="logout-btn">
                Logout
              </button>
            </li>
          </>
        ) : (
          <>
            {/* <li><Link to="/login">Login</Link></li> */}
            <li><Link to="/signup">Sign Up</Link></li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;