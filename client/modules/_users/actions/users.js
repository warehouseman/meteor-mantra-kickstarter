export default {

  add({Meteor, LocalState, FlowRouter}, data) {
    // console.log('actions._users.add data', data);
    const userObject = {
      email: data.email,
      password: data.password1,
      profile: {
        firstName: data.firstName,
        lastName: data.lastName
      },
      role: data.role
    };

    Meteor.call('_users.add', userObject, (err, response) => {
      // console.log('actions._users.add response ', response);
      if (err) {
        return LocalState.set('_users.INSERT_ERROR', err.message);
      }
      if (response._idNew) {
        FlowRouter.go('/users/' + response._idNew);
      }
    });

/*
    Meteor.call('_users.add', userObject, (err, response) => {
      console.log('actions._users.add call', userObject);
      if (err) {
        console.log('actions._users.add INSERT_ERROR : ', err.message);
        return LocalState.set('_users.INSERT_ERROR', err.message);
      }
      let id = response.user._id;
      console.log('actions._users.add response ', id);
      if ( id ) {
        FlowRouter.go('/users/' + id);
      }
    });
*/
  },

  update({Meteor, LocalState, FlowRouter}, data, _id) {

    LocalState.set('_users.UPDATE_ERROR', 'TESTING');
    Meteor.call('_users.update', data, _id, (err) => {
      // console.log('actions._users.update back from callback ');
      if (err) {
        // console.log('actions._users.update UPDATE_ERROR ', err.message);
        return LocalState.set('_users.UPDATE_ERROR', err.message);
      }
      // console.log('actions._users.update OK ');
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
