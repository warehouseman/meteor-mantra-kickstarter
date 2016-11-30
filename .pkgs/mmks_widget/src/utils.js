import React from 'react';

/* eslint-disable no-unused-vars, no-console */
class Logger {
  constructor( f ) {
    this.f = f;
  }

  log() {
    console.log('MMKS Widget :: /utils.js \n Dummy logger replace at runtime.');
  }
}

class LayoutDefault extends React.Component {
  render() { return ( <div></div> ); }
}

function AccessControlComposer(_ref, onData) {
  let ref = _ref;
}

function Authorized(props, context, updater) {
  let properties = props;
}

let Utils = { Logger, LayoutDefault, AccessControlComposer, Authorized };

export default Utils;
/* eslint-enable no-unused-vars, no-console */
