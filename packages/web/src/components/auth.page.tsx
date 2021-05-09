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

  const history = useHistory();

  const [whoAmI] = useLazyQuery(WHO_AM_I, {onCompleted: content => {
    fillUser(content.whoAmI)
  },
  onError: err => {
    console.log("Who Am I query failed:", err)
    
    localStorage.removeItem('token')
    history.push(Routes_Enum.AUTH);
  }
});

  const [checkToken, { data }] = useLazyQuery(CHECK_AUTH, {onCompleted: result => {
    whoAmI()
  },
  onError: err => {
    console.log("Check token query failed:", err)
  }
});

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

        if (!data) {
          return checkValidToken(token)
        }
      }

      if (!token) {
        return history.push(Routes_Enum.AUTH);
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuth, history, data])

  return null;
});
