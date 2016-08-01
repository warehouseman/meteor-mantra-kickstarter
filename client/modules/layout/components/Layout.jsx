import React from 'react';

import NavHeader from '../containers/NavHeader.jsx';
import NavLeftContent from '../containers/NavLeftContent.jsx';
import NavRightContent from '../containers/NavRightContent.jsx';

import AppConfig from '/lib/app.js';

export default class extends React.Component {

  render() {

    return (
      <div>

        <NavHeader
          brand={ () => (AppConfig.name) }
          leftContent={ () => (<NavLeftContent { ...this.props }/>) }
          rightContent={ () => (<NavRightContent />) }
        />

        <div className="container">

            {this.props.content()}

        </div>

      </div>
    );
  }
}
