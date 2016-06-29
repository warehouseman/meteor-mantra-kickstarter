import React from 'react';



export default class extends React.Component {
  deleteRecord() {
    // console.log('deleteRecord ', this.props._id);
    this.props.deleteAction(this.props._id);
  }

  render() {
    const {_id, email, firstName, lastName, role, error} = this.props;

    return (
      <div>

        {error ?
        <div className="alert alert-danger" onClick="">
          <span className="octicon octicon-megaphone" ></span>
          {error}
        </div> : null }

        <h3> <x-cuke id="user-record">User Record</x-cuke> </h3>

        <p><strong>First name:</strong> <x-cuke id="firstName">{firstName}</x-cuke></p>
        <p><strong>Last name:</strong> <x-cuke id="lastName">{lastName}</x-cuke> </p>
        <p><strong>EMail:</strong> <x-cuke id="email">{email}</x-cuke></p>
        <p><strong>Role:</strong> <x-cuke id="role">{role}</x-cuke></p>
        <p>Internal key: {_id}</p>

        <a href={'/users/' + _id + '/edit'}>
          edit
        </a> | <a href="#" onClick={this.deleteRecord.bind(this)}>
          delete
        </a>
      </div>
    );
  }
}

// export default Layout;
