import React from 'react';

import authComposer from '/client/modules/_users/composers/account/auth.jsx';
import _UserControls from './UserControls';

const UserControls = authComposer(_UserControls);

export default class extends React.Component {

  render() {
    return (
      <UserControls
        classVersion="navbar-nav"
        />
    );
  }
}
