import AuthFormItem from 'components/auth-form-item/AuthFormItem';
import { useValidate, useDisable } from 'hooks/validate.js';
import { NavLink, useLocation } from 'react-router-dom';
import { useEffect, useRef } from 'react';

function AuthForm({ handleSubmit, responseError }) {
  const { values, error, handleChange } = useValidate();
  const { disabled, validateInputs } = useDisable();

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleSubmit(values);
  };

  // button
  const { pathname } = useLocation();

  function getAuthTextContent() {
    const info = { caption: '', linkText: '', linkPath: '', buttonText: '' };
    if (pathname === '/signup') {
      info.caption = 'Уже зарегистрированы?';
      info.linkText = 'Войти';
      info.linkPath = '/signin';
      info.buttonText = 'Зарегистрироваться';
      return info;
    }
    info.caption = 'Ещё не зарегистрированы?';
    info.linkText = 'Регистрация';
    info.linkPath = '/signup';
    info.buttonText = 'Войти';
    return info;
  }

  const { caption, linkText, linkPath, buttonText } = getAuthTextContent();

  const formInputs = useRef(null);
  useEffect(() => {
    validateInputs(error, formInputs.current.elements);
  }, [error]);

  return (
    <form id='auth-form' className='auth-form' onSubmit={handleFormSubmit}>
      <fieldset ref={formInputs} className='auth-form__container'>
        {pathname === '/signup' && (
          <AuthFormItem
            onChange={handleChange}
            errorMsg={error.name}
            value={values.name || ''}
            label='Имя'
            name='name'
            type='text'
            required
            minLength={2}
            autoComplete='username'
            placeholder='Имя'
          />
        )}

        <AuthFormItem
          onChange={handleChange}
          errorMsg={error.email}
          value={values.email || ''}
          label='E-mail'
          type='email'
          name='email'
          required
          autoComplete='email'
          placeholder='E-mail'
        />
        <AuthFormItem
          onChange={handleChange}
          errorMsg={error.password}
          value={values.password || ''}
          label='Пароль'
          type='password'
          name='password'
          required
          minLength={5}
          autoComplete='current-password'
          placeholder='Пароль'
        />
      </fieldset>
      <div className='auth-form__footer'>
        {responseError && (
          <span className='auth-form__error-message'>
            При попытке авторизации произошла ошибка.
          </span>
        )}
        <button
          type='submit'
          className={`auth-form__button ${
            disabled ? 'auth-form__button_disabled' : ''
          }`}
          disabled={disabled}>
          {buttonText}
        </button>
        <span className='auth-form__caption'>
          {caption}
          <NavLink to={linkPath} className='auth-form__link'>
            {linkText}
          </NavLink>
        </span>
      </div>
    </form>
  );
}

export default AuthForm;
