/* eslint-env mocha */

import { Meteor } from 'meteor/meteor';
import { names, client, lib } from '../imports';
import assert from 'assert';

var generalTest = [];
var soloTest = [];
names().forEach((name, idx) => {
  if ( name === 'deliveryItems') {
    soloTest.push({name: name, idx: idx});
  } else {
    generalTest.push({name: name, idx: idx});
  }
});

var mdle = "";
var pos = -1;
var idxTest =-1;

idxTest = 0;
mdle = generalTest[idxTest].name;
pos = generalTest[idxTest].idx;

describe('Imports', function() {
  var idx = pos;
  describe('#' + mdle + '.client()', function() {
    var expected='Got ' + mdle + ':client';
    it('should reply "' + expected + '"', function() {
      console.log('  CLIENT ', ); // ();
      var result = client()[idx].default();
      assert.equal(expected, result);
    });
  });
});

describe('Imports', function() {
  var idx = pos;
  describe('#' + mdle + '.lib()', function() {
    var expected='Got ' + mdle + ':lib';
    it('should reply "' + expected + '"', function() {
      var result = lib()[idx].default();
      assert.equal(expected, result);
    });
  });
});

idxTest = 1;
mdle = generalTest[idxTest].name;
pos = generalTest[idxTest].idx;
describe('Imports', function() {
  var idx = pos;
  describe('#' + mdle + '.client()', function() {
    var expected='Got ' + mdle + ':client';
    it('should reply "' + expected + '"', function() {
      var result = client()[idx].default();
      assert.equal(expected, result);
    });
  });
});

describe('Imports', function() {
  var idx = pos;
  describe('#' + mdle + '.lib()', function() {
    var expected=mdle;
    it('should reply "' + expected + '"', function() {
      var result = lib()[idx].default.moduleName;
      assert.equal(expected, result);
    });
  });
});


mdle = soloTest[0].name;
pos = soloTest[0].idx;
describe('Imports', function() {
  var idx = pos;
  describe('#' + mdle + '.client()', function() {
    var expected='Got ' + mdle + ':client';
    it('should reply "' + expected + '"', function() {
      var result = client()[idx].default();
      assert.equal(expected, result);
    });
  });
});
