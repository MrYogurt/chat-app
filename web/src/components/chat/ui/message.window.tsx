import React, { FC, useEffect, useRef, useState } from 'react';

import { Box, makeStyles } from '@material-ui/core';

import { MessageItems } from './message.items';
import { useStoreContext } from '../../../context/store.context';
import { toJS } from 'mobx';

import { useQuery } from '@apollo/client';
import { FETCH_MORE } from '../queries/queries';

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

export const MessageWindow: FC = () => {
  const {
    authStore: { getUser },
  } = useStoreContext()

  const { data, fetchMore } = useQuery(FETCH_MORE, {
    variables: {
      offset: 0,
      limit: 20,
    }
  })

  const [ messages, setMessages ] = useState<any>()
  
  const classes = useStyles();

  const messagesEndRef = useRef(null)

  const scrollOnLoad = () => {
    const toUse: React.RefObject<any> = messagesEndRef
    toUse.current.scrollIntoView({ behavior: 'smooth' })
  }

  const handleScroll = (event: React.UIEvent<any>) => {
    const target = event.target as HTMLUListElement

      if (target.scrollTop === 0) {

        fetchMore({
          variables: {
            offset: data.fetchMore.length,
          },
          updateQuery: (previous: any, { fetchMoreResult }: any) => {
            
            const result = [...fetchMoreResult.fetchMore, ...previous.fetchMore];

            setMessages(result)

            return result;
          }
        })     
      }
  }

  useEffect(() => {
    const user = toJS(getUser)

    if (data) {
      if(user) {
        if(!messages) {
          setMessages(data.fetchMore)
        }
      }
    }

    if(messages?.length < 21) {
      if (user) {
        scrollOnLoad()
      }
    }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, messages, getUser])

  

  return (
    <Box className={classes.root} onScroll={handleScroll}>
      {messages ? <MessageItems messages={messages} user={getUser} messagesEndRef={messagesEndRef}/> : null}
    </Box>
  );
};
