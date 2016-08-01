import _lgr from '/lib/logging/client/clientLogger';
const Lgr = new _lgr(__filename, 'verbose', true);

export default {

  // create
  add({Meteor, LocalState, FlowRouter}, data) {
    Lgr.a = 'add';
    const _id = Meteor.uuid();
    Meteor.call('_colors.add', data, _id, (err) => {
      if (err) {
        Lgr.error(err.message);
        LocalState.set('_colors.ADD_ERROR', err.message);
        return;
      }
      FlowRouter.go('/colors/' + _id);
    });
  },

  // update
  update({Meteor, LocalState, FlowRouter}, data, _id) {
    Lgr.a = 'add';
    Meteor.call('_colors.update', data, _id, (err) => {
      if (err) {
        Lgr.error(err.message);
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
  clearErrors({LocalState}) {
    Lgr.a = 'clearErrors';
    Lgr.debug('clearing now');
    LocalState.set('_colors.DELETE_ERROR', null);
    LocalState.set('_colors.HIDE_ERROR', null);
    LocalState.set('_colors.ADD_ERROR', null);
    LocalState.set('_colors.UPDATE_ERROR', null);
    return;
  }

};
