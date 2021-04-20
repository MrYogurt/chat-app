import { Box } from '@material-ui/core';
import React, { FC } from 'react';
import { Actions_Enum } from '../../../constants';
import { useStoreContext } from '../../../context/store.context';
import { Row } from '../../ui/row';
import { SendMessageSubmit } from './submit.button';
import { TextFieldMessage } from './text.field.message';
import { toJS } from 'mobx';

export const InputMessage: FC = () => {
  const {
    authStore: { getUser },
  } = useStoreContext()

  const [message, setMessage] = React.useState('');

  const axios = require('axios');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const user = toJS(getUser)

    if(user) {
      await axios({
        method: 'POST',
        url: 'http://localhost:5000/chat',
        data: { sender_id: user.id, sender_name: user.nickname, msg: user, action: Actions_Enum.ADD_MESSAGE }
      }).then(() => {
        console.log("successful")
      }).catch((err: any) => {
        console.log("error:", err)
      })
    }
  };

  return (
    <Box mt="10px" ml="15%" display="flex" justifyContent="center">
      <form onSubmit={handleSubmit}>
        <Row
          left={<TextFieldMessage message={message} setMessage={setMessage} />}
          right={<SendMessageSubmit send={handleSubmit} />}
        />
      </form>
    </Box>
  );
};
