import React from 'react';

import dataComposer from '../composers/sidebar.jsx';
import Component from '../components/_sidebar.jsx';
const Container = dataComposer(Component);

export default class extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {

    const apAddColors = {module: 'colors', action: 'add'};
    const accPnts = [ apAddColors ];

    return (
      <div className="box box-solid">
        <div className="box-header with-border">
          <h3 className="box-title">Colors navigation</h3>
        </div>
        <div className="box-body no-padding">
            <Container accesspoints={accPnts}/>
        </div>
      </div>
    );
  }
}
