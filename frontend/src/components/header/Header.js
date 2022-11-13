import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AlertContext } from "../../context/AlertContext";

function Header() {
  const { showAlert } = useContext(AlertContext);

  const handleLogout = () => {
    localStorage.removeItem("token");
    showAlert("GoodBye :(", "success");
  };
  return (
    <header>
      {!localStorage.getItem("token") ? (
        <Link className="navbar-brand" to="/login">
          Client MS
        </Link>
      ) : (
        <Link className="navbar-brand" to="/">
          Client MS
        </Link>
      )}

      {!localStorage.getItem("token") ? (
        <ul>
          <li className="NavList">
            <Link className="btn NavButton" to="/login" role="button">
              Login
            </Link>
          </li>
          <li className="NavList">
            <Link className="btn NavButton" to="/register" role="button">
              Register
            </Link>
          </li>
        </ul>
      ) : (
        <ul>
          <li className="NavList">
            <Link
              className="btn NavButton"
              to="/login"
              role="button"
              onClick={handleLogout}
            >
              Logout
            </Link>
          </li>
        </ul>
      )}
    </header>
  );
}

export default Header;
