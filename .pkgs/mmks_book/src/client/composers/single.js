import {useDeps} from 'react-simple-di';
import { composeAll, composeWithTracker } from 'mantra-core';
import { graphql } from 'react-apollo';

import loadBook from '../api/loadBook';

import { HIDE_BOOK_MUTATION } from '../api/mutationsBooks';

export const singleComposer = ({context, _id, accesspoints, clearErrors}, onData) => {

//  const {Meteor, Collections, LocalState} = context();
  const {ApolloClient, LocalState} = context();
  const exception = LocalState.get('_books.DELETE_ERROR');

  console.log('Composing book data for record #' + _id);  // eslint-disable-line no-console

/* ***************************************
             View A Book Composer
   ***************************************/

  loadBook({ _id, ApolloClient, onData, exception });

};

export const depsMapper = (context, actions) => ({
  hideAction: actions._books.hide,
  deleteAction: actions._books.delete,
  clearErrors: actions._books.clearErrors,
  context: () => context
});

export default (component, _authComposer) => composeAll(
    graphql(HIDE_BOOK_MUTATION),
    composeWithTracker(_authComposer),
    composeWithTracker(singleComposer),
    useDeps(depsMapper)
  )( component );
