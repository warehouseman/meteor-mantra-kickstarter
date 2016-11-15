import {useDeps} from 'react-simple-di';
import {composeWithTracker, composeAll} from 'react-komposer';

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
