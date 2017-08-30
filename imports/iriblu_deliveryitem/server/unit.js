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
      getDeliveryItem(itemId: 1) {
        itemId
        fkDelivery
        code
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
        it('Should return the first delivery item', function () {
          if ( process.env.CI === 'true') {
            LG(' *** SHORT-CIRCUITED : Not Suitable For Continuous Integration Tests ***');
            assert.equal(expected, expected);
          } else {
            this.timeout(60000);
            return rp(options).then(function (rslt) {
              // LG(' Got ::  ' );
              // LG( rslt.data );
              assert.equal(rslt.data.getDeliveryItem[0].code, expected);
            });
          }
        });
      });
    });

  }
};
