import React from 'react';

import NavHeader from '../containers/NavHeader';
import NavLeftContent from '../containers/NavLeftContent';
import NavRightContent from '../containers/NavRightContent';

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
