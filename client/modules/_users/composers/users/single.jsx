import {useDeps} from 'react-simple-di';
import {composeWithTracker, composeAll} from 'react-komposer';
// import _ from 'lodash';

export const singleComposer = ({context, _id, clearErrors}, onData) => {
  const {Meteor, LocalState, Collections} = context();
  const error = LocalState.get('_users.DELETE_ERROR');
  if (Meteor.subscribe('users.single', _id).ready()) {
    const user = Collections.Users.findOne(_id);
    const email = user.firstEmail();
    const role = user.bestRole();
    if ( user ) {
      let parms = { ...user.profile, role, user, email, error };
      onData(null, parms);
    } else {
      onData(null, null);
    }
  }
  // clearErrors when unmounting the component
  return clearErrors;
};


export const depsMapper = (context, actions) => ({
  deleteAction: actions._users.delete,
  clearErrors: actions._users.clearErrors,
  context: () => context
});

export default (component) => composeAll(
    composeWithTracker(singleComposer),
    useDeps(depsMapper)
  )(component);
