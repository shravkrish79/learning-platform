// Node modules
import { createContext, useContext, useState, } from "react";


// Properties
const ProfileContext = createContext();


export function ProfileProvider({ children }) {
    // Local state
    const [profileData, setProfileData] = useState([]);
    // Properties
    const value = { profileData, setProfileData };

    return <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>;
}


export function useProfile() {
    // Properties
    const context = useContext(ProfileContext);
    // Safeguard
    if (!context) throw new Error("useProfile() must be used within <ProfileProvider>");

    return context;
}