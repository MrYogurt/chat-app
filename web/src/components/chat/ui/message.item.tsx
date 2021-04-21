import { Box, List, ListItem, makeStyles, Theme } from '@material-ui/core';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import { userInfo } from 'os';
import React, { FC, useEffect, useRef } from 'react';
import { useStoreContext } from '../../../context/store.context';
import { messagesStore } from '../../../store/messages.store';

const useStyles = makeStyles<Theme, { messageLength: number }>((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
  },
  msgInContainer: {
    display: 'flex',
    width: 'auto',
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
    width: 'auto',
    height: '100px',
    wordWrap: "break-word",
    margin: "auto",
    marginRight: "10px",
    flexDirection: 'row',
    background: "#ffffff",
    borderRadius: '5px 5px 5px 5px',
    boxShadow: '0 0 3px',
    padding: 10,
    marginTop: "30px",
  }
}))


export const MessageItems: FC = () => {

//   const classes = useStyles({messageLength: message.length});

  return (
    // <Box className={classes.root}>
      
    //   {messages && toJS(messages).map((item:any) => {
    //     const parsedUser = toJS(user)

    //     if(parsedUser?.nickname !== item.sender_name) {
    //       return (
    //       <Box className={classes.msgInContainer}>
    //         <Box>{item.sender_name + ":"}</Box>
    //         <Box ml="10px">{item.message}</Box>
    //         {/* <Box ml="10px">{item.send_date}</Box> */}
    //       </Box>
    //       )
    //     } else {
    //       return (
    //       <Box className={classes.msgOutContainer}>
    //         <Box>{item.sender_name + ":"}</Box>
    //         <Box ml="10px">{item.message}</Box>
    //         {/* <Box ml="10px">{item.send_date}</Box> */}
    //       </Box>
    //       )
    //     }
    //   })}
    // </Box>
  );
};
