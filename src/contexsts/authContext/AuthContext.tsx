import React, {createContext, useContext, useEffect} from "react";
import {AuthContextType} from "./types";

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{children: React.ReactNode}> = ({children}) => {
    const [isLoggedIn, setLoggedIn] = React.useState<boolean>(false);

    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken')
        if (accessToken === null) {
            setLoggedIn(false)
        } else if (accessToken) {
            setLoggedIn(true)
        }
    }, [isLoggedIn])
    return (
        <AuthContext.Provider value={{isLoggedIn, setLoggedIn}}>
            {children}
        </AuthContext.Provider>
    );
}
