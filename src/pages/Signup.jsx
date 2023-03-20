import ProfileFields from "../data/profile-fields.json";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createAccount } from "../scripts/auth";
import { createDocument } from "../scripts/fireStore";
import { ImageProcess } from "../scripts/imageProcess";
import { useProfile } from "../state/useProfile";
import FormFieldGenerator from "../components/form/FormFieldGenerator";


export default function Signup() {
    const [form, setForm] = useState({ FirstName: "", LastName: "", Gender: "", Email: "", Password: "", Image: undefined });
    const { profileData, setProfileData } = useProfile();
    const Navigate = useNavigate();
    async function onSubmit(event) {
        event.preventDefault();
        document.getElementById("signup-btn").disabled=true;
        console.log(form);
        const result = await createAccount(form.Email, form.Password);
        result.status ? onSuccess(result, event) : onFailure(result);
    }
    async function onSuccess(result) {
        let imageURL = null;
        if (form.Image !== undefined) {
            imageURL = await ImageProcess(form.Image[0], 'profileImages');
        }
        const data = {
            "firstName": form.FirstName,
            "lastName": form.LastName,
            "gender": form.Gender,
            "email": form.Email,
            "profilePic": imageURL,
            "isTeacher": false,
            "uid": result.payload
        };
        await createDocument('profile', data);
        const updatedProfileData = [...profileData, { id: result.payload, ...data }]

        setProfileData(updatedProfileData);
        Navigate("/login");
        alert('Account created!');
        document.getElementById("signup-btn").disabled=false;
    }

    function onFailure(result) {
        alert(`Cannot create an account, ${result.message}`);
        document.getElementById("signup-btn").disabled=false;
    }

    return (
        <div id="signup">
            <div className="signup-page">
                <h1>Newbie</h1>
                <span>Create your account here!</span>
                <form className="signup-form" id="signupForm" onSubmit={(event) => onSubmit(event)}>
                    <FormFieldGenerator data={ProfileFields} state={[form, setForm]} />
                    <button className="signup-btn">SignUp</button>
                </form>
                <Link to="/login" className="login-link">Already have an account?</Link>
            </div>
        </div>
    );
}
