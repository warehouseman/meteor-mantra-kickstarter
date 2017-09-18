import { useDeps } from 'react-simple-di';
import { composeAll, composeWithTracker } from 'mantra-core';

import { schemaComposer } from './schema.jsx';
import { singleComposer } from './single.jsx';

const LG = console.log; // eslint-disable-line no-console,no-unused-vars

export const editComposer = ({ context, clearErrors}, onData) => {
  const { LocalState } = context();
  const error = LocalState.get('_users.UPDATE_ERROR');

  onData(null, { error });

  return clearErrors;
};

export const depsMapper = (context, actions) => ({
  submitAction: actions._users.update,
  clearErrors: actions._users.clearUserErrors,
  context: () => context
});

export default (component) => composeAll(
  composeWithTracker(schemaComposer),
  composeWithTracker(singleComposer),
  composeWithTracker(editComposer),
  useDeps(depsMapper)
)(component);
