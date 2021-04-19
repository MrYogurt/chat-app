import { messagesStore } from './../store/messages.store';
import { authStore } from './../store/auth.store';
import React, { useContext } from 'react';
import { MessagesStore } from '../store/messages.store';
import { AuthStore } from '../store/auth.store';

interface IStore {
    authStore: AuthStore
    messagesStore: MessagesStore
  }
  
  export const StoreContext = React.createContext({
    authStore,
    messagesStore,
  } as IStore)
  
  export const useStoreContext = (): IStore => useContext(StoreContext)