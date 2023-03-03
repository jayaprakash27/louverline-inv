import React, { useState } from "react";
import { motion } from "framer-motion";
import Header from "./Header";
import Footer from "./Footer";
import { getFirestore, collection, doc, setDoc } from "firebase/firestore";
import { app } from "../firebase";

import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const auth = getAuth();
const db = getFirestore(app);

const SignUp = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [orgName, setOrgName] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [signedUp, setSignedUp] = useState(false);
  const signUpWithDetails = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        // Signed in
        try {
            const userRef = collection(db, 'users');
            setDoc(doc(userRef, `${email}`), {
              name: name,
              email: email,
              orgName: orgName,
              phone: phone,
              access: false,
            });
            console.log("Document written with ID: ");
            setSignedUp(true);
          } catch (e) {
            console.error("Error adding document: ", e);
          }
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
        // ..
      });
  };
  return (
    <div>
      <Header />
      <div className="flex justify-center align-middle">
        <div className="card flex-col p-4 mt-16 mb-16 items-center bg-cust-white rounded-lg w-fit ">
          <p className="text-cust-red p-3 m-6 ">Create a new account</p>
          <div>
            <input
              type="text"
              placeholder="Name"
              className=" bg-transparent border  w-80 rounded-full m-2 text-center"
              name="name"
              id="name"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Name of the Organisation"
              className=" bg-transparent border  w-80 rounded-full m-2 text-center"
              name="orgName"
              id="orgName"
              onChange={(e) => setOrgName(e.target.value)}
            />
          </div>
          <div>
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
              placeholder="Phone Number"
              className=" bg-transparent w-80 rounded-full m-2 text-center"
              type="number"
              name="ph-number"
              id="ph-number"
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div>
            <input
              placeholder="Password"
              className=" bg-transparent border  w-80 rounded-full m-2 text-center"
              type="password"
              name="password"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex justify-around m-3 ">
            <motion.button
              onClick={signUpWithDetails}
              whileTap={{ translateX: 4 }}
              className=" shadow-md hover:shadow-cust-red  cursor-pointer border border-cust-red w-32 ml-4 mr-4 text-cust-red hover:bg-cust-red hover:text-cust-white pl-8 pr-8 pt-2 pb-2 rounded-full "
            >
              SIGN UP
            </motion.button>
          </div>
          <a href="./" className="text-cust-red underline p-3 m-6 ">
            Back to Login
          </a>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SignUp;
