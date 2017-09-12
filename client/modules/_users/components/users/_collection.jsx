import React from 'react';
import AxsLevel from '/client/access_control/icon.jsx';

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
              <th className="col-xs-4">Name</th>
              <th className="col-xs-2">Access</th>
              <th className="col-xs-3">EMail</th>
              <th className="col-xs-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {this.props.collection.map(record => (

              <tr className="text-left" key={record._id}>
                <td className="col-xs-4">
                  <a
                    role="button"
                    data-cuke={'view-' + record.emails[0].address}
                    href={`/users/${record._id}`}>
                    {record.profile.lastName}, {record.profile.firstName}
                  </a>
                </td>
                <td className="col-xs-2"><AxsLevel>{record.roles.headOffice[0]}</AxsLevel></td>
                <td className="col-xs-3">
                  <x-cuke id='rowUser' key={record.emails[0].address}>
                    <a href={`/users/${record._id}`}>
                      {record.emails[0].address}
                    </a>
                  </x-cuke>
                </td>
                <td className="col-xs-2">
                  <a className="fa fa-pencil"
                    role="button"
                    data-cuke={'edit-' + record.emails[0].address}
                    href={`/users/${record._id}/edit`}>
                  </a>
                  &nbsp; &nbsp;
                  <a className="fa fa-trash-o"
                    role="button"
                    data-cuke={'hide-' + record.emails[0].address}
                    onClick={() => this.deleteUser(record._id)}>
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
