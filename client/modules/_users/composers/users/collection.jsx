import {useDeps} from 'react-simple-di';
import {composeWithTracker, composeAll} from 'react-komposer';

export const composer = ({context}, onData) => {
  const {Meteor} = context();

  if (Meteor.subscribe('users.collection').ready()) {
    const collection = Meteor.users.find().fetch();
    onData(null, {collection});
  }
};

export const depsMapper = (context, actions) => ({
  submitAction: actions._users.delete,
  clearErrors: actions._users.clearUserErrors,
  context: () => context
});

export default (component) => composeAll(
    composeWithTracker(composer),
    useDeps(depsMapper)
  )(component);
