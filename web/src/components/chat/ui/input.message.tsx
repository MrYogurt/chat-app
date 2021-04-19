import { Box } from '@material-ui/core';
import React, { FC } from 'react';
import { Row } from '../../ui/row';
import { SendMessageSubmit } from './submit.button';
import { TextFieldMessage } from './text.field.message';

export const InputMessage: FC = () => {
  const [message, setMessage] = React.useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(message);
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
