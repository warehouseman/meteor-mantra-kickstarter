import { merge, forOwn } from 'lodash';

import {
  client as mthdClient,
  lib as mthdLib,
  server as mthdServer,
} from '../../imports';

import { tests as client } from '../../imports/client';
import { tests as lib } from '../../imports/lib';
import { tests as server } from '../../imports/server';

const LG = console.log; // eslint-disable-line no-console,no-unused-vars
const allTests = merge(client(mthdClient()), lib(mthdLib()), server(mthdServer()));
LG(' ALL TESTS ==== ', allTests);
forOwn(
  allTests,
  test => test()
);


// LG(' ALL TESTS ==== ', allTests);

// describe('Tests', function () {
//   describe('client : ', function () {
//     var expected = 'function';
//     it('should return "' + expected + '"', function () {
//       // LG(' ########## clientMethod() \n', mthdClient());
//       LG(' ########## client() ', client(mthdClient()));
//       var result = typeof client;
//       assert.equal(expected, result);
//     });
//   });
// });

// describe('Tests', function () {
//   describe('lib : ', function () {
//     var expected = 'function';
//     it('should return "' + expected + '"', function () {
//       // LG(' ########## libMethod() ', mthdLib());
//       LG(' ##########>>>> lib() ', lib(mthdLib()));
//       var result = typeof lib;
//       assert.equal(expected, result);
//     });
//   });
// });

// describe('Tests', function () {
//   describe('server : ', function () {
//     var expected = 'function';
//     it('should return "' + expected + '"', function () {
//       // LG(' ########## serverMethod() \n', mthdServer());
//       LG(' ########## server() ', server(mthdServer()));
//       var result = typeof server;
//       assert.equal(expected, result);
//     });
//   });
// });

/* *************************************************** */
// var moduleG = '';
// var moduleOne = '';
// var posG = -1;
// var posOne = -1;
// var idxTest = -1;

// var generalTest = [];
// var soloTest = [];

// names().forEach((name, idx) => {
//   if ( name === 'deliveryItem') {
//     soloTest.push({name, idx});
//   } else {
//     generalTest.push({name, idx});
//   }
// });

// /*
//            THESE TESTS ARE NPM DRIVEN
//            WON'T WORK WITH METEOR
// */

// idxTest = 0;
// moduleG = generalTest[idxTest].name;
// posG = generalTest[idxTest].idx;
// describe('Imports 1', function () {
//   var idx = posG;
//   describe('#' + idx + '.client()', function () {
//     var expected = 'Got ' + moduleG + ':client';
//     it('should reply "' + expected + '"', function () {
//       var result = client()[idx].default();
//       assert.equal(expected, result);
//     });
//   });
// });

// describe('Imports 2', function () {
//   var idx = posG;
//   describe('#' + moduleG + '.lib()', function () {
//     var expected = 'Got "defs" from ' + moduleG + ':lib';
//     it('should reply "' + expected + '"', function () {
//       var result = 'Got "' + lib()[idx].default.schemas()[0] + '" from book:lib';
//       assert.equal(expected, result);
//     });
//   });
// });

// describe('Imports 3', function () {
//   var idx = posG;
//   describe('#' + moduleG + '.server()', function () {
//     var expected = 'Got ' + moduleG + ':server';
//     it('should reply "' + expected + '"', function () {
//       var result = server()[idx].default.resolvers();
//       assert.equal(expected, result);
//     });
//   });
// });

// idxTest = 1;
// moduleG = generalTest[idxTest].name;
// posG = generalTest[idxTest].idx;
// describe('Imports 4', function () {
//   var idx = posG;
//   describe('#' + moduleG + '.client()', function () {
//     var expected = 'Got ' + moduleG + ':client';
//     it('should reply "' + expected + '"', function () {
//       var result = client()[idx].default();
//       assert.equal(expected, result);
//     });
//   });
// });


// describe('Imports 5', function () {
//   var idx = posG;
//   describe('#' + moduleG + '.lib()', function () {
//     var expected = 'Got "defs" from partner:lib';
//     it('should reply "' + expected + '"', function () {
//       var result = 'Got "' + lib()[idx].default.schemas()[0] + '" from ' + moduleG + ':lib';
//       assert.equal(expected, result);
//     });
//   });
// });

// describe('Imports 6', function () {
//   var idx = posG;
//   describe('#' + moduleG + '.server()', function () {
//     var expected = 'Got ' + moduleG + ':server';
//     it('should reply "' + expected + '"', function () {
//       var result = server()[idx].default.resolvers();
//       assert.equal(expected, result);
//     });
//   });
// });

// idxTest = 0;
// moduleOne = soloTest[idxTest].name;
// posOne = soloTest[idxTest].idx;
// describe('Imports 7', function () {
//   var idx = posOne;
//   describe('#' + moduleOne + '.server() Queries', function () {
//     var expected = 'function';
//     it('should return a "' + expected + '"', function () {
//       var result = typeof server()[idx].resolvers().Queries.deliveryItem;
//       assert.equal(expected, result);
//     });
//   });
// });

// describe('Imports 8', function () {
//   var idx = posOne;
//   describe('#' + moduleOne + '.server() Resolvers', function () {
//     var expected = 'function';
//     it('should return a "' + expected + '"', function () {
//       var result = typeof server()[idx].resolvers;
//       assert.equal(expected, result);
//     });
//   });
// });

// console.log( 'KKK --- LLL', deliveryItemServerTests);
// deliveryItemServerTests();
