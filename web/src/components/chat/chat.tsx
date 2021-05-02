import { FC, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { Box, makeStyles } from '@material-ui/core';

import { useLazyQuery } from '@apollo/client';

import { Routes_Enum } from '../../constants';

import { useStoreContext } from '../../context/store.context';

import { InputMessage } from './ui/input.message';
import { MessageWindow } from './ui/message.window';

import { CHECK_AUTH } from '../../queries/queries';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    flexDirection: 'column',
    background: '#87CEEB',
  },
  chatWindow: {
    display: 'flex',
    justifyContent: 'center',
    height: '80vh',
    width: '700px',
    boxShadow: '0 0 7px',
    borderRadius: '5px 5px 5px 5px',
    background: '#e8e8e8',
  },
});

export const Chat: FC = () => {
  const {
    authStore: { isAuth }
  } = useStoreContext()

  const classes = useStyles();
  const history = useHistory();

  const [checkToken, { data }] = useLazyQuery(CHECK_AUTH, {
    onCompleted: data => {

      if (!data.checkAuth) {
        return history.push(Routes_Enum.MAIN);
      }
    },
  });

  useEffect(() => {
    if (!isAuth) {
      history.push(Routes_Enum.MAIN);
    }

    if (isAuth) {

      if (!data) {
        const token = localStorage.getItem('token')

        checkToken({variables: {
          token: token
        }})
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [history, isAuth, data])

  return (
    <Box className={classes.root}>
      <Box className={classes.chatWindow}>
        <Box display="flex" flexDirection="column">
          {isAuth && 
          <>
          <MessageWindow />
          <InputMessage />
          </>}
        </Box>
      </Box>
    </Box>
  );
};
