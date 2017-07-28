export default {
  Name: 'deliveryItems',
  Lib : require('./lib'),
  Client : Meteor.isClient ? require('./client') : null,
  Server : Meteor.isServer ? require('./server') : null,
}
