// import api from "../api";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.clear();
    navigate("/login");
    console.log("User successfully logged out.");
  }

  return (
    <div>
      <h1>This is the home page.</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}
