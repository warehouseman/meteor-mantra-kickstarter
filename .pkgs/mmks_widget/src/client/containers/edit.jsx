import React from 'react';

import Sidebar from '../containers/sidebar.js';

import dataComposer from '../composers/edit.js';
import Component from '../components/_form.js';

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

    const apEdit = {module: 'widgets', action: 'update'};
    const accPnts = [ apEdit ];

    const {_id} = this.props;
    return (
      <div className="bs-docs-section clearfix">
        <div className="row">
          <div className="col-md-3">
            <Sidebar />
          </div>
          <div className="col-md-9">
            <Authorized accesspoints={accPnts} warn='true'>
              <Container _id={_id}/>
            </Authorized>
          </div>
        </div>
      </div>
    );

  }
}
