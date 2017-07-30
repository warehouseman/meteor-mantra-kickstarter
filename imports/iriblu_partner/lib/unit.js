import partner from '../../iriblu_partner';
var assert = require('assert');

export default {
  partnerLib() {
    describe('Partner lib tests', function () {
      describe('partner.lib() name test', function () {
        var expected = 'partner';
        it('should return "' + expected + '"', function () {
          var result = partner.Name;
          assert.equal(expected, result);
        });
      });
    });
  }
};
