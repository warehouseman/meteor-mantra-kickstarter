import deliveryItems from '../../iriblu_deliveryitems';
var assert = require('assert');

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
  }
};
