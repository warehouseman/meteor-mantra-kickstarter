import {Meteor} from 'meteor/meteor';

export default function () {
  Meteor.methods({
    'system.isSubModule'() {
      if (Meteor.settings.public.IS_GITSUBMODULE) return 'Submodule';
       return 'Stand-alone';
    }
  });
}
