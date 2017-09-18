import { usersAdd, usersUpdate } from '/lib/methods/_users';
const LG = console.log; // eslint-disable-line no-console,no-unused-vars

export default {

  // add({Meteor, LocalState, FlowRouter}, data) {
  add({ LocalState, FlowRouter }, data) {

    LG('actions._users.add data', data);

    delete data.confirmPassword;
    delete data.role;
    delete data._id;

    usersAdd.call( data, (err, response) => {
      if (err) {
        return LocalState.set('_users.INSERT_ERROR', err.message);
      }
      if (response._idNew) {
        FlowRouter.go('/users/' + response._idNew);
      }
    });
  },

  update({ LocalState, FlowRouter }, data) {

    LG('actions._users.update data', data);
    delete data.confirmPassword;
    delete data.role;

    usersUpdate.call(data, (err, response) => {
      LG('actions._users.update response ', response);
      if (err) {
        return LocalState.set('_users.UPDATE_ERROR', err.message);
      }
      FlowRouter.go('/users/');
    });
  },

  hide({Meteor, LocalState, FlowRouter}, _id) {
    // console.log('actions._users.hide _id', _id);
    // console.log('actions._users.hide Meteor.userId()', Meteor.userId());

    Meteor.call('_users.hide', _id, (err) => {
      if (_id === Meteor.userId()) {
        // console.log('cant hide self');
        return LocalState.set('_users.HIDE_ERROR', 'Seppuku :-) ');
      }
      if (err) {
        return LocalState.set('_users.HIDE_ERROR', err.message);
      }
      FlowRouter.go('/users');

    });
  },

  clearUserErrors({LocalState}) {
    LocalState.set('_users.HIDE_ERROR', null);
    LocalState.set('_users.INSERT_ERROR', null);
    LocalState.set('_users.UPDATE_ERROR', null);
    return;
  }

};
