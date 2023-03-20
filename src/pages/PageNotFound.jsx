// Node modules
import { Link } from "react-router-dom";

export default function PageNotFound() {
  return (
    <div>
      <h1>Page not found</h1>
      <p>The page does not exist or requires a subscription</p>
      <Link to="/login">Login</Link>
    </div>
  );
}