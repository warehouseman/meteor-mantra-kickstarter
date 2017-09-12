import React from 'react';
import AxsLevel from '/client/access_control/icon.jsx';

export default class extends React.Component {
  deleteRecord() {
    // console.log('deleteRecord ', this.props._id);
    this.props.deleteAction(this.props._id);
  }

  render() {
    const {_id, email, firstName, lastName, role, hideException} = this.props;

    return (
      <div>

        {hideException ?
          <div data-cuke="bad-content" className="alert alert-danger" onClick="">
            <span className="unicon fatal icon-white icon-24" ></span>
            {hideException}
          </div> : null }
        <h3> <x-cuke id="user-record">User Record</x-cuke> </h3>

        <p><strong>Name:</strong> <x-cuke id="firstName">{firstName}</x-cuke></p>
        <p><strong>Family name:</strong> <x-cuke id="lastName">{lastName}</x-cuke> </p>
        <p><strong>EMail:</strong> <x-cuke id="email">{email}</x-cuke></p>
        <p><strong>Privilege level:</strong> <x-cuke id="role"> <AxsLevel>{role}</AxsLevel> -- {role}</x-cuke></p>
        <p>Internal key: {_id}</p>

        <a className="fa fa-pencil" href={'/users/' + _id + '/edit'}>
          &nbsp; edit
        </a> | <a className="fa fa-trash-o" href="#" onClick={this.deleteRecord.bind(this)}>
          &nbsp; delete
        </a>
      </div>
    );
  }
}

// export default Layout;
