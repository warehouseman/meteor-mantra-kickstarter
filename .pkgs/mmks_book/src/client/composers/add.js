import { useDeps } from 'react-simple-di';
import { composeWithTracker, composeAll } from 'mantra-core';
import { graphql } from 'react-apollo';

import loadAuthors from '../api/loadAuthorList';

import { CREATE_BOOK_MUTATION } from '../api/mutationsBooks';

export const authorSelectListOptions = ({context}, onData) => {

  const { ApolloClient } = context();

  loadAuthors({ ApolloClient, onData });

};

/* ***************************************
             Add A Book Composer
   ***************************************/

export const depsMapper = (context, actions) => ({
  validateAction: actions._books.validate,
  submitAction: actions._books.create,
  clearErrors: actions._books.clearErrors,
  context: () => context
});

const Component = (component) => composeAll(
  graphql(CREATE_BOOK_MUTATION),
  composeWithTracker(authorSelectListOptions),
  useDeps(depsMapper)
)(component);

export default Component;
