import partner from '../../iriblu_partner';
var assert = require('assert');

export default {
  partnerClient() {
    describe('Partner client tests', function () {
      describe('partner.client() name test', function () {
        var expected = 'partner';
        it('should return "' + expected + '"', function () {
          var result = partner.Name;
          assert.equal(expected, result);
        });
      });
    });
  }
};
