import {useDeps, composeAll, composeWithTracker} from 'mantra-core';

import _lgr from '/lib/Logging/client/clientLogger';
const Lgr = new _lgr( __filename, 'warn', true );

import Authorized from './acComponent.jsx';

export const composer = ({context, accesspoint}, onData) => {
  Lgr.a = 'composer';
  const {Meteor, Collections, App} = context();

  Lgr.debug( ' waiting for ready ' );
  if (Meteor.subscribe('access-points', accesspoint, App.group).ready()) {
    Lgr.verbose( ' ready ' );

    const authorize = ( _accesspoint ) => {
      const accessPoint = Collections.AccessControl.findAccessPoint( _accesspoint, App.group );
      return Roles.userIsInRole(Meteor.userId(), accessPoint.trusted, accessPoint.group);
    };

    onData(null, {Meteor, authorize});
  }
  Lgr.debug( ' waiting for ready ' );

};

export const depsMapper = (context, actions) => ({
  context: () => context,
  actions: () => actions
});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(Authorized);
