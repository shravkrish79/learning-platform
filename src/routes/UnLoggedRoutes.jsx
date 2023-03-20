// Node modules
import { Routes, Route } from "react-router-dom";
import WelcomePage from "../pages/WelcomePage";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import RecoverPassword from "../pages/RecoverPassword";
import PageNotFound from "../pages/PageNotFound";

export default function UnLoggedRoutes() {
    return (
        <Routes>
            <Route path="/" element={<WelcomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/recoverpassword" element={<RecoverPassword />} />
            <Route path="*" element={<PageNotFound />} />
        </Routes>
    )
}