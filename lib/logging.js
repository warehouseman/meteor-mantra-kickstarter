/* eslint-disable no-path-concat */

import logatim from 'logatim';

let current = 'debug';
let side = 'Client';
if (Meteor.isServer) {
  current = 'info';
  side = 'Server';
}

logatim.setLevel('info');
logatim.warn(side + '-side logging level : ', current, '(in file : `' + __filename + '`)');
logatim.setLevel(current);
logatim.path = function path(_filename) {
  return ' (in file : `' + _filename + '`)';
};

export default logatim;
