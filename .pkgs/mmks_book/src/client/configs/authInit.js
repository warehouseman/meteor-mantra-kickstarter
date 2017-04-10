export default ( context ) => {
  const { App, LocalState } = context;

  LocalState.set('module.books.subscription', 'waiting' );
  Meteor.subscribe('access-points', 'books', App.group, function () {
    LocalState.set('module.books.subscription', 'ready' );
  });

};
