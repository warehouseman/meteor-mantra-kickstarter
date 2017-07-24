import React from 'react';

import Sidebar from '../containers/sidebar';

import Composer from '../composers/single';
import Component from '../components/single';

import Utils from '../../utils';

let Container = function dummy() { return <div></div>; };

export default class extends React.Component {

  constructor(props) {
    super(props);
    Container = Composer(Component, Utils.AccessControlComposer);
  }

  /* ***************************************
             View A Book Container
   ***************************************/

  render() {

    const apEdit = {module: 'books', action: 'update'};
    const apDelete = {module: 'books', action: 'delete'};
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
