import { Link,useNavigate } from "react-router-dom";
import { deleteDocument } from "../scripts/fireStore";
import { useUser } from "../state/useUser";
import { deleteFile } from "../scripts/cloudStorage";
import { RiDeleteBinLine, RiFileEditLine } from "react-icons/ri";
import { useState } from "react";

export default function CourseItem({ data,courseData,profileData }) {
    const { isTeacher } = useUser();
    const [ newcourseData, setNewCourseData ] = useState();
    const { courseName, courseDesc, courseImage } = data;
    const Navigate = useNavigate();
    // console.log(data);
    async function deleteCourse(id) {
        if (data.courseImage !== null) { await deleteFile(data.courseImage); }
        if (data.docFiles !== null) { for (let i = 0; i < data.docFiles.length; i++) { await deleteFile(data.docFiles[i]); } }
        if (data.videoFiles !== null) { for (let i = 0; i < data.videoFiles.length; i++) { await deleteFile(data.videoFiles[i]); } }
        await deleteDocument('course', id);
        let clonedData = courseData.filter((item) => item.id !== id);
        setNewCourseData(clonedData);
        Navigate("/contentpage",{state:{newcourseData,profileData}});
    }

    return (
        <div className="course-card">
            <h1>{courseName}</h1>
            <img src={courseImage} alt={courseName} />
            <p>{courseDesc}</p>
            {isTeacher && <Link className="updateCourse-btn" to="/updatecourse" state={{ data,courseData,profileData }}>
                <RiFileEditLine className="reacticons" /></Link>}
            {
                isTeacher && <Link className="deleteCourse-btn" onClick={() => deleteCourse(data.id)} >
                    <RiDeleteBinLine className="reacticons" /></Link>}
            <Link to="" className="card-click" />
        </div>
    );
}