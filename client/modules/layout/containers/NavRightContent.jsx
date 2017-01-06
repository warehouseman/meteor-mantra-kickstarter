import React from 'react';

import authComposer from '../../_users/composers/account/auth.jsx';
import _UserControls from './UserControls.jsx';

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
