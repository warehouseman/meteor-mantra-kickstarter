export default ( context ) => {
  const { App, LocalState } = context;

  // console.log('MMKS Layout :: authInit.js ==>');
  // console.log(App);
  LocalState.set('module.layout.subscription', 'waiting' );
  Meteor.subscribe('access-points', 'layout', App.group, function () {
    LocalState.set('module.layout.subscription', 'ready' );
  });

};
