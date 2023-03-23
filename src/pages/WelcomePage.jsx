import FocusImage from "../assets/focus-title.jpg";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useStatus } from "../state/useStatus";
import { readDocuments } from "../scripts/fireStore";

export default function WelcomePage() {
    const [profileData, setProfileData] = useState([]);
    const { status, setStatus } = useStatus();
    const profileCollection = 'profile';
    useEffect(() => {
        const loadData = async (collectionName) => {
            const data = await readDocuments(collectionName).catch(onFail);
            onSuccess(data);
        }
        setStatus(0);
        loadData(profileCollection);
        function onSuccess(data) {
            setProfileData(data);
            setStatus(1);
        }

        function onFail() {
            setStatus(2);
            console.error();
        }

    }, [setProfileData, setStatus]);


    return (
        <div id="welcomepage" >
            {status === 0 && <p className="loading">Loading... </p>}
            {status === 1 && <div>
                <div className="welcome-page">
                    <div className="welcome-container">
                        <h1>Take control of yourself</h1>
                        <p>Build in-demand skills in everything from cybersecurity to software development. And then use those skills to confidently
                            take your career—and your take-home pay—to the next level.
                        </p>
                    </div>
                    <img src={FocusImage} alt="Focus title" />

                </div>
                <div className="link-btn">
                    <Link to={"/login"} state={{ profileData }}>LogIn</Link>
                    <Link to={"/signup"} state={{ profileData }}>SignUp</Link>
                </div>
            </div>
            }
            {status === 2 && <p>Error</p>}
        </div>
    );
}