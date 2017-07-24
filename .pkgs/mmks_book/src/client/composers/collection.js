import {useDeps, composeWithTracker, composeAll} from 'mantra-core';

import loadBooks from '../api/loadBooks';

const apoComposer = ({context}, onData) => {

  const {ApolloClient } = context();

  /* ***************************************
             BookList Composer
   ***************************************/

  loadBooks({ ApolloClient, onData });

};

const composedComponent = (component) => composeAll(
  composeWithTracker(apoComposer),
  useDeps()
)(component);

export default composedComponent;
