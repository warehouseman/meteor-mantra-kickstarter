import rslvrs from './resolvers';
import tsts from './unit';

export default {
  moduleName: 'deliveryItems',
  resolvers: function resolvers() {
    return rslvrs;
  },
  tests: function tests() {
    return tsts;
  },
};
