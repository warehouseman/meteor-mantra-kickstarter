import React from 'react';



export default class extends React.Component {
  deleteRecord() {
    // console.log('deleteRecord ', this.props._id);
    this.props.deleteAction(this.props._id);
  }

  render() {
    const {_id, email, firstName, lastName, role, error} = this.props;

    // const Layout = ({_id=()=>null, email=()=>null, firstName=()=>null, lastName=()=>null}) => (

    return (
      <div>

        {error ?
        <div className="alert alert-danger" onClick="">
          <span className="octicon octicon-megaphone" ></span>
          {error}
        </div> : null }

        <h3>user _id: {_id}</h3>

        <p><strong>First name:</strong> {firstName}</p>
        <p><strong>Last name:</strong> {lastName}</p>
        <p><strong>EMail:</strong> {email}</p>
        <p><strong>Role:</strong> {role}</p>

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
