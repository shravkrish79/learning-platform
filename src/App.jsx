import "./styles/global/style.css";
import { BrowserRouter } from "react-router-dom";
import { useUser } from "./state/useUser";

import LoggedRoutes from "./routes/LoggedRoutes";
import UnLoggedRoutes from "./routes/UnLoggedRoutes";
// import Navbar from "./components/Navbar";
// import Footer from "./components/Footer";

export default function App() {
  const { uid } = useUser();
  return (
    <BrowserRouter>
      {/* <Navbar /> */}
      {uid ? <LoggedRoutes /> : <UnLoggedRoutes />}
      {/* <Footer /> */}
    </BrowserRouter>
  );
}


