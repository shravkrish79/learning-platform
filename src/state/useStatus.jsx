// Node modules
import { createContext, useContext, useState, } from "react";


// Properties
const StatusContext = createContext();


export function StatusProvider({ children }) {
    // Local state
    const [status, setStatus] = useState(0);
    // Properties
    const value = { status, setStatus };

    return <StatusContext.Provider value={value}>{children}</StatusContext.Provider>;
}


export function useStatus() {
    // Properties
    const context = useContext(StatusContext);
    // Safeguard
    if (!context) throw new Error("useStatus() must be used within <StatusProvider>");

    return context;
}