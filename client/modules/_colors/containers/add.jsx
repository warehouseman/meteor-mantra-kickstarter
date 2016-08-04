import React from 'react';

import Sidebar from '../containers/sidebar.jsx';

import Authorized from '/client/access_control/acContainer.js';

import dataComposer from '../composers/add.jsx';
import Component from '../components/_form.jsx';
const Container = dataComposer(Component);

export default class extends React.Component {

  render() {

    const apAdd = {module: 'colors', action: 'add'};
    const accPnts = [ apAdd ];
//    console.log(' ad cont - -   apAdd : ', apAdd);

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

/*
            <Authorized accesspoints={accPnts} warn='true'>
              <Container />
            </Authorized>
*/
