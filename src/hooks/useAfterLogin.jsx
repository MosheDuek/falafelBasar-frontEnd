import { useDispatch } from "react-redux";
import { authActions } from "../store/admin";
import jwt_decode from "jwt-decode";
import {  useLocation, useNavigate } from "react-router-dom";

const useAfterLogin = (token) => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const location = useLocation()
  return (token) => {
    localStorage.setItem("admin-token", token);
    dispatch(authActions.login());
    dispatch(authActions.updateUserData(jwt_decode(token)));
    if(location === "/admin"){
    navigate("/admin/dashboard/products");
    }
  };
};

export default useAfterLogin;
