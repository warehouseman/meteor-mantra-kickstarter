export const schemas = (methods) => {
//  console.log(" METHODS ::: ", methods);
  var collected = [];
  methods
    .filter(method => method.default.schemas)
    .forEach((method) => {
      console.log("   METHOD ::: ", method.default.schemas);
      collected.push( method.default.schemas );
  });
//  console.log("    COLLECTED  ::: ", collected);
  return collected;
}

