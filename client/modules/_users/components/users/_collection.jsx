import React from 'react';

export default class extends React.Component {
  constructor(props) {
    super(props);

    this.deleteUser = (_id) => {
      this.props.submitAction(_id);
    };

  }

  render() {

    return (

      <div className='userlist'>
        <h3> <x-cuke id="user-list">Users</x-cuke> </h3>
          <table className="table table-responsive table-striped table-hover table-condensed">
              <thead>
              <tr>
                  <th className="col-xs-2">First Name</th>
                  <th className="col-xs-2">Last Name</th>
                  <th className="col-xs-2">Role</th>
                  <th className="col-xs-3">Electronic Mail</th>
                  <th className="col-xs-4">Actions</th>
              </tr>
              </thead>
              <tbody>
              {this.props.collection.map(record => (
                <tr className="text-left" key={record._id}>
                  <td className="col-xs-2">{record.profile.firstName}</td>
                  <td className="col-xs-2">{record.profile.lastName}</td>
                  <td className="col-xs-2">{record.roles.headOffice[0]}</td>
                  <td className="col-xs-3">
                    <x-cuke id='rowUser' key={record.firstEmail()}>
                      <a href={`/users/${record._id}`}>
                        {record.firstEmail()}
                      </a>
                    </x-cuke>
                  </td>
                  <td className="col-xs-4">
                    <a className="btn btn-default btn-sm"
                      role="button"
                      data-cuke={'view-' + record.firstEmail()}
                      href={`/users/${record._id}`}>
                      View
                    </a>
                    <a className="btn btn-default btn-sm"
                      role="button"
                      data-cuke={'edit-' + record.firstEmail()}
                      href={`/users/${record._id}/edit`}>
                      Edit
                    </a>
                    <a className="btn btn-default btn-sm"
                      role="button"
                      data-cuke={'hide-' + record.firstEmail()}
                      onClick={() => this.deleteUser(record._id)}>
                      Delete
                    </a>
                  </td>
                </tr>
              ))}
              </tbody>
          </table>
      </div>

    );
  }
}
