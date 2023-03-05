import React, { useState, Fragment, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";

import { app } from "../firebase";

import {
  where,
  query,
  collection,
  getDocs,
  getFirestore,
  updateDoc,
  doc,
} from "firebase/firestore";

import { motion } from "framer-motion";
import { Tab } from "@headlessui/react";

const Users = () => {
  const [validUsers, setValidUsers] = useState([]);
  const [invalidUsers, setInvalidUsers] = useState([]);
  // const users = [];
  const db = getFirestore(app);
  //   const getUsers = async () =>{
  //     const querySnapshot = await getDocs(collection(db, "users"));
  //     querySnapshot.forEach((doc) => {
  //       // doc.data() is never undefined for query doc snapshots
  //       users.push(JSON.stringify(doc.data()));
  //     });
  //   }

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  const getValidUsers = async () => {
    const users = await getDocs(
      query(collection(db, "users"), where("access", "==", true))
    );
    return users.docs.map((doc) => doc.data());
  };
  const getInvalidUsers = async () => {
    const users = await getDocs(
      query(collection(db, "users"), where("access", "==", false))
    );
    console.log(users.docs.map((doc) => doc.data()));
    return users.docs.map((doc) => doc.data());
  };
  const fetchUsers = async () => {
    await getValidUsers().then((data) => {
      setValidUsers(data);
    });
    await getInvalidUsers().then((data) => {
      setInvalidUsers(data);
    });
  };
  useEffect(() => {
    fetchUsers();
  }, []);

  const toggleAccess = (user) => {
    const userRef = doc(db, "users", user.email);
    updateDoc(userRef, {
      access: !user.access,
    }).then(console.log("Done!"), document.getElementById(user.email).classList.add('hidden'));
  };

  return (
    <div className="flex h-full justify-center items-center">
      {/* <Header /> */}
      <div className=" w-full card max-w-5xl p-4 mt-16 mb-16 items-center bg-cust-white rounded-lg ">
        <Tab.Group>
          <Tab.List className="flex space-x-1 rounded-xl bg-transparent p-1">
            <Tab
              className={({ selected }) =>
                classNames(
                  "w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-cust-red",
                  " focus:outline-none ",
                  selected
                    ? "bg-cust-red text-cust-white shadow"
                    : " hover:bg-white"
                )
              }
            >
              Pending Approval
            </Tab>
            <Tab
              className={({ selected }) =>
                classNames(
                  "w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-cust-red",
                  " focus:outline-none ",
                  selected
                    ? "bg-cust-red text-cust-white shadow"
                    : " hover:bg-white"
                )
              }
            >
              Approved Users
            </Tab>
          </Tab.List>
          <Tab.Panels>
            <Tab.Panel>
              <div className="flex w-full justify-around max-w-80 p-3 gap-2 ">
              <strong className=" w-40 h-12 ">Name</strong>
                    <strong className=" w-40 h-12  ">Organisation </strong>
                    <strong className=" w-40 h-12 hidden md:block  ">Phone Number</strong>
                    <strong className=" hidden md:block w-40 h-12 ">Email address</strong>
                    <strong className=" w-40 h-12  ">Action </strong>
              </div>
              {invalidUsers &&
                invalidUsers.map((user) => (
                  <div id={user.email} className=" mt-4 flex w-full justify-around max-w-80 p-3 gap-2 ">
                    <div className=" w-40 h-12  ">{user.name}</div>
                    <div className="  w-40 h-12  ">{user.orgName}</div>
                    <div className=" w-40 h-12 hidden md:block  ">{user.phone}</div>
                    <div className=" hidden md:block w-40 h-12 ">{user.email}</div>
                    <button
                      onClick={() => toggleAccess(user)}
                      className="cursor-pointer border border-green-500 w-32 ml-4 mr-4  shadow-md hover:shadow-green-500 text-green-600 hover:bg-green-500 hover:text-cust-white pl-8 pr-8 pt-2 pb-2 rounded-full"
                    >
                      Approve
                    </button>
                  </div>
                ))}
            </Tab.Panel>
            <Tab.Panel>
              <div className="flex w-full justify-around max-w-80 p-3 gap-2 ">
              <strong className=" w-40 h-12 ">Name</strong>
                    <strong className=" w-40 h-12  ">Organisation </strong>
                    <strong className=" w-40 h-12 hidden md:block  ">Phone Number</strong>
                    <strong className=" hidden md:block w-40 h-12 ">Email address</strong>
                    <strong className=" w-40 h-12  ">Action </strong>
              </div>
              {validUsers &&
                validUsers.map((user) => (
                  <div id={user.email} className=" mt-4 flex w-full justify-around max-w-80 p-3 gap-2 ">
                    <div className=" w-40 h-12  ">{user.name}</div>
                    <div className="  w-40 h-12  ">{user.orgName}</div>
                    <div className=" w-40 h-12 hidden md:block  ">{user.phone}</div>
                    <div className=" hidden md:block w-40 h-12 ">{user.email}</div>
                    <button
                      onClick={() => toggleAccess(user)}
                      className="cursor-pointer border border-cust-red w-32 ml-4 mr-4  shadow-md hover:shadow-cust-red text-cust-red hover:bg-cust-red hover:text-cust-white pl-8 pr-8 pt-2 pb-2 rounded-full"
                    >
                      Revoke
                    </button>
                  </div>
                ))}
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
        {/* <Footer /> */}
      </div>
    </div>
  );
};

export default Users;
