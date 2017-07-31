import { Meteor } from '../api/meteorDependencies.js';

export default {
  Name: 'deliveryItems',
  Lib: require('./lib').default,
  Client: Meteor.isClient ? require('./client').default : null,
  Server: Meteor.isServer ? require('./server').default : null,
};
