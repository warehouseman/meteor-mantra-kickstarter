export default ( context ) => {
//  console.log(' Configuring ACL for Posts ', context);
//  const { App, LocalState, ACL } = context;
  const { App, LocalState } = context;

  LocalState.set('module.posts', 'waiting' );
  Meteor.subscribe('access-points', 'posts', App.group, function () {
    LocalState.set('module.posts', 'ready' );
//    console.log('\n\n Finding => all: ', ACL.AccessControl.find({ }).fetch());
  });

};
