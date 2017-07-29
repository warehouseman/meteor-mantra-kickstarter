export const schemas = (methods) => {
//  console.log(' METHODS ::: ', methods);
  var collected = [];
  methods
    .filter(method => method)
    .filter(method => method.default)
    .filter(method => method.default.schemas)
    .filter(method => typeof method.default.schemas === 'object')
    .forEach((method) => {
      // console.log('   SCHEMA 1 ? ', method.default.schemas);
      collected.push( method.default.schemas );
    });
  //  console.log('    COLLECTED  ::: ', collected);
  return collected;
};

