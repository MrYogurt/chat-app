import React, { FC, useEffect } from 'react';

import { useHistory } from 'react-router-dom';

import { observer } from 'mobx-react';

import { Box, Button, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { Routes_Enum } from '../../constants';

import { gql, useLazyQuery } from '@apollo/client';

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

const SEND_FORM = gql`
  query catchData {
    catchData {
      nickname,
      password,
    }
  }
`;

export const LoginForm: FC = observer(() => {
  const {
    authStore: { authStatus, setUser },
  } = useStoreContext()
  
  const [nickname, setName] = React.useState('');
  const [errorName, setErrorName] = React.useState(false);
  const [password, setPassword] = React.useState('');
  const [errorPassword, setErrorPassword] = React.useState(false);

  const [getDog, { loading, data }] = useLazyQuery(SEND_FORM, {
    variables: { nickname, password},
  });

  const classes = useStyles();
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const axios = require('axios').default;

  
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

      // await axios({
      //   method: "POST",
      //     url: "http://localhost:5000/graphql",
      //     headers: {
      //       "Content-Type": "application/json",
      //       Accept: "application/json",
      //     },
      //     data: {
      //       variables: {
      //         data: {
      //           nickname,
      //           password,
      //         },
      //       },
      //       query: `query getUser($data: UserInput!) {
      //         catchData(data: $data) {
      //           id
      //           nickname
      //           registration_date
      //         }
      //     }`,
      //     },
      // }).then((result: any) => {
      //   setUser(result.data.data.catchData)

      //   setErrorName(false);
      //   setErrorPassword(false);

      // }).catch((err: string) => {
      //   console.log("err:", err)
      // });

      // setUser(result.data.data.catchData)

      getDog()

      setErrorName(false);
      setErrorPassword(false);
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
          <Button type="submit" className={classes.button}>
            Login
          </Button>
        </Box>
      </form>
    </Box>
  );
});
