import { FC, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { observer } from "mobx-react"

import { Routes_Enum } from '../constants';
import { useStoreContext } from '../context/store.context';

import { useLazyQuery } from '@apollo/client';
import { CHECK_AUTH, WHO_AM_I } from '../queries/queries';

export const AuthPage: FC = observer(() => {
  const {
    authStore: { isAuth, setAuth, setUser },
  } = useStoreContext()

  const [whoAmI, { ...rest }] = useLazyQuery(WHO_AM_I);

  const [checkToken, { data }] = useLazyQuery(CHECK_AUTH);
  
  const history = useHistory();

  const checkValidToken = (token: string) => {

    if (!data) {
      return checkToken({variables: {
        token: token
      }})
    }

    if (data) {
      return whoAmI()
    }
  }

  const fillUser = (payload: any) => {

    if (payload) {
      setUser(payload)

      setAuth(true)
    }
  }

  useEffect(() => {
    const token = localStorage.getItem('token')

    if (isAuth) {
      return history.push(Routes_Enum.CHAT);
    }

    if (!isAuth) {
      
      if (token) {

        if (data) {

          if (rest?.data?.whoAmI) {
            return fillUser(rest.data.whoAmI)
          }
          return whoAmI()
        }

        if (!data) {
          return checkValidToken(token)
        }
      }

      if (!token) {
        return history.push(Routes_Enum.AUTH);
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuth, history, data, rest?.data?.whoAmI])

  console.log("env:", process.env)
  return null;
});
