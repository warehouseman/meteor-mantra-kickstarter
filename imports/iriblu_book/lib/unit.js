import book from '../../iriblu_book';
var assert = require('assert');

export default {
  bookLib() {
    describe('Book lib tests', function () {
      describe('book.lib() name test', function () {
        var expected = 'book';
        it('should return "' + expected + '"', function () {
          var result = book.Name;
          assert.equal(expected, result);
        });
      });
    });
  }
};
