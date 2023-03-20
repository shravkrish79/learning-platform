import FocusImage from "../assets/focus-title.jpg";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useProfile } from "../state/useProfile";
import { readDocuments } from "../scripts/fireStore";

export default function WelcomePage() {
    const { setProfileData } = useProfile();
    const profileCollection = 'profile';
    useEffect(() => {
        const loadData = async (collectionName) => {
            const data = await readDocuments(collectionName).catch(onFail);
            onSuccess(data);
        }
        loadData(profileCollection);
        function onSuccess(data) {
            setProfileData(data);
              // setStatus(1);
          }
    }, [setProfileData]);
    
    
    function onFail() { // setStatus(2); 
      console.error();
    }

    return (
        <div id="welcomepage" >
            <div className="welcome-page">
                <div className="welcome-container">
                    <h1>Take control of yourself</h1>
                    <p>Build in-demand skills in everything from cybersecurity to software development. And then use those skills to confidently
                        take your career—and your take-home pay—to the next level.
                    </p>
                </div>
                <img src={FocusImage} alt="Focus title" />
                <div className="link-btn">
                    <Link to="/login">LogIn</Link>
                    <Link to="/signup">SignUp</Link>
                </div>
            </div>
        </div>
    );
}