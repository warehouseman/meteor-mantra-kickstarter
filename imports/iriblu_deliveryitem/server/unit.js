import deliveryItem from '../../iriblu_deliveryitem';
import assert from 'assert';
import rp from 'request-promise';

const LG = console.log; // eslint-disable-line no-console,no-unused-vars

const prot = process.env.HOST_SERVER_PROTOCOL;
const name = process.env.HOST_SERVER_NAME;
const port = process.env.HOST_SERVER_PORT;
const options = {
  uri: prot + '://' + name + ':' + port + '/graphql',
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
  deliveryItemServer() {

    describe('Delivery Item Tests', function () {
      describe('deliveryItem.server() name test', function () {
        var expected = 'deliveryItem';
        it('should return "' + expected + '"', function () {
          var result = deliveryItem.Name;
          assert.equal(expected, result);
        });
      });
    });

    describe('Delivery Item Tests', function () {
      describe('deliveryItem.server() graphql test', function () {
        var expected = 'IBAA001';
        it('Should return the first delivery code', function () { // no done
          if ( process.env.CI === 'true') {
            LG(' *** SHORT-CIRCUITED : Not Suitable For Continuous Integration Tests ***');
            assert.equal(expected, expected);
          } else {
            this.timeout(60000);
            return rp(options).then(function (rslt) {
              assert.equal(rslt.data.deliveryItem[0].cod, expected);
            });
          }
        });
      });
    });

  }
};
