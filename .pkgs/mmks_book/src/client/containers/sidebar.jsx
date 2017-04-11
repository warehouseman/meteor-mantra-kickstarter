import React from 'react';

import dataComposer from '../composers/sidebar';
import Component from '../components/sidebar';

import Utils from '../../utils';

let Container = function dummy() { return <div></div>; };

export default class extends React.Component {

  /* eslint-disable no-console */
  constructor(props) {
    super(props);
    Container = dataComposer(Component, Utils.AccessControlComposer);
  }
  /* eslint-enable no-console */

  render() {

    const apAddBooks = {module: 'books', action: 'add'};
    const accPnts = [ apAddBooks ];

    return (
      <div className="box box-solid">
        <div className="box-header with-border">
          <h3 className="box-title">Books navigation</h3>
        </div>
        <div className="box-body no-padding">
            <Container accesspoints={accPnts}/>
        </div>
      </div>
    );
  }
}
