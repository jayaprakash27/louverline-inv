import React, { useState } from "react";
import logo2 from "./images/logo2.webp";
import { useLocation, Link } from "react-router-dom";

import {
  MdAdd,
  MdLogout,
  MdHome,
  MdContacts,
  MdPriceCheck,
  MdPassword,
  MdWifiPassword,
} from "react-icons/md";
import { FiMenu, FiPhone } from "react-icons/fi";
import { HiUsers } from "react-icons/hi";

import { motion } from "framer-motion";

import { getAuth, signOut } from "firebase/auth";

import { useDispatch, useSelector } from "react-redux";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Header = () => {
  const signedInUser = useSelector((state) => state.signedInUser);

  const dispatch = useDispatch();
  const { pathname } = useLocation();

  const [isMenu, setIsMenu] = useState(false);
  const avatarClick = () => {
    setIsMenu(!isMenu);
    // if (signedInUser) {
    //   setIsMenu(!isMenu);
    // } else {
    //   toast.error("Please login first");
    // }
  };
  const logOut = () => {
    const auth = getAuth();
    setIsMenu(false);
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        toast.warn("Logged Out Successfully");
        dispatch({
          type: "LOGOUT",
        });
        localStorage.clear();
      })
      .catch((error) => {
        // An error happened.
      });
  };

  return (
    <>
      <ToastContainer />
      <header className="App-header z-20 flex justify-between align-middle text-md p-3 bg-cust-black">
        {/* desktop */}
        <div className="hidden md:flex w-full h-full justify-between ">
          <Link to={"./"}>
            <div
              onClick={() => setIsMenu(false)}
              className="flex items-center gap-1 cursor-pointer"
            >
              <img src={logo2} className="h-10 object-cover" alt="logo" />
            </div>
          </Link>

          <div className="flex items-center justify-between">
            <motion.ul
              initial={{ opacity: 0, x: 200 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 200 }}
              className="flex items-center gap-10"
            >
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
              {signedInUser && (
                <a
                  className={
                    pathname === "/contactus"
                      ? "pl-5 pr-5 pt-2 pb-2 text-cust-khaki hover:border-b-2 transition duration-300 border-cust-khaki"
                      : "pl-5 pr-5 pt-2 pb-2 hover:border-b-2 transition duration-300 ease-in-out border-cust-khaki "
                  }
                  href="./pricelist"
                >
                  Price list
                </a>
              )}
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
              <Link to={"./"}>
                {/* <li onClick={() => setIsMenu(false)} className='text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer'>Home</li> */}
              </Link>
              {/* <li onClick={() => setIsMenu(false)} className='text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer'>Menu</li> */}
              {/* <li onClick={() => setIsMenu(false)} className='text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer'>About</li> */}
              {/* <li onClick={() => setIsMenu(false)} className='text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer'>Contact</li> */}
            </motion.ul>

            <div className="relative">
              <motion.a
                whileHover={{ scale: 1.03 }}
                onClick={avatarClick}
                className=" cursor-pointer ml-3 login-button flex items-centre shadow-lg p-3 hover:bg-cust-khaki text-cust-khaki hover:text-cust-white rounded-full"
              >
                <FiMenu />{" "}
              </motion.a>

              {isMenu && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.6 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.6 }}
                  className="w-fit  gap-2 shadow-xl rounded-lg flex flex-col absolute px-4 py-2 bg-cust-black right-2 top-16"
                >
                  {signedInUser && signedInUser === "admin@mail.com" && (
                    <Link to={"./users"}>
                      <p
                        onClick={() => setIsMenu(false)}
                        className=" px-2 py-2 flex items-center gap-2 cursor-pointer hover:bg-cust-khaki hover:text-headingColor bg-cust-black transition-all duration-100 ease-in-out text-textColor "
                      >
                        <HiUsers />
                        Admin{" "}
                      </p>
                    </Link>
                  )}

                  {/* <p onClick={() => setIsMenu(false)} className='px-2 py-2 flex items-center gap-2 cursor-pointer hover:bg-slate-50 hover:text-headingColor transition-all duration-100 ease-in-out text-textColor '><HiUser />Account </p> */}
                  {signedInUser && (
                    <p
                      onClick={() => setIsMenu(false)}
                      className=" px-2 py-2 flex items-center gap-2 cursor-pointer hover:bg-cust-khaki hover:text-headingColor bg-cust-black duration-100 ease-in-out text-textColor "
                    >
                      <MdPassword />
                      Change Password{" "}
                    </p>
                  )}
                  {signedInUser && (
                    <p
                      className="px-2 py-2 flex items-center gap-2 cursor-pointer hover:bg-cust-khaki hover:text-headingColor transition-all duration-100 ease-in-out text-textColor bg-cust-red shadow-md"
                      onClick={logOut}
                    >
                      <MdLogout />
                      Log out{" "}
                    </p>
                  )}
                </motion.div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Screen */}
        <div className="flex md:hidden w-full h-full justify-between ">
          <div>
            <Link to={"./"}>
              <div
                onClick={() => setIsMenu(false)}
                className="flex items-center gap-1 cursor-pointer"
              >
                <img src={logo2} className="h-10 object-cover" alt="logo" />
              </div>
            </Link>
          </div>
          <div className="relative">
            <motion.a
              whileHover={{ scale: 1.03 }}
              onClick={avatarClick}
              className=" cursor-pointer ml-3 login-button flex items-centre shadow-lg p-3 hover:bg-cust-khaki text-cust-khaki hover:text-cust-white rounded-full"
            >
              <FiMenu />{" "}
            </motion.a>

            {isMenu && (
              <motion.div
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.6 }}
                className="w-40  gap-2 shadow-xl rounded-lg flex flex-col absolute px-4 py-2 bg-cust-black right-2 top-16"
              >
                {signedInUser && signedInUser === "admin@mail.com" && (
                  <Link to={"./users"}>
                    <p
                      onClick={() => setIsMenu(false)}
                      className=" px-2 py-2 flex items-center gap-2 cursor-pointer hover:bg-cust-khaki hover:text-headingColor bg-cust-black transition-all duration-100 ease-in-out text-textColor "
                    >
                      <HiUsers />
                      Admin{" "}
                    </p>
                  </Link>
                )}

                {/* <p onClick={() => setIsMenu(false)} className='px-2 py-2 flex items-center gap-2 cursor-pointer hover:bg-slate-50 hover:text-headingColor transition-all duration-100 ease-in-out text-textColor '><HiUser />Account </p> */}
                <Link to={"./"}>
                  <p
                    onClick={() => setIsMenu(false)}
                    className=" px-2 py-2 flex items-center gap-2 cursor-pointer hover:bg-cust-khaki hover:text-headingColor bg-cust-black transition-all duration-100 ease-in-out text-textColor "
                  >
                    <MdHome />
                    Home{" "}
                  </p>
                </Link>
                <Link to={"./pricelist"}>
                  <p
                    onClick={() => setIsMenu(false)}
                    className=" px-2 py-2 flex items-center gap-2 cursor-pointer hover:bg-cust-khaki hover:text-headingColor bg-cust-black transition-all duration-100 ease-in-out text-textColor "
                  >
                    <FiPhone />
                    Contact{" "}
                  </p>
                </Link>
                {signedInUser && (
                  <Link to={"./forgot"}>
                    <p
                      onClick={() => setIsMenu(false)}
                      className=" px-2 py-2 flex items-center gap-2 cursor-pointer hover:bg-cust-khaki hover:text-headingColor bg-cust-black transition-all duration-100 ease-in-out text-textColor "
                    >
                      <MdPassword />
                      Change Password{" "}
                    </p>
                  </Link>
                )}
                {signedInUser && (
                  <Link to={"./contactus"}>
                    <p
                      onClick={() => setIsMenu(false)}
                      className=" px-2 py-2 flex items-center gap-2 cursor-pointer hover:bg-cust-khaki hover:text-headingColor bg-cust-black transition-all duration-100 ease-in-out text-textColor "
                    >
                      <MdPriceCheck />
                      Price list{" "}
                    </p>
                  </Link>
                )}
                {signedInUser && (
                  <p
                    className="px-2 py-2 flex items-center gap-2 cursor-pointer hover:bg-cust-khaki hover:text-headingColor transition-all duration-100 ease-in-out text-textColor bg-cust-red shadow-md"
                    onClick={logOut}
                  >
                    <MdLogout />
                    Log out{" "}
                  </p>
                )}
              </motion.div>
            )}
          </div>
        </div>

        {/* <a href="/">
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
          onClick={avatarClick}
          className=" cursor-pointer ml-3 login-button hidden md:flex items-centre shadow-lg p-3 hover:bg-cust-khaki text-cust-khaki hover:text-cust-white rounded-full"
        >
          <FaUserCircle />{" "}
        </motion.a>
      </div> */}
      </header>
    </>
  );
};

export default Header;
