import React from 'react';

import _lgr from '/lib/logging/client/clientLogger.js';
const Lgr = new _lgr(__filename, 'info', true);

export default class extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    Lgr.a = 'render ';

    // console.log( ' side bar component : props ', this.props );
    // console.log( ' side bar component : permissions ', this.props.permissions );

    const enableColorsAdd = this.props.permissions['colors:add'];

    Lgr.verbose(`enableColorsAdd permitted? : ${enableColorsAdd}`);

    let hrefAddColor = '/colors';
    let classAddColor = 'disabled';
    if ( enableColorsAdd ) {
      hrefAddColor = '/colors/add';
      classAddColor = 'enabled';
    }

    return (
      <ul className="nav nav-pills nav-stacked">
        <li><a href="/colors"><i className="fa "></i> Colors collection</a></li>
        <li className={classAddColor}>
          <a href={hrefAddColor}>
            <i className="fa "></i> Add color
          </a>
        </li>
      </ul>
    );
  }
}

/*

        <li key={Math.random()} className={addEnabled}>
*/

