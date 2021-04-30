import React, { FC, Fragment, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { observer } from "mobx-react"

import { Routes_Enum } from '../constants';
import { useStoreContext } from '../context/store.context';

import { LoginForm } from './login/login.form';
import { useLazyQuery } from '@apollo/client';
import { CHECK_AUTH, WHO_AM_I } from './chat/queries/queries';

export const AuthPage: FC = observer(() => {
  const {
    authStore: { setAuth, isAuth, setUser, getUser },
  } = useStoreContext()

  const [whoAmI, { ...rest }] = useLazyQuery(WHO_AM_I);

  const [checkAuth, { data }] = useLazyQuery(CHECK_AUTH);
  
  const history = useHistory();

  useEffect(() => {
    const token = localStorage.getItem('token')

    if (token) {
      checkAuth({variables: {
        token: token
      }})
      whoAmI({variables: {
        token: token
      }})
    }

    if (isAuth) {
      return history.push(Routes_Enum.CHAT);
    }

    if (!isAuth) {
      return history.push(Routes_Enum.AUTH);
    }
    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [history, isAuth]);

  useEffect(() => {
    const token = localStorage.getItem('token')
    
    if (data) {
      setAuth(true)
    }

    if (!data) {
      setAuth(false)
    }

    if (rest?.data?.whoAmI) {

      console.log("setUser check:", rest?.data?.whoAmI)

      setUser(rest.data.whoAmI)
    }

    if(!rest) {
      whoAmI({variables: {
        token: token
      }})
    }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, rest])

  console.log("auth page user:", getUser)

  return <>{isAuth !== null && !isAuth && <LoginForm />}</>;
});
