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

    const enableBooksAdd = this.props.permissions['books:add'];

    Lgr.verbose(`enableBooksAdd permitted? : ${enableBooksAdd}`);

    let hrefAddBook = '/books';
    let classAddBook = 'disabled';
    if ( enableBooksAdd ) {
      hrefAddBook = '/books/add';
      classAddBook = 'enabled';
    }

/* ***************************************
             Side Bar Component
   ***************************************/

    return (
      <ul className="nav nav-pills nav-stacked">
        <li><a href="/books"><i className="fa "></i> Books collection</a></li>
        <li className={classAddBook}>
          <a href={hrefAddBook}>
            <i className="fa "></i> Add book
          </a>
        </li>
      </ul>
    );
  }
}
