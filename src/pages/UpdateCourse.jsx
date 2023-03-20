import FormFieldGenerator from "../components/form/FormFieldGenerator";
import courseFields from "../data/course-fields.json";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { courseManipulation } from "../scripts/courseManipulation";
import { useCourse } from "../state/useCourse";

export default function UpdateCourse() {
    const [form, setForm] = useState({ courseName: "", courseDesc: "", courseImage: null, docFiles: null, videoFiles: null });
    const location = useLocation();
    const data = location.state.data;
    const { courseData, setCourseData } = useCourse();
    const Navigate = useNavigate();
    useEffect(() => {
        setForm({
            courseName: data.courseName, courseDesc: data.courseDesc,
            courseImage: null, docFiles: null, videoFiles: null
        })
    }, [data]);
    async function onSubmit(event) {
        event.preventDefault();
        document.getElementById("updateCourse-btn").disabled = true;
        const result = await courseManipulation({ form }, data, courseData);
        setCourseData(result);
        document.getElementById("updateCourse-btn").disabled = false;
        Navigate("/contentpage");
    }
    return (
        <div id="updatecourse">
            <h1>Welcome to update course form.</h1>
            <form className="updatecourse-form" id="updateCourseForm" onSubmit={(event) => onSubmit(event)}>
                <FormFieldGenerator data={courseFields} state={[form, setForm]} />
                <button className="course-update-btn" id="updateCourse-btn" >submit</button>
            </form>
        </div>
    )
}