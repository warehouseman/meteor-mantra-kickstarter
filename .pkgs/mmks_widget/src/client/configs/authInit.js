export default ( context ) => {
  const { App, LocalState } = context;

  LocalState.set('module.widgets.subscription', 'waiting' );
  Meteor.subscribe('access-points', 'widgets', App.group, function () {
    LocalState.set('module.widgets.subscription', 'ready' );
  });

};
