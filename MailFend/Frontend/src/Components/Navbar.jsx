import React from "react";
import logo from "../images/logo.png";
import { useDarkMode } from './DarkModeContext';
import { Brightness4, Brightness7 } from '@mui/icons-material';

const Navbar = () => {
  const { darkMode, toggleDarkMode } = useDarkMode();

  return (
    <>
      <nav className="bg-gray-900 px-2 text-center p-2 shadow-lg flex items-center justify-between">
        <div className="flex">
          <h1 className="text-white flex text-xl items-center">
            MailFend
            <img className="h-10 " src={logo} alt="Logo" />
          </h1>
        </div>
        <div className="text-white space-x-4">
          <i>Screen Reader</i>
          <button onClick={toggleDarkMode} className="focus:outline-none text-white">
            {darkMode ? <Brightness4 /> : <Brightness7 />}
          </button>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
