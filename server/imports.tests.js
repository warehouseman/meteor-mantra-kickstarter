/* eslint-env mocha */
/* eslint-disable no-console   */

import { names, server, lib } from '../imports';
import assert from 'assert';

var generalTest = [];
var soloTest = [];
names().forEach((name, idx) => {
  if ( name === 'deliveryItems') {
    soloTest.push({name, idx});
  } else {
    generalTest.push({name, idx});
  }
});

var mdle = '';
var pos = -1;
var idxTest = -1;

idxTest = 0;
mdle = generalTest[idxTest].name;
pos = generalTest[idxTest].idx;

describe('Imports', function () {
  var idx = pos;
  describe('#' + mdle + '.server()', function () {
    var expected = 'Got ' + mdle + ':server';
    it('should reply "' + expected + '"', function () {
      var result = 'Got ' + server()[idx].default.moduleName + ':server';
      // var result = server()[idx].default();
      assert.equal(expected, result);
    });
  });
});

describe('Imports', function () {
  var idx = pos;
  describe('#' + mdle + '.lib()', function () {
    var expected = 'Got ' + mdle + ':lib';
    it('should reply "' + expected + '"', function () {
      var result = 'Got ' + lib()[idx].default.moduleName + ':lib';
      // var result = lib()[idx].default();
      assert.equal(expected, result);
    });
  });
});

idxTest = 1;
mdle = generalTest[idxTest].name;
pos = generalTest[idxTest].idx;
describe('Imports', function () {
  var idx = pos;
  describe('#' + mdle + '.server()', function () {
    var expected = 'Got ' + mdle + ':server';
    it('should reply "' + expected + '"', function () {
      var result = 'Got ' + server()[idx].default.moduleName + ':server';
      // var result = server()[idx].default();
      assert.equal(expected, result);
    });
  });
});

describe('Imports', function () {
  var idx = pos;
  describe('#' + mdle + '.lib()', function () {
    var expected = 'Got ' + mdle + ':lib';
    it('should reply "' + expected + '"', function () {
      var result = 'Got ' + lib()[idx].default.moduleName + ':lib';
      assert.equal(expected, result);
    });
  });
});


mdle = soloTest[0].name;
pos = soloTest[0].idx;
describe('Imports', function () {
  var idx = pos;
  describe('#' + module + '.server()', function () {
    var expected = 'deliveryItems';
    it('should reply "' + expected + '"', function () {
      var result = server()[idx].default.moduleName;
      assert.equal(expected, result);
    });
  });
});

describe('Imports', function () {
  var idx = pos;
  describe('#' + mdle + '.server()', function () {
    var expected = mdle;
    it('should reply "' + expected + '"', function () {
      var result = server()[idx].default.moduleName;
      assert.equal(expected, result);
    });
  });
});
