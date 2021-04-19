import {
  Box,
  Button,
  createStyles,
  makeStyles,
  Theme,
} from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
import React, { FC } from 'react';

interface IButtonSend {
  send: (e: any) => void;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      margin: theme.spacing(1),
      height: '56px',
    },
  }),
);

export const SendMessageSubmit: FC<IButtonSend> = ({ send }) => {
  const classes = useStyles();

  return (
    <Box mt="-8px">
      <Button
        className={classes.button}
        variant="contained"
        color="primary"
        endIcon={<SendIcon />}
        onClick={send}
      />
    </Box>
  );
};
