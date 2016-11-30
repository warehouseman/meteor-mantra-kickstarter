import React from 'react';
import { Utils } from '../index';

let Lgr = null;

export default class extends React.Component {

  constructor(props) {
    super(props);
    Lgr = new Utils.Logger(__filename, 'warn', true);
  }

  hideRecord() {
    this.props.hideAction(this.props._id);
  }

  render() {
    Lgr.a = 'render ';

    const { _id, record, permissions } = this.props;

    const enableWidgetsUpdate = permissions['widgets:update'];
    const enableWidgetsDelete = permissions['widgets:delete'];


    Lgr.verbose(`enableWidgetsAdd permitted? : ${enableWidgetsUpdate}`);
    Lgr.verbose(`enableWidgetsDelete permitted? : ${enableWidgetsDelete}`);

    let editAllowed = `btn btn-large ${enableWidgetsUpdate ? 'enabled' : 'disabled'}`;
    let deleteAllowed = `btn btn-large ${enableWidgetsDelete ? 'enabled' : 'disabled'}`;

    return (
      <div>
        {record.saving ? <p>Saving...</p> : null}
        <h2><x-cuke id="title">{record.title}</x-cuke></h2>
        <p>
          <x-cuke id="size">
            {record.size} {record.size === 1 ? 'millimetre' : 'millimetres'}.
          </x-cuke>
        </p>
        <p>
          <x-cuke id="content">{record.content}</x-cuke>
          <br />
          <a data-cuke='edit-item' href={'/widgets/' + _id + '/edit'}
                                                        className={ editAllowed }>
            edit
          </a>
          &nbsp;|&nbsp;
          <a data-cuke='delete-item' href="#" onClick={this.hideRecord.bind(this)}
                                                        className={ deleteAllowed }>
            delete
          </a>
        </p>
      </div>
    );

  }
}
