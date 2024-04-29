import { Button } from "@mui/material";
import vector from "../images/vector1.jpg";
import logo from "../images/logo.png";
import { ArrowForward } from "@mui/icons-material";
import correct from "../images/correct.png";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Landing = () => (
  <>
    <div className="flex flex-col mt-7  items-center text-center justify-center ">
      <div className="flex flex-col p-2 border-2 items-center justify-center">
        <motion.p className="text-[38px] flex font-semibold flex-col items-center justify-center ">
          Navigate Email with Ease: Your Inclusive Email Solution-{" "}
          <span className="flex items-center justify-center">
            MailFend
            <img src={logo} />
          </span>
        </motion.p>
        <img className="mt-6 h-96" src={vector} />
      </div>
      <div className="mt-7">
        <h1 className="text-3xl mb-2 underline font-semibold">
          What Our App Offers
        </h1>
        <ul className="list-disc  flex-col font-semibold items-center justify-center text-center text-2xl marker:text-blue-400 space-y-4">
          <li className="flex items-center justify-between">
            <div className="flex-grow">Voice-Activated Email Management</div>
            <img className="h-12" src={correct} alt="Correct Icon" />
          </li>
          <li className="flex items-center justify-between">
            <div className="flex-grow">Seamless Integration with Gmail</div>
            <img className="h-12" src={correct} alt="Correct Icon" />
          </li>
          <li className="flex items-center justify-between">
            <div className="flex-grow">
              User-Friendly Interface and Intuitive Navigation
            </div>
            <img className="h-12" src={correct} alt="Correct Icon" />
          </li>
        </ul>
      </div>
      <div className="mt-14">
        <Button className="" endIcon={<ArrowForward />} variant="contained">
          {" "}
          <Link to="/login">Get Started</Link>{" "}
        </Button>
      </div>
    </div>
  </>
);

export default Landing;
