import React from 'react';
// import Authorized from '/client/access_control/acComposer.js';

class ColorList extends React.Component {

  render() {
    return (
      <ul className="nav nav-pills nav-stacked">
        <li><a href="/colors"><i className="fa "></i> Colors collection</a></li>
        <li><a href="/colors/add"><i className="fa "></i> Add color</a></li>
      </ul>
    );
  }
}

/*

        <li>
          <Authorized accesspoint='colors.update'>
            <div><a href="/colors/add"><i className="fa "></i> Add color</a></div>
          </Authorized>
        </li>

*/
export default class extends React.Component {

  render() {
    return (
      <div className="box box-solid">
        <div className="box-header with-border">
          <h3 className="box-title">Colors navigation</h3>
        </div>
        <div className="box-body no-padding">
          <ColorList />
        </div>
      </div>
    );
  }
}
