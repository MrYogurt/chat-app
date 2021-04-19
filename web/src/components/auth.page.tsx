import { FC, useLayoutEffect } from 'react';

import { Routes_Enum } from '../constants';
import { useHistory } from 'react-router-dom';
import { LoginForm } from './login/login.form';

export const AuthPage: FC = () => {
  const history = useHistory();
  const isAuth = false;

  useLayoutEffect(() => {
    if (isAuth) {
      history.push(Routes_Enum.CHAT);
    }
  }, [history, isAuth]);

  return <>{isAuth !== null && !isAuth && <LoginForm />}</>;
};
