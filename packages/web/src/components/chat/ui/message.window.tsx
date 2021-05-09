import React, { FC, useEffect, useRef, useState } from 'react';

import { Box, makeStyles } from '@material-ui/core';

import { useQuery, useSubscription } from '@apollo/client';

import { observer } from 'mobx-react';

import { MessageItems } from './message.items';

import { useStoreContext } from '../../../context/store.context';
import { FETCH_MORE, MESSAGE_SUBSCRIPTION } from '../../../queries/queries';

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

export const MessageWindow: FC = observer(() => {
  const {
    authStore: { getUser, isAuth, user },
  } = useStoreContext()

  const { data, fetchMore } = useQuery(FETCH_MORE, {
    variables: {
      offset: 0,
      limit: 20,
    },
    onError: err => {
      console.log("Fetch more messages error:", err)
    }
  })

  const { ...rest } = useSubscription(MESSAGE_SUBSCRIPTION);

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

            if(!fetchMoreResult) {
              setMessages(previous)

              return
            }
            
            const result = [...previous.fetchMore, ...fetchMoreResult.fetchMore];

            setMessages(result)

            return result;
          }
        })     
      }
  }

  useEffect(() => {

    if (isAuth) {
      if (data) {
          if(!messages) {
            setMessages(data.fetchMore)
          }
      }
      
      if (getUser) {
        if(messages?.length < 21) {
          scrollOnLoad()
        }
      }

      if (rest.loading === false && rest.data) {
        scrollOnLoad()
      }
    }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, messages, isAuth, rest])

  useEffect(() => {

    if (isAuth) {
      if(messages) {
        if(rest?.data?.messageAdded?.message.length >= 1) {
            
            setMessages((prev: any) => [rest.data.messageAdded, ...prev])
        }
      }
    }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rest?.data?.messageAdded])

  return (
    <Box className={classes.root} onScroll={handleScroll}>
      {(messages && user) && <MessageItems messages={messages} user={getUser} messagesEndRef={messagesEndRef}/>}
    </Box>
  );
});
