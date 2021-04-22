import React, { FC, useEffect } from 'react';

import { useHistory } from 'react-router-dom';

import { observer } from 'mobx-react';

import { Box, Button, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { Routes_Enum } from '../../constants';

import { useStoreContext } from '../../context/store.context';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
  },
  form: {
    width: '300px',
    marginTop: '10vh',
    background: 'white',
    height: '500px',
    maxHeight: '90vh',
    boxShadow: '0 0 7px',
    borderRadius: '5px 5px 5px 5px',
  },
  button: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',
    height: 48,
    padding: '0 30px',
    maxWidth: '150px',
    mt: '20px',
  },
});

export const LoginForm: FC = observer(() => {
  const {
    authStore: { authStatus, setUser },
  } = useStoreContext()

  const classes = useStyles();
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const axios = require('axios').default;

  const [name, setName] = React.useState('');
  const [errorName, setErrorName] = React.useState(false);
  const [password, setPassword] = React.useState('');
  const [errorPassword, setErrorPassword] = React.useState(false);

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    if (name.length < 6) {
      setErrorName(true);

      return;
    } else if (password.length < 6) {
      setErrorName(false);
      setErrorPassword(true);

      return;
    } else {
      const result = await axios({
        method: 'POST',
        url: 'http://localhost:5000/auth',
        data: { nickname: name, password: password } })

      if(result.data !== "") {
        setUser(result)

        setErrorName(false);
        setErrorPassword(false);
      }
    }
  };

  const handleChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const history = useHistory();

  useEffect(() => {
    if (!authStatus) {
      history.push(Routes_Enum.AUTH);
    }
    if (authStatus) {
      history.push(Routes_Enum.CHAT);
    }
  }, [history, authStatus]);

  return (
    <Box className={classes.root}>
      <form onSubmit={handleSubmit} className={classes.form}>
        <Box mt="120px" display="flex" justifyContent="center">
          <TextField
            onChange={handleChangeName}
            value={name}
            id="outlined-nickname"
            label="Nickname"
            variant="outlined"
            required={true}
            error={errorName}
          />
        </Box>
        <Box mt="20px" display="flex" justifyContent="center">
          <TextField
            onChange={handleChangePassword}
            value={password}
            id="outlined-password"
            type="password"
            label="Password"
            variant="outlined"
            required={true}
            error={errorPassword}
          />
        </Box>
        <Box mt="20px" display="flex" justifyContent="center">
          <Button type="submit" className={classes.button}>
            Login
          </Button>
        </Box>
      </form>
    </Box>
  );
});
