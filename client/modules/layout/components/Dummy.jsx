import React from 'react';

export default class extends React.Component {

  render() {
    console.log(' rendering dummy component ', this.props);
    return (

      <div>
        <hr />
        DUMMY
      </div>
    );
  }
}
