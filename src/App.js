import './App.css';
import { MainContainer, Contact, SignIn, SignUp } from './components'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';

const App = () => {
  const signedInUser = useSelector(state => state.signedInUser)
  console.log(signedInUser);
return (
  <div className="App">
    <BrowserRouter>
      <Routes>
        <Route path='/' element={ signedInUser != null ? <MainContainer /> : <SignIn />}/>
        <Route path='/SignUp' element={<SignUp />}/>
        <Route path='/contactus' element={<Contact />}/>
      </Routes>
      </BrowserRouter>
  </div>
);
}

export default App
