import { Utils } from '../index';

let Lgr = null;

export default {

  initialize() {
    Lgr = new Utils.Logger( __filename, 'warn' );
    Lgr.a = 'getLogger';
  },

  clearErrors({LocalState, Logger}) {
    Logger.blue.underline('clearErrors')
     .bold('clearing now')
     .gray(Logger.path(__filename))
     .trace();
    LocalState.set('layout.ERROR', null);
    return;
  }

};
