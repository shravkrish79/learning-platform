import { Link, useNavigate } from "react-router-dom";
import { deleteDocument } from "../scripts/fireStore";
import { useUser } from "../state/useUser";
import { deleteFile } from "../scripts/cloudStorage";
import { RiDeleteBinLine, RiFileEditLine } from "react-icons/ri";


export default function CourseItem({ data, profileData, state }) {
    const { isTeacher } = useUser();
    // console.log(isTeacher)
    const [courseData, setCourseData] = state;
    const { courseName, courseDesc, courseImage } = data;
    const Navigate = useNavigate();
    // console.log(courseData);
    // console.log(data);
    async function deleteCourse(id) {
        // console.log(profileData)
        if (localStorage.getItem('user-id') === "") { Navigate("/", { state: { profileData } }) }
        else {
            if (data.courseImage !== null) { await deleteFile(data.courseImage); }
            if (data.docFiles !== null) { for (let i = 0; i < data.docFiles.length; i++) { await deleteFile(data.docFiles[i]); } }
            if (data.videoFiles !== null) { for (let i = 0; i < data.videoFiles.length; i++) { await deleteFile(data.videoFiles[i]); } }
            await deleteDocument('course', id);
            // console.log(id);
            
            const newDataSet = courseData.filter((recs)=> recs.id !== id);
            setCourseData(newDataSet);
            Navigate("/contentpage", { state: { profileData } });
        }
    }

    return (
        <div className="course-card">
            <h1>{courseName}</h1>
            <img src={courseImage} alt={courseName} />
            <p>{courseDesc}</p>
            {(isTeacher!==false) && <Link className="updateCourse-btn" to="/updatecourse" state={{ data, courseData, profileData }}>
                <RiFileEditLine className="reacticons" /></Link>}
            {
                (isTeacher!==false) && <button className="deleteCourse-btn" onClick={() => deleteCourse(data.id)} >
                    <RiDeleteBinLine className="reacticons" /></button>}
            <Link to="/coursedetail" state={{ profileData, data }} className="card-click" />
        </div>
    );
}