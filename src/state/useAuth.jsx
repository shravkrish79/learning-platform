import React, { useEffect, useState } from "react";
import { auth } from "../scripts/firebaseSetup";


export const AuthContext = React.createContext();

export default function AuthProvider({ children }) {

    const [loading, setLoading] = useState(true);
    const [currentUser, setCurrentUser] = useState(null);
    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            setCurrentUser(user);
            setLoading(false);
        });
    }, []);
    if (loading) {
        return <p>Loading...</p>;
    }
    return (
        <AuthContext.Provider value={{ currentUser }}>
            {children}
        </AuthContext.Provider>
    );
};


export function useAuth() {
    // Properties
    const context = React.useContext(AuthContext);
    // Safeguard
    if (!context) throw new Error("useAuth() must be used within <AuthContext>");

    return context;
}