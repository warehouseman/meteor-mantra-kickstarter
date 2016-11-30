import {useDeps} from 'react-simple-di';
import { composeAll, composeWithTracker } from 'mantra-core';

export const singleComposer = ({context, _id, accesspoints, clearErrors}, onData) => {

  const {Meteor, Collections, LocalState} = context();
  const error = LocalState.get('_widgets.DELETE_ERROR');
  if (Meteor.subscribe('_widgets.single', _id).ready()) {
    const record = Collections.Widgets.findOne(_id);
    if (record) {
      onData(null, {record, error});
    }
  }
};

export const depsMapper = (context, actions) => ({
  hideAction: actions._widgets.hide,
  deleteAction: actions._widgets.delete,
  clearErrors: actions._widgets.clearErrors,
  context: () => context
});

export default (component, _authComposer) => composeAll(
    composeWithTracker(_authComposer),
    composeWithTracker(singleComposer),
    useDeps(depsMapper)
  )(component);
