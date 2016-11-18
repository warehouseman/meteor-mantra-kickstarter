import {useDeps} from 'react-simple-di';
import {composeAll} from 'react-komposer';
import composeWithTracker from '../../../../../lib/compose-with-tracker.js';

import {singleComposer} from './single.jsx';

export const editComposer = ({context, clearErrors}, onData) => {
  const {LocalState} = context();
  const exception = LocalState.get('_users.UPDATE_ERROR');
  onData(null, {exception});

  // clearErrors when unmounting the component
  // return clearErrors;
};

export const depsMapper = (context, actions) => ({
  submitAction: actions._users.update,
  clearErrors: actions._users.clearUserErrors,
  context: () => context
});

export default (component) => composeAll(
    composeWithTracker(singleComposer),
    composeWithTracker(editComposer),
    useDeps(depsMapper)
  )(component);
