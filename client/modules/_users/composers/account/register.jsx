// import LoginForm from '../components/Register/RegisterForm.jsx';
import {useDeps} from 'react-simple-di';
import {composeAll} from 'react-komposer';
import composeWithTracker from '../../../../../lib/compose-with-tracker.js';

export const composer = ({context, clearErrors}, onData) => {
  const {LocalState} = context();
  const exception = LocalState.get('REGISTER_ERROR');
  onData(null, {exception});

  // clearErrors when unmounting the component
  //  return clearErrors;
};

export const depsMapper = (context, actions) => ({
  submitAction: actions._account.register,
  clearErrors: actions._account.registerErrorClear,
  context: () => context
});

export default (component) => composeAll(
    composeWithTracker(composer),
    useDeps(depsMapper)
  )(component);
