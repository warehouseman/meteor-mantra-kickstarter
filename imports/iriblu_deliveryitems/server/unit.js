import deliveryItems from '../../iriblu_deliveryitems';
import assert from 'assert';
import rp from 'request-promise';

const LG = console.log; // eslint-disable-line no-console,no-unused-vars

const options = {
  uri: 'http://iridev:3000/graphql',
  headers: { 'User-Agent': 'Request-Promise' },
  json: true,
  qs: {
    query: `{
      deliveryItem(entrega_lines_id: 1) {
        entrega_lines_id
        cod
        entrega_id
        createdAt
      }
    }`
  },
};

export default {
  deliveryItemsServer() {

    describe('Delivery Items Tests', function () {
      describe('deliveryItems.server() name test', function () {
        var expected = 'deliveryItems';
        it('should return "' + expected + '"', function () {
          var result = deliveryItems.Name;
          assert.equal(expected, result);
        });
      });
    });

    describe('Book server tests', function () {
      describe('book.server() graphql test', function () {
        var expected = 'IBAA001';
        it('Should return the found book', function () { // no done
          this.timeout(60000);
          return rp(options).then(function (rslt) {
            assert.equal(rslt.data.deliveryItem[0].cod, expected);
          });
        });
      });
    });

  }
};
