import React from 'react';
import '../css/Home.css';
import elliptical from '../images/elliptical.png';

const Home = () => {
  return (
    <div>
      <img src={elliptical} alt='elliptical' className='home-image' />
      <h2 className='home-message'>Are you ready to get fit?</h2>
      <h2 className='home-message'>
        Signup and start creating routines, add activities and never miss leg
        day! 🔥
      </h2>
    </div>
  );
};

export default Home;
