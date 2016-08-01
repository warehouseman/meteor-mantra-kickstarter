import React from 'react';

import Sidebar from '../containers/sidebar.jsx';



import dataComposer from '../composers/single.jsx';
import Component from '../components/_single.jsx';
const Container = dataComposer(Component);

export default class extends React.Component {

  render() {

    const apEdit = {module: 'colors', action: 'update'};
    const apDelete = {module: 'colors', action: 'delete'};
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
