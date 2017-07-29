/* eslint-env mocha */

import { Meteor } from 'meteor/meteor';
import { names } from '../imports';

var generalTest = [];
var soloTest = [];
names().forEach((name, idx) => {
  if ( name === 'deliveryItems') {
    soloTest.push({name, idx});
  } else {
    generalTest.push({name, idx});
  }
});

if (Meteor.isServer) {
  describe('Imports - Tasks', () => {
    describe('methods', () => {
      it('can delete its own task', () => {
      });
    });
  });
}

