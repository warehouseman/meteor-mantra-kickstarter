import defs from './typeDefs';
import tsts from './unit';

export default {
  moduleName: 'partner',
  schemas: defs,
  tests: function tests() {
    return tsts;
  },
};
