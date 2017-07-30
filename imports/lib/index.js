import { merge } from 'lodash';

// const LG = console.log; // eslint-disable-line no-console

export const schemas = (methods) => {
//  console.log(' METHODS ::: ', methods);
  var collected = [];
  methods
    .filter(method => method)
    .filter(method => method.schemas)
    .filter(method => typeof method.schemas === 'object')
    .forEach((method) => {
      // console.log('   SCHEMA 1 ? ', method.schemas);
      collected.push( method.schemas );
    });
  //  console.log('    COLLECTED  ::: ', collected);
  return collected;
};

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
