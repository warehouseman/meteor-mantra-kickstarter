import React from 'react';

import Composer from '../composers/apopost';
import Component from '../components/apopost';
const Container = Composer(Component);

export default class extends React.Component {

  render() {

    return (

      <div className="bs-docs-section clearfix">
        <Container />
      </div>
    );

  }

}
