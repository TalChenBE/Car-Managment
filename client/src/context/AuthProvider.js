import { createContext, useState } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({});
    const [persist, setPersist] = useState(JSON.parse(localStorage.getItem("persist")) || false)
    const [session, setSession] = useState(JSON.parse(window.sessionStorage.getItem("session")) || false)
    return (
        <AuthContext.Provider value={{ auth, setAuth, persist, setPersist, session, setSession }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;