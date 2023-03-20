// Node modules
import { createContext, useContext, useState, } from "react";

// Properties
const CourseContext = createContext();


export function CourseProvider({ children }) {
    // Local state
    const [courseData, setCourseData] = useState([]);
    // Properties
    const value = { courseData, setCourseData };

    return <CourseContext.Provider value={value}>{children}</CourseContext.Provider>;
}


export function useCourse() {
    // Properties
    const context = useContext(CourseContext);
    // Safeguard
    if (!context) throw new Error("useCourse() must be used within <CourseProvider>");

    return context;
}