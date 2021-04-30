import React, { FC, Fragment, useEffect, useLayoutEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { observer } from "mobx-react"

import { Routes_Enum } from '../constants';
import { useStoreContext } from '../context/store.context';

import { LoginForm } from './login/login.form';
import { useLazyQuery } from '@apollo/client';
import { CHECK_AUTH } from './chat/queries/queries';

export const AuthPage: FC = observer(() => {
  const {
    authStore: { setAuth, isAuth },
  } = useStoreContext()

  const [checkAuth, { loading, data }] = useLazyQuery(CHECK_AUTH);
  
  const history = useHistory();
  // const isAuth = authStatus;

  useEffect(() => {
    const token = localStorage.getItem('token')

    if (token) {
      checkAuth({variables: {
        token: token
      }})

      if (isAuth) {
        history.push(Routes_Enum.CHAT);
      }
  
      if (!isAuth) {
        history.push(Routes_Enum.AUTH);
      }
    }

    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [history, isAuth]);

  useEffect(() => {
    if (data) {
      setAuth(true)
    }

    if (!data) {
      setAuth(false)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

  return <>{isAuth !== null && !isAuth && <LoginForm />}</>;
});
