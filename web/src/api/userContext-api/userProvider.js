import React from "react";
import Context from './userContext'
import useStorage from "../../utils/useStorage";

const UserProvider = ({ children }) => {
    const [token, setToken] = useStorage('token')
    const [tipo, setTipo] = useStorage('tipo')

    return(
        <Context.Provider value={{ token, setToken, tipo, setTipo}}>
            {children}
        </Context.Provider>
    )
}


export default UserProvider;