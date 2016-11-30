import React from 'react';
import { Utils } from '../index';

let Lgr = null;

export default class extends React.Component {

  constructor(props) {
    super(props);
    Lgr = new Utils.Logger(__filename, 'info', true);
  }

  render() {
    Lgr.a = 'render ';

    const enableWidgetsAdd = this.props.permissions['widgets:add'];

    Lgr.verbose(`enableWidgetsAdd permitted? : ${enableWidgetsAdd}`);

    let hrefAddWidget = '/widgets';
    let classAddWidget = 'disabled';
    if ( enableWidgetsAdd ) {
      hrefAddWidget = '/widgets/add';
      classAddWidget = 'enabled';
    }

    return (
      <ul className="nav nav-pills nav-stacked">
        <li><a href="/widgets"><i className="fa "></i> Widgets collection</a></li>
        <li className={classAddWidget}>
          <a href={hrefAddWidget}>
            <i className="fa "></i> Add widget
          </a>
        </li>
      </ul>
    );
  }
}
