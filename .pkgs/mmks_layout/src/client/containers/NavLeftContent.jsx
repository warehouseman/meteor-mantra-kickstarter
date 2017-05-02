import React from 'react';

import composer from '../composers/NavLeftContent';
import Component from '../components/NavLeftContent';
const Container = composer(Component);

export default class extends React.Component {

  render() {

    const apAddPosts = {module: 'posts', action: 'add'};
    const apAddColors = {module: 'colors', action: 'add'};
    const apAddWidgets = {module: 'widgets', action: 'add'};
    const apAddBooks = {module: 'books', action: 'add'};

    const accPnts = [ apAddPosts, apAddColors, apAddWidgets, apAddBooks ];

    return (
            <Container accesspoints={accPnts}/>
    );
  }
}
