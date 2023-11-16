"use client"
import {useCallback,useState} from "react"
import Login from "./login";
import Signup from "./signup";

export type AuthType =  "login" | "signup";
const Auth =  () => {


    const [auth,setAuth] = useState<boolean>(true);

    const handleAuth = useCallback((id:AuthType) => {

        if(id==="login"){
            setAuth(true);
        }else{
            setAuth(false);
        }

    },[])

    const content = auth ? <Login handleAuth={handleAuth} /> : <Signup handleAuth={handleAuth} />
    return (
        content
    )
}
export default Auth;