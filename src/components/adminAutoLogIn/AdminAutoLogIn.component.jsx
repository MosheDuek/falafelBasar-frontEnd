import axios from "axios";
import { Fragment, useEffect } from "react";
import useAfterLogin from "../../hooks/useAfterLogin";

const AdminAutoLogIn = ()=>{
    const afterLogin = useAfterLogin()
    useEffect(() => {
      axios
        .post("/admin/login-by-token")
        .then(({ data }) => {
          afterLogin(data.token);
        })
        .catch(() => {
          localStorage.removeItem("admin-token");
        });
    }, []);

    return(<Fragment></Fragment>)
}

export default AdminAutoLogIn