import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Header from "./Header";
import Footer from "./Footer";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "../firebase";

import { doc, getDoc, getFirestore } from "firebase/firestore";

import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signedInUser = useSelector((state) => state.signedInUser);
  const auth = getAuth();
  const dispatch = useDispatch();

  const db = getFirestore(app);
  const getUserAccess = async () =>{
  const userRef = doc(db, "users", email);
  const user = await getDoc(userRef);
  console.log(user.data().access);
  const access = await user.data().access;
  return access;
  }
  const signIn = () =>{
    getUserAccess().then( access => {
      if(access == true){
        signInWithEmail();
        }else {
          toast.error("Application pending!");
        }
    } )
  }
  const signInWithEmail = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((payload) => {
        // Signed in
          dispatch({
            type: "LOGIN",
            email,
          });
          localStorage.setItem("signedInUser", email);
        // ...
      })
      .catch((error) => {
        toast.error(error.message);
      })
  };

  return (
    <div>
      {/* <Header /> */}
      <ToastContainer/>
      <div className="flex justify-center align-middle">
        <div className="card flex-col p-4 mt-16 mb-16 items-center bg-cust-white rounded-lg w-fit ">
          <p className="text-cust-red p-3 m-6 ">You need to log in first</p>
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
          <div>
            <input
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className=" bg-transparent border w-80 rounded-full m-2 text-center"
              type="password"
              name="password"
              id="password"
            />
          </div>
            <a href="./forgot" className="text-cust-red underline p-3 m-6 ">
              Forgot Password?
            </a>
          <div className="flex justify-around m-3 ">
            <motion.button
              id="button"
              onClick={signIn}
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
      {/* <Footer /> */}
    </div>
  );
};

export default SignIn;
