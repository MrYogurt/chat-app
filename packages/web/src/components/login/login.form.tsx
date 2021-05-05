import React, { FC, useEffect } from 'react';

import { useHistory } from 'react-router-dom';

import { observer } from 'mobx-react';

import { Box, Button, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { Routes_Enum } from '../../constants';

import { useLazyQuery, useMutation } from '@apollo/client';

import { useStoreContext } from '../../context/store.context';
import { SEND_LOGIN, SEND_REGISTER } from '../../queries/queries';

interface IUser {
  id: number,
  nickname: string,
  registration_date: any,
  access_token: string,
}

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
    marginTop: '20px',
    margin: '10px',
  },
  errorForm: {
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    maxWidth: '400px',
    marginTop: "20px",
    height: "20px",
  },
});

export const LoginForm: FC = observer(() => {
  const {
    authStore: { setUser }
  } = useStoreContext()

  const history = useHistory();
  
  const [nickname, setName] = React.useState('');
  const [errorName, setErrorName] = React.useState(false);
  const [password, setPassword] = React.useState('');
  const [errorPassword, setErrorPassword] = React.useState(false);
  const [errorForm, setErrorForm] = React.useState("");

  const [sendLogin, { loading }] = useLazyQuery(SEND_LOGIN, {onCompleted: data => {

    if (!data.login) {
      return setErrorForm("Login failed")
    }

    if (data.login) {
      setErrorForm("")

      fillUser(data.login)
    }
  },
  onError: err => {
    console.log("Login query failed:", err)
  }
});

const [sendRegister, { ...rest }] = useMutation(SEND_REGISTER, {onCompleted: data => {

  if (!data.register) {
    return setErrorForm("Register failed, already exist")
  }

  if (data.register) {
    setErrorForm("")

    fillUser(data.register)
  }
},
onError: err => {
  console.log("Registartion query failed:", err)
}
});

  const classes = useStyles();
  
  const handleLogin = async (event: any) => {
    event.preventDefault();

    if (nickname.length < 6) {
      setErrorName(true);

      return;
    } else if (password.length < 6) {
      setErrorName(false);
      setErrorPassword(true);

      return;
    } else {
      sendLogin({variables: { nickname, password }})
    }
  };

  const handleRegister = async (event: any) => {
    event.preventDefault();

    if (nickname.length < 6) {
      setErrorName(true);

      return;
    } else if (password.length < 6) {
      setErrorName(false);
      setErrorPassword(true);

      return;
    } else {
      sendRegister({variables: { nickname, password }})
    }
  };

  const fillUser = (data: IUser) => {

    localStorage.setItem('token', data.access_token)

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

  return (
    <Box className={classes.root}>
      <form className={classes.form}>
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
        <Box className={classes.errorForm}>
          <Box>{errorForm}</Box>
        </Box>

        <Box mt="20px" display="flex" justifyContent="center">
            
          <Button disabled={loading || rest.loading} onClick={handleLogin} className={classes.button}>
            Login
          </Button>

          <Button disabled={loading || rest.loading} onClick={handleRegister} className={classes.button}>
            Register
          </Button>
        </Box>
      </form>
    </Box>
  );
});
