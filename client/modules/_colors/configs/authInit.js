export default ( context ) => {
//  console.log(' Configuring access-points for colors ', context);
//  const { App, LocalState, ACL } = context;
  const { App, LocalState } = context;

  LocalState.set('module.colors.subscription', 'waiting' );
  Meteor.subscribe('access-points', 'colors', App.group, function () {
    LocalState.set('module.colors.subscription', 'ready' );
//    console.log('\n\n Finding => all: ', ACL.AccessControl.find({ }).fetch());
  });

};
