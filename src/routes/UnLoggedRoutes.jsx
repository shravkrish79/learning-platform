// Node modules
import { Routes, Route } from "react-router-dom";
import WelcomePage from "../pages/WelcomePage";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import RecoverPassword from "../pages/RecoverPassword";
import PageNotFound from "../pages/PageNotFound";
import ContentPage from "../pages/ContentPage";
import { useUser } from "../state/useUser";

export default function UnLoggedRoutes() {
    const { uid } = useUser();
    console.log('unloggedroute');
    return (
        <Routes>
            <Route path="/" element={<WelcomePage />} />
            {((uid === null) || (uid === "") || (uid === undefined)) ?
                <Route path="*" element={<PageNotFound />} /> :
                <Route path="/contentpage" element={<ContentPage />} />}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/recoverpassword" element={<RecoverPassword />} />
            <Route path="*" element={<PageNotFound />} />
        </Routes>
    )
}