import "./navbar.css";
import { Fragment } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import GoogleLogIn from "../googleLogIn/GoogleLogIn.component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

const NavBar = () => {
  const location = useLocation();
  const loggedIn = useSelector((state) => state.customer.loggedIn);
  const adminLoggedIn = useSelector((state) => state.auth.loggedIn);
  useEffect(() => {
    if (
      window.innerWidth < 990 &&
      document.getElementById("navbarNav") &&
      document.getElementById("navbarNav").className.includes("show")
    ) {
      document.getElementById("navbar-button").click();
    }
  }, [location]);

  return (
    <Fragment>
      {!location.pathname.includes("admin") && (
        <nav className="navbar navbar-expand-lg navbar-dark fixed-top">
          <div className="container-fluid custom-nav-container">
            <Link className="navbar-brand" to="/">
              <h1 className="m-0">פלאפל בשר</h1>
            </Link>
            <button
              className="navbar-toggler py-2"
              id="navbar-button"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon nav-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <NavLink className="nav-link" to={encodeURI("/בית")}>
                    בית
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to={encodeURI("/מה-הקונספט")}>
                    מה הקונספט
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to={encodeURI("/תפריט")}>
                    תפריט
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to={encodeURI("/צור-קשר")}>
                    צור קשר
                  </NavLink>
                </li>
                {loggedIn ? (
                  <li className="nav-item">
                    <NavLink className="nav-link" to={encodeURI("/מועדפים")}>
                      מועדפים
                    </NavLink>
                  </li>
                ) : (
                  <li className="nav-item">
                    <GoogleLogIn />
                  </li>
                )}
                {adminLoggedIn && (
                  <li className="nav-item">
                    <NavLink className="nav-link" to={"/admin"}>
                      <FontAwesomeIcon icon={faUser} /> מנהל
                    </NavLink>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </nav>
      )}
    </Fragment>
  );
};

export default NavBar;
