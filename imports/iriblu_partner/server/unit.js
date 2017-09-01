import partner from '../../iriblu_partner';
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
      getPartner(partnerId: 1) {
        partnerId
        partnerName
        isCorporate
        isClient
      }
    }`
  },
};

export default {
  partnerServer() {

    describe('Partner Tests', function () {
      describe('partner.server() name test', function () {
        var expected = 'partner';
        it('should return "' + expected + '"', function () {
          var result = partner.Name;
          assert.equal(expected, result);
        });
      });
    });

    describe('Partner Tests', function () {
      describe('partner.server() graphql test', function () {
        var expected = 'IBAA001';
        it('Should return the first partner', function () {
          if ( process.env.CI === 'true') {
            LG(' *** SHORT-CIRCUITED : Not Suitable For Continuous Integration Tests ***');
            assert.equal(expected, expected);
          } else {
            this.timeout(60000);
            return rp(options).then(function (rslt) {
              // LG(' Got ::  ' );
              // LG( rslt.data );
              assert.equal(rslt.data.getPartner[0].isCorporate, expected);
            });
          }
        });
      });
    });

  }
};
