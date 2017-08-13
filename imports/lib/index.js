import { merge } from 'lodash';

const LG = console.log; // eslint-disable-line no-console,no-unused-vars

export const schemas = (modules) => {
  var collected = [];
  modules
    .filter(module => module)
    .filter(module => module.schemas)
    .filter(module => typeof module.schemas === 'object')
    .forEach((module) => {
      // LG(' module :: %s has ', module.moduleName, module.schemas ); // eslint-disable-line no-console
      collected.push( module.schemas );
    });
  LG('+++++++++++++  schemas  +++++++++++++++');
  LG(collected);
  LG('+++++++++++++  schemas  +++++++++++++++');
  return collected;
};

export const tests = (modules) => {
  var collected = merge( null );
  modules
    .filter(module => module)
    .filter(module => module.tests)
    .forEach((module) => {
      merge( collected, module.tests() );
    });

  // LG('  Collected tests ', collected); // eslint-disable-line no-console

  return collected;
  // return 'stuff';
};
