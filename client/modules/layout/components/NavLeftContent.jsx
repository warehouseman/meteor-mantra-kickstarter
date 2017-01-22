import React from 'react';
import DropDown from './DropDown.jsx';

import MobileApps from '../containers/MobileApps.jsx';

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
    let optionsListColors = { url: 'List Colors', name: '/colors', enabled: true };
    let optionsAddColor = { url: 'Add Color ', name: '/colors/add', enabled: enableColorsAdd };
    linksColors.push( optionsListColors );
    linksColors.push( optionsAddColor);

    var linksWidgets = [];
    let optionsListWidgets = { url: 'List Widgets', name: '/widgets', enabled: true };
    let optionsAddWidget = { url: 'Add Widget', name: '/widgets/add', enabled: enableWidgetsAdd };
    linksWidgets.push( optionsListWidgets );
    linksWidgets.push( optionsAddWidget);

    // let navColors = React.createElement(DropDown, { name: 'Colors', links: linksColors });
    // let navWidgets = React.createElement(DropDown, { name: 'Widgets', links: linksWidgets });

    let navAccounts = React.createElement(DropDown, {name: 'Accounts', links: linksAccounts });
    let navAdmin = React.createElement(DropDown, { name: 'Admin', links: linksAdmin });

    let linksTasks = [];
    linksTasks.push({ name: 'List APosts', url: '/apo', enabled: true } );
    linksTasks.push({ name: 'Add APost', url: '/new-post', enabled: true } );
    linksTasks.push({ divider: true } );
    linksTasks.push({ name: 'List Posts', url: '/', enabled: true } );
    linksTasks.push({ name: 'Add Post', url: '/new-post', enabled: true } );
    linksTasks.push({ divider: true } );
    linksTasks.push({ name: 'List Colors', url: '/colors', enabled: true } );
    linksTasks.push({ name: 'Add Color ', url: '/colors/add', enabled: enableColorsAdd } );
    linksTasks.push({ divider: true } );
    linksTasks.push({ name: 'List Widgets', url: '/widgets', enabled: true } );
    linksTasks.push({ name: 'Add Widget', url: '/widgets/add', enabled: enableWidgetsAdd } );
    let navTasks = React.createElement(DropDown, { name: 'Tasks', links: linksTasks });

    return (

      <ul className="nav navbar-nav">

        { navTasks }
        { navAccounts }
        { Meteor.userId() ? navAdmin : null }

        { Meteor.isCordova ? null : <li><MobileApps /></li> }

      </ul>

    );
  }
}
