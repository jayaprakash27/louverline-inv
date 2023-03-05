import './App.css';
import { MainContainer, Contact, SignIn, SignUp, Users, PriceList, ForgotPassword } from './components'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/Header';
import Footer from './components/Footer';

const App = () => {
  const signedInUser = useSelector(state => state.signedInUser)
  useEffect(() => {
    console.log(signedInUser);
    if(signedInUser != null){
    toast.success('Logged in Successfully!');
  }
  }, [signedInUser]);

return (
  <div className="App">
    <ToastContainer />
    <Header />
      <Routes>
        <Route path='/' element={ signedInUser != null ? <MainContainer /> : <SignIn />}/>
        <Route path='/SignUp' element={<SignUp />}/>
        <Route path='/contactus' element={<Contact />}/>
        <Route path='/users' element={ signedInUser == 'admin@mail.com' ? <Users /> : <h1> Page not found</h1>}/> 
        <Route path='/pricelist' element={ signedInUser ? <PriceList /> : <h1> Page not found</h1>}/> 
        <Route path='/forgot' element={ <ForgotPassword />}/> 
      </Routes>
    <Footer />
  </div>
);
}

export default App
