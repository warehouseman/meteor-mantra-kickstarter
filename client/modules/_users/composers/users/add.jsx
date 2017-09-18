import { useDeps } from 'react-simple-di';
import { composeAll, composeWithTracker } from 'mantra-core';

import { schemaComposer } from './schema.jsx';


const LG = console.log; // eslint-disable-line no-console,no-unused-vars

export const addComposer = ({context, clearErrors}, onData) => {
  const { LocalState } = context();
  const error = LocalState.get('_users.INSERT_ERROR');

  onData(null, { error });

  return clearErrors;
};

export const depsMapper = (context, actions) => ({
  submitAction: actions._users.add,
  clearErrors: actions._users.clearUserErrors,
  context: () => context
});

export default (component) => composeAll(
  composeWithTracker(schemaComposer),

  composeWithTracker( addComposer ),
  useDeps( depsMapper)
)(component);
