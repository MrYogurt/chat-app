/* eslint-disable @typescript-eslint/no-unused-vars */
import { observable, action, computed, makeObservable, toJS } from "mobx"

import { Actions_Enum } from './../constants';

interface IMessage {
  __typename: string
  id?: number
  message: string
  sender_name: string
  sender_id: number
  send_date?: string
  count?: number
}

export class MessagesStore {
  messages: any
  axios = require('axios').default;

  constructor() {

    makeObservable(this, {
      messages: observable,
      getMessages: computed,
      getAllMessages: action,
      setMessages: action,
    })
  }

  getAllMessages = async () => {
    await this.axios({
      method: 'POST',
      url: 'http://localhost:5000/chat',
      data: { action: Actions_Enum.ALL_MESSAGES } }).then((result: any) => {
        this.setMessages(result.data)
      })
  }

  getInitialMessages = async () => {

      await this.axios({
        method: "POST",
          url: "http://localhost:5000/graphql",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          data: {
            query: `query initializeMessages {
              initializeMessages {
                id
                message
                sender_name
                sender_id
                send_date
              }
          }`,
        }
      }).then((item: any) => {
        this.setMessages(item.data.data.initializeMessages)
      })
  }

  fetchMoreMessages = async (count: number) => {
    await this.axios({
      method: "POST",
          url: "http://localhost:5000/graphql",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          
          data: {
            query: `query fetchMore {
              fetchMore(count: ${count}) {
                id
                message
                sender_name
                sender_id
                send_date
              }
          }`,
        }
     }).then((result: any) => {
       
        this.pushToMessageArray(result.data.data.fetchMore)
      }).catch((err: any) => {
        console.log("error:", err)
      })
      
  }

  setMessages = (data: IMessage) => {
    // const parsedData = toJS(data)

    this.messages = data
  }

  pushToMessageArray = (data: any) => {
    const messages = this.messages

    this.messages = data.concat(messages)
  }

  get getMessages(): IMessage | undefined {
    return this.messages
  }
}

export const messagesStore = new MessagesStore()
