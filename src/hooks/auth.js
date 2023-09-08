import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login, register } from '../utils/mainApi';
import { saveToken } from '../utils/utils';

export default function useAuth() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState(false);

  function signOut() {
    localStorage.clear();
    navigate('/');
    setIsLoggedIn(false);
  }

  async function handleRegister(formData) {
    setError(false);
    try {
      await register(formData);

      const { email, password } = formData;
      handleLogin({ email, password });
    } catch (e) {
      setError(true);
    }
  }

  async function handleLogin(formData) {
    setError(false);
    try {
      const { token } = await login(formData);
      saveToken(token);
      setIsLoggedIn(true);
      navigate('/movies');
    } catch (e) {
      console.log(e);
      setError(true);
    }
  }

  return {
    signOut,
    handleLogin,
    handleRegister,
    error,
    isLoggedIn,
    setIsLoggedIn,
  };
}
