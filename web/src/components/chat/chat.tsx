import { Box, makeStyles } from '@material-ui/core';
import React, { FC } from 'react';
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
  const classes = useStyles();
  return (
    <Box className={classes.root}>
      <Box mt="5vh" className={classes.header}>
        Dungeon Chat
      </Box>

      <Box mt="5vh" mb="10vh" className={classes.chatWindow}>
        <Box display="flex" flexDirection="column">
          <MessageWindow />
          <InputMessage />
        </Box>
      </Box>
    </Box>
  );
};
