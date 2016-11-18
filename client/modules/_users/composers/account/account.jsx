// import ColorSingle from '../components/ColorsSingle/index.jsx';
import {useDeps} from 'react-simple-di';
import {composeAll} from 'react-komposer';
import composeWithTracker from '../../../../../lib/compose-with-tracker.js';

export const composer = ({context}, onData) => {
  const {Meteor} = context();

  Meteor.subscribe('users.current',() => {
    const record = Meteor.users.findOne(Meteor.userId());
    onData(null, {record});
  });

};

export default (component) => composeAll(
    composeWithTracker(composer),
    useDeps()
  )(component);
