import { Dispatch, FC, SetStateAction } from 'react';

import { Box, makeStyles, TextField } from '@material-ui/core';

interface IInputProps {
  message: string;
  setMessage: Dispatch<SetStateAction<string>>;
}

const useStyles = makeStyles({
  root: {
    display: 'flex',
    width: '400px',
  },
});

export const TextFieldMessage: FC<IInputProps> = ({ message, setMessage }) => {
  const classes = useStyles();

  const handleChange = (event: any) => {
    setMessage(event.target.value);
  };

  return (
    <Box className={classes.root}>
      <TextField
        id="outlined-basic"
        fullWidth={true}
        value={message}
        label="Input message"
        variant="outlined"
        onInput={handleChange}
      />
    </Box>
  );
};
