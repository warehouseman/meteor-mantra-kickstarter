import _lgr from '/lib/logging/client/clientLogger';
const Lgr = new _lgr( __filename, 'info', true );

import React from 'react';

class Authorized extends React.Component {
  constructor(props) {
    super(props);
    const { unauthenticatedMessage } = props;
    this.errorComponent = unauthenticatedMessage || DefaultUnauthenticatedMessage;
  }

  render() {
    Lgr.a = 'render';
    const { children, warn, permissions, accesspoints } = this.props;

    let accesspoint = `${accesspoints[0].module}:${accesspoints[0].action}`;

    Lgr.debug( 'Access point : ' + accesspoint);

    const errorComponent = this.errorComponent;
    Lgr.verbose( 'Access point : ' + accesspoint ?
                     ( permissions[accesspoint] ? 'permitted' : 'NOT permitted' ) :
                     'unknown permission' );


    if ( permissions[accesspoint] ) {
      return ( <div>{ children } </div>);
    } else if ( warn ) {
      return ( <div> { errorComponent } </div> );
    }

    return null;
  }
}

const DefaultUnauthenticatedMessage = (
  <div>
    <h3>
      We apologize for the inconvenience.
    </h3>
    <x-cuke id="warning">You haven't been authorized to access this page.</x-cuke>
  </div>
);

export default Authorized;
