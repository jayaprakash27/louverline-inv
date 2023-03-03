import React, { useState } from "react";
import { motion } from "framer-motion";
import Header from "./Header";
import Footer from "./Footer";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "../firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";



const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const auth = getAuth();
  const dispatch = useDispatch();

  const  signInWithEmail = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((payload) => {
        // Signed in
        dispatch({
            type: 'LOGIN',
            payload
        })

        // ...
      })
      .catch((error) => {
        alert(error.message);
      });
  };
  return (
    <div>
      <Header />
      <div className="flex justify-center align-middle">
        <div className="card flex-col p-4 mt-16 mb-16 items-center bg-cust-white rounded-lg w-fit ">
          <p className="text-cust-red p-3 m-6 ">You need to log in first</p>
          <div className=" block">
            <input
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className=" bg-transparent w-80 rounded-full m-2 text-center"
              type="email"
              name="email"
              id="email"
            />
          </div>
          <div>
            <input
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className=" bg-transparent border  w-80 rounded-full m-2 text-center"
              type="password"
              name="password"
              id="password"
            />
          </div>
          <div className="flex justify-around m-3 ">
            <motion.button
              onClick={signInWithEmail}
              type="submit"
              whileTap={{ translateX: 4 }}
              className="  cursor-pointer border border-cust-red w-32 ml-4 mr-4 shadow-md hover:shadow-cust-red text-cust-red hover:bg-cust-red hover:text-cust-white pl-8 pr-8 pt-2 pb-2 rounded-full "
            >
              LOGIN
            </motion.button>
          </div>
          <a href="./signup" className="text-cust-red underline p-3 m-6 ">
            Don't have an account?
          </a>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SignIn;
