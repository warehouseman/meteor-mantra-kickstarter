const {describe, it} = global;
import {expect} from 'chai';
// import {spy, stub} from 'sinon';

// import typeDefs from '../typeDefs';    * * *  Temporarily * * *

describe('lib.api', () => {
  describe('merge', () => {
    const fat = 'abcd';
    const thin = 'abcd';
    // console.log('---');
    // console.log(typeDefs);
    // console.log('---');
    it('should merge idempotently', () => {
      expect(fat).to.equal(thin);
    });
  });
});
