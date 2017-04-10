import React from 'react';
import _lgr from '/lib/logging/client/clientLogger';
const Lgr = new _lgr( __filename, 'warn', true );


export default class extends React.Component {

  hideRecord() {
    this.props.hideAction(this.props._id);
  }

  render() {
    Lgr.a = 'render ';

    const { _id, record, permissions } = this.props;
    // console.log('  props ', this.props);

    const enableColorsUpdate = permissions['colors:update'];
    const enableColorsDelete = permissions['colors:delete'];


    Lgr.verbose(`enableColorsAdd permitted? : ${enableColorsUpdate}`);
    Lgr.verbose(`enableColorsDelete permitted? : ${enableColorsDelete}`);

    let editAllowed = `btn btn-large ${enableColorsUpdate ? 'enabled' : 'disabled'}`;
    let deleteAllowed = `btn btn-large ${enableColorsDelete ? 'enabled' : 'disabled'}`;

    return (
      <div>
        {record.saving ? <p>Saving...</p> : null}
        <h2><x-cuke id="title">{record.title}</x-cuke></h2>
        <p>
          <x-cuke id="age">{record.age} {record.age === 1 ? 'year' : 'years'} old.</x-cuke>
        </p>
        <p>
          <x-cuke id="content">{record.content}</x-cuke>
          <br />
          <br />
          <br />
          <a data-cuke='edit-item' href={'/colors/' + _id + '/edit'}
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
