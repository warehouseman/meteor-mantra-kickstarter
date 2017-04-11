import {useDeps} from 'react-simple-di';
import { composeAll, composeWithTracker } from 'mantra-core';
import { graphql } from 'react-apollo';

import loadAuthors from '../api/loadAuthorList';
import loadBook from '../api/loadBook';

import { UPDATE_BOOK_MUTATION } from '../api/mutationsBooks';

export const singleComposer = ({context, _id, clearErrors}, onData) => {

//  const {Meteor, Collections, LocalState} = context();
  const {ApolloClient, LocalState} = context();
  const exception = LocalState.get('_books.DELETE_ERROR');

  console.log('Composing book data for record #' + _id);  // eslint-disable-line no-console
  loadBook({ _id, ApolloClient, onData, exception });

};

export const authorSelectListOptions = ({context}, onData) => {

  const { ApolloClient } = context();
  loadAuthors({ ApolloClient, onData });

};

/* ***************************************
             Edit A Book Composer
   ***************************************/

export const depsMapper = (context, actions) => ({
  validateAction: actions._books.validate,
  submitAction: actions._books.update,
  clearErrors: actions._books.clearErrors,
  context: () => context
});

const Component = (component) => composeAll(
    graphql(UPDATE_BOOK_MUTATION),
    composeWithTracker(authorSelectListOptions),
    composeWithTracker(singleComposer),
    useDeps(depsMapper)
  )(component);

export default Component;
