import gql from 'graphql-tag';

/* eslint-disable max-len */
export const CREATE_BOOK_MUTATION = gql`
  mutation createBook( $title: String! $content: String! $pages: Int! $authorId: Int! $deletion: Boolean! )
  {
    createBook( title: $title, content: $content, pages: $pages authorId: $authorId, deleted: $deletion )
    {
      _id title content pages deleted
    }
  }`;

export const UPDATE_BOOK_MUTATION = gql`
  mutation bookUpdate( $id: Int! $title: String! $content: String! $pages: Int! $authorId: Int! )
  {
    updateBook( _id: $id, title: $title, content: $content, pages: $pages, authorId: $authorId )
    {
      _id title content pages author{ _id, lastName, firstName }
    }
  }`;
/* eslint-enable max-len */

export const HIDE_BOOK_MUTATION = gql`
  mutation bookHide( $id: Int! $deletion: Boolean! )
  {
    hideBook( _id: $id, deleted: $deletion )
    {
      _id, deleted
    }
  }`;
