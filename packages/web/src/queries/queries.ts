import { gql } from '@apollo/client';

export const INITIALIZE_MESSAGES = gql`
  query initializeMessages {
    initializeMessages {
      id
      message
      sender_name
      sender_id
      send_date
      }  
    }
`;

export const FETCH_MORE = gql`
  query fetchMore($offset: Float!, $limit: Float!) {
    fetchMore(offset: $offset, limit: $limit) {
      id
      message
      sender_name
      sender_id
      send_date
      }  
    }
`

export const MESSAGE_SUBSCRIPTION = gql`
  subscription messageAdded {
    messageAdded {
        id
        sender_id
        sender_name
        message
    }
  }
`;

export const SEND_MESSAGE = gql`
  mutation sendMessage($data: MessageInput!) {
    sendMessage(data: $data) {
        id
        sender_id
        sender_name
        message
    }
  }
`;

export const SEND_LOGIN = gql`
  query login($nickname: String!, $password: String!) {
    login(nickname: $nickname, password: $password) {
      id
      nickname
      registration_date
      access_token
    }
  }
`;

export const SEND_REGISTER = gql`
  mutation register($nickname: String!, $password: String!) {
    register(nickname: $nickname, password: $password) {
      id
      nickname
      registration_date
      access_token
    }
  }
`;

export const CHECK_AUTH = gql`
  query checkAuth($token: String!) {
    checkAuth (token: $token){
        sub
    		iat
    		exp
    }
  }
`;

export const WHO_AM_I = gql`
  query whoAmI($token: String!) {
    whoAmI (token: $token){
        id
    		nickname
    		registration_date
    }
  }
`;