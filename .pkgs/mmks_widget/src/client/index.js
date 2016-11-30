import utils from '../utils';
import initAuthorizations from './configs/authInit';
import methodStubs from './configs/method_stubs';
import actions from './actions';
import routes from './routes';

function init( _utils ) {

  utils.Logger = _utils.Logger;
  utils.LayoutDefault = _utils.LayoutDefault;
  utils.AccessControlComposer = _utils.AccessControlComposer;
  utils.Authorized = _utils.Authorized;

  actions._widgets.initialize();

  return {
    routes,
    actions,
    load(context) {
      methodStubs(context);
      initAuthorizations(context);
    }
  };

}

const Client = {
  new: init,
};

export default Client;

export const Utils = utils;
