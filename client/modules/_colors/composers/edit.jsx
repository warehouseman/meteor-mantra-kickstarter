import {useDeps} from 'react-simple-di';
import { composeAll, composeWithTracker } from 'mantra-core';

import {singleComposer} from './single.jsx';

export const editComposer = ({context, clearErrors}, onData) => {

  const {LocalState} = context();
  const exception = LocalState.get('_colors.UPDATE_ERROR');

  onData(null, {exception});

  //    returns clearErrors when unmounting the component
  //    Caution : actions always unmount the component,
  //           so clearErrors will wipe action errors before than can be seen
  // return clearErrors;
};

export const depsMapper = (context, actions) => ({
  submitAction: actions._colors.update,
  clearErrors: actions._colors.clearErrors,
  context: () => context
});

export default (component) => composeAll(
    composeWithTracker(singleComposer),
    composeWithTracker(editComposer),
    useDeps(depsMapper)
  )(component);
