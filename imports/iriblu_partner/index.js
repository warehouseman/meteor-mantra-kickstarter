export default {
  Name: 'partner',
  Lib : require('./lib'),
  Client : Meteor.isClient ? require('./client') : null,
  Server : Meteor.isServer ? require('./server') : null,
}
