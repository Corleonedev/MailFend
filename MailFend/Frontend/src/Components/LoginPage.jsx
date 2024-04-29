import { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import MailIcon from "@mui/icons-material/Mail";
import logo from "../images/logo.png";
import gmail from "../images/gmail.png";
import api from "../api";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../tokens";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (e) => {
    e.preventDefault();
  };

  const getFakeUsername = (email_address) => {
    email_address = email.split("@");
    const username = email_address[0];
    return username;
  };

  const createUser = async (e) => {
    const username = getFakeUsername(email);

    try {
      const res = await api.post("api/create-user/", {
        username,
        email,
        password,
      });

      if (res.status === 201 && res.data.exists === true) {
        console.log("This user already has a registered account.");
      }
    } catch (error) {
      console.log(
        `ERROR FROM CREATE USER FUNCTION -> ${JSON.stringify(
          error.response.data
        )}`
      );
    }
  };

  const setTokens = async (e) => {
    const username = getFakeUsername(email);

    try {
      const res = await api.post("api/token/", { username, password });
      localStorage.setItem(ACCESS_TOKEN, res.data.access);
      localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
    } catch (error) {
      console.log(`ERROR FROM SET TOKENS FUNCTION -> ${error}`);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("api/login/", { email, password });
      if (res.status === 200) {
        console.log("Login successful.");

        await createUser();

        await setTokens();

        navigate("/home");
      }
    } catch (error) {
      const status_code = error.response.status;
      const error_code = error.response.data.error_code;

      if (status_code === 400 && error_code === "002")
        console.log("Invalid username or password.");
      if (status_code === 500) {
        console.log("The connection with the server failed.");
      }
      if (status_code === 503) {
        console.log(
          "Unable to establish a stable internet connection. Please check your network connection and try again."
        );
      }
    }
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-4xl flex items-center w-ful font-bold mb-14">
          Login Into Your{" "}
          <span className="flex gap-2 ml-2 items-center">
            {" "}
            Gmail <img className="mr-2 " src={gmail} />{" "}
          </span>{" "}
          Account
        </h1>
        <form
          className="border-2 bg-white shadow-lg p-4 flex items-center justify-center flex-col  w-full md:w-1/2"
          onSubmit={handleSubmit}
        >
          <div className="flex">
            <h1 className="text-black text-center flex text-2xl items-center">
              MailFend
              <img className="h-10" src={logo} />
            </h1>
          </div>
          <TextField
            label="Gmail Address"
            variant="outlined"
            margin="normal"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoFocus
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <MailIcon />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            label="Password"
            variant="outlined"
            margin="normal"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            type={showPassword ? "text" : "password"}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Login
          </Button>
        </form>
      </div>
    </>
  );
};

export default LoginPage;
