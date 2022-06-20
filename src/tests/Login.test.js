import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Login from '../Pages/Login';
import renderWithRouter from './RenderWithRouter';

describe('Testes da tela de Login', () => {
  it('Testa se ao entrar na página de Login o caminho é "/"', () => {
    const { history } = renderWithRouter(
      <Login />,
    );
    const { location: { pathname } } = history;
    expect(pathname).toBe('/');
  });

  it('Testa se é exibido os elementos na tela.', () => {
    renderWithRouter(
      <Login />,
    );
    const inputEmail = screen.getByTestId('email-input');
    const inputPassword = screen.getByTestId('password-input');
    const buttonLogin = screen.getByTestId('login-submit-btn');
    expect(inputEmail).toBeInTheDocument();
    expect(inputPassword).toBeInTheDocument();
    expect(buttonLogin).toBeInTheDocument();
  });

  it('Testa a funcionalidade do botão de Login', () => {
    const { history } = renderWithRouter(
      <Login />,
    );
    const buttonLogin = screen.getByTestId('login-submit-btn');
    expect(buttonLogin).toBeDisabled();

    const inputEmail = screen.getByTestId('email-input');
    const inputPassword = screen.getByTestId('password-input');
    userEvent.type(inputEmail, 'teste@teste.com');
    userEvent.type(inputPassword, 'teste@teste.com');

    expect(buttonLogin).not.toBeDisabled();

    userEvent.click(buttonLogin);

    const { location: { pathname } } = history;
    expect(pathname).toBe('/foods');
  });
});
