import methodStubs from './configs/method_stubs';
import actions from './actions';
import routes from './routes.jsx';

export default {
  routes,
  actions,
  load(context) {
//    console.log(' loading method_stubs ', context);
    methodStubs(context);
  }
};
