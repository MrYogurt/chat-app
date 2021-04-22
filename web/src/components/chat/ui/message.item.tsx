import { FC } from 'react';

import { Box, makeStyles, Theme } from '@material-ui/core';

const useStyles = makeStyles<Theme>((theme) => ({
  in: {
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
  out: {
    display: 'flex',
    width: 'auto',
    maxWidth: '60%',
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

interface IMessageItem {
    direction: string
    senderName: string
    message: string
}

export const MessageItem: FC <IMessageItem> = ({direction, senderName, message}) => {

    const classes = useStyles();

    const formatMessage = (message: string) => {
        const splitMessages = message.split(" ")

        if(splitMessages.length > 1) {
            let messages: string[] = []

            let count = 0
            let position = 0

            while (position < splitMessages.length) {
                count += splitMessages[position].length

                if (count < 60) {
                    messages.push(splitMessages[position])
                    position++
                } else {
                    messages.push("\n")
                    count = 0
                }
            }

            const filteredMessages = messages.join(" ")

            return filteredMessages

        } else if (message.length > 60) {
            const splitMessage = message.split("")

            let words: string[] = []

            let count = 0
            let position = 0

            while (position < splitMessage.length) {
                count += splitMessage[position].length

                if (count < 60) {
                    words.push(splitMessage[position])
                    position++
                } else {
                    words.push("\n")
                    count = 0
                }
            }

            const filteredMessage = words.join("")

            return filteredMessage

        } else {
            return message
        }
    }

  return (

        <Box className={classes[direction]}>
            <Box>{senderName + ":"}</Box>
            <Box ml="10px" maxWidth="75%">{formatMessage(message)}</Box>
        </Box>
  );
};
