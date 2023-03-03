import React from "react";
import logo2 from "./images/logo2.webp";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { FaUserCircle } from "react-icons/fa";
import { getAuth, signOut } from "firebase/auth";

import { useDispatch, useSelector } from "react-redux";

const Header = () => {

  
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  
  const logOut = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        dispatch({
          type: "LOGOUT",
        });
        localStorage.clear();
      })
      .catch((error) => {
        // An error happened.
      });
    localStorage.clear();
  };

  return (
    <header className="App-header flex justify-between align-middle text-md p-3 bg-cust-black">
      <a href="/">
        {" "}
        <img src={logo2} alt="" className=" h-10" />
      </a>
      <div className="menu flex h-10 justify-between align-middle">
        <a
          className={
            pathname === "/"
              ? "pl-5 pr-5 pt-2 pb-2 text-cust-khaki hover:border-b-2 transition duration-300 border-cust-khaki"
              : "pl-5 pr-5 pt-2 pb-2 hover:border-b-2 transition duration-300 ease-in-out border-cust-khaki "
          }
          href="./"
        >
          Home
        </a>
        <a
          className={
            pathname === "/contactus"
              ? "pl-5 pr-5 pt-2 pb-2 text-cust-khaki hover:border-b-2 transition duration-300 border-cust-khaki"
              : "pl-5 pr-5 pt-2 pb-2 hover:border-b-2 transition duration-300 ease-in-out border-cust-khaki "
          }
          href="./contactus"
        >
          Contact
        </a>
        <motion.a
          whileHover={{ scale: 1.03 }}
          onClick={logOut}
          className=" cursor-pointer ml-3 login-button hidden md:flex items-centre shadow-lg p-3 hover:bg-cust-khaki text-cust-khaki hover:text-cust-white rounded-full"
        >
          <FaUserCircle />{" "}
        </motion.a>
      </div>
    </header>
  );
};

export default Header;
