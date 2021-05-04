import { FC } from 'react';
import { Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
  },
});

export const PageNotFound: FC = () => {
  const classes = useStyles();

  return <Box className={classes.root}>♂️ BOY NEXT DOOR ♂️</Box>;
};
