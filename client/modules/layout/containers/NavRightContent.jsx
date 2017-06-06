import React from 'react';

import UserComposer from '../../_users/composers/account/auth';
import _UserControls from './UserControls';

const UserControls = UserComposer(_UserControls);

export default class extends React.Component {

  render() {
    // console.log('mmks_layout NavRight -- UserControls', UserControls);

    return (
      <UserControls
        classVersion="navbar-nav"
        />
    );
  }
}
