import AuthForm from 'components/auth-form/AuthForm';
import AuthPage from 'components/auth-page/AuthPage';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Login({ handleLogin, error, setAuthError, isLoggedIn }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/');
    }
  }, [isLoggedIn]);

  return (
    <AuthPage heading='Рады видеть!'>
      <AuthForm
        handleSubmit={handleLogin}
        responseError={error}
        setAuthError={setAuthError}
      />
    </AuthPage>
  );
}

export default Login;
