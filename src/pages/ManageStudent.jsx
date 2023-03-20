import { useProfile } from "../state/useProfile";
import { disableAccount } from "../scripts/auth";

export default function ManageStudent() {
    const { profileData } = useProfile();
    async function deleteStudent(uid){
        const result = await disableAccount(uid);
        // alert(result.message);
        console.log(result);
    }
    const studentData = profileData.filter((recs)=> recs.isTeacher !== true );
    const students = studentData.map((recs)=> <li key={recs.uid}>{recs.firstName} {recs.lastName} 
    <button key={recs.uid} onClick={()=>deleteStudent(recs.uid)}>Delete Student</button> </li>)

    
    return (
        <div id="managestudent">
            <h1> student list</h1>
            <ul>{students}</ul>
        </div>
    )
}