import {useDeps} from 'react-simple-di';
import { composeAll, composeWithTracker } from 'mantra-core';

export const composer = ({context}, onData) => {
  // const {Meteor, Collections} = context();
  const { Meteor } = context();

  const filterSpec = { ow: 'Me' };

  if (Meteor.subscribe('users.collection', filterSpec).ready()) {
    const collection = Meteor.users.find().fetch();
    // const collection = Collections.Users.find();
    onData(null, {collection});
  }
};

export const depsMapper = (context, actions) => ({
  submitAction: actions._users.hide,
  clearErrors: actions._users.clearUserErrors,
  context: () => context
});

export default (component) => composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(component);
