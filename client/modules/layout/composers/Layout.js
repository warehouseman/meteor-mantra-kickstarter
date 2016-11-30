import {useDeps} from 'react-simple-di';
import { composeAll, composeWithTracker } from 'mantra-core';

// import authComposer from '/client/access_control/Authorize';

export const singleComposer = ({context, _id, clearErrors}, onData) => {

  const {LocalState, App, Tracker} = context();
  const error = LocalState.get('_colors.DELETE_ERROR');
  const sluts = 'dick';
  onData(null, {error, sluts, LocalState, App, Tracker});

};

export const depsMapper = (context, actions) => ({
  actions: () => actions,
  context: () => context
});

export default (component) => composeAll(
    composeWithTracker(singleComposer),
//    composeWithTracker(authComposer),
    useDeps(depsMapper)
  )(component);
