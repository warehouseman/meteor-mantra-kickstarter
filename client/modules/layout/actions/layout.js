export default {

  clearErrors({LocalState, Logger}) {
    Logger.blue.underline('clearErrors')
     .bold('clearing now')
     .gray(Logger.path(__filename))
     .trace();
    LocalState.set('layout.ERROR', null);
    return;
  }

};
