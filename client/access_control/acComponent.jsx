/* eslint-disable no-console */
import React from 'react';

class Authorized extends React.Component {
  constructor(props) {
    super(props);
    const { unauthenticatedMessage } = props;

    this.errorComponent = unauthenticatedMessage || DefaultUnauthenticatedMessage;
  }
  render() {

    const { children, authorize, accesspoint, warn } = this.props;
    const allowed = authorize(accesspoint);
    let errorComponent = this.errorComponent;
    console.log( 'authorized? ', allowed);

    if ( allowed ) {
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
