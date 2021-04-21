import { Box, List, ListItem, makeStyles, Theme } from '@material-ui/core';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import React, { FC, useEffect, useRef } from 'react';
import { useStoreContext } from '../../../context/store.context';

// const useStyles = makeStyles<Theme, { messageLength: number }>((theme) => ({
//   root: {
//     display: 'flex',
//     flexDirection: 'column',
//   },
//   msgInContainer: {
//     display: 'flex',
//     width: 'auto',
//     margin: "auto",
//     marginLeft: "10px",
//     flexDirection: 'row',
//     background: "#ffffff",
//     borderRadius: '5px 5px 5px 5px',
//     boxShadow: '0 0 3px',
//     padding: 10,
//     marginTop: "30px",
//   },
//   msgOutContainer: {
//     display: 'flex',
//     width: 'auto',
//     height: '100px',
//     wordWrap: "break-word",
//     margin: "auto",
//     marginRight: "10px",
//     flexDirection: 'row',
//     background: "#ffffff",
//     borderRadius: '5px 5px 5px 5px',
//     boxShadow: '0 0 3px',
//     padding: 10,
//     marginTop: "30px",
//   }
// }))

const useStyles = makeStyles( {
  root: {
    display: 'flex',
    flexDirection: 'column',
  },
  corrector: {
    // maxWidth: '70%',
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
});

export const MessageItems: FC = observer(() => {
  const {
    authStore: { user, getUser },
    messagesStore: { getMessages, messages, getAllMessages, getInitialMessages, fetchMoreMessages },
  } = useStoreContext()

  const classes = useStyles();

  const messagesEndRef = useRef(null)

  const scrollOnLoad = () => {
    const toUse: React.RefObject<any> = messagesEndRef
    toUse.current.scrollIntoView({ behavior: 'smooth' })
  }

  const handleScroll = (event: React.UIEvent<any>) => {
      const target = event.target as HTMLUListElement
      console.log("event1", target)

        if (target.scrollTop === 0) {
          console.log("event2")
          fetchMoreMessages(messages.length - 1)
        }

    }

  useEffect(() => {
    // console.log("messages2:", messages)
    const user = toJS(getUser)
    const msgs = toJS(getMessages)
    
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
    <List className={classes.root} onScroll={handleScroll}>
      
      {messages && toJS(messages).map((item:any) => {
        const parsedUser = toJS(user)
        // console.log("messages:", messages)

        if(parsedUser?.nickname !== item.sender_name) {
          return (
          <Box className={classes.msgInContainer}>
            <Box>{item.sender_name + ":"}</Box>
            <Box ml="10px">{item.message}</Box>
            {/* <Box ml="10px">{item.send_date}</Box> */}
          </Box>
          )
        } else {
          return (
          <Box className={classes.msgOutContainer}>
            <Box>{item.sender_name + ":"}</Box>
            <Box ml="10px">{item.message}</Box>
            {/* <Box ml="10px">{item.send_date}</Box> */}
          </Box>
          )
        }
      })}
      <div ref={messagesEndRef}></div>
    </List>
  );
});
