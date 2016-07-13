// import New from '../components/ColorsNew/index.jsx';
import {useDeps} from 'react-simple-di';
import {composeWithTracker, composeAll} from 'react-komposer';

import {singleComposer} from './single.jsx';

export const editComposer = ({context, clearErrors}, onData) => {
  const {LocalState, Logger} = context();
  const exception = LocalState.get('_colors.SAVE_ERROR');

  onData(null, {exception, Logger});

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
