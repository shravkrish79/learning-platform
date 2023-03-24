// Node modules
import { Link } from "react-router-dom";
import { useUser } from "../state/useUser";

export default function PageNotFound() {
  const { uid } = useUser();
  const profileData = [];
  return (
    <div id="pagenotfound">
      <h1>Page not found</h1>
      <p>The page does not exist or requires a subscription / already logged in. please close this page.</p>
      {uid ? <Link to="/contentpage" state={profileData}>Home</Link> : <Link to="/">Home</Link>}
    </div>
  );
}