import React from "react";
import Context from './userContext'
import useStorage from "../../utils/useStorage";

const UserProvider = ({ children }) => {
    const [token, setToken] = useStorage('token')

    return(
        <Context.Provider value={{ token, setToken }}>
            {children}
        </Context.Provider>
    )
}


export default UserProvider;