import React from 'react';

import dataComposer from '../../composers/account/pwdReset.jsx';
import Component from './_reset.jsx';

const Container = dataComposer(Component);

export default class extends React.Component {

  render() {

    const { code } = this.props;
    // console.log(' Secret ', code);

    return (
      <div className="bs-docs-section clearfix">
          <div className="row">

              <div className="col-md-6">
                  <h2 className="font-bold">Reset Your Password</h2>

                  <p>
                    You're Back!
                  </p>
                  <p>
                    Please protect your password.
                  </p>


              </div>
              <div className="col-md-6">
                  <div className="ibox-content">

                    <h2 className="font-bold">Password Change</h2>

                    <Container _code={code}/>

                  </div>
              </div>
          </div>
          <hr/>
      </div>

    );

  }
}
