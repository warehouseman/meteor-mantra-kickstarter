import React from 'react';

import Composer from '../composers/apolist.jsx';
import Component from '../components/apolist.jsx';
const Container = Composer(Component);

export default class extends React.Component {

  render() {

    return (

      <div className="bs-docs-section clearfix">
        Goodykins
        <Container />
      </div>
    );
    
  }

}
