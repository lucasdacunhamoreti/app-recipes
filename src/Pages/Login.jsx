import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

export default function Login() {
  const history = useHistory();
  const [verifyEmail, setVerifyEmail] = useState(false);
  const [verifyPassword, setVerifyPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const validityEmail = (newEmail) => {
    // https://www.horadecodar.com.br/2020/09/13/como-validar-email-com-javascript/
    const response = /\S+@\S+\.\S+/;
    setEmail(newEmail);
    setVerifyEmail(response.test(newEmail));
  };

  const validitypassword = (newPassword) => {
    const min = 7;
    const response = newPassword.length >= min;
    setPassword(newPassword);
    setVerifyPassword(response);
  };

  const inputHandleChange = ({ target }) => {
    const { value, name } = target;

    if (name === 'email') validityEmail(value);
    if (name === 'password') validitypassword(value);
  };

  const saveTokens = () => {
    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('cocktailsToken', 1);
    const jsonEmail = JSON.stringify({ email });
    localStorage.setItem('user', jsonEmail);
    history.push('/foods');
  };

  return (
    <div>
      <input
        name="email"
        value={ email }
        type="email"
        placeholder="email"
        data-testid="email-input"
        onChange={ inputHandleChange }
      />
      <input
        name="password"
        value={ password }
        type="password"
        placeholder="password"
        data-testid="password-input"
        onChange={ inputHandleChange }
      />
      <button
        disabled={ !verifyEmail || !verifyPassword }
        type="submit"
        data-testid="login-submit-btn"
        onClick={ saveTokens }
      >
        Enter
      </button>
    </div>
  );
}
