import courseFields from "../data/course-fields.json";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import FormFieldGenerator from "../components/form/FormFieldGenerator";
import { courseManipulation } from "../scripts/courseManipulation";

export default function AddCourse() {
    const [form, setForm] = useState({ courseName: "", courseDesc: "", courseImage: null, docFiles: null, videoFiles: null });
    // const { courseData, setCourseData } = useCourse();
    const Location = useLocation();
    const courseData = Location.state.courseData;
    const profileData = Location.state.profileData;
    const Navigate = useNavigate();
    // console.log(courseData);
    
    async function onSubmit(event) {
        event.preventDefault();
        document.getElementById("addCourse-submit").disabled = true;
        // const result = 
        await courseManipulation({ form }, null, courseData);
        // setCourseData(result);
        document.getElementById("addCourse-submit").disabled = false;
        Navigate("/contentpage",{state:{profileData}});
    }
    function cancelform(){
        Navigate("/contentpage",{state:{profileData}});
    }
    return (
        <div id="addcourse">
            <div className="addcourse-page">
                <h1>Newbie</h1>
                <span>Add Course</span>
                <form className="addcourse-form" id="addCourseForm" onSubmit={(event) => onSubmit(event)}>
                    <FormFieldGenerator data={courseFields} state={[form, setForm]} />
                    <button className="course-submit-btn" id="addCourse-submit" >Submit</button>
                    <button className="course-cancel-btn" id="addCourse-cancel" onClick={()=>cancelform()}>Cancel</button>
                </form>
            </div>
        </div>
    );
}