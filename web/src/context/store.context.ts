import React, { useContext } from 'react';
import { MessagesStore } from '../store/messages.store';
import { AuthStore } from '../store/auth.store';

interface IStore {
    AuthStore: any
    MessagesStore: any
  }
  
  export const StoreContext = React.createContext({
    AuthStore,
    MessagesStore,
  } as IStore)
  
  export const useStoreContext = (): IStore => useContext(StoreContext)