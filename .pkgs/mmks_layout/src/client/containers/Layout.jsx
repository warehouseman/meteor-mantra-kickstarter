import React from 'react';
import { ApolloProvider } from 'react-apollo';

import composer from '../composers/Layout';
import Component from '../components/Layout';
const Container = composer(Component);

import initContext from '/client/configs/context';

export default class extends React.Component {

  render() {

    this.context = initContext();

    return (

      <ApolloProvider client={this.context.ApolloClient}>
        <div>
          <div className="container">
              <Container { ...this.props }/>
          </div>
        </div>
      </ApolloProvider>

    );
  }
}
