import { Link } from "react-router-dom";
import { deleteDocument } from "../scripts/fireStore";
import { useUser } from "../state/useUser";
import { useCourse } from "../state/useCourse";
import { deleteFile } from "../scripts/cloudStorage";

export default function CourseItem({ data }) {
    const { isTeacher } = useUser();
    const { courseData, setCourseData } = useCourse();
    const { courseName, courseDesc, courseImage } = data;
    async function deleteCourse(id) {
        await deleteFile(data.courseImage);
        for (let i = 0; i < data.docFiles.length; i++) { await deleteFile(data.docFiles[i]); }
        for (let i = 0; i < data.videoFiles.length; i++) { await deleteFile(data.videoFiles[i]); }
        await deleteDocument('course', id);
        let clonedData = courseData.filter((item) => item.id !== id);
        setCourseData(clonedData);
    }
    return (
        <div className="course-card">
            <a href=".">
                <h1>{courseName}</h1>
                <p>{courseDesc}</p>
                <img src={courseImage} alt={courseName} />
                {isTeacher && <Link to="/updatecourse" state={{ data }}>Update</Link>}
                {isTeacher && <Link className="deleteCourse-btn"
                    onClick={() => deleteCourse(data.id)} >Delete</Link>
                }
            </a>
        </div>
    );
}