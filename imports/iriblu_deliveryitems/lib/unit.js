import deliveryItems from '../../iriblu_deliveryitems';
var assert = require('assert');

export default {
  deliveryItemsLib() {
    describe('Delivery Items lib tests', function () {
      describe('deliveryItems.lib() name test', function () {
        var expected = 'deliveryItems';
        it('should return "' + expected + '"', function () {
          var result = deliveryItems.Name;
          assert.equal(expected, result);
        });
      });
    });
  }
};
