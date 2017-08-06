import deliveryItem from '../../iriblu_deliveryitem';
var assert = require('assert');

export default {
  deliveryItemClient() {
    describe('Delivery Item client tests', function () {
      describe('deliveryItem.client() name test', function () {
        var expected = 'deliveryItem';
        it('should return "' + expected + '"', function () {
          var result = deliveryItem.Name;
          assert.equal(expected, result);
        });
      });
    });
  }
};
