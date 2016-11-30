import {useDeps} from 'react-simple-di';
import { composeAll, composeWithTracker } from 'mantra-core';

export const composer = ({context, clearErrors}, onData) => {
  const {Meteor, LocalState} = context();
  const exception = LocalState.get('_users.PASSWORD_RESET_ERROR');
  const frags = Meteor.settings.public.PASSWORD_RESET;
  const user = Meteor.user_id;

  onData(null, {exception, frags, user});

  // clearErrors when unmounting the component
  //  return clearErrors;
};

export const depsMapper = (context, actions) => ({
  submitAction: actions._account.requestPasswordReset,
  clearErrors: actions._account.loginErrorClear,
  context: () => context
});

export default (component) => composeAll(
    composeWithTracker(composer),
    useDeps(depsMapper)
  )(component);
