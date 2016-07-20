export default {

  // create
  add({Meteor, LocalState, FlowRouter, Logger}, data) {
    // console.log ('actions._colors.add data', data);
    const _id = Meteor.uuid();
    Meteor.call('_colors.add', data, _id, (err) => {
      if (err) {
        Logger.blue.underline('add -- ')
         .bold(err.message)
         .gray(Logger.path(__filename))
         .error();
        LocalState.set('_colors.ADD_ERROR', err.message);
        return;
      }
      FlowRouter.go('/colors/' + _id);
    });
  },

  // update
  update({Meteor, LocalState, FlowRouter, Logger}, data, _id) {
    // console.log ('actions._colors.update _id', _id);
    // console.log ('actions._colors.update data', data);

    Meteor.call('_colors.update', data, _id, (err) => {
      if (err) {
        Logger.blue.underline('update -- ')
         .bold(err.message)
         .gray(Logger.path(__filename))
         .error();
        LocalState.set('_colors.UPDATE_ERROR', err.message);
        return;
      }
      FlowRouter.go('/colors/' + _id);
    });
  },

  hide({Meteor, LocalState, FlowRouter}, _id) {

    Meteor.call('_colors.hide', _id, (err) => {
      if (err) {
        return LocalState.set('_colors.HIDE_ERROR', err.message);
      }
      FlowRouter.go('/colors/');

    });
  },

  // clearError
  clearErrors({LocalState, Logger}) {
    Logger.blue.underline('clearErrors')
     .bold('clearing now')
     .gray(Logger.path(__filename))
     .trace();
    LocalState.set('_colors.DELETE_ERROR', null);
    LocalState.set('_colors.HIDE_ERROR', null);
    LocalState.set('_colors.ADD_ERROR', null);
    LocalState.set('_colors.UPDATE_ERROR', null);
    return;
  }

};
