import {useDeps} from 'react-simple-di';
import { composeAll, composeWithTracker } from 'mantra-core';

export const collectionComposer = ({context}, onData) => {

  const accessPoint = {module: 'widgets', action: 'add'};

  const {Meteor, Collections} = context();
  if (Meteor.subscribe('_widgets.list').ready()) {
    const collection = Collections.Widgets.find();
    onData(null, {collection, accessPoint});
  }
};

export default (component) => composeAll(
    composeWithTracker(collectionComposer),
    useDeps()
  )(component);
