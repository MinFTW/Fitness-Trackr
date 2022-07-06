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
    <div id='app'>
      <Sidebar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/routines' element={<Routines />} />
        <Route path='/myroutines' element={<MyRoutines />} />
        <Route path='/activities' element={<Activities />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Signup />} />
      </Routes>
    </div>
  );
};

export default App;
