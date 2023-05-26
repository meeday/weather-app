import { Link } from "react-router-dom";

const Navbar = ({ handleLogout }) => {
  return (
    <header className="navbar">
      <Link to="/home" className="navbar-title">
        <span className="logo">Weather App</span>
      </Link>
      <button className="navbar__item btn btn-primary" onClick={handleLogout}>
        Logout
      </button>
    </header>
  );
};

export default Navbar;
