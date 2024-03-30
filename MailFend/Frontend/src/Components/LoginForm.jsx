import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import MailIcon from '@mui/icons-material/Mail';
import logo from "../images/logo.png"
import gmail from "../images/gmail.png"
import { motion } from 'framer-motion';


const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle login logic here (e.g., send data to server)
    console.log('Email:', email);
    console.log('Password:', password);
    setEmail('');
    setPassword('');
  };

  return (
    <>
    
   <div className="flex flex-col items-center justify-center h-screen">
    <h1 className='text-4xl flex items-center w-ful font-bold mb-14'>Login Into Your <span className='flex gap-2 ml-2 items-center'> Gmail <img className='mr-2 ' src={gmail}/> </span>  Acccount</h1>
     <form className='border-2 bg-white shadow-lg p-4 flex items-center justify-center flex-col  w-full md:w-1/2' onSubmit={handleSubmit}>
     <div className="flex"><h1 className="text-black text-center flex text-2xl items-center">MailFend<img className="h-10" src={logo}/></h1></div> 
      <TextField
        label="Gmail Address"
        variant="outlined"
        margin="normal"
        fullWidth
        value={email}
        onChange={(event) => setEmail(event.target.value)}
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
        onChange={(event) => setPassword(event.target.value)}
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
    </form>
   </div></>
   
  );
};

export default LoginForm;
