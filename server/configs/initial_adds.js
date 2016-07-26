/* eslint-disable no-console */
import {Posts, AccessControl, TrustLevel} from '/lib/collections';

import {Groups} from './initial_users';

import Logger from '../../lib/logging';
const txtPath = Logger.path(__filename);

export const initPosts = () => {
  if (!Posts.findOne()) {
    for (let lc = 1; lc <= 5; lc++) {
      const title = `This is the post title: ${lc}`;
      const content = `Post ${lc}'s content is great!`;
      Posts.insert({title, content});
    }
  }
};

export const initAccessPoints = () => {
  const nameMethod = 'initialize-access-points';

  /* eslint-disable no-multi-spaces */
  const accessPoints = [];
  accessPoints.push( [ 'colors.update', 'Staff',         Groups.defaultGroup ] );
  accessPoints.push( [    'colors.add', 'Member',        Groups.defaultGroup ] );
  accessPoints.push( [ 'colors.update', 'Administrator', Groups.subsidiaryGroup ] );
  accessPoints.push( [    'colors.add', 'Administrator', Groups.subsidiaryGroup ] );
  /* eslint-enable no-multi-spaces */

  _.each(accessPoints, function (ap) {
    AccessControl.upsertRecord(ap[0], TrustLevel[ap[1]], ap[2]);
  });

  Logger.italic(nameMethod)
  .bold(' Claims initialized \n')
  .gray(txtPath)
  .info();

  // const acl = AccessControl.findAccessPoint( 'colors.update', Groups.defaultGroup );
  // console.log(' Trusted Roles : ', acl.trusted);

  console.log(' Access Point trust level : ',
    AccessControl.findOne( { key: 'colors.add', group: Groups.defaultGroup } ).level
  );

};
