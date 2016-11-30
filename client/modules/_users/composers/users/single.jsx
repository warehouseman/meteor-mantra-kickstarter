import {useDeps} from 'react-simple-di';
import { composeAll, composeWithTracker } from 'mantra-core';
// import _ from 'lodash';

export const singleComposer = ({context, _id, clearErrors}, onData) => {
  const {Meteor, LocalState, Collections} = context();
  const hideException = LocalState.get('_users.HIDE_ERROR');
  if (Meteor.subscribe('users.single', _id).ready()) {
    const user = Collections.Users.findOne(_id);
    if ( user ) {
      const email = user.firstEmail();
      const role = user.bestRole();
      let parms = { ...user.profile, role, user, email, hideException };
      onData(null, parms);
    } else {
      onData(null, null);
    }
  }
  // clearErrors when unmounting the component
  //   return clearErrors;
};


export const depsMapper = (context, actions) => ({
  deleteAction: actions._users.hide,
  clearErrors: actions._users.clearErrors,
  context: () => context
});

export default (component) => composeAll(
    composeWithTracker(singleComposer),
    useDeps(depsMapper)
  )(component);
