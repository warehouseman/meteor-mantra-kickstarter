/* eslint-disable no-console */
import {useDeps, composeAll, composeWithTracker} from 'mantra-core';

// import {authComposer} from './auth_composer';
import Authorized from './acComponent.jsx';

/*
export function authComposer({context}, onData) {
  const {Meteor} = context();
  onData(null, {
    loggedIn: Boolean(Meteor.userId()),
    loggingIn: Meteor.loggingIn()
  });
}
*/

export const composer = ({context, accesspoint}, onData) => {
  const {Meteor, Collections, App} = context();

  console.log(' waiting for ready ');
  if (Meteor.subscribe('access-points', accesspoint, App.group).ready()) {
    console.log(' ready ');

    const authorize = ( _accesspoint ) => {
      const accessPoint = Collections.AccessControl.findAccessPoint( _accesspoint, App.group );
      return Roles.userIsInRole(Meteor.userId(), accessPoint.trusted, accessPoint.group);
    };

    onData(null, {Meteor, authorize});
  }
  console.log(' past waiting for ready ');

};

export const depsMapper = (context, actions) => ({
  context: () => context,
  actions: () => actions
});

export default composeAll(
//  composeWithTracker(authComposer),
  composeWithTracker(composer),
  useDeps(depsMapper)
)(Authorized);
