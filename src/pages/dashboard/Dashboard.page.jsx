import "./dashboard.css";
import { Fragment } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import AdminProducts from "../../components/adminProducts/AdminProducts.component";
import AdminLeads from "../../components/adminLeads/AdminLeads.component";
import AdminMessages from "../../components/adminMessages/AdminMessages.component";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/admin";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import UpdateAdminDetails from "../../components/updateAdmindetails/UpdateAdminDetails.component";
const DashboardNavBar = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [amount, setAmount] = useState(null);

  const handleLogOut = () => {
    localStorage.removeItem("admin-token");
    dispatch(authActions.logout());
    navigate("/בית");
  };
  useEffect(() => {
    axios
      .get("/messages/unread-amount")
      .then(({ data }) => {
        setAmount(data.amount);
      })
      .catch(() => {});
  }, []);
  const messageRead = () => {
    let num = amount;
    if (num !== 0) {
      setAmount(num - 1);
    }
  };
  return (
    <Fragment>
      <div className="pt-4">
        <ul className="nav nav-tabs">
          <li className="nav-item">
            <NavLink className="nav-link" to="/admin/dashboard/products">
              מוצרים
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/admin/dashboard/leads">
              לידים
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/admin/dashboard/messages">
              הודעות{" "}
              {amount && (
                <span className="bg-secondary p-1 rounded me-1 text-light">
                  {amount}
                </span>
              )}
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/admin/dashboard/private-details">
              פרטים אישיים
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/">
              עמוד הבית
            </NavLink>
          </li>
          <button
            onClick={handleLogOut}
            className="btn btn-outline-danger me-auto ms-1 mb-1"
          >
            <FontAwesomeIcon icon={faArrowRightFromBracket} /> התנתק
          </button>
        </ul>
      </div>
      <div className="py-4">
        {location.pathname.includes("products") && <AdminProducts />}
        {location.pathname.includes("leads") && <AdminLeads />}
        {location.pathname.includes("messages") && (
          <AdminMessages onMessageRead={messageRead} />
        )}
        {location.pathname.includes("private-details") && (
          <UpdateAdminDetails />
        )}
        {location.pathname === "/admin/dashboard" && (
          <div className="container">
            <h1 className="text-center">ברוך הבא לדף ניהול האתר</h1>
            <p>מכאן תוכל לנהל את המתרחש באתר</p>
            <ul>
              <li>עדכון הוספה ומחיקת מוצרים</li>
              <li>צפיה ומחיקה של הלידים שלך</li>
              <li>צפייה בהודעות שהלקוחות השאירו לך ומענה למייל</li>
            </ul>
          </div>
        )}
      </div>
    </Fragment>
  );
};
export default DashboardNavBar;
