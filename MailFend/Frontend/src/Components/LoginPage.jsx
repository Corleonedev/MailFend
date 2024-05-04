import React, { useState } from 'react';
import { TextField, Button, IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff, Mail, Close } from '@mui/icons-material'; // Import the Close icon
import logo from '../images/logo.png';
import api from '../api';
import { useNavigate } from 'react-router-dom';

const LoginPage = ({ handleClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (e) => {
    e.preventDefault();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post('api/login/', { email, password });
      if (res.status === 200) {
        navigate('/home');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="  modal-container login-form bg-white p-8 rounded-md shadow-lg "> 
      <div className="flex text-red-600 justify-end">
        <IconButton onClick={handleClose}>
          <Close />
        </IconButton>
      </div>
      <form className="flex flex-col border items-center justify-center w-full" onSubmit={handleSubmit}>
        <div className="flex flex-col py-2 px-4 items-center justify-center w-full">
          <h1 className="text-black text-center flex text-xl items-center">
            MailFend
            <img className="h-10" src={logo} alt="MailFend Logo" />
          </h1>
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
                  <Mail />
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
            type={showPassword ? 'text' : 'password'}
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
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
