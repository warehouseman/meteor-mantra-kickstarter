import publications from './publications';
import methods from './methods';
import addInitialUsers from './configs/initial_users.js';
import { initPosts, initAccessPoints } from './configs/initial_adds.js';

Meteor.startup(function () {

  if ( Meteor.settings.MAILGUN_KEY &&
       Meteor.settings.MAILGUN_KEY.length &&
       Meteor.settings.MAILGUN_KEY.length === 36 ) {
    return;
  }

  console.log('\n\n **STOPPED **\n' +
    '     Please ensure that your file, "settings.json", ' +
                                                  'has a valid Mailgun authentication key.\n' +
    '     Make a copy of "settings.json.example", then ' +
                                               'correct the provided configuration fields.\n' +
    '     Then you can restart Meteor with the command : `meteor --settings=settings.json`\n');
  process.exit();

});

publications();
methods();
initPosts();
initAccessPoints();
addInitialUsers();
