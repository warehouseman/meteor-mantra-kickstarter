import {useDeps} from 'react-simple-di';
import {composeWithTracker, composeAll} from 'react-komposer';

export const addComposer = ({context, clearErrors}, onData) => {
  const {LocalState, Logger} = context();
  const state = LocalState.get('_colors.SAVE_ERROR');
  onData(null, {state, Logger});

  // clearErrors when unmounting the component
  return clearErrors;
};

export const depsMapper = (context, actions) => ({
  submitAction: actions._colors.add,
  clearErrors: actions._colors.clearErrors,
  context: () => context
});

export default (component) => composeAll(
    composeWithTracker(addComposer),
    useDeps(depsMapper)
  )(component);
