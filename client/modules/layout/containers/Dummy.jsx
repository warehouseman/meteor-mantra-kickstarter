import React from 'react';

import composer from '../composers/Dummy';
import Component from '../components/Dummy';
const Container = composer(Component);

export default class extends React.Component {

  render() {
    console.log(' rendering dummy container ');
    return (
      <div>
        <Container />
      </div>
    );
  }
}
