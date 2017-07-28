import { names, client, lib, server } from '../../imports';
var assert = require('assert');

var module = "";
var pos = -1;
var idxTest =-1;

var generalTest = [];
var soloTest = [];
names().forEach((name, idx) => {
  if ( name === 'deliveryItems') {
    soloTest.push({name: name, idx: idx});
  } else {
    generalTest.push({name: name, idx: idx});
  }
});

/*
           THESE TESTS ARE NPM DRIVEN
           WON'T WOTK WITH METEOR
*/

idxTest = 0;
module = generalTest[idxTest].name;
pos = generalTest[idxTest].idx;
describe('Imports', function() {
  var idx = pos;
  describe('#' + module + '.client()', function() {
    var expected='Got ' + module + ':client';
    it('should reply "' + expected + '" ?????????????????????????????????????????????', function() {
      var result = client()[idx]();
      assert.equal(expected, result);
    });
  });
});

describe('Imports', function() {
  var idx = pos;
  describe('#' + module + '.lib()', function() {
    var expected='Got ' + module + ':lib';
    it('should reply "' + expected + '"', function() {
      var result = lib()[idx]();
      assert.equal(expected, result);
    });
  });
});

describe('Imports', function() {
  var idx = pos;
  describe('#' + module + '.client()', function() {
    var expected='Got ' + module + ':server';
    it('should reply "' + expected + '"', function() {
      var result = server()[idx]();
      assert.equal(expected, result);
    });
  });
});


idxTest = 1;
module = generalTest[idxTest].name;
pos = generalTest[idxTest].idx;
describe('Imports', function() {
  var idx = pos;
  describe('#' + module + '.client()', function() {
    var expected='Got ' + module + ':client';
    it('should reply "' + expected + '"', function() {
      var result = client()[idx]();
      assert.equal(expected, result);
    });
  });
});

describe('Imports', function() {
  var idx = pos;
  describe('#' + module + '.lib()', function() {
    var expected='Got ' + module + ':lib';
    it('should reply "' + expected + '"', function() {
      var result = lib()[idx]();
      assert.equal(expected, result);
    });
  });
});

describe('Imports', function() {
  var idx = pos;
  describe('#' + module + '.client()', function() {
    var expected='Got ' + module + ':server';
    it('should reply "' + expected + '"', function() {
      var result = server()[idx]();
      assert.equal(expected, result);
    });
  });
});



module = soloTest[0].name;
pos = soloTest[0].idx;
describe('Imports', function() {
  var idx = pos;
  describe('#' + module + '.server()', function() {
    var expected='deliveryItems';
    it('should reply "' + expected + '"', function() {
      console.log("  SERVER()[POS].MODULEnAME ::: ");
      var result = server()[pos].moduleName;
      assert.equal(expected, result);
    });
  });
});


describe('Imports', function() {
  var idx = pos;
  describe('#' + module + '.server()', function() {
    var expected='resolvers';
    it('should reply "' + expected + '"', function() {
      console.log("  SERVER()[POS].RESOLVERS ::: ");
      var result = server()[pos].resolvers();
      assert.equal(expected, result);
    });
  });
});

