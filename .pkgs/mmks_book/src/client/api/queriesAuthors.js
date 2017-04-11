import gql from 'graphql-tag';

export const LOAD_AUTHORS_QUERY = gql`
  query Authors {
    author {
      _id
      firstName
      lastName
    }
  }`;

