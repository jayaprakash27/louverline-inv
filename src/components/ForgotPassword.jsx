import React, { useState } from "react";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";

import { motion } from "framer-motion";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const auth = getAuth();
  const navigate = useNavigate();
  const verify = () => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        // Password reset email sent!
        toast.success('Password reset email sent to your email address!')
        navigate('../');
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        toast.error(errorMessage);
        // ..
      });
  };

  return (
    <div>
      <ToastContainer />
      <div className="flex justify-center align-middle">
        <div className="card flex-col p-4 mt-16 mb-16 items-center bg-cust-white rounded-lg w-fit ">
          <p className="text-cust-red p-3 m-6 ">Enter your email address</p>
          <div className=" block">
            <input
              onChange={(e) => setEmail(e.target.value)}
              className=" m-2 text-center w-80 rounded-full bg-transparent outline-none"
              type="email"
              name="email"
              placeholder="Email"
              id="email"
            />
          </div>
          <div></div>
          <div className="flex justify-around m-3 ">
            <motion.button
              id="button"
              onClick={() => verify()}
              whileTap={{ translateX: 4 }}
              className="  cursor-pointer border border-cust-red w-32 ml-4 mr-4 shadow-md hover:shadow-cust-red text-cust-red hover:bg-cust-red hover:text-cust-white pl-8 pr-8 pt-2 pb-2 rounded-full "
            >
              SUBMIT
            </motion.button>
          </div>
          <a href="./" className="text-cust-red underline p-3 m-6 ">
            Back to Login
          </a>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
