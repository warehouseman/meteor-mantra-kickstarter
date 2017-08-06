import deliveryItem from '../../iriblu_deliveryitem';
var assert = require('assert');

export default {
  deliveryItemLib() {
    describe('Delivery Item lib tests', function () {
      describe('deliveryItem.lib() name test', function () {
        var expected = 'deliveryItem';
        it('should return "' + expected + '"', function () {
          var result = deliveryItem.Name;
          assert.equal(expected, result);
        });
      });
    });
  }
};
