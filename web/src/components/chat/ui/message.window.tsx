import React, { FC, useEffect, useRef } from 'react';

import { Box, makeStyles } from '@material-ui/core';

import { MessageItems } from './message.items';
import { useStoreContext } from '../../../context/store.context';
import { observer } from 'mobx-react';
import { toJS } from 'mobx';

const useStyles = makeStyles({
  root: {
    mt: '2vh',
    height: '68vh',
    overflow: "auto",
  },
});

export const MessageWindow: FC = observer(() => {
  const {
    authStore: { getUser },
    messagesStore: { messages, getMessages, getInitialMessages, fetchMoreMessages },
  } = useStoreContext()
  
  const classes = useStyles();

  const messagesEndRef = useRef(null)

  const scrollOnLoad = () => {
    const toUse: React.RefObject<any> = messagesEndRef
    toUse.current.scrollIntoView({ behavior: 'smooth' })
  }

  const handleScroll = (event: React.UIEvent<any>) => {
    const target = event.target as HTMLUListElement

      if (target.scrollTop === 0) {
        fetchMoreMessages(messages.length)
      }
  }

  useEffect(() => {
    const user = toJS(getUser)
    
    if (!messages) {
      if(user) {
        getInitialMessages().then(() => {
          scrollOnLoad()
        })
      }
    }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getMessages, getUser])

  

  return (
    <Box className={classes.root} onScroll={handleScroll}>
      {getMessages ? <MessageItems messages={getMessages} user={getUser} messagesEndRef={messagesEndRef}/> : null}
    </Box>
  );
});
