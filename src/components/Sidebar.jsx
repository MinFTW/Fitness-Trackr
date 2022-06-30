import React from 'react';
import { Link } from 'react-router-dom';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import * as GiIcons from 'react-icons/gi';
import { IconContext } from 'react-icons';
import '../css/Sidebar.css';

function Sidebar() {
  const data = [
    {
      title: 'Fitness Trackr',
      path: '/',
      icon: <FaIcons.FaRunning />,
      className: 'nav-text',
    },
    {
      title: 'Home',
      path: '/',
      icon: <AiIcons.AiFillHome />,
      className: 'nav-text',
    },
    {
      title: 'Routines',
      path: '/routines',
      icon: <IoIcons.IoMdFitness />,
      className: 'nav-text',
    },
    {
      title: 'Activities',
      path: '/activities',
      icon: <GiIcons.GiGymBag />,
      className: 'nav-text',
    },
    {
      title: 'Login',
      path: '/login',
      icon: <AiIcons.AiOutlineLogin />,
      className: 'nav-text',
    },
    {
      title: 'Signup',
      path: '/register',
      icon: <AiIcons.AiOutlineUserAdd />,
      className: 'nav-text',
    },
  ];

  return (
    <>
      <IconContext.Provider value={{ color: '#fff' }}>
        <nav className='nav-menu'>
          <ul className='nav-menu-items'>
            {data.map((item, index) => {
              return (
                <li key={index} className={item.className}>
                  <Link to={item.path}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
}

export default Sidebar;
