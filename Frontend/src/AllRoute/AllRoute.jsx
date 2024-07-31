import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Register from '../Pages/Auth/Register';
import Login from '../Pages/Auth/Login';
import Home from '../Pages/Home/Home';
import SetAvatar from '../Pages/Avatar/Avatar';

const AllRoute = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/avatar' element={<SetAvatar />} />
      </Routes>
    </div>
  );
};

export default AllRoute;
