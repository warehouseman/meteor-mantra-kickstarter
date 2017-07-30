import { merge } from 'lodash';

// const LG = console.log; // eslint-disable-line no-console

export const tests = (methods) => {
  var collected = merge( null );
  methods
    .filter(method => method)
    .filter(method => method.tests)
    // .filter(method => typeof method.tests === 'function')
    // .filter(method => typeof method.tests() === 'object')
    .forEach((method) => {
      // LG('   NULL 1 ? ', method); // eslint-disable-line no-console
      // LG('   NULL 2 ? ', method.tests); // eslint-disable-line no-console
      // LG('   NULL 3 ? ', method.tests()); // eslint-disable-line no-console
      // LG('   NULL 4 ? ', method.tests().tests); // eslint-disable-line no-console
      merge( collected, method.tests() );
    });

  // LG('  Collected tests ', collected); // eslint-disable-line no-console

  return collected;
  // return 'stuff';
};
