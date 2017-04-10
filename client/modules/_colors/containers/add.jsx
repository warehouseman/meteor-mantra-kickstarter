import React from 'react';

import Sidebar from '../containers/sidebar.jsx';

import AcCont from '/client/access_control/acContainer.js';

import Composer from '../composers/add';
import Component from '../components/_form';

let Container = function dummy() { return <div></div>; };
let Authorized = function dummy() { return <div></div>; };

export default class extends React.Component {

  constructor(props) {
    super(props);
    Container = Composer(Component);
    Authorized = AcCont;
  }

  render() {

    const apAdd = {module: 'colors', action: 'add'};
    const accPnts = [ apAdd ];
    return (
      <div className='bs-docs-section clearfix'>
        <div className='row'>
          <div className='col-md-3'>
            <Sidebar />
          </div>
          <div className='col-md-9'>
            <Authorized accesspoints={accPnts} warn='true'>
              <Container />
            </Authorized>
          </div>
        </div>
      </div>
    );

  }
}
