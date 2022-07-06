import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Logout } from './index';
import { IconContext } from 'react-icons';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import useUser from './hooks/useUser';
import '../css/Sidebar.css';

function Sidebar() {
  const [sidebar, setSidebar] = useState(true);
  const toggleSidebar = () => setSidebar(!sidebar);
  const { token } = useUser();

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
            {
              <li className='nav-text'>
                <Link to='/'>
                  {<AiIcons.AiFillHome />}
                  <span>Home</span>
                </Link>
              </li>
            }
            {
              <li className='nav-text'>
                <Link to='/routines'>
                  {<IoIcons.IoMdFitness />}
                  <span>Routines</span>
                </Link>
              </li>
            }
            {
              <li className='nav-text'>
                <Link to='/activities'>
                  {<FaIcons.FaRunning />}
                  <span>Activities</span>
                </Link>
              </li>
            }
            {!token && (
              <li className='nav-text'>
                <Link to='/login'>
                  {<AiIcons.AiOutlineLogin />}
                  <span>Login</span>
                </Link>
              </li>
            )}
            {
              <li className='nav-text'>
                <Link to='/register'>
                  {<AiIcons.AiOutlineUserAdd />}
                  <span>Signup</span>
                </Link>
              </li>
            }
            {token && (
              <li className='nav-text'>
                <Link to='/profile'>
                  {<AiIcons.AiOutlineProfile />}
                  <span>Profile</span>
                </Link>
              </li>
            )}

            {token && <Logout />}
            <li className='nav-text' id='source-code'>
              <a
                href='https://icons8.com/illustrations/author/cj62pzCRUq1N'
                target='_blank'
                rel='noopener noreferrer'
              >
                <IoIcons.IoMdImages />
                <span>Image Credit</span>
              </a>
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
