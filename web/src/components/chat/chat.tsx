import React, { FC, useLayoutEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { Box, makeStyles } from '@material-ui/core';

import { Routes_Enum } from '../../constants';

import { useStoreContext } from '../../context/store.context';

import { InputMessage } from './ui/input.message';
import { MessageWindow } from './ui/message.window';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    alignItems: 'center',
    height: '100vh',
    flexDirection: 'column',
    background: '#87CEEB',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    height: '50px',
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
    authStore: { isAuth },
  } = useStoreContext()

  const classes = useStyles();
  const history = useHistory();

  useLayoutEffect(() => {
    if (!isAuth) {
      history.push(Routes_Enum.AUTH);
    }
    if (isAuth) {
      history.push(Routes_Enum.CHAT);
    }
  }, [history, isAuth])
  return (
    <Box className={classes.root}>
      <Box mt="5vh" className={classes.header}>
        Dungeon Chat
      </Box>

      <Box mt="5vh" mb="10vh" className={classes.chatWindow}>
        <Box display="flex" flexDirection="column">
          {isAuth ? 
          <>
          <MessageWindow />
          <InputMessage />
          </> : null}
        </Box>
      </Box>
    </Box>
  );
};
