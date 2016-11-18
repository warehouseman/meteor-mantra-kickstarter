import {useDeps} from 'react-simple-di';
import {composeAll} from 'react-komposer';
import composeWithTracker from '../../../../lib/compose-with-tracker.js';

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
