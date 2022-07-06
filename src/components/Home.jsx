import React from 'react';
import '../css/Home.css';
import elliptical from '../images/elliptical.png';

const Home = () => {
  return (
    <div className='homepage'>
      <img src={elliptical} alt='elliptical' />
      <h2>Are you ready to get fit?</h2>
      <h2>
        Signup and start creating routines, add activities and never miss leg
        day! 🔥
      </h2>
    </div>
  );
};

export default Home;
