import React from 'react';

export default class extends React.Component {

  render() {
    return (
      <div className="box box-solid">
        <div className="box-header with-border">
          <h3 className="box-title">Admin</h3>
        </div>
        <div className="box-body no-padding">
          Please be cautious with your password.  Password resets are a security hole.
        </div>
      </div>
    );
  }
}
