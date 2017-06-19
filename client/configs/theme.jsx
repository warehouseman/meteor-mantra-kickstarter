const R = require;
function requireLayout(isModule) {
  console.log( '******* isModule : ', isModule );  // eslint-disable-line no-console

  if ( isModule.toLowerCase() === 'true' ) {
    return R('mmks_layout').LayoutDefault;
  }
  return R('../modules/layout/containers/Layout.jsx').default;
}

const LayoutDefault = requireLayout(Meteor.settings.public.IS_GITSUBMODULE);

export {

  LayoutDefault

};


/*
import { LayoutDefault as layout } from 'mmks_layout';

export const LayoutDefault = layout;
*/
