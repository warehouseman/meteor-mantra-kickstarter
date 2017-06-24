import {Meteor} from 'meteor/meteor';

export default function () {
  Meteor.methods({
    'system.isSubModule'() {
      if (
        Meteor.settings.public.IS_GITSUBMODULE.toLowerCase() === 'true' ||
        Meteor.settings.public.IS_GITSUBMODULE.toLowerCase() === 'yes'
      ) {
        return 'Submodule';
      }
      return 'Stand-alone';
    }
  });
}
