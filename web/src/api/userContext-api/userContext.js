import { createContext } from "react";

const UserContext = createContext({
    token: null,
    setToken: () => {},
    tipo: null,
    setTipo: () => {}
})

export default UserContext
