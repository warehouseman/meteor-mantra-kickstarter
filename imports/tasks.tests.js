/* eslint-env mocha */

import { Meteor } from 'meteor/meteor';
import { names, client, lib, server } from '../imports';

var generalTest = [];
var soloTest = [];
names().forEach((name, idx) => {
  if ( name === 'deliveryItems') {
    soloTest.push({name: name, idx: idx});
  } else {
    generalTest.push({name: name, idx: idx});
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

