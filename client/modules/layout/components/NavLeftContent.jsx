import React from 'react';
import DropDown from './DropDown.jsx';

import _lgr from '/lib/logging/client/clientLogger.js';
const Lgr = new _lgr(__filename, 'info', true);

export default class extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    Lgr.a = 'render ';

//    console.log( ' nav left component : permissions ', this.props.permissions );

    const enablePostsAdd = this.props.permissions['posts:add'];
    const enableColorsAdd = this.props.permissions['colors:add'];
    const enableWidgetsAdd = this.props.permissions['widgets:add'];

    Lgr.verbose(`enablePostsAdd permitted? : ${enablePostsAdd}.`);
    Lgr.verbose(`enableColorsAdd permitted? : ${enableColorsAdd}`);
    Lgr.verbose(`enableWidgetsAdd permitted? : ${enableWidgetsAdd}`);

    var linksAdmin = [];
    linksAdmin.push({ url: '/users', name: '/users', enabled: true} );
    linksAdmin.push({ url: '/users/add', name: '/users/add', enabled: true } );

    var linksAccounts = [];
    linksAccounts.push({ url: '/login', name: 'Login', enabled: true } );
    linksAccounts.push({ url: '/password', name: 'Forgot passoword', enabled: true } );
    linksAccounts.push({ url: '/register', name: 'Register', enabled: true } );
    linksAccounts.push({ url: '/Logout', name: 'Logout', enabled: true } );
    linksAccounts.push({ url: '/account', name: 'Account', enabled: true } );
    linksAccounts.push({ url: '/profile', name: 'Profile', enabled: true } );

    var linksColors = [];
    linksColors.push({ url: '/colors', name: '/colors', enabled: true } );
    linksColors.push({ url: '/colors/add', name: '/colors/add', enabled: enableColorsAdd } );

    var linksWidgets = [];
    linksWidgets.push({ url: '/widgets', name: '/widgets', enabled: true } );
    linksWidgets.push({ url: '/widgets/add', name: '/widgets/add', enabled: enableWidgetsAdd } );

    let navAccounts = React.createElement(DropDown, {name: 'Accounts', links: linksAccounts });
    let navAdmin = React.createElement(DropDown, { name: 'Admin', links: linksAdmin });
    let navColors = React.createElement(DropDown, { name: 'Colors', links: linksColors });
    let navWidgets = React.createElement(DropDown, { name: 'Widgets', links: linksWidgets });

    return (

      <ul className="nav navbar-nav">

        <li className="">
          <a aria-expanded="false" role="button" href="/" target="">Start</a>
        </li>

        <li className={enablePostsAdd}>
          <a aria-expanded="false" role="button" href="/new-post" target="">
            New Post
          </a>
        </li>

        { navColors }
        { navWidgets }
        { navAccounts }
        { Meteor.userId() ? navAdmin : null }

      </ul>

    );
  }
}
