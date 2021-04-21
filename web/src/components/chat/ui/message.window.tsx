import { Box, makeStyles } from '@material-ui/core';
import React, { FC } from 'react';
import { MessageItems } from './message.items';

const useStyles = makeStyles({
  root: {
    mt: '2vh',
    height: '68vh',
    overflow: "auto",
    width: '72.7%',
  },
});

export const MessageWindow: FC = () => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <MessageItems />
    </Box>
  );
};
