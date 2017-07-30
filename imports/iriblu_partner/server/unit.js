import partner from '../../iriblu_partner';
var assert = require('assert');

export default {
  partnerServer() {
    describe('Partner server tests', function () {
      describe('partner.server() name test', function () {
        var expected = 'partner';
        it('should return "' + expected + '"', function () {
          var result = partner.Name;
          assert.equal(expected, result);
        });
      });
    });
  }
};
