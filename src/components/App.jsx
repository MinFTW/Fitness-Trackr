import React from 'react';
import { Routes, Route } from 'react-router-dom';
import '../css/App.css';
import {
  Home,
  Sidebar,
  Routines,
  Activities,
  Login,
  Signup,
  MyRoutines,
} from './index';

const App = () => {
  return (
    <>
      <Sidebar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/routines' element={<Routines />} />
        <Route path='/myroutines' element={<MyRoutines />} />
        <Route path='/activities' element={<Activities />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Signup />} />
      </Routes>
    </>
  );
};

export default App;
