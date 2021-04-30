import React, { FC, useEffect } from 'react';

import { useHistory } from 'react-router-dom';

import { observer } from 'mobx-react';

import { Box, Button, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { Routes_Enum } from '../../constants';

import { useLazyQuery } from '@apollo/client';

import { useStoreContext } from '../../context/store.context';
import { SEND_FORM } from '../chat/queries/queries';

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
    authStore: { isAuth, setUser, getUser },
  } = useStoreContext()

  const history = useHistory();
  
  const [nickname, setName] = React.useState('');
  const [errorName, setErrorName] = React.useState(false);
  const [password, setPassword] = React.useState('');
  const [errorPassword, setErrorPassword] = React.useState(false);

  const [sendData, { loading, data }] = useLazyQuery(SEND_FORM, {
    variables: { nickname, password },
  });

  const classes = useStyles();
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  
  const handleSubmit = async (event: any) => {
    event.preventDefault();

    if (nickname.length < 6) {
      setErrorName(true);

      return;
    } else if (password.length < 6) {
      setErrorName(false);
      setErrorPassword(true);

      return;
    } else {
      sendData()
    }
  };

  const fillUser = () => {
    localStorage.setItem('token', data.login.access_token)

    if (localStorage.getItem('token')) {
      setErrorName(false);
      setErrorPassword(false);

      setUser(data)

      history.push(Routes_Enum.CHAT);
    }   
  }

  const handleChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  useEffect(() => {
    // if (!isAuth) {
    //   history.push(Routes_Enum.AUTH);
    // }
    if (isAuth) {
      if (data) {
        fillUser()
      }
    }
    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [history, isAuth, data]);

  console.log("login form user:", getUser)

  return (
    <Box className={classes.root}>
      <form onSubmit={handleSubmit} className={classes.form}>
        <Box mt="120px" display="flex" justifyContent="center">
          <TextField
            onChange={handleChangeName}
            value={nickname}
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
          <Button disabled={loading} type="submit" className={classes.button}>
            Login
          </Button>
        </Box>
      </form>
    </Box>
  );
});
