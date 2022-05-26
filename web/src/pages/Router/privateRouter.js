import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import UserContext from "../../api/userContext-api/userContext";

function PrivateRouter({ component: Component, ...rest}){
    const { token } = useContext(UserContext)

    return(
        <Route {...rest} 
            render={ () => token
                ? <Component {...rest}/>
                : <Redirect to="/" />
            }
        />
    )
}


export default PrivateRouter