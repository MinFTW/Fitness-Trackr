import React from 'react';
import { Routes, Route } from 'react-router-dom';
import '../css/App.css';
import {
  Home,
  Sidebar,
  Routines,
  Activities,
  Profile,
  Login,
  Signup,
} from './index';

const App = () => {
  //   const [token, setToken] = useState('');
  //   const [username, setUsername] = useState('');
  //   const [password, setPassword] = useState('');
  //   const [posts, setPosts] = useState([]);
  //   const localStorageToken = localStorage.getItem('token');
  //   const localStorageUserName = localStorage.getItem('username');

  //   useEffect(() => {
  //     localStorageToken && setToken(localStorageToken);
  //     localStorageUserName && setUsername(localStorageUserName);
  //   }, [token]);

  return (
    <div id='app'>
      <Sidebar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/routines' element={<Routines />} />
        <Route path='/activities' element={<Activities />} />
        <Route path='/me' element={<Profile />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Signup />} />
      </Routes>
    </div>
  );
};

export default App;
