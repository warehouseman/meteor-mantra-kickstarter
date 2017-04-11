import React from 'react';

import Sidebar from '../containers/sidebar';

import Composer from '../composers/collection';
import Component from '../components/collection';
const Container = Composer(Component);

/* ***************************************
             Books List Container
   ***************************************/


export default class extends React.Component {

  render() {

    return (
      <div className="bs-docs-section clearfix">
        <div className="row">
          <div className="col-md-3">
            <Sidebar/>
          </div>
          <div className="col-md-9">

            <Container />

          </div>
        </div>
      </div>
    );

  }

}
