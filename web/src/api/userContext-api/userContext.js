import { createContext } from "react";

const UserContext = createContext({
    token: null,
    setToken: () => {}
})

export default UserContext
