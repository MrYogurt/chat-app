import { Box, makeStyles } from '@material-ui/core';
import React, { FC } from 'react';
import { MessageItem } from './message.item';

const useStyles = makeStyles({
  root: {
    mt: '2vh',
    height: '68vh',
    overflow: "auto",
  },
});

export const MessageWindow: FC = () => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <MessageItem />
    </Box>
  );
};
