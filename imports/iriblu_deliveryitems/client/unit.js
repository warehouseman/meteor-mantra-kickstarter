import deliveryItems from '../../iriblu_deliveryitems';
var assert = require('assert');

export default {
  deliveryItemsClient() {
    describe('Delivery Items client tests', function () {
      describe('deliveryItems.client() name test', function () {
        var expected = 'deliveryItems';
        it('should return "' + expected + '"', function () {
          var result = deliveryItems.Name;
          assert.equal(expected, result);
        });
      });
    });
  }
};
