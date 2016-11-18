// import LoginForm from '../components/Login/LoginForm.jsx';
import {useDeps} from 'react-simple-di';
import {composeAll} from 'react-komposer';
import composeWithTracker from '../../../../../lib/compose-with-tracker.js';

export const composer = ({context, clearErrors}, onData) => {
  const {LocalState} = context();
  const error = LocalState.get('LOGIN_ERROR');
  onData(null, {error});

  // clearErrors when unmounting the component
  return clearErrors;
};

export const depsMapper = (context, actions) => ({
  submitAction: actions._account.login,
  clearErrors: actions._account.loginErrorClear,
  context: () => context
});

export default (component) => composeAll(
    composeWithTracker(composer),
    useDeps(depsMapper)
  )(component);
