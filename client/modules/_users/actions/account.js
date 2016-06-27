export default {

  login({Meteor, LocalState, FlowRouter}, email, password) {

    if (!email || !password) {
      return LocalState.set('LOGIN_ERROR', 'Login & Password are required!');
    }

    LocalState.set('LOGIN_ERROR', null);

    Meteor.loginWithPassword(email, password, (err) => {
      if (err && err.reason) {
        return LocalState.set('LOGIN_ERROR', err.reason);
      }
      FlowRouter.go('/account');
    });

  },

  loginErrorClear({LocalState}) {
    return LocalState.set('LOGIN_ERROR', null);
  },

  register({Meteor, LocalState, FlowRouter}, email, password1, password2) {

    if ( !email || !password1 || !password2 ) {
      return LocalState.set('REGISTER_ERROR', 'Please fill out all the required fileds!');
    }

    if ( password1 !== password2 ) {
      return LocalState.set('REGISTER_ERROR', 'Passwords do not match!');
    }

    const userObject = {
      email,
      profile: {
        firstName: '',
        lastName: ''
      },
      password: password1,
      role: 'none'
    };

    Meteor.call('_users.add', userObject, (err, response) => {
      if (err) {
        return LocalState.set('_users.SAVE_ERROR', err.message);
      }
      if (response._idNew) {
        FlowRouter.go('/users/' + response._idNew);
      }
    });

  },

  registerErrorClear({LocalState}) {
    return LocalState.set('REGISTER_ERROR', null);
  },

};
