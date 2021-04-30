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
  query sendMessage($data: MessageInput!) {
    sendMessage(data: $data) {
        id
        sender_id
        sender_name
        message
    }
  }
`;

export const SEND_FORM = gql`
  query login($nickname: String!, $password: String!) {
    login(nickname: $nickname, password: $password) {
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