import {useDeps} from 'react-simple-di';
import { composeAll, composeWithTracker } from 'mantra-core';



export const addComposer = ({context, clearErrors}, onData) => {
  const {LocalState} = context();
  const error = LocalState.get('_users.INSERT_ERROR');
  onData(null, {error});

  // clearErrors when unmounting the component
  return clearErrors;
};

export const depsMapper = (context, actions) => ({
  submitAction: actions._users.add,
  clearErrors: actions._users.clearUserErrors,
  context: () => context
});

export default (component) => composeAll(
    composeWithTracker(addComposer),
    useDeps(depsMapper)
  )(component);
