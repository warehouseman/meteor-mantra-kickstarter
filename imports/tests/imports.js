import { names, client, lib, server } from '../../imports';
var assert = require('assert');

var moduleG = '';
var moduleOne = '';
var posG = -1;
var posOne = -1;
var idxTest = -1;

var generalTest = [];
var soloTest = [];

names().forEach((name, idx) => {
  if ( name === 'deliveryItems') {
    soloTest.push({name, idx});
  } else {
    generalTest.push({name, idx});
  }
});

/*
           THESE TESTS ARE NPM DRIVEN
           WON'T WOTK WITH METEOR
*/

idxTest = 0;
moduleG = generalTest[idxTest].name;
posG = generalTest[idxTest].idx;
describe('Imports 1', function () {
  var idx = posG;
  describe('#' + idx + '.client()', function () {
    var expected = 'Got ' + moduleG + ':client';
    it('should reply "' + expected + '"', function () {
      var result = client()[idx].default();
      assert.equal(expected, result);
    });
  });
});

describe('Imports 2', function () {
  var idx = posG;
  describe('#' + moduleG + '.lib()', function () {
    var expected = 'Got "defs" from ' + moduleG + ':lib';
    it('should reply "' + expected + '"', function () {
      var result = 'Got "' + lib()[idx].default.schemas()[0] + '" from book:lib';
      assert.equal(expected, result);
    });
  });
});

describe('Imports 3', function () {
  var idx = posG;
  describe('#' + moduleG + '.server()', function () {
    var expected = 'Got ' + moduleG + ':server';
    it('should reply "' + expected + '"', function () {
      var result = server()[idx].default.resolvers();
      assert.equal(expected, result);
    });
  });
});

idxTest = 1;
moduleG = generalTest[idxTest].name;
posG = generalTest[idxTest].idx;
describe('Imports 4', function () {
  var idx = posG;
  describe('#' + moduleG + '.client()', function () {
    var expected = 'Got ' + moduleG + ':client';
    it('should reply "' + expected + '"', function () {
      var result = client()[idx].default();
      assert.equal(expected, result);
    });
  });
});


describe('Imports 5', function () {
  var idx = posG;
  describe('#' + moduleG + '.lib()', function () {
    var expected = 'Got "defs" from partner:lib';
    it('should reply "' + expected + '"', function () {
      var result = 'Got "' + lib()[idx].default.schemas()[0] + '" from ' + moduleG + ':lib';
      assert.equal(expected, result);
    });
  });
});

describe('Imports 6', function () {
  var idx = posG;
  describe('#' + moduleG + '.server()', function () {
    var expected = 'Got ' + moduleG + ':server';
    it('should reply "' + expected + '"', function () {
      var result = server()[idx].default.resolvers();
      assert.equal(expected, result);
    });
  });
});

idxTest = 0;
moduleOne = soloTest[idxTest].name;
posOne = soloTest[idxTest].idx;
describe('Imports', function () {
  var idx = posOne;
  describe('#' + module + '.server()', function () {
    var expected = 'function';
    it('should return a "' + expected + '"', function () {
      var result = typeof server()[idx].default.resolvers().Queries.deliveryItem;
      assert.equal(expected, result);
    });
  });
});


describe('Imports', function () {
  var idx = posOne;
  describe('#' + moduleOne + '.server()', function () {
    var expected = 'function';
    it('should return a "' + expected + '"', function () {
      var result = typeof server()[idx].default.resolvers;
      assert.equal(expected, result);
    });
  });
});

