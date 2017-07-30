import defs from './typeDefs';
import tsts from './unit';

export default {
  moduleName: 'deliveryItems',
  schemas: defs,
  tests: function tests() {
    return tsts;
  },
};
