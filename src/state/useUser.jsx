// Node modules
import { createContext, useContext, useState, } from "react";

// Properties
const Context = createContext();

export function UserProvider({ children, storageKey }) {
    // Local state
    const [uid, setUid] = useState(loadUID(storageKey));
    const [isTeacher, setIsTeacher] = useState(false);
    // Properties
    const value = { uid, setUid, saveUID, isTeacher, setIsTeacher };

    // Pure
    function loadUID(storageKey) {
        const data = localStorage.getItem(storageKey);
        return data;
    }

    // Impure
    function saveUID(uid) {
        localStorage.setItem(storageKey, uid);
    }

    return <Context.Provider value={value}>{children}</Context.Provider>;
}

export function useUser() {
    // Properties
    const context = useContext(Context);

    // Safeguard
    if (!context) throw new Error("useUser() must be used within <UserProvider>");

    return context;
}
