import api from "../api";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const navigate = useNavigate();

  const endMailConnection = async () => {
    try {
      const res = await api.post("api/logout/", { logout: true });
      console.log(res.data.message);
    } catch (error) {
      console.log(`${error.response.data.message}`);
    }
  };

  async function handleLogout() {
    localStorage.clear();
    await endMailConnection();
    navigate("/login");
  }
  return (
    <div>
      <h1>This is the home page.</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}
