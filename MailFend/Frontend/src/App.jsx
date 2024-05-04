import "./App.css";
import Navbar from "./Components/Navbar";
import Landing from "./Components/LandingPage";
import LoginPage from "./Components/LoginPage";
import HomePage from "./Components/HomePage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./Components/ProtectedRoute";
import { DarkModeProvider } from "./Components/DarkModeContext";

function App() {
  function LandingPage() {
    localStorage.clear();
    return <Landing />;
  }

  function Login() {
    localStorage.clear();
    return <LoginPage />;
  }

  return (
    <DarkModeProvider>
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
    </DarkModeProvider>
  );
}

export default App;
