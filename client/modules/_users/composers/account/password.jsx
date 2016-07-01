import {useDeps} from 'react-simple-di';
import {composeWithTracker, composeAll} from 'react-komposer';

export const composer = ({context, clearErrors}, onData) => {
  const {Meteor, LocalState} = context();
  const error = LocalState.get('LOGIN_ERROR');
  const frags = Meteor.settings.public.PASSWORD_RESET;
  const user = Meteor.user_id;

  onData(null, {error, frags, user});

  // clearErrors when unmounting the component
  return clearErrors;
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
