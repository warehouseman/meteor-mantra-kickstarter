import React from 'react';

import Composer from '../composers/apolist';
import Component from '../components/apolist';
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
