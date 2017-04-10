import gql from 'graphql-tag';

export const LOAD_BOOK_QUERY = gql`
    query aBookQuery ($idBook: Int!) {
      book(_id: $idBook)
      {
        _id
        title
        content
        pages
        deleted
        author {
          _id
          firstName
          lastName
        }
      }
    }`;

export const LOAD_BOOKS_QUERY = gql`
    query booksQuery ($deletion: Boolean!) {
      book(deleted: $deletion)
      {
        _id
        title
        content
        pages
        deleted
        author {
          _id
          firstName
          lastName
        }
      }
    }`;
