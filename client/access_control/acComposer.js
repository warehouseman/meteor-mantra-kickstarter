import _lgr from '/lib/logging/client/clientLogger';
const Lgr = new _lgr( __filename, 'info', true );


export default ({context, accesspoints}, onData) => {
  const action = 'Authorization ';
  Lgr.a = action;

  const {Meteor, Tracker, ACL, LocalState, App} = context();

  // console.log( 'acComposer', accesspoints );

  Lgr.debug( `Container access point ${accesspoints[0]}.` );


  let permissions = { };

  if ( LocalState.get('module.colors.subscription') === 'ready' ) {

    accesspoints.forEach( (accesspoint) => {
      // console.log(accesspoint);
      ACL.AccessControl.canTrust(
        {Tracker, LocalState}, Meteor.userId(), accesspoint
      );

      permissions[accesspoint.module + ':' + accesspoint.action] =
          LocalState.get(
            accesspoint.module + ':' + accesspoint.action + ':' +
            App.group + ':' + Meteor.userId()
          );
    });

  }

  Lgr.debug( `Composer allows ${permissions}` );
  // console.log( 'permissions' , permissions);

  onData(null, {permissions});

};
