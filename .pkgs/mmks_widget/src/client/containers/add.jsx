import React from 'react';

import Sidebar from '../containers/sidebar';

import dataComposer from '../composers/add';
import Component from '../components/_form';

import Utils from '../../utils';

let Container = function dummy() { return <div></div>; };
let Authorized = function dummy() { return <div></div>; };

export default class extends React.Component {

  constructor(props) {
    super(props);
    Container = dataComposer(Component);
    Authorized = Utils.Authorized;
  }

  render() {

    const apAdd = {module: 'widgets', action: 'add'};
    const accPnts = [ apAdd ];

    return (
      <div className="bs-docs-section clearfix">
        <div className="row">
          <div className="col-md-3">
            <Sidebar />
          </div>
          <div className="col-md-9">
            <Authorized accesspoints={accPnts} warn='true'>
              <Container />
            </Authorized>
          </div>
        </div>
      </div>
    );

  }
}
