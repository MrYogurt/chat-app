import React, { FC } from 'react';

import { useHistory } from 'react-router-dom';

import { Box } from '@material-ui/core';

import { useMutation } from '@apollo/client';

import { useStoreContext } from '../../../context/store.context';
import { SEND_MESSAGE } from '../../../queries/queries';
import { Routes_Enum } from '../../../constants';

import { Row } from '../../ui/row';

import { SendMessageSubmit } from './submit.button';
import { TextFieldMessage } from './text.field.message';

export const InputMessage: FC = () => {
  const {
    authStore: { getUser },
  } = useStoreContext()

  const history = useHistory();

  const [message, setMessage] = React.useState('');

  const [ sendMessage ] = useMutation(SEND_MESSAGE, {onError: err => {
    console.log("Send message error:", err)

    if (err.toString().indexOf('Unauthorized') > -1) {
      history.push(Routes_Enum.AUTH);
    }
  }})

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if(getUser && message.length >= 1) {
      sendMessage({
        variables: {
          data: {
            sender_id: getUser.id,
            sender_name: getUser.nickname,
            message: message
          }
        }
      })

      setMessage("")
      
    }
  };

  return (
    <Box mt="20px" mb="10px" ml="15%" display="flex" justifyContent="center">
      <form onSubmit={handleSubmit}>
        <Row
          left={<TextFieldMessage message={message} setMessage={setMessage} />}
          right={<SendMessageSubmit send={handleSubmit} />}
        />
      </form>
    </Box>
  );
};
