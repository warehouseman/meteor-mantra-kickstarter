import React from 'react';
import { Utils } from '../index';

let Lgr = null;

export default class extends React.Component {

  constructor(props) {
    super(props);
    Lgr = new Utils.Logger(__filename, 'warn', true);
  }

  hideRecord() {
    //    console.log('--------- Hiding : props', this.PROPS);
    this.props.hideAction(this.props._id, this.props.mutate);
  }

  render() {
    Lgr.a = 'render ';

    const { _id, record, permissions } = this.props;

    const enableBooksUpdate = permissions['books:update'];
    const enableBooksDelete = permissions['books:delete'];


    Lgr.verbose(`enableBooksAdd permitted? : ${enableBooksUpdate}`);
    Lgr.verbose(`enableBooksDelete permitted? : ${enableBooksDelete}`);

    let editAllowed = `btn btn-large ${enableBooksUpdate ? 'enabled' : 'disabled'}`;
    let deleteAllowed = `btn btn-large ${enableBooksDelete ? 'enabled' : 'disabled'}`;

    /* ***************************************
             View A Book Component
   ***************************************/

    return (
      <div>
        <h3><x-cuke id="title">{record.title}</x-cuke></h3>
        <dl className="dl-horizontal">
          <dt>Author</dt>
          <dd><x-cuke id="author">{record.author.lastName}, {record.author.firstName}</x-cuke></dd>
          <dt>Pages</dt>
          <dd><x-cuke id="pages">{record.pages} </x-cuke></dd>
        </dl>
        <p>
          <x-cuke id="content">{record.content}</x-cuke>
          <br />
          <br />
          <br />
          <a data-cuke='edit-item' href={'/book/' + _id + '/edit'}
            className={ editAllowed }>
            edit
          </a>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <a data-cuke='delete-item' href="#" onClick={this.hideRecord.bind(this)}
            className={ deleteAllowed }>
            delete
          </a>
        </p>
      </div>
    );

  }
}
