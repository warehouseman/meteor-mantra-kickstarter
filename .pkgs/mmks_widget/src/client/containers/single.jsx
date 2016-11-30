import React from 'react';

import Sidebar from '../containers/sidebar.js';

import dataComposer from '../composers/single.js';
import Component from '../components/_single.js';
// const Container = dataComposer(Component);

import Utils from '../../utils';

let Container = function dummy() { return <div></div>; };

export default class extends React.Component {

  constructor(props) {
    super(props);
    Container = dataComposer(Component, Utils.AccessControlComposer);
  }

  render() {

    const apEdit = {module: 'widgets', action: 'update'};
    const apDelete = {module: 'widgets', action: 'delete'};
    const accPnts = [ apEdit, apDelete ];

    const {_id} = this.props;
    return (
      <div className="bs-docs-section clearfix">
        <div className="row">
          <div className="col-md-3">
            <Sidebar />
          </div>
          <div className="col-md-9">

            <Container _id={_id} accesspoints={accPnts}/>

          </div>
        </div>
      </div>
    );
  }
}
