import { merge } from 'lodash';
export const resolvers = (methods) => {
  var collected = merge( null );
  methods
    .filter(method => method)
    .filter(method => method.default)
    .filter(method => method.default.resolvers)
    .filter(method => typeof method.default.resolvers === 'function')
    .filter(method => typeof method.default.resolvers() === 'object')
    .forEach((method) => {
      // console.log('   NULL 1 ? ', method.default.resolvers()); // eslint-disable-line no-console
      merge( collected, method.default.resolvers() );
    });
  return collected;
};

