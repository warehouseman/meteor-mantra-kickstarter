
// import {LayoutDefault} from 'mmks_layout';
// console.log("=========== configs/theme -- default function ");
// console.log(LayoutDefault);

const r = require;
var LayoutDefault = null;
// if ( 0 === 1 ) {
//   LayoutDefault = require('../modules/layout/containers/Layout.jsx').default;
// }
try {
  LayoutDefault = r('mmks_layout').LayoutDefault;
}
catch (e) {
  LayoutDefault = r('../modules/layout/containers/Layout.jsx').default;
}

// import LayoutDefault from '../modules/layout/containers/Layout.jsx';

export {

  LayoutDefault

};
