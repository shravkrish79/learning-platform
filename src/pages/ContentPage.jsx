import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useUser } from "../state/useUser";
import { useStatus } from "../state/useStatus";
import { readDocuments } from "../scripts/fireStore";
import CourseItem from "../components/CourseItem";
import { AiOutlineFileAdd } from "react-icons/ai";


export default function ContentPage() {
    const Navigate = useNavigate();
    const { saveUID, setUid, isTeacher, setIsTeacher, saveTeacher } = useUser();
    const [courseData, setCourseData] = useState([]);
    const { status, setStatus } = useStatus();
    
    const location = useLocation();
    const profileData = location.state.profileData;
    
    useEffect(() => {
        const loadData = async (collectionName) => {
            const data = await readDocuments(collectionName).catch(onFail);
            onSuccess(data);
        }
        setStatus(0);
        if (localStorage.getItem('user-id') === "") { Navigate("/") }
        loadData('course');

        function onSuccess(data) {
            setCourseData(data);
            setStatus(1);
        }

        function onFail() {
            console.error();
            setStatus(2);
        }
    }, [setCourseData, setStatus, Navigate,setIsTeacher]);

    async function checkLogout(path) {
        let nextpath = path;
        if (localStorage.getItem('user-id') === "") {nextpath = "/"}
       await Navigate(nextpath, { state: { profileData, courseData } });
    }

    
    function onLogout() {
        saveUID("");
        setUid("");
        saveTeacher(false);
        setIsTeacher(false);
        Navigate("/");
    }

    const CourseItems = (status === 1) && courseData.map((recs) => (<CourseItem key={recs.id} data={recs} state={[courseData,setCourseData]} profileData={profileData} />));
    // console.log(profileData);
    console.log(isTeacher);
    return (
        <div id="contentpage">
            {status === 0 && <p>Loading... </p>}
            {status === 1 && <div className="contentpage">
                <h1> welcome to content page</h1>
                <div className="course-data">{
                    (courseData.length > 0) ? CourseItems : <h1>No Course available.</h1>
                }</div>
                <div className="btns"> 
                    {(isTeacher) && <button className="addCourse-btn" onClick={() => checkLogout("/addcourse")}>
                        <AiOutlineFileAdd className="react-icon" /> <span>Add Course</span></button>}
                    {(isTeacher) && <button className="manageStudent-btn" onClick={() => checkLogout("/managestudent")}>Manage Student</button>}
                    <button className="logout-btn" onClick={() => onLogout()} >Logout</button>
                </div>
            </div>
            }
            {status === 2 && <p>Error</p>}
        </div>
    );
}