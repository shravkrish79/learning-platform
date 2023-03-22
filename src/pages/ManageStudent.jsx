// import { useProfile } from "../state/useProfile";
import { useLocation } from "react-router-dom";

export default function ManageStudent() {
    // const { profileData } = useProfile();
    const Location = useLocation();
    const profiles = Location.state.profileData;

    async function deleteStudent(uid){
        // const result = await disableAccount(uid);
        // alert(result.message);
        console.log(uid);
    }
    const studentData = profiles.filter((recs)=> recs.isTeacher !== true );
    const students = studentData.map((recs)=> <li key={recs.uid}>{recs.firstName} {recs.lastName} 
    <button key={recs.uid} onClick={()=>deleteStudent(recs.uid)}>Delete Student</button> </li>)
    // console.log(studentData);
    
    return (
        <div id="managestudent">
            <h1> Student List</h1>
            <ul>{students}</ul>
        </div>
    )
}