import React, { useState } from 'react';
import { Button, Modal } from '@mui/material';
import LoginPage from './LoginPage'; // Import your LoginPage component here
import integration from "../images/integration.png";
import vector from "../images/vector1.png"
import voice from "../images/voice.png"
import friendly from "../images/friendly.png"

import logo from '../images/logo.png';
import { ArrowForward } from '@mui/icons-material';

import { motion } from 'framer-motion';
import { useDarkMode } from './DarkModeContext';

const Landing = () => {
  const { darkMode } = useDarkMode();
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <div className={`flex flex-col  items-center text-center justify-center ${darkMode ? 'bg-gray-900 text-white' : ''}`}>
        <div className="flex flex-col p-2 items-center justify-center">
          <motion.p className="text-[30px] md:flex-1 flex-col font-semibold  items-center justify-center ">
            <span className={`text-${darkMode ? 'blue' : 'blue-500'} animated-text`}>Navigate Email with Ease </span>: Your Inclusive Email Solution-{' '}
            <span className="flex items-center justify-center">
              MailFend
              <img className='' src={logo} alt="MailFend Logo" />
            </span>
          </motion.p>
          <img className="mt-6 h-96" src={vector} alt="Vector Image" />
        </div>
        <div className="mt-7 shadow-md dark:bg-gray-800 p-10">
          <h1 className={`text-[28px] mb-2 underline font-semibold ${darkMode ? 'text-white' : ''}`}>
            What Our App Offers
          </h1>
          <ul className="list-disc  flex-col font-semibold items-center justify-center text-center text-[20px] marker:text-blue-400 space-y-4">
            <li className="flex items-center justify-between">
              <div className="flex-grow">
                Voice-Activated Email Management
              </div>
              <img className="h-8" src={voice} alt="Correct Icon" />
            </li>
            <li className="flex items-center justify-between">
              <div className="flex-grow">
                Seamless Integration with Gmail
              </div>
              <img className="h-8" src={integration} alt="Correct Icon" />
            </li>
            <li className="flex items-center justify-between">
              <div className="flex-grow">
                User-Friendly Interface and Navigation
              </div>
              <img className="h-8" src={friendly} alt="Correct Icon" />
            </li>
          </ul>
        </div>
        <div className="mt-10 mb-6">
          <Button
            className=""
            endIcon={<ArrowForward />}
            variant="contained"
            onClick={handleOpen} 
            size='small'
          >
            Get Started
          </Button>
        </div>
      </div>

     
      <Modal open={open} onClose={handleClose}>
        <div className="modal-container flex items-center justify-center h-full">
          <LoginPage handleClose={handleClose} />
        </div>
      </Modal>
    </>
  );
};

export default Landing;
