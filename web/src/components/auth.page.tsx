import React, { FC, Fragment, useLayoutEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { observer } from "mobx-react"

import { Routes_Enum } from '../constants';
import { useStoreContext } from '../context/store.context';

import { LoginForm } from './login/login.form';

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

    if (!isAuth) {
      history.push(Routes_Enum.AUTH);
    }
  }, [history, isAuth]);

  return <>{isAuth !== null && !isAuth && <LoginForm />}</>;
});
