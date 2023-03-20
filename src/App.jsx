import { BrowserRouter } from "react-router-dom";
import { useUser } from "./state/useUser";

import LoggedRoutes from "./routes/LoggedRoutes";
import UnLoggedRoutes from "./routes/UnLoggedRoutes";

export default function App() {
  const { uid } = useUser();
  return (
    <BrowserRouter>
      {uid ? <LoggedRoutes /> : <UnLoggedRoutes />}
    </BrowserRouter>
  );
}


