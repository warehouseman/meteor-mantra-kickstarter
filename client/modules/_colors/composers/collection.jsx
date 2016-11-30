import {useDeps} from 'react-simple-di';
import { composeAll, composeWithTracker } from 'mantra-core';

export const collectionComposer = ({context}, onData) => {

  const accessPoint = {module: 'colors', action: 'add'};

  const {Meteor, Collections} = context();
  if (Meteor.subscribe('_colors.list').ready()) {
    const collection = Collections.Colors.find();
    onData(null, {collection, accessPoint});
  }
};

export default (component) => composeAll(
//    composeWithTracker(authComposer),
    composeWithTracker(collectionComposer),
    useDeps()
  )(component);
