import React from 'react';

import Sidebar from '../containers/sidebar.js';

import dataComposer from '../composers/collection.js';
import Component from '../components/_collection.js';
const Container = dataComposer(Component);

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
