import defs from './typeDefs';
import tsts from './unit';

export default {
  moduleName: 'deliveryItem',
  schemas: defs,
  tests: function tests() {
    return tsts;
  },
};
