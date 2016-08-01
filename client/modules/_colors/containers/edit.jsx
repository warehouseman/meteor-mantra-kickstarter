import React from 'react';

import Sidebar from '../containers/sidebar.jsx';

import Authorized from '/client/access_control/acContainer.js';

import dataComposer from '../composers/edit.jsx';
import Component from '../components/_form.jsx';
const Container = dataComposer(Component);

export default class extends React.Component {

  render() {

    const apEdit = {module: 'colors', action: 'update'};
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

/*
            <Authorized accesspoint='colors.update' warn='true'>
              <Container _id={_id}/>
            </Authorized>
*/
