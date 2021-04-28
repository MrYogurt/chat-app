import React, { FC } from 'react';

import { Box } from '@material-ui/core';

import { useStoreContext } from '../../../context/store.context';
import { Row } from '../../ui/row';

import { SendMessageSubmit } from './submit.button';
import { TextFieldMessage } from './text.field.message';
import { SEND_MESSAGE } from '../queries/queries';
import { useLazyQuery } from '@apollo/client';


export const InputMessage: FC = () => {
  const {
    authStore: { getUser },
  } = useStoreContext()

  const [message, setMessage] = React.useState('');

  const [ sendMessage ] = useLazyQuery(SEND_MESSAGE)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if(getUser && message.length >= 1) {
      sendMessage({
        variables: {
          data: {
            sender_id: getUser?.catchData.id,
            sender_name: getUser?.catchData.nickname,
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
