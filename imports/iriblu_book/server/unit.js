import book from '../../iriblu_book';
var assert = require('assert');

export default {
  bookServer() {
    describe('Book server tests', function () {
      describe('book.server() name test', function () {
        var expected = 'book';
        it('should return "' + expected + '"', function () {
          var result = book.Name;
          assert.equal(expected, result);
        });
      });
    });
  }
};
