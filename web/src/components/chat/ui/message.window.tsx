import React, { FC, useEffect, useRef } from 'react';

import { Box, makeStyles } from '@material-ui/core';

import { MessageItems } from './message.items';
import { useStoreContext } from '../../../context/store.context';
import { observer } from 'mobx-react';
import { toJS } from 'mobx';

import { gql, useQuery } from '@apollo/client';

const useStyles = makeStyles({
  root: {
    mt: '2vh',
    height: '68vh',
    overflow: "auto",
    '&::-webkit-scrollbar': {
      width: '10px'
    },
    '&::-webkit-scrollbar-track': {
      '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.00)'
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: 'rgba(0,0,0,.1)',
    }
  },
});

// const INITIALIZE_MESSAGES = gql`
//   query initializeMessages {
//     initializeMessages {
//       id
//       message
//       sender_name
//       sender_id
//       send_date
//       }  
//     }
// `;

export const MessageWindow: FC = observer(() => {
  const {
    authStore: { getUser },
    messagesStore: { messages, getMessages, getInitialMessages, fetchMoreMessages },
  } = useStoreContext()

  // const { loading, error, data } = useQuery(INITIALIZE_MESSAGES)
  
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
    // console.log("checkData:", data, INITIALIZE_MESSAGES)
    
    if (!messages) {
      if(user) {
        getInitialMessages().then(() => {
          scrollOnLoad()
        })
      }
    }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages, getUser])

  

  return (
    <Box className={classes.root} onScroll={handleScroll}>
      {messages ? <MessageItems messages={messages} user={getUser} messagesEndRef={messagesEndRef}/> : null}
    </Box>
  );
});
