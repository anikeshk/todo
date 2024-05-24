//import { useRef, useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '../context/AuthenticationProvider';

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = () => {
    login('admin', 'Test123');
    navigate('/');
  };
  handleLogin();

  return <div>LoginPage</div>;
};

export default LoginPage;
