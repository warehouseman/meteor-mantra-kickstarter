/* eslint-disable no-console */
import React from 'react';

function deleteUser(id) {
  console.log('deleteUser: ' + id);
  // this.props.deleteAction(id);
}

const UserList = ({collection}) => (
  <div className='userlist'>
    <h3>Users</h3>
      <table className="table table-responsive table-striped table-hover table-condensed">
          <thead>
          <tr>
              <th className="col-xs-4">Electronic Mail</th>
              <th className="col-xs-2">First Name</th>
              <th className="col-xs-2">Last Name</th>
              <th className="col-xs-4">Actions</th>
          </tr>
          </thead>
          <tbody>
          {collection.map(record => (
            <tr className="text-left" key={record._id}>
              <td className="col-xs-4">
                <a href={`/users/${record._id}`}>{record.firstEmail()}</a>
              </td>
              <td className="col-xs-2">{record.profile.firstName}</td>
              <td className="col-xs-2">{record.profile.lastName}</td>
              <td className="col-xs-4">
                <a className="btn btn-default btn-sm"
                  role="button"
                  href={`/users/${record._id}`}>
                  View
                </a>
                <a className="btn btn-default btn-sm"
                  role="button"
                  href={`/users/${record._id}/edit`}>
                  Edit
                </a>
                <a className="btn btn-default btn-sm"
                  role="button"
                  onClick={() => deleteUser(record._id)}>
                  Delete
                </a>
              </td>
            </tr>
          ))}
          </tbody>
      </table>
  </div>
);

export default UserList;
