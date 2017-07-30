import book from '../../iriblu_book';
var assert = require('assert');

export default {
  bookClient() {
    describe('Book client tests', function () {
      describe('book.client() name test', function () {
        var expected = 'book';
        it('should return "' + expected + '"', function () {
          var result = book.Name;
          assert.equal(expected, result);
        });
      });
    });
  }
};
