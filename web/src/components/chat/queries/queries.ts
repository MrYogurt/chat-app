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