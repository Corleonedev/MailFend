import logo from "../images/logo.png";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <nav className="bg-black px-2 text-center p-2 shadow-lg flex items-center justify-between">
        <div className="flex">
          <h1 className="text-white flex text-xl items-center">
            MailFend
            <img className="h-10" src={logo} alt="Logo" />
          </h1>
        </div>
        <div className="text-white space-x-4">
          <Link className="hover:text-gray-300" to="/">
            Home
          </Link>
          <a className="hover:text-gray-300" href="">
            About
          </a>
          <a className="hover:text-gray-300" href="">
            Features
          </a>
          <Link className="hover:text-gray-300" to="/login">
            Login
          </Link>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
