import {useDeps} from 'react-simple-di';
import {composeWithTracker, composeAll} from 'react-komposer';

export const singleComposer = ({context, _id, clearErrors}, onData) => {

  console.log(' composing dummy ');

  const {LocalState} = context();
  const error = LocalState.get('_colors.DELETE_ERROR');
  onData(null, {error});

};

export const depsMapper = (context, actions) => ({
  actions: () => actions,
  context: () => context,
  // authorize: context.App
});

export default (component) => composeAll(
    composeWithTracker(singleComposer),
    useDeps(depsMapper)
  )(component);
