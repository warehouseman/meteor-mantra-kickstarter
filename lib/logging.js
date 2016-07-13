/* eslint-disable no-path-concat */

import logatim from 'logatim';

let current = 'error';
let side = 'Client';
if (Meteor.isServer) {
  current = 'info';
  side = 'Server';
}

logatim.setLevel('info');
logatim.warn(side + '-side logging level : ', current, '(in file : `' + __filename + '`)');
logatim.setLevel(current);
logatim.path = function path(_filename) {
  return '  º (in file : `' + _filename + '`)';
};

export default logatim;
