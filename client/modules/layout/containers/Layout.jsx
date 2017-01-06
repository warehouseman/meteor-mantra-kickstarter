import React from 'react';

import composer from '../composers/Layout';
import Component from '../components/Layout';
const Container = composer(Component);

export default class extends React.Component {

  render() {

    return (
      <div>
        <div className="container">
            <Container { ...this.props }/>
        </div>
      </div>
    );
  }
}
