import React from 'react';
import Navigation from './navigation.jsx';

const Layout = ({content = () => null }) => (
  <div>
    <Navigation />
    Delete this! It's never used!
        {content()}
  </div>
);

export default Layout;

/*

    <header>
    <h1>Mantra Voice</h1>
    <Navigation />
    </header>

    <div>
    {content()}
    </div>

    <footer>
    <small>Built with <a href='https://github.com/kadirahq/mantra'>Mantra</a> &amp; Meteor.</small>
    </footer>

*/
