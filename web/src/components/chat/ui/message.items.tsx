import React, { FC } from 'react';

import { List, makeStyles } from '@material-ui/core';

import { MessageItem } from './message.item';
import { toJS } from 'mobx';

const useStyles = makeStyles( {
  root: {
    display: 'flex',
    flexDirection: 'column',
  },
});

interface IMessageItems {
  messages: any
  user: any
  messagesEndRef: React.MutableRefObject<null>
}

export const MessageItems: FC <IMessageItems> = ({messages, user, messagesEndRef}) => {
  const classes = useStyles();

  const reversedMessages = [...messages].reverse()

  console.log("reversedMessages:", reversedMessages)

  return (
    <List className={classes.root}>      
      {reversedMessages.map((item:any) => {
        const parsedUser = toJS(user)

        if(parsedUser.nickname !== item.sender_name) {
          return (
            <MessageItem key={item.id} direction={"in"} senderName={item.sender_name} message={item.message}/>
          )
        } else {
          return (
            <MessageItem key={item.id} direction={"out"} senderName={item.sender_name} message={item.message}/>
          )
        }
      })}
      <div ref={messagesEndRef}></div>
    </List>
  );
};
