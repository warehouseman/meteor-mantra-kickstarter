import rslvrs from './resolvers';
import tsts from './unit';

export default {
  moduleName: 'deliveryItem',
  resolvers: function resolvers() {
    return rslvrs;
  },
  tests: function tests() {
    return tsts;
  },
};
