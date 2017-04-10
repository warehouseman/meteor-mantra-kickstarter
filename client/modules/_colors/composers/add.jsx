import {useDeps} from 'react-simple-di';
import { composeAll, composeWithTracker } from 'mantra-core';

export const addComposer = ({context, clearErrors}, onData) => {

  const {LocalState} = context();
  const exception = LocalState.get('_colors.ADD_ERROR');

  onData(null, { exception } );

};

export const depsMapper = (context, actions) => ({
  submitAction: actions._colors.add,
  clearErrors: actions._colors.clearErrors,
  context: () => context
});

const Component = (component) => composeAll(
    composeWithTracker(addComposer),
    useDeps(depsMapper)
  )(component);

export default Component;
