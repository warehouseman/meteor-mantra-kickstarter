/* eslint-disable no-console */
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

  requestPasswordReset({Meteor, LocalState, FlowRouter}, email) {

    if ( email ) {

      LocalState.set('_users.PASSWORD_RESET_ERROR', null);

      Meteor.call('_users.passwordResetRequest', email, (err) => {
        if (err) {
          return LocalState.set('_users.PASSWORD_RESET_ERROR', err.message);
        }
        FlowRouter.go('/prrs/' + email);

      });

    } else {

      return LocalState.set('_users.PASSWORD_RESET_ERROR',
                            'Could not send to email address : <' + email + '>.');

    }

  },

  loginErrorClear({LocalState}) {
    return LocalState.set('LOGIN_ERROR', null);
  },

  resetPassword({Meteor, LocalState, FlowRouter}, _code, _password1, _password2) {

    if ( !_password1 || !_password2 ) {
      return LocalState.set('_users.PASSWORD_RESET_ERROR'
                          , 'Please fill out all the required fields!');
    }

    if ( _password1 !== _password2 ) {
      return LocalState.set('_users.PASSWORD_RESET_ERROR', 'Passwords do not match!');
    }

    // console.log('actions.resetPassword _code ' + _code + ' pwd ' + _password1);
    Meteor.call('_users.resetPwd', _code, _password1, (err) => {
      if (err) {
        return LocalState.set('_users.PASSWORD_RESET_ERROR', err.message);
      }
      // console.log('actions.resetPassword success ');
      FlowRouter.go('/login');
    });
  },

  register({Meteor, LocalState, FlowRouter}, email, password1, password2) {
    // console.log(' account actions register ');

    if ( !email || !password1 || !password2 ) {
      return LocalState.set('REGISTER_ERROR', 'Please fill out all the required fields!');
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
      // console.log('actions.acct.register response ', response);
      if (err) {
        return LocalState.set('_users.SAVE_ERROR', err.message);
      }
      if (response._idNew) {
        FlowRouter.go('/users/' + response._idNew);
      }
    });
  },

  registerErrorClear({LocalState}) {
    LocalState.set('PASSWORD_RESET_ERROR', null);
    LocalState.set('REGISTER_ERROR', null);
    return;
  },

};
