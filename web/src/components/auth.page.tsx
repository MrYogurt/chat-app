import { FC, useLayoutEffect } from 'react';
import { observer } from "mobx-react"

import { Routes_Enum } from '../constants';
import { useHistory } from 'react-router-dom';
import { LoginForm } from './login/login.form';
import { useStoreContext } from '../context/store.context';

export const AuthPage: FC = observer(() => {
  const {
    authStore: { authStatus },
  } = useStoreContext()
  
  const history = useHistory();
  const isAuth = authStatus;

  useLayoutEffect(() => {
    if (isAuth) {
      history.push(Routes_Enum.CHAT);
    }
  }, [history, isAuth]);

  return <>{isAuth !== null && !isAuth && <LoginForm />}</>;
});
