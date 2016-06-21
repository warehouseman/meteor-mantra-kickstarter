import React from 'react';

export default class extends React.Component {

  render() {
    const {name} = this.props;
    return (
      <div>
        <h1>Simplest react component template</h1>
        <h3>{name}</h3>
      </div>
    );
  }
}
