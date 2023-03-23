import ProfileFields from "../data/profile-fields.json";
import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { createAccount } from "../scripts/auth";
import { createDocument } from "../scripts/fireStore";
import { ImageProcess } from "../scripts/imageProcess";
import FormFieldGenerator from "../components/form/FormFieldGenerator";


export default function Signup() {
    const [form, setForm] = useState({ FirstName: "", LastName: "", Gender: "", Email: "", Password: "", Image: undefined });
    const location = useLocation();
    let profileData = location.state.profileData;
    const Navigate = useNavigate();
    async function onSubmit(event) {
        event.preventDefault();
        document.getElementById("signup-btn").disabled = true;
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
        profileData = updatedProfileData;
        Navigate("/login", { state: { profileData } });
        alert('Account created!');
        document.getElementById("signup-btn").disabled = false;
    }

    useEffect(() => {
        const localUid = localStorage.getItem('user-id');
        console.log(localUid)
        if ((localUid === null) || (localUid === "") || (localUid === undefined)){return;}
        else { Navigate("/contentpage", { state: { profileData } }) }
    }, [Navigate, profileData])

    function onFailure(result) {
        alert(`Cannot create an account, ${result.message}`);
        document.getElementById("signup-btn").disabled = false;
    }
    // console.log(profileData);
    return (
        <div id="signup">
            <div className="signup-page">
                <h1>Newbie</h1>
                <span>Create your account here!</span>
                <form className="signup-form" id="signupForm" onSubmit={(event) => onSubmit(event)}>
                    <FormFieldGenerator data={ProfileFields} state={[form, setForm]} />
                    <button className="signup-btn" id="signup-btn">SignUp</button>
                </form>
                <Link to="/login" state={{ profileData }} className="login-link">Already have an account?</Link>
            </div>
        </div>
    );
}
