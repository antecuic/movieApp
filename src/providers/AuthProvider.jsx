import React, {createContext, useState, useEffect } from "react";
import { auth } from '../firebase/firebase';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {

    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        auth.onAuthStateChanged(user => {
            if(user) {
                setCurrentUser(user);
            } 
        });
    }, [])

    return (
        <AuthContext.Provider value={currentUser}>
            {children}
        </AuthContext.Provider>
    );
}
export default AuthProvider;