import React, { useState } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import { Link } from 'react-router-dom';
import { IconContext } from 'react-icons';
import '../css/Sidebar.css';

const data = [
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
    title: 'My Routines',
    path: '/myroutines',
    icon: <IoIcons.IoMdFitness />,
    className: 'nav-text',
  },
  {
    title: 'Activities',
    path: '/activities',
    icon: <FaIcons.FaRunning />,
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

function Sidebar() {
  const [sidebar, setSidebar] = useState(true);
  const toggleSidebar = () => setSidebar(!sidebar);

  return (
    <>
      <IconContext.Provider value={{ color: '#fff' }}>
        <div className='sidebar'>
          <Link to='#' className='menu-bars'>
            <FaIcons.FaBars onClick={toggleSidebar} />
          </Link>
          <h1 className='app-title'>Fitness Trackr</h1>
        </div>
        <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
          <ul className='nav-menu-items'>
            <li className='navbar-toggle'>
              <Link to='#' className='menu-bars' onClick={toggleSidebar}>
                <AiIcons.AiOutlineClose />
              </Link>
            </li>
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
            <li className='nav-text' id='source-code'>
              <a
                href='https://github.com/MinFTW/Fitness-Trackr'
                target='_blank'
                rel='noopener noreferrer'
              >
                <FaIcons.FaGithub /> <span>Source Code</span>
              </a>
            </li>
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
}

export default Sidebar;
