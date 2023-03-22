import RecoverImage from "../assets/login-hero.png";
import ProfileFields from "../data/profile-fields.json";
import FormFieldGenerator from "../components/form/FormFieldGenerator";
import { recoverAccount } from "../scripts/auth";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";

export default function RecoverPassword() {
    const [form, setForm] = useState({ Email: "" });
    const Navigate = useNavigate();
    const location = useLocation();
    const profileData = location.state.profileData;
    const data = ProfileFields.filter((recs) => recs.key === 'Email');

    async function onSubmit(event) {
        event.preventDefault();
        document.getElementById("recover-btn").disabled = true;
        const result = await recoverAccount(form.Email);
        result.status ? onSuccess() : onFailure(result);
    }

    function onSuccess() {
        const text = "Email with a reset link sent. Please check your SPAM/Junk folder as well.";
        alert(text);
        document.getElementById("recover-btn").disabled = false;
        Navigate("/login", { state: { profileData } });
    }

    function onFailure(result) {
        alert(result.message);
        document.getElementById("recover-btn").disabled = false;
    }

    return (
        <div id="recover">
            <div className="recover-img"><img src={RecoverImage} alt="Recover email screen" /> </div>
            <div className="recover-page">
                <h1>Newbie</h1>
                <span>Find your account</span>
                <form className="recover-form" id="recoverForm" onSubmit={(event) => onSubmit(event)}>
                    <FormFieldGenerator data={data} state={[form, setForm]} />
                    <button className="recover-btn" id="recover-btn">Submit</button>
                </form>
                <Link to="/" className="cancel-btn" >Cancel</Link>
            </div>
        </div>
    );
}