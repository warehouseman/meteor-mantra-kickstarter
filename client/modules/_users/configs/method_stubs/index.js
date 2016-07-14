// import comments from './comments';
const txtPath = __filename;

// XXX: Here we can auto generate this file based on the method stubs
// export default function (context) {
export default function (context) {
  const nameMethod = 'method_stubs.default';
  const {Logger} = context;
  Logger.italic(nameMethod)
    .bold('\n : loaded context\n')
    .gray(txtPath)
    .info();
  // comments(context);
}
