import "./googleLogin.css"
import axios from "axios";
import { Fragment, useEffect } from "react";
import { useDispatch } from "react-redux";
import { customerActions } from "../../store/customer";

const GoogleLogIn = () => {

  const dispatch = useDispatch()

  const handleCalbackResponse = (response) => {
    axios
    .post("/lead/google-lead", { token: response.credential })
    .then(({ data }) => {
      localStorage.setItem("google-token", data.token);
      dispatch(customerActions.login())
      getData()
    })
    .catch((e) => {
      localStorage.removeItem("google-token")
      googleAuth()
    });
  };
  useEffect(() => {
    axios.post("/lead/login-by-token",{token:localStorage.getItem("google-token")})
    .then(({data})=>{
      localStorage.setItem("google-token",data.token)
      dispatch(customerActions.login());
      getData()
    })
    .catch(()=>{
      googleAuth()
    })
  }, []);

  const googleAuth = ()=>{
     const google = window.google;
     if(google.accounts){

     google.accounts.id.initialize({
       client_id: process.env.REACT_APP_CLIENT_ID,
       callback: handleCalbackResponse,
     });
     google.accounts.id.prompt((notification) => {
       if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
          google.accounts.id.renderButton(
            document.getElementById("buttonDiv"),
            { theme: "outline", size: "large" }
          );
       }
     });
    }
  }


  const getData = ()=>{
    axios.get("/favorites/id")
    .then(
      ({data})=>{
        dispatch(customerActions.updateCustomerData(data))
      }
      )
    .catch(()=>{
      dispatch(customerActions.logout())
      dispatch(customerActions.updateCustomerData({}))
    })
  }

  return (
    <Fragment>
          <div id="buttonDiv"></div>
    </Fragment>
  );
};

export default GoogleLogIn;
