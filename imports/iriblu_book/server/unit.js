import book from '../../iriblu_book';
import assert from 'assert';
import rp from 'request-promise';

const options = {
  uri: 'http://iridev:3000/graphql',
  headers: {
    'User-Agent': 'Request-Promise'
  },
  qs: {
    query: '{book(_id: 1){_id,title}}'
  },
  json: true // Automatically parses the JSON string in the response
};

const LG = console.log; // eslint-disable-line no-console,no-unused-vars

export default {
  bookServer() {

    describe('Book server tests', function () {
      describe('book.server() name test', function () {
        var expected = 'book';
        it('should return "' + expected + '"', function () {
          var result = book.Name;
          assert.equal(result, expected);
        });
      });
    });

    describe('Book server tests', function () {
      describe('book.server() name test', function () {
        var expected = 'book';
        it('should return "' + expected + '"', function () {
          var result = book.Server.moduleName;
          assert.equal(result, expected);
        });
      });
    });

    // {"data":{"book":[{"_id":1,"title":"Marketing Manager"}]}}
    describe('Book server tests', function () {
      describe('book.server() graphql test', function () {
        // var expected = { data: { book: [ {_id: 1, title: 'Marketing Manager'} ]}};
        var expected = 'Marketing Manager';
        it('Should return the found book', function () { // no done
          this.timeout(60000);
          return rp(options).then(function (rslt) {
            LG( 'rslt', rslt);
            LG( 'rslt.data', rslt.data);
            LG( 'rslt.data.book', rslt.data.book);
            LG( 'rslt.data.book[0]', rslt.data.book[0]);
            // expect(rslt.data.book[0].title).to.equal(expected, 'The book title');
            assert.equal(rslt.data.book[0].title, expected);
          });// no catch, it'll figure it out since the promise is rejected
        });
      });
    });

  }
};
