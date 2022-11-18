import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom";

const AuthGuard = ({children})=>{
    const loggedIn = useSelector((state) => state.auth.loggedIn);
    const userData = useSelector((state)=>state.auth.userData)
    if(!loggedIn || !userData.izAdmin){
        return <Navigate to={"/404"}/>
    }
    else{
    return children
    }

}

export default AuthGuard