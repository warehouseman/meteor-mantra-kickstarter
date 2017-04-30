function requireLayout(isModule) {
  console.log( '******* isModule : ', isModule );  // eslint-disable-line no-console

  if ( isModule.toLowerCase() === 'true' ) {
    return require('mmks_layout').LayoutDefault;
  }
  return require('../modules/layout/containers/Layout.jsx').default;
}

const LayoutDefault = requireLayout(Meteor.settings.public.IS_GITSUBMODULE);

export {

  LayoutDefault

};
