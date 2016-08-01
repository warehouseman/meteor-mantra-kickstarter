import _lgr from '/lib/logging/client/clientLogger';
const Lgr = new _lgr(__filename, 'warn', true);

// XXX: Here we can auto generate this file based on the method stubs
// export default function (context) {
export default function (context) {

  const {App} = context;

  Lgr.f = __filename;
  Lgr.a = 'method_stubs.default';
  Lgr.debug(`\n : loaded context for "${App.name}"\n`);
}
