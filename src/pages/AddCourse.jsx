import courseFields from "../data/course-fields.json";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCourse } from "../state/useCourse";
import FormFieldGenerator from "../components/form/FormFieldGenerator";
import {courseManipulation} from "../scripts/courseManipulation";

export default function AddCourse() {
    const [form, setForm] = useState({ courseName: "", courseDesc: "", courseImage: null, docFiles: null, videoFiles: null });
    const {courseData, setCourseData} = useCourse();
    const Navigate = useNavigate();
    async function onSubmit(event){
        event.preventDefault();
        document.getElementById("addCourse-submit").disabled=true;
        const result = await courseManipulation({form},null,courseData);
        setCourseData(result);
        document.getElementById("addCourse-submit").disabled=false;
        Navigate("/contentpage");
    }
    return (
        <div id="addcourse">
            <h1>Welcome to add course form.</h1>
            <form className="addcourse-form" id="addCourseForm" onSubmit={(event) => onSubmit(event)}>
                <FormFieldGenerator data={courseFields} state={[form, setForm]} />
                <button className="course-submit-btn" id="addCourse-submit" >submit</button>
            </form>
        </div>
    );
}