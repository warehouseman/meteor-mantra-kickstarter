import {Posts, AccessControl, TrustLevel} from '/lib/collections';
import {Groups} from './initial_users';

import _lgr from '/lib/Logging/server/serverLogger';
const Lgr = new _lgr( __filename, 'verbose' );

Meteor.startup(() => {
  // code to run on server at startup
});

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
  Lgr.a = 'initAccessPoints';

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

  Lgr.info( ' Claims initialized => ' );

  Lgr.verbose( ' Access Point trust level : ',
    AccessControl.findOne( { key: 'colors.add', group: Groups.defaultGroup } ).level
  );

};
