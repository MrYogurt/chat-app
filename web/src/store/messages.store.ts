/* eslint-disable @typescript-eslint/no-unused-vars */
import { observable, action, computed, makeObservable, toJS } from "mobx"

import { Actions_Enum } from './../constants';

interface IMessage {
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
      method: 'POST',
      url: 'http://localhost:5000/chat',
      data: { action: Actions_Enum.INITIALIZE_MESSAGES } }).then((result: any) => {
        this.setMessages(result.data)
      })
  }

  fetchMoreMessages = async (countLoading: number) => {
    const result = await this.axios({
      method: 'POST',
      url: 'http://localhost:5000/chat',
      data: { count: countLoading, action: Actions_Enum.FETCH_MORE }}).then((result: any) => {
        
        this.pushToMessageArray(result.data)
      })
  }

  setMessages = (data: IMessage) => {
    const parsedData = toJS(data)

    this.messages = parsedData
  }

  pushToMessageArray = (data: any) => {
    const messages = this.messages

    this.messages = data.concat(messages)
  }

  get getMessages(): IMessage | undefined {
    return toJS(this.messages)
  }
}

export const messagesStore = new MessagesStore()
