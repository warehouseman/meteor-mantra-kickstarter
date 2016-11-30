import React from 'react';

import dataComposer from '../composers/sidebar.js';
import Component from '../components/_sidebar.js';

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

    const apAddWidgets = {module: 'widgets', action: 'add'};
    const accPnts = [ apAddWidgets ];

    return (
      <div className="box box-solid">
        <div className="box-header with-border">
          <h3 className="box-title">Widgets navigation</h3>
        </div>
        <div className="box-body no-padding">
            <Container accesspoints={accPnts}/>
        </div>
      </div>
    );
  }
}
