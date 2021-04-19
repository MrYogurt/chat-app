import { Box, ListItem, makeStyles } from '@material-ui/core';
import React, { FC, useEffect, useRef } from 'react';

// interface IMessage {
//   message: any;
// }

const messages = [
  { name: "Abdul", msg: "kavo", time: "12:05", direction: "in"},
  { name: "Abdushmul", msg: "tavo", time: "10:02", direction: "in"},
  { name: "Magomed", msg: "eeee", time: "09:05", direction: "in"},
  { name: "Shamil", msg: "auauauaua", time: "21:22", direction: "out"},
  { name: "Abdul", msg: "kavo", time: "12:05", direction: "in"},
  { name: "Abdushmul", msg: "tavo", time: "10:02", direction: "in"},
  { name: "Magomed", msg: "eeee", time: "09:05", direction: "in"},
  { name: "Shamil", msg: "auauauaua", time: "21:22", direction: "out"},
  { name: "Abdul", msg: "kavo", time: "12:05", direction: "in"},
  { name: "Abdushmul", msg: "tavo", time: "10:02", direction: "in"},
  { name: "Magomed", msg: "eeee", time: "09:05", direction: "in"},
  { name: "Shamil", msg: "auauauaua", time: "21:22", direction: "out"},
  { name: "Abdul", msg: "kavo", time: "12:05", direction: "in"},
  { name: "Abdushmul", msg: "tavo", time: "10:02", direction: "in"},
  { name: "Magomed", msg: "eeee", time: "09:05", direction: "in"},
  { name: "Shamil", msg: "auauauaua", time: "21:22", direction: "out"},
  { name: "Abdul", msg: "kavo", time: "12:05", direction: "in"},
  { name: "Abdushmul", msg: "tavo", time: "10:02", direction: "in"},
  { name: "Magomed", msg: "eeee", time: "09:05", direction: "in"},
  { name: "Shamil", msg: "auauauaua", time: "21:22", direction: "out"},
  { name: "Abdul", msg: "kavo", time: "12:05", direction: "in"},
  { name: "Abdushmul", msg: "tavo", time: "10:02", direction: "in"},
  { name: "Magomed", msg: "eeee", time: "09:05", direction: "in"},
  { name: "Shamil", msg: "auauauaua", time: "21:22", direction: "out"},
]

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    
  },
  msgInContainer: {
    display: 'flex',
    margin: "auto",
    marginLeft: "10px",
    flexDirection: 'row',
    background: "#ffffff",
    borderRadius: '5px 5px 5px 5px',
    boxShadow: '0 0 3px',
    padding: 10,
    marginTop: "30px",
  },
  msgOutContainer: {
    display: 'flex',
    margin: "auto",
    marginRight: "10px",
    flexDirection: 'row',
    background: "#ffffff",
    borderRadius: '5px 5px 5px 5px',
    boxShadow: '0 0 3px',
    padding: 10,
    marginTop: "30px",
  }
});

export const MessageItem: FC = () => {
  const classes = useStyles();

  const messagesEndRef = useRef(null)

  const scrollOnLoad = () => {
    const toUse: React.RefObject<any> = messagesEndRef
    toUse.current.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollOnLoad()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages])

  return (
    <ListItem className={classes.root}>
      {messages.map((item) => {
          if(item.direction === "in") {
            return (<Box className={classes.msgInContainer}>
              <Box>{item.name + ":"}</Box>
              <Box ml="10px">{item.msg}</Box>
              <Box ml="10px">{item.time}</Box>
            </Box>
            )
          } else {
            return (<Box className={classes.msgOutContainer}>
              <Box>{item.name + ":"}</Box>
              <Box ml="10px">{item.msg}</Box>
              <Box ml="10px">{item.time}</Box>
            </Box>
            )
          }
      })}
      <div ref={messagesEndRef}></div>
    </ListItem>
  );
};
