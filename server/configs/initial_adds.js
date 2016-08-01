
import {Posts, AccessControl, TrustLevel} from '/lib/collections';

import {Groups} from './initial_users';

import _lgr from '/lib/logging/server/serverLogger';
const Lgr = new _lgr( __filename, 'verbose' );


export const initPosts = () => {
  if (!Posts.findOne()) {
    for (let lc = 1; lc <= 5; lc++) {
      const title = `This is the post title: ${lc}`;
      const content = `Post ${lc}'s content is great!`;
      Posts.insert({title, content});
    }
  }

  /* eslint-disable no-multi-spaces */
  const accessPoints = [];
  accessPoints.push( [ 'posts', 'update', 'Member',         Groups.defaultGroup ] );
  accessPoints.push( [ 'posts',    'add', 'Registered',     Groups.defaultGroup ] );
  /*  eslint-enable no-multi-spaces  */

  _.each(accessPoints, function (ap) {
    AccessControl.upsertRecord(ap[0], ap[1], TrustLevel[ap[2]], ap[3]);
  });

};

export const initAccessPoints = () => {
  Lgr.a = 'initAccessPoints';

  /* eslint-disable no-multi-spaces */
  const accessPoints = [];
  accessPoints.push( [ 'colors', 'delete', 'Administrator', Groups.defaultGroup ] );
  accessPoints.push( [ 'colors', 'update', 'Staff',         Groups.defaultGroup ] );
  accessPoints.push( [ 'colors',    'add', 'Member',        Groups.defaultGroup ] );
  accessPoints.push( [ 'colors', 'delete', 'Owner',         Groups.subsidiaryGroup ] );
  accessPoints.push( [ 'colors', 'update', 'Administrator', Groups.subsidiaryGroup ] );
  accessPoints.push( [ 'colors',    'add', 'Administrator', Groups.subsidiaryGroup ] );
  /*  eslint-enable no-multi-spaces  */

  _.each(accessPoints, function (ap) {
    AccessControl.upsertRecord(ap[0], ap[1], TrustLevel[ap[2]], ap[3]);
  });

  Lgr.info( ' Claims initialized => ' );

  Lgr.verbose( ' Access Point trust level : ',
    AccessControl.findOne( { module: 'colors', action: 'add', group: Groups.defaultGroup } ).level
  );

};
